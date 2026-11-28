# Ayan Khan — MARK I

Personal engineering portfolio for Ayan Khan: systems, developer tools and applied AI. Built with Next.js, React, TypeScript and Tailwind CSS.

**Status:** MARK I in production since 28 November 2026. Live site: [ayankhan.me](https://ayankhan.me). Release baseline: [`8f10264`](https://github.com/ThunderKhan/portfolio/commit/8f10264d4d195c6ea89d115df155ffec50b04447).

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

GitHub Actions runs credential-free code, dependency, browser and Docker isolation checks on pull requests and main pushes. Separate security automation scans Git history and container vulnerabilities; weekly audits and Dependabot version-update proposals run after default-branch activation. See [CI engineering](docs/plans/ci-cd.md). Run `npm run audit:final` locally with the private GitHub token and Docker Scout for the additional release checks. Review responsive layouts in both themes before deployment.

## Deployment and maintenance

- Production: Vercel, Node.js 22, Git integration from `main`; canonical HTTPS domain `ayankhan.me`.
- Protected staging: `staging.ayankhan.me`, currently mapped to `design/mark-i-final-polish`. Retain the branch until the staging mapping is deliberately changed.
- Namecheap hosts DNS; preserve ownership and mail records. `www` redirects permanently to the apex.
- Keep server-only `GITHUB_TOKEN` separately configured in Production and Preview. `PORTFOLIO_PUBLIC_RELEASE=1` belongs only in approved Production; telemetry remains opt-in.
- Open a focused branch/PR, wait for CI and security gates, review the protected preview, then merge an approved revision. Validate the deployed commit, HTTPS, routes and optional integrations after merge.

See [release and rollback runbook](docs/plans/12-production-release.md) and [maintenance handoff](docs/maintenance.md).

## License and attribution

Based on [Paras-ydv/portfolio](https://github.com/Paras-ydv/portfolio), under the MIT license. The original copyright notice is retained in [LICENSE](LICENSE). The personal content and owner-supplied assets are separate from the software license; third-party marks and artwork remain subject to their respective rights.
