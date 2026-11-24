---
version: alpha
name: MARK I
description: A personal engineering portfolio with a restrained industrial identity inspired by the 2008 Mark III armor.
omitted:
  - section: colors
    reason: Exact production-reference armor colors are pending owner approval; candidate hex values in prose are not normative tokens.
typography:
  display:
    fontFamily: Barlow Semi Condensed
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display-mobile:
    fontFamily: Barlow Semi Condensed
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading:
    fontFamily: Barlow Semi Condensed
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: Geist Sans
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: Geist Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  secondary:
    fontFamily: Geist Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  article:
    fontFamily: Geist Sans
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  stat:
    fontFamily: Geist Mono
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.2
  technical-label:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.05em
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  section: 32px
rounded:
  sm: 4px
  md: 6px
  lg: 10px
  full: 9999px
motion:
  press:
    duration: 100ms
    timingFunction: cubic-bezier(0.23, 1, 0.32, 1)
  hover:
    duration: 150ms
    timingFunction: ease
  reveal:
    duration: 180ms
    timingFunction: cubic-bezier(0.23, 1, 0.32, 1)
  expand:
    duration: 240ms
    timingFunction: cubic-bezier(0.77, 0, 0.175, 1)
  dialog:
    duration: 280ms
    timingFunction: cubic-bezier(0.23, 1, 0.32, 1)
  command:
    duration: 0ms
    timingFunction: linear
  theme:
    duration: 400ms
    timingFunction: cubic-bezier(0.23, 1, 0.32, 1)
  hero:
    duration: 800ms
    timingFunction: cubic-bezier(0.23, 1, 0.32, 1)
components:
  button:
    typography: "{typography.secondary}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  project-card:
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  dialog:
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
---
# MARK I — Design system

## Overview

**Status:** Direction approved by the owner on 2026-11-25 (IST). Exact armor colors pending.
No UI implementation or new feature is authorized merely by this document.

MARK I is the internal codename; the cinematic reference is Iron Man Mark III (2008),
not the steel Mark I armor. The public identity remains Ayan Khan, a software developer.
The interface should evoke an engineer's workshop, not a fan site, fictional company,
game menu or theatrical imitation of a HUD.

The approved identity blends three complementary ideas: Workshop (quiet, practical, industrial),
Armor (material precision, red and gold), Reactor (white information and localized blue energy).
Use workshop for the overall environment, armor for selective brand accents, reactor for feedback.
These are qualitative roles, not quotas.

The primary audience is recruiters, engineers, collaborators and readers. Prioritize finding
the owner's work, understanding its engineering substance, reading articles and contacting him.
The design should reward a closer look without delaying ordinary tasks.

[AGENTS.md](AGENTS.md) governs scope and skill routing; [ENGINEERING.md](ENGINEERING.md)
governs execution and verification; [docs/decision.md](docs/decision.md) records decisions.
The YAML above specifies proposed implementation defaults for the approved typography and
motion direction, with supporting spacing and geometry defaults to validate against the existing
layout. It does not assert that these values are already implemented. Preserve approved structure;
do not alter section order, routes or layout geometry simply to fit a token.

## Colors

**Release gate: pending.** No canonical sRGB hex values for the original production paint
have been verified. A physical metallic finish and a light-emitting reactor have no unique
appearance in sRGB independent of lighting, camera exposure, color management and reflections.
Do not describe a fan palette or image sample as official Marvel paint specifications.

### Reference evidence

- [2008 production paint-study maquette](https://propstore.com/product/iron-man-2008/lot-229-mark-iii-armor-paint-study-maquette/): physical production reference for red and gold finishes and white reactor core.
- [Production notes](https://www.scifijapan.com/news/iron-man-production-notes): cinematic design context.
- [Original HUD team oral history](https://beforesandafters.com/2019/03/18/heads-up-the-oral-history-of-iron-mans-original-hud/): restrained white information graphics and selective colored accents for Mark III.
- [SchemeColor Iron Man](https://www.schemecolor.com/iron-man.php): secondary community palette, not production evidence.

### Candidate palette — not approved, not exportable

| Candidate | Hex | Intended role | Provenance |
| --- | --- | --- | --- |
| Hot Rod Red | #AA0505 | Primary action fill | SchemeColor |
| Deep Armor Red | #6A0C0B | Recessed and pressed accents | SchemeColor |
| Metallic Gold | #B97D10 | Selective seams and accents | SchemeColor |
| Bright Gold | #FBCA03 | Rare decorative highlights | SchemeColor |
| Arc Blue | #67C7EB | Localized energy and active feedback | SchemeColor |
| Reactor White | #F4FBFF | Primary dark-mode information | Proposed UI neutral |
| Carbon | #0B0D10 | Dark background | Proposed UI neutral |
| Gunmetal | #14171B | Dark surface | Proposed UI neutral |
| Seam | #2A3038 | Decorative divider | Proposed UI neutral |
| Steel | #A6ADB7 | Secondary dark-mode text | Proposed UI neutral |
| Titanium | #F4F3EF | Light background | Proposed UI neutral |
| Light surface | #FFFFFF | Light card | Proposed UI neutral |
| Light ink | #171A20 | Light foreground | Proposed UI neutral |
| Light muted | #575D65 | Secondary light text | Proposed UI neutral |
| Light seam | #C9CBD0 | Decorative light border | Proposed UI neutral |
| Light arc ink | #12536B | Candidate readable light-theme link | Proposed UI adaptation |

No candidate color is final. Do not apply this table across the application, export it as
the canonical theme, or silently substitute other hues. Existing functional and brand-logo
colors may remain until the owner approves the full palette.

### Resolution procedure

1. Prefer an authentic documented digital swatch or production paint specification if one can
   be verified. Record its source, medium, color space and limitations.
2. Otherwise select an attributable high-resolution production photo/render. Record the URL,
   asset identity, file hash, dimensions, ICC profile or assumed sRGB and chosen regions.
3. Convert to sRGB using the embedded profile if available. Sample several diffuse midtone
   patches from red and gold panels, avoiding specular reflections, deep shadows and edges.
   Record patch coordinates, robust median RGB, variation and candidate alternatives.
4. Sample a separate illuminated reactor reference for the luminous core and blue halo; the
   unlit maquette's white core does not establish its lit blue appearance. Keep these source
   distinctions explicit. Report exact sampled hex values as image-derived approximations,
   not canonical material specifications.
5. Present swatches and accessible component pairings to the owner. Record approved values
   and provenance; replace the omitted colors declaration with a structured colors token
   group only after approval. Update the decision record and CSS together during implementation.

### Theme and semantic usage

Carbon dark is the nighttime workshop, Titanium light the daylight engineering studio.
Retain theme switching and system preference; do not force dark mode. Both themes must be
complete and usable, not a color inversion or an afterthought.

Use red for deliberate armor accents and primary action fills, gold for limited craftsmanship
details, blue for interaction/energy, and readable neutral text for information. Reserve semantic
success, warning and error treatments for real states with text/icons in addition to color.
Never rely on an exact brand hex for small text or focus indicators if contrast fails; choose
an accessible pairing or ask the owner to approve a separate semantic supporting token.
Decorative seams may be subtle; interactive boundaries must remain perceptible.

Meet WCAG 2.2 AA: normal text 4.5:1, large text 3:1 and relevant non-text UI contrast 3:1.
Test actual composited colors in both themes, including hover, disabled, focus and error states.
Treat contrast checks as a requirement, not as proof of overall accessibility.

## Typography

Barlow Semi Condensed provides industrial display character; Geist Sans handles everyday UI
and reading; Geist Mono conveys genuinely technical information. Replace Doto at implementation
time, not in this documentation commit. Use the existing next/font setup in
`@src/app/layout.tsx`, loading only needed weights and subsets. Do not introduce a fourth
family without approval. The named fonts require normal license/provenance checks.

Use display text for the owner's name and section headings, not for every label.
Keep body copy in natural case. Use mono for dates, code, real counters and compact technical
metadata, with tabular numerals for changing numbers. Avoid all-caps paragraphs and fake
technical annotations. Article text should aim for approximately 60–75 characters per line.
Inputs should use 16px or larger where practical. Respect zoom, text resizing and wrap.

## Layout

Preserve the incumbent portfolio's centered, compact content column, banner, identity block,
section order, route hierarchy, existing navigation and project grid. Study the actual
`@src/app/page.tsx` and existing components before editing; keep content density and hierarchy.
No giant new hero, dashboard takeover, sidebar restructuring or new route is implied.

Use the spacing scale for local refinements while honoring baseline geometry. Align component
edges, avoid ornamental nesting and let whitespace separate sections. At narrow widths retain
content priority, readable text and useful tap targets (prefer 44 CSS px for major controls,
at least WCAG 2.2 AA target size or a valid exception). Preserve responsive grid behavior;
verify at 360, 768 and 1440 CSS px, plus 320px reflow and zoom checks where relevant.

## Elevation & Depth

Favor solid carbon/gunmetal and light titanium-like surfaces, fine separators and controlled
layering. Make real content imagery the visual focal point. Use slight elevation only where
it conveys an overlay or interactive separation. Reserve soft blue illumination for meaningful
reactor/active feedback and keep it local. No full-page neon haze, glassmorphism everywhere,
excessive shadows or simulated metal gradient on ordinary text.

## Shapes

Use mostly familiar rectangular UI with subtle corners, consistent line thickness and alignment.
Occasional clipped corners or fine structural seams can evoke manufactured armor in banner art
or selected accents; do not apply them to every card or clip focus outlines/content.
Use circular geometry selectively for an original reactor-inspired motif. Keep icons coherent,
retain existing technology/company brand marks where legitimate, and preserve native affordances.

## Motion & Micro-interaction

Mechanical precision means immediate input response, restrained movement and clean settling.
The YAML timing values are baseline targets; preserve interaction behavior and choose shorter
or no animation when frequency, input modality or performance makes motion distracting.

- Press: about 100ms, optional scale to 0.97 where it does not shift layout or impair focus.
- Hover: about 150ms, animate specific color/border properties; no hover-only functionality.
- Popover: about 180ms, subtle fade/scale from its trigger; dialogs stay spatially coherent.
- Expansion: about 240ms with purposeful geometry; dialog about 280ms, subtle scale from 0.98.
- Command palette: immediate, keyboard-first; no artificial startup sequence or input latency.
- Theme: optional 350–500ms reveal, never blocking use. Default timing token is 400ms.
- Hero: optional decorative sequence at most 800ms; no hidden content while it runs.

Honor prefers-reduced-motion with no unnecessary transform, scroll animation, particle motion,
or long transition. Ensure content and focus remain available immediately. Avoid persistent
background animations, scroll hijacking, flashing, and default sound effects. Use CSS for simple
effects; justify existing Framer Motion, GSAP and Three.js usage with real interaction value.
Clean up effects and GPU resources; avoid layout-thrashing and excessive client JavaScript.

## Voice & Content Strategy

Use plain professional labels (Experience, Projects, Writing, Contact), real metrics, verified
experience and authentic personal writing. Technical precision is more convincing than
fictional diagnostics or generic motivational filler. The cinematic inspiration belongs in
materials, geometry and feedback, not in job titles or imaginary affiliations.

MARK I is an internal codename. Do not present the owner as Tony Stark, use Marvel/Stark
logos, or imply endorsement. Original artwork and personal imagery must have verified rights.
Use real project screenshots, accurate descriptions and truthful stale/unavailable data states.
Refer to the content rules in ENGINEERING.md before migration.

## Components

These rules apply to existing components; additions require their own scope approval.
Use semantic tokens rather than ad hoc zinc classes or hardcoded values once colors are frozen.
`@src/app/globals.css` is the existing theme implementation; reconcile both the shadcn CSS
variables and direct Tailwind utilities, then verify all existing surfaces rather than assuming
a global recolor is sufficient.

| Component | Design intent |
| --- | --- |
| Banner/identity | Original blueprint-inspired art; controlled focal detail; readable real identity |
| Buttons | One clear primary action; restrained filled or outlined states; accessible focus and disabled feedback |
| Section headers | Barlow display hierarchy; optional subtle seam accent, no redundant fictional section numbers |
| Project cards | Preserve real images, grid, aspect ratio, links and project details; consistent boundaries |
| Experience/education | Compact readable rows, dates, real organizations, consistent alignment |
| Skills | Existing compact chips, recognizable icons, no decorative status meanings |
| Stats and charts | Real labels, accessible legends, honest fallback; energy accents subordinate to data |
| Command palette | Existing Ctrl/Cmd+K search and keyboard behavior; subtle reactor styling |
| Forms/dialogs | Plain labels, error and success states, focus management, accessible controls |
| Blog | Comfortable reading width, syntax clarity, links and existing route compatibility |
| Theme toggle | Clearly named control, visible state, preserve system preference |
| Guestbook/footer | Keep genuine interactions, attribution and useful navigation; no fake status |

### Candidate signature features (not separately approved)

An original concentric reactor emblem, blueprint artwork, selective armor seams and
telemetry-inspired graphs are motifs to explore, not permission to add new features.
Reusing the existing command palette with visual refinement is within the design direction;
an actual AI assistant, new reactor control, easter egg, sound effects, or new workshop
route require a separate implementation decision. Do not use official franchise symbols.

## Do's and Don'ts

| Do | Don't |
| --- | --- |
| Preserve the recognizable portfolio structure | Rebuild into a futuristic dashboard |
| Use red, gold and arc-blue with deliberate semantic roles | Scatter neon glows and gold outlines everywhere |
| Use readable industrial typography | Use gaming fonts for body copy |
| Use original, attributable artwork | Copy cinematic stills or official logos into public assets without rights |
| Show verifiable content | Invent stats, system statuses or affiliations |
| Use brief, purposeful motion | Force boot screens, hijack scrolling or delay navigation |
| Verify both themes and real devices | Assume a screenshot or a successful compile proves quality |

### Visual acceptance criteria

Before implementing the final color system, obtain explicit palette approval. For all UI work,
follow ENGINEERING.md and load the relevant design, anti-slop, motion, accessibility and
verification skills selectively. Capture actual before/after renders on affected routes; check
layout, hierarchy, contrast, legibility, keyboard/focus behavior, reduced motion, loading/error
states and mobile touch. Verify routes, links and actual personal content, not illustrative
placeholder data. Record measured performance where changes are significant. Aesthetic approval
belongs to the owner, not a generated design score.

### References and maintenance

- [Google DESIGN.md specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) — structured tokens and prose; alpha format, subject to change.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — accessibility requirements.
- [Emil Kowalski: animations](https://emilkowal.ski/ui) — motion craft and restraint.
- [Barlow](https://github.com/jpt/barlow) and [Geist](https://vercel.com/font) — typeface sources.
- Installed guidance: `@.agents/skills/01-design/design-md/SKILL.md`, `@.agents/skills/02-anti-slop/impeccable/SKILL.md`, `@.agents/skills/04-motion/emil-design-eng/SKILL.md`, `@.agents/skills/03-typography-color/better-typography/SKILL.md`.

Keep design tokens and implementation synchronized after approval. Update this document when
an approved design decision changes. Do not automatically run third-party tooling or export
provisional tokens. Validate against the current Google schema when tooling is available.
