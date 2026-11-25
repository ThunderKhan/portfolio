export type Highlight = {
  id: string;
  title: string;
  badge: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageFit?: "cover" | "contain";
  cardWidth?: number;
  link?: string;
};

/**
 * Real proof, each linked to the post announcing it. Entries without an image
 * render as the blueprint-grid placeholder card, so adding one is optional.
 */
export const highlightsData: Highlight[] = [
  {
    "id": "iet-grid-award",
    "title": "Second runner-up — Build With AI: DevOps Season 1",
    "badge": "Hackathon",
    "image": "",
    "imageWidth": 0,
    "imageHeight": 0,
    "link": "/projects/iet-grid"
  },
  {
    "id": "osci-2026",
    "title": "Selected contributor — Open Source Connect India 2026",
    "badge": "Open source",
    "image": "",
    "imageWidth": 0,
    "imageHeight": 0
  },
  {
    "id": "nasa-arset",
    "title": "Completed NASA ARSET Fundamentals of Remote Sensing",
    "badge": "Learning",
    "image": "",
    "imageWidth": 0,
    "imageHeight": 0
  },
  {
    "id": "ml-course-1",
    "title": "Completed Supervised Machine Learning: Regression and Classification",
    "badge": "Learning",
    "image": "",
    "imageWidth": 0,
    "imageHeight": 0
  },
  {
    "id": "sih-internal",
    "title": "Smart India Hackathon 2026 — university internal nomination",
    "badge": "Hackathon",
    "image": "",
    "imageWidth": 0,
    "imageHeight": 0,
    "link": "/projects/oasis"
  }
];
