import { NextRequest, NextResponse } from 'next/server'
import { checkAndExpireQuotes } from '@/lib/quote-validity'

/**
 * Endpoint para cron job - Verificar e expirar orçamentos
 * Deve ser chamado periodicamente (ex: diariamente)
 *
 * Proteção: Verificar header de autorização ou secret
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar secret para segurança (em produção, usar variável de ambiente)
    const authHeader = request.headers.get('authorization')
    const cronSecret =
      process.env.CRON_SECRET || 'default-secret-change-in-production'

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await checkAndExpireQuotes()

    return NextResponse.json({
      success: true,
      message: 'Quotes checked and expired',
      ...result,
    })
  } catch (error) {
    console.error('Error in expire quotes cron job:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
