import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync } from "node:fs";
import { certifications, featuredCertifications } from "../src/data/certificationsData.ts";
import { hackathonsData } from "../src/data/hackathonsData.ts";
import { openSourceWork, contributionTotals } from "../src/data/openSourceData.ts";
import { experiences } from "../src/data/experienceData.ts";

test("credentials preserve classification and featured selection", () => {
  assert.equal(certifications.length, 5);
  assert.equal(featuredCertifications.length, 3);
  assert.equal(certifications.find(c => c.id === "isro-geodata-analytics").kind, "Course participation");
  assert.equal(contributionTotals.pullRequests, 16);
  assert.equal(hackathonsData.find(h => h.id === "zero-dependency-2026").placement, "Top 10%");
});

test("linked local evidence exists", () => {
  const files = [
    ...certifications.flatMap(c => c.file ? [c.file] : []),
    ...hackathonsData.flatMap(h => (h.links ?? []).map(l => l.href)),
    ...openSourceWork.flatMap(o => (o.evidence ?? []).map(l => l.href)),
    ...experiences.flatMap(e => (e.links ?? []).map(l => l.href)),
    "/certificates/hackathons/trustume-2026.png",
  ].filter(path => path.startsWith("/certificates/"));
  for (const file of files) assert.ok(existsSync(new URL("../public" + file, import.meta.url)), file);
});
