import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  async headers() {
    return [{
      source: "/images/shelf/:path*",
      headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
    }];
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@designcodeio/threeui": path.resolve(process.cwd(), "components/threeui"),
    };
    config.module.rules.push({ test: /\.html$/, resourceQuery: /raw/, type: "asset/source" });
    return config;
  },
};
export default nextConfig;
