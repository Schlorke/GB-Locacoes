import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const SendWhatsAppSchema = z.object({
  to: z.string().min(1, 'Número de telefone é obrigatório'),
  message: z.string().min(1, 'Mensagem é obrigatória'),
  templateId: z.string().optional(),
  variables: z.record(z.string(), z.string()).optional(),
})

/**
 * API para enviar mensagens via WhatsApp Business API
 * Em produção, integrar com API real (Twilio, Evolution API, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = SendWhatsAppSchema.parse(body)

    const whatsappApiKey = process.env.WHATSAPP_API_KEY
    const whatsappApiUrl = process.env.WHATSAPP_API_URL

    if (!whatsappApiKey || !whatsappApiUrl) {
      // Modo mock para desenvolvimento
      console.log('WhatsApp message (mock):', {
        to: validatedData.to,
        message: validatedData.message,
      })

      return NextResponse.json({
        success: true,
        messageId: `mock_${Date.now()}`,
        note: 'Modo mock - configure WHATSAPP_API_KEY e WHATSAPP_API_URL para usar API real',
      })
    }

    // Chamada real à API do WhatsApp
    try {
      const response = await fetch(`${whatsappApiUrl}/send`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${whatsappApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: validatedData.to,
          message: validatedData.message,
          templateId: validatedData.templateId,
          variables: validatedData.variables,
        }),
      })

      if (!response.ok) {
        throw new Error(`WhatsApp API error: ${response.statusText}`)
      }

      const data = await response.json()

      return NextResponse.json({
        success: true,
        messageId: data.id || data.messageId,
      })
    } catch (apiError) {
      console.error('WhatsApp API error:', apiError)
      return NextResponse.json(
        {
          error: 'Erro ao enviar mensagem via WhatsApp',
          details:
            apiError instanceof Error ? apiError.message : 'Unknown error',
        },
        { status: 500 }
      )
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      )
    }
    console.error('Error sending WhatsApp message:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
