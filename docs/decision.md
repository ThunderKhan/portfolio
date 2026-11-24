# MARK I — technical decisions

Date: 2026-11-25 (IST)  
Owner: Ayan Khan  
Status: Core stack, Docker, visual direction and six-color digital brand palette accepted; supporting theme colors and production hosting pending.

## D-001 — Retain the existing application stack

**Status:** Accepted.

**Context:** MARK I is a redesign of the MIT-licensed Paras-ydv/portfolio application. The owner wants to preserve its architecture and structure, personalize the content, and change the visual identity rather than rewrite a working application.

**Decision:**

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript (strict mode) |
| Styling | Tailwind CSS v4, CSS variables, shadcn/ui, Radix UI |
| UI helpers | Lucide React, React Icons, CMDK, next-themes, CVA, clsx, tailwind-merge |
| Motion and graphics | Existing Framer Motion, GSAP, Three.js, CSS and custom effects; review actual necessity and cost |
| Runtime / package management | Node.js 22 for containers, npm and committed lockfile |
| Server | Next.js Server Components, Route Handlers, caching and revalidation |
| Data | Typed TypeScript modules, JSON snapshots, optional external APIs |
| Containerization | Docker |
| Source control | Git and GitHub |
| Existing quality gates | TypeScript, ESLint, Next.js build |
| Production host | Pending D-003 |

Exact dependency ranges and resolutions remain in package.json and package-lock.json. No dependency upgrade is approved by this decision.

**Non-goals:** No separate backend, Express/Fastify, FastAPI, Supabase, Prisma, PostgreSQL, Redis or first-party user authentication. Optional Giscus sign-in belongs to GitHub, not an application authentication system; retain or disable that feature based on the owner's later content decision. Existing analytics and third-party integrations are not a commitment to use their providers.

**Consequences:** Smaller migration scope, no database operations, and one application to maintain. Optional integrations must degrade gracefully and only display the owner's verified data. The existing npm audit findings (14 moderate, 4 high reported locally) require separate triage; Docker does not remediate them.

## D-002 — Containerize the application with Docker

**Status:** Accepted; owner verified Docker image build and server startup at ee2bb62. Owner subsequently verified HTTP smoke responses, initial browser rendering and non-root runtime identity; detailed asset/interaction checks remain pending.

**Context:** Reproducible local production previews and a portable deployment artifact are useful. Docker is a packaging choice, not a hosting provider.

**Decision:** Use a single Linux container, based on Node.js 22 Debian slim. Install locked dependencies in a build stage and generate Next.js standalone output only when PORTFOLIO_DOCKER_BUILD=1. Copy traced runtime files, public assets and static chunks to the final image, run as the non-root node user, and listen on port 3000. No Compose, separate database container, Kubernetes or registry is necessary at this stage.

The base image uses a maintained major-version tag rather than an immutable digest; pin a tested digest when establishing production CI. Keep secrets outside the image and build context. Runtime credentials may be passed through an ignored environment file when actually needed. The build requires network access for npm, Google fonts and existing upstream data requests; missing optional integrations should use existing fallbacks. Runtime secrets do not retroactively change pages prerendered at build time; verify refresh behavior before publishing.

**Local development (unchanged):**

```powershell
npm ci
npm run dev
```

**Local production preview (Docker Desktop / Linux containers):**

```powershell
docker build -t mark-i:local .
docker run --rm --name mark-i -p 127.0.0.1:3000:3000 mark-i:local
```

Stop the npm development server before using the same port. Open http://localhost:3000. If optional integration credentials are needed, use an existing private .env.local file with the run command's --env-file option before the image name. Never supply credentials via Dockerfile ARG or commit the file.

**Acceptance checks:** Docker build exits 0; container starts as non-root; homepage and representative project/blog routes return successful responses; images/CSS load; missing integration credentials do not crash the site. The owner verified image build and server startup on Docker Desktop at ee2bb62, four HTTP 200 smoke responses and uid/gid 1000 (node). Initial browser screenshot confirms layout rendering; full asset and integration checks remain pending. See [baseline evidence](plans/01-baseline.md). The image still contains the inherited reference content until identity migration; do not publicly deploy it.

**Consequences:** Portable runtime, reproducible npm dependency graph, additional build time and image maintenance. Use native npm for normal Windows development and Docker for production-like verification. The vendored .agents skill library is excluded from the container build context. Its example TypeScript files may also need explicit exclusion from local application typecheck/lint in a separate baseline fix.

## D-003 — Production infrastructure and domain

**Status:** Pending. No provider or DNS migration approved.

**Verified existing infrastructure:** [ThunderKhan/ThunderKhan.github.io](https://github.com/ThunderKhan/ThunderKhan.github.io/tree/a7b674d6fb028ed2d9de173f7a4f9dc32e2bbc14) uses React/Vite, Node.js 22, npm, GitHub Actions and GitHub Pages. Its CNAME is ayankhan.me. Its deploy workflow builds dist/, publishes a Pages artifact on main pushes, and refreshes GitHub contribution data daily; CI includes lint, tests, build/link checks, dependency audit and Lighthouse. The weekly dependency audit is a separate workflow. DNS provider, registrar and account-level Pages settings were not verified.

**Options:**

- Retain GitHub Pages: static export only; requires replacing POST /api/github and /api/guestbook, runtime revalidation and default server image optimization with compatible static/build-time alternatives. Docker could still be used for building/testing, not for executing the app on Pages.
- Retain full Next.js server behavior on a Node.js or container-capable host: no static conversion; evaluate costs, availability and operational requirements before choosing. Docker supports this path. Vercel and Cloudflare are not mandatory.
- Keep ayankhan.me and the existing DNS provider in either path. Change only the necessary routing records after a verified preview and explicit approval.

**Decision drivers:** Preserve existing URLs, functionality, low operating cost and rollback ability. Reuse the current GitHub Actions quality-gate patterns, not the static deploy workflow verbatim. Do not modify the old repository, its Pages settings, domain or DNS during this phase. Before cutover, inventory existing /blog URLs and preserve or redirect them, verify canonical URLs and HTTPS, and document rollback.

## References

- [Existing deploy workflow](https://github.com/ThunderKhan/ThunderKhan.github.io/blob/a7b674d6fb028ed2d9de173f7a4f9dc32e2bbc14/.github/workflows/deploy.yml)
- [Existing CI](https://github.com/ThunderKhan/ThunderKhan.github.io/blob/a7b674d6fb028ed2d9de173f7a4f9dc32e2bbc14/.github/workflows/ci.yml)
- [GitHub Pages hosting](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Next.js deployment options](https://nextjs.org/docs/app/getting-started/deploying)
- [Docker build best practices](https://docs.docker.com/build/building/best-practices/)

Record future decisions here with their status and rationale; supersede accepted decisions explicitly rather than silently changing them.


## D-004 — MARK I visual direction

**Status:** Accepted by owner, 2026-11-25 (IST). The brand palette question is resolved by D-005.

**Decision:** Use Iron Man Mark III (2008) as the cinematic visual reference, while MARK I remains the internal project codename. Combine Workshop, Armor and Reactor; use Barlow Semi Condensed, Geist Sans and Geist Mono; preserve Carbon dark and Titanium light themes, mechanical precision motion and the existing layout/architecture. Use Google's DESIGN.md format for the design contract.

**Rationale:** Distinctive industrial character without compromising professional content, accessibility or existing functionality.

**Consequences:** [DESIGN.md](../DESIGN.md) records the approved direction, implementation defaults and visual checks. The earlier production-reference palette gate is superseded by D-005; supporting theme colors still require validation and approval. Individual signature features require separate scope decisions. No application redesign or production deployment is implied by this documentation change.


## D-005 — Freeze the Mark III-inspired digital brand palette

**Status:** Accepted by owner, 2026-11-25 (IST). Resolves D-004's pending brand color decision without claiming production paint accuracy.

**Decision:** Freeze Hot Rod Red (#AA0505), Deep Armor Red (#6A0C0B), Metallic Gold (#B97D10), Bright Gold (#FBCA03), Arc Reactor Blue (#67C7EB) and Reactor White (#F4FBFF) as the six normative MARK I brand primitives.

**Provenance:** The first five hex values match [SchemeColor's Iron Man palette](https://www.schemecolor.com/iron-man.php), rechecked directly on 2026-11-25. Reactor White is an owner-approved project addition. These are a digital interpretation, not official film paint codes or image-derived measurements. Previous production-image download attempts failed; numerical sampling was not performed and is no longer required to approve this palette.

**Consequences:** [DESIGN.md](../DESIGN.md) contains structured color tokens, roles, source names, and calculated contrast checks. Carbon/Titanium supporting neutrals are still provisional; validate and approve them separately before freezing the full theme. Do not alter the six approved values to compensate for contrast; use accessible semantic combinations. No CSS, font, component, or hosting change is authorized by this documentation commit.


## D-006 — Workshop banner direction

**Status:** Owner approved the Workshop concept and requested its design specification and implementation plan, 2026-11-25 (IST). Art approval and implementation pending.

**Decision:** Use an original panoramic industrial workshop scene with subtle environmental motion; preserve the existing banner/profile/header geometry. Default focal object is a suit on a service stand, subject to art review. Prefer a local silent 8–12 second WebM/MP4 loop with a matching static poster, an accessible pause control, reduced-motion and visibility-aware playback. Use a single shared loop in v1 with theme-aware treatment rather than two video sets. This is a scoped decorative-motion exception, not a general relaxation of motion or performance rules.

**Consequences:** [DESIGN.md](../DESIGN.md#workshop-banner--approved-direction) defines the visual contract; [implementation plan](plans/02-workshop-banner.md) defines the media, component and verification tasks. Existing art is retained as a reference until deliberate replacement. No media has been generated or approved, no new dependencies, no application source changes, no hosting changes.
