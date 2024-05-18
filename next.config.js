/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_PUBLIC_WEB_DOMAIN],
    },
  },
};

module.exports = nextConfig;
