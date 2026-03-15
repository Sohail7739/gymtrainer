/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/gymtrainer' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/gymtrainer/' : '',
  images: {
    domains: ['images.unsplash.com', 'unsplash.com'],
    unoptimized: true
  },
}

module.exports = nextConfig