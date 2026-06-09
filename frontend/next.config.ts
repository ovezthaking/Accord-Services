import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL || "https://accord-backend-lyart.vercel.app";

const nextConfig: NextConfig = {
  trailingSlash: false, 
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: `${backendUrl}/admin/:path*`,
      },
      {
        source: "/static/:path*",
        destination: `${backendUrl}/static/:path*`,
      },
      {
        source: "/media/:path*",
        destination: `${backendUrl}/media/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
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
