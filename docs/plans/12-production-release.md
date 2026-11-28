# MARK I — production release and rollback

Baseline: 6257efc, owner-approved staging acceptance, 28 November 2026. Vercel project portfolio (personal team), Node.js 22.x; staging.ayankhan.me maps to design/mark-i-final-polish. Latest staging redeployment at baseline: dpl_DWDq6B4zR98qyBQhJUkbUaPPc6bD, READY. Existing public apex remains on its existing host. No production release is authorized by this document.

## Environment contract

Indexing defaults off (local builds, previews, unset variables, non-main branches, wrong canonical origin). Public release requires NODE_ENV=production, VERCEL_ENV=production, VERCEL_GIT_COMMIT_REF=main, PORTFOLIO_PUBLIC_RELEASE=1 and the configured canonical HTTPS apex. Vercel must automatically expose its system environment variables; do not manually spoof them in the project. The CI release-metadata job simulates those variables on loopback only, without a token or deployment. Metadata, robots advertisement, sitemap and preview X-Robots-Tag headers all use the policy. Blueprint remains noindex in either environment. The canonical origin is the public apex even in previews. Noindex is not authentication. Telemetry defaults off unless separately opted in using PORTFOLIO_ENABLE_TELEMETRY=1 in Production; review privacy and CSP before enabling.

| Variable | Preview | Production |
| --- | --- | --- |
| GITHUB_TOKEN | Existing server-side least privilege token | Configure separately in private Vercel settings |
| NEXT_PUBLIC_SITE_URL | unset (canonical apex default) | unset or https://ayankhan.me |
| PORTFOLIO_PUBLIC_RELEASE | unset | unset until approval; then 1 |
| PORTFOLIO_ENABLE_TELEMETRY | unset | unset initially |

Do not print, share, commit or prefix the token with NEXT_PUBLIC_. Verify fresh calendar data rather than treating a 503 as success. Keep contact form disabled.

## Cutover sequence (after explicit owner approval)

1. Verify branch checks (quality, security, Docker and rendered release metadata) and preview redeployment of the exact reviewed commit. Check staging in incognito and authenticated normal browser; all alternate URLs must be appropriately protected. Current SSO configuration reported all_except_custom_domains; owner verified staging login, not every generated alias. Review artwork licensing, public asset privacy and resume.
2. Record current authoritative nameservers and all apex/www DNS records (type, value, TTL), and old host configuration. Vercel previously identified Namecheap; verify authoritative DNS before editing. Lower TTL if appropriate. Preserve staging, TXT, MX and unrelated records. Do not remove old GitHub Pages deployment, CNAME or repository before migration is confirmed; record rollback prerequisites, including domain verification.
3. Configure Production GITHUB_TOKEN, leave release flag unset initially. Confirm main is production branch. Review/merge PR #7 only after fresh checks and authorization. Deploy the production build with no custom apex assigned; keep protected. Verify hosted app, resume, live calendar, redirects, 404, Node 22, logs, noindex and empty sitemap.
4. Once ready to cut over, set PORTFOLIO_PUBLIC_RELEASE=1 for Production only and build from reviewed main using Git integration. Keep protected while verifying the actual candidate: rendered index/follow, populated canonical sitemap, canonical apex, no preview noindex header, 404 and blueprint noindex, live calendar, no sensitive logs. Verify deployment identity and environment; no promotion of a preview as if it were the same build.
5. Add ayankhan.me and www.ayankhan.me (www redirects to apex if used) to the Vercel project; follow the exact ownership-verification and DNS records shown by Vercel, resolving any other-account domain conflict explicitly. Do not guess IPs or CNAMEs. Verify HTTPS and DNS, then allow public production access while keeping preview/staging protected. Test incognito for both: apex public, staging login. Check Vercel generated production aliases and canonical URLs. Avoid unprotected indexable duplicates where practical.
6. Check live routes and resume, three historical blog redirects, noindex absent on public pages, sitemap entries resolve to apex, no API crawling; ensure the actual production deployment contains approved commit. Submit sitemap using existing Search Console ownership (verify ownership if needed). Keep old deployment as rollback for an agreed observation period.

## Rollback

If apex migration breaks, restore exact saved apex/www DNS records to old host and verify HTTPS/old site. Keep staging records intact. DNS propagation is not instant. If the previous Vercel production version is usable, Vercel rollback is another option after identifying exact deployment; it does not restore DNS. If indexing was enabled prematurely, remove Production release flag and redeploy main (and restore protection if needed). Do not merely change an environment variable without rebuilding. Verify old host domain association/certificate before relying on it; rollback availability is not yet proven. No secrets or DNS record values are stored in this repository.

## Verification

Existing default CI builds and browser regression remain preview-safe. Add full rendered SEO checks against the existing local server and a separate isolated simulated production build. Source tests cover missing or wrong target/branch/flag/origin, preview headers and opt-in telemetry. Actual hosted production build, DNS, HTTPS, privacy/licensing, and Search Console still require verification. Dark-mode GPU performance investigation remains deferred by owner.
