/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  env: {
    CHROMATIC_PROJECT_TOKEN: 'chpt_ed7c61c0587a8b0',
  },

  // Configuração específica para Vercel + Prisma
  serverExternalPackages: ['@prisma/client', 'prisma'],

  // Configurações experimentais para melhor compatibilidade
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },

  // Configuração webpack específica para Vercel
  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      // Configuração específica para build de produção na Vercel
      config.externals.push({
        '@prisma/client': '@prisma/client',
      })
    }
    return config
  },
}

export default nextConfig
