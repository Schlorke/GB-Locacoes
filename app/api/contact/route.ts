import {
  successResponse,
  errorResponse,
  withErrorHandling,
} from '@/lib/api-response'
import { checkRateLimit, strictRateLimit } from '@/lib/rate-limit'
import { ContactSchema } from '@/lib/validations'
import { type ValidatedContactData } from '@/lib/validations/contact-types'
import { generateContactEmailHTML } from '@/lib/email-templates'
import getResend from '@/lib/resend'
import { type NextRequest } from 'next/server'

const resend = getResend()

export const POST = withErrorHandling(async (request: NextRequest) => {
  // Rate limiting para evitar spam de formulários
  const rateLimitResult = checkRateLimit(request, strictRateLimit)
  if (!rateLimitResult.allowed) {
    return rateLimitResult.response!
  }

  const body = await request.json()

  // Validar dados usando schema Zod centralizado
  const validatedData = ContactSchema.parse(body) as ValidatedContactData

  // Verificar se Resend está configurado
  if (!resend) {
    console.error('❌ Resend not configured - missing RESEND_API_KEY')
    return errorResponse(
      'Serviço de email indisponível. Entre em contato via WhatsApp.',
      503
    )
  }

  // Verificar se FROM_EMAIL está configurado
  if (!process.env.FROM_EMAIL) {
    console.error('❌ FROM_EMAIL not configured')
    return errorResponse(
      'Serviço de email indisponível. Entre em contato via WhatsApp.',
      503
    )
  }

  // Gerar ID único para este contato
  const contactId = `CTT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

  // Enviar email
  try {
    const emailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.CONTACT_EMAIL || 'harryschlorke@gmail.com',
      subject: `🎯 Novo Orçamento #${contactId.slice(-8).toUpperCase()} - ${validatedData.name}`,
      html: generateContactEmailHTML(validatedData, contactId),
    })

    if (emailResult.error) {
      throw new Error(emailResult.error.message)
    }

    return successResponse(
      { messageId: contactId },
      200,
      'Orçamento enviado com sucesso! Entraremos em contato em até 2 horas úteis.'
    )
  } catch (error) {
    console.error('Failed to send email:', error)
    return errorResponse(
      'Erro ao enviar email. Por favor, entre em contato via WhatsApp.',
      500
    )
  }
})
