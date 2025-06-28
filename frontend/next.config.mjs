/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // keep this if you don’t want Next.js to optimize images
    remotePatterns: [
    {
      protocol: "https",
      hostname: "m.media-amazon.com",
    },]
  },
}

export default nextConfig
