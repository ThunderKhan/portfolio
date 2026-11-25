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
