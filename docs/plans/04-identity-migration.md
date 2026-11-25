# Personal identity migration — profile slice

Base ee4f2ce. Owner accepted the banner and requested the next implementation step.

Source: ThunderKhan/ThunderKhan.github.io at a7b674d6fb028ed2d9de173f7a4f9dc32e2bbc14, src/data/portfolio.ts, src/config/site.json and public/Ayan_Khan_Resume.pdf. The header copy condenses the published introduction/about; do not add recent unverified achievements. Resume copied byte-for-byte (Git blob 23212d45fd87c75b6cb172714c7ad780efb12da5); owner should confirm it is still current.

- [x] Config identity, intro, location, public email and GitHub/LinkedIn/LeetCode handles updated from source.
- [x] Replace inherited header avatar with a temporary AK monogram. Preserve the underlying banner and its motion.
- [x] Guard unconfirmed X, Codeforces, CodeChef and booking links; clear inherited giscus identifiers. Guestbook and inherited FormSubmit service remain unconfigured (direct email available).
- [x] Update social cards and Open Graph identity. Never attribute a mismatched LeetCode snapshot to the owner. Detailed DSA cards temporarily replaced by the last published 220+ count until their migration.
- [x] Mark the homepage's remaining sections as inherited development references and set root noindex/nofollow while migrating. Noindex is not access control; no public deployment.
- [ ] Migrate experience, projects, hackathons, verified statistics, skills, education, writing, interests, highlights, footer, favicon and reference assets in subsequent slices. Retain their source for reference now. Audit direct routes and all snapshots before release. Update contact form and guestbook only with approved configuration.
- [ ] Owner approves final profile photo, current resume, copy and optional handles. Run npm test, npm run typecheck, npm run lint, npm run build; verify header at 320/360/768/1440px both themes, social hover cards, résumé bytes, email, command palette and social preview.
- [ ] Repeat Docker/browser checks before release, remove preview notice and noindex only after all identity content is verified and release approved.

Full application dependencies and installed Next docs are not available in the connector execution environment. No application tests have been executed in this slice. Static diff and remote tree verification only. Original MIT license, historical data and banner artwork retained. No new dependencies.

## Profile photograph — owner selection

Owner supplied and committed public/profile/avatar.jpg at ec85d78. Local attachment bytes match the committed Git blob 86ecfeb6b0e28e22529720ab55108f5ba5e36a4e (400 × 400 JPEG, 27,460 bytes). Config now uses this photograph for the homepage and both social-card paths. Keep natural colors and square crop; use a thin approved metallic-gold border with arc-blue hover accent on the homepage. Open Graph embeds the same photograph with monogram fallback. The avatar is decorative beside the owner's visible name. Adjust responsive image sizes to the actual 64/80 CSS px box and remove competing priority hints from the small portrait; banner remains unchanged. Retain the temporary monogram and inherited assets for reference until cleanup.

Source inspection and remote tree verification only; full app tests, responsive rendering, optimized image delivery and Open Graph generation remain to be checked locally. Favicon design, experience migration, and broader typography/theme work are separate pending slices. No new dependencies or deployment.

## Decorative homepage avatar — owner preference

Following comparison of the reference and MARK I header, the owner selected a character avatar for the homepage and retained the actual photograph for professional social cards and Open Graph. Owner committed public/profile/iron-man.jpg at a254487 (Git blob 169341bf4914a94da590af9fdb756ad26e1624f6, JPEG). Split portfolio.heroAvatar from portfolio.avatar; only the homepage uses the character image. Preserve existing square crop, colors as supplied, frame, header and banner animation. No image editing or removal of attribution. Source and reuse permissions for the character artwork remain unverified; replace with rights-cleared artwork or the personal photograph before deployment if not resolved. Repository is still a development reference preview. Static source and remote tree verification only; browser rendering, lint, typecheck and build not run on this slice. No dependencies or deployment changes.

## Experience migration — first verified professional entries

Owner requested continuation after the homepage avatar change. Replaced inherited experience data with micro1 (AI Trainer, independent contractor, Oct 2026–present) and VSPH Global (Software Engineering Intern, Frontend, Sep 2026–present), based on previously confirmed roles and resume wording. Only onboarding and general responsibilities are stated for micro1; no project-specific details or outcomes. VSPH bullets use confirmed responsive frontend work and GitHub collaboration. FlyRank AI is an educational program, not included as employment; community participation will be reviewed separately. Temporary local initials tiles are not official logos. The archive timeline consumes the same data as both lists and represents month-level dates as of November 2026; refresh the snapshot with subsequent verified career updates. The previous avatar frame was removed and grayscale applied only to the homepage avatar in 3cfc881.

Static source checks and remote tree verification only; full lint, typecheck, tests, build and browser QA remain pending. No production deployment; retain inherited preview notice/noindex and assets for later migration.

## Experience content and logo refinement

Owner supplied LinkedIn experience screenshots on 2026-11-25. Use their exact role titles, dates and achievement wording, including micro1’s two concurrent assignments and VSPH’s four bullets. The owner will provide full-color logos at `public/Experience-image/micro1.jpg` and `public/Experience-image/vsph.jpg`; existing monograms serve as loading-error fallbacks. No grayscale on organization imagery. Both experience lists share the same description renderer; the archive timeline remains company-level. Unlisted LinkedIn skills are not inferred. Static source verification only; browser and build checks pending.

## Projects — content migration

Migrated six projects from the owner's existing public portfolio (`ThunderKhan/ThunderKhan.github.io`, `src/data/portfolio.ts`): diff2test, webclerk, FRAME, O.A.S.I.S., LLM Social Selection and HeatOps. The homepage shows the first four, with diff2test and webclerk pinned; the archive contains all six. Detail pages now include source-backed problem statements, technical highlights, and the published case study where available. Distinguish completed CLI work, research and prototypes from live web deployments. The published demo link was carried over, not independently tested. Original screenshots are not supplied; use `/project-image/<slug>.png` and a clearly labeled missing-image fallback. No inherited screenshots, ambient backgrounds, or videos are linked from these entries. No new dependencies or deployment. Static checks and remote source verification only; local build, lint, typecheck, tests and both-theme responsive browser review remain pending. Newer projects can be considered in a subsequent content review.

## Projects — expanded archive

Owner requested Pareto and other projects on the full project page. Added nine public, documented projects using their repository READMEs: Pareto, refute, IET Grid, GRANTLY, Axiom, Feynman-in-a-Loop, VĀṆI / MeshVoice, Prometheus Compiler and Tab Jumper. The existing first four remain featured on the homepage; all fifteen entries appear in the archive. Status labels distinguish completed tools, prototypes and ongoing development. Team/hackathon attribution and material limitations are preserved. Demo links come from repository documentation, not fresh deployment checks. Screenshot paths use `/project-image/<slug>.png` with the existing explicit pending fallback. Empty or documentation-only repos, private/client repositories, forks and coursework were not added. HeatOps was previously sourced from the owner's portfolio; the current GitHub repo lookup returns 404, so its existing link requires owner review. No new dependencies, deployment, or UI changes. Runtime build and browser verification remain pending.

## Hackathons — competitive results migration

Replaced the inherited Databricks and SIH 2025 entries with three owner-documented outcomes: Build With AI: DevOps Season 1 (IET Grid, second runner-up/third place, team std::zero), HACKBLOX 2026 (final-round qualification and merged Corsair Ably contribution), and SIH 2026 internal screening (Syntax6 nominated, top 60%, not a national finalist). Sources: owner’s previous result and selection records, IET Grid repository README, and published O.A.S.I.S. project narrative. No invented participant totals or award rankings. Keep participation-only projects in the Projects archive. Existing accordion component/layout retained; Highlights is a separate pending migration. Supporting award images and upstream PR permalink remain for owner review; no additional asset requirements for these text cards. Remote source verification only; local build and browser checks pending. No deployment.

## Original information architecture and remaining content migration

Owner requested originality rather than copying every reference section or sequence. Homepage now prioritizes selected projects, experience, source-linked open-source work/community, hackathons, technical writing, skills, education and engineering activity. Homepage navigation and command palette use a shared ordered section list. Anime/music and unconfigured guestbook are not exposed; direct routes are guarded. Milestones are an archive of owner achievements without borrowed imagery. The writing entry links to the owner's published DEV cross-post rather than a future self-referencing URL; reactions are hidden when unknown. Education uses the published SGPA, not CGPA. Skills are scoped to documented project experience. Cleared inherited account snapshots and switched the refresh script to configured owner handles. GitHub contribution graph still requires GITHUB_TOKEN or an owner-matched snapshot; LeetCode displays a source-backed fallback if live data is unavailable. Retain noindex/reference preview pending release checks. No deployment. This slice changes layout order, not the existing visual system. Favicon, original proof assets, inactive inherited asset cleanup, complete local/runtime checks and final release approval remain pending.

Follow-up: corrected shortcut collision (open source uses Shift+W; system theme retains Shift+U), aligned the milestones archive back link and labels, and used the existing owner-specific AK monogram as SVG favicon instead of the reference PNG icons. No separate Apple touch icon is installed yet. The stats refresh npm command explicitly enables Node type stripping. Source checks only.

## Open source — expanded contribution record

Verified all 14 owner-supplied upstream PRs and the two existing CLI11/Manim links using GitHub PR metadata on 2026-11-25. The curated section now links 16 PRs across seven repositories (13 merged, two open, one closed without merge), plus OSCI community selection. Descriptions summarize the actual PR scope; status is a dated snapshot rather than a live count. Prioritize Corsair, Proofline and ha.mr for technical depth, and retain the earlier verified work. HACKBLOX links directly to the merged Ably PR. No upstream repository changes. Local lint, typecheck, tests, build and responsive rendering remain unverified.

## Open source — featured accordion and archive

Owner requested Experience-style collapsible entries, a compact homepage selection and a separate full OSS Contributions page. Featured Corsair, Runtime Conditions and ha.mr (three entries with substantial merged work); retained all eight groups including community selection and all 16 existing PR links in `/open-source`. Shared one accessible accordion with initially closed rows, single-open behavior, inert closed content, reduced-motion-aware transitions and explicit PR status labels. Archive uses existing blueprint shell, derived totals, command palette entry and sitemap route. No external logos or new dependencies. Added data invariant tests. Runtime/browser validation is pending; no release or deployment.

## Technical writing — first-party blog

Owner requested self-hosted articles and a dedicated archive. Migrated the complete original diff2test body from `ThunderKhan/ThunderKhan.github.io/src/data/blogs.ts` (blob d05dea15785bb73b2df4b65d40d7d0ec64145bd3) without rewriting the article. Preserve original date, tags, reading time, code, quotations and cross-post links. Homepage shows up to three latest posts, `/blogs` lists all, `/blogs/[slug]` renders the article; old singular blog paths redirect to the canonical plural path. Project case study, command palette and sitemap use internal routes. Removed the local-only like counter from the article rather than implying shared engagement. No CMS, new dependencies or deployment. Regression tests added; local execution, Next.js installed documentation and browser/build validation remain pending.

## Technical writing — permanent numbered URLs

Owner requested short engineering-log-style article URLs. First article has permanent ID `001` and canonical path `/blogs/001`. Assign subsequent IDs explicitly (002, 003, etc.); never derive an ID from sorting, renumber old posts or reuse retired IDs. All three previously used descriptive article paths redirect directly to `/blogs/001`. Project case-study link updated; homepage, archive, metadata, static params and sitemap already derive their routes from the article data. Article body unchanged. Added numbered-ID regression assertions. Local test and runtime verification pending.

## Education and certifications separation

Owner supplied two university grade sheets for academic year 2025–2026. Education now shows official cumulative CGPA 8.82 and separate semester SGPAs 9.08 and 8.56, both passed; result dates and exact course titles are stored per semester. The prior degree duration is retained as expected graduation. Native expandable semester coursework keeps the card compact. Certifications have independent data, section and navigation; existing two credentials are unchanged pending owner review. No grade sheet PDFs, individual marks, family details or student identifiers are committed. No new dependencies or deployment. Local verification pending.

## Credential evidence integration

Verified 14 curated assets in the owner's push. Added five training credentials, three featured on the homepage, full `/certifications` archive, issuer verification links for Coursera and IBM, and evidence links on Zero Dependency (29/295, 4.293/5, top 10%), HACKBLOX participation, SIH participation, Pareto, OSCI, Hacktoberfest Completionist++/host, and micro1 interview recognition. Community evidence is separate from PR counts. ISRO PDF matches the unredacted original and HACKBLOX finale ticket still contains a QR code; do not link these two until privacy-safe replacements are verified. Their existing public files need owner replacement; hiding a link does not remove the files or Git history. No new dependencies or deployment. Browser and full local checks pending.
