// Build only committed, explicitly selected inputs (not the local worktree).
// Runs a temporary, loopback-only Linux container with no credential injection.
import { spawnSync } from "node:child_process";
import { closeSync, mkdtempSync, openSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { setTimeout as delay } from "node:timers/promises";

const root = fileURLToPath(new URL("../", import.meta.url));
const image = "mark-i:security-check";
const name = "mark-i-audit-" + randomUUID().slice(0, 8);
const inputs = ["Dockerfile", ".dockerignore", "package.json", "package-lock.json", "next.config.ts", "portfolio.config.ts", "postcss.config.mjs", "tsconfig.json", "LICENSE", "src", "public"];

function command(executable, args, options = {}) {
  const result = spawnSync(executable, args, { cwd: root, encoding: "utf8", windowsHide: true, maxBuffer: 4 * 1024 * 1024, ...options });
  if (result.error || result.status !== 0) throw new Error(executable + " " + args[0] + " failed");
  return result.stdout?.trim();
}
function docker(...args) { return command("docker", args); }
function check(condition, message) { if (!condition) throw new Error(message); }

let temp;
let created = false;
try {
  check(docker("info", "--format", "{{.OSType}}") === "linux", "Docker Desktop must be running Linux containers");
  const revision = command("git", ["rev-parse", "HEAD"]);
  temp = mkdtempSync(join(tmpdir(), "mark-i-docker-"));
  const archive = join(temp, "context.tar");
  command("git", ["archive", "--format=tar", "--output=" + archive, revision, "--", ...inputs]);
  const fd = openSync(archive, "r");
  try {
    command("docker", ["build", "--pull", "-t", image, "-"], { stdio: [fd, "inherit", "inherit"] });
  } finally { closeSync(fd); }
  const config = JSON.parse(docker("image", "inspect", "--format", "{{json .Config.Env}}", image));
  check(!config.some(value => /^(?:GITHUB_TOKEN|NEXT_PUBLIC_.*TOKEN)=/i.test(value)), "Credential-like environment entry found in image");
  const imageId = docker("image", "inspect", "--format", "{{.Id}}", image);
  docker("run", "-d", "--init", "--name", name, "--cap-drop=ALL", "--security-opt=no-new-privileges:true", "--pids-limit=256", "--memory=1g", "--cpus=1.5", "-p", "127.0.0.1::3000", image);
  created = true;
  let health = "";
  for (let attempt = 0; attempt < 50; attempt++) {
    health = docker("inspect", "--format", "{{.State.Health.Status}}", name);
    if (health === "healthy") break;
    check(docker("inspect", "--format", "{{.State.Running}}", name) === "true", "Container stopped before becoming healthy");
    await delay(2000);
  }
  check(health === "healthy", "Container health check did not pass");
  const binding = docker("port", name, "3000/tcp");
  check(/^127\.0\.0\.1:\d+$/.test(binding), "Unexpected port binding");
  const origin = "http://" + binding;
  const host = JSON.parse(docker("inspect", "--format", "{{json .HostConfig}}", name));
  check(!host.Privileged && host.CapDrop?.includes("ALL") && host.SecurityOpt?.some(v => v.startsWith("no-new-privileges")) && host.PidsLimit === 256 && host.Memory === 1073741824 && host.NanoCpus === 1500000000, "Runtime isolation settings differ from expected");

  const runtime = JSON.parse(docker("exec", name, "node", "-e", [
    "const fs=require('node:fs');",
    "const status=fs.readFileSync('/proc/self/status','utf8');",
    "const writable=p=>{try{fs.accessSync(p,fs.constants.W_OK);return true}catch{return false}};",
    "console.log(JSON.stringify({uid:process.getuid(),capabilitiesDropped:/^CapEff:\\s+0+$/m.test(status),noNewPrivileges:/^NoNewPrivs:\\s+1$/m.test(status),entryWritable:writable('/app/server.js'),publicWritable:writable('/app/public'),staticWritable:writable('/app/.next/static'),cacheWritable:writable('/app/.next/cache'),isrWritable:writable('/app/.next/server/app'),privateFilesAbsent:['.env','.env.local','.env.example','.npmrc','.git','.agents','tests','scripts'].every(p=>!fs.existsSync('/app/'+p)),tokenAbsent:!Object.hasOwn(process.env,'GITHUB_TOKEN')}));",
  ].join(" ")));
  check(runtime.uid !== 0 && runtime.capabilitiesDropped && runtime.noNewPrivileges && !runtime.entryWritable && !runtime.publicWritable && !runtime.staticWritable && runtime.cacheWritable && runtime.isrWritable && runtime.privateFilesAbsent && runtime.tokenAbsent, "Runtime permission or secret checks failed");

  const responses = [];
  for (const [path, type] of [["/", "text/html"], ["/projects/diff2test", "text/html"], ["/blogs/001", "text/html"], ["/robots.txt", "text/plain"], ["/Ayan_Khan_Resume.pdf", "application/pdf"], ["/education-image/ddugu.jpg", "image/jpeg"], ["/_next/image?url=%2Fprofile%2Firon-man.jpg&w=640&q=80", "image/"]]) {
    const response = await fetch(origin + path, { signal: AbortSignal.timeout(15000), redirect: "error" });
    check(response.ok && response.headers.get("content-type")?.startsWith(type), "HTTP smoke check failed: " + path);
    if (path === "/") check(response.headers.has("content-security-policy") && !response.headers.has("x-powered-by"), "Security response headers missing");
    await response.arrayBuffer();
    responses.push({ path, status: response.status });
  }
  const api = await fetch(origin + "/api/github", { method: "POST", signal: AbortSignal.timeout(10000) });
  const payload = await api.json();
  check((api.status === 503 && typeof payload.error === "string") || (api.ok && payload.stale === true && payload.calendar), "Missing-token fallback failed");
  console.log(JSON.stringify({ revision, imageId, health, runtime, http: responses, missingTokenApiStatus: api.status, isolationChecksPassed: true }, null, 2));
} catch (error) {
  console.error("Docker audit failed: " + error.message);
  process.exitCode = 1;
} finally {
  if (created) {
    const cleanup = spawnSync("docker", ["rm", "-f", name], { cwd: root, stdio: "ignore", windowsHide: true });
    if (cleanup.status !== 0) { console.error("Could not clean up test container: " + name); process.exitCode = 1; }
  }
  if (temp) rmSync(temp, { recursive: true, force: true });
}
