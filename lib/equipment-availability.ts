import { prisma } from '@/lib/prisma'
import {
  isEquipmentInMaintenance,
  getMaintenanceBlockingInfo,
} from './maintenance-automation'

/**
 * Calcula disponibilidade de equipamento considerando:
 * - Locações ativas
 * - Manutenções em andamento
 * - Estoque máximo
 */
export interface AvailabilityResult {
  available: boolean
  availableQuantity: number
  totalQuantity: number
  blockedByMaintenance: boolean
  blockedByRentals: number // Quantidade bloqueada por locações
}

export async function calculateEquipmentAvailability(
  equipmentId: string,
  startDate: Date,
  endDate: Date
): Promise<AvailabilityResult> {
  // Buscar equipamento
  const equipment = await prisma.equipment.findUnique({
    where: { id: equipmentId },
    select: {
      id: true,
      maxStock: true,
      available: true,
    },
  })

  if (!equipment) {
    throw new Error('Equipamento não encontrado')
  }

  const maxStock = equipment.maxStock || 1

  // Verificar se equipamento está em manutenção que interfere com o período
  const inMaintenance = await isEquipmentInMaintenance(
    equipmentId,
    startDate,
    endDate
  )

  // Se estiver em manutenção, não está disponível
  if (inMaintenance) {
    return {
      available: false,
      availableQuantity: 0,
      totalQuantity: maxStock,
      blockedByMaintenance: true,
      blockedByRentals: 0,
    }
  }

  // Buscar locações ativas no período
  const activeRentals = await prisma.rental_items.findMany({
    where: {
      equipmentid: equipmentId,
      rentals: {
        status: {
          in: ['PENDING', 'ACTIVE', 'OVERDUE', 'PENDING_RETURN'],
        },
        OR: [
          {
            AND: [
              { startdate: { lte: endDate } },
              { enddate: { gte: startDate } },
            ],
          },
        ],
      },
    },
    include: {
      rentals: {
        select: {
          id: true,
          startdate: true,
          enddate: true,
          status: true,
          quote: {
            select: {
              status: true,
            },
          },
        },
      },
    },
  })

  // Calcular quantidade bloqueada por locações
  const blockedByRentals = activeRentals.reduce((sum, item) => {
    const rental = item.rentals
    const isPending = rental.status === 'PENDING'
    const quotePending =
      rental.quote && rental.quote.status && rental.quote.status !== 'APPROVED'

    // Só bloqueia estoque se:
    // - não for PENDING, OU
    // - for PENDING, mas o orçamento já estiver APPROVED ou não existir quote
    const blocksInventory =
      rental.status !== 'PENDING' || (isPending && !quotePending)

    return blocksInventory ? sum + item.quantity : sum
  }, 0)

  const availableQuantity = Math.max(0, maxStock - blockedByRentals)

  return {
    available: availableQuantity > 0 && !inMaintenance,
    availableQuantity,
    totalQuantity: maxStock,
    blockedByMaintenance: inMaintenance,
    blockedByRentals,
  }
}

/**
 * Verifica se equipamento está disponível para locação em um período
 */
export async function isEquipmentAvailableForRental(
  equipmentId: string,
  startDate: Date,
  endDate: Date,
  requestedQuantity: number = 1
): Promise<{ available: boolean; reason?: string }> {
  const availability = await calculateEquipmentAvailability(
    equipmentId,
    startDate,
    endDate
  )

  if (availability.blockedByMaintenance) {
    // Obter informações detalhadas sobre a manutenção que está bloqueando
    const maintenanceInfo = await getMaintenanceBlockingInfo(
      equipmentId,
      startDate,
      endDate
    )

    return {
      available: false,
      reason: maintenanceInfo.reason || 'Equipamento está em manutenção',
    }
  }

  if (availability.availableQuantity < requestedQuantity) {
    return {
      available: false,
      reason: `Apenas ${availability.availableQuantity} unidade(s) disponível(is). Solicitado: ${requestedQuantity}`,
    }
  }

  return { available: true }
}
