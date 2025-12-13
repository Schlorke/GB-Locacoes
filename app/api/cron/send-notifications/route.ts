import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Cron job para enviar notificações automáticas
 * Executa a cada hora
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar se é uma chamada autorizada (Vercel Cron ou com secret)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const results = {
      rentalReminders: 0,
      overdueAlerts: 0,
      maintenanceAlerts: 0,
      errors: [] as string[],
    }

    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // 1. Lembretes de devolução (24h antes)
    try {
      const rentalsDueTomorrow = await prisma.rentals.findMany({
        where: {
          status: 'ACTIVE',
          enddate: {
            gte: now,
            lte: tomorrow,
          },
        },
        include: {
          users: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      })

      for (const _rental of rentalsDueTomorrow) {
        // Em produção, enviar email/SMS/WhatsApp
        // await sendRentalReminderEmail(_rental)
        results.rentalReminders++
      }
    } catch (error) {
      results.errors.push(
        `Rental reminders: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }

    // 2. Alertas de locações atrasadas
    try {
      const overdueRentals = await prisma.rentals.findMany({
        where: {
          status: 'ACTIVE',
          enddate: {
            lt: now,
          },
        },
        include: {
          users: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      })

      for (const rental of overdueRentals) {
        // Atualizar status para OVERDUE
        await prisma.rentals.update({
          where: { id: rental.id },
          data: { status: 'OVERDUE' },
        })

        // Em produção, enviar email/SMS/WhatsApp
        // await sendOverdueAlertEmail(rental)
        results.overdueAlerts++
      }
    } catch (error) {
      results.errors.push(
        `Overdue alerts: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }

    // 3. Alertas de manutenção vencida
    try {
      const overdueMaintenances = await prisma.maintenance.findMany({
        where: {
          status: 'SCHEDULED',
          scheduledAt: {
            lt: now,
          },
        },
        include: {
          equipment: {
            select: {
              name: true,
            },
          },
        },
      })

      for (const _maintenance of overdueMaintenances) {
        // Em produção, enviar email/SMS/WhatsApp para equipe de manutenção
        // await sendMaintenanceAlertEmail(_maintenance)
        results.maintenanceAlerts++
      }
    } catch (error) {
      results.errors.push(
        `Maintenance alerts: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Notifications processed',
      results,
    })
  } catch (error) {
    console.error('Error in send-notifications cron:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Configuração do Vercel Cron
export const dynamic = 'force-dynamic'
