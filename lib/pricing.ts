import { type CartItem } from '@/stores/useCartStore'

const PERIOD_CONFIGS = [
  { key: 'monthly', threshold: 30, multiplier: 30 },
  { key: 'biweekly', threshold: 15, multiplier: 15 },
  { key: 'weekly', threshold: 7, multiplier: 7 },
  { key: 'daily', threshold: 1, multiplier: 1 },
] as const

type PeriodKey = (typeof PERIOD_CONFIGS)[number]['key']

type PricingFields = Pick<
  CartItem,
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

export type PricingConfig = {
  period: PeriodKey
  threshold: number
  multiplier: number
  discount: number
  directValue: number
  useDirectValue: boolean
}

const coerceNumber = (value: unknown, fallback = 0) => {
  const coerced = Number(value)
  return Number.isFinite(coerced) ? coerced : fallback
}

const coerceBool = (value: unknown, fallback = false) =>
  typeof value === 'boolean' ? value : fallback

export const sanitizeCartItemPricing = <T extends CartItem | PricingFields>(
  item: T
): T => {
  return {
    ...item,
    pricePerDay: coerceNumber((item as PricingFields).pricePerDay, 0),
    dailyDiscount: coerceNumber((item as PricingFields).dailyDiscount, 0),
    weeklyDiscount: coerceNumber((item as PricingFields).weeklyDiscount, 0),
    biweeklyDiscount: coerceNumber((item as PricingFields).biweeklyDiscount, 0),
    monthlyDiscount: coerceNumber((item as PricingFields).monthlyDiscount, 0),
    dailyDirectValue: coerceNumber((item as PricingFields).dailyDirectValue, 0),
    weeklyDirectValue: coerceNumber(
      (item as PricingFields).weeklyDirectValue,
      0
    ),
    biweeklyDirectValue: coerceNumber(
      (item as PricingFields).biweeklyDirectValue,
      0
    ),
    monthlyDirectValue: coerceNumber(
      (item as PricingFields).monthlyDirectValue,
      0
    ),
    dailyUseDirectValue: coerceBool(
      (item as PricingFields).dailyUseDirectValue,
      false
    ),
    weeklyUseDirectValue: coerceBool(
      (item as PricingFields).weeklyUseDirectValue,
      false
    ),
    biweeklyUseDirectValue: coerceBool(
      (item as PricingFields).biweeklyUseDirectValue,
      false
    ),
    monthlyUseDirectValue: coerceBool(
      (item as PricingFields).monthlyUseDirectValue,
      false
    ),
  }
}

export const getPricingConfig = (
  equipment: PricingFields,
  totalDays: number
): PricingConfig => {
  const sanitized = sanitizeCartItemPricing(equipment)

  const selected =
    PERIOD_CONFIGS.find((config) => totalDays >= config.threshold) ??
    PERIOD_CONFIGS[PERIOD_CONFIGS.length - 1]!

  const directValue =
    selected.key === 'monthly'
      ? sanitized.monthlyDirectValue
      : selected.key === 'biweekly'
        ? sanitized.biweeklyDirectValue
        : selected.key === 'weekly'
          ? sanitized.weeklyDirectValue
          : sanitized.dailyDirectValue

  const useDirectValue =
    selected.key === 'monthly'
      ? sanitized.monthlyUseDirectValue
      : selected.key === 'biweekly'
        ? sanitized.biweeklyUseDirectValue
        : selected.key === 'weekly'
          ? sanitized.weeklyUseDirectValue
          : sanitized.dailyUseDirectValue

  const discount =
    selected.key === 'monthly'
      ? sanitized.monthlyDiscount
      : selected.key === 'biweekly'
        ? sanitized.biweeklyDiscount
        : selected.key === 'weekly'
          ? sanitized.weeklyDiscount
          : sanitized.dailyDiscount

  return {
    period: selected.key,
    threshold: selected.threshold,
    multiplier: selected.multiplier,
    discount: useDirectValue ? 0 : (discount ?? 0),
    directValue: directValue ?? 0,
    useDirectValue: useDirectValue ?? false,
  }
}

export const calculateIntelligentPrice = (
  equipment: PricingFields,
  totalDays: number
) => {
  const sanitized = sanitizeCartItemPricing(equipment)
  const pricingConfig = getPricingConfig(sanitized, totalDays)
  const safeDays = Math.max(0, totalDays)

  if (pricingConfig.useDirectValue) {
    const directValue = coerceNumber(pricingConfig.directValue, 0)
    const multiplier = Math.max(1, pricingConfig.multiplier)

    if (directValue === 0 || safeDays === 0) {
      return 0
    }

    const completePeriods = Math.floor(safeDays / multiplier)
    const remainderDays = safeDays % multiplier
    const directValuePerDay = directValue / multiplier

    return completePeriods * directValue + remainderDays * directValuePerDay
  }

  const basePrice = sanitized.pricePerDay * safeDays
  const discountAmount = basePrice * (pricingConfig.discount / 100)
  return basePrice - discountAmount
}
