# MARK I — maintenance handoff

Release baseline: [8f10264](https://github.com/ThunderKhan/portfolio/commit/8f10264d4d195c6ea89d115df155ffec50b04447), deployed 2026-11-28 (IST). [Release runbook](plans/12-production-release.md) contains the environment contract, migration and rollback evidence.

## Routine changes

1. Fetch latest main, create a focused branch and edit the typed data in src/data/ or identity/configuration in portfolio.config.ts. Keep stable project/article URLs and update the public résumé deliberately. See [SETUP.md](../SETUP.md).
2. Run npm ci, npm test, npm run typecheck, npm run lint and npm run build (Node 22). For browser changes, use the existing tests/browser package: npm --prefix tests/browser ci, npm --prefix tests/browser run install:browser, npm --prefix tests/browser test. Inspect both themes and mobile layouts.
3. Open a PR into main. Require green Portfolio CI and Portfolio Security (including Docker and rendered metadata) and owner review before merging. Use the protected preview, not the public domain, for unapproved changes.
4. Merge only the reviewed commit. Vercel Git integration builds main automatically. Verify the deployment identity and HTTPS, homepage, project route, résumé, contribution calendar, robots and sitemap. Test staging in a private browser.
5. Keep release notes for material changes; tag the exact deployed commit rather than a later docs-only revision. Do not force-push or delete the staging branch while the domain points at it.

## Maintenance cadence (recommended)

| When | Check |
| --- | --- |
| Every change | CI/security checks, protected preview, public smoke test after release |
| Weekly | Review Dependabot and scheduled security audit, inspect Vercel errors, check GitHub calendar freshness and Search Console sitemap/indexing status |
| Monthly | Review public content and résumé, dependencies and Docker base digest, token expiry, HTTPS, accessibility and performance observations |
| Before a domain/hosting change | Confirm DNS/HTTPS rollback, retain verification and mail records, protect preview, obtain owner approval |

## Branch protection

At handoff, main was reported unprotected and the ruleset list was empty. Detailed protection settings returned an integration permission error. Recommend an active main ruleset requiring pull requests and successful CI/security checks, blocking force-pushes/deletion; do not require an independent reviewer if the solo-owner workflow cannot satisfy that rule. Select exact check names from actual workflow runs; avoid requiring a scheduled-only skipped job. Do not disable gates to merge. Configuration requires repository-owner access.

## Outstanding follow-up

- Confirm remaining ISP DNS caches expire, normal HTTPS requests use Vercel, and both Vercel apex addresses serve valid TLS. Keep the old GitHub Pages deployment for a recommended 14-day observation period; do not remove it automatically.
- Check Search Console sitemap processing, actual indexed URLs and canonical selection. Re-request indexing only after a meaningful correction; submission is not a guarantee.
- Review artwork/third-party asset usage rights and deferred dark-mode GPU performance. No claim of completed licensing review or field performance measurement.
- Telemetry remains off unless explicitly approved; review privacy and CSP before enabling it.
- GitHub release tag v1.0.0 should point to the deployed baseline above. Package manifest remains private and unchanged; the Git release version is independent of its internal package version.
