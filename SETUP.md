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

Run `npm test`, `npm run typecheck`, `npm run lint` and `npm run build`. Review both themes at 320, 360, 768 and 1440px, including navigation, accordion behavior, article pages, images, credentials and keyboard access. Retain preview/noindex until the owner authorizes deployment. See `ENGINEERING.md` for full verification gates.

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
