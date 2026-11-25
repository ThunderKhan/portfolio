import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { meshResolution, canAnimateMesh, meshDelta, MESH_MAX_PIXELS, MESH_PALETTE, MESH_SPEED } from "../src/lib/mesh-drift-settings.ts";
import { MESH_FRAGMENT } from "../src/lib/mesh-drift-shader.ts";
const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");

test("mesh drift uses the approved black red gold palette", () => {
  assert.deepEqual(MESH_PALETTE, ["#000000", "#6A0C0B", "#861F0D", "#B97D10"]);
  assert.ok(MESH_FRAGMENT.includes("made with the 21st.dev Shader Builder"));
  assert.ok(MESH_FRAGMENT.includes("grainHash"));
  assert.ok(!MESH_FRAGMENT.includes("u_gutter"));
  assert.ok(MESH_FRAGMENT.includes("vec2 uv = gl_FragCoord.xy / u_resolution.xy"));
});
test("mesh resolution is desktop-only and bounded", () => {
  assert.equal(meshResolution(390, 844, 3), null);
  assert.equal(meshResolution(1280, 0, 1), null);
  for (const [w, h, dpr] of [[1280, 720, 1], [1920, 1080, 2], [3840, 2160, 3]]) {
    const size = meshResolution(w, h, dpr);
    assert.ok(size.width * size.height <= MESH_MAX_PIXELS);
    assert.ok(size.width <= w * 2 && size.height <= h * 2);
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
  assert.ok(css.includes("transparent calc(var(--mark-gutter) + 96px)"));
  assert.ok(css.includes("transparent calc(100% - var(--mark-gutter) - 96px)"));
  assert.ok(css.includes("--mark-page: #000000"));
});

test("mesh timing advances independently of the draw throttle and excludes stopped time", () => {
  assert.equal(MESH_SPEED, 0.84);
  assert.equal(meshDelta(null, 1000), 0);
  assert.equal(meshDelta(1000, 1016), 0.016);
  assert.equal(meshDelta(1000, 9000), 0.1);
  assert.equal(meshDelta(1000, 999), 0);
  let elapsed = 0;
  for (let i = 1; i <= 60; i++) elapsed += meshDelta((i - 1) * 1000 / 60, i * 1000 / 60);
  assert.ok(Math.abs(elapsed - 1) < 1e-9);
  assert.ok(read("src/lib/mesh-drift.ts").includes("preserveDrawingBuffer: true"));
});
