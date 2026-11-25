import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { eventHighlights, highlightsData } from "../src/data/highlightsData.ts";
import { featuredTrack } from "../src/data/featuredTrack.ts";
const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");

test("event galleries are distinct from existing milestones", () => {
  assert.deepEqual(eventHighlights.map(e => e.id), ["hacktoberfest-2026", "shipathon-irl", "sih-2026"]);
  assert.equal(new Set(eventHighlights.map(e => e.id)).size, eventHighlights.length);
  assert.ok(eventHighlights.every(e => Array.isArray(e.photos)));
  assert.equal(highlightsData.length, 5);
});
test("music uses a single user-selected track and native playback controls", () => {
  assert.equal(featuredTrack.spotifyId, "7bxaFZ1O3cHkgLKMsdC3xR");
  assert.equal(featuredTrack.title, "Loser");
  assert.equal(featuredTrack.artist, "Tame Impala");
  const player = read("src/components/SpotifyCard.tsx");
  assert.ok(player.includes("https://open.spotify.com/embed/track/"));
  assert.ok(player.includes('loading="lazy"'));
  assert.ok(!/autoplay|repeat|\.play\(/i.test(player));
  const home = read("src/app/page.tsx");
  assert.ok(home.indexOf('<section id="highlights"') < home.indexOf('<section id="music"'));
  assert.ok(home.includes("<EventHighlights />") && home.includes("<SpotifyCard />"));
});

test("custom cover has a graceful missing-image fallback and full-track link", () => {
  assert.equal(featuredTrack.cover, "/music/loser-cover.png");
  const player = read("src/components/SpotifyCard.tsx");
  assert.ok(player.includes("onError={() => setCoverFailed(true)}"));
  assert.ok(player.includes("https://open.spotify.com/track/"));
  assert.ok(player.includes("encrypted-media"));
  assert.ok(player.includes("Alternate artwork"));
});
