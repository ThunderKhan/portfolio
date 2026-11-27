// Local-only audit: never emit matching lines, credentials, or raw Git errors.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";
import { tokenPattern, credentialPath, publicSecretName, containsSecret, isPublicBuildFile } from "./lib/secret-audit.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
function git(args, allowNoMatch = false) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, windowsHide: true });
  if (result.error || (result.status !== 0 && !(allowNoMatch && result.status === 1))) {
    throw new Error("Git audit command failed; check local repository access.");
  }
  return result.stdout;
}
const lines = value => [...new Set(value.split(/\r?\n/).filter(Boolean))];
const localSecrets = new Set([process.env.GITHUB_TOKEN].filter(Boolean));
const riskyPublicNames = new Set(Object.keys(process.env).filter(publicSecretName));
for (const name of [".env", ".env.local", ".env.production", ".env.production.local", ".env.development", ".env.development.local", ".env.test", ".env.test.local"]) {
  const file = join(root, name);
  if (!existsSync(file)) continue;
  const env = parseEnv(readFileSync(file, "utf8"));
  if (env.GITHUB_TOKEN) localSecrets.add(env.GITHUB_TOKEN);
  for (const key of Object.keys(env)) if (publicSecretName(key) && env[key]) riskyPublicNames.add(key);
}
function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(path));
    else if (entry.isFile()) out.push(path);
  }
  return out;
}
function safePath(path) {
  let clean = path;
  for (const secret of localSecrets) clean = clean.split(secret).join("[REDACTED]");
  return clean.replace(new RegExp(tokenPattern, "g"), "[REDACTED]");
}
try {
  const tracked = git(["ls-files", "-z"]).split("\0").filter(Boolean);
  const trackedCredentials = tracked.filter(credentialPath);
  const historyPaths = lines(git(["log", "--all", "--root", "-m", "--format=", "--name-only", "--no-renames"]));
  const historicalCredentials = historyPaths.filter(credentialPath);
  // Git -G matches changed text lines in reachable history, including root and
  // merge diffs. --name-only means sensitive lines never leave Git.
  const historyMatches = lines(git(["log", "--all", "--root", "-m", "--format=", "--name-only", "--no-renames", "--no-ext-diff", "--no-textconv", "-G", tokenPattern]));
  const currentMatches = lines(git(["grep", "-I", "-l", "-E", "-e", tokenPattern, "--"], true));
  const built = existsSync(join(root, ".next", "BUILD_ID"));
  const outputFiles = ["public", ".next/static", ".next/server/app"].flatMap(dir => walk(resolve(root, dir)))
    .filter(file => isPublicBuildFile(relative(root, file)));
  const outputMatches = outputFiles.filter(file => containsSecret(readFileSync(file), [...localSecrets])).map(file => relative(root, file));
  const template = parseEnv(readFileSync(join(root, ".env.example"), "utf8"));
  const templateValid = Object.keys(template).every(key => key === "GITHUB_TOKEN" || key === "NEXT_PUBLIC_SITE_URL") && template.GITHUB_TOKEN === "";
  const result = {
    trackedCredentialPaths: trackedCredentials.map(safePath),
    historicalCredentialPaths: historicalCredentials.map(safePath),
    currentPatternMatches: currentMatches.map(safePath),
    historicalPatternMatches: historyMatches.map(safePath),
    riskyPublicVariableNames: [...riskyPublicNames].map(safePath),
    publicOutputMatches: outputMatches.map(safePath),
    publicOutputFilesScanned: outputFiles.length,
    productionBuildPresent: built,
    knownGithubTokenChecked: localSecrets.size > 0,
    templateValid,
  };
  console.log(JSON.stringify(result, null, 2));
  if (!built || !localSecrets.size || !templateValid || trackedCredentials.length || historicalCredentials.length || currentMatches.length || historyMatches.length || riskyPublicNames.size || outputMatches.length) process.exitCode = 1;
} catch {
  console.error("Secret audit incomplete; no sensitive details emitted.");
  process.exitCode = 1;
}
