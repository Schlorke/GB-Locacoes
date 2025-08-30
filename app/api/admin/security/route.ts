import { getSecurityStats } from '@/lib/security-monitoring'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 0

/**
 * @openapi
 * /api/admin/security:
 *   get:
 *     tags: [Admin - Security]
 *     summary: Relatório de segurança (Admin)
 *     description: |
 *       Retorna estatísticas de segurança e alertas de ameaças para administradores.
 *
 *       **🔐 Endpoint Protegido** - Requer autenticação ADMIN
 *
 *       **Para IAs**: Este endpoint fornece monitoramento de segurança em tempo real.
 *       - Detecção de tentativas de SQL injection, XSS e ataques
 *       - Monitoramento de IPs suspeitos e tentativas de brute force
 *       - Alertas de eventos críticos de segurança
 *       - Estatísticas de bloqueios e ameaças
 *
 *       **Importante**: Use para detectar padrões de ataque e proteger a API
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Relatório completo de segurança
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 overview:
 *                   type: object
 *                   description: Visão geral da segurança
 *                   properties:
 *                     totalEvents:
 *                       type: integer
 *                       description: Total de eventos de segurança (24h)
 *                       example: 127
 *                     blockedRequests:
 *                       type: integer
 *                       description: Requisições bloqueadas
 *                       example: 23
 *                     threatLevel:
 *                       type: string
 *                       enum: [low, medium, high, critical]
 *                       description: Nível atual de ameaça
 *                       example: "medium"
 *                     uniqueThreats:
 *                       type: integer
 *                       description: IPs únicos suspeitos
 *                       example: 15
 *                 eventsByType:
 *                   type: object
 *                   description: Eventos agrupados por tipo
 *                   properties:
 *                     sql_injection:
 *                       type: integer
 *                       example: 12
 *                     xss_attempt:
 *                       type: integer
 *                       example: 5
 *                     brute_force:
 *                       type: integer
 *                       example: 3
 *                     suspicious_access:
 *                       type: integer
 *                       example: 8
 *                     rate_limit_abuse:
 *                       type: integer
 *                       example: 15
 *                     invalid_auth:
 *                       type: integer
 *                       example: 45
 *                     admin_access_attempt:
 *                       type: integer
 *                       example: 7
 *                 topOffendingIPs:
 *                   type: array
 *                   description: IPs com mais eventos suspeitos
 *                   items:
 *                     type: object
 *                     properties:
 *                       ip:
 *                         type: string
 *                         example: "192.168.1.100"
 *                       events:
 *                         type: integer
 *                         description: Número de eventos
 *                         example: 25
 *                       lastSeen:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T14:30:00Z"
 *                       blocked:
 *                         type: boolean
 *                         description: Se o IP está bloqueado
 *                         example: true
 *                 recentCriticalEvents:
 *                   type: array
 *                   description: Eventos críticos recentes
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "sec_1642247400000_abc123"
 *                       type:
 *                         type: string
 *                         enum: [brute_force, sql_injection, xss_attempt, suspicious_access, rate_limit_abuse, invalid_auth, admin_access_attempt]
 *                         example: "sql_injection"
 *                       severity:
 *                         type: string
 *                         enum: [low, medium, high, critical]
 *                         example: "high"
 *                       ip:
 *                         type: string
 *                         example: "192.168.1.100"
 *                       userAgent:
 *                         type: string
 *                         nullable: true
 *                         example: "sqlmap/1.5.12"
 *                       endpoint:
 *                         type: string
 *                         example: "/api/admin/equipments"
 *                       method:
 *                         type: string
 *                         example: "POST"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T14:30:00Z"
 *                       blocked:
 *                         type: boolean
 *                         example: true
 *                       details:
 *                         type: object
 *                         description: Detalhes específicos do evento
 *                         additionalProperties: true
 *                         example:
 *                           pattern: "/(union\\s+select|information_schema)/i"
 *                           matched: "union select"
 *                 recommendations:
 *                   type: array
 *                   description: Recomendações de segurança
 *                   items:
 *                     type: object
 *                     properties:
 *                       priority:
 *                         type: string
 *                         enum: [low, medium, high, urgent]
 *                         example: "high"
 *                       category:
 *                         type: string
 *                         example: "IP Blocking"
 *                       message:
 *                         type: string
 *                         example: "Considere bloquear permanentemente IPs com múltiplas tentativas de SQL injection"
 *                       ips:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["192.168.1.100", "10.0.0.50"]
 *                 meta:
 *                   type: object
 *                   description: Metadados do relatório
 *                   properties:
 *                     generatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T14:35:00Z"
 *                     period:
 *                       type: string
 *                       example: "Last 24 hours"
 *                     monitoringActive:
 *                       type: boolean
 *                       example: true
 *               required: [overview, eventsByType, topOffendingIPs, recentCriticalEvents, recommendations, meta]
 *             example:
 *               overview:
 *                 totalEvents: 127
 *                 blockedRequests: 23
 *                 threatLevel: "medium"
 *                 uniqueThreats: 15
 *               eventsByType:
 *                 sql_injection: 12
 *                 invalid_auth: 45
 *                 suspicious_access: 8
 *               topOffendingIPs:
 *                 - ip: "192.168.1.100"
 *                   events: 25
 *                   lastSeen: "2024-01-15T14:30:00Z"
 *                   blocked: true
 *               recentCriticalEvents: []
 *               recommendations: []
 *               meta:
 *                 generatedAt: "2024-01-15T14:35:00Z"
 *                 period: "Last 24 hours"
 *                 monitoringActive: true
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
export async function GET() {
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

    // Obter estatísticas de segurança
    const stats = getSecurityStats()

    // Converter para o formato local
    const localStats: LocalSecurityStats = {
      topOffendingIPs: stats.topOffendingIPs.map((ip) => ({
        ip: ip.ip,
        events: ip.events,
        blocked: ip.blocked,
      })),
      recentThreats: Object.entries(stats.eventsByType).map(
        ([type, count]) => ({
          type,
          count,
        })
      ),
      totalEvents: stats.totalEvents,
      eventsByType: stats.eventsByType,
      threatLevel: stats.threatLevel,
    }

    // Gerar recomendações baseadas nos dados
    const recommendations = generateSecurityRecommendations(localStats)

    const response = {
      overview: {
        totalEvents: stats.totalEvents,
        blockedRequests: stats.blockedRequests,
        threatLevel: stats.threatLevel,
        uniqueThreats: stats.topOffendingIPs.length,
      },
      eventsByType: stats.eventsByType,
      topOffendingIPs: stats.topOffendingIPs,
      recentCriticalEvents: stats.recentCriticalEvents,
      recommendations,
      meta: {
        generatedAt: new Date().toISOString(),
        period: 'Last 24 hours',
        monitoringActive: true,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Erro ao buscar estatísticas de segurança:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

interface LocalSecurityStats {
  topOffendingIPs: Array<{
    ip: string
    events: number
    blocked: boolean
  }>
  recentThreats: Array<{
    type: string
    count: number
  }>
  totalEvents: number
  eventsByType: Record<string, number>
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
}

/**
 * Gera recomendações de segurança baseadas nas estatísticas
 */
function generateSecurityRecommendations(stats: LocalSecurityStats): Array<{
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  message: string
  ips?: string[]
}> {
  const recommendations = []

  // Recomendar bloqueio de IPs suspeitos
  const highRiskIPs = stats.topOffendingIPs
    .filter((ip) => ip.events > 10 && !ip.blocked)
    .map((ip) => ip.ip)

  if (highRiskIPs.length > 0) {
    recommendations.push({
      priority: 'high' as const,
      category: 'IP Blocking',
      message: `Considere bloquear ${highRiskIPs.length} IP(s) com alta atividade suspeita`,
      ips: highRiskIPs.slice(0, 5),
    })
  }

  // Alertar sobre tentativas de SQL injection
  const sqlEvents = stats.eventsByType.sql_injection || 0
  if (sqlEvents > 5) {
    recommendations.push({
      priority: sqlEvents > 20 ? ('urgent' as const) : ('high' as const),
      category: 'SQL Injection',
      message: `${sqlEvents} tentativas de SQL injection detectadas. Verifique logs detalhados e considere implementar WAF adicional`,
    })
  }

  // Alertar sobre brute force
  const bruteForceEvents = stats.eventsByType.brute_force || 0
  if (bruteForceEvents > 0) {
    recommendations.push({
      priority: bruteForceEvents > 3 ? ('urgent' as const) : ('high' as const),
      category: 'Brute Force',
      message: `${bruteForceEvents} tentativa(s) de brute force detectada(s). Considere implementar CAPTCHA ou aumentar timeouts`,
    })
  }

  // Recomendar sobre acesso admin suspeito
  const adminAccessEvents = stats.eventsByType.admin_access_attempt || 0
  if (adminAccessEvents > 10) {
    recommendations.push({
      priority: 'medium' as const,
      category: 'Admin Access',
      message: `${adminAccessEvents} tentativas de acesso admin não autenticado. Considere implementar 2FA para admins`,
    })
  }

  // Alerta sobre nível de ameaça
  if (stats.threatLevel === 'critical') {
    recommendations.push({
      priority: 'urgent' as const,
      category: 'Threat Level',
      message:
        'Nível de ameaça CRÍTICO detectado. Recomenda-se ativar modo de proteção máxima e revisar logs imediatamente',
    })
  } else if (stats.threatLevel === 'high') {
    recommendations.push({
      priority: 'high' as const,
      category: 'Threat Level',
      message:
        'Nível de ameaça ALTO. Monitore atentamente e considere medidas adicionais de proteção',
    })
  }

  return recommendations
}
