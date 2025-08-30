import {
  detectAnomalies,
  getApiAnalytics,
  getEndpointStats,
} from '@/lib/metrics'
import { NextResponse, type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

/**
 * @openapi
 * /api/admin/analytics:
 *   get:
 *     tags: [Admin - Analytics]
 *     summary: Analytics da API (Admin)
 *     description: |
 *       Retorna métricas e analytics completas da API para administradores.
 *
 *       **🔐 Endpoint Protegido** - Requer autenticação ADMIN
 *
 *       **Para IAs**: Este endpoint fornece insights detalhados sobre uso da API.
 *       - Métricas de performance e erro por endpoint
 *       - Padrões de uso e atividade de usuários
 *       - Detecção automática de anomalias
 *       - Estatísticas temporais (por hora/dia)
 *
 *       **Use para**: Monitoramento, debugging, otimização de performance
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: endpoint
 *         in: query
 *         description: Filtrar métricas de um endpoint específico
 *         required: false
 *         schema:
 *           type: string
 *           example: "/api/equipments"
 *       - name: period
 *         in: query
 *         description: Período de análise
 *         required: false
 *         schema:
 *           type: string
 *           enum: [1d, 7d, 30d]
 *           default: 7d
 *           example: "7d"
 *     responses:
 *       200:
 *         description: Analytics completas da API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 overview:
 *                   type: object
 *                   description: Visão geral das métricas
 *                   properties:
 *                     totalRequests:
 *                       type: integer
 *                       description: Total de requisições no período
 *                       example: 15432
 *                     uniqueEndpoints:
 *                       type: integer
 *                       description: Número de endpoints únicos utilizados
 *                       example: 17
 *                     avgResponseTime:
 *                       type: integer
 *                       description: Tempo médio de resposta em ms
 *                       example: 245
 *                     errorRate:
 *                       type: number
 *                       format: float
 *                       description: Taxa de erro (0.0 a 1.0)
 *                       example: 0.032
 *                 topEndpoints:
 *                   type: array
 *                   description: Endpoints mais utilizados
 *                   items:
 *                     type: object
 *                     properties:
 *                       endpoint:
 *                         type: string
 *                         example: "GET /api/equipments"
 *                       requests:
 *                         type: integer
 *                         example: 3421
 *                       avgTime:
 *                         type: integer
 *                         description: Tempo médio em ms
 *                         example: 180
 *                       errorRate:
 *                         type: number
 *                         format: float
 *                         example: 0.015
 *                 recentErrors:
 *                   type: array
 *                   description: Erros recentes mais frequentes
 *                   items:
 *                     type: object
 *                     properties:
 *                       endpoint:
 *                         type: string
 *                         example: "/api/admin/equipments"
 *                       error:
 *                         type: string
 *                         example: "Token de acesso inválido"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T14:30:00Z"
 *                       count:
 *                         type: integer
 *                         description: Número de ocorrências
 *                         example: 23
 *                 userActivity:
 *                   type: object
 *                   description: Atividade de usuários
 *                   properties:
 *                     authenticated:
 *                       type: integer
 *                       description: Requisições autenticadas
 *                       example: 8932
 *                     anonymous:
 *                       type: integer
 *                       description: Requisições anônimas
 *                       example: 6500
 *                     adminRequests:
 *                       type: integer
 *                       description: Requisições de admins
 *                       example: 1245
 *                 timeStats:
 *                   type: object
 *                   description: Estatísticas temporais
 *                   properties:
 *                     hour:
 *                       type: object
 *                       description: Requisições por hora (00-23)
 *                       additionalProperties:
 *                         type: integer
 *                       example:
 *                         "09": 1234
 *                         "14": 2341
 *                         "20": 892
 *                     day:
 *                       type: object
 *                       description: Requisições por dia (YYYY-MM-DD)
 *                       additionalProperties:
 *                         type: integer
 *                       example:
 *                         "2024-01-15": 3421
 *                         "2024-01-16": 2987
 *                 anomalies:
 *                   type: array
 *                   description: Anomalias detectadas automaticamente
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         enum: [high_error_rate, slow_response, unusual_activity]
 *                         example: "high_error_rate"
 *                       endpoint:
 *                         type: string
 *                         example: "/api/admin/quotes"
 *                       message:
 *                         type: string
 *                         example: "Taxa de erro elevada: 15%"
 *                       severity:
 *                         type: string
 *                         enum: [low, medium, high]
 *                         example: "medium"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T14:30:00Z"
 *                 endpointDetails:
 *                   type: object
 *                   description: Detalhes específicos do endpoint (se filtrado)
 *                   nullable: true
 *                   properties:
 *                     endpoint:
 *                       type: string
 *                       example: "/api/equipments"
 *                     totalRequests:
 *                       type: integer
 *                       example: 3421
 *                     avgResponseTime:
 *                       type: number
 *                       format: float
 *                       example: 180.5
 *                     errorRate:
 *                       type: number
 *                       format: float
 *                       example: 0.015
 *                     lastUsed:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T14:30:00Z"
 *                     userAgents:
 *                       type: object
 *                       description: User agents mais comuns
 *                       additionalProperties:
 *                         type: integer
 *                       example:
 *                         "Mozilla/5.0 (Windows NT 10.0; Win64; x64)": 1234
 *                         "PostmanRuntime/7.32.2": 567
 *               required: [overview, topEndpoints, recentErrors, userActivity, timeStats, anomalies]
 *             example:
 *               overview:
 *                 totalRequests: 15432
 *                 uniqueEndpoints: 17
 *                 avgResponseTime: 245
 *                 errorRate: 0.032
 *               topEndpoints:
 *                 - endpoint: "GET /api/equipments"
 *                   requests: 3421
 *                   avgTime: 180
 *                   errorRate: 0.015
 *               recentErrors: []
 *               userActivity:
 *                 authenticated: 8932
 *                 anonymous: 6500
 *                 adminRequests: 1245
 *               timeStats:
 *                 hour: {}
 *                 day: {}
 *               anomalies: []
 *               endpointDetails: null
 *       401:
 *         description: Token inválido ou ausente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Permissões insuficientes (role ADMIN necessário)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Acesso negado. Role ADMIN necessário."
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: NextRequest) {
  try {
    const { requireAdmin } = await import('@/middlewares/require-admin')

    // Verificar autenticação de admin
    const authResult = await requireAdmin()
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      )
    }

    const { searchParams } = new URL(request.url)
    const specificEndpoint = searchParams.get('endpoint')
    const period = searchParams.get('period') || '7d'

    // Obter analytics gerais
    const analytics = getApiAnalytics()

    // Detectar anomalias
    const anomalies = detectAnomalies()

    // Se foi solicitado um endpoint específico, buscar detalhes
    let endpointDetails = null
    if (specificEndpoint) {
      // Extrair método e path do endpoint
      const [method, ...pathParts] = specificEndpoint.split(' ')
      const path = pathParts.join(' ') || specificEndpoint

      endpointDetails = getEndpointStats(method || 'GET', path)
    }

    const response = {
      overview: {
        totalRequests: analytics.totalRequests,
        uniqueEndpoints: analytics.uniqueEndpoints,
        avgResponseTime: analytics.avgResponseTime,
        errorRate: analytics.errorRate,
      },
      topEndpoints: analytics.topEndpoints,
      recentErrors: analytics.recentErrors,
      userActivity: analytics.userActivity,
      timeStats: analytics.timeStats,
      anomalies,
      endpointDetails,
      meta: {
        period,
        generatedAt: new Date().toISOString(),
        coverage: `Últimos ${period === '1d' ? '1 dia' : period === '7d' ? '7 dias' : '30 dias'}`,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao buscar analytics:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
