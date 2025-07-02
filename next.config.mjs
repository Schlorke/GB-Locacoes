/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {},              // ✅ Precisa ser objeto (não booleano)
    serverActions: {},      // ✅ Precisa ser objeto (não booleano)
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // ❌ Removido: devIndicators obsoleto no Next 15+
}

export default nextConfig
