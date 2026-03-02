import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.accord.opole.pl",
      },
      {
        protocol: "https",
        hostname: "www.accord.opole.pl",
      },
    ],
  },
};

export default nextConfig;
