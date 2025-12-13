import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Cron job para criar automaticamente manutenções preventivas
 * Executa diariamente
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar se é uma chamada autorizada (Vercel Cron ou com secret)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Buscar equipamentos que precisam de manutenção preventiva
    const equipment = await prisma.equipment.findMany({
      where: {
        available: true,
      },
      include: {
        maintenances: {
          where: {
            type: 'PREVENTIVE',
            status: {
              in: ['COMPLETED', 'CANCELLED'],
            },
          },
          orderBy: {
            completedAt: 'desc',
          },
          take: 1,
        },
      },
    })

    const results = {
      created: 0,
      skipped: 0,
      errors: [] as string[],
    }

    for (const eq of equipment) {
      try {
        // Verificar se precisa de manutenção preventiva
        // Regra: a cada 90 dias ou a cada 100 locações (exemplo)
        const lastMaintenance = eq.maintenances[0]
        const daysSinceLastMaintenance = lastMaintenance?.completedAt
          ? Math.floor(
              (Date.now() - new Date(lastMaintenance.completedAt).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : Infinity

        // Se última manutenção foi há menos de 90 dias, pular
        if (daysSinceLastMaintenance < 90) {
          results.skipped++
          continue
        }

        // Verificar se já existe manutenção agendada
        const existingScheduled = await prisma.maintenance.findFirst({
          where: {
            equipmentId: eq.id,
            type: 'PREVENTIVE',
            status: {
              in: ['SCHEDULED', 'IN_PROGRESS'],
            },
          },
        })

        if (existingScheduled) {
          results.skipped++
          continue
        }

        // Criar manutenção preventiva agendada para 7 dias a partir de hoje
        const scheduledDate = new Date()
        scheduledDate.setDate(scheduledDate.getDate() + 7)

        await prisma.maintenance.create({
          data: {
            equipmentId: eq.id,
            type: 'PREVENTIVE',
            scheduledAt: scheduledDate,
            status: 'SCHEDULED',
            description: `Manutenção preventiva agendada automaticamente após ${daysSinceLastMaintenance} dias da última manutenção`,
          },
        })

        results.created++
      } catch (error) {
        console.error(
          `Error creating preventive maintenance for equipment ${eq.id}:`,
          error
        )
        results.errors.push(
          `Equipment ${eq.id}: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${equipment.length} equipment`,
      results,
    })
  } catch (error) {
    console.error('Error in preventive-maintenance cron:', error)
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
