/**
 * Middleware para garantir que o Prisma Client esteja inicializado
 * antes de qualquer operação de banco de dados
 */

let isInitialized = false
let initializationPromise: Promise<void> | null = null

export async function ensurePrismaInitialized(): Promise<void> {
  if (isInitialized) {
    return
  }

  if (initializationPromise) {
    return initializationPromise
  }

  initializationPromise = (async () => {
    try {
      console.log(
        '[Prisma Middleware] Ensuring Prisma Client is initialized...'
      )

      // Verificar se o Prisma Client está disponível
      const { getPrisma } = await import('@/lib/prisma')
      const prisma = await getPrisma()

      // Testar conexão
      await prisma.$queryRaw`SELECT 1`

      isInitialized = true
      console.log('[Prisma Middleware] Prisma Client initialized successfully')
    } catch (error) {
      console.error(
        '[Prisma Middleware] Failed to initialize Prisma Client:',
        error
      )
      initializationPromise = null
      throw error
    }
  })()

  return initializationPromise
}

/**
 * Higher-order function para envolver handlers de API com inicialização do Prisma
 */
export function withPrisma<T extends (...args: unknown[]) => unknown>(
  handler: T
): T {
  return (async (...args: unknown[]) => {
    await ensurePrismaInitialized()
    return handler(...args)
  }) as T
}

/**
 * Hook para verificar o status do Prisma
 */
export function getPrismaStatus() {
  return {
    isInitialized,
    hasInitializationPromise: !!initializationPromise,
  }
}
