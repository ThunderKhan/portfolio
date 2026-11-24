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
