import { type NextRequest } from 'next/server'
import { checkRateLimit, strictRateLimit } from '@/lib/rate-limit'
import {
  successResponse,
  handleValidationError,
  errorResponse,
  withErrorHandling,
} from '@/lib/api-response'
import { z } from 'zod'

// Schema de validação
const contactSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  equipment: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

export const POST = withErrorHandling(async (request: NextRequest) => {
  // Rate limiting para evitar spam de formulários
  const rateLimitResult = checkRateLimit(request, strictRateLimit)
  if (!rateLimitResult.allowed) {
    return rateLimitResult.response!
  }

  const body = await request.json()

  // Validar dados
  const validatedData = contactSchema.parse(body)

  // TODO: Implementar envio de email real
  // TODO: Salvar no banco de dados se necessário
  // TODO: Integrar com WhatsApp Business API

  // Simular delay de processamento
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return successResponse(
    { messageId: `msg_${Date.now()}` },
    200,
    'Mensagem enviada com sucesso! Entraremos em contato em breve.'
  )
})
