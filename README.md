# Ayan Khan — MARK I

Personal engineering portfolio for Ayan Khan: systems, developer tools and applied AI. Built with Next.js, React, TypeScript and Tailwind CSS.

**Status:** Development preview. The current live portfolio is [ayankhan.me](https://ayankhan.me); this redesign must not replace it until release approval and verification.

## Local development

```powershell
git clone https://github.com/ThunderKhan/portfolio.git
cd portfolio
npm ci
npm run dev
```

Open http://localhost:3000.

## Content and configuration

- `portfolio.config.ts`: identity, links, site origin and release preview.
- `src/data/`: projects, experience, upstream contributions, hackathons, writing, education, certifications and milestones.
- `public/`: approved artwork, photographs, project screenshots, institution logos, credential evidence and résumé.
- `DESIGN.md`, `ENGINEERING.md` and `AGENTS.md`: project design and engineering standards.

GitHub activity requires a server-side `GITHUB_TOKEN` or an account-matched snapshot. Missing or mismatched statistics are not treated as verified activity. See [SETUP.md](SETUP.md) for maintenance and checks.

## Verification

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

Review responsive layouts in both themes before deployment.

## License and attribution

Based on [Paras-ydv/portfolio](https://github.com/Paras-ydv/portfolio), under the MIT license. The original copyright notice is retained in [LICENSE](LICENSE). The personal content and owner-supplied assets are separate from the software license; third-party marks and artwork remain subject to their respective rights.
