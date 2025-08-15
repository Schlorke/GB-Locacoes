/**
 * @fileoverview Configuração de telemetria e observabilidade
 *
 * Sistema simplificado de telemetria inspirado no OpenTelemetry
 * mas otimizado para Next.js e fácil de implementar.
 */

export interface Span {
  name: string
  startTime: number
  endTime?: number
  duration?: number
  attributes: Record<string, string | number | boolean>
  status: 'ok' | 'error' | 'timeout'
  error?: string
  parentSpanId?: string
  spanId: string
  traceId: string
}

export interface Trace {
  traceId: string
  spans: Span[]
  startTime: number
  endTime?: number
  duration?: number
  status: 'ok' | 'error' | 'timeout'
  rootSpan: string
}

// Storage simplificado para traces
const activeTraces = new Map<string, Trace>()
const completedTraces: Trace[] = []

/**
 * Gera um ID único para spans e traces
 */
function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

/**
 * Cria um novo trace
 */
export function startTrace(
  name: string,
  attributes: Record<string, string | number | boolean> = {}
): string {
  const traceId = generateId()
  const spanId = generateId()
  const startTime = Date.now()

  const rootSpan: Span = {
    name,
    spanId,
    traceId,
    startTime,
    attributes: {
      'span.kind': 'server',
      'http.method': attributes.method || 'unknown',
      'http.route': attributes.route || 'unknown',
      ...attributes,
    },
    status: 'ok',
  }

  const trace: Trace = {
    traceId,
    spans: [rootSpan],
    startTime,
    status: 'ok',
    rootSpan: spanId,
  }

  activeTraces.set(traceId, trace)

  if (process.env.NODE_ENV === 'development') {
    console.log(`🔍 Started trace: ${name} [${traceId}]`)
  }

  return traceId
}

/**
 * Adiciona um span a um trace existente
 */
export function addSpan(
  traceId: string,
  name: string,
  attributes: Record<string, string | number | boolean> = {},
  parentSpanId?: string
): string | null {
  const trace = activeTraces.get(traceId)
  if (!trace) {
    console.warn(`Trace ${traceId} not found for span ${name}`)
    return null
  }

  const spanId = generateId()
  const span: Span = {
    name,
    spanId,
    traceId,
    startTime: Date.now(),
    parentSpanId,
    attributes: {
      'operation.name': name,
      ...attributes,
    },
    status: 'ok',
  }

  trace.spans.push(span)

  if (process.env.NODE_ENV === 'development') {
    console.log(`  📌 Added span: ${name} [${spanId}] to trace [${traceId}]`)
  }

  return spanId
}

/**
 * Finaliza um span
 */
export function finishSpan(
  traceId: string,
  spanId: string,
  status: 'ok' | 'error' | 'timeout' = 'ok',
  error?: string
): void {
  const trace = activeTraces.get(traceId)
  if (!trace) return

  const span = trace.spans.find((s) => s.spanId === spanId)
  if (!span) return

  span.endTime = Date.now()
  span.duration = span.endTime - span.startTime
  span.status = status
  if (error) span.error = error

  if (process.env.NODE_ENV === 'development') {
    const statusEmoji =
      status === 'error' ? '❌' : status === 'timeout' ? '⏰' : '✅'
    console.log(
      `  ${statusEmoji} Finished span: ${span.name} (${span.duration}ms)`
    )
  }
}

/**
 * Finaliza um trace completo
 */
export function finishTrace(
  traceId: string,
  status: 'ok' | 'error' | 'timeout' = 'ok'
): Trace | null {
  const trace = activeTraces.get(traceId)
  if (!trace) return null

  trace.endTime = Date.now()
  trace.duration = trace.endTime - trace.startTime
  trace.status = status

  // Finalizar spans que ainda estão abertos
  for (const span of trace.spans) {
    if (!span.endTime) {
      finishSpan(traceId, span.spanId, status)
    }
  }

  // Mover para completed traces
  activeTraces.delete(traceId)
  completedTraces.push(trace)

  // Manter apenas últimos 1000 traces
  if (completedTraces.length > 1000) {
    completedTraces.splice(0, completedTraces.length - 1000)
  }

  if (process.env.NODE_ENV === 'development') {
    const statusEmoji =
      status === 'error' ? '❌' : status === 'timeout' ? '⏰' : '✅'
    const spanName = trace.spans[0]?.name || 'unknown'
    console.log(
      `${statusEmoji} Finished trace: ${spanName} (${trace.duration}ms) [${traceId}]`
    )
  }

  return trace
}

/**
 * Wrapper para instrumentar uma função com tracing
 */
export function withTracing<T extends unknown[], R>(
  name: string,
  fn: (...args: T) => Promise<R> | R,
  attributes: Record<string, string | number | boolean> = {}
) {
  return async function tracedFunction(...args: T): Promise<R> {
    const traceId = startTrace(name, attributes)

    try {
      const result = await fn(...args)
      finishTrace(traceId, 'ok')
      return result
    } catch (error) {
      finishTrace(traceId, 'error')

      // Re-throw the error
      throw error
    }
  }
}

/**
 * Wrapper para instrumentar um span específico
 */
export function withSpan<T extends unknown[], R>(
  traceId: string,
  spanName: string,
  fn: (...args: T) => Promise<R> | R,
  attributes: Record<string, string | number | boolean> = {}
) {
  return async function tracedSpan(...args: T): Promise<R> {
    const spanId = addSpan(traceId, spanName, attributes)
    if (!spanId) return fn(...args)

    try {
      const result = await fn(...args)
      finishSpan(traceId, spanId, 'ok')
      return result
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'
      finishSpan(traceId, spanId, 'error', errorMessage)
      throw error
    }
  }
}

/**
 * Obtém traces recentes para análise
 */
export function getRecentTraces(limit = 100): Trace[] {
  return completedTraces
    .slice(-limit)
    .sort((a, b) => (b.startTime || 0) - (a.startTime || 0))
}

/**
 * Obtém estatísticas de performance dos traces
 */
export function getTracingStats(): {
  totalTraces: number
  avgDuration: number
  errorRate: number
  slowestOperations: Array<{
    name: string
    avgDuration: number
    count: number
    errorRate: number
  }>
  recentErrors: Array<{
    name: string
    error: string
    timestamp: number
    traceId: string
  }>
} {
  if (completedTraces.length === 0) {
    return {
      totalTraces: 0,
      avgDuration: 0,
      errorRate: 0,
      slowestOperations: [],
      recentErrors: [],
    }
  }

  const totalTraces = completedTraces.length
  const totalDuration = completedTraces.reduce(
    (sum, trace) => sum + (trace.duration || 0),
    0
  )
  const avgDuration = totalDuration / totalTraces
  const errorCount = completedTraces.filter(
    (trace) => trace.status === 'error'
  ).length
  const errorRate = errorCount / totalTraces

  // Operações mais lentas
  const operationStats = new Map<
    string,
    { total: number; count: number; errors: number }
  >()

  for (const trace of completedTraces) {
    const rootSpan = trace.spans.find((s) => s.spanId === trace.rootSpan)
    if (!rootSpan) continue

    const name = rootSpan.name
    const existing = operationStats.get(name) || {
      total: 0,
      count: 0,
      errors: 0,
    }

    existing.total += trace.duration || 0
    existing.count++
    if (trace.status === 'error') existing.errors++

    operationStats.set(name, existing)
  }

  const slowestOperations = Array.from(operationStats.entries())
    .map(([name, stats]) => ({
      name,
      avgDuration: Math.round(stats.total / stats.count),
      count: stats.count,
      errorRate: stats.errors / stats.count,
    }))
    .sort((a, b) => b.avgDuration - a.avgDuration)
    .slice(0, 10)

  // Erros recentes
  const recentErrors = completedTraces
    .filter((trace) => trace.status === 'error')
    .slice(-20)
    .map((trace) => {
      const rootSpan = trace.spans.find((s) => s.spanId === trace.rootSpan)
      const errorSpan = trace.spans.find((s) => s.error)

      return {
        name: rootSpan?.name || 'unknown',
        error: errorSpan?.error || 'unknown error',
        timestamp: trace.startTime,
        traceId: trace.traceId,
      }
    })
    .sort((a, b) => b.timestamp - a.timestamp)

  return {
    totalTraces,
    avgDuration: Math.round(avgDuration),
    errorRate: Math.round(errorRate * 100) / 100,
    slowestOperations,
    recentErrors,
  }
}

/**
 * Busca um trace específico por ID
 */
export function getTrace(traceId: string): Trace | null {
  // Buscar em traces ativos primeiro
  const active = activeTraces.get(traceId)
  if (active) return active

  // Buscar em traces completados
  return completedTraces.find((trace) => trace.traceId === traceId) || null
}

/**
 * Limpa traces antigos (manter apenas últimas 24 horas)
 */
export function cleanupOldTraces(): void {
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000

  // Limpar traces completados antigos
  const recentTraces = completedTraces.filter(
    (trace) => trace.startTime >= oneDayAgo
  )
  completedTraces.splice(0, completedTraces.length, ...recentTraces)

  // Limpar traces ativos orfãos (mais de 1 hora)
  const oneHourAgo = Date.now() - 60 * 60 * 1000
  for (const [traceId, trace] of activeTraces.entries()) {
    if (trace.startTime < oneHourAgo) {
      finishTrace(traceId, 'timeout')
    }
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(
      `🧹 Cleaned up traces. Keeping ${completedTraces.length} recent traces.`
    )
  }
}

// Limpeza automática a cada hora
if (typeof global !== 'undefined') {
  setInterval(cleanupOldTraces, 60 * 60 * 1000)
}

/**
 * Context API simplificado para traces
 */
class TracingContext {
  private currentTraceId: string | null = null

  setTrace(traceId: string): void {
    this.currentTraceId = traceId
  }

  getTrace(): string | null {
    return this.currentTraceId
  }

  withTrace<T>(traceId: string, fn: () => T): T {
    const oldTraceId = this.currentTraceId
    this.currentTraceId = traceId

    try {
      return fn()
    } finally {
      this.currentTraceId = oldTraceId
    }
  }

  addSpan(
    name: string,
    attributes?: Record<string, string | number | boolean>
  ): string | null {
    if (!this.currentTraceId) return null
    return addSpan(this.currentTraceId, name, attributes)
  }

  finishSpan(
    spanId: string,
    status?: 'ok' | 'error' | 'timeout',
    error?: string
  ): void {
    if (!this.currentTraceId) return
    finishSpan(this.currentTraceId, spanId, status, error)
  }
}

export const tracingContext = new TracingContext()
