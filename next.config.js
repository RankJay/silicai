/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ],
  },
}

module.exports = nextConfig
