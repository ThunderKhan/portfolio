import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { isPublicRelease, isTelemetryEnabled, previewIndexHeaders } from "../src/lib/release-policy.ts";
import { portfolio } from "../portfolio.config.ts";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("all public route templates define page-specific metadata", () => {
  const home = read("src/app/page.tsx");
  assert.match(home, /export const metadata = homeMetadata/);
  for (const route of ["projects", "experience", "contact"]) {
    assert.ok(read(`src/app/${route}/layout.tsx`).includes(`archiveMetadata("/${route}")`));
  }
  for (const route of ["blogs", "open-source", "certifications", "highlights"]) {
    assert.ok(read(`src/app/${route}/page.tsx`).includes(`archiveMetadata("/${route}")`));
  }
  for (const route of ["projects", "blogs"]) {
    const page = read(`src/app/${route}/[slug]/page.tsx`);
    assert.match(page, /export async function generateMetadata/);
    assert.match(page, /return pageMetadata\(/);
  }
});

test("canonical and social metadata share the same page URL", () => {
  const seo = read("src/lib/seo.ts");
  assert.ok(seo.includes("const url = absoluteUrl(path)"));
  assert.ok(seo.includes("alternates: { canonical: url }"));
  assert.ok(seo.includes("siteName: portfolio.name"));
  assert.ok(seo.includes('card: "summary_large_image"'));
  assert.ok(seo.includes('absoluteUrl("/opengraph-image")'));
});

test("preview stays noindex and does not advertise indexable sitemap entries", () => {
  assert.ok(read("src/app/layout.tsx").includes("robots: PUBLIC_RELEASE ? { index: true, follow: true } : { index: false, follow: false }"));
  assert.ok(read("src/app/robots.ts").includes("PUBLIC_RELEASE ? { sitemap:"));
  const sitemap = read("src/app/sitemap.ts");
  assert.ok(sitemap.includes("if (!PUBLIC_RELEASE) return []"));
  assert.ok(!sitemap.includes("new Date("));
  assert.ok(sitemap.includes("Object.keys(archivePages)"));
});

test("structured data is rendered on the relevant server pages with safe serialization", () => {
  assert.ok(read("src/app/page.tsx").includes("<JsonLd data={profileStructuredData()} />"));
  assert.ok(read("src/app/blogs/[slug]/page.tsx").includes("<JsonLd data={articleStructuredData(post)} />"));
  const schema = read("src/lib/structured-data.ts");
  for (const type of ["Person", "WebSite", "ProfilePage", "BlogPosting"]) {
    assert.ok(schema.includes(`"@type": "${type}"`));
  }
  assert.ok(read("src/components/JsonLd.tsx").includes('JSON.stringify(data).replace(/</g, "\\\\u003c")'));
});


test("homepage browser and social title is the owner's name only", () => {
  const seo = read("src/lib/seo.ts");
  assert.ok(seo.includes('const fullTitle = path === "/" ? portfolio.name :'));
  assert.match(seo, /homeMetadata = pageMetadata\(\{\s*path: "\/",\s*title: portfolio.name,/);
  assert.ok(!seo.includes("Software Developer · Systems and Applied AI"));
});

const approvedEnv = { NODE_ENV: "production", VERCEL_ENV: "production", VERCEL_GIT_COMMIT_REF: "main", PORTFOLIO_PUBLIC_RELEASE: "1" };

test("indexing requires an explicit main-branch production release", () => {
  assert.equal(isPublicRelease(approvedEnv, portfolio.url), true);
  for (const overrides of [
    { NODE_ENV: "development" },
    { NODE_ENV: undefined },
    { VERCEL_ENV: "preview" },
    { VERCEL_ENV: undefined },
    { VERCEL_GIT_COMMIT_REF: "design/mark-i-final-polish" },
    { VERCEL_GIT_COMMIT_REF: undefined },
    { PORTFOLIO_PUBLIC_RELEASE: undefined },
    { PORTFOLIO_PUBLIC_RELEASE: "true" },
    { NEXT_PUBLIC_SITE_URL: "https://staging.ayankhan.me" },
    { NEXT_PUBLIC_SITE_URL: "http://ayankhan.me" },
    { NEXT_PUBLIC_SITE_URL: "https://ayankhan.me/wrong" },
    { NEXT_PUBLIC_SITE_URL: "not-a-url" },
  ]) {
    const env = { ...approvedEnv, ...overrides };
    assert.equal(isPublicRelease(env, portfolio.url), false, JSON.stringify(overrides));
    assert.deepEqual(previewIndexHeaders(env, portfolio.url), [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]);
    assert.equal(isTelemetryEnabled({ ...env, PORTFOLIO_ENABLE_TELEMETRY: "1" }, portfolio.url), false);
  }
  assert.equal(isPublicRelease({}, portfolio.url), false);
  assert.deepEqual(previewIndexHeaders(approvedEnv, portfolio.url), []);
});

test("telemetry requires a separate explicit opt-in", () => {
  assert.equal(isTelemetryEnabled(approvedEnv, portfolio.url), false);
  assert.equal(isTelemetryEnabled({ ...approvedEnv, PORTFOLIO_ENABLE_TELEMETRY: "1" }, portfolio.url), true);
  assert.ok(read("src/app/blueprint/page.tsx").includes("robots: { index: false, follow: false }"));
});
