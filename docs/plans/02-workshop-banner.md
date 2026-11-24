# Workshop Banner Implementation Plan

> **For agentic workers:** Read AGENTS.md, ENGINEERING.md and DESIGN.md first. Use the installed writing-plans / executing-plans guidance, relevant motion and accessibility skills, and verification-before-completion. Checkboxes are evidence-based; do not mark them done based on code alone.

**Status:** Planned, not implemented. Base: 58d999c. Owner approved the Workshop concept and requested its design specification and implementation plan. Owner selected a square workshop visual reference; panoramic adaptation, source-rights verification, final art approval and media creation remain pending.

**Goal:** Replace the inherited animated flower-field atmosphere with an original, quiet industrial workshop banner while preserving the existing header geometry and functionality.

**Architecture:** Keep the homepage a Server Component. Extract only the banner media and playback control into a focused Client Component; render a static poster on the server and progressively enable a single local video. Use native video and browser visibility APIs, no new animation library, external video service or backend.

**Tech stack:** Next.js App Router, React, TypeScript, Tailwind, native HTML video, existing next-themes, optional local FFmpeg/ffprobe for asset preparation (not an application dependency).

**Spec:** [DESIGN.md — Workshop banner](../../DESIGN.md#workshop-banner--approved-direction).

## 1. Existing implementation and file map

The current homepage uses two Next Image JPEGs with CSS theme visibility plus BannerParticles, a Canvas-based 30fps moving leaf/petal effect. It is not currently a video banner. The banner is absolute at top:0, h-[22vh], desktop left/right 30%, mobile full width. The profile starts immediately below at top:[22vh], height 112px; the content starts at calc(22vh+112px). CurrentTime is bottom-right within the banner. Existing Open Graph generation embeds banner-dark.jpg and has a hardcoded 3:1 art crop.

| Path | Intended responsibility |
| --- | --- |
| src/app/page.tsx (existing) | Preserve banner wrapper, header geometry, scrims and clock; replace only inherited image/particle layers with WorkshopBanner |
| src/components/WorkshopBanner.tsx (new) | Client media, visible pause/play button, visibility and motion preference lifecycle |
| src/lib/banner-playback.ts (new) | Pure playback eligibility predicate for deterministic unit tests |
| tests/banner-playback.test.mjs (new) | Eligibility and user-intent regression checks |
| package.json (existing) | Expand existing Node test script to run both test files; no dependency changes |
| public/banner/workshop-v1.webp (new) | Original static poster |
| public/banner/workshop-v1.webm (new) | VP9 loop |
| public/banner/workshop-v1.mp4 (new) | H.264 loop fallback |
| src/app/opengraph-image.tsx (existing) | Use approved static workshop poster and update its crop for 1200×630 |
| docs/plans/02-workshop-banner.md (this file) | Asset provenance, check results and handoff |

Keep BannerParticles and inherited images until references have been checked and the owner no longer needs them for comparison. Remove the BannerParticles import from the homepage when the replacement lands. No unrelated asset deletions, identity migration, theme rewrite, new route or deployment in this slice. CurrentTime still uses Doto; leave its typography for the approved broader typography migration.

## 2. Task A — Produce and approve original media

- [ ] Capture the inherited header at 360, 768 and 1440 CSS px in both themes and record dimensions plus baseline performance under repeatable throttling. Include 320px reflow.
- [x] Owner selected the supplied 1920 × 1920 workshop reference: red-and-gold armor on the right, amber workbench, cyan displays, nighttime city backdrop. Source fingerprint is recorded in DESIGN.md; no binary committed.
- [ ] Establish source/usage rights, then prepare a rights-cleared panoramic master faithful to the selected visual direction. Prefer horizontal scene extension over distortion or a severe center crop. Keep the armor and reactor recognizable, calm the left side, and preserve amber/cyan lighting. Review the 1920 × 500 master and responsive crops with the owner before animation.
- [ ] Animate only dust/haze, subtle monitor luminance and energy glow with a fixed camera. The first/last frames must join without a cut or global brightness jump. Review two consecutive loops at normal speed. No audio.
- [ ] Export matching static poster, VP9 WebM and H.264 MP4. Record creation method, source/rights, dimensions, duration, codec, size and SHA-256 for each approved file. No unauthorized third-party wallpaper, film still, music or official logo. Keep the artwork out of production until approved.

Example local encoding commands (run against an approved, already seamless master; adjust quality only after inspecting output; commands not yet executed):

```powershell
ffmpeg -i workshop-master.mov -vf "scale=1920:500:force_original_aspect_ratio=increase,crop=1920:500,fps=24" -an -c:v libvpx-vp9 -pix_fmt yuv420p -crf 34 -b:v 0 public/banner/workshop-v1.webm
ffmpeg -i workshop-master.mov -vf "scale=1920:500:force_original_aspect_ratio=increase,crop=1920:500,fps=24" -an -c:v libx264 -pix_fmt yuv420p -crf 26 -movflags +faststart public/banner/workshop-v1.mp4
ffmpeg -i public/banner/workshop-v1.mp4 -frames:v 1 -c:v libwebp -quality 80 public/banner/workshop-v1.webp
ffprobe -v error -show_streams -show_format public/banner/workshop-v1.webm
ffprobe -v error -show_streams -show_format public/banner/workshop-v1.mp4
Get-ChildItem public/banner/workshop-v1.* | Select-Object Name,Length
Get-FileHash public/banner/workshop-v1.*
```

Acceptance: 8–12s loop, both files independently decodable, zero audio streams, <=3 MB each (prefer <=2 MB), poster target <=150 KB. Check the actual crop and visual quality, not just file metadata. No encoding command can make non-looping source footage seamless automatically. If original moving artwork is not obtainable, deliver a static poster only and report the animation as pending; do not substitute unlicensed stock or a GIF.

## 3. Task B — Define and test playback policy

Use the existing dependency-free Node test runner. Create a pure exported predicate in src/lib/banner-playback.ts:

```ts
export type BannerPlaybackState = {
  ready: boolean;
  reducedMotion: boolean;
  inViewport: boolean;
  pageVisible: boolean;
  userPaused: boolean;
  saveData: boolean;
  failed: boolean;
};
export function shouldPlayBanner(state: BannerPlaybackState): boolean;
```

Return true only when ready, inViewport and pageVisible are true and reducedMotion, userPaused, saveData and failed are false. Initial state must not autoplay or attach a video before client preference detection. Treat unsupported save-data API as false, but default to poster on unavailable visibility/motion detection if reliable playback cannot be established.

- [ ] Add tests for all-positive conditions, initial unready state, reduced motion, offscreen, hidden document, explicit pause, data saver and failure. Assert userPaused remains a blocking condition even after re-entering viewport. Include combinations.
- [ ] Run the new test before implementation and verify the expected failure, implement predicate, then run the full test suite.
- [ ] Extend the existing npm test command explicitly to include both tests/github-calendar.test.mjs and tests/banner-playback.test.mjs. Keep the existing type-stripping Node option; do not change global package module semantics.

Acceptance: all old and new tests pass; no dependency changes. Pure eligibility checks do not replace browser integration tests.

## 4. Task C — Integrate the media and control

- [ ] Implement WorkshopBanner as a Client Component. Keep the existing wrapper, gradients, CurrentTime and profile positioning in page.tsx. Render a decorative static poster first, using the existing Image pattern with reserved dimensions and appropriate sizes or an equivalent static image. The no-JS result must show the poster.
- [ ] Attach local video sources only after hydration, preference detection, visible intersection and allowed data-saver state. Use muted, loop, playsInline, preload none and no audio. Prefer WebM then MP4 through native source selection; do not preload both. Initiate video play with a handled promise and never hide the poster before a real playing event. Preserve poster on denial/error/unsupported formats; avoid automatic retry loops. If autoplay is denied, a user-initiated Play attempt may retry once without defeating a reduced-motion or data-saver preference. Do not restart on unrelated theme changes.
- [ ] Subscribe to matchMedia changes, IntersectionObserver, document visibilitychange and optional connection saveData changes; clean up observers and listeners on unmount. Pause on loss of eligibility; clear video sources when reduced motion or data saver is enabled; resume only when eligibility returns and the user did not pause. Guard asynchronous play results against stale state/unmount. Keep userPaused stable throughout theme/viewport changes.
- [ ] Add a discreet but visible button (bottom-left, separate from bottom-right clock) with accessible Pause banner / Play banner name, actual playback state, keyboard activation and visible focus. Hide or disable the control with a clear reason if playback is unavailable or reduced motion disallows it. Native video itself is decorative and not focusable. Maintain >=44 CSS px target where possible, at least WCAG 2.2 AA size or valid exception. No default native video control bar.
- [ ] Test object-fit cover and initial object-position around 65% center; adjust within the approved composition to keep the suit recognizable across actual 40vw/22vh desktop and full-width mobile crops. Use existing theme edge blending; verify contrast against moving frames, add a localized control/clock backing if needed without freezing provisional theme neutrals.
- [ ] Replace both inherited banner images and BannerParticles in homepage only. Update Open Graph's embed path and crop for the new poster; retain the existing owner/content migration boundary and renderer's native img handling. No extra animation engine, audio, remote embeds or layout changes.

Acceptance: poster is always available; exactly one playing video, no animated Canvas overlay, profile/header unchanged, no hydration warnings, keyboard control works, no uncontrolled background playback, image/png social preview still renders.

## 5. Task D — Verify and review

- [ ] Run npm test, npm run typecheck, npm run lint, npm run build; record actual results. Use npm run start for native production verification and rebuild Docker for container checks.
- [ ] Browser checks in Chromium and at least one additional engine with video support (Firefox or Safari/WebKit where available). Test 320, 360, 768 and 1440 CSS px, both themes, first paint, image and clock readability, visible focus, no horizontal overflow, desktop/mobile crop, keyboard pause/resume and navigation. Capture actual before/after screenshots and video playback evidence.
- [ ] Emulate reduced motion before navigation and toggle it while playing; verify poster, no video download on initial reduced-motion visit, and immediate stop on live changes. Test manual pause -> scroll away/back -> stays paused; tab hidden/visible -> resumes only if previously allowed; theme toggle -> no forced restart. Test autoplay blocked, video 404, unsupported first format, both formats unavailable, JS disabled and data saver if supported. Verify no unhandled promise rejection, stuck blank frame or duplicated requests.
- [ ] Verify actual asset GET/decode, media types and range playback in production and Docker; verify /, /projects and /opengraph-image (200 and PNG for latter). Check Docker still runs as non-root. No public deployment.
- [ ] Measure transferred bytes, LCP, CLS and offscreen CPU behavior with comparable viewport/network conditions and at least three runs per baseline/new variant; use median and note test conditions. Targets: poster priority, no header layout shift, no video transfer for reduced-motion, no simultaneous full renditions, no continuous offscreen decoding/animation. Prefer good CWV lab targets (LCP <=2.5s, CLS <=0.1) and investigate material regression even if thresholds pass. Treat field CWV/INP as unmeasured, not proven by lab tests.
- [ ] Review against DESIGN.md and ENGINEERING.md, record PASS/FAIL/BLOCKED/NOT RUN, actual asset hashes and owner aesthetic approval. Commit approved assets and code in focused changes; retain rollback via previous banner implementation and Git history. Keep original attribution and do not publish inherited identity.

## 6. Review focus and remaining decisions

High-risk failures: both codecs downloading unnecessarily; autoplay rejection leaving a blank banner; manual pause being overridden on viewport or theme change; reduced motion still downloading/playing video; Open Graph still using inherited banner. These are covered explicitly in Tasks B–D.

One shared dark workshop loop is the proposed v1 cost-conscious approach, with both theme treatments; no second daylight video or new video service is required. The owner-selected square image now governs the composition; validate the panoramic adaptation and rights before final asset use. No new theme-neutral approvals are implied. Asset creation, owner preview and runtime evidence remain outstanding. This plan authorizes neither purchases nor public deployment.

## References

- [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
- [MDN HTML video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
- [MDN autoplay guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)
- [DESIGN.md](../../DESIGN.md), [ENGINEERING.md](../../ENGINEERING.md), [technical decisions](../decision.md).
