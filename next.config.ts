import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        hostname: "https://avatars.githubusercontent.com",
        port: "",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
