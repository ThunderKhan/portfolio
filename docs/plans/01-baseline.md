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
