import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { engineeringCaseStudies } from "../src/data/engineeringCaseStudies.ts";

test("featured case studies contain traceable evidence, decisions and scope", () => {
  assert.deepEqual(Object.keys(engineeringCaseStudies), ["diff2test", "webclerk"]);
  for (const [slug, study] of Object.entries(engineeringCaseStudies)) {
    assert.ok(study.premise && study.verification && study.limitations, slug);
    assert.equal(study.facts.length, 3);
    assert.equal(study.flow.length, 4);
    assert.ok(study.decisions.length >= 3);
    assert.ok(study.sources.length >= 3);
    for (const source of study.sources) assert.match(source.href, /^https:\/\/github\.com\/ThunderKhan\/[^/]+\/blob\/[a-f0-9]{40}\//);
  }
  assert.match(engineeringCaseStudies.diff2test.limitations, /Linux/);
  assert.match(engineeringCaseStudies.webclerk.limitations, /fictional/);
});

test("case study data is separate from the client project grid and generic details retain highlights", () => {
  const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
  assert.ok(!read("src/data/projectsData.ts").includes("engineeringCaseStudies"));
  assert.ok(!read("src/components/ProjectsGrid.tsx").includes("engineeringCaseStudies"));
  const page = read("src/app/projects/[slug]/page.tsx");
  assert.ok(page.includes("study ? <ProjectCaseStudy study={study} /> : project.highlights?.length"));
  assert.ok(page.indexOf("{project.description}") < page.indexOf("{/* Project preview"));
});
