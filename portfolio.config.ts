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
  /** One line under the name. Keep it short - it is also the meta description. */
  tagline: "Software developer building systems, developer tools and applied AI.",
  /** Longer form, used for Open Graph and the social hover cards. */
  description:
    "I build developer tools, data-intensive systems, full-stack products, and applied-AI experiments with an emphasis on deterministic behavior, explainability, testing, and public proof of work.",
  location: "India",
  /** Professional photograph for social cards and link previews. */
  avatar: "/profile/avatar.jpg",
  /** Decorative homepage avatar, selected by the owner. */
  heroAvatar: "/profile/iron-man.jpg",
  initials: "AK",
  // Keep the development preview noindex until the owner approves release.
  referencePreview: true,
  contactFormEnabled: false,
  intro: "I build developer tools, data-intensive systems, full-stack products, and applied-AI experiments.",
  about: [
    "Second-year BCA student at Deen Dayal Upadhyaya Gorakhpur University, specializing in Machine Learning and Data Science.",
    "I care about deterministic behavior, explainability, testing and public proof of work.",
    "I contribute upstream when I can, including fixes and regression coverage in CLI11, Manim and OpenTrace.",
  ],
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
    github: "Systems, developer tools and applied AI.",
    x: "",
    linkedin: "Software developer and BCA student specializing in Machine Learning and Data Science.",
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
