/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false, // Mudança: habilitar verificação de TypeScript no build
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
        hostname: 'picsum.photos',
      },
    ],
  },
  env: {
    CHROMATIC_PROJECT_TOKEN: 'chpt_ed7c61c0587a8b0',
  },
  // Otimizações específicas para Vercel + Prisma
  serverExternalPackages: ['@prisma/client', 'prisma'],

  // Configuração experimental
  experimental: {
    // Configurações experimentais conforme necessário
  },

  // REMOVIDO: Não aplicar externals para Prisma
  // serverExternalPackages já cuida disso
}

export default nextConfig
