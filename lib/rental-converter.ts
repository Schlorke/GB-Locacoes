import { prisma } from '@/lib/prisma'
import Decimal from 'decimal.js'
import { isEquipmentAvailableForRental } from './equipment-availability'
import { createPaymentForRentalOrQuote } from './payment-processor'
import { getBoletoGateway } from './payment-gateways/boleto'

export interface ConvertQuoteToRentalResult {
  rentalId: string
  paymentId?: string
  boletoGenerated: boolean
}

/**
 * Converte orçamento aprovado em locação
 */
export async function convertQuoteToRental(
  quoteId: string,
  options?: {
    generateBoleto?: boolean
    boletoDueDate?: Date
  }
): Promise<ConvertQuoteToRentalResult> {
  // Buscar orçamento
  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    include: {
      items: {
        include: {
          equipment: {
            select: {
              id: true,
              name: true,
              maxStock: true,
            },
          },
        },
      },
      user: {
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

  if (!quote) {
    throw new Error('Orçamento não encontrado')
  }

  if (quote.status !== 'APPROVED') {
    throw new Error('Orçamento deve estar aprovado para ser convertido')
  }

  if (quote.convertedToRentalId) {
    throw new Error('Orçamento já foi convertido em locação')
  }

  if (!quote.startDate || !quote.endDate) {
    throw new Error('Orçamento deve ter datas de início e fim definidas')
  }

  // Verificar disponibilidade de todos os equipamentos
  for (const item of quote.items) {
    const availability = await isEquipmentAvailableForRental(
      item.equipmentId,
      quote.startDate!,
      quote.endDate!,
      item.quantity
    )

    if (!availability.available) {
      throw new Error(
        `Equipamento ${item.equipment.name}: ${availability.reason}`
      )
    }
  }

  // Calcular total
  const total = quote.finalTotal
    ? new Decimal(quote.finalTotal.toString())
    : quote.items.reduce((sum, item) => {
        return sum.plus(new Decimal(item.total.toString()))
      }, new Decimal(0))

  // Criar locação em transação
  const result = await prisma.$transaction(async (tx) => {
    // Criar locação
    const rental = await tx.rentals.create({
      data: {
        id: `rental_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        userid: quote.userId || quote.user?.id || '',
        quoteId: quote.id,
        startdate: quote.startDate || new Date(),
        enddate: quote.endDate || new Date(),
        total: total.toNumber(),
        status: 'PENDING', // Fica pendente até pagamento ser confirmado
        notes: quote.internalNotes || quote.adminNotes,
        rental_items: {
          create: quote.items.map((item) => ({
            id: `rental_item_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            equipmentid: item.equipmentId,
            quantity: item.quantity,
            priceperday: new Decimal(item.pricePerDay.toString()).toNumber(),
            totaldays: item.days,
            totalprice: new Decimal(item.total.toString()).toNumber(),
          })),
        },
      },
    })

    // Atualizar orçamento
    await tx.quote.update({
      where: { id: quoteId },
      data: {
        status: 'COMPLETED',
        convertedToRentalId: rental.id,
      },
    })

    // Gerar boleto se solicitado
    let paymentId: string | undefined
    let boletoGenerated = false

    if (options?.generateBoleto && total.toNumber() > 0) {
      const dueDate =
        options.boletoDueDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 dias por padrão

      // Gerar boleto via gateway
      const gateway = getBoletoGateway()
      const boletoData = await gateway.generateBoleto({
        amount: total.toNumber(),
        dueDate,
        description: `Locação de equipamentos - Orçamento ${quote.id}`,
        customerName: quote.user?.name || quote.name || '',
        customerDocument:
          quote.user?.cpf || quote.user?.cnpj || quote.cpf || quote.cnpj || '',
        customerEmail: quote.user?.email || quote.email,
        metadata: {
          quoteId: quote.id,
          rentalId: rental.id,
        },
      })

      // Criar pagamento
      const payment = await createPaymentForRentalOrQuote({
        rentalId: rental.id,
        amount: total.toNumber(),
        method: 'BOLETO',
        type: 'RENTAL',
        dueDate,
        transactionId: boletoData.transactionId,
        metadata: {
          barcode: boletoData.barcode,
          digitableLine: boletoData.digitableLine,
          pdfUrl: boletoData.pdfUrl,
          instructions: boletoData.instructions,
        },
      })

      paymentId = payment.id
      boletoGenerated = true
    }

    return {
      rentalId: rental.id,
      paymentId,
      boletoGenerated,
    }
  })

  return result
}
