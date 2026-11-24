import assert from "node:assert/strict";
import { test } from "node:test";
import { canAnimateBanner, coverArtwork, tilePulse } from "../src/lib/banner-animation.ts";

const ready = { ready: true, visible: true, inViewport: true, reducedMotion: false, paused: false };
test("animation requires every eligibility condition", () => {
  assert.equal(canAnimateBanner(ready), true);
  for (const key of Object.keys(ready)) {
    assert.equal(canAnimateBanner({ ...ready, [key]: !ready[key] }), false, key);
  }
});
test("cover mapping matches 75% horizontal and centered vertical CSS crop", () => {
  assert.deepEqual(coverArtwork(2508, 627), { scale: 1, x: 0, y: 0 });
  assert.deepEqual(coverArtwork(300, 200), { scale: 200 / 627, x: -375, y: 0 });
  assert.deepEqual(coverArtwork(1000, 100), { scale: 1000 / 2508, x: 0, y: -75 });
});
test("tile pulses are bounded and seamless over a ten-second cycle", () => {
  for (const phase of [0, 0.15, 0.5, 0.99]) {
    for (let t = 0; t <= 10; t += 0.1) {
      const value = tilePulse(t, phase);
      assert.ok(value >= 0 && value <= 0.24);
      assert.ok(Math.abs(value - tilePulse(t + 10, phase)) < 1e-10);
    }
  }
});
