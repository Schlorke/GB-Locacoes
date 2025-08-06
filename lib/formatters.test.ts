import { describe, it, expect } from 'vitest'

// Suponha que você tenha esta função em lib/formatters.ts
export function formatCurrencyBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount)
}

describe('formatCurrencyBRL', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrencyBRL(1234.56)).toBe('R$\xa01.234,56') // \xa0 é non-breaking space
  })

  it('should format zero correctly', () => {
    expect(formatCurrencyBRL(0)).toBe('R$\xa00,00')
  })

  it('should format negative numbers correctly', () => {
    // O comportamento padrão pode variar (ex: -R$ ou R$ -)
    // Este teste assume o formato comum. Ajuste se necessário.
    expect(formatCurrencyBRL(-50)).toMatch(/-R\$\s*50,00|R\$\s*-50,00/)
  })
})
