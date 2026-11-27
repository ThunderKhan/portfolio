import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { securityHeaders, resourcePolicy } from "../src/lib/security-headers.ts";

const headers = production => Object.fromEntries(securityHeaders(production).map(({ key, value }) => [key.toLowerCase(), value]));
const directives = policy => Object.fromEntries(policy.split(";").map(part => part.trim().split(/\s+/)).map(([name, ...values]) => [name, values]));

test("baseline headers deny framing, MIME sniffing and unused browser permissions", () => {
  for (const production of [false, true]) {
    const h = headers(production);
    assert.equal(h["x-content-type-options"], "nosniff");
    assert.equal(h["x-frame-options"], "DENY");
    assert.equal(h["referrer-policy"], "strict-origin-when-cross-origin");
    assert.equal(h["permissions-policy"], "camera=(), microphone=(), geolocation=(), payment=()");
    const csp = directives(h["content-security-policy"]);
    assert.deepEqual(csp["frame-ancestors"], ["'none'"]);
    assert.deepEqual(csp["object-src"], ["'none'"]);
    assert.deepEqual(csp["base-uri"], ["'none'"]);
    assert.deepEqual(csp["form-action"], ["'self'"]);
  }
});

test("production candidate is report-only; development keeps hot reload", () => {
  const prod = headers(true);
  const dev = headers(false);
  assert.equal(prod["content-security-policy-report-only"], resourcePolicy);
  assert.equal(dev["content-security-policy-report-only"], undefined);
  assert.equal(directives(prod["content-security-policy"])["script-src"], undefined);
  assert.equal(prod["strict-transport-security"], undefined);
});

test("candidate restricts resource origins without unsafe-eval or wildcard grants", () => {
  const csp = directives(resourcePolicy);
  for (const key of ["default-src", "connect-src", "font-src", "media-src", "worker-src", "manifest-src"]) {
    assert.deepEqual(csp[key], ["'self'"]);
  }
  assert.deepEqual(csp["script-src"], ["'self'", "'unsafe-inline'"]);
  assert.deepEqual(csp["script-src-attr"], ["'none'"]);
  assert.deepEqual(csp["style-src"], ["'self'", "'unsafe-inline'"]);
  assert.deepEqual(csp["img-src"], ["'self'", "data:"]);
  assert.deepEqual(csp["frame-src"], ["https://open.spotify.com"]);
  assert.doesNotMatch(resourcePolicy, /unsafe-eval|\*|report-uri|report-to/);
});

test("Next config applies security headers globally and disables framework disclosure", () => {
  const config = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  assert.match(config, /poweredByHeader: false/);
  assert.match(config, /source: "\/:path\*", headers: securityHeaders\(process\.env\.NODE_ENV === "production"\)/);
});
