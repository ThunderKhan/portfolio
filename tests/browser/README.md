# MARK I browser accessibility audit

Run from the repository root with Node 22 and an installed application:

```powershell
npm ci
Push-Location tests/browser
npm install
npm run install:browser
Pop-Location
npm run build
Push-Location tests/browser
npm test
npm run report
Pop-Location
```

The runner starts the production build on loopback port 4173 and stops it afterward. Stop anything already listening on that port. It will not reuse an existing server or contact a deployed site. Run browser npm commands **from inside** `tests/browser`, not with `npm --prefix tests/browser install` from the portfolio root. For a single matrix project use `npm test -- --project=desktop-dark` inside that directory; for a headed run use `npm test -- --headed`.

Dependencies are isolated from the application's lockfile and pinned directly. The first successful local npm install must generate and review/commit `tests/browser/package-lock.json`; after that use `npm ci` instead of install from inside `tests/browser`. Check `npm audit` there and review dependency changes before committing the generated lock. Do not force upgrades. No lockfile was fabricated in the connector session.

### Recovering from the initial Windows installation

The first owner run of the prefix-based install created `tests/browser/node_modules/portfolio-v1`, a circular link to the application root. Turbopack's CSS glob tracking failed, so Playwright could not start a production server. This link is not a declared requirement of the harness. The exact npm link-creation mechanism has not been reproduced in the connector environment.

Before rebuilding, remove that directory link **without recursive deletion** (`cmd /c rmdir "tests\browser\node_modules\portfolio-v1"` from the root). Confirm it is gone before deleting the browser package's generated `node_modules` and its uncommitted lockfile. Review `git diff -- tests/browser/package.json` and discard only any unintended npm-generated reference to the root package; preserve other owner edits. Then reinstall using the directory-local commands above. If the root link reappears, stop and inspect the browser manifest, lockfile and npm version before building. The root application dependencies need not be removed during this recovery.

Tailwind explicitly excludes `tests/browser` from utility discovery as defense in depth. Do not work around the error by disabling Turbopack or removing accessibility checks.

Four Chromium projects exercise desktop 1440x900 and mobile 390x844 in both system themes, with reduced motion by default to stabilize scanning. Tests cover ten primary templates, keyboard skip links, command palette, disclosures, activity data/fallback, music shell and theme toggling. The GitHub fixtures are synthetic test data only; Spotify embed is replaced with an inert test document and never plays music. Real integrations, all individual detail pages, contact submission, animation while motion is enabled, additional viewport widths, zoom, forced colors, cross-browser and assistive technology checks remain manual or future extensions. No contact message is submitted.

Axe runs available WCAG A/AA tagged rules without disabling findings. Each scan attaches full axe JSON (including incomplete results); violation assertions fail the test. The HTML report includes traces and screenshots on failure. Review incomplete findings manually. Report artifacts are local and ignored by Git; inspect for personal data before sharing. A clean automated report is not WCAG conformance.

See [audit findings and remaining checks](../../docs/audits/accessibility.md). Record the exact tested commit, commands, results and unresolved issues. Do not mark findings closed based solely on this suite.
