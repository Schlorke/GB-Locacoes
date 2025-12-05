/**
 * Script para aplicar o template de email editado nas 3 APIs
 *
 * USO:
 * node scripts/update-email-templates.js
 */

const fs = require('fs')
const path = require('path')

// Ler o template HTML editado
const templatePath = path.join(
  __dirname,
  '../public/email-templates/quote-template.html'
)
const templateHTML = fs.readFileSync(templatePath, 'utf-8')

// Extrair apenas o <style> e o <body> (sem as instruções de edição)
const styleMatch = templateHTML.match(/<style>([\s\S]*?)<\/style>/)
const bodyContentMatch = templateHTML.match(
  /<body>([\s\S]*?)<div style="max-width: 680px; margin: 40px auto/
)

if (!styleMatch || !bodyContentMatch) {
  console.error('❌ Erro: Não foi possível extrair style ou body do template')
  process.exit(1)
}

const cssStyles = styleMatch[1].trim()
const bodyContent = bodyContentMatch[1].trim()

console.log('✅ Template extraído com sucesso!')
console.log(`📏 CSS: ${cssStyles.split('\n').length} linhas`)
console.log(`📏 HTML: ${bodyContent.split('\n').length} linhas`)

// Template base para gerar o HTML completo
function generateEmailTemplate(options = {}) {
  const { includeEquipmentsTable = false, includeTotal = false } = options

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Novo Orçamento - GB Locações</title>
        <style>
          ${cssStyles}
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="header-content">
              <div class="header-top-row">
                <div class="logo-wrapper">
                  <div class="logo">
                    <div class="logo-icon">GB</div>
                    <div class="logo-text">
                      <span class="logo-title">GB Locações</span>
                      <span class="logo-subtitle">Equipamentos para Construção</span>
                    </div>
                  </div>
                </div>

                <div class="badges-container">
                  <div class="badge-item">
                    <span class="badge-label">Data e Hora:</span>
                    <span class="badge">⏰ \${new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </div>
                  ${
                    includeTotal
                      ? `
                  <div class="badge-item">
                    <span class="badge-label">ID do Orçamento:</span>
                    <div class="quote-id">#\${_quoteId.slice(-8).toUpperCase()}</div>
                  </div>
                  `
                      : ''
                  }
                </div>
              </div>

              <div class="header-bottom-row">
                <div class="header-icon">🎯</div>
                <h1 class="header-title">
                  Nova Solicitação de <span class="highlight">Orçamento</span>
                </h1>
                <p class="subtitle header-subtitle">
                  Um cliente está interessado em seus equipamentos!
                </p>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="section-title">👤 Dados do Cliente</div>

            <div class="client-info-block">
              <div class="info-row">
                <div class="info-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                <div class="info-content">
                  <span class="info-field-label">Nome Completo</span>
                  <div class="info-field-value">\${validatedData.name}</div>
                </div>
              </div>

              <div class="info-row">
                <div class="info-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <span class="info-field-label">Email</span>
                  <div class="info-field-value">
                    <a href="mailto:\${validatedData.email}">\${validatedData.email}</a>
                  </div>
                </div>
              </div>

              <div class="info-row">
                <div class="info-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <span class="info-field-label">Telefone</span>
                  <div class="info-field-value">
                    <a href="tel:\${validatedData.phone}">\${validatedData.phone}</a>
                  </div>
                </div>
              </div>

              \${validatedData.cpf ? \`
              <div class="info-row">
                <div class="info-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <span class="info-field-label">CPF</span>
                  <div class="info-field-value">\${validatedData.cpf}</div>
                </div>
              </div>
              \` : ''}

              \${validatedData.cnpj ? \`
              <div class="info-row">
                <div class="info-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <span class="info-field-label">CNPJ</span>
                  <div class="info-field-value">\${validatedData.cnpj}</div>
                </div>
              </div>
              \` : ''}
            </div>

            \${validatedData.company || validatedData.equipment ? \`
            <div class="divider"></div>
            <div class="section-title">🏢 Informações Adicionais</div>

            <div class="client-info-block">
              \${validatedData.company ? \`
              <div class="info-row">
                <div class="info-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <span class="info-field-label">Empresa / Construtora</span>
                  <div class="info-field-value">\${validatedData.company}</div>
                </div>
              </div>
              \` : ''}

              \${validatedData.equipment ? \`
              <div class="info-row">
                <div class="info-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
                  </svg>
                </div>
                <div class="info-content">
                  <span class="info-field-label">Equipamento de Interesse</span>
                  <div class="info-field-value">\${validatedData.equipment}</div>
                </div>
              </div>
              \` : ''}
            </div>
            \` : ''}

            ${
              includeEquipmentsTable
                ? `
            <div class="divider"></div>
            <div class="section-title">📦 Equipamentos Solicitados</div>

            <table class="equipment-table">
              \${equipments.map(eq => \`
                <tr class="equipment-row">
                  <td>
                    <div class="equipment-name">\${eq.name}</div>
                    <div class="equipment-category">📂 \${eq.category}</div>
                    <div class="equipment-details">
                      \${eq.quantity}x · \${eq.days} dia(s) · \${formatCurrency(eq.pricePerDay)}/dia
                    </div>
                  </td>
                  <td>
                    <div class="equipment-price">\${formatCurrency(eq.total)}</div>
                  </td>
                </tr>
              \`).join('')}
            </table>
            `
                : ''
            }

            ${
              includeTotal
                ? `
            <div class="total-box">
              <div class="total-label">Valor Total Estimado</div>
              <div class="total-value">\${formatCurrency(totalAmount)}</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 8px;">
                *Valor sujeito a confirmação e disponibilidade
              </div>
            </div>
            `
                : ''
            }

            <div class="divider"></div>
            <div class="section-title">💬 Mensagem do Cliente</div>

            <div class="message-box">
              <div class="message-label">Detalhes da Solicitação</div>
              <div class="message-text">\${validatedData.message}</div>
            </div>
          </div>

          <div class="footer">
            <div class="footer-title">📧 Como Responder Este Orçamento</div>
            <p class="footer-text">
              Esta mensagem foi enviada automaticamente pelo sistema GB Locações.<br>
              Para responder ao cliente, clique no email abaixo:
            </p>
            <a href="mailto:\${validatedData.email}" class="footer-email">
              ✉️ \${validatedData.email}
            </a>
            <p class="footer-text" style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <strong>GB Locações</strong> - Equipamentos para Construção<br>
              ${includeTotal ? `Orçamento #\${_quoteId.slice(-8).toUpperCase()} ·` : ''} © \${new Date().getFullYear()} Todos os direitos reservados
            </p>
          </div>
        </div>
      </body>
    </html>
  `.trim()
}

// Gerar versões para cada tipo de formulário
const templates = {
  contact: generateEmailTemplate({
    includeEquipmentsTable: false,
    includeTotal: false,
  }),
  orcamentos: generateEmailTemplate({
    includeEquipmentsTable: true,
    includeTotal: true,
  }),
  quotes: generateEmailTemplate({
    includeEquipmentsTable: true,
    includeTotal: true,
  }),
}

// Salvar templates gerados
const outputDir = path.join(__dirname, '../public/email-templates/generated')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

fs.writeFileSync(
  path.join(outputDir, 'contact-template.txt'),
  templates.contact
)
fs.writeFileSync(
  path.join(outputDir, 'orcamentos-template.txt'),
  templates.orcamentos
)
fs.writeFileSync(path.join(outputDir, 'quotes-template.txt'), templates.quotes)

console.log('\n✅ Templates gerados com sucesso em:')
console.log('   📄 public/email-templates/generated/contact-template.txt')
console.log('   📄 public/email-templates/generated/orcamentos-template.txt')
console.log('   📄 public/email-templates/generated/quotes-template.txt')
console.log(
  '\n📋 Próximo passo: Copie o conteúdo desses arquivos e cole nas funções de API'
)
