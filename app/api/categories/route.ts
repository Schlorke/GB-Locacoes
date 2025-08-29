import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Lista todas as categorias
 *     description: |
 *       Retorna lista completa de categorias de equipamentos com contagem de equipamentos.
 *
 *       **🌐 Endpoint Público** - Não requer autenticação
 *
 *       **Para IAs**: Use este endpoint para obter todas as categorias disponíveis.
 *       Cada categoria inclui contagem de equipamentos associados.
 *     responses:
 *       200:
 *         description: Lista de categorias com contagem de equipamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID único da categoria
 *                     example: "cat_excavators"
 *                   name:
 *                     type: string
 *                     description: Nome da categoria
 *                     example: "Escavadeiras"
 *                   description:
 *                     type: string
 *                     nullable: true
 *                     description: Descrição da categoria
 *                     example: "Equipamentos de escavação e movimentação de terra"
 *                   icon:
 *                     type: string
 *                     nullable: true
 *                     description: Nome do ícone
 *                     example: "Construction"
 *                   iconColor:
 *                     type: string
 *                     description: Cor do ícone
 *                     example: "#ea580c"
 *                   bgColor:
 *                     type: string
 *                     description: Cor de fundo
 *                     example: "from-orange-500 to-orange-600"
 *                   fontColor:
 *                     type: string
 *                     description: Cor da fonte
 *                     example: "text-white"
 *                   slug:
 *                     type: string
 *                     description: Slug para URL
 *                     example: "escavadeiras"
 *                   _count:
 *                     type: object
 *                     description: Contadores relacionados
 *                     properties:
 *                       equipments:
 *                         type: integer
 *                         description: Número de equipamentos nesta categoria
 *                         example: 5
 *                 required:
 *                   - id
 *                   - name
 *                   - iconColor
 *                   - bgColor
 *                   - fontColor
 *                   - slug
 *                   - _count
 *             example:
 *               - id: "cat_excavators"
 *                 name: "Escavadeiras"
 *                 description: "Equipamentos de escavação"
 *                 icon: "Construction"
 *                 iconColor: "#ea580c"
 *                 bgColor: "from-orange-500 to-orange-600"
 *                 fontColor: "text-white"
 *                 slug: "escavadeiras"
 *                 _count:
 *                   equipments: 5
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro interno do servidor"
 */
export async function GET() {
  try {
    const { prisma, checkDatabaseConnection } = await import('@/lib/prisma')

    // Verificar conectividade antes de prosseguir
    const connectionCheck = await checkDatabaseConnection()
    if (!connectionCheck.connected) {
      console.error('Database connection failed:', connectionCheck.error)

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

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            equipments: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)

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
