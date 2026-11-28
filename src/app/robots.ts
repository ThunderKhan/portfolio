import type { MetadataRoute } from "next";
import { SITE_URL, PUBLIC_RELEASE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Allow crawlers to see the preview's noindex directive.
      allow: "/",
      disallow: "/api/",
    },
    ...(PUBLIC_RELEASE ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
  };
}
