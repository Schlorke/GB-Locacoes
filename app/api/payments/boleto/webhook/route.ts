import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { parseAsaasWebhook } from '@/lib/payment-gateways/asaas'
import { processPayment } from '@/lib/payment-processor'

/**
 * Webhook para receber notificações de pagamento de boleto do gateway (Asaas)
 * Valida token/assinatura e atualiza o status do pagamento
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-webhook-signature') || ''
    const headerToken =
      request.headers.get('asaas-access-token') ||
      request.headers.get('access_token') ||
      request.headers.get('x-hook-token') ||
      request.nextUrl.searchParams.get('access_token') ||
      ''

    const webhookSecret =
      process.env.ASAAS_WEBHOOK_SECRET ||
      process.env.BOLETO_WEBHOOK_SECRET ||
      ''

    // Validação simples de token ou HMAC (mantém compatibilidade com configs antigas)
    if (webhookSecret) {
      if (headerToken && headerToken === webhookSecret) {
        // ok
      } else if (signature) {
        const expectedSignature = crypto
          .createHmac('sha256', webhookSecret)
          .update(rawBody)
          .digest('hex')

        if (signature !== expectedSignature) {
          return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 401 }
          )
        }
      } else {
        return NextResponse.json(
          { error: 'Invalid webhook token' },
          { status: 401 }
        )
      }
    }

    const data = rawBody ? JSON.parse(rawBody) : {}
    const parsed = parseAsaasWebhook(data)

    if (!parsed.transactionId) {
      return NextResponse.json(
        { error: 'transactionId is required' },
        { status: 400 }
      )
    }

    const status = parsed.status
    if (!status) {
      return NextResponse.json(
        { error: 'Status not provided in webhook' },
        { status: 400 }
      )
    }

    const payment = await prisma.payment.findFirst({
      where: {
        transactionId: parsed.transactionId,
        method: 'BOLETO',
      },
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    if (status === 'paid' && payment.status !== 'PAID') {
      await processPayment(payment.id, {
        status: 'PAID',
        paidAt: parsed.paidAt || new Date(),
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
    } else if (status === 'refunded' && payment.status !== 'REFUNDED') {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'REFUNDED' },
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
