import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { portfolio } from "../portfolio.config.ts";

const exists = (file) => existsSync(new URL("../" + file, import.meta.url));

test("owner assets remain in the public tree", () => {
  for (const file of [
  "public/Ayan_Khan_Resume.pdf",
  "public/Experience-image/micro1-logo.jpg",
  "public/Experience-image/vsph.jpg",
  "public/banner/starry-night.png",
  "public/certificates/community/hacktoberfest-completionist-plus-plus.png",
  "public/certificates/community/hacktoberfest-host.png",
  "public/certificates/community/osci-2026.png",
  "public/certificates/experience/micro1-ai-interview.jpg",
  "public/certificates/hackathons/hackblox-2026-finalist.png",
  "public/certificates/hackathons/hackblox-2026.pdf",
  "public/certificates/hackathons/sih-2026.jpg",
  "public/certificates/hackathons/trustume-2026.png",
  "public/certificates/hackathons/zero-dependency-2026.png",
  "public/certificates/training/aws-prompt-engineering.pdf",
  "public/certificates/training/ibm-ai-fundamentals.pdf",
  "public/certificates/training/isro-geodata-analytics.pdf",
  "public/certificates/training/nasa-remote-sensing.pdf",
  "public/certificates/training/stanford-supervised-ml.pdf",
  "public/education-image/README.md",
  "public/education-image/ddugu.jpg",
  "public/education-image/gci-world.jpg",
  "public/education-image/ieee.jpg",
  "public/profile/avatar.jpg",
  "public/profile/ayan-monogram.svg",
  "public/profile/iron-man.jpg",
  "public/project-image/diff2test.png",
  "public/project-image/frame.png",
  "public/project-image/grantly.png",
  "public/project-image/iet-grid.png",
  "public/project-image/oasis.png",
  "public/project-image/pareto.png",
  "public/project-image/refute.png",
  "public/project-image/webclerk.png"
]) {
    assert.ok(exists(file), file);
  }
  assert.equal(portfolio.name, "Ayan Khan");
  assert.equal(portfolio.handles.github, "ThunderKhan");
});

test("retired reference assets and inactive personal sections are absent", () => {
  for (const file of [
  "public/Paras_Resume.pdf",
  "public/avatar.png",
  "public/banner-light.jpg",
  "public/banner-dark.jpg",
  "public/banner.png",
  "public/anime",
  "public/music",
  "public/highlights",
  "public/project-video",
  "public/googlede8ed406ba240dfa.html",
  "src/data/visitors-baseline.json",
  "src/data/anime.json",
  "src/data/music.json",
  "src/app/anime",
  "src/app/guestbook",
  "src/app/api/guestbook"
]) {
    // Empty directories are not tracked by Git; check files for old local folders.
    if (["public/anime","public/music","public/highlights","public/project-video","src/app/anime","src/app/guestbook","src/app/api/guestbook"].includes(file)) continue;
    assert.ok(!exists(file), file);
  }
  const contact = readFileSync(new URL("../src/app/contact/page.tsx", import.meta.url), "utf8");
  assert.ok(contact.includes("<StarryNightBanner />"));
  assert.ok(!contact.includes("banner-light.jpg") && !contact.includes("banner-dark.jpg"));
  assert.ok(exists("LICENSE"));
});

test("company logos are not duplicate image assets", () => {
  const micro1 = readFileSync(new URL("../public/Experience-image/micro1-logo.jpg", import.meta.url));
  const vsph = readFileSync(new URL("../public/Experience-image/vsph.jpg", import.meta.url));
  assert.ok(!micro1.equals(vsph));
});

test("browser icon uses the original arc reactor vector and brand colors", () => {
  const icon = readFileSync(new URL("../src/app/icon.svg", import.meta.url), "utf8");
  assert.match(icon, /viewBox="0 0 64 64"/);
  assert.ok(icon.includes("<title>Arc reactor</title>"));
  assert.ok(icon.includes("#67C7EB") && icon.includes("#F4FBFF"));
  assert.ok(icon.includes("stroke-dasharray"));
  assert.ok(!icon.includes("<text") && !icon.includes("<image") && !icon.includes("<script"));
});


test("professional identity stays consistent and avoids time-sensitive year labels", () => {
  assert.equal(portfolio.name, "Ayan Khan");
  assert.match(portfolio.tagline, /Software developer/);
  assert.match(portfolio.tagline, /Open-source contributor/);
  assert.match(portfolio.description, /BCA student/);
  assert.match(portfolio.intro, /understanding how things work/);
  assert.equal(portfolio.about.length, 3);
  assert.match(portfolio.about[0], /Deen Dayal Upadhyaya Gorakhpur University/);
  assert.match(portfolio.about[1], /diff2test/);
  assert.match(portfolio.about[1], /refute/);
  assert.match(portfolio.about[2], /VSPH/);
  assert.match(portfolio.about[2], /Runtime Conditions/);
  assert.ok(!portfolio.about.some(line => /second-year/i.test(line)));
});
