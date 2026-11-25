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
      }
    ]
  }
];
