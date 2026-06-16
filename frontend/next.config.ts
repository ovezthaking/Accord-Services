import type { NextConfig } from "next";

const backendUrl = process.env.BACKEND_URL || process.env.NEXT_BACKEND_URL ||"https://accord-backend-lyart.vercel.app";

const nextConfig: NextConfig = {
  trailingSlash: false, 
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
          source: "/api/realizations/:path*",
          destination: `${backendUrl}/api/realizations/:path*`,
      },
      {
          source: "/api/gallery/:path*",
          destination: `${backendUrl}/api/gallery/:path*`,
      },
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
  async redirects() {
    return [
      // --- Stare .html / strony bezpośrednie ---
      {
        source: '/pompy.html',
        destination: '/uslugi/pompy-ciepla',
        permanent: true,
      },
      {
        source: '/wentylacja.html',
        destination: '/uslugi/rekuperacja',
        permanent: true,
      },
      {
        source: '/historia.html',
        destination: '/#o-nas',
        permanent: true,
      },

      // --- Stare PDF-y (katalogi producentów) → strona główna ---
      {
        source: '/kaisaic.pdf',
        destination: '/',
        permanent: true,
      },
      {
        source: '/rotensok.pdf',
        destination: '/',
        permanent: true,
      },
      {
        source: '/kaisaik.pdf',
        destination: '/',
        permanent: true,
      },
      {
        source: '/vaillantpc.pdf',
        destination: '/uslugi/pompy-ciepla',
        permanent: true,
      },
      {
        source: '/vailantpk.pdf',
        destination: '/uslugi/pompy-ciepla',
        permanent: true,
      },
      {
        source: '/vaillantrc.pdf',
        destination: '/uslugi/rekuperacja',
        permanent: true,
      },

      // --- Stara ścieżka /uslugi/pompy-ciepla (już poprawna, ale może być bez www) ---
      // Jeśli masz już ten route w Next.js, ten redirect nie jest potrzebny.

      // --- WordPress permalinks ---
      {
        source: '/wordpress/index.php/fotowoltaika/',
        destination: '/uslugi/fotowoltaika',
        permanent: true,
      },
      {
        source: '/wordpress/index.php/fotowoltaika',
        destination: '/uslugi/fotowoltaika',
        permanent: true,
      },
      {
        source: '/wordpress/index.php/rekuperacja/',
        destination: '/uslugi/rekuperacja',
        permanent: true,
      },
      {
        source: '/wordpress/index.php/rekuperacja',
        destination: '/uslugi/rekuperacja',
        permanent: true,
      },
      {
        source: '/wordpress/index.php/klimatyzacja/',
        destination: '/uslugi/klimatyzacja',
        permanent: true,
      },
      {
        source: '/wordpress/index.php/klimatyzacja',
        destination: '/uslugi/klimatyzacja',
        permanent: true,
      },
      {
        source: '/wordpress/index.php/kontakt/',
        destination: '/#kontakt',
        permanent: true,
      },
      {
        source: '/wordpress/index.php/kontakt',
        destination: '/#kontakt',
        permanent: true,
      },

      // --- Catch-all dla pozostałych /wordpress/* ścieżek → strona główna ---
      {
        source: '/wordpress/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
