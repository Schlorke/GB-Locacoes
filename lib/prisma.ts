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

// Detectar se está usando Transaction Pooler (porta 6543) ou Session Pooler (porta 5432)
const isTransactionPooler = connectionString.includes(':6543/')

// Criar pool compartilhado para serverless (Vercel)
// Transaction Pooler (6543) suporta mais conexões mas não prepared statements
// Session Pooler (5432) suporta prepared statements mas tem limite menor
const pool =
  global.__pool ||
  new Pool({
    connectionString,
    // Configurações otimizadas para serverless
    max: isTransactionPooler ? 2 : 1, // Transaction Pooler pode ter mais conexões
    idleTimeoutMillis: 30000, // Fechar conexões ociosas após 30s
    connectionTimeoutMillis: 10000, // Timeout de conexão de 10s
    // Desabilitar prepared statements se usando Transaction Pooler
    statement_timeout: isTransactionPooler ? 0 : undefined,
  })

// SEMPRE salvar no global (tanto dev quanto produção) para compartilhar pool
global.__pool = pool

const adapter = new PrismaPg(pool)

// Configuração explícita do Prisma Client com driver adapter pg
const prisma =
  global.__prisma ||
  new PrismaClient({
    adapter,
  })

// SEMPRE salvar no global para compartilhar instância entre requisições serverless
global.__prisma = prisma

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
