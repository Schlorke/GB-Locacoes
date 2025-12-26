import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

/**
 * Webhook para receber notificações de pagamento PIX do gateway
 * Em produção, integrar com gateway real (Gerencianet, Mercado Pago, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    // Validar assinatura do webhook (em produção, implementar validação real)
    const signature = request.headers.get('x-webhook-signature') || ''
    const webhookSecret = process.env.PIX_WEBHOOK_SECRET || ''

    // Validar assinatura do webhook (em produção, implementar validação real)
    if (webhookSecret) {
      const body = await request.text()
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

    const payload = await request.json()

    // Estrutura esperada do webhook (pode variar por gateway)
    // Exemplo: { paymentId: string, status: 'PAID' | 'FAILED', transactionId: string }
    const { paymentId, status, transactionId, paidAt } = payload

    if (!paymentId || !status) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    // Buscar pagamento
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        rental: {
          include: {
            users: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
        quote: {
          include: {
            user: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        },
      },
    })

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    // Atualizar status do pagamento
    const updateData: {
      status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED' | 'REFUNDED'
      paidAt?: Date
      transactionId?: string
    } = {
      status:
        status === 'PAID'
          ? 'PAID'
          : status === 'CANCELLED'
            ? 'CANCELLED'
            : 'PENDING',
    }

    if (status === 'PAID') {
      updateData.paidAt = paidAt ? new Date(paidAt) : new Date()
      updateData.transactionId = transactionId
    }

    await prisma.payment.update({
      where: { id: paymentId },
      data: updateData,
    })

    // Se pagamento foi confirmado, atualizar status da locação se aplicável
    if (status === 'PAID' && payment.rentalId) {
      const rental = await prisma.rentals.findUnique({
        where: { id: payment.rentalId },
        include: {
          payments: true,
          users: {
            select: {
              id: true,
            },
          },
        },
      })

      if (rental) {
        // Verificar se todos os pagamentos foram pagos
        const allPaymentsPaid = rental.payments.every(
          (p) => p.status === 'PAID'
        )

        // Se todos os pagamentos foram pagos e locação está pendente, ativar
        if (allPaymentsPaid && rental.status === 'PENDING') {
          await prisma.rentals.update({
            where: { id: payment.rentalId },
            data: {
              status: 'ACTIVE',
            },
          })

          // Gerar notificação de locação ativada
          if (rental.users?.id) {
            try {
              const { NotificationService } =
                await import('@/lib/notification-service')
              await NotificationService.createRentalActive(
                rental.users.id,
                rental.id
              )
            } catch (notificationError) {
              console.error(
                'Erro ao criar notificação de locação ativada:',
                notificationError
              )
            }
          }
        }

        // Gerar notificação de pagamento recebido
        if (rental.users?.id) {
          try {
            const { NotificationService } =
              await import('@/lib/notification-service')
            await NotificationService.createPaymentReceived(
              rental.users.id,
              payment.id,
              Number(payment.amount),
              payment.method
            )
          } catch (notificationError) {
            console.error(
              'Erro ao criar notificação de pagamento recebido:',
              notificationError
            )
          }
        }
      }
    }

    // Em produção, enviar email de confirmação ao cliente
    // await sendPaymentConfirmationEmail(payment)

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
    })
  } catch (error) {
    console.error('Error processing PIX webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
