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
