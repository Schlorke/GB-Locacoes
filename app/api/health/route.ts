import { NextResponse } from 'next/server'
import { diagnosticInfo, checkDatabaseConnection } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  console.log('[Health Check] Starting comprehensive diagnostics...')

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
      // Novos diagnósticos
      prisma_diagnostics: {} as Record<string, unknown>,
    }

    console.log('[Health Check] Getting Prisma diagnostics...')
    healthCheck.prisma_diagnostics = diagnosticInfo()

    // Testar conexão com banco se DATABASE_URL estiver configurado
    if (process.env.DATABASE_URL) {
      console.log('[Health Check] Testing database connection...')
      try {
        const dbStatus = await checkDatabaseConnection()

        if (dbStatus.connected) {
          healthCheck.database.status = 'connected'
          console.log('[Health Check] ✅ Database connection successful')
        } else {
          healthCheck.database.status = 'error'
          healthCheck.database.error = {
            message: dbStatus.error || 'Unknown database error',
            code: dbStatus.details?.code || 'UNKNOWN',
            type: dbStatus.details?.type || 'Unknown',
          }
          console.log(
            '[Health Check] ❌ Database connection failed:',
            dbStatus.error
          )
        }
        healthCheck.database.connection = 'success'

        // Não precisa desconectar aqui, o checkDatabaseConnection já faz isso
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
