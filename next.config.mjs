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
    // Outras configurações experimentais podem ser adicionadas aqui
  },
  
  // Garantir que o Prisma seja incluído no bundle
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client')
    }
    return config
  },
}

export default nextConfig
