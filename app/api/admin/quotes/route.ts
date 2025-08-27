import { NextResponse, type NextRequest } from 'next/server'

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
    const { prisma } = await import('@/lib/prisma')
    const { requireAdminOrOperator } = await import(
      '@/middlewares/require-admin'
    )

    await prisma.$connect()

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
      quotes,
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
