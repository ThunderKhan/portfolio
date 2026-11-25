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
  assert.ok(read("src/app/api/github/route.ts").includes('fallback(503, "GitHub is not configured")'));
});
