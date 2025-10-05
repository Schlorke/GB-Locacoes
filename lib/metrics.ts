/**
 * @fileoverview Sistema de métricas e analytics da API
 *
 * Este módulo fornece instrumentação para coletar métricas de uso,
 * performance e comportamento da API para melhor orientação de IAs.
 */

export interface ApiMetrics {
  endpoint: string
  method: string
  statusCode: number
  responseTime: number
  userAgent?: string
  ip?: string
  userId?: string
  role?: string
  timestamp: Date
  error?: string
  requestSize?: number
  responseSize?: number
}

export interface EndpointStats {
  endpoint: string
  totalRequests: number
  avgResponseTime: number
  errorRate: number
  lastUsed: Date
  popularParams?: Record<string, number>
  userAgents: Record<string, number>
}

export interface ApiAnalytics {
  totalRequests: number
  uniqueEndpoints: number
  avgResponseTime: number
  errorRate: number
  topEndpoints: Array<{
    endpoint: string
    requests: number
    avgTime: number
    errorRate: number
  }>
  recentErrors: Array<{
    endpoint: string
    error: string
    timestamp: Date
    count: number
  }>
  userActivity: {
    authenticated: number
    anonymous: number
    adminRequests: number
  }
  timeStats: {
    hour: Record<string, number>
    day: Record<string, number>
  }
}

// Storage em memória (para desenvolvimento - em produção usar Redis/DB)
const metricsStore = new Map<string, ApiMetrics[]>()
const endpointStats = new Map<string, EndpointStats>()

/**
 * Registra uma métrica de API
 */
export function recordApiMetric(metric: ApiMetrics): void {
  const key = `${metric.method}:${metric.endpoint}`

  // Armazenar métrica individual
  if (!metricsStore.has(key)) {
    metricsStore.set(key, [])
  }

  const metrics = metricsStore.get(key)!
  metrics.push(metric)

  // Manter apenas últimas 1000 métricas por endpoint
  if (metrics.length > 1000) {
    metrics.splice(0, metrics.length - 1000)
  }

  // Atualizar estatísticas do endpoint
  updateEndpointStats(key, metric)

  // Log para debugging em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `📊 API Metric: ${key} - ${metric.statusCode} (${metric.responseTime}ms)`
    )
  }
}

/**
 * Atualiza estatísticas agregadas do endpoint
 */
function updateEndpointStats(key: string, metric: ApiMetrics): void {
  const existing = endpointStats.get(key)

  if (!existing) {
    endpointStats.set(key, {
      endpoint: metric.endpoint,
      totalRequests: 1,
      avgResponseTime: metric.responseTime,
      errorRate: metric.statusCode >= 400 ? 1 : 0,
      lastUsed: metric.timestamp,
      userAgents: metric.userAgent ? { [metric.userAgent]: 1 } : {},
    })
    return
  }

  const totalRequests = existing.totalRequests + 1
  const totalTime =
    existing.avgResponseTime * existing.totalRequests + metric.responseTime
  const totalErrors =
    existing.errorRate * existing.totalRequests +
    (metric.statusCode >= 400 ? 1 : 0)

  existing.totalRequests = totalRequests
  existing.avgResponseTime = totalTime / totalRequests
  existing.errorRate = totalErrors / totalRequests
  existing.lastUsed = metric.timestamp

  // Atualizar contagem de user agents
  if (metric.userAgent) {
    existing.userAgents[metric.userAgent] =
      (existing.userAgents[metric.userAgent] || 0) + 1
  }
}

/**
 * Obtém analytics gerais da API
 */
export function getApiAnalytics(): ApiAnalytics {
  const allMetrics: ApiMetrics[] = []

  // Coletar todas as métricas dos últimos 7 dias
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  for (const metrics of metricsStore.values()) {
    allMetrics.push(...metrics.filter((m) => m.timestamp >= sevenDaysAgo))
  }

  if (allMetrics.length === 0) {
    return {
      totalRequests: 0,
      uniqueEndpoints: 0,
      avgResponseTime: 0,
      errorRate: 0,
      topEndpoints: [],
      recentErrors: [],
      userActivity: { authenticated: 0, anonymous: 0, adminRequests: 0 },
      timeStats: { hour: {}, day: {} },
    }
  }

  // Calcular estatísticas gerais
  const totalRequests = allMetrics.length
  const avgResponseTime =
    allMetrics.reduce((sum, m) => sum + m.responseTime, 0) / totalRequests
  const errorCount = allMetrics.filter((m) => m.statusCode >= 400).length
  const errorRate = errorCount / totalRequests

  // Top endpoints
  const endpointCounts = new Map<
    string,
    { count: number; totalTime: number; errors: number }
  >()

  for (const metric of allMetrics) {
    const key = `${metric.method} ${metric.endpoint}`
    const existing = endpointCounts.get(key) || {
      count: 0,
      totalTime: 0,
      errors: 0,
    }

    existing.count++
    existing.totalTime += metric.responseTime
    if (metric.statusCode >= 400) existing.errors++

    endpointCounts.set(key, existing)
  }

  const topEndpoints = Array.from(endpointCounts.entries())
    .map(([endpoint, stats]) => ({
      endpoint,
      requests: stats.count,
      avgTime: Math.round(stats.totalTime / stats.count),
      errorRate: stats.errors / stats.count,
    }))
    .sort((a, b) => b.requests - a.requests)
    .slice(0, 10)

  // Erros recentes
  const recentErrors = allMetrics
    .filter((m) => m.statusCode >= 400 && m.error)
    .reduce(
      (acc, m) => {
        const existing = acc.find(
          (e) => e.endpoint === m.endpoint && e.error === m.error
        )

        if (existing) {
          existing.count++
          if (m.timestamp > existing.timestamp) {
            existing.timestamp = m.timestamp
          }
        } else {
          acc.push({
            endpoint: m.endpoint,
            error: m.error!,
            timestamp: m.timestamp,
            count: 1,
          })
        }

        return acc
      },
      [] as Array<{
        endpoint: string
        error: string
        timestamp: Date
        count: number
      }>
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 10)

  // Atividade de usuários
  const authenticated = allMetrics.filter((m) => m.userId).length
  const anonymous = totalRequests - authenticated
  const adminRequests = allMetrics.filter((m) => m.role === 'ADMIN').length

  // Estatísticas por hora/dia
  const hourStats: Record<string, number> = {}
  const dayStats: Record<string, number> = {}

  for (const metric of allMetrics) {
    const hour = metric.timestamp.getHours().toString().padStart(2, '0')
    const day = metric.timestamp.toISOString().split('T')[0]

    if (hour) {
      hourStats[hour] = (hourStats[hour] || 0) + 1
    }
    if (day) {
      dayStats[day] = (dayStats[day] || 0) + 1
    }
  }

  return {
    totalRequests,
    uniqueEndpoints: new Set(allMetrics.map((m) => m.endpoint)).size,
    avgResponseTime: Math.round(avgResponseTime),
    errorRate: Math.round(errorRate * 100) / 100,
    topEndpoints,
    recentErrors,
    userActivity: { authenticated, anonymous, adminRequests },
    timeStats: { hour: hourStats, day: dayStats },
  }
}

/**
 * Obtém estatísticas de um endpoint específico
 */
export function getEndpointStats(
  method: string,
  endpoint: string
): EndpointStats | null {
  const key = `${method}:${endpoint}`
  return endpointStats.get(key) || null
}

/**
 * Obtém métricas recentes de um endpoint
 */
export function getEndpointMetrics(
  method: string,
  endpoint: string,
  limit = 100
): ApiMetrics[] {
  const key = `${method}:${endpoint}`
  const metrics = metricsStore.get(key) || []

  return metrics
    .slice(-limit)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

/**
 * Limpa métricas antigas (manter apenas últimos 30 dias)
 */
export function cleanupOldMetrics(): void {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  for (const [key, metrics] of metricsStore.entries()) {
    const filteredMetrics = metrics.filter((m) => m.timestamp >= thirtyDaysAgo)

    if (filteredMetrics.length === 0) {
      metricsStore.delete(key)
      endpointStats.delete(key)
    } else {
      metricsStore.set(key, filteredMetrics)
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('🧹 Cleaned up old API metrics')
  }
}

interface RequestLike {
  url?: string
  method?: string
  headers?: Record<string, string | string[]>
  ip?: string
  connection?: { remoteAddress?: string }
  user?: { id?: string; role?: string }
}

interface ResponseLike {
  statusCode?: number
  send?: (_body: unknown) => void
}

/**
 * Middleware para capturar métricas automaticamente
 */
export function createMetricsMiddleware() {
  return function metricsMiddleware(
    req: RequestLike,
    res: ResponseLike,
    next: () => void
  ) {
    const startTime = Date.now()
    const originalSend = res.send as ((_body: unknown) => void) | undefined

    if (res.send) {
      res.send = function (body: unknown) {
        const endTime = Date.now()
        const responseTime = endTime - startTime

        // Calcular tamanho da resposta de forma segura
        let responseSize: number | undefined
        try {
          if (typeof body === 'string') {
            responseSize = Buffer.byteLength(body)
          } else if (body && typeof body === 'object') {
            responseSize = Buffer.byteLength(JSON.stringify(body))
          }
        } catch {
          responseSize = undefined
        }

        // Extrair informações da requisição
        const contentLength = req.headers?.['content-length']
        let requestSize: number | undefined
        if (contentLength) {
          const length = Array.isArray(contentLength)
            ? contentLength[0]
            : contentLength
          if (length) {
            requestSize = parseInt(length)
          }
        }

        const metric: ApiMetrics = {
          endpoint: req.url?.split('?')[0] || 'unknown',
          method: req.method || 'GET',
          statusCode: res.statusCode || 200,
          responseTime,
          userAgent: Array.isArray(req.headers?.['user-agent'])
            ? req.headers?.['user-agent'][0]
            : req.headers?.['user-agent'],
          ip: req.ip || req.connection?.remoteAddress,
          userId: req.user?.id,
          role: req.user?.role,
          timestamp: new Date(startTime),
          requestSize,
          responseSize,
        }

        // Adicionar erro se status >= 400
        if (res.statusCode && res.statusCode >= 400 && body) {
          try {
            const errorBody = typeof body === 'string' ? JSON.parse(body) : body
            metric.error =
              (errorBody as { error?: string })?.error ||
              `HTTP ${res.statusCode}`
          } catch {
            metric.error = `HTTP ${res.statusCode}`
          }
        }

        recordApiMetric(metric)

        // Chamar função original se existir
        if (originalSend) {
          return originalSend.call(this, body)
        }
      }
    }

    next()
  }
}

/**
 * Detecta anomalias nas métricas
 */
export function detectAnomalies(): Array<{
  type: 'high_error_rate' | 'slow_response' | 'unusual_activity'
  endpoint: string
  message: string
  severity: 'low' | 'medium' | 'high'
  timestamp: Date
}> {
  const anomalies: Array<{
    type: 'high_error_rate' | 'slow_response' | 'unusual_activity'
    endpoint: string
    message: string
    severity: 'low' | 'medium' | 'high'
    timestamp: Date
  }> = []

  const analytics = getApiAnalytics()

  // Verificar endpoints com alta taxa de erro
  for (const endpoint of analytics.topEndpoints) {
    if (endpoint.errorRate > 0.1) {
      // > 10% de erro
      anomalies.push({
        type: 'high_error_rate',
        endpoint: endpoint.endpoint,
        message: `Taxa de erro elevada: ${Math.round(endpoint.errorRate * 100)}%`,
        severity: endpoint.errorRate > 0.25 ? 'high' : 'medium',
        timestamp: new Date(),
      })
    }

    if (endpoint.avgTime > 5000) {
      // > 5 segundos
      anomalies.push({
        type: 'slow_response',
        endpoint: endpoint.endpoint,
        message: `Resposta lenta: ${endpoint.avgTime}ms em média`,
        severity: endpoint.avgTime > 10000 ? 'high' : 'medium',
        timestamp: new Date(),
      })
    }
  }

  return anomalies
}

// Limpeza automática a cada 6 horas
if (typeof global !== 'undefined') {
  setInterval(cleanupOldMetrics, 6 * 60 * 60 * 1000)
}
