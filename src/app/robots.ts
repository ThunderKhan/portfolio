import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { portfolio } from "~/portfolio.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      // Allow crawlers to see the preview's noindex directive.
      allow: "/",
      disallow: "/api/",
    },
    ...(!portfolio.referencePreview ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}),
  };
}
