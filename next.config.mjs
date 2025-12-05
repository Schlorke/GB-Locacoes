/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
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
  env: {},
  // Otimização: não gerar estaticamente rotas que precisam de autenticação
  // ou que dependem muito do banco de dados durante build
  experimental: {
    // Reduzir timeouts de geração estática
    staticGenerationTimeout: 30, // 30 segundos ao invés de 60
  },
}

export default nextConfig
