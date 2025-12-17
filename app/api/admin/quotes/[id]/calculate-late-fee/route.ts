import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminOrOperator } from '@/middlewares/require-admin'
import {
  calculateLateFee,
  DEFAULT_LATE_FEE_CONFIG,
} from '@/lib/late-fee-calculator'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * @openapi
 * /api/admin/quotes/{id}/calculate-late-fee:
 *   post:
 *     tags: [Admin - Quotes]
 *     summary: Calcula multa por atraso para um orçamento
 *     description: |
 *       Calcula automaticamente o valor da multa por atraso baseado na data de término
 *       e data atual. Requer aprovação do admin para ser aplicada.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentDate:
 *                 type: string
 *                 format: date-time
 *                 description: Data atual (opcional, usa data atual se não informado)
 *               config:
 *                 type: object
 *                 description: Configuração de cálculo (opcional)
 *     responses:
 *       200:
 *         description: Cálculo de multa realizado com sucesso
 */
export async function POST(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    // Verificar autenticação
    const authResult = await requireAdminOrOperator()
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      )
    }

    const body = await request.json()
    const { currentDate, config } = body

    const prisma = await getPrisma()

    // Buscar orçamento
    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        total: true,
        originalTotal: true,
        endDate: true,
        lateFee: true,
        lateFeeApproved: true,
      },
    })

    if (!quote) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado' },
        { status: 404 }
      )
    }

    if (!quote.endDate) {
      return NextResponse.json(
        { error: 'Orçamento não possui data de término definida' },
        { status: 400 }
      )
    }

    // Usar data atual ou data fornecida
    const calculationDate = currentDate ? new Date(currentDate) : new Date()

    // Usar valor original se existir, senão usar total
    const baseValue = quote.originalTotal
      ? Number(quote.originalTotal)
      : Number(quote.total)

    // Calcular multa
    const feeConfig = config || DEFAULT_LATE_FEE_CONFIG
    const result = calculateLateFee(
      baseValue,
      new Date(quote.endDate),
      calculationDate,
      feeConfig
    )

    return NextResponse.json({
      lateFee: result.fee.toNumber(),
      daysLate: result.daysLate,
      calculationMethod: result.calculationMethod,
      config: result.config,
      baseValue,
      endDate: quote.endDate,
      calculationDate: calculationDate.toISOString(),
    })
  } catch (error) {
    console.error('Error calculating late fee:', error)
    return NextResponse.json(
      { error: 'Erro ao calcular multa por atraso' },
      { status: 500 }
    )
  }
}

// Runtime-only Prisma import
async function getPrisma() {
  return prisma
}
