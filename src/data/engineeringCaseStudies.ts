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
  }
};
