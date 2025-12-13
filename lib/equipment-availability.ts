import { prisma } from '@/lib/prisma'
import { isEquipmentInMaintenance } from './maintenance-automation'

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

  // Verificar se equipamento está em manutenção
  const inMaintenance = await isEquipmentInMaintenance(equipmentId)

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
        },
      },
    },
  })

  // Calcular quantidade bloqueada por locações
  const blockedByRentals = activeRentals.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

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
    return {
      available: false,
      reason: 'Equipamento está em manutenção',
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
