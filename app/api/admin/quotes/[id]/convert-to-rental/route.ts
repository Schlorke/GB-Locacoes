import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { convertQuoteToRental } from '@/lib/rental-converter'

const ConvertQuoteSchema = z.object({
  generateBoleto: z.boolean().optional().default(true),
  boletoDueDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
})

// POST - Converter orçamento em locação
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
    const validatedData = ConvertQuoteSchema.parse(body)

    const result = await convertQuoteToRental(paramsResolved.id, {
      generateBoleto: validatedData.generateBoleto,
      boletoDueDate: validatedData.boletoDueDate,
    })

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }

    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error'

    if (
      errorMessage.includes('não encontrado') ||
      errorMessage.includes('deve estar aprovado') ||
      errorMessage.includes('já foi convertido') ||
      errorMessage.includes('deve ter datas')
    ) {
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    console.error('Error converting quote to rental:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
