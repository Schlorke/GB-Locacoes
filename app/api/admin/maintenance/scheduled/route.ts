import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { MaintenanceStatus, MaintenanceType } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { checkOverdueMaintenances } from '@/lib/maintenance-automation'

// GET - Listar manutenções agendadas com alertas de vencidas
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const equipmentId = searchParams.get('equipmentId')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const includeOverdue = searchParams.get('includeOverdue') === 'true'

    const where: Prisma.MaintenanceWhereInput = {
      status: {
        in: ['SCHEDULED', 'IN_PROGRESS'],
      },
    }

    if (equipmentId) where.equipmentId = equipmentId
    if (status) where.status = status as MaintenanceStatus
    if (type) where.type = type as MaintenanceType
    if (startDate || endDate) {
      where.scheduledAt = {}
      if (startDate) where.scheduledAt.gte = new Date(startDate)
      if (endDate) where.scheduledAt.lte = new Date(endDate)
    }

    const maintenances = await prisma.maintenance.findMany({
      where,
      include: {
        equipment: {
          select: {
            id: true,
            name: true,
            images: true,
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        scheduledAt: 'asc',
      },
    })

    // Buscar manutenções vencidas se solicitado
    let overdueAlerts: Array<{
      id: string
      equipmentId: string
      equipmentName: string
      scheduledAt: Date
      daysOverdue: number
      type: MaintenanceType
    }> = []

    if (includeOverdue) {
      overdueAlerts = await checkOverdueMaintenances()
    }

    return NextResponse.json({
      maintenances,
      overdueAlerts,
      overdueCount: overdueAlerts.length,
    })
  } catch (error) {
    console.error('Error fetching scheduled maintenances:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
