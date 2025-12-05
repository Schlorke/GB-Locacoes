import {
  calculateIntelligentPrice,
  getPricingConfig,
  sanitizeCartItemPricing,
} from '@/lib/pricing'
import type { Equipment } from '@prisma/client'

const PERIOD_LABELS: Record<string, string> = {
  daily: 'diaria',
  weekly: 'semanal',
  biweekly: 'quinzenal',
  monthly: 'mensal',
}

type EquipmentPricingInput = Pick<
  Equipment,
  | 'pricePerDay'
  | 'dailyDiscount'
  | 'weeklyDiscount'
  | 'biweeklyDiscount'
  | 'monthlyDiscount'
  | 'dailyDirectValue'
  | 'weeklyDirectValue'
  | 'biweeklyDirectValue'
  | 'monthlyDirectValue'
  | 'dailyUseDirectValue'
  | 'weeklyUseDirectValue'
  | 'biweeklyUseDirectValue'
  | 'monthlyUseDirectValue'
>

export function buildQuotePricing(
  equipment: EquipmentPricingInput,
  days: number,
  quantity: number
) {
  const sanitized = sanitizeCartItemPricing({
    pricePerDay: Number(equipment.pricePerDay),
    dailyDiscount: equipment.dailyDiscount ?? 0,
    weeklyDiscount: equipment.weeklyDiscount ?? 0,
    biweeklyDiscount: equipment.biweeklyDiscount ?? 0,
    monthlyDiscount: equipment.monthlyDiscount ?? 0,
    dailyDirectValue: equipment.dailyDirectValue
      ? Number(equipment.dailyDirectValue)
      : 0,
    weeklyDirectValue: equipment.weeklyDirectValue
      ? Number(equipment.weeklyDirectValue)
      : 0,
    biweeklyDirectValue: equipment.biweeklyDirectValue
      ? Number(equipment.biweeklyDirectValue)
      : 0,
    monthlyDirectValue: equipment.monthlyDirectValue
      ? Number(equipment.monthlyDirectValue)
      : 0,
    dailyUseDirectValue: equipment.dailyUseDirectValue ?? false,
    weeklyUseDirectValue: equipment.weeklyUseDirectValue ?? false,
    biweeklyUseDirectValue: equipment.biweeklyUseDirectValue ?? false,
    monthlyUseDirectValue: equipment.monthlyUseDirectValue ?? false,
  })

  const pricingConfig = getPricingConfig(sanitized, days)
  const unitTotal = calculateIntelligentPrice(sanitized, days)
  const safeDays = Math.max(1, days)

  return {
    pricePerDay: unitTotal / safeDays,
    total: unitTotal * quantity,
    pricingConfig,
    appliedPeriod: PERIOD_LABELS[pricingConfig.period] ?? 'diaria',
  }
}
