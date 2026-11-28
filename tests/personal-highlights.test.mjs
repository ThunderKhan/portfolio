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
  assert.ok(footer.includes("<FallingSilhouette />") && home.includes("leading-[1.3]"));
  assert.match(footer, /<footer className=.*aria-label="Portfolio footer"/);
  assert.ok(footer.includes('href={portfolio.resume}') && footer.includes('href={portfolio.repo}'));
  assert.ok(!footer.includes('href="#"'));
  const art = read("src/components/FallingSilhouette.tsx");
  assert.match(art, /alt=""\s+aria-hidden="true"/);
  assert.ok(art.includes('src="/art/falling-armor.webp"') && art.includes('loading="lazy"'));
});
test("ridgeline motion is bounded and respects visibility and reduced motion", () => {
  const scene = read("src/components/RidgelineScene.tsx");
  for (const marker of ["MAX_PIXELS = 80_000", "1000 / 24", "REVEAL_MS = 2800", "prefers-reduced-motion: reduce", "document.hidden", "intersection.disconnect()", "cancelAnimationFrame", "aria-hidden"]) assert.ok(scene.includes(marker), marker);
});


test("footer social icons reuse supported GitHub and inline SVG markup", () => {
  const footer = read("src/components/PortfolioFooter.tsx");
  assert.ok(footer.includes('import { SiGithub } from "react-icons/si"'));
  assert.doesNotMatch(footer, /SiLinkedin|from "lucide-react"/);
  assert.match(footer, /aria-label="LinkedIn profile"><svg aria-hidden="true"/);
  assert.match(footer, /aria-label="Email"><svg aria-hidden="true"/);
});


test("terrain uses the supplied Northwall reference seed, noise and eight-by-eight dithering", async () => {
  const { RIDGE_SEED, RIDGE_LAYERS, RIDGE_BAYER, ridgeProfile, ridgeDither, ridgeNoise } = await import("../src/lib/ridgeline.ts");
  assert.equal(RIDGE_SEED, 23);
  assert.equal(RIDGE_LAYERS, 7);
  assert.equal(new Set(RIDGE_BAYER).size, 64);
  assert.equal(ridgeNoise(2.3, 4.5, 23), ridgeNoise(2.3, 4.5, 23));
  for (let i = 0; i < RIDGE_LAYERS; i++) {
    const profile = ridgeProfile(400, 150, i, RIDGE_LAYERS, RIDGE_SEED, 22);
    assert.equal(profile.length, 444);
    assert.ok(profile.every(Number.isFinite));
    assert.deepEqual(profile, ridgeProfile(400, 150, i, RIDGE_LAYERS, RIDGE_SEED, 22));
    assert.notDeepEqual(profile, ridgeProfile(400, 150, i, RIDGE_LAYERS, 24, 22));
  }
  assert.equal(ridgeDither(-1, 7, .9), 0);
  assert.equal(ridgeDither(2, 7, .9), 6);
  const scene = read("src/components/RidgelineScene.tsx");
  assert.ok(scene.includes("ridgeProfile(") && scene.includes("ridgeFbm("));
  assert.ok(scene.includes("RIDGE_BAYER[(y & 7) * 8 + (x & 7)]"));
});


test("falling art belongs to the footer background and uses bounded scroll transforms", () => {
  const home = read("src/app/page.tsx");
  const footer = read("src/components/PortfolioFooter.tsx");
  const art = read("src/components/FallingSilhouette.tsx");
  assert.ok(!home.includes("<FallingSilhouette />"));
  assert.ok(footer.indexOf("<FallingSilhouette />") < footer.indexOf("styles.footerGrid"));
  for (const marker of ["prefers-reduced-motion: reduce", "requestAnimationFrame", "cancelAnimationFrame", "observer.disconnect()", "document.hidden", "image.style.transform", "terrain.offsetHeight * .42"]) assert.ok(art.includes(marker), marker);
  assert.ok(!art.includes("useState"));
});


test("falling armor is composited between terrain and footer foreground", () => {
  const css = read("src/components/closing.module.css");
  assert.match(css, /\.figure\s*\{[^}]*z-index: 1;/);
  assert.match(css, /\.scene\s*\{[^}]*z-index: 0;/);
  assert.match(css, /\.footerGrid\s*\{[^}]*z-index: 2;/);
  assert.match(css, /\.figure\s*\{[^}]*mask-image: [^;]*#000 100%/);
});


test("footer text has no opaque backing and armor destination is terrain-relative", () => {
  const css = read("src/components/closing.module.css");
  const art = read("src/components/FallingSilhouette.tsx");
  assert.match(css, /\.footerGrid, \.credit\s*\{[^}]*text-shadow:/);
  assert.doesNotMatch(css, /background-color: var\(--mark-page\)/);
  assert.ok(art.includes("destination - image.offsetTop - image.offsetHeight"));
  assert.ok(art.includes("vh - footerHeight"));
  assert.ok(art.includes("if (reduced.matches) paint(1)"));
});
