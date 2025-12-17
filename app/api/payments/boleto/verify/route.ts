import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { getBoletoGateway } from '@/lib/payment-gateways/boleto'
import { processPayment } from '@/lib/payment-processor'

const VerifyBoletoSchema = z.object({
  paymentId: z.string(),
})

// POST - Verificar status de pagamento do boleto
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { paymentId } = VerifyBoletoSchema.parse(body)

    // Buscar pagamento
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        rental: true,
        quote: true,
      },
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Pagamento não encontrado' },
        { status: 404 }
      )
    }

    if (payment.method !== 'BOLETO') {
      return NextResponse.json(
        { error: 'Este pagamento não é um boleto' },
        { status: 400 }
      )
    }

    if (!payment.transactionId) {
      return NextResponse.json(
        { error: 'Boleto não possui transactionId' },
        { status: 400 }
      )
    }

    // Verificar status no gateway
    const gateway = getBoletoGateway()
    const verification = await gateway.verifyPayment(payment.transactionId)

    // Atualizar status do pagamento se necessário
    if (verification.status === 'paid' && payment.status !== 'PAID') {
      await processPayment(paymentId, {
        status: 'PAID',
        paidAt: verification.paidAt || new Date(),
      })
    } else if (
      verification.status === 'overdue' &&
      payment.status !== 'OVERDUE'
    ) {
      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'OVERDUE' },
      })
    } else if (
      verification.status === 'cancelled' &&
      payment.status !== 'CANCELLED'
    ) {
      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'CANCELLED' },
      })
    } else if (
      verification.status === 'refunded' &&
      payment.status !== 'REFUNDED'
    ) {
      await prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'REFUNDED' },
      })
    }

    // Buscar pagamento atualizado
    const updatedPayment = await prisma.payment.findUnique({
      where: { id: paymentId },
    })

    return NextResponse.json({
      payment: updatedPayment
        ? {
            ...updatedPayment,
            amount: updatedPayment.amount.toString(),
          }
        : null,
      verification: {
        status: verification.status,
        paidAt: verification.paidAt,
        amount: verification.amount,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error verifying boleto:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
