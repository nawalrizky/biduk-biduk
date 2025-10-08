import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'backend.bidukbiduk.com',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.bidukbiduk.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
