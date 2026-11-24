# Starry Night Mosaic Banner — implementation record

Base: 7b767a8. Scope: owner-approved mosaic artwork, procedural glints and header integration; no identity, architecture or theme changes.

## Implementation

- [x] Verify artwork: local generated PNG is 2508 × 627, 1,733,427 bytes; calculated Git blob equals remote a88420b77704129d2ce5826508a52ad88893b4a6.
- [x] Supersede Workshop video plan; preserve history in D-006.
- [x] Add pure eligibility, cover crop and periodic pulse helpers; add focused Node tests.
- [x] Add StarryNightBanner, with Next Image poster, 59 sampled tile centers, 30fps capped Canvas overlay and 44px pause/play control. Keep manual pause across visibility changes and suppress animation under reduced motion. Preserve old files for reference.
- [x] Replace homepage image/petal layers only; preserve header geometry, add dark backing for existing clock and change its ink to approved Reactor White. OG uses the new static PNG and 4:1 crop.
- [ ] Validate actual optimized image transfer, responsive crops, tile alignment, visual intensity and clock/control contrast. A separate WebP is not required for v1: Next Image handles delivery.
- [ ] Execute full application tests, typecheck, lint, build, production browser checks and Docker smoke checks on this revision.
- [ ] Verify manual pause, reduced motion live changes, offscreen/hidden-tab stop, resize, no-JS and Canvas failure fallback. Check both themes at 320, 360, 768 and 1440px. Check PNG response on /opengraph-image.
- [ ] Measure LCP/CLS, transfer bytes and CPU under comparable conditions; owner reviews actual motion.

## Evidence and limits

New pure helper tests executed in isolated Node 22.16.0: 3/3 pass; initial run without helper failed with ERR_MODULE_NOT_FOUND (module presence check, not a complete behavioral red-green proof). Expected tested blob hashes: helper e4e88bf46598727380c52b1f44326d00af6498ca; tests 2c0e39807e8ff7dc4dd6342a0f2f06cb9dcce102. Full repository cannot be cloned from the execution shell (DNS unavailable); installed framework docs, application dependency execution, browser and Docker not available there. Do not count previous baseline tests as verification of this change.

The 59 centers were derived from local grid-line luminance minima and sampled bright gold/cyan regions; the narrow rectangles are intentionally inset. Their final visual alignment and perceived motion need a real browser review. This first slice uses periodic glints with phase offsets, not full simulated flowing paths or moving shooting stars. No audio, new package or external service. Existing reference identity remains unchanged; no public deployment. Rollback by reverting this implementation commit.

## Local verification

```powershell
git pull --ff-only origin main
npm test
npm run typecheck
npm run lint
npm run build
npm run dev
```

Stop any prior container/dev server before restarting. Use the actual header screenshot and motion preview to decide whether refinements are needed.
