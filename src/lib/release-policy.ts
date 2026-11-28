type ReleaseEnvironment = Record<string, string | undefined>;

/**
 * Fail closed. NODE_ENV=production is also used by local builds and previews.
 * The Git branch and deployment target must be Vercel's system environment
 * variables, not manually configured project variables. CI simulates them
 * only in an isolated loopback verification job.
 */
export function isPublicRelease(env: ReleaseEnvironment, canonicalOrigin: string): boolean {
  if (
    env.NODE_ENV !== "production" ||
    env.VERCEL_ENV !== "production" ||
    env.VERCEL_GIT_COMMIT_REF !== "main" ||
    env.PORTFOLIO_PUBLIC_RELEASE !== "1"
  ) return false;

  try {
    const expected = new URL(canonicalOrigin);
    const configured = new URL(env.NEXT_PUBLIC_SITE_URL || canonicalOrigin);
    return expected.protocol === "https:" &&
      configured.origin === expected.origin &&
      configured.pathname === "/" &&
      !configured.search && !configured.hash &&
      !configured.username && !configured.password;
  } catch {
    return false;
  }
}

export function isTelemetryEnabled(env: ReleaseEnvironment, canonicalOrigin: string): boolean {
  return isPublicRelease(env, canonicalOrigin) && env.PORTFOLIO_ENABLE_TELEMETRY === "1";
}

export function previewIndexHeaders(env: ReleaseEnvironment, canonicalOrigin: string): { key: string; value: string }[] {
  return isPublicRelease(env, canonicalOrigin) ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
}
