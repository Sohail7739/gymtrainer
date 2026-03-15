/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['images.unsplash.com', 'unsplash.com'],
    unoptimized: true
  },
  experimental: {
    suppressHydrationWarning: true,
  },
}

module.exports = nextConfig