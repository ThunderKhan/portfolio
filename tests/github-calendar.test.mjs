import assert from "node:assert/strict";
import { test } from "node:test";
import { snapshotCalendar } from "../src/lib/stats/github-calendar.ts";

const snapshot = { login: "Example", calendar: [
  { date: "2026-10-31", count: 2 },
  { date: "2026-11-01", count: 5 },
  { date: "2026-11-02", count: 0 },
] };

test("groups historical days into Sunday-based weeks and totals only displayed days", () => {
  assert.deepEqual(snapshotCalendar(snapshot, "example"), {
    totalContributions: 7,
    months: [{ name: "Oct" }, { name: "Nov" }],
    weeks: [
      { contributionDays: [{ date: "2026-10-31", contributionCount: 2 }] },
      { contributionDays: [{ date: "2026-11-01", contributionCount: 5 }, { date: "2026-11-02", contributionCount: 0 }] },
    ],
  });
});

test("does not reuse another account's data", () => {
  assert.equal(snapshotCalendar(snapshot, "different"), null);
});

test("rejects missing, invalid or empty data", () => {
  assert.equal(snapshotCalendar(snapshot, ""), null);
  assert.equal(snapshotCalendar({ ...snapshot, calendar: [] }, "Example"), null);
  assert.equal(snapshotCalendar({ ...snapshot, calendar: [{ date: "2026-02-31", count: 1 }] }, "Example"), null);
  assert.equal(snapshotCalendar({ ...snapshot, calendar: [{ date: "2026-11-01", count: -1 }] }, "Example"), null);
});
