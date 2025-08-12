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

// Lazy initialization to avoid build-time issues
let _prisma: PrismaClient | undefined

const getPrismaClient = () => {
  if (_prisma) return _prisma

  if (process.env.NODE_ENV === 'production') {
    _prisma = new PrismaClient({
      log: ['error'],
    })
  } else {
    if (!globalThis.__prisma) {
      globalThis.__prisma = prismaClientSingleton()
    }
    _prisma = globalThis.__prisma
  }

  return _prisma
}

// Export the client instance
export const prisma = getPrismaClient()
export default getPrismaClient
