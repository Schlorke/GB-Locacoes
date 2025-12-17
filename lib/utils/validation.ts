/**
 * Utilitários de validação para CPF, CNPJ e outros documentos brasileiros
 */

/**
 * Valida CPF brasileiro
 * @param cpf - CPF com ou sem formatação
 * @returns true se válido, false caso contrário
 */
export function validateCPF(cpf: string): boolean {
  // Remove formatação
  const numbers = cpf.replace(/\D/g, '')

  // Verifica se tem 11 dígitos
  if (numbers.length !== 11) return false

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(numbers)) return false

  // Valida primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]!) * (10 - i)
  }
  let digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(numbers[9]!)) return false

  // Valida segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]!) * (11 - i)
  }
  digit = 11 - (sum % 11)
  if (digit >= 10) digit = 0
  if (digit !== parseInt(numbers[10]!)) return false

  return true
}

/**
 * Valida CNPJ brasileiro
 * @param cnpj - CNPJ com ou sem formatação
 * @returns true se válido, false caso contrário
 */
export function validateCNPJ(cnpj: string): boolean {
  // Remove formatação
  const numbers = cnpj.replace(/\D/g, '')

  // Verifica se tem 14 dígitos
  if (numbers.length !== 14) return false

  // Verifica se todos os dígitos são iguais (CNPJ inválido)
  if (/^(\d)\1{13}$/.test(numbers)) return false

  // Valida primeiro dígito verificador
  let length = numbers.length - 2
  let sequence = numbers.substring(0, length)
  const digits = numbers.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(sequence.charAt(length - i)!) * pos--
    if (pos < 2) pos = 9
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(0)!)) return false

  // Valida segundo dígito verificador
  length = length + 1
  sequence = numbers.substring(0, length)
  sum = 0
  pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += parseInt(sequence.charAt(length - i)!) * pos--
    if (pos < 2) pos = 9
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== parseInt(digits.charAt(1)!)) return false

  return true
}

/**
 * Busca endereço pelo CEP usando ViaCEP
 * @param cep - CEP com ou sem formatação
 * @returns Dados do endereço ou null se não encontrado
 */
export async function fetchAddressByCEP(cep: string): Promise<{
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
} | null> {
  const cleanCEP = cep.replace(/\D/g, '')
  if (cleanCEP.length !== 8) return null

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
    const data = await response.json()

    if (data.erro) return null

    return {
      logradouro: data.logradouro || '',
      complemento: data.complemento || '',
      bairro: data.bairro || '',
      localidade: data.localidade || '',
      uf: data.uf || '',
    }
  } catch {
    return null
  }
}
