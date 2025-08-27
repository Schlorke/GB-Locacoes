import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient | undefined

// Configuração específica para Vercel
const createPrismaConfig = () => {
  const isVercel = !!process.env.VERCEL
  const isProduction = process.env.NODE_ENV === 'production'
  
  console.log('[Prisma] Environment:', { isVercel, isProduction })
  
  // Configuração básica sempre presente
  const baseConfig = {
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  }

  // Configurações condicionais
  const conditionalConfig: Record<string, unknown> = {}

  // Configuração específica para Vercel
  if (isVercel && isProduction) {
    conditionalConfig.engineType = 'binary'
    console.log('[Prisma] Using binary engine for Vercel production')
  }

  // Log apenas em desenvolvimento
  if (!isProduction) {
    conditionalConfig.log = ['error', 'warn']
  } else {
    conditionalConfig.log = ['error']
  }

  return { ...baseConfig, ...conditionalConfig }
}

const createPrismaClient = (): PrismaClient => {
  console.log('[Prisma] Creating new client instance')

  // Verificar se DATABASE_URL existe
  if (!process.env.DATABASE_URL) {
    console.error('[Prisma] DATABASE_URL not found in environment variables')
    console.error(
      '[Prisma] Available env vars:',
      Object.keys(process.env).filter((k) => k.includes('DATABASE'))
    )
    throw new Error('DATABASE_URL environment variable is required')
  }

  console.log('[Prisma] DATABASE_URL found, creating client...')

  try {
    const prismaConfig = createPrismaConfig()
    console.log('[Prisma] Config:', JSON.stringify(prismaConfig, null, 2))
    
    const client = new PrismaClient(prismaConfig)
    console.log('[Prisma] Client created successfully')
    return client
  } catch (error) {
    console.error('[Prisma] Failed to create client:', error)
    throw error
  }
}

// Singleton pattern com Proxy para inicialização lazy
const prismaClientProxy = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!prismaInstance) {
      console.log('[Prisma] Lazy initializing client...')
      prismaInstance = createPrismaClient()
    }

    const value = prismaInstance[prop as keyof PrismaClient]

    if (typeof value === 'function') {
      return value.bind(prismaInstance)
    }

    return value
  },
})

// Export principal
export const prisma = prismaClientProxy

// Função alternativa para casos específicos
export const getPrisma = (): PrismaClient => {
  if (!prismaInstance) {
    prismaInstance = createPrismaClient()
  }
  return prismaInstance
}

// Função para verificar conexão com banco de dados com timeout
export async function checkDatabaseConnection(): Promise<{
  connected: boolean
  error?: string
  details?: { code: string; type: string }
}> {
  try {
    const client = getPrisma()
    
    // Implementar timeout manual para evitar hang
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database connection timeout')), 10000)
    })
    
    const queryPromise = client.$queryRaw`SELECT 1`
    
    await Promise.race([queryPromise, timeoutPromise])
    return { connected: true }
  } catch (error: unknown) {
    console.error('[Prisma] Database connection failed:', error)
    const errorObj = error as Error & { code?: string }
    return {
      connected: false,
      error: errorObj?.message || 'Unknown database error',
      details: {
        code: errorObj?.code || 'UNKNOWN',
        type: errorObj?.name || 'Unknown',
      },
    }
  }
}

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
    prismaVersion: '6.15.0',
    nodeVersion: process.version,
    platform: process.platform,
  }
}
