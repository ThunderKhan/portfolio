import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");
test("approved display and monospace typography replace inherited fonts", () => {
  const layout = read("src/app/layout.tsx");
  assert.ok(layout.includes("Barlow_Semi_Condensed"));
  assert.ok(!layout.includes("Doto"));
  assert.ok(layout.includes("Geist_Mono"));
  const css = read("src/app/globals.css");
  assert.ok(css.includes(".mark-display"));
  assert.ok(css.includes(".mark-section-title"));
  const clock = read("src/components/CurrentTime.tsx");
  assert.ok(clock.includes("font-mono tabular-nums"));
  assert.ok(!clock.includes("font-doto"));
});
test("primary page headings no longer use inherited RGB glitch shadows", () => {
  for (const path of ["src/app/page.tsx","src/app/projects/page.tsx","src/app/projects/[slug]/page.tsx","src/app/experience/page.tsx","src/app/blogs/page.tsx","src/app/blogs/[slug]/page.tsx","src/app/contact/page.tsx","src/app/open-source/page.tsx","src/app/certifications/page.tsx","src/app/highlights/page.tsx"]) {
    const source = read(path);
    assert.ok(!source.includes("[text-shadow:-1.5px_0_0_rgba"), path);
    assert.ok(source.includes("mark-display") || source.includes("mark-page-title"), path);
  }
});

test("MARK I homepage preview uses the approved brand primitives", () => {
  const css = read("src/app/globals.css");
  for (const color of ["#AA0505", "#6A0C0B", "#B97D10", "#FBCA03", "#67C7EB", "#F4FBFF"]) assert.ok(css.includes(color));
  assert.ok(read("src/app/page.tsx").includes("mark-home min-h-screen"));
  assert.ok(read("src/components/pixel-perfect/soft-pill-button.tsx").includes("mark-primary-action"));
  assert.ok(read("src/components/RightNavbar.tsx").includes('aria-current={isActive ? "location" : undefined}'));
});

test("all primary routes share MARK I page surfaces", () => {
  for (const path of ["src/app/projects/page.tsx","src/app/projects/[slug]/page.tsx","src/app/experience/page.tsx","src/app/blogs/page.tsx","src/app/blogs/[slug]/page.tsx","src/app/contact/page.tsx","src/app/open-source/page.tsx","src/app/certifications/page.tsx","src/app/highlights/page.tsx"]) {
    assert.ok(read(path).includes("mark-page "), path);
  }
  const css = read("src/app/globals.css");
  assert.ok(css.includes(".mark-home,\n.mark-page"));
  assert.ok(css.includes(".mark-panel,\n.mark-surface"));
  assert.ok(read("src/components/ProjectsGrid.tsx").includes("mark-surface"));
  assert.ok(read("src/components/Education.tsx").includes("mark-panel"));
});

test("shared cards and controls consume common theme surfaces", () => {
  for (const path of ["src/components/Certifications.tsx","src/components/Hackathons.tsx","src/components/EventHighlights.tsx","src/components/SpotifyCard.tsx","src/components/Highlights.tsx","src/components/CertificateLink.tsx","src/components/OpenSourceWork.tsx"]) {
    assert.match(read(path), /mark-panel|mark-surface/, path);
  }
  assert.ok(read("src/components/command-menu.tsx").includes('aria-label="Open command menu"'));
  assert.ok(read("src/components/RightNavbar.tsx").includes('aria-label="Portfolio sections"'));
  assert.ok(!read("src/components/pixel-perfect/soft-pill-button.tsx").includes("radial-gradient"));
});

test("engineering activity uses metallic gold in both themes with a shared legend", () => {
  const css = read("src/app/globals.css");
  const graph = read("src/components/GithubGraph.tsx");
  assert.ok(css.includes("--mark-activity-4: var(--mark-gold)"));
  for (let level = 0; level <= 4; level++) {
    assert.ok(css.includes(".mark-activity-" + level));
    assert.ok(graph.includes('cell: "mark-activity-' + level + '"'));
  }
  assert.ok(graph.includes("contributionLevels.map"));
  assert.ok(graph.includes("const color = contributionLevels[level]"));
  assert.ok(!graph.includes("dark:opacity-70"));
});
test("brand accents appear in shared section, project and achievement treatments", () => {
  const css = read("src/app/globals.css");
  assert.ok(css.includes(".mark-section-title::before"));
  assert.ok(css.includes(".mark-project-frame {\n  border-color: var(--mark-seam);\n  background-color: var(--mark-panel);\n}"));
  assert.ok(read("src/components/ProjectsGrid.tsx").includes("mark-project-frame"));
  assert.ok(read("src/components/Hackathons.tsx").includes("mark-achievement"));
  assert.ok(read("src/components/OpenSourceList.tsx").includes("mark-reactor-text"));
});

test("original black theme uses neutral cards without themed side panels", () => {
  const css = read("src/app/globals.css");
  assert.ok(css.includes("--mark-page: #F4F3EF"));
  assert.ok(css.includes("--mark-page: #000000"));
  assert.ok(css.includes("--mark-panel: #09090B"));
  assert.ok(css.includes("--mark-seam: #27272A"));
  assert.ok(!css.includes("--mark-page: #18252B"));
  assert.ok(!css.includes("--mark-workshop-ambient"));
  assert.ok(!css.includes("--mark-workshop-grid"));
  assert.ok(!css.includes("border-top: 3px solid var(--mark-armor-seam)"));
  assert.ok(css.includes("--mark-activity-4: var(--mark-gold)"));
  assert.ok(css.includes('.dark [data-slot="dialog-content"]'));
});

test("avatar renders the original image without a decorative frame or filter", () => {
  const home = read("src/app/page.tsx");
  assert.ok(home.includes("src={portfolio.heroAvatar}"));
  assert.ok(!home.includes("mark-hero-avatar"));
  assert.ok(!home.includes("object-cover grayscale"));
  assert.ok(!read("src/app/globals.css").includes(".mark-hero-avatar"));
  assert.ok(!home.includes("Development preview"));
  assert.ok(read("portfolio.config.ts").includes("referencePreview: true"));
  assert.ok(read("src/app/layout.tsx").includes("robots: { index: false, follow: false }"));
});
test("portfolio links are arrow-free and retain text navigation and disclosure affordances", () => {
  for (const path of ["src/app/page.tsx","src/app/projects/page.tsx","src/app/projects/[slug]/page.tsx","src/app/blogs/page.tsx","src/app/blogs/[slug]/page.tsx","src/app/experience/page.tsx","src/app/contact/page.tsx","src/app/certifications/page.tsx","src/app/highlights/page.tsx","src/app/open-source/page.tsx","src/components/ProjectsGrid.tsx","src/components/BlogList.tsx","src/components/OpenSourceList.tsx","src/components/Certifications.tsx","src/components/CertificateLink.tsx","src/components/EventHighlights.tsx","src/components/ExperienceList.tsx","src/components/Hackathons.tsx","src/components/Highlights.tsx","src/components/Education.tsx","src/components/SpotifyCard.tsx","src/components/OpenSourceWork.tsx","src/components/DsaStats.tsx","src/components/command-menu.tsx"]) {
    const source = read(path);
    assert.ok(!/<(?:Arrow(?:Left|Right|UpRight|Up|Down)|ChevronDown|ExternalLink|CornerDownLeft)\b/.test(source), path);
    assert.ok(!source.includes('points="7 7 17 7 17 17"'), path);
    assert.ok(!source.includes('points="6 9 12 15 18 9"'), path);
  }
  assert.ok(read("src/app/projects/page.tsx").includes(">\n                Back"));
  assert.ok(read("src/components/OpenSourceList.tsx").includes('isOpen ? "−" : "+"'));
  assert.ok(read("src/components/EventHighlights.tsx").includes(">View</Link>"));
});
