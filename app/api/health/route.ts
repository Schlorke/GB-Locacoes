import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Health check endpoint para manter o database acordado
 * Configure um Vercel Cron para chamar esta rota a cada 5 minutos
 */
export async function GET() {
  try {
    // Query simples para manter conexão ativa
    await prisma.$queryRaw`SELECT 1`

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
    })
  } catch (error) {
    console.error('Health check failed:', error)

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    )
  }
}

// Configuração do Vercel Cron
// Runtime padrão (Node.js) é necessário para Prisma funcionar
export const dynamic = 'force-dynamic'
export const maxDuration = 10 // Timeout de 10 segundos
