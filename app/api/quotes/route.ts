import { QuoteRequestSchema } from '@/lib/validations'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ZodError } from 'zod'
import getResend from '@/lib/resend'
import { generateQuoteEmailHTML } from '@/lib/email-templates'

const resend = getResend()

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Runtime-only Prisma import
async function getPrisma() {
  // Prisma importado estaticamente
  return prisma
}

/**
 * @openapi
 * /api/quotes:
 *   post:
 *     tags: [Quotes]
 *     summary: Solicita orçamento de equipamentos
 *     description: |
 *       Cria uma nova solicitação de orçamento para equipamentos selecionados.
 *
 *       **🌐 Endpoint Público** - Não requer autenticação
 *
 *       **Para IAs**: Use este endpoint para criar orçamentos.
 *       - Todos os campos são obrigatórios exceto 'customerCompany' e 'message'
 *       - O array 'items' deve conter objetos com equipmentId, quantity e days
 *       - O sistema calcula automaticamente preços e totais
 *
 *       **Fluxo**: Orçamento criado → Email enviado → Status PENDING
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 description: Nome do cliente
 *                 example: "João Silva"
 *               customerEmail:
 *                 type: string
 *                 format: email
 *                 description: Email de contato
 *                 example: "joao@empresa.com.br"
 *               customerPhone:
 *                 type: string
 *                 description: Telefone de contato
 *                 example: "(51) 99999-9999"
 *               customerCompany:
 *                 type: string
 *                 description: Empresa/Construtora (opcional)
 *                 example: "Construtora ABC"
 *               message:
 *                 type: string
 *                 description: Mensagem adicional (opcional)
 *                 example: "Preciso para obra de 15 dias"
 *               items:
 *                 type: array
 *                 description: Lista de equipamentos para orçamento
 *                 items:
 *                   type: object
 *                   properties:
 *                     equipmentId:
 *                       type: string
 *                       description: ID do equipamento
 *                       example: "cme0n8pld0003kytghr9tcl5n"
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       description: Quantidade de equipamentos
 *                       example: 2
 *                     days:
 *                       type: integer
 *                       minimum: 1
 *                       description: Número de dias de locação
 *                       example: 10
 *                   required: [equipmentId, quantity, days]
 *             required: [customerName, customerEmail, customerPhone, items]
 *           example:
 *             customerName: "João Silva"
 *             customerEmail: "joao@empresa.com.br"
 *             customerPhone: "(51) 99999-9999"
 *             customerCompany: "Construtora ABC"
 *             message: "Preciso para obra de 15 dias"
 *             items:
 *               - equipmentId: "cme0n8pld0003kytghr9tcl5n"
 *                 quantity: 2
 *                 days: 10
 *               - equipmentId: "cme0n8pld0003kytghr9tcl6o"
 *                 quantity: 1
 *                 days: 15
 *     responses:
 *       201:
 *         description: Orçamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID único do orçamento
 *                   example: "quote_cm123456789"
 *                 message:
 *                   type: string
 *                   description: Mensagem de confirmação
 *                   example: "Orçamento criado com sucesso! Entraremos em contato em breve."
 *                 status:
 *                   type: string
 *                   description: Status inicial do orçamento
 *                   example: "PENDING"
 *                 totalValue:
 *                   type: number
 *                   format: float
 *                   description: Valor total calculado
 *                   example: 1850.00
 *                 validUntil:
 *                   type: string
 *                   format: date
 *                   description: Data de validade do orçamento
 *                   example: "2024-02-15"
 *               required: [id, message, status, totalValue]
 *             example:
 *               id: "quote_cm123456789"
 *               message: "Orçamento criado com sucesso! Entraremos em contato em breve."
 *               status: "PENDING"
 *               totalValue: 1850.00
 *               validUntil: "2024-02-15"
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_fields:
 *                 summary: Campos obrigatórios ausentes
 *                 value:
 *                   error: "Campos obrigatórios não preenchidos"
 *               invalid_equipment:
 *                 summary: Equipamento não encontrado
 *                 value:
 *                   error: "Equipamento não encontrado: cme0n8pld0003kytghr9tcl5n"
 *               invalid_quantity:
 *                 summary: Quantidade inválida
 *                 value:
 *                   error: "Quantidade deve ser maior que 0"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Erro interno do servidor"
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validação usando schema Zod
    const validatedData = QuoteRequestSchema.parse(body)
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerCompany,
      message,
      items,
    } = validatedData

    // Calcular total
    let totalAmount = 0
    const quoteItems = []

    const prisma = await getPrisma()

    for (const item of items) {
      const equipment = await prisma.equipment.findUnique({
        where: { id: item.equipmentId },
      })

      if (!equipment) {
        return NextResponse.json(
          { error: `Equipamento não encontrado: ${item.equipmentId}` },
          { status: 400 }
        )
      }

      const pricePerDay = Number(equipment.pricePerDay)
      const itemTotal = pricePerDay * item.quantity * (item.days || 1)
      totalAmount += itemTotal

      quoteItems.push({
        equipmentId: item.equipmentId,
        quantity: item.quantity,
        days: item.days || 1,
        pricePerDay: equipment.pricePerDay,
        priceAtTime: equipment.pricePerDay,
        total: itemTotal,
      })
    }

    // Criar orçamento
    const quote = await prisma.quote.create({
      data: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        company: customerCompany,
        message,
        total: totalAmount,
        status: 'PENDING', // Fixed: using correct enum value
        items: {
          create: quoteItems,
        },
      },
      include: {
        items: {
          include: {
            equipment: {
              select: {
                name: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    // Preparar detalhes dos equipamentos para o email
    const equipmentDetails = quote.items.map((item) => ({
      name: item.equipment.name,
      category: item.equipment.category?.name || 'Sem categoria',
      quantity: item.quantity,
      days: item.days,
      pricePerDay: Number(item.pricePerDay),
      total: Number(item.total), // Convert Decimal to number
    }))

    // Enviar email
    if (resend && process.env.FROM_EMAIL) {
      try {
        await resend.emails.send({
          from: process.env.FROM_EMAIL,
          to: process.env.CONTACT_EMAIL || 'harryschlorke@gmail.com',
          subject: `🎯 Novo Orçamento #${quote.id.slice(-8).toUpperCase()} - ${customerName}`,
          html: generateQuoteEmailHTML(
            {
              customerName,
              customerEmail,
              customerPhone,
              customerCompany,
              message,
            },
            equipmentDetails,
            totalAmount,
            quote.id
          ),
        })
      } catch (emailError) {
        console.error('Failed to send email:', emailError)
        // Continue - orçamento já foi criado
      }
    }

    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar orçamento:', error)

    // Tratamento específico para erros de validação Zod
    if (error instanceof ZodError) {
      const firstError = error.issues[0]
      return NextResponse.json(
        {
          error: firstError?.message || 'Dados inválidos',
          field: firstError?.path.join('.') || 'unknown',
          details:
            process.env.NODE_ENV === 'development' ? error.issues : undefined,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

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
