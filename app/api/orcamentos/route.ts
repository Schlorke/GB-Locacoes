import {
  successResponse,
  errorResponse,
  withErrorHandling,
} from '@/lib/api-response'
import { checkRateLimit, strictRateLimit } from '@/lib/rate-limit'
import { QuoteRequestSchema } from '@/lib/validations'
import getResend from '@/lib/resend'
import { generateQuoteEmailHTML } from '@/lib/email-templates'
import { prisma } from '@/lib/prisma'
import { type NextRequest } from 'next/server'

const resend = getResend()

// Tipo estendido para itens que podem incluir campos de pricing
type QuoteItemWithPricing = {
  equipmentId: string
  quantity: number
  days: number
  appliedPeriod?: string
  appliedDiscount?: number
  useDirectValue?: boolean
  directValue?: number
  periodMultiplier?: number
}

export const POST = withErrorHandling(async (request: NextRequest) => {
  // Rate limiting
  const rateLimitResult = checkRateLimit(request, strictRateLimit)
  if (!rateLimitResult.allowed) {
    return rateLimitResult.response!
  }

  const body = await request.json()
  const validatedData = QuoteRequestSchema.parse(body)

  // Calcular total e validar equipamentos
  let totalAmount = 0
  const quoteItems = []
  const equipmentDetails = []

  for (const item of validatedData.items) {
    const equipment = await prisma.equipment.findUnique({
      where: { id: item.equipmentId },
      include: {
        category: { select: { name: true } },
      },
    })

    if (!equipment) {
      return errorResponse(
        `Equipamento não encontrado: ${item.equipmentId}`,
        400
      )
    }

    const pricePerDay = Number(equipment.pricePerDay)
    const itemTotal = pricePerDay * item.quantity * item.days
    totalAmount += itemTotal

    quoteItems.push({
      equipmentId: item.equipmentId,
      quantity: item.quantity,
      days: item.days,
      pricePerDay: equipment.pricePerDay,
      total: itemTotal,
    })

    equipmentDetails.push({
      name: equipment.name,
      category: equipment.category?.name || 'Sem categoria',
      quantity: item.quantity,
      days: item.days,
      pricePerDay: pricePerDay,
      total: itemTotal,
      // Informações de desconto/período do frontend
      appliedPeriod: (item as QuoteItemWithPricing).appliedPeriod || undefined,
      appliedDiscount:
        (item as QuoteItemWithPricing).appliedDiscount || undefined,
      useDirectValue:
        (item as QuoteItemWithPricing).useDirectValue || undefined,
      directValue: (item as QuoteItemWithPricing).directValue || undefined,
      periodMultiplier:
        (item as QuoteItemWithPricing).periodMultiplier || undefined,
    })
  }

  // Criar orçamento no banco
  const quote = await prisma.quote.create({
    data: {
      name: validatedData.customerName,
      email: validatedData.customerEmail,
      phone: validatedData.customerPhone,
      company: validatedData.customerCompany,
      message: validatedData.message,
      total: totalAmount,
      status: 'PENDING',
      items: {
        create: quoteItems,
      },
    },
  })

  // Enviar email com template profissional
  if (resend && process.env.FROM_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL,
        to: process.env.CONTACT_EMAIL || 'harryschlorke@gmail.com',
        subject: `🎯 Novo Orçamento #${quote.id.slice(-8).toUpperCase()} - ${validatedData.customerName}`,
        html: generateQuoteEmailHTML(
          {
            customerName: validatedData.customerName,
            customerEmail: validatedData.customerEmail,
            customerPhone: validatedData.customerPhone,
            customerCompany: validatedData.customerCompany,
            message: validatedData.message,
          },
          equipmentDetails,
          totalAmount,
          quote.id
        ),
      })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Não falhar se o email não enviar - orçamento já foi criado
    }
  }

  return successResponse(
    {
      id: quote.id,
      totalValue: totalAmount,
      status: 'PENDING',
    },
    201,
    'Orçamento criado com sucesso! Entraremos em contato em até 2 horas úteis.'
  )
})

// Template HTML movido para lib/email-templates.ts (função generateQuoteEmailHTML)
// Comentado para manter histórico:
/*
OLD CODE:
function generateQuoteEmailHTML(
  data: {
    customerName: string
    customerEmail: string
    customerPhone: string
    customerCompany?: string | null
    message?: string | null
  },
  equipments: Array<{
    name: string
    category: string
    quantity: number
    days: number
    pricePerDay: number
    total: number
  }>,
  totalAmount: number,
  _quoteId: string
): string {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Novo Orçamento - GB Locações</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          * { margin: 0; padding: 0; box-sizing: border-box; }

          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #1e293b;
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            padding: 20px;
          }

          .email-wrapper {
            max-width: 680px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          }

          .header {
            background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
            padding: 40px 30px;
            position: relative;
            overflow: hidden;
          }

          .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -10%;
            width: 300px;
            height: 300px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
          }

          .header::after {
            content: '';
            position: absolute;
            bottom: -30%;
            left: -5%;
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 50%;
          }

          .header-content {
            position: relative;
            z-index: 1;
          }

          .logo {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: 12px 24px;
            border-radius: 12px;
            font-size: 24px;
            font-weight: 700;
            color: white;
            margin-bottom: 20px;
            letter-spacing: 1px;
          }

          .header h1 {
            font-size: 28px;
            font-weight: 700;
            color: white;
            margin-bottom: 8px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .header .subtitle {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
          }

          .badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            color: white;
            margin-top: 12px;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .quote-id {
            display: inline-block;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            padding: 8px 20px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 700;
            color: white;
            margin-top: 16px;
            border: 2px solid rgba(255, 255, 255, 0.4);
            letter-spacing: 1px;
          }

          .content {
            padding: 40px 30px;
            background: white;
          }

          .section-title {
            font-size: 14px;
            font-weight: 700;
            color: #ea580c;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .section-title::before {
            content: '';
            width: 4px;
            height: 16px;
            background: #ea580c;
            border-radius: 2px;
          }

          .info-grid {
            display: grid;
            gap: 16px;
            margin-bottom: 30px;
          }

          .info-card {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 1px solid #fbbf24;
            border-radius: 12px;
            padding: 20px;
          }

          .info-card.primary {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border-color: #fca5a5;
          }

          .info-card.secondary {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-color: #7dd3fc;
          }

          .info-card.success {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-color: #86efac;
          }

          .info-label {
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
          }

          .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #0f172a;
            word-break: break-word;
          }

          .info-value a {
            color: #ea580c;
            text-decoration: none;
          }

          .info-value a:hover {
            color: #c2410c;
            text-decoration: underline;
          }

          .equipment-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0 12px;
            margin: 20px 0;
          }

          .equipment-row {
            background: #f8fafc;
            border-radius: 8px;
            overflow: hidden;
          }

          .equipment-row td {
            padding: 16px;
            border-top: 1px solid #e2e8f0;
            border-bottom: 1px solid #e2e8f0;
          }

          .equipment-row td:first-child {
            border-left: 4px solid #ea580c;
            border-radius: 8px 0 0 8px;
          }

          .equipment-row td:last-child {
            border-right: 1px solid #e2e8f0;
            border-radius: 0 8px 8px 0;
            text-align: right;
          }

          .equipment-name {
            font-weight: 600;
            color: #0f172a;
            margin-bottom: 4px;
          }

          .equipment-category {
            font-size: 12px;
            color: #64748b;
          }

          .equipment-details {
            font-size: 13px;
            color: #475569;
            margin-top: 4px;
          }

          .equipment-price {
            font-size: 18px;
            font-weight: 700;
            color: #ea580c;
          }

          .total-box {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border: 2px solid #fca5a5;
            border-radius: 12px;
            padding: 24px;
            margin-top: 24px;
            text-align: right;
          }

          .total-label {
            font-size: 14px;
            color: #64748b;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .total-value {
            font-size: 32px;
            font-weight: 700;
            color: #dc2626;
            margin-top: 8px;
          }

          .message-box {
            background: #f8fafc;
            border: 2px dashed #cbd5e1;
            border-radius: 12px;
            padding: 24px;
            margin-top: 20px;
          }

          .message-text {
            font-size: 15px;
            color: #1e293b;
            line-height: 1.8;
            white-space: pre-wrap;
          }

          .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
            margin: 30px 0;
          }

          .footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
          }

          .footer-text {
            font-size: 12px;
            color: #64748b;
            line-height: 1.8;
          }

          .footer-email {
            display: inline-block;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 8px 16px;
            margin-top: 12px;
            font-size: 13px;
            font-weight: 600;
            color: #ea580c;
            text-decoration: none;
          }

          @media only screen and (max-width: 600px) {
            body { padding: 10px; }
            .header { padding: 30px 20px; }
            .content { padding: 30px 20px; }
            .header h1 { font-size: 24px; }
            .total-value { font-size: 28px; }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="header-content">
              <div class="logo">GB LOCAÇÕES</div>
              <h1>📦 Novo Orçamento de Equipamentos</h1>
              <p class="subtitle">Um cliente solicitou orçamento de ${equipments.length} equipamento(s)</p>
              <span class="badge">⏰ ${new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
              <div class="quote-id">#${_quoteId.slice(-8).toUpperCase()}</div>
            </div>
          </div>

          <div class="content">
            <div class="section-title">👤 Dados do Cliente</div>

            <div class="info-grid">
              <div class="info-card primary">
                <div class="info-label">Nome Completo</div>
                <div class="info-value">${data.customerName}</div>
              </div>

              <div class="info-card secondary">
                <div class="info-label">Email</div>
                <div class="info-value">
                  <a href="mailto:${data.customerEmail}">${data.customerEmail}</a>
                </div>
              </div>

              <div class="info-card success">
                <div class="info-label">Telefone</div>
                <div class="info-value">
                  <a href="tel:${data.customerPhone}">${data.customerPhone}</a>
                </div>
              </div>
            </div>

            ${
              data.customerCompany
                ? `
              <div class="divider"></div>
              <div class="section-title">🏢 Empresa</div>
              <div class="info-grid">
                <div class="info-card">
                  <div class="info-label">Empresa / Construtora</div>
                  <div class="info-value">${data.customerCompany}</div>
                </div>
              </div>
            `
                : ''
            }

            <div class="divider"></div>
            <div class="section-title">📦 Equipamentos Solicitados</div>

            <table class="equipment-table">
              ${equipments
                .map(
                  (eq) => `
                <tr class="equipment-row">
                  <td>
                    <div class="equipment-name">${eq.name}</div>
                    <div class="equipment-category">📂 ${eq.category}</div>
                    <div class="equipment-details">
                      ${eq.quantity}x · ${eq.days} dia(s) · ${formatCurrency(eq.pricePerDay)}/dia
                    </div>
                  </td>
                  <td>
                    <div class="equipment-price">${formatCurrency(eq.total)}</div>
                  </td>
                </tr>
              `
                )
                .join('')}
            </table>

            <div class="total-box">
              <div class="total-label">Valor Total Estimado</div>
              <div class="total-value">${formatCurrency(totalAmount)}</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 8px;">
                *Valor sujeito a confirmação e disponibilidade
              </div>
            </div>

            ${
              data.message
                ? `
              <div class="divider"></div>
              <div class="section-title">💬 Mensagem do Cliente</div>
              <div class="message-box">
                <div class="message-text">${data.message}</div>
              </div>
            `
                : ''
            }
          </div>

          <div class="footer">
            <p class="footer-text">
              <strong>📧 Para responder:</strong><br>
              Clique no email abaixo para responder ao cliente
            </p>
            <a href="mailto:${data.customerEmail}" class="footer-email">
              ✉️ ${data.customerEmail}
            </a>
            <p class="footer-text" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <strong>GB Locações</strong> - Equipamentos para Construção<br>
              Orçamento #${_quoteId.slice(-8).toUpperCase()} · © ${new Date().getFullYear()}
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}
*/
