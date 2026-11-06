import type { NextConfig } from "next";

// A static export: `next build` writes plain HTML, CSS and JS to out/, which any static host (Netlify) serves.
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
