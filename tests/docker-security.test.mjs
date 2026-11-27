import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const dockerfile = read("Dockerfile");
const runner = dockerfile.split(" AS runner\n")[1];
const audit = read("scripts/audit-docker.mjs");

test("dependency install, build and runtime use non-root users", () => {
  assert.equal((dockerfile.match(/^USER node$/gm) ?? []).length, 3);
  assert.match(dockerfile, /USER node\nRUN npm ci --no-audit --no-fund/);
  assert.match(dockerfile, /USER node\nRUN PORTFOLIO_DOCKER_BUILD=1 npm run build/);
  assert.match(runner, /USER node\nEXPOSE 3000/);
});

test("Docker build context is default-deny and copies explicit inputs", () => {
  const ignore = read(".dockerignore");
  assert.match(ignore, /^\*\*$/m);
  for (const path of ["src", "public"]) assert.ok(ignore.includes("!" + path + "/**"));
  for (const secret of ["**/.env*", "**/.npmrc", "**/*.key", "**/*.pem", "**/node_modules"]) assert.ok(ignore.includes(secret));
  assert.doesNotMatch(dockerfile, /^COPY\s+\.\s+\./m);
  assert.doesNotMatch(dockerfile, /^(?:ARG|ENV)\s+.*GITHUB_TOKEN/m);
});

test("runtime application assets are root-owned except required cache paths", () => {
  for (const path of ["standalone", "static", "public"]) assert.match(runner, new RegExp("COPY --from=builder --chown=0:0 .*" + path));
  assert.match(runner, /chown -R node:node \/app\/\.next\/cache \/app\/\.next\/server\/app/);
  assert.doesNotMatch(runner, /chown -R node:node \/app\s*(?:\n|$)/);
});

test("health check is bounded, first-party and independent of GitHub", () => {
  assert.match(runner, /HEALTHCHECK .*--timeout=5s/);
  assert.ok(runner.includes("/robots.txt"));
  assert.ok(runner.includes("AbortSignal.timeout(3000)"));
  assert.match(runner, /CMD \["node", "server\.js"\]/);
});

test("Docker verification builds a committed archive and uses constrained local runtime", () => {
  for (const value of ['"archive", "--format=tar"', '"--pull"', '"--cap-drop=ALL"', '"--security-opt=no-new-privileges:true"', '"--pids-limit=256"', '"--memory=1g"', '"--cpus=1.5"', '"127.0.0.1::3000"', '"/api/github"', '"/_next/image?']) assert.ok(audit.includes(value) || (value === '"/api/github"' && audit.includes('"/api/github"')), value);
  assert.doesNotMatch(audit, /"--env-file"|"-v"|"--privileged"/);
});

test("runner patches installed PAM and excludes runtime package managers", () => {
  assert.match(runner, /apt-get install -y --no-install-recommends --only-upgrade libpam0g libpam-modules libpam-modules-bin libpam-runtime/);
  assert.ok(runner.includes("1.5.2-6+deb12u3"));
  for (const path of ["/usr/local/lib/node_modules/npm", "/usr/local/lib/node_modules/corepack", "/usr/local/bin/npm", "/usr/local/bin/yarn", "/opt/yarn-v*"]) assert.ok(runner.includes(path));
  assert.ok(audit.includes('"--no-cache-filter", "runner"'));
  assert.ok(audit.includes("runtimePackageManagersAbsent: true"));
  assert.ok(audit.includes('"dpkg", "--compare-versions"'));
});

test("all Docker stages share an immutable Node base image index", () => {
  const bases = [...dockerfile.matchAll(/^FROM (node:22-bookworm-slim@sha256:[a-f0-9]{64}) AS (deps|builder|runner)$/gm)];
  assert.deepEqual(bases.map(match => match[2]), ["deps", "builder", "runner"]);
  assert.equal(new Set(bases.map(match => match[1])).size, 1);
});
