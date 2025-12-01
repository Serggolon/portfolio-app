import NextFederationPlugin from "@module-federation/nextjs-mf";
import type { NextConfig } from "next";

const remote = (isServer: boolean) => {
  const location = isServer ? "ssr" : "chunks";

  const baseURL = process.env.NEXT_PUBLIC_HOME_PROFILE_URL;
  const pureBaseURL = baseURL?.endsWith("/") ? baseURL.slice(0, -1) : baseURL;

  return {
    homeProfile: `homeProfile@${pureBaseURL}/_next/static/${location}/remoteEntry.js`,
  };
};

//NODE_ENV_COMMAND needed for correct standalone output because of Next is setting NODE_ENV to production during build
//but we need to know what env was used to run the build command
const nextConfig: NextConfig = {
  output: process.env.BUILD_ENV === 'production' ? 'standalone' : undefined,
  reactStrictMode: true,

  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        filename: "static/chunks/remoteEntry.js",
        exposes: {},
        remotes: remote(options.isServer),
        shared: {},
        extraOptions: {},
      })
    );
    return config;
  },
};

export default nextConfig;
