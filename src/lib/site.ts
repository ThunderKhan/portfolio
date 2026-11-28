import { portfolio } from "~/portfolio.config";
import { isPublicRelease, isTelemetryEnabled } from "@/lib/release-policy";

/**
 * Canonical origin, in one place. metadataBase, the sitemap and robots.txt all
 * read from here. The release policy independently checks the deployment target.
 */
export const SITE_URL = new URL(process.env.NEXT_PUBLIC_SITE_URL || portfolio.url).origin;

export const PUBLIC_RELEASE = isPublicRelease(process.env, portfolio.url);
export const ENABLE_TELEMETRY = isTelemetryEnabled(process.env, portfolio.url);
