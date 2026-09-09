import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  outputFileTracingRoot: process.cwd(),
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
