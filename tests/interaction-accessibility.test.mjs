import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";
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

test("dialog labels live within content and shortcuts do not intercept uppercase typing", () => {
  const s = read("src/components/ui/command.tsx");
  assert.ok(s.indexOf("<DialogHeader className") > s.indexOf("<DialogContent"));
  const menu = read("src/components/command-menu.tsx");
  assert.ok(menu.includes('aria-label="Search commands"'));
  assert.ok(menu.includes("onCloseAutoFocus") && !menu.includes("!e.shiftKey"));
});
test("calendar daily values are available as a native data table", () => {
  const s = read("src/components/GithubGraph.tsx");
  assert.ok(s.includes("Daily activity") && s.includes("<table") && s.includes('scope="row"'));
  assert.ok(s.includes("graphWeeks.flatMap"));
});
test("hackathon disclosure hides closed content and respects reduced motion", () => {
  const s = read("src/components/Hackathons.tsx");
  assert.ok(s.includes("aria-controls=") && s.includes("inert={!isOpen}") && s.includes("aria-hidden={!isOpen}"));
  assert.ok(s.includes("motion-safe:transition-[grid-template-rows]"));
});

test("education definition list groups contain only terms and descriptions", () => {
  const s = read("src/components/Education.tsx");
  const list = s.slice(s.indexOf("<dl "), s.indexOf("</dl>"));
  assert.ok(list.includes("<dt ") && list.includes("<dd "));
  assert.ok(!list.includes("<p "), "Use dd for grading scale descriptions");
});
test("command shortcut is part of the accessible name and separators are decorative", () => {
  const menu = read("src/components/command-menu.tsx");
  assert.ok(menu.includes('>⌘</span>') && menu.includes('>K</span>'));
  assert.ok(menu.includes('<span className="sr-only">Open command menu</span>'));
  assert.ok(!menu.includes('aria-label="Open command menu'));
  const s = read("src/components/ui/command.tsx");
  assert.ok(/data-slot="command-separator"\s+aria-hidden="true"/.test(s));
});
test("declared project screenshots exist and absent screenshots avoid image requests", () => {
  const s = read("src/data/projectsData.ts");
  const paths = [...s.matchAll(/"(?:src|lightModeSrc)": "(\/project-image\/[^"]+)"/g)].map(m => m[1]);
  assert.ok(paths.length > 0);
  for (const path of paths) assert.ok(existsSync(new URL("../public" + path, import.meta.url)), path);
  assert.ok(read("src/components/ProjectPreview.tsx").includes("if (!src || failedSrc === src)"));
});

test("lint ignores generated browser artifacts but not browser test source", () => {
  const config = read("eslint.config.mjs");
  assert.ok(config.includes('"tests/browser/playwright-report/**"'));
  assert.ok(config.includes('"tests/browser/test-results/**"'));
  assert.ok(!config.includes('"tests/browser/**"'));
});
