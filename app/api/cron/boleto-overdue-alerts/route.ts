import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
// import { sendEmail } from '@/lib/email' // TODO: Implementar quando sistema de email estiver pronto

/**
 * Cron job para enviar alertas de boletos próximos ao vencimento ou vencidos
 * Deve ser executado diariamente (ex: via Vercel Cron)
 *
 * Envia alertas para:
 * - Boletos que vencem em 1 dia
 * - Boletos vencidos há menos de 3 dias
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar se é chamada autorizada
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(23, 59, 59, 999)

    const threeDaysAgo = new Date(now)
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    const results = {
      dueTomorrow: 0,
      overdue: 0,
      emailsSent: 0,
      errors: 0,
    }

    // Boletos que vencem amanhã
    const dueTomorrow = await prisma.payment.findMany({
      where: {
        method: 'BOLETO',
        status: 'PENDING',
        dueDate: {
          gte: new Date(
            tomorrow.getFullYear(),
            tomorrow.getMonth(),
            tomorrow.getDate()
          ),
          lte: tomorrow,
        },
      },
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

    // Boletos vencidos há menos de 3 dias
    const overdue = await prisma.payment.findMany({
      where: {
        method: 'BOLETO',
        status: {
          in: ['PENDING', 'OVERDUE'],
        },
        dueDate: {
          gte: threeDaysAgo,
          lt: now,
        },
      },
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

    results.dueTomorrow = dueTomorrow.length
    results.overdue = overdue.length

    // Enviar alertas (por enquanto, apenas logar - implementar email depois)
    for (const payment of [...dueTomorrow, ...overdue]) {
      try {
        const customer = payment.rental?.users || payment.quote?.user
        if (!customer?.email) continue

        // TODO: Implementar envio de email quando sistema estiver pronto
        // await sendEmail({
        //   to: customer.email,
        //   subject: payment.dueDate > now
        //     ? 'Seu boleto vence amanhã'
        //     : 'Seu boleto está vencido',
        //   template: 'boleto-alert',
        //   data: {
        //     customerName: customer.name,
        //     amount: Number(payment.amount),
        //     dueDate: payment.dueDate,
        //     paymentId: payment.id,
        //   },
        // })

        console.log(
          `[BOLETO ALERT] ${customer.email} - Payment ${payment.id} - ${payment.dueDate > now ? 'Vence amanhã' : 'Vencido'}`
        )
        results.emailsSent++
      } catch (error) {
        console.error(`Error sending alert for payment ${payment.id}:`, error)
        results.errors++
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      results,
    })
  } catch (error) {
    console.error('Error in boleto-overdue-alerts cron:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
