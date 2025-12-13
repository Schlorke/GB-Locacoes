import { prisma } from '@/lib/prisma'
import { PaymentStatus, Prisma } from '@prisma/client'
import Decimal from 'decimal.js'

/**
 * Processa pagamento e atualiza status relacionado
 */
export interface ProcessPaymentOptions {
  status: PaymentStatus
  paidAt?: Date
  amount?: Decimal
}

export async function processPayment(
  paymentId: string,
  options: ProcessPaymentOptions
): Promise<void> {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      rental: true,
      quote: true,
    },
  })

  if (!payment) {
    throw new Error('Pagamento não encontrado')
  }

  // Atualizar pagamento
  await prisma.payment.update({
    where: { id: paymentId },
    data: {
      status: options.status,
      paidAt: options.paidAt,
      ...(options.amount && { amount: options.amount }),
    },
  })

  // Se pagamento foi confirmado, atualizar status da locação/orçamento
  if (options.status === 'PAID') {
    // Atualizar locação se existir
    if (payment.rentalId && payment.rental) {
      // Verificar se todos os pagamentos da locação foram pagos
      const allPayments = await prisma.payment.findMany({
        where: {
          rentalId: payment.rentalId,
          type: 'RENTAL',
        },
      })

      const allPaid = allPayments.every((p) => p.status === 'PAID')

      if (allPaid && payment.rental.status === 'PENDING') {
        // Todos os pagamentos foram confirmados, pode ativar locação
        await prisma.rentals.update({
          where: { id: payment.rentalId },
          data: {
            status: 'ACTIVE',
          },
        })
      }
    }

    // Atualizar orçamento se existir
    if (payment.quoteId && payment.quote) {
      // Se orçamento foi pago, pode converter em locação (se ainda não foi)
      // Isso será feito manualmente ou via endpoint de conversão
    }
  }
}

/**
 * Cria pagamento para locação ou orçamento
 */
export async function createPaymentForRentalOrQuote(data: {
  rentalId?: string
  quoteId?: string
  amount: number
  method:
    | 'BOLETO'
    | 'PIX'
    | 'CREDIT_CARD'
    | 'DEBIT_CARD'
    | 'BANK_TRANSFER'
    | 'CASH'
  type: 'RENTAL' | 'DEPOSIT' | 'FINE' | 'DAMAGE' | 'LATE_FEE'
  dueDate: Date
  transactionId?: string
  metadata?: Record<string, unknown>
}): Promise<{ id: string }> {
  if (!data.rentalId && !data.quoteId) {
    throw new Error('rentalId ou quoteId é obrigatório')
  }

  const payment = await prisma.payment.create({
    data: {
      rentalId: data.rentalId,
      quoteId: data.quoteId,
      amount: new Decimal(data.amount),
      method: data.method,
      status: 'PENDING',
      type: data.type,
      dueDate: data.dueDate,
      transactionId: data.transactionId,
      metadata: data.metadata
        ? (data.metadata as Prisma.InputJsonValue)
        : undefined,
    },
  })

  return { id: payment.id }
}
