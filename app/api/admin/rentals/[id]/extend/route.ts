import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'
import { isEquipmentAvailableForRental } from '@/lib/equipment-availability'
import { createPaymentForRentalOrQuote } from '@/lib/payment-processor'
import { getBoletoGateway } from '@/lib/payment-gateways/boleto'

const ExtendRentalSchema = z.object({
  additionalDays: z.number().int().positive(),
  generateBoleto: z.boolean().optional().default(true),
  boletoDueDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
})

// POST - Prorrogar locação
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const paramsResolved = await params
    const body = await request.json()
    const { additionalDays, generateBoleto, boletoDueDate } =
      ExtendRentalSchema.parse(body)

    // Buscar locação
    const rental = await prisma.rentals.findUnique({
      where: { id: paramsResolved.id },
      include: {
        rental_items: {
          include: {
            equipments: {
              select: {
                id: true,
                name: true,
                pricePerDay: true,
              },
            },
          },
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            cnpj: true,
          },
        },
      },
    })

    if (!rental) {
      return NextResponse.json(
        { error: 'Locação não encontrada' },
        { status: 404 }
      )
    }

    if (rental.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Locação deve estar ativa para ser prorrogada' },
        { status: 400 }
      )
    }

    // Calcular nova data de término
    const currentEndDate = new Date(rental.enddate)
    const newEndDate = new Date(currentEndDate)
    newEndDate.setDate(newEndDate.getDate() + additionalDays)

    // Verificar disponibilidade dos equipamentos no período estendido
    for (const item of rental.rental_items) {
      const availability = await isEquipmentAvailableForRental(
        item.equipmentid,
        new Date(rental.startdate),
        newEndDate,
        item.quantity
      )

      if (!availability.available) {
        return NextResponse.json(
          {
            error: `Equipamento ${item.equipments.name}: ${availability.reason}`,
          },
          { status: 400 }
        )
      }
    }

    // Calcular valor adicional
    let extensionFee = new Decimal(0)
    for (const item of rental.rental_items) {
      const itemDailyPrice = new Decimal(item.priceperday.toString())
      const itemExtensionFee = itemDailyPrice
        .times(additionalDays)
        .times(item.quantity)
      extensionFee = extensionFee.plus(itemExtensionFee)
    }

    // Atualizar locação e criar pagamento em transação
    const result = await prisma.$transaction(async (tx) => {
      // Atualizar locação
      const updatedRental = await tx.rentals.update({
        where: { id: paramsResolved.id },
        data: {
          enddate: newEndDate,
          extensionDays: (rental.extensionDays || 0) + additionalDays,
          extensionFee: extensionFee.toNumber(),
        },
      })

      // Gerar boleto se solicitado
      let paymentId: string | undefined

      if (generateBoleto && extensionFee.toNumber() > 0) {
        const dueDate =
          boletoDueDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 dias por padrão

        // Gerar boleto via gateway
        const gateway = getBoletoGateway()
        const boletoData = await gateway.generateBoleto({
          amount: extensionFee.toNumber(),
          dueDate,
          description: `Prorrogação de locação - ${additionalDays} dia(s) adicional(is)`,
          customerName: rental.users.name || '',
          customerDocument: rental.users.cpf || rental.users.cnpj || '',
          customerEmail: rental.users.email,
          metadata: {
            rentalId: rental.id,
            extensionDays: additionalDays,
          },
        })

        // Criar pagamento
        const payment = await createPaymentForRentalOrQuote({
          rentalId: rental.id,
          amount: extensionFee.toNumber(),
          method: 'BOLETO',
          type: 'LATE_FEE', // Taxa de prorrogação
          dueDate,
          transactionId: boletoData.transactionId,
          metadata: {
            barcode: boletoData.barcode,
            digitableLine: boletoData.digitableLine,
            pdfUrl: boletoData.pdfUrl,
            instructions: boletoData.instructions,
            extensionDays: additionalDays,
          },
        })

        paymentId = payment.id
      }

      return {
        rental: updatedRental,
        paymentId,
        extensionFee: extensionFee.toNumber(),
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error extending rental:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
