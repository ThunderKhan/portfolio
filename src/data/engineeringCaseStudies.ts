// Server-side detail content, intentionally separate from the client project grid.
export type EngineeringCaseStudy = {
  premise: string;
  facts: { value: string; label: string }[];
  flow: { title: string; detail: string }[];
  decisions: { title: string; detail: string }[];
  verification: string;
  limitations: string;
  sources: { label: string; href: string }[];
};

export const engineeringCaseStudies: Partial<Record<string, EngineeringCaseStudy>> = {
  "diff2test": {
    "premise": "A faster test suite is only useful if the tests it omits are justified by evidence.",
    "facts": [
      {
        "value": "0",
        "label": "Third-party runtime dependencies"
      },
      {
        "value": "7",
        "label": "Documented C++ test executables"
      },
      {
        "value": "20",
        "label": "Repeated fixture analyses in the verification suite"
      }
    ],
    "flow": [
      {
        "title": "Read build evidence",
        "detail": "Changed paths, CMake File API codemodel v2, GCC/Clang Make-style dependency files and CTest json-v1 catalogue."
      },
      {
        "title": "Map changed files to targets",
        "detail": "Resolve file and header dependencies to translation units, owning targets and dependent targets."
      },
      {
        "title": "Resolve registered tests",
        "detail": "Match executable artifacts to direct CTest commands; retain an explainable evidence chain."
      },
      {
        "title": "Select or widen",
        "detail": "Emit a justified subset, the full known suite, or an explicit requirement to run the full suite when enumeration is unsafe."
      }
    ],
    "decisions": [
      {
        "title": "Evidence over heuristics",
        "detail": "A missing or ambiguous graph edge is not evidence that a test is unaffected. Narrow selection is conditional; unsafe evidence widens the result."
      },
      {
        "title": "Keep runtime self-contained",
        "detail": "A single C++20 source implements parsing, containment, traversal and output using the standard library. Git, CMake and CTest are caller-side tooling, not runtime subprocesses."
      },
      {
        "title": "Make fallback observable",
        "detail": "Separate nonzero safety outcomes distinguish a known full suite from a catalogue that cannot be trusted. CI integrations must handle either outcome explicitly."
      }
    ],
    "verification": "The documented integration fixture selects AlphaTest for alpha.hpp and AlphaTest plus BetaTest for a shared header. Missing dependency evidence emits the known three-test suite. The repository also documents strict parser tests, a 10,000-prerequisite stress case, sanitizer builds and same-runner byte-for-byte reproducibility. These are controlled verification results, not a claim of speedup on arbitrary repositories.",
    "limitations": "The verified MVP targets Linux, GCC/Clang, CMake Unix Makefiles-style layout and direct CTest executable commands. It does not execute tests or prove that metadata perfectly matches source contents. Windows/MSVC, Ninja and generated/custom-command relationships need separate evidence adapters and verification.",
    "sources": [
      {
        "label": "Safety contract",
        "href": "https://github.com/ThunderKhan/diff2test/blob/36451e787266366d9d086ee90797d46360eca827/SAFETY-CONTRACT.md"
      },
      {
        "label": "Runtime dependency and reproducibility evidence",
        "href": "https://github.com/ThunderKhan/diff2test/blob/36451e787266366d9d086ee90797d46360eca827/DEPENDENCY-PROOF.md"
      },
      {
        "label": "Verification and supported boundary",
        "href": "https://github.com/ThunderKhan/diff2test/blob/36451e787266366d9d086ee90797d46360eca827/README.md#verification"
      }
    ]
  },
  "webclerk": {
    "premise": "The agent can prepare a consequential form; the human retains the authority to commit.",
    "facts": [
      {
        "value": "9",
        "label": "Semantic WebMCP tools"
      },
      {
        "value": "2",
        "label": "Authorized write capabilities"
      },
      {
        "value": "0",
        "label": "Agent submission capabilities"
      }
    ],
    "flow": [
      {
        "title": "Inspect evidence",
        "detail": "Read structured facts, field requirements, validity and unresolved conflicts."
      },
      {
        "title": "Call semantic tools",
        "detail": "The page registers WebMCP tools through document.modelContext; agents operate on domain concepts rather than DOM clicks."
      },
      {
        "title": "Authorize mutations",
        "detail": "The site's deterministic trust rules validate each proposed write before it reaches shared state."
      },
      {
        "title": "Human review",
        "detail": "Show reversible changes, blockers and preflight results; declarations and submission remain human-controlled."
      }
    ],
    "decisions": [
      {
        "title": "Enforce authority at the write boundary",
        "detail": "Unsupported values, stale evidence, conflicts and human-only actions return structured refusals before mutation. Model confidence is not authorization."
      },
      {
        "title": "Reuse the same state and rules",
        "detail": "Human UI and agent tools operate on the same browser-visible state; a workflow-configurable trust engine supports scholarship and motor insurance examples."
      },
      {
        "title": "Treat evidence as data",
        "detail": "Evidence-derived tool output carries untrustedContentHint. The domain engine, not document text or prompt-only instruction, determines allowed changes."
      }
    ],
    "verification": "The fictional scholarship demo fills six fields from current evidence while preserving seeded income conflicts, stale evidence and the human declaration. The insurance workflow demonstrates the same nine-tool factory with a different field and evidence set. Repository tests document adversarial refusals, pre-mutation authorization and the absence of a submission tool.",
    "limitations": "The demo uses fictional, pre-extracted structured evidence. Arbitrary OCR and document extraction are outside the prototype, and the scholarship workflow is not affiliated with a public authority. This is a demonstration of a reusable trust boundary, not a claim of production compliance or universal form coverage.",
    "sources": [
      {
        "label": "Tool registration and implementation",
        "href": "https://github.com/ThunderKhan/webclerk/blob/633e3f22e0bd378af4c6cad34ef96f9e66c36c33/webmcp/index.ts"
      },
      {
        "label": "Deterministic trust rules",
        "href": "https://github.com/ThunderKhan/webclerk/blob/633e3f22e0bd378af4c6cad34ef96f9e66c36c33/webmcp/domain.ts"
      },
      {
        "label": "Adversarial authority evaluations",
        "href": "https://github.com/ThunderKhan/webclerk/blob/633e3f22e0bd378af4c6cad34ef96f9e66c36c33/webmcp/evals.test.ts"
      },
      {
        "label": "Demonstration and scope",
        "href": "https://github.com/ThunderKhan/webclerk/blob/633e3f22e0bd378af4c6cad34ef96f9e66c36c33/README.md"
      }
    ]
  },
  "frame": {
    "premise": "A transaction can look ordinary in isolation while its relationships reveal coordinated abuse.",
    "facts": [
      {
        "value": "13",
        "label": "Native online risk features"
      },
      {
        "value": "30 min",
        "label": "Rolling temporal window"
      },
      {
        "value": "2",
        "label": "Separate analysis modes"
      }
    ],
    "flow": [
      {
        "title": "Ingest observed relationships",
        "detail": "Represent native payments as customer, card, device, IP and merchant connections; validate the input schema."
      },
      {
        "title": "Build graph and temporal context",
        "detail": "Derive relational features and short-window activity from the evolving graph."
      },
      {
        "title": "Choose the analytical path",
        "detail": "Native payments use calibrated logistic regression; mapped relational CSVs use graph-derived features and Isolation Forest anomaly ranking."
      },
      {
        "title": "Explain the result",
        "detail": "Apply deterministic policy only for native calibrated risk, and expose observed relationships for analyst investigation."
      }
    ],
    "decisions": [
      {
        "title": "Separate probability from anomaly rank",
        "detail": "An anomaly percentile within an uploaded dataset is not a fraud probability. Arbitrary datasets do not receive native payment policy decisions."
      },
      {
        "title": "Do not fabricate relationships",
        "detail": "Known-schema adapters and user mappings use observed entities rather than inventing missing cards, devices or IPs."
      },
      {
        "title": "Separate model and policy",
        "detail": "Calibrated model outputs estimate risk; explicit thresholds govern ALLOW, REVIEW and BLOCK independently."
      }
    ],
    "verification": "The repository documents a chronological synthetic hard-negative ring benchmark, labeled real-data tabular evaluation on ULB Credit Card Fraud, dataset compatibility profiles and graph playback. These evaluate different capabilities; synthetic ring results must not be generalized to real-world fraud prevention.",
    "limitations": "The native model depends on its supported payment schema and available graph history. Dataset Lab rankings are run-relative. Public demo upload and row limits are deliberate. No production fraud-loss reduction, financial institution adoption or universal model accuracy is established.",
    "sources": [
      {
        "label": "Two analysis modes",
        "href": "https://github.com/ThunderKhan/frame/blob/0863c447fa35157c3b690fbf56b73b1882c80ce9/README.md#two-analysis-modes"
      },
      {
        "label": "Architecture and state boundaries",
        "href": "https://github.com/ThunderKhan/frame/blob/0863c447fa35157c3b690fbf56b73b1882c80ce9/docs/ARCHITECTURE.md"
      },
      {
        "label": "Dataset compatibility and mapping",
        "href": "https://github.com/ThunderKhan/frame/blob/0863c447fa35157c3b690fbf56b73b1882c80ce9/README.md#dataset-lab"
      }
    ]
  },
  "refute": {
    "premise": "A proposed fix is a hypothesis to challenge with executable counterexamples, not a diff to trust on appearance.",
    "facts": [
      {
        "value": "10/10",
        "label": "Correct development-benchmark verdicts"
      },
      {
        "value": "10/12",
        "label": "Correct post-freeze holdout verdicts"
      },
      {
        "value": "20%",
        "label": "Holdout false acceptance rate"
      }
    ],
    "flow": [
      {
        "title": "Establish the trigger",
        "detail": "Compare original and patched behavior; compatible public Python PRs can replay changed pytest tests against both revisions."
      },
      {
        "title": "Derive challenges",
        "detail": "Compile recognizable public contract requirements into deterministic probes; a bounded planner may prioritize valid candidates."
      },
      {
        "title": "Execute both versions",
        "detail": "Observe whether the trigger is repaired and whether nearby requirements or previously working behavior fail."
      },
      {
        "title": "Classify from evidence",
        "detail": "Return complete, partial, ineffective, regression-introduced or inconclusive verdicts based on observed results."
      }
    ],
    "decisions": [
      {
        "title": "Constrain the model's authority",
        "detail": "The model prioritizes candidates rather than inventing arbitrary executable tests or the final verdict."
      },
      {
        "title": "Measure the planner's contribution",
        "detail": "The post-freeze ablation found equal verdict accuracy without model prioritization in the tested contract domain, with lower average runtime."
      },
      {
        "title": "Preserve uncertainty",
        "detail": "An inconclusive verdict is preferable to a complete-fix claim without enough independent evidence."
      }
    ],
    "verification": "Frozen Iteration 5 reports 10 of 10 correct verdicts and zero false acceptance on the ten-case development benchmark. On the separately authored 12-case holdout it reports 10 correct verdicts and 20% false acceptance. Both planner and deterministic ordering missed two partial fixes. These documented results expose a generalization gap rather than concealing it.",
    "limitations": "Small, controlled benchmarks do not establish universal verification accuracy. The contract compiler supports a bounded vocabulary. Compatible real PR execution uses per-run Python environments, not a strong OS or container sandbox; running untrusted third-party code is unsafe.",
    "sources": [
      {
        "label": "Development benchmark results",
        "href": "https://github.com/ThunderKhan/refute/blob/7335495ddbb14db740bde4a25d740eedc9628428/README.md#measured-results"
      },
      {
        "label": "Post-freeze holdout protocol",
        "href": "https://github.com/ThunderKhan/refute/blob/7335495ddbb14db740bde4a25d740eedc9628428/docs/HOLDOUT_V1_PROTOCOL.md"
      },
      {
        "label": "Planner ablation",
        "href": "https://github.com/ThunderKhan/refute/blob/7335495ddbb14db740bde4a25d740eedc9628428/docs/AGENT_ABLATION.md"
      },
      {
        "label": "Real PR workflow and safety boundary",
        "href": "https://github.com/ThunderKhan/refute/blob/7335495ddbb14db740bde4a25d740eedc9628428/README.md#real-github-pr-workflow"
      }
    ]
  },
  "llm-social-selection": {
    "premise": "A multi-agent experiment needs reproducible selection rules and defensible independent replicates before its behavior can support a scientific claim.",
    "facts": [
      {
        "value": "8",
        "label": "Active agents per protocol round"
      },
      {
        "value": "3",
        "label": "Selection conditions in v0.1"
      },
      {
        "value": "v0.1",
        "label": "Frozen apparatus protocol"
      }
    ],
    "flow": [
      {
        "title": "Initialize a matched trial",
        "detail": "The protocol specifies one model per trial, seeded profiles, a replacement queue and a declared selection condition."
      },
      {
        "title": "Collect independent responses",
        "detail": "All active agents receive the same task and submit structured answers before seeing other current-round responses."
      },
      {
        "title": "Score and select",
        "detail": "Collect deterministic objective scores and validated ballots; apply peer, objective or random selection according to the frozen condition."
      },
      {
        "title": "Persist and reproduce",
        "detail": "The protocol requires atomic round commits, recorded seeds, provenance and checkpoint-based resume."
      }
    ],
    "decisions": [
      {
        "title": "Treat trials as replicates",
        "detail": "Agent-round and dyad-round observations are nested; counting them as independent trials would exaggerate evidence."
      },
      {
        "title": "Control information and identity",
        "detail": "Stable pseudonyms and public directed ballot history are intentional protocol choices; self-votes are prohibited."
      },
      {
        "title": "Separate apparatus, pilot and confirmation",
        "detail": "Fixture correctness and pilot feasibility cannot establish emergent social behavior. A later frozen and adequately powered study is required."
      }
    ],
    "verification": "The available experiment registry specifies deterministic fixture acceptance tests and planned real-model pilot and confirmatory stages. The protocol documents reproducibility requirements, ballot failure handling and selection reconstruction. This case study describes the research design; no completed behavioral result is asserted from these documents.",
    "limitations": "A single quantized model, prompt-induced behavior, position bias, replacement confounding and limited compute restrict interpretation. The public experiment registry does not establish a completed confirmatory study or evidence of human-like social traits.",
    "sources": [
      {
        "label": "Frozen protocol decisions",
        "href": "https://github.com/ThunderKhan/llm-social-selection/blob/489c49f82620d1d46f5973da08966d1f74a6bc77/DECISIONS.md"
      },
      {
        "label": "Experimental methodology",
        "href": "https://github.com/ThunderKhan/llm-social-selection/blob/489c49f82620d1d46f5973da08966d1f74a6bc77/METHODOLOGY.md"
      },
      {
        "label": "Experiment registry and stages",
        "href": "https://github.com/ThunderKhan/llm-social-selection/blob/489c49f82620d1d46f5973da08966d1f74a6bc77/EXPERIMENTS.md"
      }
    ]
  },
  "oasis": {
    "premise": "Referral prioritisation must preserve clinical uncertainty rather than turn an experimental score into a diagnosis.",
    "facts": [
      {
        "value": "3",
        "label": "Screening pathways"
      },
      {
        "value": "6",
        "label": "Assessment workflow steps"
      },
      {
        "value": "0",
        "label": "Prospective or external clinical validations documented"
      }
    ],
    "flow": [
      {
        "title": "Collect assessment information",
        "detail": "The prototype guides oral, breast and cervical screening information through a six-step interface."
      },
      {
        "title": "Apply clinical safety rules",
        "detail": "Red flags and abnormal examination findings are considered before optional statistical support."
      },
      {
        "title": "Calculate referral priority",
        "detail": "Combine rule-backed eligibility and optional experimental support into an ordinal Screening Priority Index, separate from cancer probability."
      },
      {
        "title": "Present reasons and history",
        "detail": "Persist assessment summaries and show pathway priorities, rationale and referral print views."
      }
    ],
    "decisions": [
      {
        "title": "Symptoms override low model output",
        "detail": "The decision model does not permit a low experimental prediction to negate symptoms or abnormal findings."
      },
      {
        "title": "Separate urgency from diagnosis",
        "detail": "A priority index expresses referral urgency; it is neither a cancer probability nor an exclusion test."
      },
      {
        "title": "Keep evidence review explicit",
        "detail": "Thresholds and programme rules are configuration-backed and require clinician and local-programme review before any deployment."
      }
    ],
    "verification": "The repository documents the Next.js and FastAPI workflow, persisted assessment summaries, synthetic demo scenarios, evidence matrix and model card. The case study describes prototype functionality and safety intent, not clinical efficacy.",
    "limitations": "This research prototype has no prospective or external clinical validation. It cannot diagnose or exclude cancer or replace professional judgement, clinical examination or local protocols. Experimental model representativeness, missingness and bias remain concerns.",
    "sources": [
      {
        "label": "Architecture and clinical disclaimer",
        "href": "https://github.com/ThunderKhan/oasis/blob/a28cd186a484bef23c710a42bbb54f8c2995b3d3/README.md"
      },
      {
        "label": "Evidence matrix",
        "href": "https://github.com/ThunderKhan/oasis/blob/a28cd186a484bef23c710a42bbb54f8c2995b3d3/docs/EVIDENCE_MATRIX.md"
      },
      {
        "label": "Experimental model card",
        "href": "https://github.com/ThunderKhan/oasis/blob/a28cd186a484bef23c710a42bbb54f8c2995b3d3/docs/MODEL_CARD.md"
      }
    ]
  },
  "iet-grid": {
    "premise": "A shared campus calendar is useful only when bookings and authority remain consistent under conflicting requests.",
    "facts": [
      {
        "value": "20",
        "label": "Documented RLS-protected tables"
      },
      {
        "value": "5",
        "label": "Floors with original plan views"
      },
      {
        "value": "14",
        "label": "Versioned database migrations"
      }
    ],
    "flow": [
      {
        "title": "Authenticate and scope access",
        "detail": "A React/Vite frontend uses Supabase authentication and a separate FastAPI backend for protected operations."
      },
      {
        "title": "Explore rooms and schedules",
        "detail": "Spatial maps and original organizer plans support navigation alongside calendar availability."
      },
      {
        "title": "Validate booking commitments",
        "detail": "PostgreSQL constraints prevent overlapping confirmed room, faculty and cohort commitments; authenticated endpoints support idempotent bookings and approvals."
      },
      {
        "title": "Propagate official changes",
        "detail": "Authorized cancellation, rescheduling, notices and student reports preserve the distinction between user feedback and official records."
      }
    ],
    "decisions": [
      {
        "title": "Enforce conflicts in the database",
        "detail": "Availability shown in the UI is not the final concurrency guarantee; the database must reject incompatible confirmed commitments."
      },
      {
        "title": "Separate schematic from original plans",
        "detail": "Selectable maps are explicitly schematic, while the original supplied plan crops remain available."
      },
      {
        "title": "Do not invent campus data",
        "detail": "Missing official cohorts and timetable records remain missing. Bookings without cohort linkage do not generate invented personalized notices."
      }
    ],
    "verification": "The team repository documents frontend build and smoke checks, backend tests and rollback-only SQL verification of conflict handling, rescheduling, audit and cancellation notices. This is a team hackathon project; the documented implementation is a team outcome, not an attribution of every contribution to one member.",
    "limitations": "Official student and timetable imports and independent faculty/admin/student acceptance remain outstanding in the repository record. The floor maps do not certify room capacity; automatic semester timetable generation is a future milestone. Deployment readiness alone is not production acceptance.",
    "sources": [
      {
        "label": "Architecture",
        "href": "https://github.com/ThunderKhan/iet-grid/blob/2d5d2a6d380a7e68fbefce31c237465d60134d8f/docs/ARCHITECTURE.md"
      },
      {
        "label": "Backend implementation",
        "href": "https://github.com/ThunderKhan/iet-grid/blob/2d5d2a6d380a7e68fbefce31c237465d60134d8f/docs/BACKEND_IMPLEMENTATION.md"
      },
      {
        "label": "Final scope and verification record",
        "href": "https://github.com/ThunderKhan/iet-grid/blob/2d5d2a6d380a7e68fbefce31c237465d60134d8f/docs/HACKATHON_FINAL_STATUS_2026-11-06.md"
      },
      {
        "label": "Team and known limitations",
        "href": "https://github.com/ThunderKhan/iet-grid/blob/2d5d2a6d380a7e68fbefce31c237465d60134d8f/README.md"
      }
    ]
  },
  "pareto": {
    "premise": "Interpret hiring intent with a model, but let reviewable criteria and candidate evidence determine the search.",
    "facts": [
      {
        "value": "48",
        "label": "Fictional demo candidate records"
      },
      {
        "value": "3",
        "label": "Evidence states: match, fail, unknown"
      },
      {
        "value": "2",
        "label": "Model providers in the gateway"
      }
    ],
    "flow": [
      {
        "title": "Interpret the hiring brief",
        "detail": "Gemini or Groq produces a structured, validated draft of the recruiter’s requirements."
      },
      {
        "title": "Confirm criteria",
        "detail": "The recruiter edits and explicitly approves the draft before candidate retrieval."
      },
      {
        "title": "Evaluate candidate evidence",
        "detail": "The backend queries recruiter-scoped PostgreSQL records and deterministically evaluates each requirement."
      },
      {
        "title": "Explore trade-offs",
        "detail": "Review near matches, unknown attributes, Pareto-frontier alternatives and saved search revisions without silently changing confirmed criteria."
      }
    ],
    "decisions": [
      {
        "title": "Human confirmation precedes retrieval",
        "detail": "A model-generated draft does not automatically become a candidate search."
      },
      {
        "title": "Unknown is not a match",
        "detail": "Missing candidate facts remain unknown rather than becoming invented qualifications or eligibility guarantees."
      },
      {
        "title": "Separate interpretation and evidence",
        "detail": "Provider fallback is confined to the language interpretation layer; deterministic matching and counts come from database records."
      }
    ],
    "verification": "The team repository documents a deterministic fictional seed, repeatable demo scenarios, Vitest and Playwright checks, and a deployment architecture separating the Vercel frontend from a Railway application/API service. The demo illustrates the workflow rather than measuring hiring outcomes.",
    "limitations": "This is a team hackathon project with fictional candidates. Resume ingestion requires separately configured private storage and a running worker. No production recruitment accuracy, fairness validation or real hiring outcome is established.",
    "sources": [
      {
        "label": "Architecture and trust boundaries",
        "href": "https://github.com/ThunderKhan/pareto/blob/0c3ba193f16eec9e02aff53a95216618d10cfe73/README.md#architecture"
      },
      {
        "label": "Repeatable demo scenarios",
        "href": "https://github.com/ThunderKhan/pareto/blob/0c3ba193f16eec9e02aff53a95216618d10cfe73/docs/DEMO-SCRIPT.md"
      },
      {
        "label": "Resume ingestion scope",
        "href": "https://github.com/ThunderKhan/pareto/blob/0c3ba193f16eec9e02aff53a95216618d10cfe73/docs/RESUME-INGESTION.md"
      },
      {
        "label": "Deployment topology",
        "href": "https://github.com/ThunderKhan/pareto/blob/0c3ba193f16eec9e02aff53a95216618d10cfe73/docs/VERCEL-RAILWAY-FRONTEND.md"
      }
    ]
  },
  "grantly": {
    "premise": "Scholarship discovery should turn uncertain eligibility into practical next steps, not a fabricated probability of success.",
    "facts": [
      {
        "value": "12",
        "label": "Clearly labeled illustrative listings"
      },
      {
        "value": "3",
        "label": "Source-linked programme listings"
      },
      {
        "value": "Local",
        "label": "Workspace persistence; no backend"
      }
    ],
    "flow": [
      {
        "title": "Discover opportunities",
        "detail": "Combine search, filters and ordering across source-linked programme information and explicitly illustrative examples."
      },
      {
        "title": "Explain eligibility",
        "detail": "Compare known profile facts against stated requirements; preserve missing answers as unknown."
      },
      {
        "title": "Prepare and track",
        "detail": "Save opportunities, maintain document checklists and notes, compare options and update application stages."
      },
      {
        "title": "Hand off to the provider",
        "detail": "Export calendar events or a validated workspace backup and use the actual provider portal for submissions."
      }
    ],
    "decisions": [
      {
        "title": "No invented match percentages",
        "detail": "Deterministic matched, unknown and mismatch explanations remain inspectable."
      },
      {
        "title": "Separate samples from sources",
        "detail": "Illustrative listings carry no invented official application links; source-linked listings are dated rather than presented as live availability."
      },
      {
        "title": "Keep storage local",
        "detail": "A versioned React workspace stores validated local state and requires confirmation before destructive reset or replacement."
      }
    ],
    "verification": "The repository describes a guided fictional profile walkthrough, refresh persistence checks, unit/build checks and Playwright acceptance with axe scans across six viewport widths. Its documentation records the frontend-only journey and known boundaries.",
    "limitations": "No backend, accounts, uploads, cloud synchronization or application submission are implemented. The source-linked programme information is a reviewed snapshot, not a real-time eligibility or deadline guarantee.",
    "sources": [
      {
        "label": "Working experience and privacy",
        "href": "https://github.com/ThunderKhan/grantly/blob/40d101fbeac5b2039e3131349d91a4c83ddde7e0/README.md"
      },
      {
        "label": "Frontend completion and data sources",
        "href": "https://github.com/ThunderKhan/grantly/blob/40d101fbeac5b2039e3131349d91a4c83ddde7e0/docs/FRONTEND_COMPLETION.md"
      },
      {
        "label": "Design specification",
        "href": "https://github.com/ThunderKhan/grantly/blob/40d101fbeac5b2039e3131349d91a4c83ddde7e0/docs/design.md"
      }
    ]
  },
  "axiom": {
    "premise": "A research product must establish trustworthy infrastructure before presenting generated market intelligence as observed evidence.",
    "facts": [
      {
        "value": "M0",
        "label": "Documented foundation milestone"
      },
      {
        "value": "Idle",
        "label": "Worker lifecycle; no durable jobs"
      },
      {
        "value": "2",
        "label": "Web and API foundations"
      }
    ],
    "flow": [
      {
        "title": "Define product boundaries",
        "detail": "Specify source-backed research, workspace isolation and the distinction between observed facts and model interpretation."
      },
      {
        "title": "Establish the web foundation",
        "detail": "The current Next.js status page describes foundation readiness; ordinary page rendering does not fetch the API."
      },
      {
        "title": "Establish service boundaries",
        "detail": "FastAPI provides health endpoints and an explicitly bounded idle worker with no business queue."
      },
      {
        "title": "Verify integration and outages",
        "detail": "The documented smoke harness exercises a native web build, container API/worker, browser-origin CORS and deliberate service failure/recovery."
      }
    ],
    "decisions": [
      {
        "title": "Do not fake readiness",
        "detail": "A configured database URL cannot become a successful readiness claim while database integration is unverified."
      },
      {
        "title": "Separate public configuration from secrets",
        "detail": "Only a browser-safe API origin belongs in frontend configuration; provider and database credentials remain server-only."
      },
      {
        "title": "Bound the foundation",
        "detail": "The idle worker is intentionally not presented as durable job processing. Planned product features remain specifications."
      }
    ],
    "verification": "The repository documents locked developer environments, service-health checks, integrated Chromium/CORS smoke coverage and bounded worker cleanup. The milestone establishes a foundation, not a completed startup-intelligence product.",
    "limitations": "Authentication, workspaces, research, CRM, durable job processing and production deployment remain unimplemented or unverified in the reviewed revision. No live market research or founder outcome is claimed.",
    "sources": [
      {
        "label": "Foundation status and smoke workflow",
        "href": "https://github.com/ThunderKhan/axiom/blob/f419ed47e0948b4cd763f9f3406dbcc87e00a220/README.md"
      },
      {
        "label": "Product requirements",
        "href": "https://github.com/ThunderKhan/axiom/blob/f419ed47e0948b4cd763f9f3406dbcc87e00a220/docs/02-PRD.md"
      },
      {
        "label": "System architecture",
        "href": "https://github.com/ThunderKhan/axiom/blob/f419ed47e0948b4cd763f9f3406dbcc87e00a220/docs/05-SYSTEM-ARCHITECTURE.md"
      }
    ]
  },
  "feynman-in-a-loop": {
    "premise": "The learner should demonstrate understanding by explaining and transferring a concept, rather than judging an AI explanation by its fluency.",
    "facts": [
      {
        "value": "Text",
        "label": "Kernel awaiting live end-to-end verification"
      },
      {
        "value": "Voice",
        "label": "Planned interaction with typed fallback"
      },
      {
        "value": "Auth",
        "label": "Live-verified session shell, per project record"
      }
    ],
    "flow": [
      {
        "title": "Start a learning session",
        "detail": "The documented Next.js and Supabase shell establishes identity and session boundaries."
      },
      {
        "title": "Teach the AI student",
        "detail": "The intended learning loop takes a learner explanation rather than asking the model to act as the primary tutor."
      },
      {
        "title": "Repair misunderstandings",
        "detail": "The planned student behavior exposes gaps, asks targeted questions and allows the learner to correct their explanation."
      },
      {
        "title": "Test transfer",
        "detail": "The intended final stage challenges the learner with a new case and records a structured evidence-based mastery result."
      }
    ],
    "decisions": [
      {
        "title": "Reverse the tutoring relationship",
        "detail": "The design prioritizes learner-generated explanations and repair, rather than passive consumption."
      },
      {
        "title": "Treat model output as untrusted",
        "detail": "The security specification calls for schema validation, protection against mastery manipulation and scoped session data."
      },
      {
        "title": "Verify the learning kernel before voice",
        "detail": "The text kernel is documented as ready for live verification; the Web Speech API path is a planned capability, not a delivered claim."
      }
    ],
    "verification": "The reviewed README records a live-verified authentication/session shell, an approved scope and architecture, provider selection through a Slice 3 benchmark and a text-learning kernel awaiting live end-to-end verification.",
    "limitations": "The project is in progress. The intended voice-first loop and persisted mastery workflow are not established as complete. No educational effectiveness, learning gain or validated assessment result is claimed.",
    "sources": [
      {
        "label": "Implementation status and learning loop",
        "href": "https://github.com/ThunderKhan/feynman-in-a-loop/blob/02215a43aeaa9bcf63162a92ceae0daf7c7161e8/README.md"
      },
      {
        "label": "AI system design",
        "href": "https://github.com/ThunderKhan/feynman-in-a-loop/blob/02215a43aeaa9bcf63162a92ceae0daf7c7161e8/docs/AI_SYSTEM.md"
      },
      {
        "label": "Architecture and scope",
        "href": "https://github.com/ThunderKhan/feynman-in-a-loop/blob/02215a43aeaa9bcf63162a92ceae0daf7c7161e8/docs/ARCHITECTURE.md"
      },
      {
        "label": "Testing plan",
        "href": "https://github.com/ThunderKhan/feynman-in-a-loop/blob/02215a43aeaa9bcf63162a92ceae0daf7c7161e8/docs/TESTING.md"
      }
    ]
  },
  "vani": {
    "premise": "Offline voice communication requires independently verified speech, transport and meaning preservation, not just a functioning local connection.",
    "facts": [
      {
        "value": "10",
        "label": "Target languages; not verified coverage"
      },
      {
        "value": "M0–M6",
        "label": "Documented engineering roadmap"
      },
      {
        "value": "Android",
        "label": "Feasibility and protocol probe platform"
      }
    ],
    "flow": [
      {
        "title": "Capture and transcribe",
        "detail": "The target pipeline uses push-to-talk, endpointing and offline speech recognition on the device."
      },
      {
        "title": "Validate critical information",
        "detail": "Normalize transcript content and check critical meaning before constructing a semantic message."
      },
      {
        "title": "Transport a semantic bundle",
        "detail": "The protocol design separates authenticated messages from replaceable local transport; the repository contains Android transport and delivery components."
      },
      {
        "title": "Reconstruct and acknowledge",
        "detail": "The target loop verifies the message, performs offline speech synthesis and records truthful acknowledgement and delivery state."
      }
    ],
    "decisions": [
      {
        "title": "Measure critical meaning",
        "detail": "Average transcription quality alone cannot establish that important numbers or instructions survive the communication path."
      },
      {
        "title": "Keep transport replaceable",
        "detail": "Semantic bundle and delivery semantics are designed independently of specific links or relay mechanisms."
      },
      {
        "title": "Require evidence per milestone",
        "detail": "The roadmap requires individual language checks, real offline operation and measured device behavior before broader claims."
      }
    ],
    "verification": "The repository tree contains an Android feasibility module, link and speech probes, critical-information guard and bundle tests, delivery-state and durable-store components, and protocol test vectors. These are implementation artifacts, not independent evidence of complete multilingual device operation.",
    "limitations": "The complete two-phone offline speech-to-speech loop, all ten language requirements and resilient multi-hop behavior remain unverified here. No emergency communications reliability, safety certification or field deployment is claimed.",
    "sources": [
      {
        "label": "Target pipeline and language requirements",
        "href": "https://github.com/ThunderKhan/vani/blob/f42a1b666afc76bd0cf2ea86622b480084f6d39b/README.md"
      },
      {
        "label": "Canonical roadmap and evidence gates",
        "href": "https://github.com/ThunderKhan/vani/blob/f42a1b666afc76bd0cf2ea86622b480084f6d39b/docs/ROADMAP.md"
      },
      {
        "label": "Android feasibility module",
        "href": "https://github.com/ThunderKhan/vani/blob/f42a1b666afc76bd0cf2ea86622b480084f6d39b/android/feasibility-probe/build.gradle.kts"
      },
      {
        "label": "Protocol test vectors",
        "href": "https://github.com/ThunderKhan/vani/blob/f42a1b666afc76bd0cf2ea86622b480084f6d39b/protocol/test-vectors/README.md"
      }
    ]
  },
  "prometheus-compiler": {
    "premise": "Implementing a deliberately small language makes each translation boundary inspectable.",
    "facts": [
      {
        "value": "C++23",
        "label": "Implementation language"
      },
      {
        "value": "emit",
        "label": "Implemented statement form"
      },
      {
        "value": "ELF64",
        "label": "Assembly/link target in the driver"
      }
    ],
    "flow": [
      {
        "title": "Read and tokenize source",
        "detail": "The compiler driver reads a source file and invokes its tokenizer."
      },
      {
        "title": "Explore parsing separately",
        "detail": "The parser header defines expression and emit nodes and validates the small grammar; the current executable does not call this parser."
      },
      {
        "title": "Emit assembly",
        "detail": "The current token-to-assembly routine validates an emit integer statement and generates x86-64 Linux exit-system-call instructions."
      },
      {
        "title": "Assemble and link",
        "detail": "The driver writes out.asm, invokes NASM with ELF64 output and links with ld, propagating tool failure."
      }
    ],
    "decisions": [
      {
        "title": "Keep the grammar small",
        "detail": "An integer-literal emit statement provides a narrow, inspectable first translation target."
      },
      {
        "title": "Distinguish parser work from executable behavior",
        "detail": "AST structures and a parser exist, but the driver currently emits from tokens instead of traversing an AST."
      },
      {
        "title": "Use external native tools",
        "detail": "NASM and ld perform assembly and linking; they are required by the current executable rather than implemented in the compiler."
      }
    ],
    "verification": "The reviewed main.cpp and parser.hpp establish the actual driver and separate parser behavior. The README describes the intended larger compiler architecture; the source does not establish an integrated semantic-symbol-analysis stage or general AST code generation.",
    "limitations": "This is an educational experimental compiler, not a general-purpose language implementation. The current driver targets ELF64 and depends on NASM and ld. The AST parser is not wired into executable code generation; wider language support and semantic analysis are not established.",
    "sources": [
      {
        "label": "Executable driver and code generation",
        "href": "https://github.com/ThunderKhan/prometheus-compiler/blob/532ac1f94373c8a22719f6e46a6e020952e544cf/src/main.cpp"
      },
      {
        "label": "Parser and AST structures",
        "href": "https://github.com/ThunderKhan/prometheus-compiler/blob/532ac1f94373c8a22719f6e46a6e020952e544cf/src/parser.hpp"
      },
      {
        "label": "Tokenizer",
        "href": "https://github.com/ThunderKhan/prometheus-compiler/blob/532ac1f94373c8a22719f6e46a6e020952e544cf/src/tokenization.hpp"
      },
      {
        "label": "Build definition",
        "href": "https://github.com/ThunderKhan/prometheus-compiler/blob/532ac1f94373c8a22719f6e46a6e020952e544cf/CMakeLists.txt"
      }
    ]
  },
  "tab-jumper": {
    "premise": "Navigation through recently visited tabs is a state-management problem, not a tab-strip ordering problem.",
    "facts": [
      {
        "value": "100",
        "label": "Maximum visit entries per session"
      },
      {
        "value": "2",
        "label": "Navigation modes"
      },
      {
        "value": "1",
        "label": "Requested Chrome permission: storage"
      }
    ],
    "flow": [
      {
        "title": "Observe tab activation",
        "detail": "A Manifest V3 service worker connects Chrome tab events and commands to the history model."
      },
      {
        "title": "Update the visit trail",
        "detail": "Pure transitions maintain ordered tab/window IDs, a cursor and two recent distinct tabs; a new manual visit truncates the forward path."
      },
      {
        "title": "Navigate or toggle",
        "detail": "History commands move the cursor while recent mode selects the previous distinct tab."
      },
      {
        "title": "Maintain valid local state",
        "detail": "Closed or replaced tabs are reconciled, old visits are bounded and preferences persist independently of session history."
      }
    ],
    "decisions": [
      {
        "title": "Separate pure state transitions",
        "detail": "The history model is testable without driving a browser and the background module handles platform events."
      },
      {
        "title": "Store identifiers, not browsing content",
        "detail": "Only tab/window identifiers and the selected mode are required; the manifest requests storage and no history or host permissions."
      },
      {
        "title": "Make history session-scoped",
        "detail": "Temporary history resets on browser exit while the selected mode survives in local storage."
      }
    ],
    "verification": "The manifest and history model confirm a storage-only permission set, session-history cap, cursor operations, branching, pruning and recent-tab toggle logic. The repository documents tests for navigation, tab replacement, cleanup and the size limit.",
    "limitations": "The extension is installed unpacked, not claimed as a published Chrome Web Store product. Actual visit history resets when Chrome closes, and suggested shortcuts can conflict with existing browser or extension commands.",
    "sources": [
      {
        "label": "Manifest and permissions",
        "href": "https://github.com/ThunderKhan/tab-jumper/blob/f578119b21368a559d4f0181d31041d6bc9c44ec/manifest.json"
      },
      {
        "label": "Pure history state model",
        "href": "https://github.com/ThunderKhan/tab-jumper/blob/f578119b21368a559d4f0181d31041d6bc9c44ec/history-model.js"
      },
      {
        "label": "History model tests",
        "href": "https://github.com/ThunderKhan/tab-jumper/blob/f578119b21368a559d4f0181d31041d6bc9c44ec/test/history-model.test.js"
      },
      {
        "label": "Privacy and installation",
        "href": "https://github.com/ThunderKhan/tab-jumper/blob/f578119b21368a559d4f0181d31041d6bc9c44ec/README.md"
      }
    ]
  }
};
