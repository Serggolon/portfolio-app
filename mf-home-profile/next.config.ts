import NextFederationPlugin from "@module-federation/nextjs-mf";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "homeProfile",
        filename: "static/chunks/remoteEntry.js",

        shared: {},
        extraOptions: {},
      })
    );
    return config;
  },
};

export default nextConfig;
//        exposes: { "./HomeProfile": "./src/pages/index.tsx" },