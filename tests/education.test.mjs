import assert from "node:assert/strict";
import { test } from "node:test";
import { education, learningPrograms } from "../src/data/educationData.ts";
import { certifications } from "../src/data/certificationsData.ts";

test("academic summary matches the two published university results", () => {
  assert.equal(education.cgpa, 8.82);
  assert.deepEqual(education.semesters.map(({ semester, sgpa, declaredOn, result }) => ({ semester, sgpa, declaredOn, result })), [
    { semester: 1, sgpa: 9.08, declaredOn: "2026-03-31", result: "Passed" },
    { semester: 2, sgpa: 8.56, declaredOn: "2026-10-15", result: "Passed" },
  ]);
  assert.ok(education.semesters.every((semester) => semester.coursework.length === 7));
});

test("certification data remains independent of academic records", () => {
  assert.ok(certifications.length >= 2);
  assert.ok(!("certifications" in education));
});

test("additional learning programs are separate from degree grades and completed credentials", () => {
  assert.deepEqual(learningPrograms.map(p => p.id), ["gci-world-2026", "ieee-ai-caravan-2026"]);
  assert.ok(learningPrograms.every(p => p.status === "In progress" && p.topics.length > 0 && p.url.startsWith("https://")));
  assert.equal(education.cgpa, 8.82);
});

test("education logo paths are stable and distinct", () => {
  assert.equal(education.logo, "/education-image/ddugu.jpg");
  assert.deepEqual(learningPrograms.map(p => p.logo), ["/education-image/gci-world.jpg", "/education-image/ieee.jpg"]);
});
