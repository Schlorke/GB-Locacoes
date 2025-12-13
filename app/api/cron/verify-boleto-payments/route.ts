import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getBoletoGateway } from '@/lib/payment-gateways/boleto'
import { processPayment } from '@/lib/payment-processor'

/**
 * Cron job para verificar status de boletos pendentes
 * Deve ser executado diariamente (ex: via Vercel Cron)
 *
 * Verifica:
 * - Boletos pendentes que podem ter sido pagos
 * - Boletos vencidos que devem ser marcados como OVERDUE
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar se é chamada autorizada (Vercel Cron ou com secret)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const results = {
      checked: 0,
      paid: 0,
      overdue: 0,
      errors: 0,
    }

    // Buscar boletos pendentes
    const pendingBoletos = await prisma.payment.findMany({
      where: {
        method: 'BOLETO',
        status: 'PENDING',
        transactionId: {
          not: null,
        },
      },
      take: 100, // Limitar para não sobrecarregar
    })

    const gateway = getBoletoGateway()

    // Verificar cada boleto
    for (const payment of pendingBoletos) {
      try {
        results.checked++

        if (!payment.transactionId) continue

        // Verificar status no gateway
        const verification = await gateway.verifyPayment(payment.transactionId)

        // Atualizar status se necessário
        if (verification.status === 'paid' && payment.status !== 'PAID') {
          await processPayment(payment.id, {
            status: 'PAID',
            paidAt: verification.paidAt || new Date(),
          })
          results.paid++
        } else if (
          verification.status === 'overdue' &&
          payment.status !== 'OVERDUE'
        ) {
          await prisma.payment.update({
            where: { id: payment.id },
            data: { status: 'OVERDUE' },
          })
          results.overdue++
        }

        // Verificar se boleto venceu (mesmo sem resposta do gateway)
        if (payment.dueDate < now && payment.status === 'PENDING') {
          await prisma.payment.update({
            where: { id: payment.id },
            data: { status: 'OVERDUE' },
          })
          results.overdue++
        }
      } catch (error) {
        console.error(`Error verifying boleto ${payment.id}:`, error)
        results.errors++
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      results,
    })
  } catch (error) {
    console.error('Error in verify-boleto-payments cron:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Permitir execução via cron
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
