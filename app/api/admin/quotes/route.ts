import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdminOrOperator } from '@/middlewares/require-admin'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

/**
 * @openapi
 * /api/admin/quotes:
 *   get:
 *     tags: [Admin - Quotes]
 *     summary: Lista orçamentos (Admin)
 *     description: |
 *       Retorna lista paginada de orçamentos para administradores e operadores.
 *
 *       **🔐 Endpoint Protegido** - Requer autenticação ADMIN ou OPERATOR
 *
 *       **Para IAs**: Este endpoint requer token JWT com role ADMIN ou OPERATOR.
 *       - Suporta paginação via query params (page, limit)
 *       - Suporta filtros (search, status)
 *       - Retorna orçamentos com itens e informações completas
 *
 *       **Roles aceitos**: ADMIN, OPERATOR
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Número da página (padrão 1)
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Itens por página (padrão 10, máximo 100)
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           example: 10
 *       - name: search
 *         in: query
 *         description: Busca por nome, email ou empresa do cliente
 *         required: false
 *         schema:
 *           type: string
 *           example: "joão silva"
 *       - name: status
 *         in: query
 *         description: Filtrar por status do orçamento
 *         required: false
 *         schema:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED, COMPLETED]
 *           example: "PENDING"
 *     responses:
 *       200:
 *         description: Lista de orçamentos com metadados de paginação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quotes:
 *                   type: array
 *                   description: Array de orçamentos
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "quote_cm123456789"
 *                       status:
 *                         type: string
 *                         enum: [PENDING, APPROVED, REJECTED, COMPLETED]
 *                         example: "PENDING"
 *                       customerName:
 *                         type: string
 *                         example: "João Silva"
 *                       customerEmail:
 *                         type: string
 *                         format: email
 *                         example: "joao@empresa.com.br"
 *                       customerPhone:
 *                         type: string
 *                         example: "(51) 99999-9999"
 *                       customerCompany:
 *                         type: string
 *                         nullable: true
 *                         example: "Construtora ABC"
 *                       message:
 *                         type: string
 *                         nullable: true
 *                         example: "Preciso para obra de 15 dias"
 *                       totalValue:
 *                         type: number
 *                         format: float
 *                         nullable: true
 *                         example: 1850.00
 *                       validUntil:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: "2024-02-15T23:59:59Z"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"
 *                       items:
 *                         type: array
 *                         description: Itens do orçamento
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "item_123"
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                             days:
 *                               type: integer
 *                               example: 10
 *                             unitPrice:
 *                               type: number
 *                               format: float
 *                               example: 450.00
 *                             totalPrice:
 *                               type: number
 *                               format: float
 *                               example: 9000.00
 *                             equipment:
 *                               $ref: '#/components/schemas/Equipment'
 *                       _count:
 *                         type: object
 *                         properties:
 *                           items:
 *                             type: integer
 *                             description: Número de itens no orçamento
 *                             example: 3
 *                 pagination:
 *                   type: object
 *                   description: Metadados de paginação
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total de orçamentos
 *                       example: 150
 *                     pages:
 *                       type: integer
 *                       description: Total de páginas
 *                       example: 15
 *                     page:
 *                       type: integer
 *                       description: Página atual
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       description: Itens por página
 *                       example: 10
 *                     hasNext:
 *                       type: boolean
 *                       description: Tem próxima página
 *                       example: true
 *                     hasPrev:
 *                       type: boolean
 *                       description: Tem página anterior
 *                       example: false
 *               required: [quotes, pagination]
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Permissões insuficientes (role ADMIN ou OPERATOR necessário)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Acesso negado. Role ADMIN ou OPERATOR necessário."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: NextRequest) {
  try {
    // Verificar autenticação de admin ou operator
    const authResult = await requireAdminOrOperator()
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get('page') || '1')
    const limit = Number.parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Parâmetro 'page' inválido." },
        { status: 400 }
      )
    }

    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: "Parâmetro 'limit' inválido." },
        { status: 400 }
      )
    }

    const skip = (page - 1) * limit
    const where: {
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' }
        email?: { contains: string; mode: 'insensitive' }
        phone?: { contains: string; mode: 'insensitive' }
      }>
      status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED'
    } = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (status && status !== 'all') {
      where.status = status.toUpperCase() as
        | 'PENDING'
        | 'APPROVED'
        | 'REJECTED'
        | 'COMPLETED'
    }

    const quotes = await prisma.quote.findMany({
      where,
      skip,
      take: limit,
      include: {
        items: {
          include: {
            equipment: {
              select: {
                id: true,
                name: true,
                pricePerDay: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transformar dados para formato esperado pelo frontend
    const transformedQuotes = quotes.map((quote) => ({
      id: quote.id,
      name: quote.name,
      email: quote.email,
      phone: quote.phone,
      company: quote.company,
      cpf: quote.cpf || null,
      cnpj: quote.cnpj || null,
      cep: quote.cep || null,
      equipments: quote.items.map((item) => ({
        id: item.equipment.id,
        name: item.equipment.name,
        quantity: item.quantity,
        dailyPrice: Number(item.pricePerDay),
      })),
      startDate: quote.startDate?.toISOString() || null,
      endDate: quote.endDate?.toISOString() || null,
      totalPrice: Number(quote.total),
      originalTotal: quote.originalTotal
        ? Number(quote.originalTotal)
        : quote.total
          ? Number(quote.total)
          : 0,
      finalTotal: quote.finalTotal ? Number(quote.finalTotal) : null,
      priceAdjustmentReason: quote.priceAdjustmentReason || null,
      priceAdjustedAt: quote.priceAdjustedAt?.toISOString() || null,
      priceAdjustedBy: quote.priceAdjustedBy || null,
      lateFee: quote.lateFee ? Number(quote.lateFee) : null,
      lateFeeApproved: quote.lateFeeApproved || false,
      lateFeeApprovedAt: quote.lateFeeApprovedAt?.toISOString() || null,
      lateFeeApprovedBy: quote.lateFeeApprovedBy || null,
      validUntil: quote.validUntil?.toISOString() || null,
      rejectedAt: quote.rejectedAt?.toISOString() || null,
      rejectionReason: quote.rejectionReason || null,
      status: quote.status.toLowerCase() as 'pending' | 'approved' | 'rejected',
      message: quote.message,
      deliveryType: quote.deliveryType || null,
      deliveryAddress: (() => {
        if (!quote.deliveryAddress) return null
        const addr =
          typeof quote.deliveryAddress === 'object' &&
          !Array.isArray(quote.deliveryAddress)
            ? (quote.deliveryAddress as Record<string, unknown>)
            : typeof quote.deliveryAddress === 'string'
              ? (JSON.parse(quote.deliveryAddress) as Record<string, unknown>)
              : null
        if (!addr) return null
        // Mapear campos em português para inglês (frontend espera inglês)
        return {
          street: addr.logradouro || addr.street || null,
          number: addr.numero || addr.number || null,
          complement: addr.complemento || addr.complement || null,
          neighborhood: addr.bairro || addr.neighborhood || null,
          city: addr.cidade || addr.city || null,
          state: addr.estado || addr.state || null,
          zipCode: addr.cep || addr.zipCode || null,
        }
      })(),
      deliveryFee: quote.deliveryFee ? Number(quote.deliveryFee) : null,
      createdAt: quote.createdAt.toISOString(),
      updatedAt: quote.updatedAt.toISOString(),
      items: quote.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        days: item.days,
        startDate:
          'startDate' in item && item.startDate
            ? (item.startDate as Date).toISOString()
            : null,
        endDate:
          'endDate' in item && item.endDate
            ? (item.endDate as Date).toISOString()
            : null,
        includeWeekends:
          'includeWeekends' in item ? (item.includeWeekends as boolean) : false,
        appliedDiscount:
          'appliedDiscount' in item && item.appliedDiscount
            ? Number(item.appliedDiscount)
            : null,
        appliedPeriod:
          'appliedPeriod' in item
            ? (item.appliedPeriod as string | null)
            : null,
        useDirectValue:
          'useDirectValue' in item ? (item.useDirectValue as boolean) : false,
        directValue:
          'directValue' in item && item.directValue
            ? Number(item.directValue)
            : null,
        pricePerDay: Number(item.pricePerDay),
        total: Number(item.total),
        equipment: {
          id: item.equipment.id,
          name: item.equipment.name,
        },
      })),
    }))

    const totalItems = await prisma.quote.count({ where })
    const totalPages = Math.ceil(totalItems / limit)

    const [total, pending, approved, rejected, completed] = await Promise.all([
      prisma.quote.count(),
      prisma.quote.count({ where: { status: 'PENDING' } }),
      prisma.quote.count({ where: { status: 'APPROVED' } }),
      prisma.quote.count({ where: { status: 'REJECTED' } }),
      prisma.quote.count({ where: { status: 'COMPLETED' } }),
    ])

    const response = {
      quotes: transformedQuotes,
      pagination: { page, limit, totalItems, totalPages },
      stats: {
        total,
        pending,
        approved,
        rejected,
        expired: completed,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching quotes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
