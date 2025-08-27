import type { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient | undefined

const createPrismaClient = async (): Promise<PrismaClient> => {
  console.log('[Prisma] Creating new client instance')
  
  // Verificar se DATABASE_URL existe
  if (!process.env.DATABASE_URL) {
    console.error('[Prisma] DATABASE_URL not found in environment variables')
    console.error('[Prisma] Available env vars:', Object.keys(process.env).filter(k => k.includes('DATABASE')))
    throw new Error('DATABASE_URL environment variable is required')
  }

  console.log('[Prisma] DATABASE_URL found, creating client...')

  try {
    // Import dinâmico para evitar problemas durante o build
    const { PrismaClient } = await import('@prisma/client')
    
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    })

    console.log('[Prisma] Client created successfully')
    return client
  } catch (error) {
    console.error('[Prisma] Failed to create client:', error)
    throw error
  }
}

// Função para obter a instância do Prisma com lazy loading
export const getPrisma = async (): Promise<PrismaClient> => {
  const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
  }

  // Usar instância global se disponível (desenvolvimento)
  if (process.env.NODE_ENV !== 'production' && globalForPrisma.prisma) {
    return globalForPrisma.prisma
  }

  // Usar instância local se disponível
  if (prismaInstance) {
    return prismaInstance
  }

  // Criar nova instância
  try {
    prismaInstance = await createPrismaClient()
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance
    }
    
    return prismaInstance
  } catch (error) {
    console.error('[Prisma] Failed to initialize client:', error)
    
    // Em ambientes de build, tentar uma vez mais
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      console.log('[Prisma] Retrying initialization for production/Vercel...')
      try {
        prismaInstance = await createPrismaClient()
        return prismaInstance
      } catch (retryError) {
        console.error('[Prisma] Retry failed:', retryError)
        throw retryError
      }
    }
    
    throw error
  }
}

// Export para compatibilidade (será lazy)
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    throw new Error('Use getPrisma() instead of direct prisma access')
  }
})

// Função para diagnóstico de problemas de deployment
export function diagnosticInfo(): {
  environment: string
  databaseUrl: boolean
  prismaVersion: string
  nodeVersion: string
  platform: string
} {
  return {
    environment: process.env.NODE_ENV || 'unknown',
    databaseUrl: !!process.env.DATABASE_URL,
    prismaVersion:
      process.env.npm_package_dependencies__prisma_client || 'unknown',
    nodeVersion: process.version,
    platform: process.platform,
  }
}

// Função para verificar conectividade
export async function checkDatabaseConnection(): Promise<{
  connected: boolean
  error?: string
  details?: {
    code?: string
    type: string
    timestamp: string
  }
}> {
  try {
    await prisma.$connect()
    await prisma.$queryRaw`SELECT 1`
    await prisma.$disconnect()

    return { connected: true }
  } catch (error) {
    return {
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: {
        code:
          error instanceof Error && 'code' in error
            ? String(error.code)
            : undefined,
        type: error?.constructor?.name || 'Unknown',
        timestamp: new Date().toISOString(),
      },
    }
  }
}

// Função para forçar reconexão
export async function reconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect()
    await prisma.$connect()
    console.log('Database reconnection successful')
  } catch (error) {
    console.error('Database reconnection failed:', error)
    throw error
  }
}
