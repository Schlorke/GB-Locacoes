import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const healthCheck = {
      status: 'ok' as 'ok' | 'error',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      database: {
        status: 'unknown' as
          | 'unknown'
          | 'connected'
          | 'error'
          | 'not_configured',
        connection: null as string | null,
        error: null as {
          message: string
          code: string
          type: string
        } | null,
      },
      environment_vars: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'configured' : 'missing',
        DIRECT_URL: process.env.DIRECT_URL ? 'configured' : 'missing',
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
          ? 'configured'
          : 'missing',
      },
    }

    // Testar conexão com banco se DATABASE_URL estiver configurado
    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma')

        // Testar conexão com timeout
        const connectionPromise = prisma.$connect()
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Connection timeout')), 5000)
        )

        await Promise.race([connectionPromise, timeoutPromise])

        // Testar query simples
        await prisma.$queryRaw`SELECT 1`

        healthCheck.database.status = 'connected'
        healthCheck.database.connection = 'success'

        // Fechar conexão
        await prisma.$disconnect()
      } catch (dbError) {
        healthCheck.database.status = 'error'
        healthCheck.database.error = {
          message:
            dbError instanceof Error
              ? dbError.message
              : 'Unknown database error',
          code:
            dbError instanceof Error && 'code' in dbError
              ? String(dbError.code)
              : 'UNKNOWN',
          type: dbError?.constructor?.name || 'Unknown',
        }

        // Se o banco falhar, marcar status geral como error
        healthCheck.status = 'error'
      }
    } else {
      healthCheck.database.status = 'not_configured'
    }

    const statusCode = healthCheck.status === 'ok' ? 200 : 503

    return NextResponse.json(healthCheck, { status: statusCode })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
