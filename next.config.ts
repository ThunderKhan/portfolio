import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the existing npm workflow; emit a traced server only for container builds.
  ...(process.env.PORTFOLIO_DOCKER_BUILD === "1" ? { output: "standalone" as const } : {}),
  async redirects() {
    return [
      { source: "/blogs/cpp-test-impact-analysis-zero-runtime-dependencies", destination: "/blogs/001", permanent: true },
      { source: "/blog/cpp-test-impact-analysis-zero-runtime-dependencies", destination: "/blogs/001", permanent: true },
      { source: "/blog/i-built-c-test-impact-analysis-with-zero-runtime-dependencies", destination: "/blogs/001", permanent: true },
    ];
  },
  images: {
    deviceSizes: [360, 414, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 2678400,
    qualities: [60, 70, 75, 90, 100],
    // Portfolio images are owner-supplied local assets; no remote image hosts required.
    remotePatterns: [],
  },
};

export default nextConfig;
