import type { MetadataRoute } from "next";
import { projectsData } from "@/data/projectsData";
import { blogPosts } from "@/data/blogsData";
import { absoluteUrl, archivePages } from "@/lib/seo";
import { PUBLIC_RELEASE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!PUBLIC_RELEASE) return [];

  // Do not use a build timestamp as a content modification date.
  // Add lastModified only when a reliable content-specific date is available.
  const paths = [
    "/",
    ...Object.keys(archivePages),
    ...projectsData.map((project) => `/projects/${project.slug}`),
    ...blogPosts.map((post) => post.link),
  ];

  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
