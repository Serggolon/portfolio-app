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

const nextConfig: NextConfig = {
  output: "standalone",
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
