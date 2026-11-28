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


## Verified bundle slice and clean Lighthouse diagnosis

Owner reports 64/64 source tests, typecheck, lint and 31/31 production pages at local 88a68ed. Local unthrottled performance sampler medians: home mobile 427506 JS bytes, home desktop light/dark 436175, projects mobile 293787 (reductions 20740/20740/20698 respectively vs b7a3def). Image/font transfers unchanged, CLS 0 across all samples. Dark long-task median 217 ms (193–330); no claim that LCP improved universally. Full sampler JSON and visual interaction checks still outstanding.

Owner supplied Lighthouse 13.5.0 JSON for http://127.0.0.1:4173/ on Chrome 158 (2026-11-25 17:00:42Z mobile, 17:01:17Z desktop). Both warning-free, zero extension requests and zero third-party transfer. Earlier extension-contaminated run excluded from baseline. Navigation mode, simulated throttling, mobile RTT 150 ms / 1638.4 Kbps / 4x CPU, desktop RTT 40 ms / 10240 Kbps / 1x CPU. One sample each, no field data.

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance score | 78 | 99 |
| Simulated FCP ms | 1512 | 371 |
| Simulated LCP ms | 4531 | 901 |
| TBT ms | 277 | 19 |
| CLS | 0.00014654 | 0.00002956 |
| Speed index ms | 1512 | 621 |
| Total transfer bytes | 743697 | 740153 |
| Script bytes | 429181 | 429181 |

Both LCP elements are the hero starry-night image (768w q90, 53978 bytes). LCP discovery checklist: high priority and initial-document discovery pass; eager loading fails because fetchPriority alone leaves Next Image's default lazy loading. Observed trace subparts (not simulated LCP): mobile TTFB 10.532 ms, request delay 221.794, download 4.906, render delay 68.881; desktop 10.703/214.536/8.592/72.862. Simulated LCP and observed trace times must not be added or conflated. First targeted fix: explicit loading="eager" on this image only, retain fetchPriority="high", image dimensions, crop, quality, original artwork and animation. No new preload or additional competing high priority images. Official Next Image docs https://nextjs.org/docs/app/api-reference/components/image and https://web.dev/articles/optimize-lcp support this approach; installed Next docs are not accessible through the repository connector. Core-web-vitals and verification-before-completion skills plus LCP and measurement references consulted. New source assertion; full build and browser verification pending.

Image delivery estimated savings mobile 55138 bytes (banner 40008, diff2test screenshot 15130), desktop 43361 (banner). Defer compression/sizing adjustments pending isolated eager-loading rerun and visual assessment; do not trade artwork detail for an unmeasured score. Unused JS estimated ~145 KiB, mostly three existing chunks; coverage during navigation does not imply safe removal. No unused CSS finding; three render-blocking stylesheets total 20922 bytes, not sufficient evidence to restructure critical CSS. No need for preconnect. Rerun clean mobile 3 times under same conditions, record median/range and LCP discovery pass, then desktop, source/browser regressions and visual review. No deployment. Remote main still e57b767 at inspection; preserve the existing local fast-forward by creating a successor branch from 88a68ed rather than altering main.


## Verified eager discovery and final image-delivery candidate

At local 0c68d06 the owner reported 65/65 source tests, clean TypeScript and ESLint, 31/31 production pages and successful server startup. The 2026-11-25 17:29:04Z Lighthouse 13.5 mobile report (Chrome 158, same loopback URL and simulated mobile conditions) reports score 79, FCP 1518 ms, LCP 4545 ms, TBT 241 ms and CLS approximately 0.00015. The LCP discovery checklist now passes all three checks. Observed (not simulated) resource delay 34.456 ms vs 221.794 ms before; observed download 33.995 ms and render delay 184.345 ms. One post-change sample does not establish a metric improvement; retain explicit eager loading because the discovery issue is resolved. Total transfer 743744 bytes, script 429192, font 85340, image 124939. No run warnings.

Final scoped candidate on synchronized main ff7c6ba: use quality 80 for the hero instead of 90 (already allowed by next.config.ts); leave the original PNG, crop, geometry, fetch priority, animation and all other image qualities unchanged. Compare quality 80 vs 90 at the same viewports before accepting. Lighthouse's 40008-byte compression estimate is not a prediction of quality-80 savings.

The report's diff2test screenshot rect is 293 CSS px wide at 412px viewport, but the previous sizes hints advertise 380px. The homepage uses 32px total padding on each side (main + grid), archive 16px, both share the responsive gutter and 800px cap, 40px gap at md and 85% screenshot-panel width. Specify separately rounded-up width hints for the homepage and archive at the existing 640/768/848 breakpoints; no CSS changes. Expected selection varies by DPR and browser; measure actual currentSrc/transfer rather than claiming a specific download size. Preserve screenshot quality 70, fallback and existing priority behavior. See Next Image sizes/quality documentation https://nextjs.org/docs/app/api-reference/components/image; installed package docs are unavailable through the repository connector. Add two focused source regressions.

All four font requests are preloaded (85340 bytes); Geist body, Geist Mono clock/command and Barlow headings remain intentional. Font-display insight passes, no convincing evidence to remove a preload or alter the approved typography. Unused JS estimate 148724 bytes across three chunks is navigation coverage, not safe deletion evidence. Avoid speculative command-menu splitting, font or CSS changes in this final slice. No new dependencies or deployment. Run source tests/typecheck/lint/build and compare three warning-free mobile Lighthouse runs, one desktop run, normal browser performance sampler, rendered quality at mobile/tablet/desktop and full browser accessibility regression. If artwork quality regresses, revert only the hero quality change. Record actual results before closing phase; field metrics and GPU profiling remain unavailable.


## Final-polish production measurement checkpoint

Baseline f934607: Portfolio CI 46121628823 passed (129 source tests, 182 executed browser checks, two desktop-only mobile skips); Security 46121628905 passed. Prior performance results precede the final design and cannot establish current metrics. No production performance optimization is authorized by the dev-only footer image warning alone.

Run the existing four-profile, three-sample production harness inside the credential-free CI quality job, before functional browser regression, using the same loopback server port and production build. Bound readiness, clean up the server, retain the report independently of Playwright's test-results cleanup. The job records lab results without introducing a timing threshold on variable shared runners. Logs summarize LCP resource, timings, scroll position, armor visibility at observation, HTTP and page errors. The report retains the LCP candidate sequence and resource timings; the sampled rectangle reflects observation time, not the original LCP paint instant. CI host results are not directly comparable with the owner's earlier Windows Lighthouse or Playwright runs. No field data, hardware GPU trace or INP claim. Keep the hero eager and the footer figure lazy until current evidence warrants changing either. No dependency, visual, contact form, hosting or indexing changes. Skills: core-web-vitals, performance/MEASUREMENT, animation-performance, systematic-debugging, verification-before-completion. Result pending fresh CI execution.
