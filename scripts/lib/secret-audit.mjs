// Deliberately narrow, high-signal checks. Not a comprehensive secret scanner.
// Construct patterns without embedding a token-like example in tracked source.
export const tokenPattern = "(gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{60,}|AKIA[A-Z0-9]{16}|ASIA[A-Z0-9]{16}|-----BEGIN (RSA |EC |DSA |OPENSSH |ENCRYPTED )?PRIVATE KEY-----)";
const tokens = new RegExp(tokenPattern);

export function credentialPath(path) {
  const name = path.replaceAll("\\", "/").split("/").at(-1);
  if (path === ".env.example") return false;
  return /^\.env(?:$|\.)|^\.npmrc$|\.(?:pem|key|p12|pfx)$|^id_(?:rsa|ed25519)$/i.test(name);
}

export function publicSecretName(name) {
  return /^NEXT_PUBLIC_.*(?:GITHUB.*TOKEN|TOKEN.*GITHUB|SECRET|PASSWORD|PRIVATE_KEY)/i.test(name);
}

export function containsSecret(bytes, knownSecrets = []) {
  return knownSecrets.some(secret => secret && bytes.includes(Buffer.from(secret))) ||
    tokens.test(bytes.toString("utf8"));
}

export function isPublicBuildFile(path) {
  const p = path.replaceAll("\\", "/");
  return p.startsWith(".next/static/") || p.startsWith("public/") ||
    (p.startsWith(".next/server/app/") && /\.(?:html|rsc|body|json|txt|xml)$/i.test(p));
}

// CI may deliberately run without a real credential; local verification remains strict.
export function secretAuditMode(args) {
  if (args.length === 0) return "local";
  if (args.length === 1 && args[0] === "--ci-no-token") return "ci-no-token";
  throw new Error("Unknown secret audit arguments");
}

export function knownSecretRequirementMet(mode, count) {
  return mode === "ci-no-token" || (mode === "local" && count > 0);
}
