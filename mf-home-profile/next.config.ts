import NextFederationPlugin from "@module-federation/nextjs-mf";

import type { NextConfig } from "next";

//NODE_ENV_COMMAND needed for correct standalone output because of Next is setting NODE_ENV to production during build
//but we need to know what env was used to run the build command
const nextConfig: NextConfig = {
  output: process.env.NODE_ENV_COMMAND === 'production' ? 'standalone' : undefined,
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
};

export default nextConfig;
