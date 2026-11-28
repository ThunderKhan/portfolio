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

test("redacted credentials are linked", () => {
  assert.equal(certifications.find(c => c.id === "isro-geodata-analytics").file, "/certificates/training/isro-geodata-analytics.pdf");
  assert.ok(hackathonsData.find(h => h.id === "hackblox-2026").links.some(l => l.href === "/certificates/hackathons/hackblox-2026-finalist.png"));
});


test("cross-section achievement scope and evidence links remain consistent", () => {
  const iet = hackathonsData.find(h => h.id === "build-with-ai-devops-2026");
  assert.equal(iet.placement, "Second Runner-Up");
  assert.equal(iet.metrics.find(m => m.label === "Placement").value, "3rd");
  assert.equal(hackathonsData.find(h => h.id === "sih-2026-internal").placement, "Internal nomination");
  assert.equal(certifications.find(c => c.id === "stanford-supervised-ml").kind, "Course completion");
  assert.match(certifications.find(c => c.id === "stanford-supervised-ml").note, /Course 1/);
});
