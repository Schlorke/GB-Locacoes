import { prisma } from '@/lib/prisma'
import { MaintenanceType } from '@prisma/client'

/**
 * Marca equipamento como indisponível quando manutenção está em progresso
 */
export async function markEquipmentUnavailableForMaintenance(
  equipmentId: string
): Promise<void> {
  await prisma.equipment.update({
    where: { id: equipmentId },
    data: { available: false },
  })
}

/**
 * Marca equipamento como disponível quando manutenção é completada
 * Verifica se não há outras manutenções ativas antes de marcar como disponível
 */
export async function markEquipmentAvailableAfterMaintenance(
  equipmentId: string
): Promise<void> {
  // Verificar se há outras manutenções ativas para este equipamento
  const activeMaintenances = await prisma.maintenance.findFirst({
    where: {
      equipmentId,
      status: {
        in: ['SCHEDULED', 'IN_PROGRESS'],
      },
    },
  })

  // Se não houver manutenções ativas, marcar como disponível
  if (!activeMaintenances) {
    await prisma.equipment.update({
      where: { id: equipmentId },
      data: { available: true },
    })
  }
}

/**
 * Verifica manutenções vencidas e retorna lista de alertas
 */
export async function checkOverdueMaintenances(): Promise<
  Array<{
    id: string
    equipmentId: string
    equipmentName: string
    scheduledAt: Date
    daysOverdue: number
    type: MaintenanceType
  }>
> {
  const now = new Date()
  const overdueMaintenances = await prisma.maintenance.findMany({
    where: {
      status: {
        in: ['SCHEDULED', 'IN_PROGRESS'],
      },
      scheduledAt: {
        lt: now,
      },
    },
    include: {
      equipment: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      scheduledAt: 'asc',
    },
  })

  return overdueMaintenances.map((maintenance) => {
    const daysOverdue = Math.floor(
      (now.getTime() - maintenance.scheduledAt.getTime()) /
        (1000 * 60 * 60 * 24)
    )

    return {
      id: maintenance.id,
      equipmentId: maintenance.equipmentId,
      equipmentName: maintenance.equipment.name,
      scheduledAt: maintenance.scheduledAt,
      daysOverdue,
      type: maintenance.type,
    }
  })
}

/**
 * Calcula próxima data de manutenção preventiva baseada em regras
 */
export interface PreventiveMaintenanceRules {
  /** Intervalo em dias desde última manutenção */
  daysInterval?: number
  /** Intervalo em horas de uso (se horímetro disponível) */
  hoursInterval?: number
  /** Número de locações desde última manutenção */
  rentalsInterval?: number
}

export async function calculateNextPreventiveMaintenanceDate(
  equipmentId: string,
  rules: PreventiveMaintenanceRules
): Promise<Date | null> {
  // Buscar última manutenção preventiva completada
  const lastPreventive = await prisma.maintenance.findFirst({
    where: {
      equipmentId,
      type: 'PREVENTIVE',
      status: 'COMPLETED',
    },
    orderBy: {
      completedAt: 'desc',
    },
  })

  // Buscar equipamento para verificar horímetro
  const equipment = await prisma.equipment.findUnique({
    where: { id: equipmentId },
    select: {
      hourMeter: true,
      odometer: true,
    },
  })

  if (!equipment) {
    return null
  }

  const now = new Date()
  let nextDate: Date | null = null

  // Calcular baseado em dias desde última manutenção
  if (rules.daysInterval && lastPreventive?.completedAt) {
    const daysSinceLastMaintenance = Math.floor(
      (now.getTime() - lastPreventive.completedAt.getTime()) /
        (1000 * 60 * 60 * 24)
    )

    if (daysSinceLastMaintenance >= rules.daysInterval) {
      // Já passou do intervalo, agendar para hoje
      nextDate = now
    } else {
      // Agendar para quando completar o intervalo
      nextDate = new Date(
        lastPreventive.completedAt.getTime() +
          rules.daysInterval * 24 * 60 * 60 * 1000
      )
    }
  } else if (rules.daysInterval && !lastPreventive) {
    // Primeira manutenção preventiva, agendar para hoje
    nextDate = now
  }

  // Calcular baseado em horas de uso (se horímetro disponível)
  if (rules.hoursInterval && equipment.hourMeter) {
    // Buscar horímetro na última manutenção
    // Por enquanto, vamos usar uma lógica simplificada
    // Em produção, seria necessário armazenar horímetro na manutenção
    const currentHours = Number(equipment.hourMeter)
    const lastMaintenanceHours = lastPreventive
      ? 0 // Seria necessário armazenar isso na manutenção
      : 0

    const hoursSinceLastMaintenance = currentHours - lastMaintenanceHours

    if (hoursSinceLastMaintenance >= rules.hoursInterval) {
      // Já passou do intervalo de horas, agendar para hoje
      if (!nextDate || nextDate > now) {
        nextDate = now
      }
    }
  }

  // Calcular baseado em número de locações
  if (rules.rentalsInterval) {
    const lastMaintenanceDate = lastPreventive?.completedAt || new Date(0)
    const rentalsSinceMaintenance = await prisma.rental_items.count({
      where: {
        equipmentid: equipmentId,
        rentals: {
          createdat: {
            gte: lastMaintenanceDate,
          },
        },
      },
    })

    if (rentalsSinceMaintenance >= rules.rentalsInterval) {
      // Já passou do intervalo de locações, agendar para hoje
      if (!nextDate || nextDate > now) {
        nextDate = now
      }
    }
  }

  return nextDate
}

/**
 * Valida se equipamento pode iniciar manutenção
 * (não deve estar locado)
 */
export async function canStartMaintenance(
  equipmentId: string
): Promise<{ canStart: boolean; reason?: string }> {
  // Verificar se há locações ativas para este equipamento
  const activeRentals = await prisma.rental_items.findFirst({
    where: {
      equipmentid: equipmentId,
      rentals: {
        status: {
          in: ['PENDING', 'ACTIVE', 'OVERDUE'],
        },
      },
    },
    include: {
      rentals: {
        select: {
          id: true,
          status: true,
          startdate: true,
          enddate: true,
        },
      },
    },
  })

  if (activeRentals) {
    return {
      canStart: false,
      reason: `Equipamento está locado (Locação ${activeRentals.rentals.id})`,
    }
  }

  return { canStart: true }
}

/**
 * Verifica se equipamento está em manutenção
 */
export async function isEquipmentInMaintenance(
  equipmentId: string
): Promise<boolean> {
  const activeMaintenance = await prisma.maintenance.findFirst({
    where: {
      equipmentId,
      status: {
        in: ['SCHEDULED', 'IN_PROGRESS'],
      },
    },
  })

  return !!activeMaintenance
}
