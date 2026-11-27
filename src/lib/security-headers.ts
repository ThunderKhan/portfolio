type SecurityHeader = { key: string; value: string };

// These directives do not change the rendering or resource-loading model.
const structuralPolicy = [
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'self'",
].join("; ");

// Static App Router pages and next-themes contain inline bootstrap scripts.
// Inline styles are used by motion, theme and layout components. This is a
// compatibility policy, not a strict nonce/hash-based XSS defense.
export const resourcePolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "frame-src https://open.spotify.com",
  "worker-src 'self'",
  "manifest-src 'self'",
].join("; ");

export function securityHeaders(isProduction: boolean): SecurityHeader[] {
  return [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
    // Production enforces the resource policy verified in report-only mode.
    // Development retains structural restrictions without breaking hot reload.
    {
      key: "Content-Security-Policy",
      value: isProduction ? `${structuralPolicy}; ${resourcePolicy}` : structuralPolicy,
    },
  ];
}
