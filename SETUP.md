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
