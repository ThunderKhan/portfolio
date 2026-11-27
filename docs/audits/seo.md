# SEO audit and implementation — MARK I

Source baseline 83f1671. Owner-reported final performance build: 67/67 source tests, typecheck/lint clean, 31/31 static pages, 112/112 browser accessibility and interaction checks (2.0m). Latest single mobile Lighthouse score 81, LCP 3.93s; mobile targets not met, repeated measurements and visual quality review still outstanding. Freeze planned performance changes rather than claim field CWV or WCAG conformance.

## Findings and decisions

- Home defaults were inherited by many routes; all 15 project detail pages lacked generateMetadata. Four archives had title/description only; article metadata used its internal canonical path. Add shared page metadata builder and lightweight layouts for client pages without moving their UI. Use stable canonical URLs from configured origin; all 24 content routes retain existing paths.
- Preserve original 1200x630 generated social artwork; unique social text and URLs per page, no invented per-project image assets. Explicit Twitter image fallback. Validate actual emitted image URLs and responses because Next file-based metadata can take precedence.
- Home Person, WebSite and ProfilePage graph uses public identity/profile links and professional photo, not decorative hero avatar. BlogPosting uses real publication date and author; omit unverified modification date, article image and publisher claims. Safe JSON serialization escapes less-than characters. No ranking or rich result guarantee.
- Preview noindex/nofollow remains active. Allow crawler access to read directive, omit robots sitemap advertisement and emit an empty sitemap until release. Production sitemap derives from archive/project/article data and omits unsupported lastmod rather than using the build time. No URL removals or indexing changes on the existing live site.
- Keep three configured historical blog redirects. Verify missing routes return 404. Search Console verification remains blank; do not invent a token or modify account/DNS.
- No new dependencies or deployment. Source-based audit, repository connector cannot access installed Next docs or run local application build. Consulted relevant repository engineering/SEO audit sections, schema and verification skill and official Next metadata/JSON-LD and Google guidance.

References: https://nextjs.org/docs/app/api-reference/functions/generate-metadata ; https://nextjs.org/docs/app/guides/json-ld ; https://developers.google.com/search/docs/appearance/structured-data/profile-page ; https://developers.google.com/search/docs/appearance/structured-data/article ; https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap .

## Verification gates

Run npm test, npm run typecheck, npm run lint, npm run build. Start local production server and run npm run seo inside tests/browser. Review all assertions; check generated social preview visually and validate JSON-LD against Schema.org validator using markup without exposing secrets. Stop local server, rerun 112 accessibility tests. Before launch, explicitly authorize release, verify production sitemap and crawlable/indexable canonical URLs, redirects, domain and HTTPS, and confirm Search Console ownership. Rendered checks and release validation pending.
