import type { Metadata } from "next";
import { portfolio } from "~/portfolio.config";
import { SITE_URL } from "@/lib/site";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

const socialImage = {
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
  height: 630,
  alt: `${portfolio.name} - ${portfolio.tagline}`,
};

export function pageMetadata({
  path,
  title,
  description,
  publishedAt,
}: {
  path: string;
  title: string;
  description: string;
  publishedAt?: string;
}): Metadata {
  const fullTitle = path === "/" ? portfolio.name : `${title} | ${portfolio.name}`;
  const url = absoluteUrl(path);
  const common = {
    title: fullTitle,
    description,
    url,
    siteName: portfolio.name,
    images: [socialImage],
  };

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: publishedAt
      ? { ...common, type: "article", publishedTime: publishedAt, authors: [absoluteUrl("/")] }
      : { ...common, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
      ...(portfolio.handles.x ? { site: `@${portfolio.handles.x}`, creator: `@${portfolio.handles.x}` } : {}),
    },
  };
}

export const homeMetadata = pageMetadata({
  path: "/",
  title: portfolio.name,
  description: portfolio.description,
});

export const archivePages = {
  "/projects": { title: "Projects", description: `Developer tools, full-stack systems, applied AI experiments and engineering case studies by ${portfolio.name}.` },
  "/experience": { title: "Experience", description: `Software engineering and AI training experience, responsibilities and technical achievements by ${portfolio.name}.` },
  "/open-source": { title: "Open Source Contributions", description: `Selected upstream fixes, regression tests and pull requests by ${portfolio.name}.` },
  "/blogs": { title: "Technical Writing", description: `Engineering articles, experiments and technical case studies by ${portfolio.name}.` },
  "/certifications": { title: "Certifications", description: `Course completion, training and digital credentials earned by ${portfolio.name}.` },
  "/highlights": { title: "Highlights", description: `Hackathons, community events and personal engineering milestones by ${portfolio.name}.` },
  "/contact": { title: "Contact", description: `Contact ${portfolio.name} about software engineering opportunities, open source and technical collaborations.` },
} as const;

export function archiveMetadata(path: keyof typeof archivePages): Metadata {
  return pageMetadata({ path, ...archivePages[path] });
}
