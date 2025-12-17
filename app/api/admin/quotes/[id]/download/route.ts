import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminOrOperator } from '@/middlewares/require-admin'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * @openapi
 * /api/admin/quotes/{id}/download:
 *   get:
 *     tags: [Admin - Quotes]
 *     summary: Baixa PDF do orçamento (Admin)
 *     description: |
 *       Gera e retorna PDF do orçamento para download.
 *       Requer autenticação de admin ou operator.
 */
export async function GET(
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

    // Buscar orçamento
    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
      include: {
        items: {
          include: {
            equipment: {
              select: {
                id: true,
                name: true,
                pricePerDay: true,
              },
            },
          },
        },
      },
    })

    if (!quote) {
      return NextResponse.json(
        { error: 'Orçamento não encontrado' },
        { status: 404 }
      )
    }

    // TODO: Implementar geração de PDF
    // Por enquanto, retornar JSON com dados do orçamento
    // Em produção, usar biblioteca como @react-pdf/renderer ou puppeteer

    return NextResponse.json({
      message: 'Download de PDF será implementado em breve',
      quote: {
        id: quote.id,
        name: quote.name,
        total: Number(quote.total),
        originalTotal: quote.originalTotal ? Number(quote.originalTotal) : null,
        finalTotal: quote.finalTotal ? Number(quote.finalTotal) : null,
        priceAdjustmentReason: quote.priceAdjustmentReason || null,
        status: quote.status,
        createdAt: quote.createdAt.toISOString(),
        items: quote.items.map((item) => ({
          equipment: item.equipment.name,
          quantity: item.quantity,
          days: item.days,
          pricePerDay: Number(item.pricePerDay),
          total: Number(item.total),
        })),
      },
    })
  } catch (error) {
    console.error('Error generating quote PDF:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar PDF do orçamento' },
      { status: 500 }
    )
  }
}
