import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    // Prevent canvas from being bundled server-side (Three.js needs browser canvas)
    if (isServer) {
      config.externals = [...(config.externals || []), 'canvas']
    }
    return config
  },
}
export default nextConfig
