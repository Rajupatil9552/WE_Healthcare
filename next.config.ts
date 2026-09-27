import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Technology & Security and Quality became single pages; keep old sub-page URLs working.
  async redirects() {
    const page = "/technology-security";
    return [
      // Request a Demo is the contact form with "demo" pre-selected.
      { source: "/request-a-demo", destination: "/contact?inquiry=demo", permanent: true },
      { source: "/technology", destination: page, permanent: true },
      { source: "/technology/pacs-ris-integration", destination: `${page}#pacs-ris-integration`, permanent: true },
      { source: "/technology/dicom-workflow", destination: `${page}#dicom-workflow`, permanent: true },
      { source: "/technology/secure-image-transfer", destination: `${page}#secure-image-transfer`, permanent: true },
      { source: "/technology/security-compliance", destination: `${page}#security-compliance`, permanent: true },
      { source: "/technology/credentialing-licensing", destination: page, permanent: true },
      // Quality became one page as well.
      { source: "/quality/radiologists", destination: "/quality#radiologists", permanent: true },
      { source: "/quality/quality-control", destination: "/quality#quality-control", permanent: true },
      { source: "/quality/reporting-workflow", destination: "/quality#reporting-workflow", permanent: true },
      { source: "/quality/critical-findings", destination: "/quality#critical-findings", permanent: true },
      { source: "/quality/client-reporting-analytics", destination: "/quality#reporting-visibility", permanent: true },
      { source: "/quality/operations-support", destination: "/quality#operations-support", permanent: true },
    ];
  },
  experimental: {
    // Import only the icons / motion pieces actually used, not whole barrels.
    optimizePackageImports: ["@phosphor-icons/react", "motion"],
  },
  images: {
    // AVIF first (smaller), WebP fallback; optimized images cache for 30 days.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        // Temporary hero photography source (see components/sections/hero.tsx).
        // Remove once a licensed/original asset replaces the Unsplash placeholder.
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
