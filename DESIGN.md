---
version: alpha
name: MARK I
description: A personal engineering portfolio with a restrained industrial identity inspired by the 2008 Mark III armor.
colors:
  armor:
    hot-rod-red: "#AA0505"
    deep-armor-red: "#6A0C0B"
    metallic-gold: "#B97D10"
    bright-gold: "#FBCA03"
  reactor:
    arc-blue: "#67C7EB"
    reactor-white: "#F4FBFF"
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

**Status:** Visual direction and six-color Mark III-inspired digital brand palette approved by the owner on 2026-11-25 (IST). Supporting theme neutrals remain provisional; implementation and visual validation are pending.
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
The YAML above defines the approved six-color brand palette and proposed implementation defaults
for the approved typography and motion direction, with supporting spacing and geometry defaults
to validate against the existing layout. It does not assert that these values are already implemented. Preserve approved structure;
do not alter section order, routes or layout geometry simply to fit a token.

## Colors

**Brand palette: approved.** The owner accepted the six exact digital hex values below
as a Mark III-inspired interpretation for MARK I. No canonical sRGB hex values for original
production paint have been verified. Metallic paint and an illuminated reactor depend on
lighting, exposure, color management and reflections. Do not represent our chosen colors
as official Marvel, ILM or Stan Winston Studios paint specifications.

### Reference evidence and provenance

- [2008 production paint-study maquette](https://propstore.com/product/iron-man-2008/lot-229-mark-iii-armor-paint-study-maquette/): physical reference for armor finishes and white reactor core, not the source of our numerical hex values.
- [Production notes](https://www.scifijapan.com/news/iron-man-production-notes): cinematic design context.
- [Original HUD team oral history](https://beforesandafters.com/2019/03/18/heads-up-the-oral-history-of-iron-mans-original-hud/): restrained white information graphics and selective colored accents for Mark III.
- [SchemeColor Iron Man](https://www.schemecolor.com/iron-man.php): published third-party digital palette. Its five hex values were rechecked directly on 2026-11-25. The source's color names are included below; our semantic names are project-specific.
- Reactor White is a project-selected supporting brand color, not a swatch published by SchemeColor or a measurement of the film's reactor.

The earlier production-image download attempts failed, so no pixel sampling, image color
profile analysis or physical paint measurement was performed. Approval of this digital palette
supersedes the earlier pending production-reference sampling requirement. Authentic material
references remain visual inspiration, not numerical provenance. A future palette revision
would require a new documented owner decision.

### Approved brand colors — normative sRGB tokens

| Name | YAML token path | Hex | Intended role | Provenance |
| --- | --- | --- | --- | --- |
| Hot Rod Red | `colors.armor.hot-rod-red` | `#AA0505` | Primary armor/action fill | SchemeColor (Classic Rose) |
| Deep Armor Red | `colors.armor.deep-armor-red` | `#6A0C0B` | Recessed surfaces and pressed accents | SchemeColor (Sanguine) |
| Metallic Gold | `colors.armor.metallic-gold` | `#B97D10` | Selective seams and detailing | SchemeColor (Rusty Gold) |
| Bright Gold | `colors.armor.bright-gold` | `#FBCA03` | Rare decorative highlights | SchemeColor (Orange Juice) |
| Arc Reactor Blue | `colors.reactor.arc-blue` | `#67C7EB` | Localized energy and interaction | SchemeColor (Waterfall) |
| Reactor White | `colors.reactor.reactor-white` | `#F4FBFF` | Readable information and luminous core | Owner-approved MARK I UI color |

These six values are fixed brand primitives. Preserve them exactly in the eventual CSS token
implementation; use semantic aliases and accessible foreground/background combinations instead
of silently changing brand hexes. Additional semantic supporting colors do not replace them.
No app-wide recolor is authorized by this documentation-only update.

### Supporting theme colors — provisional, not normative

| Candidate | Hex | Intended role |
| --- | --- | --- |
| Carbon | #0B0D10 | Dark background |
| Gunmetal | #14171B | Dark surface |
| Seam | #2A3038 | Decorative divider |
| Steel | #A6ADB7 | Secondary dark-mode text |
| Titanium | #F4F3EF | Light background |
| Light surface | #FFFFFF | Light card |
| Light ink | #171A20 | Light foreground |
| Light muted | #575D65 | Secondary light text |
| Light seam | #C9CBD0 | Decorative light border |
| Light arc ink | #12536B | Readable light-theme link candidate |

These supporting colors are prior project proposals, not sampled production colors or newly
approved values. Validate them in both themes and obtain approval of the supporting palette
before freezing/exporting theme tokens. The six brand colors are approved independently.

### Contrast checks — solid sRGB colors

Computed using WCAG relative luminance, without rounding the pass threshold. Normal-text AA
requires 4.5:1. These are numerical pairing checks, not a rendered UI accessibility audit.

| Foreground | Background | Contrast | Normal text AA |
| --- | --- | ---: | --- |
| Reactor White | Hot Rod Red | 7.35:1 | Pass |
| Reactor White | Deep Armor Red | 12.03:1 | Pass |
| Reactor White | candidate Carbon | 18.61:1 | Pass |
| Metallic Gold | candidate Carbon | 5.56:1 | Pass |
| Bright Gold | candidate Carbon | 12.56:1 | Pass |
| Arc Reactor Blue | candidate Carbon | 10.14:1 | Pass |
| Hot Rod Red | candidate Carbon | 2.53:1 | Fail |
| Metallic Gold | Reactor White | 3.35:1 | Fail |
| Arc Reactor Blue | Reactor White | 1.84:1 | Fail |

Use Hot Rod Red as a fill with Reactor White text rather than as small text on Carbon.
Gold and arc blue work as readable accents on candidate Carbon, but not as ordinary
text on Reactor White. Recheck actual composed states, alpha, borders and focus before release.

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
background animations except the explicitly bounded Workshop banner loop below; avoid scroll hijacking, flashing, and default sound effects. Use CSS for simple
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
Use approved brand primitives through semantic tokens rather than ad hoc zinc classes or hardcoded values; freeze supporting theme tokens only after validation and approval.
`@src/app/globals.css` is the existing theme implementation; reconcile both the shadcn CSS
variables and direct Tailwind utilities, then verify all existing surfaces rather than assuming
a global recolor is sufficient.

| Component | Design intent |
| --- | --- |
| Banner/identity | Original Workshop scene; restrained ambient motion; readable real identity; see Workshop banner specification below |
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

### Workshop banner — approved direction

**Status:** Workshop concept approved; this specification and the [implementation plan](docs/plans/02-workshop-banner.md) are accepted planning scope. No finished artwork or media asset exists yet. Default focal object: an original red-and-gold engineering suit on a service stand (proposed execution, subject to artwork review).

**Intent.** A quiet late-night industrial laboratory that conveys craftsmanship, focused experimentation and solitude. The scene is original environmental artwork, not a Marvel poster, gaming header, or reproduction of a movie frame. Make the owner's profile and work—not the suit—the primary functional content.

**Composition.** Fixed panoramic camera, single clear focal object on the right/right-center; calmer left and middle, with a workbench, metal structure, tools and understated blueprint-like monitors receding into depth. Leave the lower-right clock region and lower-left controls legible. The inherited profile row is immediately below the banner, not overlaid; preserve its current position, command palette, theme toggle, content column and navigation. Keep the existing banner height (22vh) and desktop 40vw / mobile full-width container unless a separate layout change is approved. Review crops, not just the master artwork: the focal object should remain recognizable at narrow widths without depending on tiny details.

**Material and light.** Low-key, directional light, mostly neutral workshop surfaces. Use the six approved brand primitives exactly in UI tokens: Hot Rod Red #AA0505 and Deep Armor Red #6A0C0B for armor, Metallic Gold #B97D10 and rare Bright Gold #FBCA03 for craftsmanship, Arc Reactor Blue #67C7EB for localized energy, Reactor White #F4FBFF for the luminous core. Cinematic shading/reflection naturally varies around these references; do not treat every media pixel as a UI token. No full-scene red/cyan flooding, lens-flare spectacle, official franchise logos, text baked into imagery or fake diagnostics. No new supporting theme colors are approved by this spec.

**Motion.** Stationary camera and stationary armor; only slow airborne dust, faint haze, small monitor luminance changes, subtle reflected-light movement and a gentle reactor pulse. A few tiny sparks are optional, never distracting. No camera travel, fast flashing, aggressive rotation, combat, abrupt cuts, scroll-linked motion or audio. The 8–12 second loop is a deliberate, narrowly scoped decorative exception to the 800ms hero entrance token and general ban on persistent background animation; it must never block content or run unnecessarily offscreen. No separate continuous particle engine on top of the video.

**Media contract.**

| Property | Target |
| --- | --- |
| Master composition | Approximately 3.5:1–4:1; 1920 × 500 px target |
| Loop | 8–12 seconds, seamless, 24 fps preferred, no audio track |
| Delivery | Local WebM (VP9), MP4 (H.264) fallback, matching static WebP poster |
| Budget | Prefer <=2 MB per video rendition; 3 MB ceiling per rendition; poster target <=150 KB, review exceptions |
| Rendering | Poster first, fixed geometry, object-fit cover, tested focal alignment |
| Themes | Carbon / Titanium; one shared original scene in v1, theme-aware edge blending and control contrast; optional daylight asset later only if justified |

**Accessibility and resource behavior.** Muted inline autoplay only when motion is allowed and playback succeeds. No native control bar by default, but provide a visible, keyboard-accessible Pause/Play banner button with an accessible name and visible focus; a continuous loop beside content requires a stop mechanism (WCAG 2.2 SC 2.2.2). Pause when outside the viewport or the page is hidden; do not override a user's explicit pause when returning. Honor live prefers-reduced-motion changes, start with a static poster under reduced motion, and avoid requesting video in that mode. Autoplay denial, disabled JavaScript, unsupported codecs, failed media or constrained connection must leave a legible, stable static banner and usable profile. No layout shifts, audio or flashing. The artwork is decorative; keep it out of the accessibility tree while the actual control remains accessible.

**Art brief.** Original cinematic panoramic industrial lab after midnight. A distinctive red-and-gold engineering exosuit on a service stand at right, a small circular blue-white energy core, blueprint-like monitors without text, tools and quiet mechanical depth. Calmer left side; restrained highlights, stationary camera. Animate only faint dust, haze, soft monitor luminance and slow reactor glow. No logos, copied film frames, violent action or excessive neon.

**Acceptance.** Owner approves the original static scene and motion preview; verify media provenance and rights, the loop seam and encoded budgets; preserve the exact header hierarchy; verify both themes and responsive crops (320, 360, 768, 1440 CSS px), clock/control contrast, keyboard pause/resume, reduced motion, offscreen/hidden-tab pause, fallback and no header layout shift. Compare network/CPU and LCP/CLS with the existing banner. Reuse the static artwork for Open Graph with an appropriate social-card crop, not a video. Follow the plan's independent verification gates before release.

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

The six brand colors are approved; validate and obtain approval of supporting theme tokens before freezing the complete color system. For all UI work,
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
