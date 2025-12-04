import {
  successResponse,
  errorResponse,
  withErrorHandling,
} from '@/lib/api-response'
import { checkRateLimit, strictRateLimit } from '@/lib/rate-limit'
import { ContactSchema } from '@/lib/validations'
import { type ValidatedContactData } from '@/lib/validations/contact-types'
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

  // Enviar email
  try {
    const emailResult = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.CONTACT_EMAIL || 'harryschlorke@gmail.com',
      subject: `🎯 Novo Orçamento - ${validatedData.name}`,
      html: `
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
                transition: transform 0.2s, box-shadow 0.2s;
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
                display: flex;
                align-items: center;
                gap: 6px;
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
                transition: color 0.2s;
              }

              .info-value a:hover {
                color: #c2410c;
                text-decoration: underline;
              }

              .message-box {
                background: #f8fafc;
                border: 2px dashed #cbd5e1;
                border-radius: 12px;
                padding: 24px;
                margin-top: 20px;
              }

              .message-label {
                font-size: 12px;
                font-weight: 700;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 12px;
              }

              .message-text {
                font-size: 15px;
                color: #1e293b;
                line-height: 1.8;
                white-space: pre-wrap;
                word-break: break-word;
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

              .footer-title {
                font-size: 13px;
                font-weight: 600;
                color: #475569;
                margin-bottom: 12px;
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
                transition: all 0.2s;
              }

              .footer-email:hover {
                background: #fef2f2;
                border-color: #ea580c;
                transform: translateY(-2px);
              }

              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: middle;
              }

              @media only screen and (max-width: 600px) {
                body { padding: 10px; }
                .header { padding: 30px 20px; }
                .content { padding: 30px 20px; }
                .footer { padding: 20px; }
                .header h1 { font-size: 24px; }
              }
            </style>
          </head>
          <body>
            <div class="email-wrapper">
              <!-- Header -->
              <div class="header">
                <div class="header-content">
                  <div class="logo">GB LOCAÇÕES</div>
                  <h1>🎯 Nova Solicitação de Orçamento</h1>
                  <p class="subtitle">Um cliente está interessado em seus equipamentos!</p>
                  <span class="badge">⏰ ${new Date().toLocaleString('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}</span>
                </div>
              </div>

              <!-- Content -->
              <div class="content">
                <!-- Dados do Cliente -->
                <div class="section-title">👤 Dados do Cliente</div>

                <div class="info-grid">
                  <div class="info-card primary">
                    <div class="info-label">
                      <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                      </svg>
                      Nome Completo
                    </div>
                    <div class="info-value">${validatedData.name}</div>
                  </div>

                  <div class="info-card secondary">
                    <div class="info-label">
                      <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      Email
                    </div>
                    <div class="info-value">
                      <a href="mailto:${validatedData.email}">${validatedData.email}</a>
                    </div>
                  </div>

                  <div class="info-card success">
                    <div class="info-label">
                      <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      Telefone
                    </div>
                    <div class="info-value">
                      <a href="tel:${validatedData.phone}">${validatedData.phone}</a>
                    </div>
                  </div>
                </div>

                ${
                  validatedData.company || validatedData.equipment
                    ? `
                  <div class="divider"></div>
                  <div class="section-title">🏢 Informações Adicionais</div>
                  <div class="info-grid">
                `
                    : ''
                }

                ${
                  validatedData.company
                    ? `
                  <div class="info-card">
                    <div class="info-label">
                      <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"/>
                      </svg>
                      Empresa / Construtora
                    </div>
                    <div class="info-value">${validatedData.company}</div>
                  </div>
                `
                    : ''
                }

                ${
                  validatedData.equipment
                    ? `
                  <div class="info-card">
                    <div class="info-label">
                      <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
                      </svg>
                      Equipamento de Interesse
                    </div>
                    <div class="info-value">${validatedData.equipment}</div>
                  </div>
                `
                    : ''
                }

                ${validatedData.company || validatedData.equipment ? `</div>` : ''}

                ${
                  validatedData.cpf || validatedData.cnpj
                    ? `
                  <div class="divider"></div>
                  <div class="section-title">📄 Documentação</div>
                  <div class="info-grid">
                `
                    : ''
                }

                ${
                  validatedData.cpf
                    ? `
                  <div class="info-card secondary">
                    <div class="info-label">
                      <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                      </svg>
                      CPF
                    </div>
                    <div class="info-value">${validatedData.cpf}</div>
                  </div>
                `
                    : ''
                }

                ${
                  validatedData.cnpj
                    ? `
                  <div class="info-card secondary">
                    <div class="info-label">
                      <svg class="icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"/>
                      </svg>
                      CNPJ
                    </div>
                    <div class="info-value">${validatedData.cnpj}</div>
                  </div>
                `
                    : ''
                }

                ${validatedData.cpf || validatedData.cnpj ? `</div>` : ''}

                <!-- Mensagem -->
                <div class="divider"></div>
                <div class="section-title">💬 Mensagem do Cliente</div>

                <div class="message-box">
                  <div class="message-label">Detalhes da Solicitação</div>
                  <div class="message-text">${validatedData.message}</div>
                </div>
              </div>

              <!-- Footer -->
              <div class="footer">
                <div class="footer-title">📧 Como Responder Este Orçamento</div>
                <p class="footer-text">
                  Esta mensagem foi enviada automaticamente pelo sistema GB Locações.<br>
                  Para responder ao cliente, clique no email abaixo:
                </p>
                <a href="mailto:${validatedData.email}" class="footer-email">
                  ✉️ ${validatedData.email}
                </a>
                <p class="footer-text" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                  <strong>GB Locações</strong> - Equipamentos para Construção<br>
                  © ${new Date().getFullYear()} Todos os direitos reservados
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (emailResult.error) {
      throw new Error(emailResult.error.message)
    }

    return successResponse(
      { messageId: `msg_${Date.now()}` },
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
