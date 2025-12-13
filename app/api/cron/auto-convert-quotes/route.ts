import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import Decimal from 'decimal.js'

/**
 * Cron job para converter automaticamente orçamentos aprovados em locações
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

    // Buscar orçamentos aprovados que ainda não foram convertidos
    const approvedQuotes = await prisma.quote.findMany({
      where: {
        status: 'APPROVED',
        convertedToRentalId: null,
        // Apenas orçamentos aprovados há mais de 1 hora (dar tempo para pagamento)
        approvedAt: {
          lte: new Date(Date.now() - 60 * 60 * 1000), // 1 hora atrás
        },
      },
      include: {
        items: {
          include: {
            equipment: true,
          },
        },
        user: true,
      },
    })

    const results = {
      converted: 0,
      errors: [] as string[],
    }

    for (const quote of approvedQuotes) {
      try {
        // Verificar se todos os pagamentos foram pagos (opcional - pode ser configurável)
        const payments = await prisma.payment.findMany({
          where: {
            quoteId: quote.id,
          },
        })

        const allPaymentsPaid =
          payments.length > 0 && payments.every((p) => p.status === 'PAID')

        // Se houver pagamentos e nem todos foram pagos, pular
        if (payments.length > 0 && !allPaymentsPaid) {
          continue
        }

        // Verificar se tem userId
        if (!quote.userId) {
          results.errors.push(`Orçamento ${quote.id} não tem userId associado`)
          continue
        }

        // Calcular datas de início e fim
        const startDate = quote.startDate || new Date()
        const days = quote.items[0]?.days || 7
        const endDate =
          quote.endDate ||
          new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000)

        // Criar locação
        const rental = await prisma.rentals.create({
          data: {
            id: `rental_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            userid: quote.userId,
            startdate: startDate,
            enddate: endDate,
            total: quote.finalTotal || quote.subtotal || new Decimal(0),
            status: 'PENDING', // Será ativada quando pagamento for confirmado
            notes: `Convertido automaticamente do orçamento ${quote.id}`,
            rental_items: {
              create: quote.items.map((item) => ({
                id: `ri_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                equipmentid: item.equipmentId,
                quantity: item.quantity,
                priceperday: item.pricePerDay,
                totaldays: item.days,
                totalprice: item.total,
              })),
            },
          },
        })

        // Atualizar orçamento com ID da locação
        await prisma.quote.update({
          where: { id: quote.id },
          data: {
            convertedToRentalId: rental.id,
            status: 'COMPLETED',
          },
        })

        // Criar pagamento para a locação se não existir
        if (payments.length === 0) {
          await prisma.payment.create({
            data: {
              rentalId: rental.id,
              amount: quote.finalTotal || quote.subtotal || new Decimal(0),
              method: 'PIX',
              status: 'PENDING',
              type: 'RENTAL',
              dueDate: startDate,
            },
          })
        } else {
          // Transferir pagamentos do orçamento para a locação
          await prisma.payment.updateMany({
            where: {
              quoteId: quote.id,
            },
            data: {
              rentalId: rental.id,
              quoteId: null,
            },
          })
        }

        results.converted++
      } catch (error) {
        console.error(`Error converting quote ${quote.id}:`, error)
        results.errors.push(
          `Quote ${quote.id}: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${approvedQuotes.length} quotes`,
      results,
    })
  } catch (error) {
    console.error('Error in auto-convert-quotes cron:', error)
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
