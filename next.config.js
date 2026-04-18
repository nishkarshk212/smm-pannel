/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent static generation of API routes that use database
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  // Ensure API routes are always dynamic
  serverRuntimeConfig: {
    dynamic: 'force-dynamic',
  },
};

module.exports = nextConfig;
