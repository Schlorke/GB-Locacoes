import Decimal from 'decimal.js'

export interface LateFeeConfig {
  dailyRate?: number // Taxa diária de multa (ex: 0.05 = 5% ao dia)
  fixedAmount?: number // Valor fixo de multa
  maxDays?: number // Número máximo de dias para calcular multa
  minAmount?: number // Valor mínimo de multa
  maxAmount?: number // Valor máximo de multa
}

export interface LateFeeResult {
  fee: Decimal
  daysLate: number
  calculationMethod: 'daily' | 'fixed'
  config: LateFeeConfig
}

/**
 * Calcula multa por atraso baseado em configuração
 * @param originalTotal Valor original do orçamento/locação
 * @param endDate Data de término prevista
 * @param currentDate Data atual (ou data de devolução)
 * @param config Configuração de cálculo de multa
 * @returns Resultado do cálculo de multa
 */
export function calculateLateFee(
  originalTotal: number | Decimal,
  endDate: Date,
  currentDate: Date = new Date(),
  config: LateFeeConfig = {}
): LateFeeResult {
  const total = new Decimal(originalTotal)
  const {
    dailyRate = 0.02, // 2% ao dia por padrão
    fixedAmount,
    maxDays,
    minAmount = 0,
    maxAmount,
  } = config

  // Calcular dias de atraso
  const daysLate = Math.max(
    0,
    Math.ceil(
      (currentDate.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24)
    )
  )

  if (daysLate <= 0) {
    return {
      fee: new Decimal(0),
      daysLate: 0,
      calculationMethod: 'daily',
      config,
    }
  }

  let fee: Decimal

  if (fixedAmount !== undefined) {
    // Usar valor fixo
    fee = new Decimal(fixedAmount)
  } else {
    // Calcular baseado em taxa diária
    const daysToCalculate = maxDays ? Math.min(daysLate, maxDays) : daysLate
    fee = total.times(dailyRate).times(daysToCalculate)
  }

  // Aplicar valor mínimo
  if (minAmount > 0 && fee.lt(minAmount)) {
    fee = new Decimal(minAmount)
  }

  // Aplicar valor máximo
  if (maxAmount !== undefined && fee.gt(maxAmount)) {
    fee = new Decimal(maxAmount)
  }

  return {
    fee,
    daysLate,
    calculationMethod: fixedAmount !== undefined ? 'fixed' : 'daily',
    config,
  }
}

/**
 * Configuração padrão de multa por atraso
 * Pode ser configurada nas settings do sistema
 */
export const DEFAULT_LATE_FEE_CONFIG: LateFeeConfig = {
  dailyRate: 0.02, // 2% ao dia
  maxDays: 30, // Máximo de 30 dias para calcular
  minAmount: 50, // Mínimo de R$ 50,00
  maxAmount: 5000, // Máximo de R$ 5.000,00
}
