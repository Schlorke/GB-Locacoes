import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * @openapi
 * /api/quotes/{id}/download:
 *   get:
 *     tags: [Quotes]
 *     summary: Baixa PDF do orçamento
 *     description: |
 *       Gera e retorna PDF do orçamento para download.
 *       Requer autenticação e que o orçamento pertença ao usuário logado.
 */
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Usuário não autenticado' },
        { status: 401 }
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

    // Verificar se o orçamento pertence ao usuário logado
    if (quote.userId !== session.user.id) {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
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
