# MARK I browser accessibility audit

Run from the repository root with Node 22 and an installed application:

```powershell
npm ci
npm run build
npm --prefix tests/browser install
npm --prefix tests/browser run install:browser
npm --prefix tests/browser test
npm --prefix tests/browser run report
```

The runner starts the production build on loopback port 4173 and stops it afterward. Stop anything already listening on that port. It will not reuse an existing server or contact a deployed site. For a single matrix project: `npm --prefix tests/browser test -- --project=desktop-dark`. For a headed run: append `-- --headed` to the test command.

Dependencies are isolated from the application's lockfile and pinned directly. The first successful local npm install must generate and review/commit `tests/browser/package-lock.json`; after that use `npm --prefix tests/browser ci` instead of install. Check `npm --prefix tests/browser audit` and review dependency changes before committing the generated lock. Do not force upgrades. No lockfile was fabricated in the connector session.

Four Chromium projects exercise desktop 1440x900 and mobile 390x844 in both system themes, with reduced motion by default to stabilize scanning. Tests cover ten primary templates, keyboard skip links, command palette, disclosures, activity data/fallback, music shell and theme toggling. The GitHub fixtures are synthetic test data only; Spotify embed is replaced with an inert test document and never plays music. Real integrations, all individual detail pages, contact submission, animation while motion is enabled, additional viewport widths, zoom, forced colors, cross-browser and assistive technology checks remain manual or future extensions. No contact message is submitted.

Axe runs available WCAG A/AA tagged rules without disabling findings. Each scan attaches full axe JSON (including incomplete results); violation assertions fail the test. The HTML report includes traces and screenshots on failure. Review incomplete findings manually. Report artifacts are local and ignored by Git; inspect for personal data before sharing. A clean automated report is not WCAG conformance.

See [audit findings and remaining checks](../../docs/audits/accessibility.md). Record the exact tested commit, commands, results and unresolved issues. Do not mark findings closed based solely on this suite.
