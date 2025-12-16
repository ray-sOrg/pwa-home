import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // 注意：next-pwa 不支持 Turbopack，构建时使用 Webpack
};

export default withPWA(nextConfig);
