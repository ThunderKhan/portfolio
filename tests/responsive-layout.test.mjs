import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
test("primary routes align content and headers using the same responsive gutter", () => {
  for (const path of ["src/app/page.tsx","src/app/projects/page.tsx","src/app/projects/[slug]/page.tsx","src/app/experience/page.tsx","src/app/blogs/page.tsx","src/app/blogs/[slug]/page.tsx","src/app/contact/page.tsx","src/app/open-source/page.tsx","src/app/certifications/page.tsx","src/app/highlights/page.tsx"]) {
    const s = read(path);
    assert.ok(s.includes("ml-[var(--mark-gutter)]") && s.includes("mr-[var(--mark-gutter)]"), path);
    assert.ok(s.includes("left-[var(--mark-gutter)]") && s.includes("right-[var(--mark-gutter)]"), path);
    assert.ok(!/(?:left|right|ml|mr)-\[30%\]/.test(s), path);
  }
  assert.ok(read("src/app/globals.css").includes("max(24px, calc((100vw - 800px) / 2))"));
});
test("responsive calendar and desktop index use local scrolling", () => {
  const calendar = read("src/components/GithubGraph.tsx");
  assert.ok(calendar.includes("min-w-[560px]") && calendar.includes("overflow-x-auto pb-2"));
  const nav = read("src/components/RightNavbar.tsx");
  assert.ok(nav.includes("hidden xl:block") && nav.includes("overflow-y-auto"));
  assert.ok(read("src/components/ui/command.tsx").includes("40dvh"));
});

test("runtime image quality and smooth-scroll config match the application", () => {
  assert.ok(read("next.config.ts").includes("qualities: [60, 70, 75, 80, 90, 100]"));
  assert.ok(read("src/app/layout.tsx").includes('data-scroll-behavior="smooth"'));
});
test("unavailable activity does not render an empty calendar as actual history", () => {
  const graph = read("src/components/GithubGraph.tsx");
  assert.ok(graph.includes("!loading && weeks.length === 0 ? ("));
  assert.ok(graph.includes("View activity on GitHub"));
  assert.ok(read("src/lib/stats/github-service.ts").includes('fallback(503, "GitHub is not configured")'));
});


test("preview does not inject production telemetry scripts", () => {
  assert.match(read("src/app/layout.tsx"), /\{!portfolio\.referencePreview && \([\s\S]*?<Analytics \/>[\s\S]*?<SpeedInsights \/>/);
});
test("social hover artwork loads only when its card is open", () => {
  const source = read("src/components/pixel-perfect/social-hover-card.tsx");
  assert.ok(!source.includes("ReactDOM.preload"));
  assert.ok(!source.includes("getImageProps"));
  assert.match(source, /\{isOpen && \([\s\S]*?src=\{bannerImage\}/);
  assert.ok(source.includes('loading="eager"'));
});

test("static blog lists keep article content outside the client boundary", () => {
  const source = read("src/components/BlogList.tsx");
  assert.ok(!source.includes('"use client"'));
  assert.ok(source.includes('import { blogsData } from "@/data/blogsData"'));
  for (const path of ["src/app/page.tsx", "src/app/blogs/page.tsx"]) {
    assert.ok(!read(path).includes('"use client"'));
    assert.ok(read(path).includes("<BlogList"));
  }
});
test("social hover cards reuse the existing public hero artwork", () => {
  const source = read("src/components/pixel-perfect/social-hover-card.tsx");
  assert.ok(source.includes('const bannerImage = "/banner/starry-night.png";'));
  assert.ok(!source.includes('import bannerImage'));
  assert.ok(read("src/components/StarryNightBanner.tsx").includes("/banner/starry-night.png"));
});
test("project and social card motion use only the required feature bundle", () => {
  for (const path of ["src/components/ProjectsGrid.tsx", "src/components/pixel-perfect/social-hover-card.tsx"]) {
    const source = read(path);
    assert.ok(source.includes("<LazyMotion features={domAnimation} strict>"));
    assert.ok(source.includes("<m."));
    assert.ok(!source.includes("<motion."));
    assert.ok(!source.includes("domMax"));
    assert.ok(source.includes("<AnimatePresence>"));
  }
});

test("above-fold hero artwork is eagerly loaded with high fetch priority", () => {
  const source = read("src/components/StarryNightBanner.tsx");
  const image = source.match(/<Image\s+src="\/banner\/starry-night\.png"[\s\S]*?\/>/)?.[0];
  assert.ok(image);
  assert.match(image, /loading="eager"/);
  assert.match(image, /fetchPriority="high"/);
  assert.doesNotMatch(image, /loading="lazy"/);
});

test("hero compression retains eager priority and the approved image geometry", () => {
  const source = read("src/components/StarryNightBanner.tsx");
  assert.match(source, /quality=\{80\}/);
  assert.match(source, /loading="eager"/);
  assert.match(source, /fetchPriority="high"/);
  assert.ok(source.includes('className="object-cover object-[75%_50%]"'));
});

test("project screenshot sizes reflect the actual home and archive panel widths", () => {
  const source = read("src/components/ProjectsGrid.tsx");
  assert.match(source, /const HOME_PREVIEW_SIZES = "[^"]*calc\(85vw - 56px\)"/);
  assert.match(source, /const ARCHIVE_PREVIEW_SIZES = "[^"]*calc\(85vw - 28px\)"/);
  assert.ok(source.includes("previewSizes = ARCHIVE_PREVIEW_SIZES"));
  assert.ok(source.includes("sizes={previewSizes}"));
  assert.equal(source.match(/previewSizes=\{HOME_PREVIEW_SIZES\}/g)?.length, 2);
  assert.ok(source.includes("w-[85%]"));
});
