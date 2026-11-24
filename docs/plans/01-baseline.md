# MARK I — first implementation slice

Base: f8ae850 (rewritten history). Scope: baseline quality and optional integration behavior. Preserve all inherited identity/reference content; no visual redesign, dependency upgrades or deployment.

## Changes and acceptance criteria

- Exclude vendored .agents examples from TypeScript, ESLint and Tailwind scanning without weakening application checks.
- GitHub graph: use a matching-account historical snapshot if live data is unavailable; label its date; never report a synthetic zero or read a cross-account browser cache. Preserve the fixed server-side GraphQL query, add the existing request timeout. Snapshot total is the sum of displayed days, not the unrelated snapshot headline total.
- Optional guestbook and analytics credentials: use the existing stale fallback without exception noise when not configured; distinguish unavailable notes from genuinely empty notes, hide unavailable visitor count.
- Preserve routes, personal reference files, MIT attribution, dependency manifest ranges and lockfile.

## Evidence and next checks

- Source inspection identified broad compiler/linter scope and a documented but absent GitHub graph fallback. Local isolated Node 22 test run: 3/3 snapshot adapter tests passed; full integration/browser behavior remains unverified.
- Run npm test, npm run typecheck, npm run lint, npm run build, then inspect the homepage without credentials. Verify the matching snapshot date, unavailable-account behavior, genuine guestbook empty state, live GitHub behavior with authorized credentials, and Docker build/run.
- Local runtime access: repository clone and dependency network access unavailable in the agent's shell; full application gates and Docker are NOT RUN. Installed Next.js docs unavailable; no new Next.js API introduced.
- Dependency audit: obtain fresh npm audit --json and assess targeted updates before changing the lockfile. Earlier 18 findings remain untriaged.
- Next slice: inventory old portfolio identity and assets; replace inherited personal data only when performing the approved content migration. Supporting theme colors still pending approval.


## Owner verification — 2026-11-25

The owner supplied Windows PowerShell output at commit 3b00965:
- npm test: PASS, 3 tests, 0 failures; Node type-stripping/module-format warnings only.
- npm run typecheck: PASS, no diagnostics.
- npm run lint: PASS with 4 warnings, all in src/app/opengraph-image.tsx (two raw img warnings and two missing alt warnings).
- npm run build: PASS, compilation and type checking successful, 22/22 static pages generated.
- npm audit: FAIL, 18 reported vulnerabilities (14 moderate, 4 high).
- Browser and Docker runtime checks: NOT RUN in supplied output.

Lockfile review at 3b00965: all affected resolved packages are marked dev:true. Affected high-severity packages: body-parser 2.3.0, systeminformation 5.33.13, undici 7.29.1, zod 4.6.5. Moderate findings include @hono/node-server, hono, fast-uri, ip-address and the nested minimatch copies used by ts-morph and typescript-eslint. This reduces likely runtime exposure but does not establish that standalone artifacts or the build environment are safe. Verify separately with npm audit --omit=dev and inspect the runtime image if needed.

The follow-up changes add decorative alt attributes and two locally justified Next.js image lint exceptions in the Satori-based Open Graph image renderer. The actual rendering path remains unchanged. Re-run lint and production build on the new revision; the owner's earlier results do not prove these new changes pass.

Dependency remediation: run npm audit fix --dry-run, inspect the proposed compatible resolution, then apply npm audit fix without --force. Review the lockfile/manifest diff and re-run tests, typecheck, lint, build, full audit and production-only audit. The forced proposal would downgrade shadcn to 1.0.0; do not accept it. Triage any residual minimatch paths individually. Do not invent or manually edit integrity hashes. No lockfile changes have been made by the agent.


## Owner verification — dependency remediation and Docker

Revision ee2bb62 (owner's lockfile-only commit) passed the owner's native npm test (3/3), typecheck, lint (zero diagnostics) and production build (22/22 pages) on the remediated dependency tree. The full npm audit fell from 18 findings to four moderate findings, with zero high-severity findings. npm audit --omit=dev reported zero vulnerabilities after remediation. The remaining advisory is GHSA-g3hv-75wg-m249 through shadcn -> ts-morph -> @ts-morph/common -> minimatch; the four reported findings include dependent packages. Do not force-downgrade shadcn to 1.0.0. Revisit compatible remediation before release; temporary risk acceptance is recommended, not a claim of zero total risk.

Owner's Docker Desktop Linux output: docker build -t mark-i:local . PASS (21/21 steps, 111.2 seconds); docker run --rm --name mark-i -p 127.0.0.1:3000:3000 mark-i:local PASS for process startup (Next.js Ready). HTTP routes, asset loading, browser rendering, non-root identity and live integration cases were not demonstrated in the supplied output and remain pending. Production-only npm audit is not an OS/container vulnerability scan.

Next: verify the running container using HTTP requests, then migrate identity in a distinct slice. Do not publish inherited personal content. No changes to the live Pages site or domain.


## Owner verification — Docker HTTP and browser smoke test

Owner supplied PowerShell HEAD responses for /, /projects, /experience and /opengraph-image: all HTTP 200. The Open Graph endpoint returned image/png. docker exec mark-i id returned uid=1000(node) gid=1000(node), confirming the container process environment uses a non-root account. The full-page screenshot shows the inherited layout, banner, identity, project cards, stats and remaining sections rendering. Some below-the-fold anime/highlight imagery appears blank in that capture; lazy loading versus asset failure is not established. Verify actual GET/image decoding after scrolling during asset migration and final browser QA.

Baseline build and container smoke milestone accepted for continued local implementation. This is not production release approval: full interaction/asset checks, live credentialed integrations, both themes/responsive review and the residual moderate dev-tooling advisory remain outstanding. Preserve the existing live site and original reference content until its deliberate replacement.
