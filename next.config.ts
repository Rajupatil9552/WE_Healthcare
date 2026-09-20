import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
