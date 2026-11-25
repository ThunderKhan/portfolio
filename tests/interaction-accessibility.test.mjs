import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
test("project cards provide native distinct internal and external links", () => {
  const s = read("src/components/ProjectsGrid.tsx");
  assert.ok(s.includes("<motion.article") && s.includes('whileHover={reduceMotion ? "rest" : "hover"}'));
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

test("every primary route has a keyboard-focusable main landmark", () => {
  for (const path of ["src/app/page.tsx","src/app/projects/page.tsx","src/app/projects/[slug]/page.tsx","src/app/experience/page.tsx","src/app/blogs/page.tsx","src/app/blogs/[slug]/page.tsx","src/app/contact/page.tsx","src/app/open-source/page.tsx","src/app/certifications/page.tsx","src/app/highlights/page.tsx"]) {
    const s = read(path);
    assert.equal((s.match(/<main\b/g) || []).length, 1, path);
    assert.ok(s.includes('<main id="main-content" tabIndex={-1}'), path);
  }
  assert.ok(read("src/app/layout.tsx").includes('href="#main-content"'));
});
test("contact form labels and actual submission status are exposed", () => {
  const s = read("src/app/contact/page.tsx");
  for (const field of ["name", "email", "message"]) {
    assert.ok(s.includes('htmlFor="contact-' + field + '"'));
    assert.ok(s.includes('id="contact-' + field + '"'));
  }
  assert.ok(s.includes('role="status"') && s.includes("Message could not be sent"));
});
