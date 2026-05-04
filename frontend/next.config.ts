import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  /* config options here */
};

export default nextConfig;
