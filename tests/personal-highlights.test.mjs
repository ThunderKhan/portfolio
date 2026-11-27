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
  assert.equal(featuredTrack.cover, "/music/loser-cover.jpg");
  const player = read("src/components/SpotifyCard.tsx");
  assert.ok(player.includes("onError={() => setCoverFailed(true)}"));
  assert.ok(player.includes("https://open.spotify.com/track/"));
  assert.ok(player.includes("encrypted-media"));
  assert.ok(player.includes("Alternate artwork"));
  assert.ok(player.includes("const [showPlayer, setShowPlayer] = useState(false)"));
  assert.ok(player.includes("{showPlayer ? ("));
  assert.ok(player.includes("Close player"));
  assert.ok(player.includes("Listen here"));
});


test("closing motto uses the owner-selected two-line text without a translation", () => {
  const home = read("src/app/page.tsx");
  const config = read("portfolio.config.ts");
  assert.ok(config.includes('motto: ["If I must fall,", "let it be from a great height."]'));
  assert.ok(home.includes("{portfolio.motto[0]}<br />"));
  assert.ok(home.includes("{portfolio.motto[1]}"));
  assert.ok(!home.includes("Labor omnia vincit") && !home.includes("WORK CONQUERS ALL"));
  assert.match(home, /<p className="[^"]*mark-gold-text italic"/);
});


test("closing footer replaces empty filler with real navigation outside main", () => {
  const home = read("src/app/page.tsx");
  const footer = read("src/components/PortfolioFooter.tsx");
  assert.ok(home.indexOf("</main>") < home.indexOf("<PortfolioFooter />"));
  assert.ok(!home.includes("<FooterBackground />"));
  assert.ok(home.includes("<FallingSilhouette />") && home.includes("leading-[1.3]"));
  assert.match(footer, /<footer className=.*aria-label="Portfolio footer"/);
  assert.ok(footer.includes('href={portfolio.resume}') && footer.includes('href={portfolio.repo}'));
  assert.ok(!footer.includes('href="#"'));
  assert.match(read("src/components/FallingSilhouette.tsx"), /aria-hidden="true" focusable="false"/);
});
test("ridgeline motion is bounded and respects visibility and reduced motion", () => {
  const scene = read("src/components/RidgelineScene.tsx");
  for (const marker of ["MAX_PIXELS = 80_000", "1000 / 24", "REVEAL_MS = 2800", "prefers-reduced-motion: reduce", "document.hidden", "intersection.disconnect()", "cancelAnimationFrame", "aria-hidden"]) assert.ok(scene.includes(marker), marker);
});
