import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

const origin = 'http://127.0.0.1:4173';
const root = new URL('../../', import.meta.url);
const meshProbe = process.argv.includes('--mesh-probe');
const outputName = meshProbe ? 'mesh-probe.json' : 'performance-baseline.json';
const output = new URL('./test-results/' + outputName, import.meta.url);
const observationMs = 5000;
const repetitions = 3;
const baselineProfiles = [
  { name: 'home-mobile-light', path: '/', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: 'light', isMobile: true, hasTouch: true },
  { name: 'home-desktop-light', path: '/', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: 'light', isMobile: false, hasTouch: false },
  { name: 'home-desktop-dark', path: '/', viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: 'dark', isMobile: false, hasTouch: false },
  { name: 'projects-mobile-light', path: '/projects', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: 'light', isMobile: true, hasTouch: true },
];

const dark = baselineProfiles.find(profile => profile.name === 'home-desktop-dark');
const profiles = meshProbe ? [
  { ...dark, name: 'mesh-running', meshState: 'running' },
  { ...dark, name: 'mesh-paused', meshState: 'paused' },
] : baselineProfiles;

async function sample(browser, profile) {
  const { name, path, meshState, ...device } = profile;
  const context = await browser.newContext({ ...device, reducedMotion: 'no-preference', serviceWorkers: 'block' });
  try {
    let externalRequestsBlocked = 0;
    await context.route('**/*', route => {
      if (new URL(route.request().url()).origin === origin) return route.continue();
      externalRequestsBlocked++;
      return route.abort('blockedbyclient');
    });
    await context.addInitScript(() => {
      performance.setResourceTimingBufferSize(3000);
      const observers = new Map();
      const records = new Map();
      for (const type of ['largest-contentful-paint', 'layout-shift', 'longtask']) {
        if (!PerformanceObserver.supportedEntryTypes.includes(type)) continue;
        const entries = [];
        records.set(type, entries);
        const observer = new PerformanceObserver(list => entries.push(...list.getEntries()));
        observer.observe({ type, buffered: true });
        observers.set(type, observer);
      }
      window.__markPerformanceSnapshot = () => {
        for (const [type, observer] of observers) records.get(type).push(...observer.takeRecords());
        const lcp = records.get('largest-contentful-paint')?.at(-1);
        const shifts = records.get('layout-shift');
        let cls = null;
        if (shifts) {
          cls = 0;
          let first = -Infinity, previous = -Infinity, sum = 0;
          for (const entry of shifts.filter(e => !e.hadRecentInput).sort((a, b) => a.startTime - b.startTime)) {
            if (entry.startTime - previous >= 1000 || entry.startTime - first >= 5000) {
              first = entry.startTime;
              sum = 0;
            }
            previous = entry.startTime;
            sum += entry.value;
            cls = Math.max(cls, sum);
          }
        }
        const tasks = records.get('longtask');
        const nav = performance.getEntriesByType('navigation')[0];
        const resources = performance.getEntriesByType('resource').map(entry => {
          const url = new URL(entry.name);
          const path = url.pathname;
          const kind = entry.initiatorType === 'script' || path.endsWith('.js') ? 'javascript'
            : path.endsWith('.woff2') || path.endsWith('.woff') ? 'font'
            : entry.initiatorType === 'img' || path === '/_next/image' ? 'image'
            : path.endsWith('.css') ? 'css' : 'other';
          return {
            path: path === '/_next/image' ? path + url.search : path,
            kind, transferBytes: entry.transferSize, encodedBytes: entry.encodedBodySize,
            durationMs: Math.round(entry.duration),
          };
        });
        const totals = {};
        for (const r of resources) totals[r.kind] = (totals[r.kind] ?? 0) + r.transferBytes;
        return {
          observedLcpMs: lcp ? Math.round(lcp.startTime) : null,
          lcpElement: lcp?.element?.tagName ?? null,
          lcpResource: lcp?.url ? (() => { const url = new URL(lcp.url, location.href); return url.pathname + (url.pathname === '/_next/image' ? url.search : ''); })() : null,
          lcpElementRect: lcp?.element ? (() => { const r = lcp.element.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), width: Math.round(r.width), height: Math.round(r.height) }; })() : null,
          armorInInitialViewport: (() => { const img = document.querySelector('img[src="/art/falling-armor.webp"]'); if (!img) return null; const rect = img.getBoundingClientRect(); return rect.bottom > 0 && rect.top < innerHeight; })(),
          scrollY: Math.round(window.scrollY),
          observedCls: cls === null ? null : Number(cls.toFixed(4)),
          fcpMs: Math.round(performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0) || null,
          documentTtfbMs: nav ? Math.round(nav.responseStart - nav.startTime) : null,
          documentTransferBytes: nav?.transferSize ?? null,
          loadMs: nav ? Math.round(nav.loadEventEnd) : null,
          longTaskCount: tasks?.length ?? null,
          observedLongTaskMs: tasks ? Math.round(tasks.reduce((total, task) => total + task.duration, 0)) : null,
          resourceTransferBytesByKind: totals,
          resourceCount: resources.length,
          largestResources: resources.sort((a, b) => b.transferBytes - a.transferBytes).slice(0, 10),
          meshReady: document.querySelector('.mark-mesh-background')?.getAttribute('data-ready') === 'true',
          observationEndMs: Math.round(performance.now()),
        };
      };
    });
    const page = await context.newPage();
    let pageErrors = 0;
    const httpErrors = [];
    const githubStatuses = [];
    page.on('pageerror', () => pageErrors++);
    page.on('response', response => {
      const url = new URL(response.url());
      if (url.origin !== origin) return;
      if (url.pathname === '/api/github') githubStatuses.push(response.status());
      if (response.status() >= 400) httpErrors.push({ path: url.pathname, status: response.status() });
    });
    const response = await page.goto(origin + path, { waitUntil: 'load', timeout: 60000 });
    if (!response?.ok() || new URL(page.url()).origin !== origin) throw new Error('Local navigation failed: ' + name);
    await page.locator('main#main-content').waitFor({ state: 'visible', timeout: 15000 });
    let before = null;
    if (meshState) {
      await page.waitForFunction(() => document.querySelector('.mark-mesh-background')?.getAttribute('data-ready') === 'true', null, { timeout: 15000 });
      if (meshState === 'paused') {
        await page.getByRole('button', { name: 'Pause background', exact: true }).click();
        await page.getByRole('button', { name: 'Resume background', exact: true }).waitFor({ state: 'visible' });
      } else {
        await page.getByRole('button', { name: 'Pause background', exact: true }).waitFor({ state: 'visible' });
      }
      await page.waitForTimeout(1000);
      before = await page.evaluate(() => window.__markPerformanceSnapshot());
    }
    // Fixed observation window, not an assertion or a claim that all asynchronous work has settled.
    await page.waitForTimeout(observationMs);
    const after = await page.evaluate(() => window.__markPerformanceSnapshot());
    const meshWindow = before ? {
      state: meshState,
      durationMs: after.observationEndMs - before.observationEndMs,
      longTaskCount: before.longTaskCount === null || after.longTaskCount === null ? null : after.longTaskCount - before.longTaskCount,
      longTaskMs: before.observedLongTaskMs === null || after.observedLongTaskMs === null ? null : after.observedLongTaskMs - before.observedLongTaskMs,
    } : null;
    return {
      ...after,
      ...(meshWindow ? { meshWindow } : {}),
      pageErrors, httpErrors, githubStatuses, externalRequestsBlocked,
    };
  } finally {
    await context.close();
  }
}

function summarize(samples, get) {
  const values = samples.map(get).filter(Number.isFinite).sort((a, b) => a - b);
  if (values.length !== samples.length) return { median: null, min: null, max: null, available: values.length };
  return { median: values[Math.floor(values.length / 2)], min: values[0], max: values.at(-1), available: values.length };
}

const buildId = (await readFile(new URL('.next/BUILD_ID', root), 'utf8')).trim();
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const browser = await chromium.launch({ headless: true });
const report = {
  commit, buildId, browser: browser.version(), node: process.version, platform: process.platform,
  origin, observationMs, repetitions, cache: 'fresh context per navigation; server warmup per profile',
  conditions: 'local unthrottled CPU/network; headless Chromium; motion enabled; external browser requests blocked',
  profiles: [],
};
try {
  for (const profile of profiles) {
    console.log('Warmup: ' + profile.name);
    await sample(browser, profile);
    const samples = [];
    for (let i = 0; i < repetitions; i++) {
      console.log('Sample ' + (i + 1) + '/' + repetitions + ': ' + profile.name);
      samples.push(await sample(browser, profile));
    }
    const summary = {
      observedLcpMs: summarize(samples, s => s.observedLcpMs),
      observedCls: summarize(samples, s => s.observedCls),
      fcpMs: summarize(samples, s => s.fcpMs),
      documentTtfbMs: summarize(samples, s => s.documentTtfbMs),
      javascriptTransferBytes: summarize(samples, s => s.resourceTransferBytesByKind.javascript ?? 0),
      imageTransferBytes: summarize(samples, s => s.resourceTransferBytesByKind.image ?? 0),
      fontTransferBytes: summarize(samples, s => s.resourceTransferBytesByKind.font ?? 0),
      observedLongTaskMs: summarize(samples, s => s.observedLongTaskMs),
      meshReady: samples.map(s => s.meshReady),
      lcpResources: samples.map(s => s.lcpResource),
      armorInInitialViewport: samples.map(s => s.armorInInitialViewport),
      ...(meshProbe ? {
        windowLongTaskMs: summarize(samples, s => s.meshWindow.longTaskMs),
        windowLongTaskCount: summarize(samples, s => s.meshWindow.longTaskCount),
        windowDurationMs: summarize(samples, s => s.meshWindow.durationMs),
      } : {}),
    };
    report.profiles.push({ profile, summary, samples });
    console.log(JSON.stringify({ profile: profile.name, ...summary }));
  }
  await mkdir(new URL('./test-results/', import.meta.url), { recursive: true });
  await writeFile(output, JSON.stringify(report, null, 2) + '\n');
  console.log('Full report: tests/browser/test-results/' + outputName + ' (local, ignored by Git)');
} finally {
  await browser.close();
}
