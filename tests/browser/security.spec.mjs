import { test, expect } from "@playwright/test";

const routes = ["/", "/projects", "/projects/diff2test", "/experience", "/open-source", "/blogs", "/blogs/001", "/certifications", "/highlights", "/contact"];
const probe = "https://csp-probe.invalid/image.svg";

test("security response headers on pages, assets and missing routes", async ({ request }) => {
  for (const path of [...routes, "/robots.txt", "/sitemap.xml", "/icon.svg", "/opengraph-image", "/Ayan_Khan_Resume.pdf", "/missing-security-test"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(path === "/missing-security-test" ? 404 : 200);
    const h = response.headers();
    expect(h["x-content-type-options"], path).toBe("nosniff");
    expect(h["x-frame-options"], path).toBe("DENY");
    expect(h["referrer-policy"], path).toBe("strict-origin-when-cross-origin");
    expect(h["permissions-policy"], path).toBe("camera=(), microphone=(), geolocation=(), payment=()");
    expect(h["content-security-policy"], path).toContain("frame-ancestors 'none'");
    expect(h["content-security-policy"], path).toContain("object-src 'none'");
    expect(h["content-security-policy"], path).toContain("base-uri 'none'");
    expect(h["content-security-policy"], path).toContain("form-action 'self'");
    expect(h["content-security-policy-report-only"], path).toContain("script-src 'self' 'unsafe-inline'");
    expect(h["content-security-policy-report-only"], path).toContain("frame-src https://open.spotify.com");
    expect(h["content-security-policy-report-only"], path).not.toContain("unsafe-eval");
    expect(h["x-powered-by"], path).toBeUndefined();
    await response.dispose();
  }
});

test("candidate CSP observes page loads and interactive states without violations", async ({ page }, info) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.addInitScript(() => {
    window.__cspAudit = [];
    document.addEventListener("securitypolicyviolation", event => {
      window.__cspAudit.push({
        directive: event.effectiveDirective,
        blocked: event.blockedURI,
        disposition: event.disposition,
      });
    });
  });
  // Stub optional integrations and prohibit actual external browser requests.
  await page.route("**/*", route => {
    const url = new URL(route.request().url());
    if (url.origin === "http://127.0.0.1:4173") {
      if (url.pathname === "/api/github") return route.fulfill({ status: 503, json: { error: "Security audit fixture" } });
      return route.continue();
    }
    if (url.origin === "https://open.spotify.com" && url.pathname.startsWith("/embed/")) {
      return route.fulfill({ contentType: "text/html", body: "<!doctype html><html><body>Player fixture</body></html>" });
    }
    if (url.href === probe) {
      return route.fulfill({ contentType: "image/svg+xml", body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>' });
    }
    return route.abort();
  });

  const violations = () => page.evaluate(() => window.__cspAudit);
  for (const path of routes) {
    const response = await page.goto(path);
    expect(response?.ok(), path).toBe(true);
    await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    expect(await violations(), path).toEqual([]);
  }

  await page.goto("/");
  const theme = page.getByRole("button", { name: "Toggle theme" });
  await expect(theme).toBeVisible();
  await theme.click();
  const expectedTheme = info.project.use.colorScheme === "dark" ? "light" : "dark";
  await expect(page.locator("html")).toHaveClass(new RegExp("(?:^| )" + expectedTheme + "(?: |$)"));
  await page.getByRole("button", { name: /Open command menu/ }).click();
  await expect(page.getByRole("dialog", { name: "Command Palette" })).toBeVisible();
  await page.keyboard.press("Escape");
  const disclosure = page.locator('button[aria-controls^="home-experience-panel-"][aria-expanded="false"]').first();
  await disclosure.click();
  await expect(disclosure).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("button", { name: "Listen here" }).click();
  const frame = page.locator("#featured-music-player iframe");
  await expect(frame.contentFrame().getByText("Player fixture")).toBeVisible();
  await page.getByRole("button", { name: "Close player" }).click();
  await expect(frame).toHaveCount(0);
  expect(await violations(), "normal interactions").toEqual([]);
  expect(errors, "page errors").toEqual([]);

  // Positive control: a disallowed external image triggers a report-only
  // event but still loads from the local fixture. No external traffic.
  const loaded = await page.evaluate(src => new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = src;
    document.body.append(image);
  }), probe);
  expect(loaded).toBe(true);
  await expect.poll(async () => (await violations()).some(v => v.directive === "img-src" && v.disposition === "report" && v.blocked.startsWith("https://csp-probe.invalid"))).toBe(true);

  // Verify that base-uri is enforced, not just present in the header.
  const originalBase = await page.evaluate(() => document.baseURI);
  const currentBase = await page.evaluate(() => {
    const base = document.createElement("base");
    base.href = "https://csp-probe.invalid/";
    document.head.prepend(base);
    const result = document.baseURI;
    base.remove();
    return result;
  });
  expect(currentBase).toBe(originalBase);
  await expect.poll(async () => (await violations()).some(v => v.directive === "base-uri" && v.disposition === "enforce")).toBe(true);
  await info.attach("csp-positive-controls.json", { body: JSON.stringify(await violations(), null, 2), contentType: "application/json" });
});
