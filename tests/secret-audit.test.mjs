import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { credentialPath, publicSecretName, containsSecret, isPublicBuildFile, secretAuditMode, knownSecretRequirementMet } from "../scripts/lib/secret-audit.mjs";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("only the root empty environment template is exempt from credential-path checks", () => {
  for (const path of [".env", ".env.local", "nested/.env.example", ".npmrc", "keys/token.key", "keys/cert.p12", "id_ed25519"]) assert.equal(credentialPath(path), true, path);
  assert.equal(credentialPath(".env.example"), false);
  assert.equal(credentialPath("src/lib/site.ts"), false);
});

test("known secrets and token patterns are found without returning their values", () => {
  const synthetic = "gh" + "p_" + "a".repeat(36);
  assert.equal(containsSecret(Buffer.from("prefix " + synthetic)), true);
  assert.equal(containsSecret(Buffer.from("prefix custom-value"), ["custom-value"]), true);
  assert.equal(containsSecret(Buffer.from("ordinary text"), ["custom-value"]), false);
  assert.equal(containsSecret(Buffer.from("ordinary text"), [""]), false);
});

test("browser output paths include generated HTML and RSC but not server code", () => {
  for (const path of ["public/file.pdf", ".next/static/chunks/main.js", ".next/server/app/index.html", ".next\\server\\app\\index.rsc"]) assert.equal(isPublicBuildFile(path), true, path);
  assert.equal(isPublicBuildFile(".next/server/app/api/github/route.js"), false);
  assert.equal(isPublicBuildFile(".env.local"), false);
});

test("public environment names reject sensitive aliases and keep the site origin public", () => {
  assert.equal(publicSecretName("NEXT_PUBLIC_GITHUB_TOKEN"), true);
  assert.equal(publicSecretName("NEXT_PUBLIC_PRIVATE_KEY"), true);
  assert.equal(publicSecretName("NEXT_PUBLIC_SITE_URL"), false);
  assert.equal(publicSecretName("GITHUB_TOKEN"), false);
});

test("credential ignores cover local env and private keys without exposing the template", () => {
  const gitignore = read(".gitignore");
  const dockerignore = read(".dockerignore");
  for (const value of [".env*", ".npmrc", "*.key", "*.p12", "*.pfx", "id_ed25519"]) {
    assert.ok(gitignore.split("\n").includes(value), value);
    assert.ok(dockerignore.split("\n").includes(value), value);
  }
  assert.ok(gitignore.includes("!/.env.example"));
  assert.match(read(".env.example"), /^GITHUB_TOKEN=$/m);
  assert.doesNotMatch(read(".env.example"), /^GITHUB_TOKEN=.+$/m);
});

test("credential-free CI is explicit and does not weaken the default local gate", () => {
  assert.equal(secretAuditMode([]), "local");
  assert.equal(secretAuditMode(["--ci-no-token"]), "ci-no-token");
  assert.throws(() => secretAuditMode(["--unknown"]));
  assert.equal(knownSecretRequirementMet("local", 0), false);
  assert.equal(knownSecretRequirementMet("local", 1), true);
  assert.equal(knownSecretRequirementMet("ci-no-token", 0), true);
  assert.equal(knownSecretRequirementMet("unknown", 1), false);
});
