# MARK I — pre-release skills audit, pass 1

Date: 2026-11-28. Baseline: 5123f5ed826b7e642542310ac1100090cc878c15. Scope: source review of identity, homepage entry flow, shared navigation, command palette, disclosure motion and selected release controls on design/mark-i-final-polish. The separate live site is out of scope.

## Skill routing

The catalog has 219 entrypoints across 22 categories. AGENTS.md requires the smallest relevant skill set, prohibits bulk execution, and requires inspection before running third-party scripts. Many entries are creation, implementation or stack-specific workflows rather than audit checks. This is a selective first pass, not a claim that all skills or every screen were executed.

Inspected relevant portions of the following exact repository skill entrypoints during this pass; these are source review lenses, not independent runtime test results:

- 05-ui-ux/better-interface and interface-review: scope and evidence limits.
- 16-accessibility/better-accessibility: native control semantics, ARIA, focus, reduced motion.
- 03-typography-color/better-layout, better-typography, better-colors: gutters, text sizing, font roles and solid contrast pairs.
- 21-product/better-writing and copy-editing: concise, specific, evidence-backed identity.
- 05-ui-ux/better-ui: coherent shared control surfaces; retain approved visual design.
- 04-motion/better-motion and review-animations: disclosure timing, interruptibility, reduced-motion guards and rendering loops.
- 17-seo/seo-audit: title, canonical, social metadata and indexing.
- 15-performance/core-web-vitals: measurement before optimization.
- 12-code-review/code-review-excellence: targeted correctness review.
- 13-security/security-best-practices: initial scope triage only; no new comprehensive security review performed.
- 09-engineering/verification-before-completion: distinguish source inspection from executed checks.

AGENTS.md, ENGINEERING.md, DESIGN.md, existing SEO, performance and security audit context consulted. Supporting skill references and remaining audit workflows are not exhaustively reviewed.

## Source findings and changes

| Priority | Evidence | Disposition |
|---|---|---|
| Medium | src/lib/seo.ts: homeMetadata uses a long descriptor and pageMetadata appends the owner name. | Change homepage title and matching OG/Twitter title to Ayan Khan; keep descriptive archive/detail titles, canonical and metadata description. |
| Medium | portfolio.config.ts: intro repeats the generic description, about omits current Runtime Conditions role. | Replace intro and bullets with concrete interests and documented examples from experienceData, projectsData and openSourceData. Keep layout unchanged; no CNCF affiliation claim. |
| Medium | src/components/command-menu.tsx: window.open with noopener followed by a null fallback can navigate the current tab even after a new tab opened. | Use a native isolated link activation, and a direct mailto action. Browser verification pending. |
| Low | src/app/contact/page.tsx: form input text is 14px; iOS Safari can zoom on focus. | Defer until the form is enabled; use 16px on touch devices when activation is reviewed. |
| Review | DESIGN.md motion defaults differ slightly from actual recently approved durations/easings. | Reconcile documentation to approved implementation after rendered motion review; don't replace owner-approved motion based on a generic skill. |
| Release gate | Existing noindex, contactFormEnabled false, and report-only resource CSP are deliberate preview choices. | Do not enable or change them prematurely. Validate production settings and hosting-specific security policy at release. |
| Review | Custom 404 intentionally omits recovery links and locks viewport scrolling per owner approval. | Check zoom and short viewport clipping; consider a keyboard-accessible recovery path if owner revisits the decision. No unrequested redesign. |

## Numerical spot checks

Relative luminance computed using declared solid sRGB token values, not rendered gradient sampling. Light muted/page 5.99:1, dark muted/page 9.28:1; light interaction/page 7.64:1, dark interaction/page 10.95:1; light gold ink/page 5.93:1, dark gold ink/page 11.94:1; dark crimson/black 5.54:1. Metallic gold/light page 3.15:1, suitable for a non-text indicator on that solid background, not normal text. Preserve semantic gold ink for text. Actual gradients, focus outlines, disabled states and artwork overlays require rendered checks.

## Remaining execution sequence

1. Run the existing CI quality and Docker checks on the exact preview revision; resolve actual failures, including recent disclosure/terminal/404/clipboard changes.
2. Render desktop 1440px, tablet 768px and narrow 360–390px in both themes. Inspect text wrapping, zoom/reflow, sidebar glider, keyboard focus, accordion open/close, errors and reduced motion. Screen-reader walk remains outstanding for new interactive surfaces.
3. Repeat the documented performance harness, inspect actual LCP resource and trace canvas/WebGL activity with motion enabled. Prior audit measurements are not current results. Avoid speculative asset or dependency changes.
4. Run rendered SEO harness and check title, social card, canonical and preview robots. Confirm current PR/credential/project links, resume consistency, asset provenance and public privacy review (including derivative artwork) before production.
5. Reassess dependency/secret/container audits, CSP promotion and hosting-specific configuration. No production deployment, secrets, DNS or main-branch merge in this pass.

## Verification limits

GitHub connector reads/writes committed sources. Local clone failed because github.com cannot resolve from the shell; installed Next docs, browser rendering, typecheck/lint/build and npm scripts are not available in this environment. Source and browser regression assertions added, not executed here. Earlier successful checks are historical, not a release sign-off. No new dependencies. Audit verdict: verification incomplete; keep preview noindex and main untouched.
