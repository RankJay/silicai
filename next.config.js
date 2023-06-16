/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
        port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: '**.supabase.co',
        port: ''
      },
      {
        protocol: "https",
        hostname: 'global-uploads.webflow.com',
        port: ''
      },
    ],
  },
}

module.exports = nextConfig
