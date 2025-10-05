/**
 * @fileoverview Instrumentação automática de APIs
 *
 * Este módulo adiciona instrumentação transparente às APIs existentes
 * para coletar métricas sem modificar o código das rotas.
 */

import { NextRequest, NextResponse } from 'next/server'
import { recordApiMetric, type ApiMetrics } from './metrics'

/**
 * Wrapper para instrumentar automaticamente handlers de API
 */
export function withApiInstrumentation<T extends unknown[]>(
  handler: (
    _request: NextRequest,
    ..._args: T
  ) => Promise<NextResponse | Response>,
  options: {
    endpoint?: string
    skipMetrics?: boolean
    customTags?: Record<string, string>
  } = {}
) {
  return async function instrumentedHandler(
    request: NextRequest,
    ...args: T
  ): Promise<NextResponse> {
    const startTime = Date.now()

    // Extrair informações da requisição
    const url = new URL(request.url)
    const endpoint = options.endpoint || url.pathname
    const method = request.method

    let response: NextResponse | Response
    let error: string | undefined

    try {
      // Executar handler original
      response = await handler(request, ...args)

      // Converter Response para NextResponse se necessário
      if (!(response instanceof NextResponse)) {
        response = new NextResponse(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        })
      }
    } catch (err) {
      // Capturar erros do handler
      error = err instanceof Error ? err.message : 'Unknown error'
      console.error(`API Error in ${method} ${endpoint}:`, err)

      response = NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      )
    }

    const endTime = Date.now()
    const responseTime = endTime - startTime

    // Registrar métrica (se não foi desabilitado)
    if (!options.skipMetrics) {
      try {
        // Extrair informações do usuário (se disponível)
        const authHeader = request.headers.get('authorization')
        let userId: string | undefined
        let role: string | undefined

        if (authHeader) {
          // Aqui você pode decodificar o JWT para extrair user info
          // Por now, vamos simular
          try {
            // TODO: Implementar decodificação real do JWT
            // const token = authHeader.replace('Bearer ', '')
            // const decoded = jwt.decode(token)
            // userId = decoded?.sub
            // role = decoded?.role
          } catch {
            // Ignorar erros de decodificação
          }
        }

        // Obter tamanho da resposta
        let responseSize: number | undefined
        try {
          const clone = response.clone()
          const text = await clone.text()
          responseSize = Buffer.byteLength(text, 'utf8')
        } catch {
          // Ignorar erros ao calcular tamanho
        }

        const metric: ApiMetrics = {
          endpoint,
          method,
          statusCode: response.status,
          responseTime,
          userAgent: request.headers.get('user-agent') || undefined,
          ip:
            request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown',
          userId,
          role,
          timestamp: new Date(startTime),
          error,
          requestSize: request.headers.get('content-length')
            ? parseInt(request.headers.get('content-length')!)
            : undefined,
          responseSize,
        }

        recordApiMetric(metric)

        // Log estruturado para development
        if (process.env.NODE_ENV === 'development') {
          const statusEmoji =
            response.status >= 400 ? '❌' : response.status >= 300 ? '⚠️' : '✅'
          const timeColor =
            responseTime > 1000
              ? '\x1b[31m'
              : responseTime > 500
                ? '\x1b[33m'
                : '\x1b[32m'

          console.log(
            `${statusEmoji} ${method} ${endpoint} - ${response.status} ` +
              `${timeColor}${responseTime}ms\x1b[0m` +
              (error ? ` | Error: ${error}` : '') +
              (userId ? ` | User: ${userId}` : '') +
              (role ? ` | Role: ${role}` : '')
          )
        }
      } catch (metricsError) {
        // Não deixar erro de métricas quebrar a API
        console.error('Error recording API metric:', metricsError)
      }
    }

    // Adicionar headers de debugging (apenas em development)
    if (
      process.env.NODE_ENV === 'development' &&
      response instanceof NextResponse
    ) {
      response.headers.set('X-Response-Time', `${responseTime}ms`)
      response.headers.set('X-Endpoint', endpoint)
      if (error) {
        response.headers.set('X-Error', error)
      }
    }

    return response as NextResponse
  }
}

/**
 * Middleware para Next.js que adiciona instrumentação automática
 */
export function createApiMiddleware() {
  return async function apiMiddleware(request: NextRequest) {
    // Aplicar apenas para rotas de API
    if (!request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.next()
    }

    // Instrumentar a requisição
    const startTime = Date.now()

    // Continuar com a próxima função
    const response = NextResponse.next()

    // Registrar métrica básica para middleware
    const endTime = Date.now()
    const responseTime = endTime - startTime

    const metric: ApiMetrics = {
      endpoint: request.nextUrl.pathname,
      method: request.method,
      statusCode: response.status || 200,
      responseTime,
      userAgent: request.headers.get('user-agent') || undefined,
      ip:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown',
      timestamp: new Date(startTime),
    }

    try {
      recordApiMetric(metric)
    } catch (error) {
      console.error('Error in API middleware metrics:', error)
    }

    return response
  }
}

/**
 * Helper para adicionar tags customizadas a uma métrica
 */
export function addMetricTags(
  endpoint: string,
  method: string,
  tags: Record<string, string>
): void {
  // Por enquanto apenas log, mas pode ser usado para enrichment
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Custom tags for ${method} ${endpoint}:`, tags)
  }
}

/**
 * Helper para marcar eventos especiais na API
 */
export function recordApiEvent(event: {
  type: 'auth_failure' | 'rate_limit' | 'validation_error' | 'custom'
  endpoint: string
  method: string
  details?: Record<string, unknown>
  userId?: string
  severity?: 'low' | 'medium' | 'high'
}): void {
  const metric: ApiMetrics = {
    endpoint: event.endpoint,
    method: event.method,
    statusCode:
      event.type === 'auth_failure'
        ? 401
        : event.type === 'rate_limit'
          ? 429
          : event.type === 'validation_error'
            ? 400
            : 500,
    responseTime: 0, // Evento instantâneo
    timestamp: new Date(),
    error: `Event: ${event.type}`,
    userId: event.userId,
  }

  try {
    recordApiMetric(metric)

    // Log estruturado para eventos especiais
    if (process.env.NODE_ENV === 'development') {
      const severityEmoji =
        event.severity === 'high'
          ? '🚨'
          : event.severity === 'medium'
            ? '⚠️'
            : '📝'

      console.log(
        `${severityEmoji} API Event: ${event.type} | ${event.method} ${event.endpoint}`,
        event.details ? `| ${JSON.stringify(event.details)}` : ''
      )
    }
  } catch (error) {
    console.error('Error recording API event:', error)
  }
}

/**
 * Decorator para marcar endpoints críticos
 */
export function markCriticalEndpoint(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value

  descriptor.value = function (...args: unknown[]) {
    // Adicionar logging especial para endpoints críticos
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔥 Critical endpoint called: ${propertyKey}`)
    }

    return originalMethod.apply(this, args)
  }

  return descriptor
}
