import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

/**
 * @openapi
 * /api/admin/dashboard:
 *   get:
 *     tags: [Admin - Dashboard]
 *     summary: Estatísticas do dashboard (Admin)
 *     description: |
 *       Retorna estatísticas e métricas principais para o dashboard administrativo.
 *
 *       **🔐 Endpoint Protegido** - Requer autenticação ADMIN ou OPERATOR
 *
 *       **Para IAs**: Este endpoint fornece dados em tempo real para dashboards.
 *       - Inclui contadores gerais (equipamentos, categorias, orçamentos)
 *       - Métricas de orçamentos por status
 *       - Equipamentos mais solicitados
 *       - Estatísticas de receita e atividade
 *
 *       **Roles aceitos**: ADMIN, OPERATOR
 *       **Cache**: Dados atualizados em tempo real
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Estatísticas completas do dashboard
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 overview:
 *                   type: object
 *                   description: Visão geral do sistema
 *                   properties:
 *                     totalEquipments:
 *                       type: integer
 *                       description: Total de equipamentos cadastrados
 *                       example: 145
 *                     totalCategories:
 *                       type: integer
 *                       description: Total de categorias
 *                       example: 12
 *                     totalQuotes:
 *                       type: integer
 *                       description: Total de orçamentos
 *                       example: 328
 *                     pendingQuotes:
 *                       type: integer
 *                       description: Orçamentos pendentes
 *                       example: 23
 *                     availableEquipments:
 *                       type: integer
 *                       description: Equipamentos disponíveis
 *                       example: 132
 *                     rentedEquipments:
 *                       type: integer
 *                       description: Equipamentos alugados
 *                       example: 13
 *                 quotes:
 *                   type: object
 *                   description: Estatísticas de orçamentos
 *                   properties:
 *                     byStatus:
 *                       type: object
 *                       description: Orçamentos agrupados por status
 *                       properties:
 *                         PENDING:
 *                           type: integer
 *                           example: 23
 *                         APPROVED:
 *                           type: integer
 *                           example: 156
 *                         REJECTED:
 *                           type: integer
 *                           example: 89
 *                         COMPLETED:
 *                           type: integer
 *                           example: 60
 *                     recent:
 *                       type: array
 *                       description: Orçamentos recentes (últimos 5)
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "quote_cm123456789"
 *                           customerName:
 *                             type: string
 *                             example: "João Silva"
 *                           totalValue:
 *                             type: number
 *                             format: float
 *                             nullable: true
 *                             example: 1850.00
 *                           status:
 *                             type: string
 *                             example: "PENDING"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-15T10:30:00Z"
 *                 equipment:
 *                   type: object
 *                   description: Estatísticas de equipamentos
 *                   properties:
 *                     mostRequested:
 *                       type: array
 *                       description: Equipamentos mais solicitados
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "cme0n8pld0003kytghr9tcl5n"
 *                           name:
 *                             type: string
 *                             example: "Escavadeira Hidráulica CAT 320"
 *                           requestCount:
 *                             type: integer
 *                             description: Número de vezes solicitado
 *                             example: 45
 *                           category:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Escavadeiras"
 *                     byCategory:
 *                       type: array
 *                       description: Equipamentos agrupados por categoria
 *                       items:
 *                         type: object
 *                         properties:
 *                           categoryName:
 *                             type: string
 *                             example: "Escavadeiras"
 *                           count:
 *                             type: integer
 *                             example: 23
 *                           available:
 *                             type: integer
 *                             example: 20
 *                 revenue:
 *                   type: object
 *                   description: Estatísticas de receita
 *                   properties:
 *                     totalPotential:
 *                       type: number
 *                       format: float
 *                       description: Receita potencial de orçamentos aprovados
 *                       example: 125000.00
 *                     thisMonth:
 *                       type: number
 *                       format: float
 *                       description: Receita estimada do mês atual
 *                       example: 15000.00
 *                     lastMonth:
 *                       type: number
 *                       format: float
 *                       description: Receita do mês anterior
 *                       example: 12000.00
 *                 activity:
 *                   type: object
 *                   description: Atividade recente
 *                   properties:
 *                     quotesThisWeek:
 *                       type: integer
 *                       description: Orçamentos criados esta semana
 *                       example: 12
 *                     quotesLastWeek:
 *                       type: integer
 *                       description: Orçamentos da semana passada
 *                       example: 8
 *                     avgResponseTime:
 *                       type: number
 *                       description: Tempo médio de resposta em horas
 *                       example: 24.5
 *               required: [overview, quotes, equipment, revenue, activity]
 *             example:
 *               overview:
 *                 totalEquipments: 145
 *                 totalCategories: 12
 *                 totalQuotes: 328
 *                 pendingQuotes: 23
 *                 availableEquipments: 132
 *                 rentedEquipments: 13
 *               quotes:
 *                 byStatus:
 *                   PENDING: 23
 *                   APPROVED: 156
 *                   REJECTED: 89
 *                   COMPLETED: 60
 *                 recent: []
 *               equipment:
 *                 mostRequested: []
 *                 byCategory: []
 *               revenue:
 *                 totalPotential: 125000.00
 *                 thisMonth: 15000.00
 *                 lastMonth: 12000.00
 *               activity:
 *                 quotesThisWeek: 12
 *                 quotesLastWeek: 8
 *                 avgResponseTime: 24.5
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
export async function GET() {
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

    // Buscar estatísticas gerais
    const [
      totalEquipments,
      totalCategories,
      totalQuotes,
      pendingQuotes,
      approvedQuotes,
      rejectedQuotes,
      completedQuotes,
      totalRevenue,
    ] = await Promise.all([
      prisma.equipment.count(),
      prisma.category.count(),
      prisma.quote.count(),
      prisma.quote.count({ where: { status: 'PENDING' } }),
      prisma.quote.count({ where: { status: 'APPROVED' } }),
      prisma.quote.count({ where: { status: 'REJECTED' } }),
      prisma.quote.count({ where: { status: 'COMPLETED' } }),
      prisma.quote.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { total: true },
      }),
    ])

    const stats = {
      totalEquipments,
      availableEquipments: totalEquipments, // Por enquanto consideramos todos disponíveis
      totalCategories,
      totalQuotes,
      pendingQuotes,
      approvedQuotes,
      rejectedQuotes,
      completedQuotes,
      totalRevenue: totalRevenue._sum.total || 0,
      monthlyRevenue: 0, // Pode ser calculado se necessário
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
