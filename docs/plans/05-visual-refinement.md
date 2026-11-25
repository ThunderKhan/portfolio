# Visual refinement — MARK I

## Slice 1: Typography

Owner requested progression beyond personal content and music. Start with approved DESIGN.md typography. Replace Doto with Barlow Semi Condensed (600/700, Latin, next/font/google); retain Geist Sans and Geist Mono. Use semantic display, page-title and section-title classes, 32px mobile/40px wide desktop for display and 22px section titles. Archive page titles are 24–28px to fit their fixed header geometry. Remove inherited RGB glitch shadows from page headings. The clock uses Geist Mono with tabular numerals and unchanged time behavior. Homepage introduction uses 16px/1.55. Supporting neutral palette is still provisional; do not recolor the site or change its layout, content order, routes, assets or music/highlights in this slice.

Font provenance: Barlow Semi Condensed is an open source Google Fonts family (SIL OFL 1.1, https://github.com/google/fonts/blob/main/ofl/barlowsemicondensed/OFL.txt). Next.js font data confirms Latin and the two normal weights; installed framework documentation/build not available in connector environment. No dependency or deployment change.

Baseline: owner reported 21/21 tests, clean lint and successful build at d9ff823; subsequent music/highlights changes have not received full local gate verification. New source invariants cover typography, but cannot replace browser QA. Check clean build, all tests, heading wraps, clock contrast, archive title fit and hero/command controls at 320/360/768/1440px both themes. Record results before claiming this slice visually accepted.

## Subsequent slices

- Refine section separators, action treatments and navigation using approved brand primitives; compare candidate supporting neutrals in both themes before freezing them.
- Improve responsive column geometry and keyboard/touch interaction without changing route hierarchy.
- Audit runtime links, image fallbacks, actual account data, event photos, accessibility, performance, metadata and deployment prerequisites.

## Company logo correction

Owner noticed micro1 displaying the VSPH logo. Both JPEGs at current main had identical Git blob 11579723b0a05b67221006cc8bf99af5e34bbc8d (visually VSPH). Restored the visually inspected original micro1 black/white m. mark from 78913c0, blob ce105cde21b1b0c4ff6f5ec03fd20b8c7b1aadf4, under a new filename to bypass image cache. Shared experience data updates homepage, archive and timeline. VSPH unchanged. Removed duplicate mislabeled file and added regression check. Runtime QA pending.

## Slice 2: Color and surfaces — homepage review preview

Implement six approved brand primitives unchanged. Preview provisional Carbon/Titanium page backgrounds, Gunmetal/white selected surfaces and accessible ink/muted/interaction pairs on homepage only. Primary action uses Hot Rod Red with Reactor White, Deep Armor Red on hover/press; remove contact label opacity. Active navigation has a gold seam and aria-current; reserve fixed indicator width to prevent shifts. No changes to logos, images, banner, music, or content order. Other archive backgrounds and card internals remain unchanged pending owner review; supporting colors are NOT frozen. Solid sRGB pairing checks: F4FBFF/AA0505 7.35:1, F4FBFF/6A0C0B 12.03:1, 575D65/F4F3EF 5.99:1, A6ADB7/0B0D10 8.60:1, 12536B/F4F3EF 7.64:1, 67C7EB/0B0D10 10.14:1. All checked pairs meet 4.5:1; not a full composed-state accessibility audit. Source verification only; browser, build and visual acceptance pending. No dependencies or deployment.

## Slice 2b: Shared page surfaces

Owner confirmed the micro1 logo restoration and requested continuation. Extend the same provisional supporting palette to all nine primary archive/detail/contact route files and the body, keeping the homepage selector intact for navigation. Move supporting variables to root and dark theme so nested and portaled content can consume them; shared heading ink, focus outlines and selected project/education card surfaces now use the same theme roles. Static education panels do not receive hover treatments. Preserve logos, all user assets, route layout and content. Supporting colors remain a reversible review preview, not newly approved normative tokens. No new dependencies or deployment. Static checks only; full local tests, lint, build and browser checks pending.

## Slice 3a: Shared component treatment

Replace inherited surface treatments in certifications, hackathons, highlights, music and evidence links with shared panel/control roles; remove heavy card shadows and the legacy multilayer gradient pill button while retaining its public API, labels and primary action styling. Use accessible theme-aware control ink, named command trigger and named navigation landmark. Preserve event data, image rendering, user-controlled music, links and button behavior. Current preview colors remain provisional. No new dependencies; source invariants added. Browser and full local checks pending. Project card keyboard navigation, experience accordion semantics and responsive layout are subsequent audit targets.

## Slice 3b / 4a: Keyboard interactions and restrained motion

Source review found mouse-only project wrappers and external actions (WCAG 2.1.1), experience headers without keyboard/button semantics or collapsed-panel focus exclusion (2.1.1, 4.1.2), and 18px theme toggle (2.5.8 target-size concern). Native internal stretched link and separate external anchor preserve card click behavior and support browser link actions; external labels reflect live/repository destination. Technology icons expose names, project titles/action row wrap. Both experience views use native buttons, paired unique IDs, aria-expanded/controls and inert/aria-hidden panels; no nested interactive controls. Timeline selection focuses its accordion trigger and respects reduced motion for scrolling. Expansion shortened to 240ms, theme transition to 400ms, reduced-motion bypass and 32px theme toggle. Music, banner, data, and layouts preserved. Static invariants added; runtime keyboard/screen-reader, layout and local build checks pending. No new dependencies or deployment.

Follow-up: move project hover variant ownership to the card ancestor so the stretched native link does not intercept the screenshot's hover animation. Technology glyph accessibility uses an aria-hidden wrapper and separate screen-reader text; avoid duplicate browser-native tooltips. Static checks only.

## Slice 5a: Responsive geometry

Owner reported 33/33 tests, clean TypeScript and lint, and 31/31 static pages generated at 2c9fd03. Replace inherited 30% side margins (307px column at 768px) with shared responsive inset: zero below 640px, otherwise max(24px, half the viewport excess above 800px). All ten primary route files align banner, header, body and rails. Desktop index appears at xl and scrolls locally. Narrow archive headers move controls to upper right; article text capped at 75ch. Preserve page order, assets, typography, themes and interactions. Source-level change only; browser measurements and full local verification pending. No deployment or dependencies.

## Slice 5b: Responsive components

Contribution calendar retains a 560px minimum graph width in its own keyboard-accessible horizontal scroll region rather than squeezing 53 columns; header wraps and cells honor reduced motion. Project image sizes reflect the new content column, command menu trigger is at least 32px tall and command list height is viewport-bounded. Add regression checks for shared gutters and local scrolling. Browser and full local verification pending; no deployment.

## Slice 5c: Runtime verification findings

Owner reported 35/35 passing tests, clean TypeScript/lint and production build (31/31) at 3579d7f. Dev server routes returned 200, with missing GitHub configuration returning 503, unconfigured image quality 80 and missing smooth-scroll attribute warnings. Apply the two documented Next.js fixes; keep the server-side GitHub error status meaningful and replace empty-calendar failure state with a direct profile link. No token or snapshot fabricated. Document least-privilege server-only token setup and optional reviewed snapshot. New regression checks cover config and fallback. Local browser and live GitHub verification pending. No deployment or dependency changes.

## Slice 5d: Stronger brand color integration

Owner reviewed the full homepage, approved stronger brand expression and requested Metallic Gold instead of blue for engineering activity. Apply shared gold section markers, gold/red avatar seam, restrained red project frames, gold achievement borders/statistics, reactor technical links and skills hover, gold credential details and footer motto. Contribution graph and legend share identical five-level gold classes; level 4 is the exact approved #B97D10, with separate light/dark intermediate shades and neutral level 0. Remove opacity attenuation so the displayed highest-level color matches the approved swatch. Keep count thresholds and real account data intact. Preserve logos, screenshots, music, assets, layout, routing and behavior. No dependencies or deployment. Browser appearance and full local gates pending.

## Slice 5e: Stark Workshop background trial

Owner requested implementation of the approved dark-mode workshop concept. Replace the Carbon/Gunmetal supporting tokens with warm oxblood and panel colors, retain reactor ink, and paint a static layered CSS background only on route wrappers (not twice on body and route). The responsive gutter variable defines an opaque central reading column over faint metallic dots and ambient side colors. Decorative route rules have a dedicated dark-only gold treatment; light mode and activity levels remain unchanged. No changes to layout, artwork, content, navigation or playback. Added source-level regression checks. Local build and visual review pending; no deployment.

## Slice 5f: Reactor Slate trial

Owner requested a color-only refinement after rejecting dominant burgundy and literal armor cards. Replace the workshop background and gradients with one desaturated blue-gray surface, cool raised panels, neutral rules, quieter gold text, and normal project/portrait borders. Preserve all six approved brand primitives, gold activity levels 1–4, real contribution data, routes, assets, typography, layout, motion and manual music. The zero cell is a neutral slate, month labels use theme-aware muted ink, and command/dialog surfaces consume the shared panel token. Light base palette remains unchanged; shared red frame detailing is removed in both themes. Update obsolete workshop tests rather than preserving rejected visuals. Static source checks and contrast calculations only; local build and visual review pending. No deployment or new dependencies.

## Slice 5g: Owner-requested visual cleanup

Restore the original red-background avatar asset without grayscale or colored frame. Remove visible development-preview copy while preserving the noindex release safeguard. Remove decorative directional arrow SVGs and icons from route headers, cards, evidence links and buttons. Replace icon-only back navigation with Back text, event gallery icon links with View text, accordion chevrons with plus/minus, and command palette key arrows with text. Preserve destinations, accessible labels, non-directional functional icons and playback. No asset mutation, layout redesign or deployment. Local tests and visual review pending.
