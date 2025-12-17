/**
 * Templates de Email - GB Locações
 * Versão compatível com todos os clientes de email (usa tables + emojis)
 */

import { type ValidatedContactData } from './validations/contact-types'

/**
 * Gera email HTML para formulário de contato simples
 * COMPATÍVEL com Outlook, Gmail, Apple Mail, Zoho, etc.
 */
export function generateContactEmailHTML(
  validatedData: ValidatedContactData,
  contactId: string
): string {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Novo Orçamento - GB Locações</title>
      </head>
      <body style="margin: 0; padding: 0; background: #f1f5f9; font-family: 'Arial', sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f1f5f9; padding: 20px;">
          <tr>
            <td align="center">
              <!-- Main Container -->
              <table width="680" cellpadding="0" cellspacing="0" border="0" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); max-width: 680px;">

                <!-- HEADER -->
                <tr>
                  <td style="background: linear-gradient(135deg, #334155 0%, #475569 100%); padding: 40px 30px; position: relative;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="top" width="60%">
                          <!-- Logo -->
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 48px; height: 48px; background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%); border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px; font-weight: 700; color: white;">
                                GB
                              </td>
                              <td style="padding-left: 12px; vertical-align: middle;">
                                <div style="font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1; letter-spacing: 0.5px;">GB Locações</div>
                                <div style="font-size: 11px; font-weight: 500; color: #ffffff; line-height: 1; margin-top: 6px;">Equipamentos para Construção</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="top" width="40%" align="right">
                          <!-- Badges em linha -->
                          <table cellpadding="0" cellspacing="0" border="0" align="right">
                            <tr>
                              <td style="padding-right: 12px;">
                                <div style="font-size: 9px; font-weight: 600; color: #ffffff; text-transform: uppercase; margin-bottom: 6px;">Data e Hora:</div>
                                <div style="background: rgba(255, 255, 255, 0.25); padding: 8px 16px; border-radius: 24px; font-size: 12px; font-weight: 600; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); white-space: nowrap;">⏰ ${new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</div>
                              </td>
                              <td>
                                <div style="font-size: 9px; font-weight: 600; color: #ffffff; text-transform: uppercase; margin-bottom: 6px;">ID do Orçamento:</div>
                                <div style="background: rgba(255, 255, 255, 0.25); padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: 700; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); white-space: nowrap;">#${contactId.slice(-8).toUpperCase()}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 24px;">
                          <!-- Título -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="50" style="font-size: 36px; line-height: 1; vertical-align: top;">🎯</td>
                              <td style="vertical-align: top; padding-left: 8px;">
                                <h1 style="font-size: 28px; font-weight: 700; color: #ffffff; margin: 0;">
                                  Nova Solicitação de <span style="color: #ffd700; text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.5);">Orçamento</span>
                                </h1>
                                <p style="font-size: 14px; color: #ffffff; font-weight: 500; margin: 8px 0 0 0;">
                                  Um cliente está interessado em seus equipamentos!
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="padding: 40px 30px; background: white;">

                    <!-- Título da Seção -->
                    <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">👤 Dados do Cliente</div>

                    <!-- Bloco de Dados do Cliente -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 3px solid #f97316; border-radius: 12px; margin-bottom: 30px;">

                      <!-- Nome -->
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                👤
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Nome Completo</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b; line-height: 1.5;">${validatedData.name}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      ${
                        validatedData.cpf
                          ? `
                      <!-- CPF -->
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                📄
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">CPF</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b; line-height: 1.5;">${validatedData.cpf}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }

                      <!-- Email -->
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                ✉️
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Email</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b; line-height: 1.5;">
                                  <a href="mailto:${validatedData.email}" style="color: #ea580c; text-decoration: none;">${validatedData.email}</a>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <!-- Telefone -->
                      <tr>
                        <td style="padding: 20px 24px; ${validatedData.cep ? 'border-bottom: 1px solid #f1f5f9;' : ''}">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                📞
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Telefone</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b; line-height: 1.5;">
                                  <a href="tel:${validatedData.phone}" style="color: #ea580c; text-decoration: none;">${validatedData.phone}</a>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      ${
                        validatedData.cep
                          ? `
                      <!-- CEP -->
                      <tr>
                        <td style="padding: 20px 24px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                📍
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">CEP</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b; line-height: 1.5;">${validatedData.cep}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }
                    </table>

                    ${
                      validatedData.company ||
                      validatedData.cnpj ||
                      validatedData.equipment
                        ? `
                    <!-- Divider -->
                    <div style="height: 1px; background: #e2e8f0; margin: 30px 0;"></div>

                    <!-- Informações Adicionais -->
                    <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">🏢 Informações Adicionais</div>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 3px solid #f97316; border-radius: 12px; margin-bottom: 30px;">
                      ${
                        validatedData.company
                          ? `
                      <tr>
                        <td style="padding: 20px 24px; ${validatedData.cnpj || validatedData.equipment ? 'border-bottom: 1px solid #f1f5f9;' : ''}">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                🏢
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Empresa / Construtora</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b; line-height: 1.5;">${validatedData.company}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }

                      ${
                        validatedData.cnpj
                          ? `
                      <tr>
                        <td style="padding: 20px 24px; ${validatedData.equipment ? 'border-bottom: 1px solid #f1f5f9;' : ''}">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                📋
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">CNPJ</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b; line-height: 1.5;">${validatedData.cnpj}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }

                      ${
                        validatedData.equipment
                          ? `
                      <tr>
                        <td style="padding: 20px 24px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                🛠️
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Equipamento de Interesse</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b; line-height: 1.5;">${validatedData.equipment}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }
                    </table>
                    `
                        : ''
                    }

                    <!-- Divider -->
                    <div style="height: 1px; background: #e2e8f0; margin: 30px 0;"></div>

                    <!-- Mensagem -->
                    <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">💬 Mensagem do Cliente</div>

                    <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 24px;">
                      <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Detalhes da Solicitação</div>
                      <div style="font-size: 15px; color: #1e293b; line-height: 1.8; white-space: pre-line;">${validatedData.message}</div>
                    </div>
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <div style="font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 12px;">📧 Como Responder Este Orçamento</div>
                    <p style="font-size: 12px; color: #64748b; line-height: 1.8; margin: 0;">
                      Esta mensagem foi enviada automaticamente pelo sistema GB Locações.<br>
                      Para responder ao cliente, clique no email abaixo:
                    </p>
                    <a href="mailto:${validatedData.email}" style="display: inline-block; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 16px; margin-top: 12px; font-size: 13px; font-weight: 600; color: #ea580c; text-decoration: none;">
                      ✉️ ${validatedData.email}
                    </a>
                    <p style="font-size: 12px; color: #64748b; line-height: 1.8; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                      <strong>GB Locações</strong> - Equipamentos para Construção<br>
                      Orçamento #${contactId.slice(-8).toUpperCase()} · © ${new Date().getFullYear()}
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

/**
 * Gera email HTML para orçamentos completos (com lista de equipamentos e valores)
 */
export function generateQuoteEmailHTML(
  data: {
    customerName: string
    customerEmail: string
    customerPhone: string
    cpf?: string | null
    cnpj?: string | null
    cep?: string | null
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
    image?: string | null
    appliedPeriod?: string
    appliedDiscount?: number
    useDirectValue?: boolean
    directValue?: number
    periodMultiplier?: number
  }>,
  totalAmount: number,
  quoteId: string
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
      </head>
      <body style="margin: 0; padding: 0; background: #f1f5f9; font-family: 'Arial', sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f1f5f9; padding: 20px;">
          <tr>
            <td align="center">
              <table width="680" cellpadding="0" cellspacing="0" border="0" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); max-width: 680px;">

                <!-- HEADER -->
                <tr>
                  <td style="background: linear-gradient(135deg, #334155 0%, #475569 100%); padding: 40px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="top" width="60%">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 48px; height: 48px; background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%); border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px; font-weight: 700; color: white;">GB</td>
                              <td style="padding-left: 12px; vertical-align: middle;">
                                <div style="font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1;">GB Locações</div>
                                <div style="font-size: 11px; font-weight: 500; color: #ffffff; margin-top: 6px;">Equipamentos para Construção</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="top" width="40%" align="right">
                          <table cellpadding="0" cellspacing="0" border="0" align="right">
                            <tr>
                              <td style="padding-right: 12px;">
                                <div style="font-size: 9px; font-weight: 600; color: #ffffff; text-transform: uppercase; margin-bottom: 6px;">Data e Hora:</div>
                                <div style="background: rgba(255, 255, 255, 0.25); padding: 8px 16px; border-radius: 24px; font-size: 12px; font-weight: 600; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); white-space: nowrap;">⏰ ${new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</div>
                              </td>
                              <td>
                                <div style="font-size: 9px; font-weight: 600; color: #ffffff; text-transform: uppercase; margin-bottom: 6px;">ID do Orçamento:</div>
                                <div style="background: rgba(255, 255, 255, 0.25); padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: 700; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); white-space: nowrap;">#${quoteId.slice(-8).toUpperCase()}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 24px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="50" style="font-size: 36px; vertical-align: top;">🎯</td>
                              <td style="vertical-align: top; padding-left: 8px;">
                                <h1 style="font-size: 28px; font-weight: 700; color: #ffffff; margin: 0;">
                                  Nova Solicitação de <span style="color: #ffd700; text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.5);">Orçamento</span>
                                </h1>
                                <p style="font-size: 14px; color: #ffffff; margin: 8px 0 0 0;">
                                  Cliente solicitou orçamento de ${equipments.length} equipamento(s)
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px;">👤 Dados do Cliente</div>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 3px solid #f97316; border-radius: 12px; margin-bottom: 30px;">
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                👤
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Nome Completo</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b;">${data.customerName}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${
                        data.cpf
                          ? `
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                🪪
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">CPF</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b;">${data.cpf}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }
                      <tr>
                        <td style="padding: 20px 24px; border-bottom: 1px solid #f1f5f9;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                ✉️
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Email</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b;">
                                  <a href="mailto:${data.customerEmail}" style="color: #ea580c; text-decoration: none;">${data.customerEmail}</a>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 24px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                📞
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Telefone</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b;">
                                  <a href="tel:${data.customerPhone}" style="color: #ea580c; text-decoration: none;">${data.customerPhone}</a>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    ${
                      data.customerCompany || data.cnpj || data.cep
                        ? `
                    <div style="height: 1px; background: #e2e8f0; margin: 30px 0;"></div>
                    <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; margin-bottom: 20px;">🏢 Informações Adicionais</div>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff; border: 1px solid #e2e8f0; border-left: 3px solid #f97316; border-radius: 12px; margin-bottom: 30px;">
                      ${
                        data.customerCompany
                          ? `
                      <tr>
                        <td style="padding: 20px 24px; ${data.cnpj ? 'border-bottom: 1px solid #f1f5f9;' : ''}">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                🏢
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">Empresa / Construtora</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b;">${data.customerCompany}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }
                      ${
                        data.cnpj
                          ? `
                      <tr>
                        <td style="padding: 20px 24px; ${data.cep ? 'border-bottom: 1px solid #f1f5f9;' : ''}">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                🧾
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">CNPJ</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b;">${data.cnpj}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }
                      ${
                        data.cep
                          ? `
                      <tr>
                        <td style="padding: 20px 24px;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 40px; height: 40px; background: #fef3f2; border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px;">
                                📍
                              </td>
                              <td style="padding-left: 16px; vertical-align: middle;">
                                <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">CEP</div>
                                <div style="font-size: 15px; font-weight: 600; color: #1e293b;">${data.cep}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }
                    </table>
                    `
                        : ''
                    }

                    <div style="height: 1px; background: #e2e8f0; margin: 30px 0;"></div>
                    <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; margin-bottom: 20px;">📦 Equipamentos Solicitados</div>

                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0 12px; margin: 8px 0;">
                      ${equipments
                        .map(
                          (eq) => `
                        <tr>
                          <td colspan="2" style="padding: 0;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f8fafc; border-left: 4px solid #f97316; border-radius: 8px; overflow: hidden;">
                              <tr>
                                ${
                                  eq.image
                                    ? `<td width="90" style="padding: 9px; vertical-align: middle;">
                                      <img src="${eq.image}" alt="${eq.name}" width="82" height="82" style="display: block; margin: 0 auto; border-radius: 12px; object-fit: cover;" />
                                    </td>`
                                    : ''
                                }
                                <td style="padding: 9px 16px 9px 9px;">
                                  <div style="font-weight: 600; color: #0f172a; margin-bottom: 4px;">${eq.name}</div>
                                  <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">📂 ${eq.category}</div>
                                  <div style="font-size: 13px; color: #475569;">
                                    ${eq.quantity}x • ${eq.days} dia(s) • ${formatCurrency(eq.pricePerDay)}/dia
                                  </div>
                                  ${
                                    eq.appliedPeriod &&
                                    (eq.appliedDiscount || eq.useDirectValue)
                                      ? `
                                  <div style="font-size: 12px; color: #059669; font-weight: 600; margin-top: 6px; padding: 4px 8px; background: #d1fae5; border-radius: 4px; display: inline-block;">
                                    ${
                                      eq.useDirectValue && eq.directValue
                                        ? `💰 Valor ${eq.appliedPeriod}: ${formatCurrency(eq.directValue)} (${eq.periodMultiplier || 1} dias)`
                                        : `🏷️ Desc. ${eq.appliedPeriod.charAt(0).toUpperCase() + eq.appliedPeriod.slice(1)}: -${eq.appliedDiscount}%`
                                    }
                                  </div>
                                  `
                                      : ''
                                  }
                                </td>
                                <td width="150" align="right" style="padding: 16px; vertical-align: top;">
                                  <div style="font-size: 18px; font-weight: 700; color: #ea580c;">${formatCurrency(eq.total)}</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      `
                        )
                        .join('')}
                    </table>

                    <div style="background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%); border-radius: 12px; padding: 24px; margin-top: 24px; text-align: right;">
                      <div style="font-size: 14px; color: #64748b; font-weight: 600; text-transform: uppercase;">Valor Total Estimado</div>
                      <div style="font-size: 32px; font-weight: 700; color: #ea580c; margin-top: 8px;">${formatCurrency(totalAmount)}</div>
                      <div style="font-size: 12px; color: #64748b; margin-top: 8px;">*Valor sujeito a confirmação e disponibilidade</div>
                    </div>

                    ${
                      data.message
                        ? `
                    <div style="height: 1px; background: #e2e8f0; margin: 30px 0;"></div>
                    <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; margin-bottom: 20px;">💬 Mensagem do Cliente</div>
                    <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 24px;">
                      <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">Detalhes da Solicitação</div>
                      <div style="font-size: 15px; color: #1e293b; line-height: 1.8; white-space: pre-line;">${data.message}</div>
                    </div>
                    `
                        : ''
                    }
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="background: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <div style="font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 12px;">📧 Como Responder Este Orçamento</div>
                    <p style="font-size: 12px; color: #64748b; margin: 0;">
                      Esta mensagem foi enviada automaticamente pelo sistema GB Locações.<br>
                      Para responder ao cliente, clique no email abaixo:
                    </p>
                    <a href="mailto:${data.customerEmail}" style="display: inline-block; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 16px; margin-top: 12px; font-size: 13px; font-weight: 600; color: #ea580c; text-decoration: none;">
                      ✉️ ${data.customerEmail}
                    </a>
                    <p style="font-size: 12px; color: #64748b; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                      <strong>GB Locações</strong> - Equipamentos para Construção<br>
                      Orçamento #${quoteId.slice(-8).toUpperCase()} · © ${new Date().getFullYear()}
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

/**
 * Gera email HTML para notificar mudança de status de um orçamento
 * Inclui comparação de valores e, quando aplicável, informações de multa por atraso.
 */
export function generateQuoteStatusChangeEmailHTML(
  customerName: string,
  quoteId: string,
  status: 'APPROVED' | 'REJECTED' | 'COMPLETED',
  originalTotal: number,
  finalTotal: number | null,
  priceAdjustmentReason: string | null,
  lateFee: number | null,
  lateFeeApproved: boolean
): string {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const statusLabel =
    status === 'APPROVED'
      ? 'Aprovado'
      : status === 'REJECTED'
        ? 'Rejeitado'
        : 'Convertido em Locação'

  const statusEmoji =
    status === 'APPROVED' ? '✅' : status === 'REJECTED' ? '❌' : '🎉'

  const hasAdjustment =
    finalTotal !== null &&
    typeof finalTotal === 'number' &&
    finalTotal !== originalTotal

  const hasLateFee = lateFee !== null && typeof lateFee === 'number'

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Status do Orçamento Atualizado - GB Locações</title>
      </head>
      <body style="margin: 0; padding: 0; background: #f1f5f9; font-family: 'Arial', sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f1f5f9; padding: 20px;">
          <tr>
            <td align="center">
              <table width="680" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); max-width: 680px;">

                <!-- HEADER -->
                <tr>
                  <td style="background: linear-gradient(135deg, #334155 0%, #475569 100%); padding: 40px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="top" width="60%">
                          <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 48px; height: 48px; background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%); border-radius: 8px; text-align: center; vertical-align: middle; font-size: 20px; font-weight: 700; color: #ffffff;">
                                GB
                              </td>
                              <td style="padding-left: 12px; vertical-align: middle;">
                                <div style="font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1;">GB Locações</div>
                                <div style="font-size: 11px; font-weight: 500; color: #ffffff; margin-top: 6px;">Equipamentos para Construção</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="top" width="40%" align="right">
                          <table cellpadding="0" cellspacing="0" border="0" align="right">
                            <tr>
                              <td style="padding-right: 12px;">
                                <div style="font-size: 9px; font-weight: 600; color: #ffffff; text-transform: uppercase; margin-bottom: 6px;">Data e Hora:</div>
                                <div style="background: rgba(255, 255, 255, 0.25); padding: 8px 16px; border-radius: 24px; font-size: 12px; font-weight: 600; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); white-space: nowrap;">⏰ ${new Date().toLocaleString(
                                  'pt-BR',
                                  { dateStyle: 'short', timeStyle: 'short' }
                                )}</div>
                              </td>
                              <td>
                                <div style="font-size: 9px; font-weight: 600; color: #ffffff; text-transform: uppercase; margin-bottom: 6px;">ID do Orçamento:</div>
                                <div style="background: rgba(255, 255, 255, 0.25); padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: 700; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.3); white-space: nowrap;">#${quoteId
                                  .slice(-8)
                                  .toUpperCase()}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 24px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="50" style="font-size: 36px; vertical-align: top;">${statusEmoji}</td>
                              <td style="vertical-align: top; padding-left: 8px;">
                                <h1 style="font-size: 26px; font-weight: 700; color: #ffffff; margin: 0;">
                                  Status do seu <span style="color: #ffd700; text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.5);">Orçamento</span> foi atualizado
                                </h1>
                                <p style="font-size: 14px; color: #ffffff; margin: 8px 0 0 0;">
                                  Olá, ${customerName}! O status do seu orçamento agora é: <strong>${statusLabel}</strong>.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CONTENT -->
                <tr>
                  <td style="padding: 32px 30px 36px 30px;">
                    <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 18px;">📊 Resumo dos Valores</div>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 16px 20px; border-bottom: 1px solid #f1f5f9;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 13px; color: #64748b;">Valor Original</td>
                              <td align="right" style="font-size: 15px; font-weight: 700; color: #0f172a;">${formatCurrency(
                                originalTotal
                              )}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${
                        hasAdjustment
                          ? `
                      <tr>
                        <td style="padding: 16px 20px; border-bottom: 1px solid #f1f5f9;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 13px; color: #64748b;">Valor Final Editado</td>
                              <td align="right" style="font-size: 15px; font-weight: 700; color: #ea580c;">${formatCurrency(
                                finalTotal as number
                              )}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }
                      ${
                        hasLateFee
                          ? `
                      <tr>
                        <td style="padding: 16px 20px;">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%">
                            <tr>
                              <td style="font-size: 13px; color: #64748b;">Multa por atraso</td>
                              <td align="right" style="font-size: 15px; font-weight: 700; color: ${
                                lateFeeApproved ? '#b91c1c' : '#f97316'
                              };">
                                ${formatCurrency(lateFee as number)}
                              </td>
                            </tr>
                            <tr>
                              <td colspan="2" style="padding-top: 6px; font-size: 11px; color: #6b7280;">
                                ${
                                  lateFeeApproved
                                    ? '✔️ Multa aprovada e considerada no valor final.'
                                    : '⏳ Multa calculada, aguardando aprovação do administrador.'
                                }
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `
                          : ''
                      }
                    </table>

                    ${
                      priceAdjustmentReason
                        ? `
                    <div style="font-size: 14px; font-weight: 700; color: #1e293b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">📝 Justificativa do Ajuste</div>
                    <div style="background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 18px 20px; font-size: 13px; color: #1f2933; line-height: 1.7;">
                      ${priceAdjustmentReason}
                    </div>
                    `
                        : ''
                    }

                    <div style="margin-top: 28px; font-size: 12px; color: #64748b; line-height: 1.7;">
                      Se tiver qualquer dúvida sobre os valores ou o status do seu orçamento, você pode responder diretamente a este email e nossa equipe terá prazer em ajudar.
                    </div>
                  </td>
                </tr>

                <!-- FOOTER -->
                <tr>
                  <td style="background: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <div style="font-size: 12px; color: #64748b; line-height: 1.7; margin: 0;">
                      <strong>GB Locações</strong> - Equipamentos para Construção<br>
                      Orçamento #${quoteId.slice(-8).toUpperCase()} · © ${new Date().getFullYear()}
                    </div>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}
