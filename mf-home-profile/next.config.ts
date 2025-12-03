import NextFederationPlugin from "@module-federation/nextjs-mf";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "homeProfile",
        filename: "static/chunks/remoteEntry.js",
        exposes: { "./HomeProfile": "./src/pages/index.tsx" },
        shared: {},
        extraOptions: {},
      })
    );
    return config;
  },
  extraOptions: {
    exposePagesDir: true,
    skipSharingNextInternals: true,
  },
};

export default nextConfig;
