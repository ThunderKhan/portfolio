import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
test("project cards provide native distinct internal and external links", () => {
  const s = read("src/components/ProjectsGrid.tsx");
  assert.ok(s.includes("<m.article") && s.includes('whileHover={reduceMotion ? "rest" : "hover"}'));
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
    assert.ok(s.includes("mark-disclosure-panel"));
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
  assert.ok(s.includes("mark-disclosure-panel"));
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


test("MARK I palette keeps accessible commands and prioritizes navigation", () => {
  const menu = read("src/components/command-menu.tsx");
  const css = read("src/components/command-menu.module.css");
  assert.ok(menu.includes("MARK I") && menu.includes('aria-label="Search commands"'));
  assert.ok(menu.indexOf('heading="Navigate"') < menu.indexOf('heading="Sections"'));
  assert.ok(menu.indexOf('heading="Quick actions"') < menu.indexOf('heading="Projects"'));
  assert.ok(menu.includes('portfolio.repo && <CommandItem') && menu.includes('openExternal(portfolio.repo)'));
  assert.ok(menu.includes('portfolio.sections.blog && <CommandItem'));
  assert.match(css, /\[data-selected="true"\]\s*\{[^}]*box-shadow: inset 2px 0 var\(--mark-interaction\)/);
  assert.match(css, /\.dialog\s*\{[^}]*animation: none !important/);
  assert.ok(menu.includes('router.push("/blueprint")'));
});


test("terminal accepts only explicit commands and never interprets shell syntax", async () => {
  const { resolveTerminalCommand: resolve, terminalReply } = await import("../src/lib/terminal-commands.ts");
  for (const [input, command] of [["sudo hire Ayan", "hire"], ["  SUDO   HIRE   AYAN ", "hire"], ["whoami", "identity"], ["ls", "list"], ["cat resume.pdf", "resume"], ["git log --oneline", "source"], ["sudo make coffee", "coffee"], ["jarvis", "terminal"], ["help", "help"], ["man mark-i", "blueprint"], ["sudo inspect mark-i", "blueprint"], ["clear", "clear"], ["exit", "exit"]]) assert.equal(resolve(input), command);
  for (const input of ["sudo hire ayan; ls", "sudo hire ayan && whoami", "cat /etc/passwd", "ls | cat", "constructor", "__proto__", "javascript:alert(1)", "x".repeat(161)]) assert.equal(resolve(input), null);
  assert.match(terminalReply("identity", "Owner", "Developer", []), /Owner\nDeveloper/);
  assert.match(terminalReply("list", "", "", ["projects/"]), /projects\/.*contact\//);
  assert.equal(terminalReply(null, "", "", []), "Command not found. Try help.");
  const menu = read("src/components/command-menu.tsx");
  assert.ok(menu.includes('router.push("/contact")') && menu.includes('router.push("/blueprint")'));
  assert.ok(menu.includes("hiddenCommand ?") && menu.includes("event.nativeEvent.isComposing"));
  assert.ok(menu.includes('"Open hidden terminal"'));
  const terminal = read("src/components/MarkTerminal.tsx");
  assert.ok(terminal.includes("entries.slice(-39)") && terminal.includes('maxLength={160}'));
  assert.ok(terminal.includes('role="log"') && !terminal.includes("dangerouslySetInnerHTML"));
});

test("hidden blueprint and lost-signal recovery exist without public indexing", () => {
  const blueprint = read("src/app/blueprint/page.tsx");
  assert.ok(blueprint.includes("robots: { index: false, follow: false }") && blueprint.includes('id="main-content"'));
  assert.ok(!read("src/lib/seo.ts").includes('"/blueprint"'));
  assert.ok(read("src/app/not-found.tsx").includes("Signal lost."));
  assert.ok(read("src/app/layout.tsx").includes("<DeveloperClue />"));
});


test("cinematic 404 reuses the approved art and stays within its viewport", () => {
  const page = read("src/app/not-found.tsx");
  const css = read("src/app/system-pages.module.css");
  const scene = read("src/components/RidgelineScene.tsx");
  assert.ok(page.includes('<RidgelineScene layout="viewport" />'));
  assert.ok(page.includes('src="/art/falling-armor.webp"'));
  assert.ok(!page.includes("<Link") && !page.includes("<nav") && !page.includes("<svg"));
  assert.ok(css.includes("height: 100dvh") && css.includes("overflow: hidden"));
  assert.match(css, /:global\(\.dark\) \.errorCode\s*\{[^}]*color: #E2524B;/);
  assert.ok(!css.includes("-webkit-text-fill-color: var(--mark-red)"));
  assert.ok(css.includes("@media (prefers-reduced-motion: no-preference)"));
  assert.ok(scene.includes('layout = "footer"') && scene.includes("data-ridgeline-layout={layout}"));
  assert.match(read("src/components/closing.module.css"), /\.scene\[data-ridgeline-layout="viewport"\]\s*\{[^}]*margin-inline: 0/);
});


test("Runtime Conditions is the latest experience with a local JPG and fallback", async () => {
  const { experiences } = await import("../src/data/experienceData.ts");
  const entry = experiences[0];
  assert.equal(entry.title, "Runtime Conditions");
  assert.equal(entry.role, "Member & Open Source Contributor");
  assert.equal(entry.startMonth, "2026-11");
  assert.equal(entry.type, "Open source");
  assert.equal(entry.src, "/Experience-image/runtime-conditions.jpg");
  assert.ok(existsSync(new URL("../public" + entry.fallbackSrc, import.meta.url)));
  assert.ok(entry.links.some(link => link.href === "https://github.com/runtimeconditions"));
});

test("all expandable content uses a shared decorative disclosure chevron", () => {
  for (const path of ["src/components/ExperienceList.tsx", "src/app/experience/page.tsx", "src/components/Hackathons.tsx", "src/components/OpenSourceList.tsx", "src/components/Education.tsx"]) {
    const s = read(path);
    assert.ok(s.includes("<DisclosureChevron"), path);
    assert.ok(!s.includes('isOpen ? "−" : "+"'), path);
  }
  const icon = read("src/components/DisclosureChevron.tsx");
  assert.ok(icon.includes('aria-hidden="true"') && icon.includes('motion-safe:transition-transform') && icon.includes('group-open:rotate-180'));
});


test("all content disclosures use the same accessible drawer animation", () => {
  for (const path of ["src/components/ExperienceList.tsx", "src/app/experience/page.tsx", "src/components/Hackathons.tsx", "src/components/OpenSourceList.tsx", "src/components/Education.tsx", "src/components/GithubGraph.tsx", "src/components/SpotifyCard.tsx"]) {
    const s = read(path);
    assert.ok(s.includes("mark-disclosure-panel"), path);
    assert.ok(s.includes("inert=") && s.includes("aria-hidden="), path);
    assert.ok(s.includes("aria-expanded=") && s.includes("aria-controls="), path);
  }
  const css = read("src/app/globals.css");
  assert.match(css, /\.mark-disclosure-panel\s*\{[^}]*grid-template-rows: 0fr/);
  assert.ok(css.includes('mark-disclosure-panel[aria-hidden="false"] { grid-template-rows: 1fr; }'));
  assert.ok(css.includes("transition: grid-template-rows 240ms ease-in-out"));
  assert.ok(css.includes("transition: opacity 180ms ease-in-out"));
  assert.ok(read("src/components/Education.tsx").includes("const [isOpen, setIsOpen] = useState(false)"));
});


test("contact only confirms an explicitly accepted response", async () => {
  const { contactSubmissionAccepted: accepted } = await import("../src/lib/contact-submission.ts");
  assert.equal(accepted(true, { success: true }), true);
  assert.equal(accepted(true, { success: "true" }), true);
  for (const payload of [null, {}, { success: false }, { success: "false" }, { success: 1 }, "success"]) assert.equal(accepted(true, payload), false);
  assert.equal(accepted(false, { success: true }), false);
  const contact = read("src/app/contact/page.tsx");
  assert.ok(contact.includes("submitting.current = true") && contact.includes("readOnly={isSubmitting}"));
  assert.ok(contact.includes("contactSubmissionAccepted(response.ok, payload)") && contact.includes("controller.abort()"));
  assert.ok(contact.includes('data-submit-outcome={submitOutcome}'));
});

test("interaction polish preserves real feedback and reduced motion", () => {
  const command = read("src/components/command-menu.tsx");
  assert.ok(command.includes("await navigator.clipboard.writeText(value)") && command.includes("Could not copy."));
  assert.ok(command.includes('role="status"') && command.includes("clearTimeout(feedbackTimer.current)"));
  const nav = read("src/components/RightNavbar.tsx");
  assert.ok(nav.includes('className="mark-nav-glider"') && nav.includes("nav.scrollTop") && nav.includes("requestAnimationFrame"));
  assert.ok(nav.includes('aria-current={isActive ? "location" : undefined}'));
  const css = read("src/app/globals.css");
  assert.ok(css.includes("transition: transform 180ms ease-out") && css.includes("scale: .97"));
  assert.ok(css.includes("(hover: hover) and (pointer: fine)"));
  assert.ok(read("src/components/ProjectsGrid.tsx").includes("mark-interactive-card"));
  assert.ok(read("src/components/BlogList.tsx").includes("mark-card-title"));
});


test("command links use one native navigation with opener isolation", () => {
  const menu = read("src/components/command-menu.tsx");
  const helper = menu.slice(menu.indexOf("const openExternal"), menu.indexOf("const changeOpen"));
  assert.ok(helper.includes('link.rel = "noopener noreferrer"'));
  assert.ok(helper.includes('link.target = "_blank"') && helper.includes("link.click()"));
  assert.ok(helper.includes('url.startsWith("mailto:")'));
  assert.ok(!helper.includes("if (!opened)") && !helper.includes("window.open("));
});


test("portfolio source command matches its displayed label and retains search aliases", () => {
  const menu = read("src/components/command-menu.tsx");
  assert.ok(menu.includes('value="Portfolio source code" keywords={["system", "repository", "github", "architecture"]}'));
});
