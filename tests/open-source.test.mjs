import assert from "node:assert/strict";
import { test } from "node:test";
import { openSourceWork, featuredOpenSourceWork, contributionTotals, contributionVerifiedDate } from "../src/data/openSourceData.ts";

test("homepage shows the three selected repositories in priority order", () => {
  assert.deepEqual(featuredOpenSourceWork.map((item) => item.id), ["corsair", "runtime-conditions", "hamr"]);
  assert.ok(featuredOpenSourceWork.every((item) => openSourceWork.includes(item)));
});

test("archive has unique repository IDs and pull request links", () => {
  assert.equal(new Set(openSourceWork.map((item) => item.id)).size, openSourceWork.length);
  const links = openSourceWork.flatMap((item) => item.links);
  assert.equal(new Set(links.map((link) => link.href)).size, links.length);
  assert.equal(contributionTotals.pullRequests, links.length);
  assert.equal(contributionTotals.merged, links.filter((link) => link.status === "Merged").length);
  assert.equal(contributionTotals.repositories, openSourceWork.filter((item) => item.links.length > 0).length);
  assert.ok(links.every((link) => ["Merged", "Open", "Closed"].includes(link.status)));
  assert.ok(openSourceWork.some((item) => item.id === "osci"));
});


test("both Runtime Conditions profiler contributions are merged", () => {
  const entry = openSourceWork.find(item => item.id === "runtime-conditions");
  assert.equal(entry.links.length, 2);
  assert.ok(entry.links.every(link => link.status === "Merged"));
});


test("curated contributions retain individual evidence context and distinguish unmerged work", () => {
  assert.equal(contributionVerifiedDate, "28 Nov 2026");
  const links = openSourceWork.flatMap(item => item.links);
  assert.equal(links.length, 16);
  assert.equal(contributionTotals.merged, 14);
  assert.ok(links.every(link => link.detail?.length > 0));
  assert.equal(links.find(link => link.href.endsWith("/cli/pull/89")).status, "Open");
  assert.equal(links.find(link => link.href.endsWith("/CLI11/pull/1439")).status, "Closed");
});
