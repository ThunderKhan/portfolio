import { portfolio } from "~/portfolio.config";
import { absoluteUrl } from "@/lib/seo";

const homeUrl = absoluteUrl("/");
const personId = absoluteUrl("/#person");
const websiteId = absoluteUrl("/#website");
const profileId = absoluteUrl("/#profile");

export function profileStructuredData() {
  const { github, linkedin, x, leetcode } = portfolio.handles;
  const sameAs = [
    github && `https://github.com/${github}`,
    linkedin && `https://www.linkedin.com/in/${linkedin}/`,
    x && `https://x.com/${x}`,
    leetcode && `https://leetcode.com/u/${leetcode}/`,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: portfolio.name,
        url: homeUrl,
        description: portfolio.tagline,
        image: absoluteUrl(portfolio.avatar),
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: portfolio.name,
        url: homeUrl,
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": profileId,
        url: homeUrl,
        name: portfolio.name,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}

export function articleStructuredData(post: {
  link: string;
  title: string;
  description?: string;
  publishedAt?: string;
}) {
  const url = absoluteUrl(post.link);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Person", "@id": personId, name: portfolio.name, url: homeUrl },
    isPartOf: { "@id": websiteId },
  };
}
