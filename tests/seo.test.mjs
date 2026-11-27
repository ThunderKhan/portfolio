import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
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
  assert.match(read("src/app/layout.tsx"), /portfolio\.referencePreview \? \{ robots: \{ index: false, follow: false \}/);
  assert.ok(read("src/app/robots.ts").includes("!portfolio.referencePreview"));
  const sitemap = read("src/app/sitemap.ts");
  assert.ok(sitemap.includes("if (portfolio.referencePreview) return []"));
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
