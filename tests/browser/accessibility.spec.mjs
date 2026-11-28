import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Ten primary route templates; individual project details are sampled here.
const routes = [
  '/', '/projects', '/projects/diff2test', '/experience', '/open-source',
  '/blogs', '/blogs/001', '/certifications', '/highlights', '/contact',
];
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];
const calendar = {
  calendar: {
    totalContributions: 5,
    months: [{ name: 'November' }],
    weeks: [{ contributionDays: [
      { date: '2026-11-22', contributionCount: 0 },
      { date: '2026-11-23', contributionCount: 5 },
    ] }],
  },
};

async function mockCalendar(page, unavailable = false) {
  await page.route('**/api/github', route =>
    route.fulfill(unavailable
      ? { status: 503, json: { error: 'Audit fixture: unavailable' } }
      : { status: 200, json: calendar })
  );
}

async function visit(page, path, info) {
  const response = await page.goto(path);
  expect(response?.ok(), 'Local route must respond successfully').toBe(true);
  await expect(page.locator('html')).toHaveClass(
    new RegExp('(?:^| )' + info.project.use.colorScheme + '(?: |$)')
  );
  // Theme toggle is only mounted on the client; wait for hydration before audit.
  await expect(page.getByRole('button', { name: 'Toggle theme' })).toBeVisible();
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await expect(page.locator('main#main-content')).toHaveCount(1);
}

async function audit(page, info, state) {
  const results = await new AxeBuilder({ page }).withTags(tags).analyze();
  await info.attach(state + '-axe.json', {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });
  // Incomplete/manual-review rules remain in the JSON, not counted as passes.
  expect.soft(results.violations.map(({ id, impact, nodes }) => ({
    id, impact, targets: nodes.map(node => node.target),
  })), state + ': WCAG A/AA automated violations').toEqual([]);
}

for (const path of routes) {
  test('route audit: ' + path, async ({ page }, info) => {
    if (path === '/') await mockCalendar(page);
    await visit(page, path, info);
    if (path === '/') {
      await expect(page.getByText('5 GitHub activities in the last year', { exact: true })).toBeVisible();
    }
    await audit(page, info, 'route');
  });

  test('keyboard bypass: ' + path, async ({ page }, info) => {
    if (path === '/') await mockCalendar(page);
    await visit(page, path, info);
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await page.keyboard.press('Tab');
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main#main-content')).toBeFocused();
  });
}

test('command palette keyboard, search, focus and audit', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  const trigger = page.getByRole('button', { name: /Open command menu/ });
  await expect(trigger).toHaveAccessibleName(/⌘\s*K\s*Open command menu/);
  await trigger.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Command Palette' });
  await expect(dialog).toBeVisible();
  const search = dialog.getByRole('combobox');
  await expect(search).toBeFocused();
  await audit(page, info, 'command-open');
  await search.pressSequentially('PROJECTS');
  await expect(search).toHaveValue('PROJECTS');
  await expect(dialog.getByRole('option', { name: 'All projects', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await page.keyboard.press('Control+k');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
});

for (const { path, prefix } of [
  { path: '/', prefix: 'home-experience-panel-' },
  { path: '/', prefix: 'hackathon-panel-' },
  { path: '/experience', prefix: 'archive-experience-panel-' },
]) {
  test('keyboard disclosure: ' + prefix, async ({ page }, info) => {
    if (path === '/') await mockCalendar(page);
    await visit(page, path, info);
    const trigger = page.locator('button[aria-controls^="' + prefix + '"][aria-expanded="false"]').first();
    await expect(trigger).toBeVisible();
    const id = await trigger.getAttribute('aria-controls');
    // Anchor the locator to the control's stable ID relation before state changes.
    const button = page.locator('button[aria-controls="' + id + '"]');
    const panel = page.locator('[id="' + id + '"]');
    await expect(panel).toHaveAttribute('aria-hidden', 'true');
    await expect(panel).toHaveJSProperty('inert', true);
    await button.focus();
    await page.keyboard.press('Space');
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(panel).toHaveJSProperty('inert', false);
    await expect(panel).toHaveAttribute('aria-hidden', 'false');
    await audit(page, info, 'disclosure-open');
    await button.focus();
    await page.keyboard.press('Space');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toHaveJSProperty('inert', true);
    await expect(button).toBeFocused();
  });
}

test('activity table exposes fixture counts', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  const summary = page.getByRole('button', { name: 'Daily activity', exact: true });
  await expect(summary).toBeVisible();
  await summary.focus();
  await page.keyboard.press('Enter');
  const table = page.getByRole('table', { name: 'Daily GitHub contributions' });
  await expect(table).toBeVisible();
  await expect(table.getByRole('columnheader', { name: 'Contributions' })).toBeVisible();
  await expect(table.getByRole('row').filter({ hasText: 'Nov 23, 2026' }).getByRole('cell', { name: '5', exact: true })).toBeVisible();
  await audit(page, info, 'activity-table-open');
});

test('activity unavailable fallback', async ({ page }, info) => {
  await mockCalendar(page, true);
  await visit(page, '/', info);
  await expect(page.getByText('The contribution calendar is temporarily unavailable.')).toBeVisible();
  await expect(page.getByRole('link', { name: /View activity on GitHub/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Daily activity', exact: true })).toHaveCount(0);
  await audit(page, info, 'activity-unavailable');
});

test('music disclosure and first-party player shell', async ({ page }, info) => {
  await mockCalendar(page);
  // No third-party playback or request; the real embed needs a separate manual audit.
  await page.route('https://open.spotify.com/embed/**', route =>
    route.fulfill({ contentType: 'text/html', body: '<!doctype html><html lang="en"><head><title>Audit fixture</title></head><body><main>Player fixture</main></body></html>' })
  );
  await visit(page, '/', info);
  const toggle = page.locator('button[aria-controls="featured-music-player"]');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  const frame = page.locator('#featured-music-player iframe');
  await expect(frame).toHaveAttribute('title', /^Spotify player: .+/);
  await expect(frame.contentFrame().getByText('Player fixture')).toBeVisible();
  await audit(page, info, 'music-shell-open');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(frame).toHaveCount(0);
});

test('reduced motion and keyboard theme toggle', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  const theme = page.getByRole('button', { name: 'Toggle theme' });
  const expectedDark = info.project.use.colorScheme === 'light';
  await expect(page.locator('.mark-mesh-background canvas')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Pause background' })).toBeHidden();
  await theme.focus();
  await page.keyboard.press('Enter');
  await expect(theme).toHaveAttribute('aria-pressed', String(expectedDark));
  await expect(page.locator('html')).toHaveClass(new RegExp('(?:^| )' + (expectedDark ? 'dark' : 'light') + '(?: |$)'));
  await expect(page.locator('.mark-mesh-background canvas')).toBeHidden();
  await expect(theme).toBeFocused();
});


test('closing footer has usable links and a static reduced-motion scene', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  const footer = page.getByRole('contentinfo', { name: 'Portfolio footer' });
  await expect(footer).toHaveCount(1);
  await expect(footer.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute('href', '/projects');
  await expect(footer.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact');
  await footer.getByRole('link', { name: 'Résumé' }).focus();
  await expect(footer.getByRole('link', { name: 'Résumé' })).toBeFocused();
  const canvas = footer.locator('canvas');
  await canvas.scrollIntoViewIfNeeded();
  await expect(canvas).toHaveAttribute('data-ready', 'true');
  const before = await canvas.evaluate(c => c.toDataURL());
  await page.waitForTimeout(400);
  expect(await canvas.evaluate(c => c.toDataURL())).toBe(before);
  await audit(page, info, 'footer');
});


test('centered motto and footer background artwork remain legible with reduced motion', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  const footer = page.getByRole('contentinfo', { name: 'Portfolio footer' });
  const art = footer.locator('img[src="/art/falling-armor.webp"]');
  const terrain = footer.locator('[data-ridgeline-scene]');
  const group = page.locator('#closing-motto');
  const quote = group.locator('p');
  const link = footer.getByRole('link', { name: 'Projects', exact: true });
  await art.scrollIntoViewIfNeeded();
  await expect(art).toBeVisible();
  await expect.poll(() => art.evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
  const destinationError = () => art.evaluate(el => {
    const terrain = el.closest('footer').querySelector('[data-ridgeline-scene]').getBoundingClientRect();
    return Math.abs(el.getBoundingClientRect().bottom - terrain.top - terrain.height * .70);
  });
  await expect.poll(destinationError).toBeLessThan(2);
  const [g, q] = await Promise.all([group.boundingBox(), quote.boundingBox()]);
  const mobile = info.project.use.viewport.width < 640;
  expect(Math.abs(q.x + q.width / 2 - g.x - g.width / 2)).toBeLessThan(2);
  expect(Math.abs(q.y + q.height / 2 - g.y - g.height / 2)).toBeLessThan(2);
  expect(await quote.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(mobile ? 22 : 30);
  expect(await art.evaluate(el => getComputedStyle(el).pointerEvents)).toBe('none');
  expect(await link.evaluate(el => getComputedStyle(el.closest('nav').parentElement).zIndex)).toBe('2');
  expect(await link.evaluate(el => getComputedStyle(el).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
  expect(await link.evaluate(el => getComputedStyle(el).textShadow)).not.toBe('none');
  expect(await terrain.evaluate(el => Number(getComputedStyle(el).zIndex))).toBe(0);
  expect(await art.evaluate(el => Number(getComputedStyle(el).zIndex))).toBe(1);
  const transform = await art.evaluate(el => getComputedStyle(el).transform);
  await link.click({ trial: true });
  expect(await art.evaluate(el => getComputedStyle(el).transform)).toBe(transform);
  await audit(page, info, 'closing-composition');
});

test('falling artwork reaches the ridgeline and stays static with reduced motion', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await mockCalendar(page);
  await visit(page, '/', info);
  const footer = page.getByRole('contentinfo', { name: 'Portfolio footer' });
  const art = footer.locator('img[src="/art/falling-armor.webp"]');
  const moveTo = fraction => footer.evaluate((el, part) => {
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - window.innerHeight * part, behavior: 'instant' });
  }, fraction);
  const y = () => art.evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42);
  const closing = page.locator('#closing-motto');
  const moveClosingTo = fraction => closing.evaluate((el, part) => {
    window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - window.innerHeight * part, behavior: 'instant' });
  }, fraction);
  await moveClosingTo(1.2);
  const initial = await art.evaluate(el => -el.offsetWidth * .32);
  await expect.poll(y).toBeCloseTo(initial, 1);
  await moveClosingTo(1.0);
  await expect.poll(y).toBeGreaterThan(initial + 1);
  const beforeQuote = await y();
  await moveClosingTo(.5);
  await expect.poll(y).toBeGreaterThan(beforeQuote + 10);
  const first = await y();
  await footer.evaluate(el => window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().bottom - window.innerHeight, behavior: 'instant' }));
  await expect.poll(y).toBeGreaterThan(first + 30);
  await expect.poll(() => art.evaluate(el => {
    const terrain = el.closest('footer').querySelector('[data-ridgeline-scene]').getBoundingClientRect();
    return Math.abs(el.getBoundingClientRect().bottom - terrain.top - terrain.height * .70);
  })).toBeLessThan(2);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const last = await y();
  await moveTo(.85);
  expect(await y()).toBeCloseTo(last, 0);
});


test('terrain spans the viewport without widening footer navigation or document', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  const footer = page.getByRole('contentinfo', { name: 'Portfolio footer' });
  const terrain = footer.locator('[data-ridgeline-scene]');
  await terrain.scrollIntoViewIfNeeded();
  await expect(terrain.locator('canvas')).toHaveAttribute('data-ready', 'true');
  const geometry = await terrain.evaluate(el => {
    const r = el.getBoundingClientRect();
    const f = el.closest('footer').getBoundingClientRect();
    const main = document.querySelector('main').getBoundingClientRect();
    return { left: r.left, right: r.right, viewport: document.documentElement.clientWidth,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      footerLeft: f.left, mainLeft: main.left,
      mask: getComputedStyle(el).maskImage,
      foreground: getComputedStyle(el).getPropertyValue('--ridge-6').trim() };
  });
  expect(Math.abs(geometry.left)).toBeLessThan(2);
  expect(Math.abs(geometry.right - geometry.viewport)).toBeLessThan(2);
  expect(geometry.overflow).toBeLessThanOrEqual(1);
  expect(Math.abs(geometry.footerLeft - geometry.mainLeft)).toBeLessThan(2);
  expect(geometry.mask).toContain('linear-gradient');
  expect(geometry.foreground.toLowerCase()).toBe(info.project.use.colorScheme === 'dark' ? '#98703f' : '#584238');
  await footer.getByRole('link', { name: 'Projects', exact: true }).click({ trial: true });
  await audit(page, info, 'full-bleed-terrain');
});


test('closing motto retains its wording and two crimson accents', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  const quote = page.locator('#closing-motto p');
  await expect(quote).toHaveText(/If I must fall,\s*let it be from a great height\./);
  const accents = quote.locator('span');
  await expect(accents).toHaveText(['fall', 'great height']);
  const color = info.project.use.colorScheme === 'dark' ? 'rgb(226, 82, 75)' : 'rgb(170, 5, 5)';
  await expect(accents.first()).toHaveCSS('color', color);
  await expect(accents.last()).toHaveCSS('color', color);
  await audit(page, info, 'motto-accent');
});


test('MARK I command palette has prioritized commands and accessible selection', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  const trigger = page.getByRole('button', { name: /Open command menu/ });
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Command Palette' });
  await expect(dialog.getByRole('heading', { name: 'MARK I' })).toBeVisible();
  const input = dialog.getByRole('combobox');
  await expect(input).toBeFocused();
  await expect(dialog.getByRole('option').first()).toHaveText('All projects');
  await input.fill('portfolio source code');
  await expect(dialog.getByRole('option', { name: 'Portfolio source code', exact: true })).toBeVisible();
  await input.fill('no-matching-command-xyz');
  await expect(dialog.getByText('No matching commands. Try a different search.')).toBeVisible();
  await input.fill('all projects');
  await expect(dialog.getByRole('option', { name: 'All projects', exact: true })).toBeVisible();
  await audit(page, info, 'mark-command');
  await input.press('Enter');
  await expect(page).toHaveURL(/\/projects$/);
  await expect(dialog).toBeHidden();
});


test('hidden terminal discovery, exact commands and contact navigation', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  await page.getByRole('button', { name: /Open command menu/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Command Palette' });
  const search = dialog.getByRole('combobox');
  await search.fill('sudo hire ayan; ls');
  await expect(dialog.getByText('No matching commands. Try a different search.')).toBeVisible();
  await search.fill('jarvis');
  await expect(dialog.getByRole('option', { name: 'Run jarvis' })).toBeVisible();
  await search.press('Enter');
  const input = dialog.getByRole('textbox', { name: 'Terminal command' });
  await expect(input).toBeFocused();
  await input.fill('whoami');
  await input.press('Enter');
  await expect(dialog.getByRole('log')).toContainText('Ayan Khan');
  await input.fill('clear');
  await input.press('Enter');
  await expect(dialog.getByRole('log')).not.toContainText('Ayan Khan');
  await input.fill('exit');
  await input.press('Enter');
  await expect(search).toBeFocused();
  await dialog.getByRole('button', { name: 'Open hidden terminal' }).click();
  await expect(input).toBeFocused();
  await audit(page, info, 'hidden-terminal');
  await input.fill('sudo hire Ayan');
  await input.press('Enter');
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole('heading', { name: 'Contact', exact: true })).toBeVisible();
});

test('blueprint is discoverable and missing pages use the cinematic error scene', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  await page.getByRole('button', { name: /Open command menu/ }).click();
  const dialog = page.getByRole('dialog', { name: 'Command Palette' });
  await dialog.getByRole('combobox').fill('man mark-i');
  await expect(dialog.getByRole('option', { name: 'Run man mark-i' })).toBeVisible();
  await dialog.getByRole('combobox').press('Enter');
  await expect(page).toHaveURL(/\/blueprint$/);
  await expect(page.getByRole('heading', { name: 'Under the Hood' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await audit(page, info, 'blueprint');
  const response = await page.goto('/unknown-mark-i-test-route');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: '404 — Signal lost.' })).toBeVisible();
  const lost = page.locator('[data-lost-page]');
  const terrain = lost.locator('[data-ridgeline-scene]');
  const armor = lost.locator('[data-lost-armor]');
  await expect(terrain.locator('canvas')).toHaveAttribute('data-ready', 'true');
  await expect.poll(() => armor.evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
  await expect(lost.getByRole('link')).toHaveCount(0);
  const geometry = await lost.evaluate(el => {
    const bounds = el.getBoundingClientRect();
    const ridge = el.querySelector('[data-ridgeline-scene]').getBoundingClientRect();
    const figure = el.querySelector('[data-lost-armor]').getBoundingClientRect();
    const title = el.querySelector('h1').getBoundingClientRect();
    return { width: bounds.width, height: bounds.height, viewportWidth: document.documentElement.clientWidth,
      viewportHeight: window.innerHeight, scrollHeight: document.documentElement.scrollHeight,
      scrollWidth: document.documentElement.scrollWidth, ridgeLeft: ridge.left, ridgeRight: ridge.right,
      ridgeBottom: ridge.bottom, armorBottom: figure.bottom, titleBottom: title.bottom, armorTop: figure.top };
  });
  expect(Math.abs(geometry.height - geometry.viewportHeight)).toBeLessThan(2);
  expect(geometry.scrollHeight).toBeLessThanOrEqual(geometry.viewportHeight + 1);
  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
  expect(Math.abs(geometry.ridgeLeft)).toBeLessThan(2);
  expect(Math.abs(geometry.ridgeRight - geometry.viewportWidth)).toBeLessThan(2);
  expect(Math.abs(geometry.ridgeBottom - geometry.viewportHeight)).toBeLessThan(2);
  expect(geometry.armorBottom).toBeLessThan(geometry.ridgeBottom);
  expect(geometry.titleBottom).toBeLessThan(geometry.armorTop);
  await expect(armor).toHaveCSS('animation-name', 'none');
  await audit(page, info, 'not-found');
});

test('original sudo hiring command works directly from palette', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  await page.keyboard.press('Control+k');
  const dialog = page.getByRole('dialog', { name: 'Command Palette' });
  const search = dialog.getByRole('combobox');
  await expect(search).toBeFocused();
  await search.fill('sudo hire Ayan');
  await search.press('Enter');
  await expect(page).toHaveURL(/\/contact$/);
});


test('Runtime Conditions role and disclosure chevrons', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  const role = page.locator('button[aria-controls^="home-experience-panel-"]').filter({ hasText: 'Runtime Conditions' });
  await expect(role).toHaveCount(1);
  await expect(role).toContainText('Member & Open Source Contributor');
  const icon = role.locator('[data-disclosure-chevron]');
  await expect(icon).toHaveCount(1);
  const closed = await icon.evaluate(el => getComputedStyle(el).rotate + ' ' + getComputedStyle(el).transform);
  await role.click();
  await expect(role).toHaveAttribute('aria-expanded', 'true');
  await expect.poll(() => icon.evaluate(el => getComputedStyle(el).rotate + ' ' + getComputedStyle(el).transform)).not.toBe(closed);
  await role.click();
  await expect(role).toHaveAttribute('aria-expanded', 'false');
  await audit(page, info, 'runtime-conditions');
});


test('education drawers animate with the same timing and reverse without a jump', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const toggle = page.getByRole('button', { name: /Semester I coursework/ });
  const panel = page.locator('[id=' + JSON.stringify(await toggle.getAttribute('aria-controls')) + ']');
  await expect(panel).toHaveJSProperty('inert', true);
  await expect(panel).toHaveCSS('transition-duration', '0.24s');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect.poll(() => panel.evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThan(0);
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toHaveJSProperty('inert', true);
  await expect.poll(() => panel.evaluate(el => el.getBoundingClientRect().height)).toBeLessThan(1);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(panel).toHaveCSS('transition-duration', '0s');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(panel).toHaveJSProperty('inert', false);
  await expect(panel.getByRole('list')).toBeVisible();
  await audit(page, info, 'education-drawer');
});


test('clipboard feedback confirms success and handles rejection', async ({ page }, info) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
      writeText: async value => {
        if (window.__rejectCopy) throw new Error('Denied');
        window.__copiedValue = value;
      }
    } });
  });
  await mockCalendar(page);
  await visit(page, '/', info);
  const trigger = page.getByRole('button', { name: /Open command menu/ });
  const dialog = page.getByRole('dialog', { name: 'Command Palette' });
  await trigger.click();
  await dialog.getByRole('combobox').fill('copy email');
  await dialog.getByRole('option', { name: 'Copy email', exact: true }).click();
  await expect(page.locator('[data-copy-feedback="success"]')).toContainText('Email address copied.');
  expect(await page.evaluate(() => window.__copiedValue)).toMatch(/@/);
  await expect(trigger).toBeFocused();
  await page.evaluate(() => { window.__rejectCopy = true; });
  await trigger.click();
  await dialog.getByRole('combobox').fill('copy link');
  await dialog.getByRole('option', { name: 'Copy link to page', exact: true }).click();
  await expect(page.locator('[data-copy-feedback="error"]')).toContainText('Could not copy.');
  await audit(page, info, 'copy-feedback');
});

test('desktop index uses a single marker aligned with the active section', async ({ page }, info) => {
  test.skip(info.project.use.viewport.width < 1280, 'Desktop-only index');
  await mockCalendar(page);
  await visit(page, '/', info);
  const nav = page.getByRole('navigation', { name: 'Portfolio sections' });
  const marker = nav.locator('.mark-nav-glider');
  await expect(marker).toHaveCount(1);
  await page.locator('#education').evaluate(el => window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 100, behavior: 'instant' }));
  await expect(nav.getByRole('link', { name: 'Education', exact: true })).toHaveAttribute('aria-current', 'location');
  await expect.poll(() => marker.evaluate(el => {
    const m = el.getBoundingClientRect();
    const link = el.parentElement.querySelector('[aria-current="location"]').getBoundingClientRect();
    return Math.abs(m.top + m.height / 2 - link.top - link.height / 2);
  })).toBeLessThan(2);
  await expect(marker).toHaveCSS('transition-duration', '0s');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(marker).toHaveCSS('transition-duration', '0.18s');
});


test('home title is concise and project archive retains its specific title', async ({ page }, info) => {
  await mockCalendar(page);
  await visit(page, '/', info);
  await expect(page).toHaveTitle('Ayan Khan');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', 'Ayan Khan');
  await expect(page.getByText('diff2test, a test-impact analyzer', { exact: false })).toBeVisible();
  await visit(page, '/projects', info);
  await expect(page).toHaveTitle('Projects | Ayan Khan');
});

test('featured engineering case studies expose decisions, evidence and honest boundaries', async ({ page }, info) => {
  for (const [slug, title, expected] of [
    ['diff2test', 'diff2test', 'The verified MVP targets Linux'],
    ['webclerk', 'webclerk', 'The demo uses fictional, pre-extracted structured evidence'],
  ]) {
    await visit(page, '/projects/' + slug, info);
    const main = page.getByRole('main');
    await expect(main.getByRole('heading', { level: 1, name: title, exact: true })).toBeVisible();
    const study = main.locator('[data-engineering-case-study]');
    for (const name of ['Design principle', 'How it works', 'Engineering decisions', 'Verification and evidence', 'Scope and limitations']) {
      await expect(study.getByRole('heading', { name, exact: true })).toBeVisible();
    }
    await expect(study.getByRole('list').first().getByRole('listitem')).toHaveCount(4);
    await expect(study).toContainText(expected);
    await expect(study.getByRole('link').first()).toHaveAttribute('href', /github\.com\/ThunderKhan\/.+\/blob\/[a-f0-9]{40}\//);
    await audit(page, info, 'engineering-case-study-' + slug);
  }
  await visit(page, '/projects/grantly', info);
  await expect(page.getByRole('heading', { name: 'Technical highlights' })).toBeVisible();
  await expect(page.locator('[data-engineering-case-study]')).toHaveCount(0);
});

for (const [slug, limitation] of [
  ['frame', 'Dataset Lab rankings are run-relative'],
  ['refute', 'not a strong OS or container sandbox'],
  ['llm-social-selection', 'does not establish a completed confirmatory study'],
  ['oasis', 'no prospective or external clinical validation'],
  ['iet-grid', 'independent faculty/admin/student acceptance remain outstanding'],
]) {
  test('engineering case study: ' + slug, async ({ page }, info) => {
    await visit(page, '/projects/' + slug, info);
    const study = page.locator('[data-engineering-case-study]');
    await expect(study.getByRole('heading', { name: 'Engineering decisions' })).toBeVisible();
    await expect(study.getByRole('heading', { name: 'Verification and evidence' })).toBeVisible();
    await expect(study).toContainText(limitation);
    await expect(study.getByRole('link').first()).toHaveAttribute('href', /github\.com\/ThunderKhan\/.+\/blob\/[a-f0-9]{40}\//);
    await audit(page, info, 'engineering-case-study-' + slug);
  });
}
