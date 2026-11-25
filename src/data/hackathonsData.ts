export type Hackathon = {
  id: string;
  event: string;
  organizer: string;
  placement: string;
  scale: string;
  dates: string;
  project: string;
  problem: string;
  built: string[];
  principle?: string;
  team?: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
  links?: { label: string; href: string }[];
};

export const hackathonsData: Hackathon[] = [
  {
    "id": "build-with-ai-devops-2026",
    "event": "Build With AI: DevOps — Season 1",
    "organizer": "GDG On Campus, DDUGU",
    "placement": "Second Runner-Up",
    "scale": "Campus hackathon",
    "dates": "Nov 2026",
    "project": "IET Grid",
    "problem": "Campus scheduling needs a consistent view of classroom availability, academic commitments and booking approvals.",
    "built": [
      "Built a campus scheduling and classroom management prototype as team leader of std::zero.",
      "Combined selectable floor maps and original plan views with availability, bookings and role-scoped dashboards.",
      "Implemented authenticated FastAPI and Supabase/PostgreSQL workflows with conflict-safe booking constraints and academic notices. Official timetable imports and independent live-user acceptance remain outstanding."
    ],
    "team": [
      "Vivek Shukla",
      "Shreydhar Dubey"
    ],
    "tech": [
      "React",
      "TypeScript",
      "FastAPI",
      "Supabase",
      "PostgreSQL"
    ],
    "metrics": [
      {
        "label": "Placement",
        "value": "3rd"
      },
      {
        "label": "Team size",
        "value": "3"
      },
      {
        "label": "Floor plans",
        "value": "5"
      },
      {
        "label": "Role",
        "value": "Lead"
      }
    ],
    "links": [
      {
        "label": "Repository",
        "href": "https://github.com/ThunderKhan/iet-grid"
      },
      {
        "label": "Project details",
        "href": "/projects/iet-grid"
      }
    ]
  },
  {
    "id": "zero-dependency-2026",
    "event": "Zero Dependency Hackathon 2026",
    "organizer": "Hackathon Raptors",
    "placement": "Top 10%",
    "scale": "Online · 72 hours",
    "dates": "Aug 2026",
    "project": "diff2test",
    "problem": "Reduce unnecessary CTest execution while maintaining conservative selection guarantees.",
    "built": [
      "Built diff2test with team std::zero using C++20 and the standard library alone.",
      "Reconstructed affected tests from compiler, CMake and CTest metadata, widening selection when evidence was incomplete.",
      "The Certificate of Excellence records rank 29 of 295 and a score of 4.293 out of 5."
    ],
    "tech": [
      "C++20",
      "CMake",
      "CTest"
    ],
    "metrics": [
      {
        "label": "Rank",
        "value": "29 / 295"
      },
      {
        "label": "Score",
        "value": "4.293 / 5"
      },
      {
        "label": "Duration",
        "value": "72h"
      },
      {
        "label": "Result",
        "value": "Top 10%"
      }
    ],
    "links": [
      {
        "label": "Project details",
        "href": "/projects/diff2test"
      },
      {
        "label": "Competition result",
        "href": "https://zerodepshack.com/projects#p-10"
      },
      {
        "label": "View certificate of excellence",
        "href": "/certificates/hackathons/zero-dependency-2026.png"
      }
    ]
  },
  {
    "id": "hackblox-2026",
    "event": "HACKBLOX 2026",
    "organizer": "Hackers Cult",
    "placement": "Final-round qualifier",
    "scale": "Online final round",
    "dates": "Sep 2026",
    "project": "Corsair — Ably integration",
    "problem": "Agent integration platforms need controlled access to real-time messaging services.",
    "built": [
      "Contributed an Ably integration to the open-source Corsair project during Stage 1.",
      "The contribution was reviewed and merged upstream.",
      "Qualified for the online final round scheduled for 5 September 2026. No final ranked placement is claimed."
    ],
    "tech": [
      "Open Source",
      "TypeScript",
      "Ably",
      "GitHub"
    ],
    "metrics": [
      {
        "label": "Selection",
        "value": "Final round"
      },
      {
        "label": "Contribution",
        "value": "Merged"
      }
    ],
    "links": [
      {
        "label": "Merged Ably PR #865",
        "href": "https://github.com/corsairdev/corsair/pull/865"
      },
      {
        "label": "View participation certificate",
        "href": "/certificates/hackathons/hackblox-2026.pdf"
      },
      {
        "label": "View finale qualification ticket",
        "href": "/certificates/hackathons/hackblox-2026-finalist.png"
      }
    ]
  },
  {
    "id": "sih-2026-internal",
    "event": "Smart India Hackathon 2026",
    "organizer": "SOCC, Institute of Engineering & Technology, DDUGU — internal screening",
    "placement": "Internal nomination",
    "scale": "University internal screening",
    "dates": "Aug 2026",
    "project": "O.A.S.I.S.",
    "problem": "Screening and referral workflows need to make red flags, eligibility and clinical uncertainty legible.",
    "built": [
      "Led team Syntax6 during the university internal screening held 12–14 August 2026.",
      "Developed and presented an explainable clinician-facing screening and referral-prioritisation prototype.",
      "The internal results notice dated 15 August recorded the team as nominated (top 60%). This is not a national-final qualification or ranked award."
    ],
    "tech": [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "scikit-learn"
    ],
    "metrics": [
      {
        "label": "Internal selection",
        "value": "Top 60%"
      },
      {
        "label": "Role",
        "value": "Lead"
      }
    ],
    "links": [
      {
        "label": "Repository",
        "href": "https://github.com/ThunderKhan/oasis"
      },
      {
        "label": "Project details",
        "href": "/projects/oasis"
      },
      {
        "label": "View participation certificate",
        "href": "/certificates/hackathons/sih-2026.jpg"
      }
    ]
  }
];
