import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Decimal from 'decimal.js'
import crypto from 'crypto'

const CreatePixPaymentSchema = z.object({
  rentalId: z.string().optional(),
  quoteId: z.string().optional(),
  amount: z.number().positive(),
  dueDate: z.string().transform((str) => new Date(str)),
  description: z.string().optional(),
})

// POST - Criar pagamento PIX
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = CreatePixPaymentSchema.parse(body)

    // Gerar código PIX (em produção, usar gateway real)
    const pixCode = generatePixCode({
      amount: validatedData.amount,
      description: validatedData.description || 'Pagamento de locação',
    })

    // Criar pagamento
    const payment = await prisma.payment.create({
      data: {
        rentalId: validatedData.rentalId,
        quoteId: validatedData.quoteId,
        amount: new Decimal(validatedData.amount),
        method: 'PIX',
        status: 'PENDING',
        type: validatedData.rentalId ? 'RENTAL' : 'DEPOSIT',
        dueDate: validatedData.dueDate,
        pixCode,
        pixQrCode: `data:image/svg+xml;base64,${Buffer.from(generateQRCodeSVG(pixCode)).toString('base64')}`,
      },
    })

    return NextResponse.json({
      payment: {
        ...payment,
        amount: payment.amount.toString(),
      },
      pixCode,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error creating PIX payment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Função auxiliar para gerar código PIX (simplificado)
function generatePixCode({
  amount,
  description,
}: {
  amount: number
  description: string
}): string {
  // Em produção, integrar com gateway PIX real (Gerencianet, Mercado Pago, etc.)
  // Por enquanto, gerar código mockado
  const timestamp = Date.now()
  const random = crypto.randomBytes(8).toString('hex')
  return `00020126580014BR.GOV.BCB.PIX0136${timestamp}${random}520400005303986540${amount.toFixed(2)}5802BR59${description.substring(0, 25)}6009SAO PAULO62070503***6304${crypto.createHash('sha256').update(`${timestamp}${random}`).digest('hex').substring(0, 4).toUpperCase()}`
}

// Função auxiliar para gerar QR Code SVG (simplificado)
function generateQRCodeSVG(_code: string): string {
  // Em produção, usar biblioteca de QR Code real
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="white"/>
    <text x="100" y="100" text-anchor="middle" font-size="12">QR Code PIX</text>
  </svg>`
}

