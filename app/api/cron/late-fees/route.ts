import { NextRequest, NextResponse } from 'next/server'
import { calculateAndApplyLateFees } from '@/lib/late-fee-calculator'

/**
 * Endpoint para cron job - Calcular e aplicar multas por atraso
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

    const result = await calculateAndApplyLateFees()

    return NextResponse.json({
      success: true,
      message: 'Late fees calculated and applied',
      ...result,
    })
  } catch (error) {
    console.error('Error in late fees cron job:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
