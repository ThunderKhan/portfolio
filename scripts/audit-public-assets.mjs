// Local inventory including untracked files. Do not expose document text,
// metadata values, QR contents, credentials or screenshot contents.
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { inspectAsset, requiresVisualReview } from "./lib/public-assets.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicRoot = join(root, "public");
const slash = path => path.replaceAll("\\", "/");
function walk(dir, paths = [], symlinks = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isSymbolicLink()) symlinks.push(path);
    else if (entry.isDirectory()) walk(path, paths, symlinks);
    else if (entry.isFile()) paths.push(path);
    else symlinks.push(path);
  }
  return { paths, symlinks };
}
try {
  const git = spawnSync("git", ["ls-files", "-z", "--", "public"], { cwd: root, encoding: "utf8", windowsHide: true });
  if (git.status !== 0 || git.error) throw new Error("git unavailable");
  const tracked = new Set(git.stdout.split("\0").filter(Boolean));
  const sources = walk(join(root, "src")).paths.filter(path => /\.(?:ts|tsx|js|jsx|css|json|mdx)$/.test(path));
  const sourceText = [join(root, "portfolio.config.ts"), ...sources].map(path => readFileSync(path, "utf8")).join("\n");
  const { paths, symlinks } = walk(publicRoot);
  const files = paths.sort().map(file => {
    const path = slash(relative(publicRoot, file));
    const bytes = readFileSync(file);
    return {
      path,
      bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex"),
      tracked: tracked.has("public/" + path),
      referenced: sourceText.includes("/" + path),
      visualReview: requiresVisualReview(path),
      ...inspectAsset(path, bytes),
    };
  });
  const result = {
    filesScanned: files.length,
    totalBytes: files.reduce((sum, file) => sum + file.bytes, 0),
    untracked: files.filter(file => !file.tracked).map(file => file.path),
    unreferencedCandidates: files.filter(file => !file.referenced).map(file => file.path),
    metadataCandidates: files.filter(file => file.metadata.length).map(({ path, metadata }) => ({ path, metadata })),
    structuralFindings: files.filter(file => file.findings.length).map(({ path, findings }) => ({ path, findings })),
    symlinksOrSpecialFiles: symlinks.map(file => slash(relative(publicRoot, file))),
    visualReviewRequired: files.filter(file => file.visualReview).map(file => file.path),
  };
  console.log(JSON.stringify(result, null, 2));
  if (result.structuralFindings.length || result.symlinksOrSpecialFiles.length) process.exitCode = 1;
} catch {
  console.error("Public asset audit incomplete; review local access and file integrity.");
  process.exitCode = 1;
}
