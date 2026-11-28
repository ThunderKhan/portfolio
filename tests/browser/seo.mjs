import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { chromium } from "@playwright/test";
import { portfolio } from "../../portfolio.config.ts";

const origin = "http://127.0.0.1:4173";
const canonicalOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || portfolio.url).origin;
const absolute = path => new URL(path, canonicalOrigin).href;
// Next may omit the slash at the origin. Compare parsed absolute URLs
// while retaining checks for origin, path, query and fragment.
const normalized = value => {
  assert.equal(typeof value, "string", "Expected an absolute metadata URL");
  return new URL(value).href;
};
const read = path => readFileSync(new URL("../../" + path, import.meta.url), "utf8");
// Data files contain literal project slugs and stable article IDs.
// Use the actual source list so new detail pages cannot escape this check.
const projects = [...read("src/data/projectsData.ts").matchAll(/"slug":\s*"([^"]+)"/g)].map(m => "/projects/" + m[1]);
const blogs = [...read("src/data/blogsData.ts").matchAll(/slug:\s*'([^']+)'/g)].map(m => "/blogs/" + m[1]);
assert.ok(projects.length > 0 && blogs.length > 0);
const paths = ["/", "/projects", "/experience", "/open-source", "/blogs", "/certifications", "/highlights", "/contact", ...projects, ...blogs];
assert.equal(new Set(paths).size, paths.length);
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  await context.route("**/*", route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
  const page = await context.newPage();
  const titles = new Set();
  const descriptions = new Set();
  const socialImages = new Set();
  for (const path of paths) {
    const response = await page.goto(origin + path, { waitUntil: "domcontentloaded" });
    assert.equal(response.status(), 200, path);
    const meta = (name, property = "name") => page.locator(`head meta[${property}="${name}"]`).getAttribute("content");
    const canonical = page.locator('head link[rel="canonical"]');
    assert.equal(await canonical.count(), 1, path);
    assert.equal(normalized(await canonical.getAttribute("href")), absolute(path), path);
    const title = await page.title();
    if (path === "/") assert.equal(title, portfolio.name);
    assert.ok(title.includes(portfolio.name) && !titles.has(title), path + " title");
    titles.add(title);
    const description = await meta("description");
    assert.ok(description && !descriptions.has(description), path + " description");
    descriptions.add(description);
    assert.equal(normalized(await meta("og:url", "property")), absolute(path), path);
    assert.equal(await meta("og:title", "property"), title, path);
    assert.equal(await meta("og:description", "property"), description, path);
    assert.equal(await meta("twitter:title"), title, path);
    assert.equal(await meta("twitter:description"), description, path);
    assert.equal(await meta("twitter:card"), "summary_large_image", path);
    socialImages.add(await meta("og:image", "property"));
    socialImages.add(await meta("twitter:image"));
    if (portfolio.referencePreview) assert.match(await meta("robots"), /\bnoindex\b/, path);
    const data = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(text => JSON.parse(text));
    if (path === "/") {
      const graph = data.flatMap(item => item["@graph"] ?? []);
      for (const type of ["Person", "WebSite", "ProfilePage"]) assert.ok(graph.some(item => item["@type"] === type), type);
      const person = graph.find(item => item["@type"] === "Person");
      const profile = graph.find(item => item["@type"] === "ProfilePage");
      assert.equal(person.name, portfolio.name);
      assert.equal(profile.mainEntity["@id"], person["@id"]);
      assert.equal(person.image, absolute(portfolio.avatar));
    } else if (blogs.includes(path)) {
      const article = data.find(item => item["@type"] === "BlogPosting");
      assert.ok(article, path);
      assert.equal(article.url, absolute(path));
      assert.equal(article.author.name, portfolio.name);
      assert.match(article.datePublished, /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(await meta("og:type", "property"), "article");
    }
    console.log("PASS " + path);
  }
  for (const image of socialImages) {
    const url = new URL(image);
    assert.equal(url.origin, canonicalOrigin);
    const response = await fetch(origin + url.pathname + url.search);
    assert.equal(response.status, 200, image);
    assert.match(response.headers.get("content-type"), /^image\//, image);
    await response.arrayBuffer();
  }
  const robotsResponse = await fetch(origin + "/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Disallow:\s*\/api\//i);
  const sitemapResponse = await fetch(origin + "/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  if (portfolio.referencePreview) {
    assert.doesNotMatch(robots, /Sitemap:/i);
    assert.equal(urls.length, 0);
  } else {
    assert.match(robots, /Sitemap:/i);
    assert.deepEqual(urls.map(normalized).sort(), paths.map(absolute).sort());
  }
  for (const old of ["/blogs/cpp-test-impact-analysis-zero-runtime-dependencies", "/blog/cpp-test-impact-analysis-zero-runtime-dependencies", "/blog/i-built-c-test-impact-analysis-with-zero-runtime-dependencies"]) {
    const response = await fetch(origin + old, { redirect: "manual" });
    assert.equal(response.status, 308, old);
    assert.equal(new URL(response.headers.get("location"), origin).pathname, "/blogs/001", old);
  }
  for (const path of ["/projects/missing-seo-test", "/blogs/missing-seo-test", "/missing-seo-test"]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 404, path);
  }
  console.log(`SEO PASS: ${paths.length} content pages, social images, robots, sitemap, 3 redirects and 3 missing routes.`);
} finally {
  await browser.close();
}
