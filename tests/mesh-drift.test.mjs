import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { meshResolution, canAnimateMesh, MESH_MAX_PIXELS, MESH_PALETTE } from "../src/lib/mesh-drift-settings.ts";
import { MESH_FRAGMENT } from "../src/lib/mesh-drift-shader.ts";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("mesh drift uses the approved black red gold palette", () => {
  assert.deepEqual(MESH_PALETTE, ["#000000", "#6A0C0B", "#AA0505", "#B97D10"]);
  assert.ok(MESH_FRAGMENT.includes("made with the 21st.dev Shader Builder"));
  assert.ok(MESH_FRAGMENT.includes("grainHash"));
  assert.ok(MESH_FRAGMENT.includes("fieldCoord.x -= u_scene.x - 2.0 * u_gutter"));
});
test("mesh resolution is desktop-only and bounded", () => {
  assert.equal(meshResolution(390, 844, 3), null);
  assert.equal(meshResolution(1280, 0, 1), null);
  for (const [w, h, dpr] of [[1280, 720, 1], [1920, 1080, 2], [3840, 2160, 3]]) {
    const size = meshResolution(w, h, dpr);
    assert.ok(size.width * size.height <= MESH_MAX_PIXELS);
    assert.ok(size.width <= w * 2 && size.height <= h * 2);
    assert.equal(size.gutterFraction, (w - 800) / (2 * w));
  }
});
test("mesh animation requires every eligibility condition", () => {
  const state = { dark: true, wide: true, visible: true, reduced: false, paused: false };
  assert.equal(canAnimateMesh(state), true);
  for (const key of Object.keys(state)) assert.equal(canAnimateMesh({ ...state, [key]: !state[key] }), false, key);
});
test("mesh is homepage-only and has a static fallback and pause control", () => {
  const component = read("src/components/MeshDriftBackground.tsx");
  const css = read("src/app/globals.css");
  assert.ok(read("src/app/page.tsx").includes("<MeshDriftBackground />"));
  assert.ok(!read("src/app/layout.tsx").includes("MeshDriftBackground"));
  for (const token of ["visibilitychange", "webglcontextlost", "webglcontextrestored", "cancelAnimationFrame", "renderer?.dispose()", "Pause background"]) assert.ok(component.includes(token), token);
  assert.ok(css.includes("transparent calc(100% - var(--mark-gutter))"));
  assert.ok(css.includes("--mark-page: #000000"));
});
