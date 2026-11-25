# Visual refinement — MARK I

## Slice 1: Typography

Owner requested progression beyond personal content and music. Start with approved DESIGN.md typography. Replace Doto with Barlow Semi Condensed (600/700, Latin, next/font/google); retain Geist Sans and Geist Mono. Use semantic display, page-title and section-title classes, 32px mobile/40px wide desktop for display and 22px section titles. Archive page titles are 24–28px to fit their fixed header geometry. Remove inherited RGB glitch shadows from page headings. The clock uses Geist Mono with tabular numerals and unchanged time behavior. Homepage introduction uses 16px/1.55. Supporting neutral palette is still provisional; do not recolor the site or change its layout, content order, routes, assets or music/highlights in this slice.

Font provenance: Barlow Semi Condensed is an open source Google Fonts family (SIL OFL 1.1, https://github.com/google/fonts/blob/main/ofl/barlowsemicondensed/OFL.txt). Next.js font data confirms Latin and the two normal weights; installed framework documentation/build not available in connector environment. No dependency or deployment change.

Baseline: owner reported 21/21 tests, clean lint and successful build at d9ff823; subsequent music/highlights changes have not received full local gate verification. New source invariants cover typography, but cannot replace browser QA. Check clean build, all tests, heading wraps, clock contrast, archive title fit and hero/command controls at 320/360/768/1440px both themes. Record results before claiming this slice visually accepted.

## Subsequent slices

- Refine section separators, action treatments and navigation using approved brand primitives; compare candidate supporting neutrals in both themes before freezing them.
- Improve responsive column geometry and keyboard/touch interaction without changing route hierarchy.
- Audit runtime links, image fallbacks, actual account data, event photos, accessibility, performance, metadata and deployment prerequisites.
