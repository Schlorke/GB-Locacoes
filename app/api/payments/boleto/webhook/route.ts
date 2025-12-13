import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { processPayment } from '@/lib/payment-processor'
import crypto from 'crypto'

/**
 * Webhook para receber notificações de pagamento de boleto do gateway
 * Valida assinatura e atualiza status do pagamento
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-webhook-signature') || ''
    const webhookSecret = process.env.BOLETO_WEBHOOK_SECRET || ''

    // Validar assinatura do webhook (em produção, implementar validação real)
    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex')

      if (signature !== expectedSignature) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        )
      }
    }

    const data = JSON.parse(body)

    // Estrutura esperada do webhook (pode variar por gateway)
    const {
      transactionId,
      status,
      paidAt,
      amount: _amount,
    }: {
      transactionId: string
      status: 'pending' | 'paid' | 'overdue' | 'cancelled'
      paidAt?: string
      amount?: number
    } = data

    if (!transactionId) {
      return NextResponse.json(
        { error: 'transactionId is required' },
        { status: 400 }
      )
    }

    // Buscar pagamento pelo transactionId
    const payment = await prisma.payment.findFirst({
      where: {
        transactionId,
        method: 'BOLETO',
      },
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    // Processar atualização de status
    if (status === 'paid' && payment.status !== 'PAID') {
      await processPayment(payment.id, {
        status: 'PAID',
        paidAt: paidAt ? new Date(paidAt) : new Date(),
      })
    } else if (status === 'overdue' && payment.status !== 'OVERDUE') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'OVERDUE' },
      })
    } else if (status === 'cancelled' && payment.status !== 'CANCELLED') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'CANCELLED' },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing boleto webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
