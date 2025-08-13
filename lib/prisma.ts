import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })
}

// FIXED: Global singleton pattern to prevent multiple instances
// This avoids "@prisma/client did not initialize yet" in serverless
let _prisma: PrismaClient | undefined

export function getPrismaClient(): PrismaClient {
  if (_prisma) return _prisma

  // Use global instance in development to prevent hot reload issues
  if (process.env.NODE_ENV === 'development') {
    if (!globalThis.__prisma) {
      globalThis.__prisma = prismaClientSingleton()
    }
    _prisma = globalThis.__prisma
  } else {
    // Production: create new instance per Lambda
    _prisma = prismaClientSingleton()
  }

  return _prisma
}

// Export for backward compatibility - but prefer dynamic imports
export const prisma = getPrismaClient()
