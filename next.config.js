/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["cdn.simpleicons.org", "raw.githubusercontent.com"],
  },
};

module.exports = nextConfig;
