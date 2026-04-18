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
  // Exclude API routes from static generation
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = nextConfig;
