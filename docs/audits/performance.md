# MARK I — performance audit

## Baseline and scope

Reference application: f6f27cac0e21d1f91f80ef332e4c92555bf18903. Owner's local source suite passed 57/57 at ac0a57e; earlier production build, TypeScript, lint and 112/112 browser accessibility checks passed at bd8eeed. Browser npm ci and npm audit passed with zero reported vulnerabilities at f6f27ca. Owner marked all seven manual accessibility checklist entries complete in chat; detailed assistive technology evidence is not independently available. No WCAG certification implied.

Performance baseline is **pending local execution**. The redesign is a local noindex preview, not the separate live portfolio. No deployment, telemetry service, visual change, production dependency change or external performance scan. Preserve approved colors, original artwork, geometry, motion speed and interaction behavior. Skills consulted: core-web-vitals, performance and its MEASUREMENT reference, verification-before-completion; AGENTS, ENGINEERING, DESIGN and accepted decisions reviewed for relevant constraints.

## Static inventory / hypotheses (not measured bottlenecks)

- Hero master public/banner/starry-night.png: 1,733,427 bytes; Next Image uses responsive sizes, quality 90 and high fetch priority. Inspect actual transferred variant and LCP element, not the master size alone.
- Mesh Drift: dark home desktop >=1280px only; 30 FPS draw cap, 900,000-pixel ceiling, approved speed 0.84, visibility/motion/pause guards. Measure actual GPU cost and frame pacing on a real GPU; headless readiness is not proof of hardware acceleration or smoothness.
- Starry Night: 30 FPS bounded canvas, image-ready and intersection/visibility guards. Compare motion enabled with paused via a real DevTools trace.
- Three font families (Geist, Geist Mono, Barlow Semi Condensed; Barlow two weights). Inspect preload and transfer, preserve font selection.
- Manifest includes framer-motion, gsap, three and Radix/cmdk; installed package size is not shipped route JS. Inspect actual navigation resources before choosing code-splitting or pruning.
- Spotify iframe is user-triggered; no initial embed expected. GitHub endpoint may be cached, live or unavailable; record response state. Certificates are linked evidence, not necessarily loaded at navigation.

## Reproducible local observation

In terminal 1 at repository root, after stopping any existing process on 4173:

```powershell
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed" }
node .\node_modules\next\dist\bin\next start --hostname 127.0.0.1 --port 4173
```

In terminal 2:

```powershell
cd D:\Projects\portfolio\tests\browser
npm run perf
```

Existing pinned Playwright; no new dependency. One warmup and three independent measured navigations per profile, sequentially: mobile light home, desktop light home, desktop dark home, mobile light projects. Fresh context, route interception disables HTTP cache, unthrottled local network and CPU; server cache warmed but not forcibly cleared. Motion enabled. No scrolling or interaction during the fixed five-second post-load observation. Browser requests to non-loopback origins are blocked (server-side existing GitHub integration is not mocked). Record GitHub status and HTTP errors; only compare equivalent states. Stop server with Ctrl+C after sampling.

Output: ignored tests/browser/test-results/performance-baseline.json. Contains commit/build ID, browser version, conditions, individual samples, median/min/max, top resources, local response errors, readiness and transfer sizes. Share only after reviewing for private paths/data; no environment variables collected. Missing metrics remain null. Observed LCP and session-window CLS are diagnostic samples, not lifecycle-complete field metrics. Observed long-task duration is neither INP nor Lighthouse TBT. Local mobile viewport is not a slow phone; headless Chromium can use software rendering. No performance score or threshold assertion in this harness.

## Lighthouse and GPU follow-up

Use Chrome DevTools Lighthouse on the local production homepage (navigation mode, Performance category, mobile and desktop separately, same browser version and settings, clear storage, no extensions). Record three runs per chosen profile, median and range; export reports locally if useful. Inspect LCP breakdown, render blocking, unused JS and image delivery. For actual shader cost, use headed Chrome on the owner's GPU with the dark desktop homepage; compare equal-duration Performance recordings with both animation controls running vs paused, same viewport/scroll position and power mode. No field CrUX data for localhost; production RUM is separate and requires release approval.

## Targets and execution order

Proposed lab Lighthouse score >=95; field-oriented good thresholds LCP <=2.5s, CLS <=0.1, INP <=200ms (INP requires real interaction/field or appropriate trace; not inferred from long tasks). Establish route JS/image/font transfer baselines before setting project-specific byte budgets. Prioritize trace-backed bottlenecks; use minimal reversible slices, comparable before/after samples, full source/type/lint/build/browser accessibility checks after application changes, and owner visual review. Retain separate production site and noindex until explicit release approval.

Status: instrumentation and static inspection only; runtime baseline, GPU trace and optimization pending. No measured improvement claimed.


## Measured baseline and first remediation slice

Owner supplied complete performance-baseline.json for 72dec7825d2ded51480f45572ac1bb42b1e31d17. Windows, Node 22.16.0, Chromium 159.0.8154.6, 3 measured runs per profile, 5 seconds after load, unthrottled loopback, fresh contexts, headless, motion enabled. Production build succeeded, 31/31 static pages. The npm start argument forwarding stripped flags on the owner's shell; the direct local Next CLI command above started successfully.

| Profile | Median LCP ms (range) | CLS | JS transfer bytes | Image bytes | Font bytes | Long task ms (range) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home mobile light | 184 (184–208) | 0 | 448929 | 177400 | 85340 | 0 |
| Home desktop light | 176 (168–180) | 0 | 457598 | 75716 | 85340 | 0 |
| Home desktop dark | 192 (180–204) | 0 | 457598 | 75716 | 85340 | 420 (305–466) |
| Projects mobile light | 96 (88–96) | 0 | 315168 | 76204 | 102180 | 0 |

No page errors; GitHub 200 in all nine home runs. All 12 navigations requested two unavailable local Vercel scripts (24 total 404s). Gate existing telemetry components behind the already-established referencePreview flag; no new service and no changes to intended non-preview behavior. Hosting/telemetry selection remains pending release approval. The mobile home fetched a 25,234-byte hover-banner variant in addition to the 82,506-byte hero variant despite no hover; source confirms unconditional ReactDOM.preload. Remove only this preload; preserve the mounted-card eager image, geometry, artwork, interactions and fallback. Expect avoided speculative transfer, not yet measured. Regression checks added. No dependency changes.

Dark-only long tasks (4–7 per navigation) correlate with mesh readiness in all three dark samples; no causal attribution or hardware GPU measurements yet. Preserve speed, resolution, frame cap and shader source. New optional mesh probe compares five-second steady-state observation windows after readiness and a one-second settling period, with shader running vs paused via its real control. Banner animation stays unchanged. It reports differences of cumulative long-task counters, not TBT, INP or GPU utilization. Run against the same local build:

```powershell
node performance.mjs --mesh-probe
```

Report: tests/browser/test-results/mesh-probe.json. Use headless paired results to isolate CPU impact; headed GPU trace is still needed. The largest homepage JS chunk (136,253 transferred bytes) is not among the projects top ten; map actual bundle contents before changing client boundaries or libraries. No attribution to a specific package from filename alone. No Lighthouse/field data. Re-run normal sampler after first slice, retain baseline report separately, run full code gates and accessibility suite, then inspect shader probe. Browser and source verification of this slice pending owner execution; no performance improvements claimed yet.


## Verified first slice and shader draw restriction

Owner-supplied reports at 897244a45e8af188023089671db572b0a540386d, same browser/Node/conditions as the initial baseline. Source tests 59/59, typecheck/lint clean, build 31/31. All 12 ordinary and six probe measured navigations have zero page errors and zero HTTP errors; GitHub 200 on home. Initial 24 telemetry 404s gone. Mobile image bytes 177400 -> 152166 (-25234, 14.2%); desktop 75716 -> 69774 (-5942, 7.8%); projects unchanged. JS decreased by 996 bytes per profile, fonts unchanged. CLS 0 throughout. Median LCP 184/168/176/84 ms across the four original profiles; dark long-task median 312 ms (298–348), others zero. Timing variation is not attributed to a particular optimization. Full accessibility rerun remains pending.

Mesh probe five-second steady-state long-task durations: running 100, 0, 350 ms (median 100; counts 2, 0, 7); paused 0, 0, 0 ms. Paused total since navigation is higher (median 970 vs 405 ms) but includes startup, readiness, and click/settling before the comparable observation window. Do not compare the cumulative totals as steady-state costs. The probe supports animation-related CPU overhead but profiles were sequential, not randomized and GPU hardware acceleration is unknown.

Next slice: existing full-screen WebGL draw shades the center even though CSS mask is exactly transparent there. Use the same CSS boundary for a hidden zero-height measurement span and both mask stops. Convert to backing-buffer pixels with outward rounding and a two-pixel interpolation guard. Draw two scissored strips in the original full viewport (one full draw if measurements are missing, invalid, mask unsupported or strips overlap). Keep same canvas resolution, palette, grain, shader, speed, 30 FPS draw cap, preserved drawing buffer and all pause/reduced-motion/visibility behavior. Cache geometry at sync/resize/DPR changes rather than reading layout on each draw; write ready attribute only when it changes. At 1440px, theoretical omitted width is about 42% before guard; this is not a measured GPU or CPU saving. Actual browser and visual verification pending. Add boundary and source regressions. Re-run normal and mesh samplers and compare before/after, visually check gutter fade at 1280/1440/1920 and resizing, pause/resume and reduced motion; run full code gates and browser accessibility suite. No deployment, no dependency change. Animation-performance skill consulted for this slice. No claim of measured shader improvement yet.


## Verified shader slice and next bundle attribution

Owner provided build/test transcript and both complete JSON reports for b7a3defb915c57e51414e9367335d15b1141c5be. Source checks 61/61, TypeScript and ESLint clean, production build 31/31. Same Chromium 159.0.8154.6 and Node 22.16.0, unthrottled loopback headless sampling. All 18 measured navigations have zero HTTP errors, zero page errors and CLS 0; home GitHub responses 200. Shader ready in all eligible samples.

| Profile | Median LCP ms (range) | JS transfer bytes | Image bytes | Font bytes | Long-task ms (range) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home mobile light | 196 (196–196) | 448246 | 152166 | 85340 | 0 |
| Home desktop light | 184 (180–188) | 456915 | 69774 | 85340 | 0 |
| Home desktop dark | 188 (184–208) | 456915 | 69774 | 85340 | 193 (190–197) |
| Projects mobile light | 128 (104–128) | 314485 | 76204 | 102180 | 0 |

Dark navigation-window long-task median decreased from 420 to 312 to 193 ms (54.0% below original baseline; 38.1% below immediate predecessor). Running mesh steady-state probe: 0/0/0 ms and zero long tasks (previous 100/0/350 ms); paused 0/0/0. Cumulative running probe median 180 ms (178–241), paused 193 ms (180–194). These remain small sequential samples; no hardware GPU utilization or INP claim. LCP medians rose relative to the first slice; retain results rather than claim universal improvements. JS +313 bytes per profile, image and font bytes unchanged. No additional shader change indicated by current evidence. Visual resize/fade and hardware GPU checks are still pending owner confirmation; final browser accessibility regression pending.

Next: attribute the 136253-byte homepage JS chunk and shared route JS before refactoring. Next.js 16.4.6 uses Turbopack; use its built-in experimental analyzer (available from 16.1), no new package or Webpack switch. Stop local production server first, then run from repository root:

```powershell
node .\node_modules\next\dist\bin\next experimental-analyze --output
```

The official guide https://nextjs.org/docs/app/guides/package-bundling and CLI reference https://nextjs.org/docs/app/api-reference/cli/next document the output directory .next/diagnostics/analyze. Analyze client JavaScript for / and /projects; inspect module sizes and import chains, not just filenames or installed package sizes. Owner can share reviewed analyzer output or screenshots of the route-filtered client treemap and largest module import chains. Do not share .env.local, the whole .next directory, or unrelated build files. Analyzer data may contain source paths/module names; review before sharing. Analyzer does not create a production build; rebuild before subsequent production checks if necessary. No app code changes in this documentation-only checkpoint. No deployment.


## Turbopack analysis and focused client bundle reduction

Owner supplied the complete analyzer ZIP from Next.js 16.4.6 at e57b7673c3f9809e823bc5d01706367974472a16. Metadata reports gitDirty=true; exact local worktree changes are not known. Analyzer format schema_version=1, routeCount=17. Parsed the length-prefixed JSON in data/analyze.data, data/projects/analyze.data and data/modules.data; filtered chunk parts to client static JavaScript, grouped by package/source. Analyzer output filenames differ from runtime build filenames. Per-source compressed sizes are analyzer estimates and are not additive network measurements; the route total includes non-JS assets (notably two records for the same 1,733,427-byte static banner). Do not compare route aggregate compressed_size with Playwright transfer totals.

| Client static JS source group | Home estimated compressed bytes | Projects estimated compressed bytes |
| --- | ---: | ---: |
| Next.js (includes compiled React, polyfills) | 217530 | 217530 |
| motion-dom | 42713 | 42713 |
| framer-motion | 15251 | 15251 |
| motion-utils | 1362 | 1362 |
| Application source (approximate path grouping) | 46214 | 19008 |
| react-icons | 23088 | 23088 |
| tailwind-merge | 8412 | 8412 |
| lucide-react | 8074 | 7066 |

Home motion chunk includes projection node, drag controls and other unused features. Project cards and social hover cards use hover, variants, enter/exit and reduced-motion handling, not drag or layout projection. Use scoped synchronous LazyMotion + domAnimation + m (strict), retain the existing variant definitions, transition properties, AnimatePresence, interaction state and classes; no asynchronous loading delay or root provider. Source regression updated for equivalent m.article. See https://motion.dev/docs/react-lazy-motion and https://motion.dev/docs/react-upgrade-guide for Framer Motion exports. Runtime verification pending on installed package.

BlogList has no client hooks or event handlers; both home and blog archive are Server Components. Remove its unnecessary client boundary; article source (5875 estimated compressed bytes) and list renderer (1111) need not be shipped as client JS merely to show summaries. Link behavior remains Next Link. See https://nextjs.org/docs/app/getting-started/server-and-client-components. The social-card banner static import causes an emitted copy of the existing public asset; use the same public URL as the hero, keep sizing/quality and on-open loading. This avoids redundant build artwork, not an additional 1.73 MB measured network saving. All changes preserve content and intended appearance. No dependency edits, no deployment, no claims of measured savings yet.

Verification: run full source/typecheck/lint/build, normal performance sampler (prior reference 448246/456915/456915/314485 JS bytes), browser accessibility suite, and manually check project hover/tooltip, social hover banner, article links and reduced motion. Re-run analyzer only after verifying build and runtime behavior; compare estimated JS groups separately from actual transfer. Prior shader visual checks and GPU profiling still pending; Lighthouse and production checks remain outstanding.
