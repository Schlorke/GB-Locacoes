import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
  var __pool: Pool | undefined
}

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

// Criar pool compartilhado para serverless (Vercel)
// Isso evita "max clients reached" ao reutilizar conexões
const pool =
  global.__pool ||
  new Pool({
    connectionString,
    // Configurações otimizadas para serverless
    max: 1, // Máximo de 1 conexão por instância serverless
    idleTimeoutMillis: 30000, // Fechar conexões ociosas após 30s
    connectionTimeoutMillis: 10000, // Timeout de conexão de 10s
  })

if (process.env.NODE_ENV !== 'production') {
  global.__pool = pool
}

const adapter = new PrismaPg(pool)

// Configuração explícita do Prisma Client com driver adapter pg
const prisma =
  global.__prisma ||
  new PrismaClient({
    adapter,
  })

if (process.env.NODE_ENV !== 'production') {
  global.__prisma = prisma
}

// Função de verificação de conexão
export async function checkDatabaseConnection(): Promise<{
  connected: boolean
  error?: string
}> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { connected: true }
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export { prisma }
