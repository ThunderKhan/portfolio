import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
test("project cards provide native distinct internal and external links", () => {
  const s = read("src/components/ProjectsGrid.tsx");
  assert.ok(s.includes("<article"));
  assert.ok(s.includes("<Link href={`/projects/${project.slug}`}"));
  assert.ok(s.includes('href={externalUrl} target="_blank" rel="noopener noreferrer"'));
  assert.ok(!s.includes("window.open(") && !s.includes("router.push("));
  assert.ok(s.includes("useReducedMotion"));
});
test("experience accordion triggers and closed panels have accessible semantics", () => {
  for (const path of ["src/components/ExperienceList.tsx", "src/app/experience/page.tsx"]) {
    const s = read(path);
    assert.ok(s.includes("<button") && s.includes('type="button"'));
    assert.ok(s.includes("aria-expanded={isOpen}") && s.includes("aria-controls="));
    assert.ok(s.includes("inert={!isOpen}") && s.includes("aria-hidden={!isOpen}"));
    assert.ok(s.includes("motion-safe:transition-[grid-template-rows]"));
  }
});
test("theme transition respects reduced motion and has a larger target", () => {
  const s = read("src/components/theme-toggle.tsx");
  assert.ok(s.includes('matchMedia("(prefers-reduced-motion: reduce)")'));
  assert.ok(s.includes("h-8 w-8"));
});
