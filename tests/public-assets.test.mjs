import { test } from "node:test";
import assert from "node:assert/strict";
import { inspectAsset, requiresVisualReview } from "../scripts/lib/public-assets.mjs";

test("unexpected public files and mismatched signatures are flagged", () => {
  assert.ok(inspectAsset(".env.local", Buffer.from("example")).findings.includes("unexpected-public-file"));
  assert.ok(inspectAsset("archive.zip", Buffer.alloc(0)).findings.includes("unexpected-public-file"));
  assert.ok(inspectAsset("photo.jpg", Buffer.alloc(8)).findings.includes("invalid-jpeg-signature"));
});

test("JPEG metadata markers are reported without exposing values", () => {
  const jpeg = Buffer.from([255,216,255,225,0,4,65,66,255,218,0,2]);
  assert.deepEqual(inspectAsset("photo.jpg", jpeg), { findings: [], metadata: ["jpeg-app1-exif-or-xmp"] });
});

test("PNG metadata chunks are distinguished from ordinary chunks", () => {
  const chunk = type => Buffer.concat([Buffer.alloc(4), Buffer.from(type), Buffer.alloc(4)]);
  const png = Buffer.concat([Buffer.from("89504e470d0a1a0a", "hex"), chunk("tEXt"), chunk("IEND")]);
  assert.deepEqual(inspectAsset("photo.png", png), { findings: [], metadata: ["png-tEXt"] });
});

test("SVG checks detect active content but allow original static shapes", () => {
  assert.deepEqual(inspectAsset("logo.svg", Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>')).findings, []);
  for (const source of ['<svg onload="x()"/>', '<svg><script>x()</script></svg>', '<svg><use href="https://example.invalid/x.svg"/></svg>']) {
    assert.ok(inspectAsset("logo.svg", Buffer.from(source)).findings.includes("svg-active-or-external-content-candidate"));
  }
});

test("PDF raw marker checks do not imply full PDF or visual inspection", () => {
  const result = inspectAsset("resume.pdf", Buffer.from("%PDF-1.7 /Author (example) /JavaScript"));
  assert.deepEqual(result.metadata, ["pdf-active-content-or-form-marker", "pdf-document-metadata-marker"]);
  assert.equal(requiresVisualReview("resume.pdf"), true);
  assert.equal(requiresVisualReview("certificates/training/proof.png"), true);
  assert.equal(requiresVisualReview("project-image/demo.png"), true);
  assert.equal(requiresVisualReview("Experience-image/logo.svg"), false);
});
