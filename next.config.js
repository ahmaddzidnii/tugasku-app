/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [process.env.NEXT_PUBLIC_WEB_DOMAIN],
    },
  },
};

module.exports = nextConfig;
