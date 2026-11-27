import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { createGithubService, validateCalendar, FRESH_MS, STALE_MS, RETRY_MS, MAX_RESPONSE_BYTES } from "../src/lib/stats/github-service.ts";

const calendar = { totalContributions: 3, months: [{ name: "Nov" }], weeks: [{ contributionDays: [{ date: "2026-11-27", contributionCount: 3 }] }] };
const json = value => Response.json({ data: { user: { contributionsCollection: { contributionCalendar: value } } } });
const make = (fetcher, options = {}) => createGithubService({ login: "Example", token: () => "test-token", snapshot: null, fetcher, ...options });

test("calendar validation projects public fields and rejects invalid data", () => {
  assert.deepEqual(validateCalendar({ ...calendar, hidden: "not public", months: [{ name: "Nov", extra: 1 }] }), calendar);
  for (const bad of [null, {}, { ...calendar, totalContributions: 4 }, { ...calendar, months: [] }, { ...calendar, weeks: Array(55).fill(calendar.weeks[0]) }, { ...calendar, weeks: [{ contributionDays: [{ date: "2026-02-31", contributionCount: 3 }] }] }, { ...calendar, weeks: [{ contributionDays: [{ date: "2026-11-27", contributionCount: -3 }] }] }]) {
    assert.equal(validateCalendar(bad), null);
  }
});

test("fixed query uses server config, abort deadline, no-store and no redirects", async () => {
  const service = make(async (url, init) => {
    assert.equal(url, "https://api.github.com/graphql");
    assert.equal(init.method, "POST");
    assert.equal(init.headers.Authorization, "Bearer test-token");
    assert.equal(init.cache, "no-store");
    assert.equal(init.redirect, "error");
    assert.ok(init.signal instanceof AbortSignal);
    const body = JSON.parse(init.body);
    assert.deepEqual(body.variables, { login: "Example" });
    assert.match(body.query, /query Contributions/);
    assert.doesNotMatch(body.query, /mutation/);
    return json(calendar);
  });
  assert.deepEqual(await service.get(), { status: 200, body: { calendar, stale: false } });
});

test("concurrent requests coalesce and cache expires after one hour", async () => {
  let time = 0;
  let calls = 0;
  const service = make(async () => { calls++; return json(calendar); }, { now: () => time });
  const results = await Promise.all(Array.from({ length: 30 }, () => service.get()));
  assert.equal(calls, 1);
  assert.ok(results.every(r => r.status === 200 && !r.body.stale));
  time = FRESH_MS - 1;
  await service.get();
  assert.equal(calls, 1);
  time = FRESH_MS;
  await service.get();
  assert.equal(calls, 2);
});

test("upstream failures back off, use dated stale cache and expire it", async () => {
  let time = 0;
  let calls = 0;
  const service = make(async () => {
    calls++;
    if (calls === 1) return json(calendar);
    throw new Error("sensitive upstream diagnostic");
  }, { now: () => time });
  await service.get();
  time = FRESH_MS;
  assert.deepEqual(await service.get(), { status: 200, body: { calendar, stale: true, asOf: "2026-11-27" } });
  await Promise.all(Array.from({ length: 20 }, () => service.get()));
  assert.equal(calls, 2);
  time += RETRY_MS;
  await service.get();
  assert.equal(calls, 3);
  time = STALE_MS + 1;
  assert.deepEqual(await service.get(), { status: 502, body: { error: "Failed to fetch from GitHub" } });
});

test("rate-limit response respects Retry-After and primary reset", async () => {
  let time = 0;
  let calls = 0;
  const service = make(async () => {
    calls++;
    return new Response("", { status: 403, headers: { "retry-after": "600", "x-ratelimit-remaining": "0", "x-ratelimit-reset": "900" } });
  }, { now: () => time });
  await service.get();
  time = 899999;
  await service.get();
  assert.equal(calls, 1);
  time = 900000;
  await service.get();
  assert.equal(calls, 2);
});

test("GraphQL errors, malformed and oversized responses fail safely", async () => {
  for (const response of [
    Response.json({ errors: [{ message: "private diagnostic" }], data: { user: { contributionsCollection: { contributionCalendar: calendar } } } }),
    new Response("not JSON"),
    new Response(" ".repeat(MAX_RESPONSE_BYTES + 1)),
    json({ ...calendar, totalContributions: -1 }),
  ]) {
    const service = make(async () => response);
    assert.deepEqual(await service.get(), { status: 502, body: { error: "Failed to fetch from GitHub" } });
  }
});

test("missing token never contacts GitHub and snapshot remains explicitly stale", async () => {
  const fetcher = async () => { assert.fail("unexpected fetch"); };
  const options = { token: () => undefined };
  assert.deepEqual(await make(fetcher, options).get(), { status: 503, body: { error: "GitHub is not configured" } });
  assert.deepEqual(await make(fetcher, { ...options, snapshot: calendar }).get(), { status: 200, body: { calendar, stale: true, asOf: "2026-11-27" } });
});

test("public route does not accept query or caller-controlled cache keys", () => {
  const route = readFileSync(new URL("../src/app/api/github/route.ts", import.meta.url), "utf8");
  assert.match(route, /export async function POST\(\)/);
  assert.match(route, /login: portfolio.handles.github/);
  assert.match(route, /token: \(\) => process.env.GITHUB_TOKEN/);
  assert.match(route, /"Cache-Control": "no-store"/);
  assert.doesNotMatch(route, /request\.json|request\.body|NEXT_PUBLIC_GITHUB_TOKEN/);
});

test("diagnostics contain only controlled failure categories, never upstream text", async () => {
  const cases = [
    [() => new Response("private diagnostic", { status: 401 }), "upstream-http-401"],
    [() => Response.json({ errors: [{ message: "private diagnostic" }] }), "graphql-errors"],
    [() => json({ ...calendar, totalContributions: 4 }), "total-mismatch"],
    [() => new Response("private diagnostic"), "response-body-failed"],
    [() => { throw new Error("private diagnostic"); }, "fetch-failed"],
  ];
  for (const [fetcher, reason] of cases) {
    const observed = [];
    const result = await make(async () => fetcher(), { onFailure: value => observed.push(value) }).get();
    assert.deepEqual(observed, [reason]);
    assert.deepEqual(result, { status: 502, body: { error: "Failed to fetch from GitHub" } });
  }
});

// GitHub returns week-aligned calendars, not necessarily exactly 365 entries.
function fullWeeks(length) {
  return {
    totalContributions: length * 7,
    months: [{ name: "Nov" }],
    weeks: Array.from({ length }, (_, week) => ({
      contributionDays: Array.from({ length: 7 }, (_, day) => ({
        date: new Date(Date.UTC(2025, 10, 23 + week * 7 + day)).toISOString().slice(0, 10),
        contributionCount: 1,
      })),
    })),
  };
}

test("week-aligned calendars accept 371 days and retain the existing 54-week bound", async () => {
  for (const weeks of [53, 54]) {
    const data = fullWeeks(weeks);
    assert.deepEqual(validateCalendar(data), data);
    assert.deepEqual(await make(async () => json(data)).get(), { status: 200, body: { calendar: data, stale: false } });
  }
  assert.equal(validateCalendar(fullWeeks(55)), null);
  const oversizedWeek = fullWeeks(1);
  oversizedWeek.weeks[0].contributionDays.push({ date: "2025-11-30", contributionCount: 1 });
  oversizedWeek.totalContributions++;
  assert.equal(validateCalendar(oversizedWeek), null);
});

test("calendar total overflow is rejected independently of week bounds", () => {
  const reasons = [];
  const data = {
    ...calendar,
    totalContributions: Number.MAX_SAFE_INTEGER,
    weeks: [{ contributionDays: [
      { date: "2026-11-26", contributionCount: Number.MAX_SAFE_INTEGER },
      { date: "2026-11-27", contributionCount: 1 },
    ] }],
  };
  assert.equal(validateCalendar(data, reason => reasons.push(reason)), null);
  assert.deepEqual(reasons, ["total-overflow"]);
});
