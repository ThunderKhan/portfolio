/**
 * The one file to edit when you fork this portfolio.
 *
 * Everything here is identity: who the site is about and where to find them.
 * Page *content* - roles, projects, skills, highlights - lives in `src/data/`.
 * See SETUP.md for the full list and what each file expects.
 */

export const portfolio = {
  /** Shown in the hero, page titles and social cards. */
  name: "Ayan Khan",
  /** Compact identity used by social cards, the terminal and structured data. */
  tagline: "Software developer · Open-source contributor",
  /** Longer form, used for Open Graph and the social hover cards. */
  description:
    "Ayan Khan is a software developer and BCA student in Machine Learning and Data Science, interested in systems, developer tools, open source and applied AI.",
  location: "India",
  /** Professional photograph for social cards and link previews. */
  avatar: "/profile/avatar.jpg",
  /** Decorative homepage avatar, selected by the owner. */
  heroAvatar: "/profile/iron-man.jpg",
  initials: "AK",
  contactFormEnabled: false,
  intro: "I’m a software developer who enjoys understanding how things work, from programming languages to machine learning. I learn by building things, questioning assumptions, and working with other developers.",
  about: [
    "Studying Machine Learning and Data Science as part of my BCA at Deen Dayal Upadhyaya Gorakhpur University.",
    "I build developer tools in C++ and Python, including diff2test, a test-impact analyzer, and refute, a tool for checking proposed software fixes against executable evidence.",
    "Currently a software engineering intern at VSPH and a member of Runtime Conditions. My open-source work spans cross-platform testing, numerical correctness and API integrations.",
  ],
  /** Two-line closing motto, selected by the owner. */
  motto: ["If I must fall,", "let it be from a great height."],
  publishedLeetCodeSolved: "220+",
  /** IANA zone for the live clock in the banner. */
  timeZone: "Asia/Kolkata",
  /** UTC offset label shown on the social hover cards. */
  utcOffset: "UTC +05:30",

  /** Canonical origin. NEXT_PUBLIC_SITE_URL overrides this at build time. */
  url: "https://ayankhan.me",

  /**
   * Usernames only, never full URLs - the code builds the links and the stats
   * fetchers query these directly. Leave a value empty to hide that profile.
   */
  handles: {
    github: "ThunderKhan",
    linkedin: "the-ayan-khan",
    x: "ThunderBorneK",
    leetcode: "ThunderKhan",
    codeforces: "",
    codechef: "",
  },

  /** This site's own source, linked in the footer. Set to "" to hide the link. */
  repo: "https://github.com/ThunderKhan/portfolio",

  email: "AyanKhanOffiiciall@gmail.com",
  /** Path under /public. Swap the file and this string together. */
  resume: "/Ayan_Khan_Resume.pdf",
  /** "Book an intro call" button. Set to "" to hide it. */
  bookingLink: "",

  /**
   * Search Console verification. Paste the `content` value from Google's
   * "HTML tag" method here - just the token, not the whole <meta> tag. Left
   * empty, no verification tag is emitted.
   */
  googleSiteVerification: "",

  /** Optional technical writing section. */
  sections: {
    blog: true,
  },

  /**
   * Profile blurbs for the hover cards. GitHub's is replaced by the live bio
   * when the API answers; the other two are always read from here because
   * X and LinkedIn block unauthenticated requests.
   */
  bios: {
    github: "Systems, developer tools, open source and applied AI.",
    x: "",
    linkedin: "Software developer, open-source contributor and BCA student in Machine Learning and Data Science.",
  },

  /**
   * X and LinkedIn give no public follower count, so there is nothing to fetch.
   * Put real numbers here to show them, or leave null to show no stat row.
   */
  followers: {
    x: null as string | null,
    linkedin: null as string | null,
  },
} as const;

export type PortfolioConfig = typeof portfolio;
