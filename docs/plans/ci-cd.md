# MARK I — CI/CD engineering

Base: 07aa93f4c4faf1f0fa5d117985913c42e1361c5b. Goal: protect the verified local baseline while allowing small design refinements. No production deploy, domain, registry or host change. Owner-approved release remains separate.

## Stage 1 — Credential-free CI

Two independent jobs on GitHub-hosted Ubuntu 24.04: Quality and browser checks; Docker build and isolation. Push main and ci/**, PR targeting main, manual dispatch. Cancel superseded runs for the same ref. Full SHA pins for checkout v7.0.1, setup-node v7.1.0, upload-artifact v7.0.2, resolved from official release tags. Read-only contents, no persisted checkout credentials, no PATs, no pull_request_target, no third-party runtime action. Root and browser installs use committed lockfiles. No cache initially to avoid cross-run complexity; measure runner minutes before optimizing. Browser failure artifacts retained seven days, no production credentials in these runs. Node22 major tracks maintenance releases. Build requires npm and font network access.

Quality job: npm audits (root/prod/browser), expected 104 source tests, route typegen/typecheck/lint/build, targeted secret scanner in explicit credential-free mode, asset inventory and expected 128 browser cases. Local final gate keeps live token requirement. CI does not claim the exact real token was scanned, or live API activity; it verifies fallback contract. Docker job reuses existing committed archive, pinned base, runtime restrictions and HTTP checks. No image registry upload. Expected both jobs succeed on ci/quality-gates then main; review logs for Linux-specific failures before making checks required. No GitHub Actions settings modified in this slice.

## Stage 2 — Security automation and maintenance

After baseline CI is green, evaluate Docker Scout hosted CLI/auth requirements (or reviewed alternative scanner), full secret scanning, scheduled dependency/image scanning and update proposals. No account secret, third-party scanning service or recurring workflow enabled yet. Local audit:final still gates release and requires live GitHub API, exact token scan and Docker Scout. Consider Dependabot npm/root + browser + docker + actions with sensible frequency after owner confirms notification/usage preferences. Establish required checks via repository rules only after green runs and owner approval.

## Stage 3 — Delivery

Choose hosting, validate staging/noindex, review outstanding asset and OS risks, configure least-privilege host secrets, immutable release artifact and rollback. Add deployment workflow only after provider selection. No deployment to current live site or changes to DNS.

## Verification and rollback

Prior local evidence: 103 source cases, 128 browser cases, pinned Docker image verified, no fixable critical/high image findings. New workflow/config and new CI-mode test not yet executed on GitHub. Confirm actual run and check names, investigate failures, then fast-forward main. Revert this focused commit if needed; existing local audit remains available. References: https://docs.github.com/en/actions/reference/security/secure-use ; https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs ; https://docs.docker.com/scout/integrations/ci/ . 
