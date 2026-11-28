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
  }
};
