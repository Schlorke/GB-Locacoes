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
import { prisma } from '@/lib/prisma'
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

  // Criar registro no banco de dados antes de enviar e-mail
  let quote
  try {
    quote = await prisma.quote.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || '', // Campo opcional no schema, obrigatório no model
        cpf: validatedData.cpf,
        cnpj: validatedData.cnpj,
        cep: validatedData.cep,
        company: validatedData.company,
        message: validatedData.message,
        total: 0, // Sem itens no formulário de contato
        status: 'PENDING',
      },
    })
  } catch (error) {
    console.error('Failed to save quote to database:', error)
    return errorResponse(
      'Erro ao salvar orçamento. Por favor, tente novamente ou entre em contato via WhatsApp.',
      500
    )
  }

  // Usar ID do banco em vez de contactId gerado manualmente
  const contactId = quote.id

  // Enviar email apenas após sucesso da gravação
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
    // Dados já salvos no banco, mas e-mail falhou
    return errorResponse(
      'Orçamento salvo, mas erro ao enviar email. Entraremos em contato em breve.',
      500
    )
  }
})
