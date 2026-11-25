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
npm run start -- --hostname 127.0.0.1 --port 4173
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
