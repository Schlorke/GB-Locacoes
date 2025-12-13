/**
 * Valida linha digitável de boleto bancário
 * Segue padrão FEBRABAN
 */
export function validateDigitableLine(digitableLine: string): {
  valid: boolean
  error?: string
} {
  // Remove espaços e pontos
  const cleaned = digitableLine.replace(/[\s.-]/g, '')

  // Deve ter 47 ou 48 caracteres (dependendo do tipo)
  if (cleaned.length !== 47 && cleaned.length !== 48) {
    return {
      valid: false,
      error: 'Linha digitável deve ter 47 ou 48 caracteres',
    }
  }

  // Verificar se contém apenas números
  if (!/^\d+$/.test(cleaned)) {
    return {
      valid: false,
      error: 'Linha digitável deve conter apenas números',
    }
  }

  // Validar dígito verificador (algoritmo módulo 10 ou 11)
  // Por enquanto, validação básica - em produção, implementar algoritmo completo
  const isValid = validateCheckDigit(cleaned)

  if (!isValid) {
    return {
      valid: false,
      error: 'Dígito verificador inválido',
    }
  }

  return { valid: true }
}

/**
 * Valida código de barras de boleto
 */
export function validateBarcode(barcode: string): {
  valid: boolean
  error?: string
} {
  // Remove espaços
  const cleaned = barcode.replace(/\s/g, '')

  // Deve ter 44 caracteres
  if (cleaned.length !== 44) {
    return {
      valid: false,
      error: 'Código de barras deve ter 44 caracteres',
    }
  }

  // Verificar se contém apenas números
  if (!/^\d+$/.test(cleaned)) {
    return {
      valid: false,
      error: 'Código de barras deve conter apenas números',
    }
  }

  // Validar dígito verificador
  const isValid = validateBarcodeCheckDigit(cleaned)

  if (!isValid) {
    return {
      valid: false,
      error: 'Dígito verificador do código de barras inválido',
    }
  }

  return { valid: true }
}

/**
 * Valida dígito verificador usando módulo 10 ou 11
 * Implementação simplificada - em produção, usar algoritmo FEBRABAN completo
 */
function validateCheckDigit(_digitableLine: string): boolean {
  // Implementação básica - em produção, implementar algoritmo completo
  // Por enquanto, retorna true para permitir desenvolvimento
  // TODO: Implementar validação completa do dígito verificador
  return true
}

/**
 * Valida dígito verificador do código de barras
 */
function validateBarcodeCheckDigit(_barcode: string): boolean {
  // Implementação básica - em produção, implementar algoritmo completo
  // Por enquanto, retorna true para permitir desenvolvimento
  // TODO: Implementar validação completa do dígito verificador
  return true
}

/**
 * Formata linha digitável para exibição
 * Formato: 00000.00000 00000.000000 00000.000000 0 00000000000000
 */
export function formatDigitableLine(digitableLine: string): string {
  const cleaned = digitableLine.replace(/[\s.-]/g, '')

  if (cleaned.length === 47) {
    // Formato padrão
    return `${cleaned.substring(0, 5)}.${cleaned.substring(5, 10)} ${cleaned.substring(10, 15)}.${cleaned.substring(15, 21)} ${cleaned.substring(21, 26)}.${cleaned.substring(26, 32)} ${cleaned.substring(32, 33)} ${cleaned.substring(33, 47)}`
  }

  return digitableLine
}

/**
 * Extrai valor do boleto da linha digitável
 */
export function extractAmountFromDigitableLine(
  digitableLine: string
): number | null {
  try {
    digitableLine.replace(/[\s.-]/g, '')
    // Em boletos, o valor geralmente está em posições específicas
    // Por enquanto, retorna null - em produção, implementar extração real
    // TODO: Implementar extração de valor baseado no tipo de boleto
    return null
  } catch {
    return null
  }
}

/**
 * Extrai data de vencimento do boleto da linha digitável
 */
export function extractDueDateFromDigitableLine(
  digitableLine: string
): Date | null {
  try {
    digitableLine.replace(/[\s.-]/g, '')
    // Em boletos, a data está codificada no fator de vencimento
    // Por enquanto, retorna null - em produção, implementar extração real
    // TODO: Implementar extração de data baseado no fator de vencimento FEBRABAN
    return null
  } catch {
    return null
  }
}
