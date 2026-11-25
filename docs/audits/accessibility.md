# MARK I — Accessibility audit (initial source pass)

Baseline: cf70ed9df92643c9afd6ac87c4541774218cf2ce. Target WCAG 2.2 AA; source review is not a conformance claim. W3C reference: https://www.w3.org/TR/WCAG22/. Scope: ten primary route files, shared navigation, forms, overlays, disclosure controls, graphs, clock and selected interactive components. Existing keyboard-native project links, experience inert panels, theme reduced-motion, banner pause and background pause were retained.

| ID | Severity | Source finding / criterion | Remediation | Status |
| --- | --- | --- | --- | --- |
| A01 | Serious | Missing main landmarks and bypass (1.3.1, 2.4.1) | One focusable main per route, global skip link | Implemented, runtime pending |
| A02 | Serious | Dialog name/description outside content; keyboard focus restoration absent (4.1.2, 2.4.3) | Move labels inside portal content, label search, restore trigger focus | Implemented, runtime pending |
| A03 | Serious | Shift-letter shortcuts intercept uppercase search (2.1.1, 2.1.4) | Remove conflicting shortcuts; keep Ctrl/Meta+K | Implemented, runtime pending |
| A04 | Serious | Contact labels unassociated, no real success/failure announcement (1.3.1, 3.3.2, 4.1.3) | Native labels/autocomplete/status and honest submit state; form stays disabled by default | Implemented, runtime pending |
| A05 | Serious | Daily heatmap detail mouse-only (1.1.1, 1.3.1, 2.1.1) | Compact native disclosure with exact daily values table; hover readout in legend instead of floating tooltip | Implemented, runtime pending |
| A06 | Serious | Collapsed hackathon content still exposed, invalid block children within button (1.3.1, 4.1.2) | Paired controls, inert/aria-hidden, phrasing content, reduced-motion transitions | Implemented, runtime pending |
| A07 | Moderate | Several metadata labels too faint; social text opacity (1.4.3) | Use existing theme-aware muted ink on identified labels and remove opacity from social labels | Implemented, rendered contrast pending |
| A08 | Moderate | Booking cover hidden on keyboard focus, timeline scroll not explicitly focusable (2.1.1, 2.4.7) | Focus reveal, accessible link name, labeled focusable scroll region | Implemented, runtime pending |
| A09 | Moderate | Clock exposes separate digits; decorative motto heading (1.3.1, 4.1.2) | Timer label and no live announcements, motto paragraph | Implemented, runtime pending |
| A10 | Moderate | Dialog close target small and music disclosure lacks control association (2.5.8, 4.1.2) | 32px close target and stable controlled region | Implemented, runtime pending |

## Remaining audit work

- Run npm test, npm run typecheck, npm run lint, npm run build from installed checkout; this connector session has no executable app/dependencies. Record results at exact head.
- Run automated browser audit (axe or equivalent) on every route including both themes, open dialog, expanded content, empty/live graph, music player, contact enabled/disabled. No automated browser score measured here.
- Manual keyboard: Tab first to skip link, Enter, check focus and scroll; traverse all links and buttons, Shift+Tab reverse; open palette by keyboard, type uppercase words, navigate results, Escape, check focus return; accordion collapse and timeline navigation; open/close music; pause/resume banner and shader; access graph table. Check no focus obscuration, traps or invisible targets.
- NVDA + Firefox/Chrome, VoiceOver + Safari including iOS: landmarks/headings, link/button names, dialog name and focus, expanded states, table headers and actual values, contact status. Third-party Spotify iframe and evidence PDF accessibility require separate checks.
- Test 320/390/768/1280/1920 px, 200% and 400% zoom, text spacing override, forced colors, reduced motion, contrast for actual computed colors including alpha/hover/focus and shader-backed index. Inspect remaining hover cards, timeline tooltips, clock pause/update behavior, contact visual displacement, all target sizes and dynamic errors. Check project/blog code block readability and media fallbacks.
- No WCAG compliance or Lighthouse claim until manual and automated results are recorded. No release approval implied.

## Browser audit harness (Slice 6b)

Owner-provided local baseline at 94e2009: 53/53 regression tests passed, TypeScript and ESLint passed, production build succeeded (31/31 static pages). Browser harness added under [tests/browser](../../tests/browser/README.md), isolated from application dependencies. Uses four Chromium viewport/theme combinations, WCAG A/AA tagged axe scans and targeted keyboard assertions. Synthetic GitHub data and inert Spotify embed are test fixtures, not portfolio content. No production or visual changes. First local installation, generated lockfile review, dependency audit, browser execution and manual review remain pending; connector environment cannot reach npm or the local application. Do not interpret the earlier code gates as new browser results.

### Slice 6b follow-up: Windows installation recovery

Owner reported that npm's initial prefix-based browser installation succeeded (zero reported vulnerabilities), but created a circular `tests/browser/node_modules/portfolio-v1` symlink. Turbopack failed in CSS glob tracking; Playwright subsequently failed to start because the production build was missing. Correct setup to run npm from the browser package directory, document safe link cleanup and exclude browser tooling from Tailwind discovery. No audit assertion, brand token, application behavior or build engine change. The precise npm link-creation mechanism and effectiveness of the corrected setup remain unverified locally. Re-run the production build and browser suite before claiming recovery.

## First rendered baseline and Slice 6c remediation

Owner reported successful build, exit 0 and BUILD_ID present at 7537cfc, then 112 Chromium tests: 44 passed (40 route bypasses and four theme/reduced-motion checks), 68 failed in 3.2 minutes. Every reported failed case contained axe violations, not a browser-server startup failure. Counts below are reports containing the rule, not unique nodes.

| Rule | Reports | Action |
| --- | ---: | --- |
| label-content-name-mismatch | 64 | Include the displayed command shortcut in the accessible name |
| color-contrast | 52 | Apply existing theme-aware muted ink to identified legacy text pairs, back links, highlight numbers and detail status text |
| definition-list | 24 | Use valid dd elements for education grading scale descriptions |
| svg-img-alt | 8 | Hide redundant project-detail and palette glyphs from assistive technology; retain adjacent text |
| aria-required-children | 4 | Make decorative cmdk list separators hidden to assistive technology; suspected cause, confirm in rerun |

Seven project screenshot requests returned 404; repository tree confirms the assets are absent. Make screenshot source optional, omit those seven nonexistent paths, and render the existing pending state without a failed request. Existing screenshots, titles, routes and project data are retained. The original shader, palette primitives and layout are unchanged. Add source regressions for list semantics, shortcut label, separator and screenshot references. No rules disabled; runtime rerun and exact computed contrast/ARIA node inspection still pending. No new dependency or deployment.

## Second rendered audit and Slice 6d remediation

Owner's rerun after c8e9525: production build succeeded (31/31 static pages); browser suite 48 passed, 64 failed (3.1 minutes). Report occurrences: label-content-name-mismatch 64, color-contrast 2; definition-list, svg-img-alt and aria-required-children no longer reported. Total rule occurrences fell from 152 to 66. The palette's open-state audit passed in all four configurations.

The closed command trigger's explicit name joined its two visible glyphs differently from the rendered label. Remove the overriding aria-label and derive the native button name from the unchanged visible shortcut plus screen-reader-only action text; retain aria-keyshortcuts, focus and keyboard behavior. Assert the accessible name in the existing browser test. The two remaining contrast reports identify expanded hackathon footer links, including IET Grid: use existing mark-muted ink instead of dark zinc-500. No axe rules suppressed.

Root lint reported 2,955 problems (133 errors, 2,822 warnings), with the supplied log showing generated Playwright trace bundles. Add narrow global ignores for playwright-report and test-results, not the browser specs or application code. Browser outputs were already gitignored. Add a source regression for the lint scope. The supplied log begins mid-lint, so the source-test and typecheck results are not independently established by this excerpt. Re-run all gates on the new commit; no runtime pass or WCAG conformance claimed yet.

## Third rendered audit — automated baseline green

Owner-supplied local terminal output at bd8eeed5667f62acff15e37660e701940045f9c3 records 112/112 browser tests passed in 1.8 minutes (28 in each of desktop light, mobile light, desktop dark and mobile dark). All five previously reported axe rule categories have zero violations in the tested states. TypeScript and ESLint passed with clean output; production compilation and 31/31 static pages succeeded. Root regression tests: 56/57, with a single stale assertion in tests/typography.test.mjs expecting the old command-menu aria-label. Update that assertion to check the shared theme classes and native screen-reader-only label; the browser accessible-name assertion and axe checks remain unchanged. No application source or dependency changes. The follow-up source test run remains pending locally. The existing Node type-stripping/module-type warnings are nonfatal and not addressed here.

The automated baseline is verified by the owner's supplied output, not by execution in the connector environment. This does not establish full WCAG 2.2 AA conformance. Review incomplete axe results and perform the manual keyboard, screen reader, zoom/reflow, forced-colors, motion-enabled and actual third-party integration checks listed above. Other individual project pages and enabled contact submission remain outside the sampled coverage. Review and commit the locally generated browser package-lock.json before reproducible clean-install verification. No deployment.
