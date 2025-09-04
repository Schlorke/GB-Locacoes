import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

/**
 * @openapi
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       description: Equipamento disponível para locação
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do equipamento
 *           example: "cme0n8pld0003kytghr9tcl5n"
 *         name:
 *           type: string
 *           description: Nome do equipamento
 *           example: "Escavadeira Hidráulica CAT 320"
 *         description:
 *           type: string
 *           nullable: true
 *           description: Descrição detalhada do equipamento
 *           example: "Escavadeira hidráulica para obras pesadas, ideal para escavações e movimentação de terra"
 *         pricePerDay:
 *           type: number
 *           format: float
 *           description: Preço por dia de locação (em R$)
 *           example: 450.00
 *         imageUrl:
 *           type: string
 *           nullable: true
 *           description: URL da imagem principal do equipamento
 *           example: "https://storage.googleapis.com/equipments/cat-320.jpg"
 *         images:
 *           type: array
 *           description: Array com todas as imagens do equipamento
 *           items:
 *             type: string
 *           example: ["https://storage.googleapis.com/equipments/cat-320-1.jpg", "https://storage.googleapis.com/equipments/cat-320-2.jpg"]
 *         isAvailable:
 *           type: boolean
 *           description: Indica se o equipamento está disponível para locação
 *           example: true
 *         category:
 *           type: object
 *           description: Categoria do equipamento
 *           properties:
 *             id:
 *               type: string
 *               description: ID da categoria
 *               example: "cat_excavators"
 *             name:
 *               type: string
 *               description: Nome da categoria
 *               example: "Escavadeiras"
 *             icon:
 *               type: string
 *               nullable: true
 *               description: Ícone da categoria
 *               example: "Construction"
 *             iconColor:
 *               type: string
 *               description: Cor do ícone
 *               example: "#ea580c"
 *             bgColor:
 *               type: string
 *               description: Cor de fundo
 *               example: "from-orange-500 to-orange-600"
 *             fontColor:
 *               type: string
 *               description: Cor da fonte
 *               example: "text-white"
 *         reviews:
 *           type: array
 *           description: Array de avaliações (ainda não implementado)
 *           items:
 *             type: object
 *           example: []
 *       required:
 *         - id
 *         - name
 *         - pricePerDay
 *         - isAvailable
 *         - category
 *
 *     Error:
 *       type: object
 *       description: Resposta de erro padrão
 *       properties:
 *         error:
 *           type: string
 *           description: Mensagem de erro
 *           example: "Erro interno do servidor"
 *       required:
 *         - error
 */

// Tipo para equipamento com categoria incluída
type EquipmentWithCategory = {
  id: string
  name: string
  description: string | null
  pricePerDay: { toString(): string } // Tipo que aceita Decimal e permite conversão
  images: string[]
  available: boolean
  categoryId: string
  createdAt: Date
  updatedAt: Date
  // Inventory management
  maxStock: number | null
  // Rental period configurations
  dailyDiscount: number | null
  weeklyDiscount: number | null
  biweeklyDiscount: number | null
  monthlyDiscount: number | null
  popularPeriod: string | null
  // Direct value pricing configurations
  dailyDirectValue: { toString(): string } | null
  weeklyDirectValue: { toString(): string } | null
  biweeklyDirectValue: { toString(): string } | null
  monthlyDirectValue: { toString(): string } | null
  // Pricing method control
  dailyUseDirectValue: boolean
  weeklyUseDirectValue: boolean
  biweeklyUseDirectValue: boolean
  monthlyUseDirectValue: boolean
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
}

/**
 * @openapi
 * /api/equipments:
 *   get:
 *     tags: [Equipments]
 *     summary: Lista equipamentos disponíveis
 *     description: |
 *       Retorna catálogo público de equipamentos disponíveis para locação.
 *
 *       **🌐 Endpoint Público** - Não requer autenticação
 *
 *       **Para IAs**: Este endpoint retorna TODOS os equipamentos ativos.
 *       Use os filtros de categoria se precisar de equipamentos específicos.
 *
 *       **Formato**: Cada equipamento inclui categoria completa e imagens.
 *     responses:
 *       200:
 *         description: Lista de equipamentos com categorias incluídas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Equipment'
 *             examples:
 *               success:
 *                 summary: Lista de equipamentos
 *                 value:
 *                   - id: "cme0n8pld0003kytghr9tcl5n"
 *                     name: "Escavadeira Hidráulica CAT 320"
 *                     description: "Escavadeira para obras pesadas"
 *                     pricePerDay: 450.00
 *                     imageUrl: "https://storage.googleapis.com/equipments/cat-320.jpg"
 *                     images: ["https://storage.googleapis.com/equipments/cat-320.jpg"]
 *                     isAvailable: true
 *                     category:
 *                       id: "cat_excavators"
 *                       name: "Escavadeiras"
 *                       icon: "Construction"
 *                       iconColor: "#ea580c"
 *                       bgColor: "from-orange-500 to-orange-600"
 *                       fontColor: "text-white"
 *                     reviews: []
 *               empty:
 *                 summary: Nenhum equipamento encontrado
 *                 value: []
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Erro interno do servidor"
 */
export async function GET() {
  let traceId: string | undefined

  try {
    const { prisma, checkDatabaseConnection } = await import('@/lib/prisma')
    const { startTrace, addSpan, finishSpan, finishTrace } = await import(
      '@/lib/telemetry'
    )

    // Iniciar tracing para monitoramento
    traceId = startTrace('GET /api/equipments', {
      method: 'GET',
      route: '/api/equipments',
      type: 'public_api',
    })

    // Verificar conectividade antes de prosseguir
    const connectionCheck = await checkDatabaseConnection()
    if (!connectionCheck.connected) {
      console.error('Database connection failed:', connectionCheck.error)

      // Finalizar trace com erro
      if (traceId) {
        finishTrace(traceId, 'error')
      }

      return NextResponse.json(
        {
          error: 'Serviço temporariamente indisponível',
          message: 'Problema de conectividade com o banco de dados',
          retry_after: 30, // Sugerir retry em 30 segundos
        },
        {
          status: 503,
          headers: {
            'Retry-After': '30',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          },
        }
      )
    }

    // Conexão automática do Prisma

    // Instrumentar query do banco
    const dbSpanId = addSpan(traceId, 'database.query', {
      'db.operation': 'findMany',
      'db.table': 'equipment',
    })

    const equipments = await prisma.equipment.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    if (dbSpanId) {
      finishSpan(traceId, dbSpanId, 'ok')
    }

    // Retornar array vazio se não há equipamentos
    if (equipments.length === 0) {
      return NextResponse.json([])
    }

    // Formatar os dados do banco garantindo que as imagens sejam incluídas
    const formattedEquipments = equipments.map(
      (equipment: EquipmentWithCategory) => {
        // Priorizar primeira imagem do array ou usar placeholder
        let primaryImage = null
        if (equipment.images && equipment.images.length > 0) {
          primaryImage = equipment.images[0]
        }

        const formattedEquipment = {
          id: equipment.id,
          name: equipment.name,
          description: equipment.description,
          pricePerDay: Number(equipment.pricePerDay), // Converter Decimal para number
          imageUrl: primaryImage, // Campo principal para imagem
          images:
            equipment.images && equipment.images.length > 0
              ? equipment.images
              : primaryImage
                ? [primaryImage]
                : [],
          isAvailable: equipment.available ?? true,
          category: {
            id: equipment.category.id,
            name: equipment.category.name,
            icon: equipment.category.icon,
            iconColor: equipment.category.iconColor,
            bgColor: equipment.category.bgColor,
            fontColor: equipment.category.fontColor,
          },
          reviews: [],
          // Campos de desconto e configuração de períodos
          dailyDiscount: equipment.dailyDiscount || 0,
          weeklyDiscount: equipment.weeklyDiscount || 0,
          biweeklyDiscount: equipment.biweeklyDiscount || 0,
          monthlyDiscount: equipment.monthlyDiscount || 0,
          popularPeriod: equipment.popularPeriod || 'weekly',
          maxStock: equipment.maxStock || 1,
          // Campos de valor direto
          dailyDirectValue: Number(equipment.dailyDirectValue) || 0,
          weeklyDirectValue: Number(equipment.weeklyDirectValue) || 0,
          biweeklyDirectValue: Number(equipment.biweeklyDirectValue) || 0,
          monthlyDirectValue: Number(equipment.monthlyDirectValue) || 0,
          // Campos de controle de método de preço
          dailyUseDirectValue: equipment.dailyUseDirectValue || false,
          weeklyUseDirectValue: equipment.weeklyUseDirectValue || false,
          biweeklyUseDirectValue: equipment.biweeklyUseDirectValue || false,
          monthlyUseDirectValue: equipment.monthlyUseDirectValue || false,
        }

        return formattedEquipment
      }
    )

    // Finalizar trace com sucesso
    finishTrace(traceId, 'ok')

    return NextResponse.json(formattedEquipments)
  } catch (error) {
    console.error('Erro ao buscar equipamentos:', error)

    // Finalizar trace com erro se disponível
    if (traceId) {
      try {
        const { finishTrace } = await import('@/lib/telemetry')
        finishTrace(traceId, 'error')
      } catch {
        // Ignorar erro de tracing
      }
    }

    // Determinar tipo de erro e resposta apropriada
    let statusCode = 500
    let errorMessage = 'Erro interno do servidor'
    let retryAfter = null

    if (error instanceof Error) {
      if (error.message?.includes('PrismaClientInitializationError')) {
        statusCode = 503
        errorMessage = 'Serviço temporariamente indisponível'
        retryAfter = 60
      } else if (error.message?.includes("Can't reach database server")) {
        statusCode = 503
        errorMessage = 'Problema de conectividade com o banco de dados'
        retryAfter = 30
      } else if (error.message?.includes('timeout')) {
        statusCode = 504
        errorMessage = 'Timeout na operação'
        retryAfter = 15
      }
    }

    const responseBody = {
      error: errorMessage,
      timestamp: new Date().toISOString(),
      request_id: traceId || 'unknown',
    }

    const headers: Record<string, string> = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    }

    if (retryAfter) {
      headers['Retry-After'] = retryAfter.toString()
    }

    return NextResponse.json(responseBody, {
      status: statusCode,
      headers,
    })
  }
}
