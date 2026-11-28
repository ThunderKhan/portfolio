# MARK I — content maintenance

This is Ayan Khan's portfolio, not a generic template. Keep the owner’s identity in `portfolio.config.ts` and edit typed content in `src/data/`.

| Content | Source |
| --- | --- |
| Experience | `experienceData.ts` |
| Projects | `projectsData.ts` |
| Open source and community | `openSourceData.ts` |
| Hackathons | `hackathonsData.ts` |
| Technical writing | `blogsData.ts` |
| Skills | `skillsData.ts` |
| Education and ongoing learning | `educationData.ts` |
| Certifications | `certificationsData.ts` |
| Milestones | `highlightsData.ts` |
| Account statistics fallback | `stats-snapshot.json` |

Article IDs are permanent (001, 002, ...); never renumber a published article.

## Local assets

| Path | Purpose |
| --- | --- |
| `public/profile/` | Professional photo, owner-selected hero avatar and monogram |
| `public/banner/starry-night.png` | Approved banner artwork |
| `public/Experience-image/` | Original-color company logos |
| `public/education-image/` | DDUGU, GCI World and IEEE logos |
| `public/project-image/` | Project screenshots; prefer 16:10 |
| `public/certificates/` | Curated redacted supporting evidence |
| `public/Ayan_Khan_Resume.pdf` | Public résumé; keep current |

Never add private student IDs, access QR codes or unrelated personal content. Ensure assets are authorized for public use. Missing project images retain the explicit placeholder.

## Account data

Set `GITHUB_TOKEN` in a local private environment file for GitHub contribution activity. Never commit the token. Run `npm run refresh-stats` to refresh the configured account snapshots. X and LinkedIn follower counts stay unset unless verified.

## Validation and release

Run `npm test`, `npm run typecheck`, `npm run lint` and `npm run build`. Review both themes at 320, 360, 768 and 1440px, including navigation, accordion behavior, article pages, images, credentials and keyboard access. Preview/noindex is the default; indexing requires the explicit release policy described in [the production runbook](docs/plans/12-production-release.md). See `ENGINEERING.md` for full verification gates.

The source code retains the upstream MIT attribution. Do not copy the upstream owner's personal data back into this repository.

### After removing or renaming routes

Stop the development server and remove the generated `.next` directory before rerunning checks. It can retain validators for routes that no longer exist. In PowerShell, from the repository root:

```powershell
if (Test-Path .next) { Remove-Item -Recurse -Force .next }
npx next typegen
npm run typecheck
npm run lint
npm run build
```

Never edit generated route validators or disable TypeScript checks to hide stale-cache errors.

### GitHub contribution calendar configuration

The development server needs a server-only `GITHUB_TOKEN` in `.env.local` for live GitHub GraphQL activity. Create a least-privilege token for public read access (avoid granting private repository access or write permissions). Use `notepad .env.local` from the project root and set `GITHUB_TOKEN=YOUR_TOKEN`. Do not paste the actual token into a chat, commit it, or prefix it with NEXT_PUBLIC_. Restart Next.js after editing. With no token and no account-matched snapshot, the endpoint intentionally returns 503 and the homepage links to the real GitHub profile instead of displaying an empty calendar as zero activity. Check the endpoint from a second PowerShell window with `Invoke-RestMethod -Method Post http://localhost:3000/api/github`. A successful live response includes calendar and stale=false. Optionally run `npm run refresh-stats` and review the public-only snapshot before committing it. The deployment environment needs its own server-side token.

### Environment and secret verification

Use the tracked empty `.env.example` as the template for the ignored `.env.local` (do not overwrite an existing local file). `GITHUB_TOKEN` is optional and server-only. Do not put any credential into `NEXT_PUBLIC_*`, next.config env, a public asset, build ARG/ENV, or a committed snapshot. `NEXT_PUBLIC_SITE_URL` is intentionally public. Supply the deployment token at runtime using the selected host's private secret store; keep public read-only scope, expiration and rotation documented privately. Do not grant write/private-repository access merely for the graph. Review GitHub contribution visibility before publishing counts.

After a fresh production build run `npm run audit:secrets`. It checks sensitive filenames in tracked files/reachable local history, selected token patterns in current tracked text and history diffs, risky public env names, and current token bytes plus selected patterns in public assets and generated client output. It prints only paths and categories, never matches or values. A missing production build/token or any finding returns a nonzero exit code. Review false positives locally; never paste raw matched lines. This is a targeted audit, not proof that all credentials are absent (compressed binary contents, unreachable history, remote-only refs, unsupported credential formats, encoded secrets and hosting configuration require other checks). Enable GitHub secret scanning and push protection where available; run a dedicated full secret scanner for release. If an actual secret is exposed, revoke/rotate first, then handle history remediation separately with approval.

### Public asset privacy gate

Run `npm run audit:assets` before adding or replacing public files, including untracked local assets. The inventory reports unexpected file types, signature mismatches, symlinks, metadata and raw PDF markers, and possible unused files. Metadata/unused candidates are review items, not automatic failures or deletion permission. Manually open every résumé/certificate, screenshot and event photograph: check visible email/phone/address details are intended, student/application IDs, secrets, account or customer records, private browser tabs, QR contents and third-party consent. For PDFs inspect selectable text, document properties, attachments, actions/forms and all pages; a visual overlay is not reliable redaction. Verify any redacted replacement by reopening it and checking extracted text and metadata. Keep originals outside public and Git. Never publish private data just because a file is unlinked, ignored by Git, or noindexed. The local scanner is heuristic, not a full parser or OCR tool. Do not commit asset review output if it contains private filenames.

### Docker security verification

With Docker Desktop running Linux containers, commit intended build inputs first, then run `npm run audit:docker`. The script builds an explicit archive of HEAD (not the dirty working tree), pulls the base image, starts a uniquely named loopback-only test container with no token, drops capabilities, sets no-new-privileges and bounded CPU/memory/PIDs, waits for health, checks non-root identity and writable cache/read-only-to-user code paths, checks absence of selected private paths/env, smoke-tests pages, résumé, JPEG, optimized image and missing-token API fallback, and removes only its own test container/archive. The resulting local image is `mark-i:security-check`; no image push or deployment. Build requires network for npm and fonts. Resource limits are provisional preview values; measure before release. Use a private runtime token only after validating the image; never bake it in. 

Run `docker scout cves mark-i:security-check` separately if Docker Scout is installed and its use is approved; review current OS/runtime dependency findings (npm audit alone is not a container scan). A locally available alternative is an approved scanner such as Trivy. No scan is assumed clean. Pin the tested base digest and establish update/scan automation for production. The root filesystem is not globally read-only: Next ISR and image caching need writable paths, and server/app is writable for ISR. A stricter read-only runtime needs a verified cache strategy. Do not mount an empty directory over generated app output. Review actual host limits, secrets and networking independently.

The runner now applies the Bookworm PAM security update (minimum 1.5.2-6+deb12u3) and removes npm, npx, Yarn and Corepack from the final filesystem only. Builder/deps stages retain npm for reproducible installation. The audit rebuilds the runner without layer cache so the package index is refreshed; it verifies installed PAM versions and package manager absence. Removed base-layer contents may still exist in lower image layers; this is filesystem exposure reduction, not a guarantee of smaller distribution size or zero scanner findings. Rescan the new image before release. See Debian tracker https://security-tracker.debian.org/tracker/DLA-4941-1 and Node Docker best practices https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md .

### Final local security verification

Stop any development/production server on port 4173, ensure Docker Desktop Linux mode and Docker Scout are available, and install locked root/browser dependencies (npm ci, npm --prefix tests/browser ci, npm --prefix tests/browser run install:browser). Retain the private local GitHub token. Run `npm run audit:final` from a clean tracked tree (untracked owner assets are not staged). This gate requires live GitHub activity, successful dependency audits, source/browser checks, production build, targeted local secrets/assets audits, container checks and no fixable critical/high image findings. It stops at the first failure. No release approval is implied. The base image is pinned by multi-platform registry index digest in all three stages. Use `docker buildx imagetools inspect node:22-bookworm-slim` to inspect the current registry index even when the image exists only in BuildKit cache. Review the full index digest and target platform manifest before updating all three FROM lines together; rebuild and rescan. Do not pin a truncated digest. See docs/audits/security.md for residual and release gates. The underlying registry and advisory database can change; rerun checks at release time.

### Continuous integration

The Portfolio CI workflow runs on pull requests targeting main, pushes to main and ci/* branches, and manual dispatch. It uses GitHub-hosted Ubuntu 24.04 runners and read-only repository permissions, full SHA-pinned first-party actions, no credential persistence, no secrets or deploy steps. The quality job audits locked npm dependencies, tests, generates Next route types, checks TypeScript/lint, builds, scans public assets and selected secret patterns, installs Chromium and runs all browser cases. The explicit `--ci-no-token` secret audit mode omits only the requirement for a known live token; it still scans paths, history, patterns and build output. Default local mode still requires the real token. Browser API tests allow the expected credential-free fallback in CI, while `audit:final` requires live activity. The independent Docker job runs the committed-archive build and isolation checks without pushing an image. Failure reports expire after seven days. Do not put a personal GitHub token into PR jobs. Docker Scout scanning, full secret scanning, branch rules and actual deployment remain separate follow-up work; local final audit remains mandatory. See docs/plans/ci-cd.md.

### Automated security maintenance

Portfolio Security runs separate Gitleaks and Trivy jobs on PRs, main and ci/* pushes, manual dispatch, and weekly on Monday 09:07 IST. Scheduled/manual runs also audit root and browser lockfiles without installs. Both scanner executables are downloaded from versioned official releases and verified against pinned SHA-256 checksums before execution. Gitleaks redacts detected secrets and scans reachable Git history. Trivy scans the locally built image, prints a full inventory, blocks all critical and fixable high findings, and retains visibility of unfixed findings. No account credentials, report upload or automatic exceptions. The existing local final audit remains a separate release gate; scanner results can differ. Dependabot weekly version updates cover root and browser npm, Docker and GitHub Actions (no auto-merge). Review scanner binary updates manually. Weekly schedules and Dependabot take effect on default branch, subject to GitHub settings. See docs/plans/ci-cd.md.
