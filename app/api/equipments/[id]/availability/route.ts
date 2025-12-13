import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * @openapi
 * /api/equipments/{id}/availability:
 *   get:
 *     tags: [Equipment]
 *     summary: Verifica disponibilidade de equipamento
 *     description: |
 *       Retorna a disponibilidade de um equipamento para um período específico.
 *       Considera locações ativas e estoque máximo do equipamento.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do equipamento
 *       - name: startDate
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Data inicial do período (opcional)
 *       - name: endDate
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Data final do período (opcional)
 *       - name: month
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{2}$'
 *         description: Mês para buscar disponibilidade (formato YYYY-MM)
 *     responses:
 *       200:
 *         description: Disponibilidade do equipamento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 equipmentId:
 *                   type: string
 *                 month:
 *                   type: string
 *                 availability:
 *                   type: object
 *                   additionalProperties:
 *                     type: object
 *                     properties:
 *                       available:
 *                         type: boolean
 *                       availableQuantity:
 *                         type: number
 *                       totalQuantity:
 *                         type: number
 *                       blockedBy:
 *                         type: array
 *                         items:
 *                           type: object
 *                 maxStock:
 *                   type: number
 *       404:
 *         description: Equipamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params
    const { searchParams } = new URL(request.url)
    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')
    const monthParam = searchParams.get('month')

    // Buscar equipamento
    const equipment = await prisma.equipment.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        maxStock: true,
      },
    })

    if (!equipment) {
      return NextResponse.json(
        { error: 'Equipamento não encontrado' },
        { status: 404 }
      )
    }

    const maxStock = equipment.maxStock || 1

    // Determinar período a verificar
    let startDate: Date
    let endDate: Date
    let month: string

    if (monthParam) {
      // Buscar disponibilidade para um mês específico
      const parts = monthParam.split('-').map(Number)
      const year = parts[0]
      const monthNum = parts[1]

      if (!year || !monthNum || isNaN(year) || isNaN(monthNum)) {
        return NextResponse.json(
          { error: 'Formato de mês inválido. Use YYYY-MM' },
          { status: 400 }
        )
      }

      startDate = new Date(year, monthNum - 1, 1)
      endDate = new Date(year, monthNum, 0) // Último dia do mês
      month = monthParam
    } else if (startDateParam && endDateParam) {
      // Buscar disponibilidade para um período específico
      startDate = new Date(startDateParam)
      endDate = new Date(endDateParam)
      month = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`
    } else {
      // Padrão: mês atual
      const now = new Date()
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    }

    // Buscar locações ativas no período que se sobrepõem com o período solicitado
    const activeRentals = await prisma.rentals.findMany({
      where: {
        rental_items: {
          some: {
            equipmentid: params.id,
          },
        },
        status: 'ACTIVE',
        AND: [
          {
            startdate: {
              lte: endDate,
            },
          },
          {
            enddate: {
              gte: startDate,
            },
          },
        ],
      },
      include: {
        rental_items: {
          where: {
            equipmentid: params.id,
          },
        },
      },
    })

    // Calcular disponibilidade por dia
    const availability: Record<
      string,
      {
        available: boolean
        availableQuantity: number
        totalQuantity: number
        blockedBy?: Array<{
          rentalId: string
          startDate: string
          endDate: string
          quantity: number
        }>
        blockedByMaintenance?: boolean
      }
    > = {}

    // Inicializar todos os dias do período
    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      const dateKey = currentDate.toISOString().split('T')[0]!
      let rentedQuantity = 0
      const blockedBy: Array<{
        rentalId: string
        startDate: string
        endDate: string
        quantity: number
      }> = []

      // Verificar quantas unidades estão alugadas neste dia
      for (const rental of activeRentals) {
        const rentalStart = new Date(rental.startdate)
        const rentalEnd = new Date(rental.enddate)

        if (currentDate >= rentalStart && currentDate <= rentalEnd) {
          const rentalItem = rental.rental_items[0]
          if (rentalItem) {
            rentedQuantity += rentalItem.quantity
            blockedBy.push({
              rentalId: rental.id,
              startDate: rentalStart.toISOString().split('T')[0]!,
              endDate: rentalEnd.toISOString().split('T')[0]!,
              quantity: rentalItem.quantity,
            })
          }
        }
      }

      const availableQuantity = Math.max(0, maxStock - rentedQuantity)

      availability[dateKey] = {
        available: availableQuantity > 0,
        availableQuantity,
        totalQuantity: maxStock,
        ...(blockedBy.length > 0 && { blockedBy }),
      }

      // Avançar para o próximo dia
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return NextResponse.json({
      equipmentId: params.id,
      month,
      availability,
      maxStock,
    })
  } catch (error) {
    console.error('Error checking availability:', error)
    return NextResponse.json(
      { error: 'Erro ao verificar disponibilidade' },
      { status: 500 }
    )
  }
}
