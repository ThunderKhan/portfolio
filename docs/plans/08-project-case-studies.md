# Project case studies — first implementation slice

2026-11-28. Baseline a0e6586d858da2e87da91485c763f12d8f18846f. Owner approved a project-storytelling sprint after deferring further audit work. Scope: all detail routes gain a summary-first reading order, with expanded evidence-led narratives for the two pinned projects. The homepage and archive card design, project statuses, slugs, approved palette, typography and existing media remain unchanged.

Sources read: diff2test README at 36451e787266366d9d086ee90797d46360eca827; webclerk README at 633e3f22e0bd378af4c6cad34ef96f9e66c36c33. These document concrete architecture, supported scope, verification fixtures and source paths. Linked immutable source files are evidence pointers, not independently re-executed project tests. Avoid claimed user impact, invented performance metrics and individual authorship of team work. Further projects keep existing summaries until evidence is reviewed. Neither live deployment was tested.

Design: title/status and summary before preview, actual evidence links, sequential architecture, decisions and trade-offs, verification, limitations. Use server-rendered text and semantic HTML; do not attach the case-study dataset to the client project grid. Use existing design tokens and no dependencies. Keep the original diff2test technical article linked. Reuse existing screenshots. No generic placeholder sections for unexpanded projects.

Skills: frontend-design and better-writing; AGENTS, ENGINEERING and DESIGN consulted. Installed Next.js docs not available through remote connector; no new framework API introduced. Source and browser regression coverage added; fresh CI and visual approval pending. No main merge or deployment.
