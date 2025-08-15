import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

/**
 * Padronizar respostas de API com status codes e mensagens apropriadas
 */

export interface ApiError {
  error: string
  message: string
  code?: string
  details?: unknown
}

export interface ApiSuccess<T = unknown> {
  success: true
  data: T
  message?: string
}

/**
 * Resposta de erro padronizada
 */
export function errorResponse(
  message: string,
  status: number,
  code?: string,
  details?: unknown
): NextResponse<ApiError> {
  const error: ApiError = {
    error: getErrorTypeByStatus(status),
    message,
    ...(code && { code }),
    ...(details && process.env.NODE_ENV === 'development' && { details }),
  }

  return NextResponse.json(error, { status })
}

/**
 * Resposta de sucesso padronizada
 */
export function successResponse<T>(
  data: T,
  status: number = 200,
  message?: string
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
    },
    { status }
  )
}

/**
 * Tratar erros de validação Zod
 */
export function handleValidationError(error: ZodError): NextResponse<ApiError> {
  const fieldErrors = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }))

  return errorResponse('Dados de entrada inválidos', 400, 'VALIDATION_ERROR', {
    fields: fieldErrors,
  })
}

/**
 * Tratar erros do Prisma
 */
export function handlePrismaError(error: unknown): NextResponse<ApiError> {
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as { code: string; meta?: unknown }

    switch (prismaError.code) {
      case 'P2002':
        return errorResponse('Registro já existe', 409, 'DUPLICATE_RECORD')
      case 'P2025':
        return errorResponse('Registro não encontrado', 404, 'RECORD_NOT_FOUND')
      case 'P2003':
        return errorResponse(
          'Violação de restrição de integridade',
          400,
          'CONSTRAINT_VIOLATION'
        )
      case 'P2014':
        return errorResponse(
          'Operação inválida devido a dependências',
          400,
          'DEPENDENCY_VIOLATION'
        )
      default:
        return errorResponse(
          'Erro de banco de dados',
          500,
          'DATABASE_ERROR',
          process.env.NODE_ENV === 'development' ? prismaError : undefined
        )
    }
  }

  return errorResponse('Erro interno do servidor', 500, 'INTERNAL_ERROR')
}

/**
 * Obter tipo de erro baseado no status code
 */
function getErrorTypeByStatus(status: number): string {
  switch (status) {
    case 400:
      return 'Bad Request'
    case 401:
      return 'Unauthorized'
    case 403:
      return 'Forbidden'
    case 404:
      return 'Not Found'
    case 409:
      return 'Conflict'
    case 422:
      return 'Unprocessable Entity'
    case 429:
      return 'Too Many Requests'
    case 500:
      return 'Internal Server Error'
    default:
      return 'Error'
  }
}

/**
 * Wrapper para rotas API que trata erros automaticamente
 */
export function withErrorHandling<T extends unknown[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args)
    } catch (error) {
      console.error('API Error:', error)

      if (error instanceof ZodError) {
        return handleValidationError(error)
      }

      if (error && typeof error === 'object' && 'code' in error) {
        return handlePrismaError(error)
      }

      if (error instanceof Error) {
        return errorResponse(
          error.message,
          500,
          'INTERNAL_ERROR',
          process.env.NODE_ENV === 'development' ? error.stack : undefined
        )
      }

      return errorResponse('Erro interno do servidor', 500, 'UNKNOWN_ERROR')
    }
  }
}

/**
 * Resposta para recurso não encontrado
 */
export function notFoundResponse(
  resource: string = 'Recurso'
): NextResponse<ApiError> {
  return errorResponse(`${resource} não encontrado`, 404, 'NOT_FOUND')
}

/**
 * Resposta para acesso negado
 */
export function forbiddenResponse(
  message: string = 'Acesso negado'
): NextResponse<ApiError> {
  return errorResponse(message, 403, 'FORBIDDEN')
}

/**
 * Resposta para requisição inválida
 */
export function badRequestResponse(
  message: string,
  details?: unknown
): NextResponse<ApiError> {
  return errorResponse(message, 400, 'BAD_REQUEST', details)
}
