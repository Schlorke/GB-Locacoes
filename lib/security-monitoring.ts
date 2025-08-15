/**
 * @fileoverview Sistema de monitoramento de segurança da API
 *
 * Este módulo detecta padrões suspeitos de acesso e potenciais
 * ataques à API, fornecendo alertas em tempo real.
 */

export interface SecurityEvent {
  id: string
  type:
    | 'brute_force'
    | 'sql_injection'
    | 'xss_attempt'
    | 'suspicious_access'
    | 'rate_limit_abuse'
    | 'invalid_auth'
    | 'admin_access_attempt'
  severity: 'low' | 'medium' | 'high' | 'critical'
  ip: string
  userAgent?: string
  endpoint: string
  method: string
  payload?: string
  timestamp: Date
  userId?: string
  details: Record<string, unknown>
  blocked: boolean
}

export interface SecurityStats {
  totalEvents: number
  eventsByType: Record<string, number>
  topOffendingIPs: Array<{
    ip: string
    events: number
    lastSeen: Date
    blocked: boolean
  }>
  recentCriticalEvents: SecurityEvent[]
  blockedRequests: number
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
}

// Storage para eventos de segurança
const securityEvents: SecurityEvent[] = []
const suspiciousIPs = new Map<
  string,
  {
    count: number
    lastSeen: Date
    blocked: boolean
    events: SecurityEvent[]
  }
>()

/**
 * Padrões suspeitos para detectar ataques
 */
const SUSPICIOUS_PATTERNS = {
  sqlInjection: [
    /('|(\\'))?(;|--|\/\*|\*\/|xp_|sp_|exec|execute|select|insert|update|delete|drop|create|alter|union|script|javascript|vbscript)/i,
    /(union\s+select|information_schema|sys\.tables|mysql\.user)/i,
    /(\bor\b\s+\d+\s*=\s*\d+|\band\b\s+\d+\s*=\s*\d+)/i,
  ],
  xssAttempt: [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:|vbscript:|onload=|onerror=|onclick=/i,
    /<iframe|<embed|<object|<applet/i,
  ],
  pathTraversal: [
    /\.\.[\/\\]/,
    /(\/|\\)(etc|windows|system32|boot)/i,
    /\.\.[\/\\]\.\.[\/\\]/,
  ],
  bruteForce: {
    maxAttempts: 10,
    timeWindow: 15 * 60 * 1000, // 15 minutos
  },
}

/**
 * Gera um ID único para eventos
 */
function generateEventId(): string {
  return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Analisa uma requisição em busca de padrões suspeitos
 */
export function analyzeRequest(
  ip: string,
  userAgent: string | undefined,
  method: string,
  endpoint: string,
  queryParams: Record<string, string>,
  body: unknown,
  headers: Record<string, string>,
  userId?: string
): SecurityEvent[] {
  const events: SecurityEvent[] = []
  const timestamp = new Date()

  // Combinar todos os dados da requisição para análise
  const requestData = {
    ...queryParams,
    ...(body && typeof body === 'object' ? body : {}),
    endpoint,
    userAgent: userAgent || '',
    headers: JSON.stringify(headers),
  }

  const requestString = JSON.stringify(requestData).toLowerCase()

  // 1. Detectar tentativas de SQL Injection
  for (const pattern of SUSPICIOUS_PATTERNS.sqlInjection) {
    if (pattern.test(requestString)) {
      events.push({
        id: generateEventId(),
        type: 'sql_injection',
        severity: 'high',
        ip,
        userAgent,
        endpoint,
        method,
        payload:
          requestString.length > 500
            ? requestString.substring(0, 500) + '...'
            : requestString,
        timestamp,
        userId,
        details: {
          pattern: pattern.toString(),
          matched: pattern.exec(requestString)?.[0],
        },
        blocked: true,
      })
    }
  }

  // 2. Detectar tentativas de XSS
  for (const pattern of SUSPICIOUS_PATTERNS.xssAttempt) {
    if (pattern.test(requestString)) {
      events.push({
        id: generateEventId(),
        type: 'xss_attempt',
        severity: 'medium',
        ip,
        userAgent,
        endpoint,
        method,
        payload:
          requestString.length > 500
            ? requestString.substring(0, 500) + '...'
            : requestString,
        timestamp,
        userId,
        details: {
          pattern: pattern.toString(),
          matched: pattern.exec(requestString)?.[0],
        },
        blocked: true,
      })
    }
  }

  // 3. Detectar path traversal
  for (const pattern of SUSPICIOUS_PATTERNS.pathTraversal) {
    if (pattern.test(requestString)) {
      events.push({
        id: generateEventId(),
        type: 'suspicious_access',
        severity: 'medium',
        ip,
        userAgent,
        endpoint,
        method,
        timestamp,
        userId,
        details: {
          type: 'path_traversal',
          pattern: pattern.toString(),
        },
        blocked: true,
      })
    }
  }

  // 4. Detectar acesso suspeito a endpoints administrativos
  if (endpoint.startsWith('/api/admin') && !userId) {
    events.push({
      id: generateEventId(),
      type: 'admin_access_attempt',
      severity: 'high',
      ip,
      userAgent,
      endpoint,
      method,
      timestamp,
      details: {
        type: 'unauthenticated_admin_access',
      },
      blocked: false, // Deixar a autenticação normal lidar com isso
    })
  }

  // 5. Detectar User-Agent suspeito
  if (userAgent) {
    const suspiciousAgents = [
      /sqlmap/i,
      /nikto/i,
      /nmap/i,
      /masscan/i,
      /zap/i,
      /burpsuite/i,
      /acunetix/i,
      /nessus/i,
      /openvas/i,
    ]

    for (const pattern of suspiciousAgents) {
      if (pattern.test(userAgent)) {
        events.push({
          id: generateEventId(),
          type: 'suspicious_access',
          severity: 'high',
          ip,
          userAgent,
          endpoint,
          method,
          timestamp,
          userId,
          details: {
            type: 'suspicious_user_agent',
            agent: userAgent,
          },
          blocked: false,
        })
      }
    }
  }

  return events
}

/**
 * Registra eventos de segurança
 */
export function recordSecurityEvents(events: SecurityEvent[]): void {
  for (const event of events) {
    securityEvents.push(event)

    // Atualizar estatísticas por IP
    const ipStats = suspiciousIPs.get(event.ip) || {
      count: 0,
      lastSeen: event.timestamp,
      blocked: false,
      events: [],
    }

    ipStats.count++
    ipStats.lastSeen = event.timestamp
    ipStats.events.push(event)

    // Bloquear IP se muitos eventos críticos
    if (
      event.severity === 'critical' ||
      ipStats.events.filter((e) => e.severity === 'high').length >= 3
    ) {
      ipStats.blocked = true
      event.blocked = true
    }

    suspiciousIPs.set(event.ip, ipStats)

    // Log em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      const severityEmoji = {
        low: '🟡',
        medium: '🟠',
        high: '🔴',
        critical: '🚨',
      }[event.severity]

      console.log(
        `${severityEmoji} Security Event: ${event.type} | ${event.ip} | ${event.method} ${event.endpoint}`
      )
    }
  }

  // Manter apenas últimos 10000 eventos
  if (securityEvents.length > 10000) {
    securityEvents.splice(0, securityEvents.length - 10000)
  }
}

/**
 * Detecta tentativas de brute force
 */
export function detectBruteForce(
  ip: string,
  endpoint: string,
  failed: boolean = true
): SecurityEvent | null {
  if (!failed) return null

  const now = Date.now()
  const timeWindow = SUSPICIOUS_PATTERNS.bruteForce.timeWindow
  const maxAttempts = SUSPICIOUS_PATTERNS.bruteForce.maxAttempts

  // Filtrar eventos recentes de falha de auth para este IP
  const recentAuthFailures = securityEvents.filter(
    (event) =>
      event.ip === ip &&
      event.type === 'invalid_auth' &&
      now - event.timestamp.getTime() < timeWindow
  )

  if (recentAuthFailures.length >= maxAttempts) {
    return {
      id: generateEventId(),
      type: 'brute_force',
      severity: 'critical',
      ip,
      endpoint,
      method: 'POST',
      timestamp: new Date(),
      details: {
        attempts: recentAuthFailures.length,
        timeWindow: timeWindow / (60 * 1000) + ' minutes',
      },
      blocked: true,
    }
  }

  return null
}

/**
 * Registra falha de autenticação
 */
export function recordAuthFailure(
  ip: string,
  endpoint: string,
  userAgent?: string,
  attemptedEmail?: string
): void {
  const authEvent: SecurityEvent = {
    id: generateEventId(),
    type: 'invalid_auth',
    severity: 'medium',
    ip,
    userAgent,
    endpoint,
    method: 'POST',
    timestamp: new Date(),
    details: {
      attemptedEmail: attemptedEmail || 'unknown',
    },
    blocked: false,
  }

  recordSecurityEvents([authEvent])

  // Verificar se é brute force
  const bruteForceEvent = detectBruteForce(ip, endpoint, true)
  if (bruteForceEvent) {
    recordSecurityEvents([bruteForceEvent])
  }
}

/**
 * Verifica se um IP está bloqueado
 */
export function isIPBlocked(ip: string): boolean {
  const ipStats = suspiciousIPs.get(ip)
  return ipStats?.blocked || false
}

/**
 * Obtém estatísticas de segurança
 */
export function getSecurityStats(): SecurityStats {
  const now = Date.now()
  const last24h = now - 24 * 60 * 60 * 1000

  // Filtrar eventos das últimas 24 horas
  const recentEvents = securityEvents.filter(
    (event) => event.timestamp.getTime() >= last24h
  )

  // Contar eventos por tipo
  const eventsByType: Record<string, number> = {}
  for (const event of recentEvents) {
    eventsByType[event.type] = (eventsByType[event.type] || 0) + 1
  }

  // Top IPs ofensivos
  const topOffendingIPs = Array.from(suspiciousIPs.entries())
    .map(([ip, stats]) => ({
      ip,
      events: stats.count,
      lastSeen: stats.lastSeen,
      blocked: stats.blocked,
    }))
    .filter((item) => item.lastSeen.getTime() >= last24h)
    .sort((a, b) => b.events - a.events)
    .slice(0, 10)

  // Eventos críticos recentes
  const recentCriticalEvents = recentEvents
    .filter(
      (event) => event.severity === 'critical' || event.severity === 'high'
    )
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 20)

  // Determinar nível de ameaça
  const criticalEvents = recentEvents.filter(
    (e) => e.severity === 'critical'
  ).length
  const highEvents = recentEvents.filter((e) => e.severity === 'high').length

  let threatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'

  if (criticalEvents > 10) threatLevel = 'critical'
  else if (criticalEvents > 5 || highEvents > 20) threatLevel = 'high'
  else if (criticalEvents > 0 || highEvents > 10) threatLevel = 'medium'

  return {
    totalEvents: recentEvents.length,
    eventsByType,
    topOffendingIPs,
    recentCriticalEvents,
    blockedRequests: recentEvents.filter((e) => e.blocked).length,
    threatLevel,
  }
}

/**
 * Middleware de segurança para APIs
 */
export function securityMiddleware(
  ip: string,
  userAgent: string | undefined,
  method: string,
  endpoint: string,
  queryParams: Record<string, string> = {},
  body: unknown = null,
  headers: Record<string, string> = {},
  userId?: string
): {
  allowed: boolean
  events: SecurityEvent[]
  reason?: string
} {
  // Verificar se IP está bloqueado
  if (isIPBlocked(ip)) {
    return {
      allowed: false,
      events: [],
      reason: 'IP blocked due to suspicious activity',
    }
  }

  // Analisar requisição
  const events = analyzeRequest(
    ip,
    userAgent,
    method,
    endpoint,
    queryParams,
    body,
    headers,
    userId
  )

  // Registrar eventos encontrados
  if (events.length > 0) {
    recordSecurityEvents(events)
  }

  // Bloquear se encontrou eventos críticos
  const shouldBlock = events.some(
    (event) =>
      event.severity === 'critical' ||
      (event.severity === 'high' && event.blocked)
  )

  return {
    allowed: !shouldBlock,
    events,
    reason: shouldBlock ? 'Suspicious activity detected' : undefined,
  }
}

/**
 * Limpa eventos antigos (manter apenas últimos 30 dias)
 */
export function cleanupOldSecurityEvents(): void {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000

  // Limpar eventos antigos
  const recentEvents = securityEvents.filter(
    (event) => event.timestamp.getTime() >= thirtyDaysAgo
  )

  securityEvents.splice(0, securityEvents.length, ...recentEvents)

  // Limpar IPs antigos
  for (const [ip, stats] of suspiciousIPs.entries()) {
    if (stats.lastSeen.getTime() < thirtyDaysAgo) {
      suspiciousIPs.delete(ip)
    } else {
      // Limpar eventos antigos do IP
      stats.events = stats.events.filter(
        (e) => e.timestamp.getTime() >= thirtyDaysAgo
      )
      stats.count = stats.events.length
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(
      `🧹 Cleaned up security events. Keeping ${securityEvents.length} events and ${suspiciousIPs.size} IP records.`
    )
  }
}

// Limpeza automática a cada 6 horas
if (typeof global !== 'undefined') {
  setInterval(cleanupOldSecurityEvents, 6 * 60 * 60 * 1000)
}
