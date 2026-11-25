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
  const trigger = page.getByRole('button', { name: 'Open command menu' });
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
  const summary = page.locator('summary').filter({ hasText: 'Daily activity' });
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
  await expect(page.locator('summary').filter({ hasText: 'Daily activity' })).toHaveCount(0);
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
