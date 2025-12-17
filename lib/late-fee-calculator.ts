import Decimal from 'decimal.js'
import { prisma } from './prisma'

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

/**
 * Calcula e aplica multas por atraso em lote para orçamentos elegíveis.
 *
 * Regra de negócio:
 * - Considera apenas orçamentos com data de término passada (endDate < hoje)
 * - Status deve ser APPROVED ou COMPLETED
 * - Não sobrescreve multas aprovadas
 * - Apenas grava/atualiza o campo lateFee; aprovação continua manual
 */
export async function calculateAndApplyLateFees() {
  const now = new Date()

  const quotes = await prisma.quote.findMany({
    where: {
      endDate: {
        lt: now,
      },
      status: {
        in: ['APPROVED', 'COMPLETED'],
      },
      OR: [{ lateFeeApproved: null }, { lateFeeApproved: false }],
    },
    select: {
      id: true,
      total: true,
      originalTotal: true,
      endDate: true,
      lateFee: true,
    },
  })

  let processed = 0
  let updated = 0
  const errors: Array<{ id: string; error: string }> = []

  for (const quote of quotes) {
    processed += 1

    if (!quote.endDate) {
      continue
    }

    try {
      const baseValue = quote.originalTotal
        ? Number(quote.originalTotal)
        : Number(quote.total)

      const result = calculateLateFee(
        baseValue,
        new Date(quote.endDate),
        now,
        DEFAULT_LATE_FEE_CONFIG
      )

      if (result.daysLate <= 0 || result.fee.lte(0)) {
        continue
      }

      const currentLateFee =
        quote.lateFee !== null && quote.lateFee !== undefined
          ? new Decimal(quote.lateFee as unknown as number)
          : null

      if (currentLateFee && currentLateFee.eq(result.fee)) {
        continue
      }

      await prisma.quote.update({
        where: { id: quote.id },
        data: {
          lateFee: result.fee.toNumber(),
        },
      })

      updated += 1
    } catch (error) {
      errors.push({
        id: quote.id,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }

  return {
    processedQuotes: processed,
    updatedQuotes: updated,
    failedQuotes: errors.length,
    errors,
    timestamp: now.toISOString(),
  }
}
