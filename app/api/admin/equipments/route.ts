import { adminApiRateLimit, checkRateLimit } from '@/lib/rate-limit'
import type { Decimal } from '@prisma/client/runtime/library'
import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

/**
 * @openapi
 * /api/admin/equipments:
 *   get:
 *     tags: [Admin - Equipments]
 *     summary: Lista equipamentos (Admin)
 *     description: |
 *       Retorna lista paginada de equipamentos com informações completas para administradores.
 *
 *       **🔐 Endpoint Protegido** - Requer autenticação ADMIN
 *
 *       **Para IAs**: Este endpoint requer token JWT com role ADMIN.
 *       - Suporta paginação via query params (page, limit)
 *       - Suporta filtros (search, category, available)
 *       - Retorna dados administrativos (contadores, datas, etc.)
 *
 *       **Rate Limit**: 100 requests por minuto
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
 *         description: Busca por nome ou descrição
 *         required: false
 *         schema:
 *           type: string
 *           example: "escavadeira"
 *       - name: category
 *         in: query
 *         description: Filtrar por categoria (ID)
 *         required: false
 *         schema:
 *           type: string
 *           example: "cat_excavators"
 *       - name: available
 *         in: query
 *         description: Filtrar por disponibilidade
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: Lista de equipamentos com metadados de paginação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 equipments:
 *                   type: array
 *                   description: Array de equipamentos
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "cme0n8pld0003kytghr9tcl5n"
 *                       name:
 *                         type: string
 *                         example: "Escavadeira Hidráulica CAT 320"
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: "Escavadeira para obras pesadas"
 *                       pricePerDay:
 *                         type: number
 *                         format: float
 *                         example: 450.00
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["https://storage.googleapis.com/equipments/cat-320.jpg"]
 *                       available:
 *                         type: boolean
 *                         example: true
 *                       categoryId:
 *                         type: string
 *                         example: "cat_excavators"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"
 *                       category:
 *                         $ref: '#/components/schemas/Category'
 *                       _count:
 *                         type: object
 *                         properties:
 *                           quoteItems:
 *                             type: integer
 *                             description: Número de orçamentos que incluem este equipamento
 *                             example: 15
 *                           rental_items:
 *                             type: integer
 *                             description: Número de locações ativas
 *                             example: 3
 *                 pagination:
 *                   type: object
 *                   description: Metadados de paginação
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total de equipamentos
 *                       example: 50
 *                     pages:
 *                       type: integer
 *                       description: Total de páginas
 *                       example: 5
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
 *               required: [equipments, pagination]
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Token de acesso inválido"
 *       403:
 *         description: Permissões insuficientes (role ADMIN necessário)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Acesso negado. Role ADMIN necessário."
 *       429:
 *         description: Rate limit excedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Rate limit excedido. Tente novamente em alguns minutos."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     tags: [Admin - Equipments]
 *     summary: Cria novo equipamento (Admin)
 *     description: |
 *       Cria um novo equipamento no sistema.
 *
 *       **🔐 Endpoint Protegido** - Requer autenticação ADMIN
 *
 *       **Para IAs**: Todos os campos são obrigatórios exceto 'description' e 'images'.
 *       - O 'categoryId' deve ser um ID válido de categoria existente
 *       - O 'pricePerDay' deve ser um número decimal positivo
 *       - As 'images' devem ser URLs válidas
 *
 *       **Rate Limit**: 100 requests por minuto
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do equipamento
 *                 example: "Escavadeira Hidráulica CAT 330"
 *               description:
 *                 type: string
 *                 description: Descrição detalhada (opcional)
 *                 example: "Escavadeira hidráulica para obras pesadas, ideal para escavações profundas"
 *               pricePerDay:
 *                 type: number
 *                 format: float
 *                 minimum: 0.01
 *                 description: Preço por dia de locação em R$
 *                 example: 550.00
 *               categoryId:
 *                 type: string
 *                 description: ID da categoria do equipamento
 *                 example: "cat_excavators"
 *               images:
 *                 type: array
 *                 description: Array de URLs das imagens (opcional)
 *                 items:
 *                   type: string
 *                   format: uri
 *                 example: ["https://storage.googleapis.com/equipments/cat-330-1.jpg"]
 *               available:
 *                 type: boolean
 *                 description: Disponibilidade inicial
 *                 example: true
 *             required: [name, pricePerDay, categoryId, available]
 *           example:
 *             name: "Escavadeira Hidráulica CAT 330"
 *             description: "Escavadeira hidráulica para obras pesadas"
 *             pricePerDay: 550.00
 *             categoryId: "cat_excavators"
 *             images: ["https://storage.googleapis.com/equipments/cat-330.jpg"]
 *             available: true
 *     responses:
 *       201:
 *         description: Equipamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID do equipamento criado
 *                   example: "cme0n8pld0003kytghr9tcl6p"
 *                 message:
 *                   type: string
 *                   example: "Equipamento criado com sucesso"
 *               required: [id, message]
 *       400:
 *         description: Dados inválidos ou categoria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_fields:
 *                 summary: Campos obrigatórios ausentes
 *                 value:
 *                   error: "Nome, preço e categoria são obrigatórios"
 *               invalid_category:
 *                 summary: Categoria não encontrada
 *                 value:
 *                   error: "Categoria não encontrada"
 *               invalid_price:
 *                 summary: Preço inválido
 *                 value:
 *                   error: "Preço deve ser maior que 0"
 *       401:
 *         $ref: '#/components/responses/401'
 *       403:
 *         $ref: '#/components/responses/403'
 *       429:
 *         $ref: '#/components/responses/429'
 *       500:
 *         $ref: '#/components/responses/500'
 */

// Tipo para equipamento com categoria incluída
type EquipmentWithCategory = {
  id: string
  name: string
  description: string | null
  pricePerDay: Decimal // Prisma Decimal
  images: string[]
  available: boolean
  categoryId: string
  createdAt: Date
  updatedAt: Date
  category: {
    id: string
    name: string
    description: string | null
    icon: string | null
    iconColor: string
    bgColor: string
    fontColor: string
    slug: string
    createdAt: Date
    updatedAt: Date
  }
  _count: {
    quoteItems: number
    rental_items: number
  }
}

// GET /api/admin/equipments - List all equipments with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const { requireAdmin } = await import('@/middlewares/require-admin')

    // Rate limiting
    const rateLimitResult = checkRateLimit(request, adminApiRateLimit)
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!
    }

    // Verificar autenticação de admin
    const adminResult = await requireAdmin()
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }
    // Verifica se as variáveis de ambiente para o banco estão configuradas
    if (!process.env.DATABASE_URL) {
      console.error('[API GET /admin/equipments] DATABASE_URL não definido')
      return NextResponse.json(
        {
          error: 'Configuração do banco de dados ausente.',
        },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get('page') || '1')
    const limit = Number.parseInt(searchParams.get('limit') || '100')
    const search = searchParams.get('search')
    const categoryId = searchParams.get('categoryId')
    const isAvailableParam = searchParams.get('isAvailable')

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
        description?: { contains: string; mode: 'insensitive' }
      }>
      categoryId?: string
      available?: boolean
    } = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (categoryId && categoryId !== 'all') {
      where.categoryId = categoryId
    }

    if (
      isAvailableParam !== null &&
      isAvailableParam !== undefined &&
      isAvailableParam !== 'all'
    ) {
      where.available = isAvailableParam === 'true'
    }

    // Teste de conexão com o banco
    await prisma.$connect()

    const equipments = await prisma.equipment.findMany({
      where,
      skip,
      take: limit,
      include: {
        category: true,
        _count: {
          select: {
            quoteItems: true,
            rental_items: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const equipmentsFormatted = equipments.map(
      (equip: EquipmentWithCategory) => ({
        ...equip,
        pricePerDay: Number(equip.pricePerDay), // Converter Decimal para number
        isAvailable: equip.available,
      })
    )

    const totalItems = await prisma.equipment.count({ where })
    const totalPages = Math.ceil(totalItems / limit)

    const response = {
      equipments: equipmentsFormatted,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('[API GET /admin/equipments] ERRO CRÍTICO:', error)

    // Log detalhado do erro
    if (error instanceof Error) {
      console.error(
        '[API GET /admin/equipments] Mensagem do erro:',
        error.message
      )
      console.error('[API GET /admin/equipments] Stack trace:', error.stack)
    }

    if (error instanceof Error && 'code' in error) {
      const prismaError = error as Error & { code: string; meta?: unknown }
      console.error(
        '[API GET /admin/equipments] Erro do Prisma - Código:',
        prismaError.code
      )
      console.error(
        '[API GET /admin/equipments] Erro do Prisma - Meta:',
        prismaError.meta
      )
    }

    return NextResponse.json(
      {
        error: 'Erro interno do servidor ao buscar equipamentos.',
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    )
  }
}

// POST /api/admin/equipments - Create new equipment
export async function POST(request: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    const { requireAdmin } = await import('@/middlewares/require-admin')

    await prisma.$connect()

    // Rate limiting para operações de escrita (mais restritivo)
    const rateLimitResult = checkRateLimit(request, adminApiRateLimit)
    if (!rateLimitResult.allowed) {
      return rateLimitResult.response!
    }

    // Verificar autenticação de admin
    const adminResult = await requireAdmin()
    if (!adminResult.success) {
      return NextResponse.json(
        { error: adminResult.error },
        { status: adminResult.status }
      )
    }

    const body = await request.json()
    const { name, description, pricePerDay, categoryId, images, isAvailable } =
      body

    // Validações
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Nome do equipamento é obrigatório.' },
        { status: 400 }
      )
    }
    if (
      !description ||
      typeof description !== 'string' ||
      description.trim() === ''
    ) {
      return NextResponse.json(
        { error: 'Descrição do equipamento é obrigatória.' },
        { status: 400 }
      )
    }
    if (!categoryId || typeof categoryId !== 'string') {
      return NextResponse.json(
        { error: 'ID da categoria é obrigatório.' },
        { status: 400 }
      )
    }
    if (pricePerDay === undefined || pricePerDay === null) {
      return NextResponse.json(
        { error: 'Preço por dia é obrigatório.' },
        { status: 400 }
      )
    }

    const parsedPrice = Number.parseFloat(String(pricePerDay))
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json(
        { error: 'Preço por dia inválido. Deve ser um número positivo.' },
        { status: 400 }
      )
    }

    // Verificar se a categoria existe
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    })
    if (!categoryExists) {
      return NextResponse.json(
        { error: 'Categoria não encontrada.' },
        { status: 404 }
      )
    }

    const equipment = await prisma.equipment.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        pricePerDay: parsedPrice,
        categoryId,
        images: Array.isArray(images)
          ? images.filter((img) => typeof img === 'string' && img.trim() !== '')
          : [],
        available: typeof isAvailable === 'boolean' ? isAvailable : true,
      },
      include: {
        category: true,
      },
    })

    // Converter Decimal para number para compatibilidade com o frontend
    const equipmentResponse = {
      ...equipment,
      pricePerDay: Number(equipment.pricePerDay),
      isAvailable: equipment.available,
    }

    return NextResponse.json(equipmentResponse, { status: 201 })
  } catch (error) {
    console.error(
      '[API POST /admin/equipments] ERRO ao criar equipamento:',
      error
    )

    if (error instanceof Error && 'code' in error) {
      const prismaError = error as Error & { code: string; meta?: unknown }
      console.error(
        '[API POST /admin/equipments] Erro do Prisma - Código:',
        prismaError.code
      )
      return NextResponse.json(
        {
          error: 'Erro ao processar dados do equipamento.',
          details:
            process.env.NODE_ENV === 'development'
              ? `Prisma Error ${prismaError.code}: ${error.message}`
              : undefined,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: 'Erro interno do servidor ao criar equipamento.',
        details:
          process.env.NODE_ENV === 'development'
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    )
  }
}
