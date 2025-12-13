/**
 * Gera PDF do boleto bancário
 * Em produção, usar biblioteca como pdfkit ou @react-pdf/renderer
 */

export interface BoletoPDFData {
  barcode: string
  digitableLine: string
  amount: number
  dueDate: Date
  customerName: string
  customerDocument: string
  description: string
}

/**
 * Gera PDF do boleto
 * Por enquanto, retorna buffer mockado
 * Em produção, implementar geração real de PDF
 */
export async function generateBoletoPDF(data: BoletoPDFData): Promise<Buffer> {
  // TODO: Implementar geração real de PDF usando pdfkit ou similar
  // Por enquanto, retorna PDF mockado básico

  // Estrutura básica de PDF (será substituída por implementação real)
  const pdfContent = `
%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
>>
endobj

4 0 obj
<<
/Length 200
>>
stream
BT
/F1 12 Tf
100 700 Td
(Boleto Bancario) Tj
0 -20 Td
(Linha Digitavel: ${data.digitableLine}) Tj
0 -20 Td
(Codigo de Barras: ${data.barcode}) Tj
0 -20 Td
(Valor: R$ ${data.amount.toFixed(2)}) Tj
0 -20 Td
(Vencimento: ${data.dueDate.toLocaleDateString('pt-BR')}) Tj
0 -20 Td
(Cliente: ${data.customerName}) Tj
0 -20 Td
(Documento: ${data.customerDocument}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000308 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
508
%%EOF
`

  return Buffer.from(pdfContent)
}
