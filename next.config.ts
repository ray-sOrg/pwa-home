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
  // 空的 turbopack 配置，让 Next.js 16 使用 Turbopack
  // next-pwa 的 webpack 配置会在生产构建时自动处理
  turbopack: {},
};

export default withPWA(nextConfig);
