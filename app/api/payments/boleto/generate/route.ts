import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'
import { getBoletoGateway } from '@/lib/payment-gateways/boleto'

const GenerateBoletoSchema = z.object({
  rentalId: z.string().optional(),
  quoteId: z.string().optional(),
  amount: z.number().positive(),
  dueDate: z.string().transform((str) => new Date(str)),
  description: z.string().optional(),
  customerName: z.string(),
  customerDocument: z.string(),
  customerEmail: z.string().email(),
})

// POST - Gerar boleto bancário
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = GenerateBoletoSchema.parse(body)

    // Validar que pelo menos rentalId ou quoteId foi fornecido
    if (!validatedData.rentalId && !validatedData.quoteId) {
      return NextResponse.json(
        { error: 'rentalId ou quoteId é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar dados do cliente se rentalId fornecido
    let customerData = {
      name: validatedData.customerName,
      document: validatedData.customerDocument,
      email: validatedData.customerEmail,
    }

    if (validatedData.rentalId) {
      const rental = await prisma.rentals.findUnique({
        where: { id: validatedData.rentalId },
        include: {
          users: {
            select: {
              name: true,
              email: true,
              cpf: true,
              cnpj: true,
            },
          },
        },
      })

      if (rental) {
        customerData = {
          name: rental.users.name || validatedData.customerName,
          document:
            rental.users.cpf ||
            rental.users.cnpj ||
            validatedData.customerDocument,
          email: rental.users.email,
        }
      }
    } else if (validatedData.quoteId) {
      const quote = await prisma.quote.findUnique({
        where: { id: validatedData.quoteId },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              cpf: true,
              cnpj: true,
            },
          },
        },
      })

      if (quote && quote.user) {
        customerData = {
          name: quote.user.name || validatedData.customerName,
          document:
            quote.user.cpf || quote.user.cnpj || validatedData.customerDocument,
          email: quote.user.email,
        }
      }
    }

    // Gerar boleto via gateway
    const gateway = getBoletoGateway()
    const boletoData = await gateway.generateBoleto({
      amount: validatedData.amount,
      dueDate: validatedData.dueDate,
      description: validatedData.description || 'Pagamento de locação',
      customerName: customerData.name || '',
      customerDocument: customerData.document || '',
      customerEmail: customerData.email,
      metadata: {
        rentalId: validatedData.rentalId,
        quoteId: validatedData.quoteId,
        userId: session.user.id,
      },
    })

    // Criar registro de pagamento
    const payment = await prisma.payment.create({
      data: {
        rentalId: validatedData.rentalId,
        quoteId: validatedData.quoteId,
        amount: new Decimal(validatedData.amount),
        method: 'BOLETO',
        status: 'PENDING',
        type: validatedData.rentalId ? 'RENTAL' : 'DEPOSIT',
        dueDate: validatedData.dueDate,
        transactionId: boletoData.transactionId,
        metadata: {
          barcode: boletoData.barcode,
          digitableLine: boletoData.digitableLine,
          pdfUrl: boletoData.pdfUrl,
          instructions: boletoData.instructions,
        },
      },
    })

    return NextResponse.json({
      payment: {
        ...payment,
        amount: payment.amount.toString(),
      },
      boleto: {
        barcode: boletoData.barcode,
        digitableLine: boletoData.digitableLine,
        pdfUrl: boletoData.pdfUrl,
        dueDate: boletoData.dueDate,
        instructions: boletoData.instructions,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error generating boleto:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
