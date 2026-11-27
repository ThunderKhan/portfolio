// Fail-fast local gate. Does not deploy, install dependencies, change Git history,
// refresh account snapshots or stage any owner assets.
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const npm = process.env.npm_execpath;
const results = [];
function run(label, executable, args, env = process.env) {
  console.log("\n=== " + label + " ===");
  const child = spawnSync(executable, args, { cwd: root, env, stdio: "inherit", windowsHide: true });
  if (child.error || child.status !== 0) throw new Error(label + " failed (exit " + (child.status ?? "unavailable") + ")");
  results.push(label);
}
function npmRun(label, args, env) {
  run(label, process.execPath, [npm, ...args], env);
}
try {
  if (!npm) throw new Error("Run via npm run audit:final");
  const rev = spawnSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8", windowsHide: true });
  if (rev.status !== 0) throw new Error("Git revision unavailable");
  console.log("Revision: " + rev.stdout.trim());
  run("Tracked tree matches HEAD", "git", ["diff", "--quiet", "HEAD", "--"]);
  npmRun("Root dependency audit", ["audit"]);
  npmRun("Production dependency audit", ["audit", "--omit=dev"]);
  npmRun("Browser dependency audit", ["--prefix", "tests/browser", "audit"]);
  npmRun("Source regression tests", ["test"]);
  npmRun("TypeScript", ["run", "typecheck"]);
  npmRun("Lint", ["run", "lint"]);
  npmRun("Production build", ["run", "build"]);
  npmRun("Targeted secret audit", ["run", "audit:secrets"]);
  npmRun("Public asset inventory", ["run", "audit:assets"]);
  npmRun("Browser regression with live API", ["--prefix", "tests/browser", "run", "test"], { ...process.env, PORTFOLIO_REQUIRE_LIVE_GITHUB: "1" });
  npmRun("Container build and isolated runtime", ["run", "audit:docker"]);
  run("Container vulnerability inventory", "docker", ["scout", "cves", "mark-i:security-check"]);
  run("No fixable critical/high container findings", "docker", ["scout", "cves", "--exit-code", "--only-fixed", "--only-severity", "critical,high", "mark-i:security-check"]);
  console.log(JSON.stringify({ revision: rev.stdout.trim(), automatedChecksPassed: true, checks: results, productionApproved: false }, null, 2));
} catch (error) {
  console.error("Final verification incomplete: " + error.message);
  console.log(JSON.stringify({ automatedChecksPassed: false, checks: results, productionApproved: false }, null, 2));
  process.exitCode = 1;
}
