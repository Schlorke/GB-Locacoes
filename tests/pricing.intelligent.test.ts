import { describe, expect, it } from 'vitest'

import {
  calculateIntelligentPrice,
  getPricingConfig,
  sanitizeCartItemPricing,
} from '@/lib/pricing'

const baseItem = {
  equipmentId: 'eq-1',
  equipmentName: 'Mock',
  pricePerDay: 100,
  quantity: 1,
  days: 1,
  dailyDiscount: 0,
  weeklyDiscount: 0,
  biweeklyDiscount: 0,
  monthlyDiscount: 0,
  dailyDirectValue: 0,
  weeklyDirectValue: 0,
  biweeklyDirectValue: 0,
  monthlyDirectValue: 0,
  dailyUseDirectValue: false,
  weeklyUseDirectValue: false,
  biweeklyUseDirectValue: false,
  monthlyUseDirectValue: false,
}

describe('pricing engine', () => {
  it('usa valor direto semanal quando configurado', () => {
    const item = {
      ...baseItem,
      pricePerDay: 100,
      weeklyDirectValue: 400,
      weeklyUseDirectValue: true,
    }

    expect(calculateIntelligentPrice(item, 7)).toBe(400)
  })

  it('usa desconto semanal quando valor direto não está habilitado', () => {
    const item = {
      ...baseItem,
      pricePerDay: 100,
      weeklyDiscount: 10,
      weeklyUseDirectValue: false,
    }

    expect(calculateIntelligentPrice(item, 7)).toBe(630) // 700 - 10%
  })

  it('respeita valor direto igual a zero (promo/gratuito)', () => {
    const item = {
      ...baseItem,
      weeklyDirectValue: 0,
      weeklyUseDirectValue: true,
    }

    expect(calculateIntelligentPrice(item, 7)).toBe(0)
  })

  it('escolhe período quinzenal quando dias >= 15', () => {
    const item = {
      ...baseItem,
      biweeklyDirectValue: 700,
      biweeklyUseDirectValue: true,
    }

    const config = getPricingConfig(item, 16)
    expect(config.period).toBe('biweekly')
    expect(calculateIntelligentPrice(item, 16)).toBeCloseTo(746.67, 2)
  })

  it('escolhe período mensal quando dias >= 30', () => {
    const item = {
      ...baseItem,
      monthlyDirectValue: 1000,
      monthlyUseDirectValue: true,
    }

    const config = getPricingConfig(item, 30)
    expect(config.period).toBe('monthly')
    expect(calculateIntelligentPrice(item, 30)).toBe(1000)
  })

  it('combina semanal com valor direto, quinzenal com desconto e mensal com valor direto', () => {
    const item = {
      ...baseItem,
      pricePerDay: 100,
      weeklyDirectValue: 400,
      weeklyUseDirectValue: true,
      biweeklyDiscount: 10,
      biweeklyUseDirectValue: false,
      monthlyDirectValue: 1200,
      monthlyUseDirectValue: true,
    }

    // 8 dias -> semanal direto por períodos completos + proporcional
    expect(calculateIntelligentPrice(item, 8)).toBeCloseTo(457.14, 2)

    // 16 dias -> cai em quinzenal com desconto (100 * 16 = 1600, -10% = 1440)
    expect(calculateIntelligentPrice(item, 16)).toBe(1440)

    // 35 dias -> mensal valor direto com proporcional (1200 + 5 dias)
    expect(calculateIntelligentPrice(item, 35)).toBe(1400)
  })

  it('ignora desconto percentual quando o período usa valor direto', () => {
    const item = {
      ...baseItem,
      pricePerDay: 100,
      weeklyDirectValue: 400,
      weeklyUseDirectValue: true,
      weeklyDiscount: 25,
    }

    const config = getPricingConfig(item, 10)
    expect(config.discount).toBe(0)
    expect(calculateIntelligentPrice(item, 10)).toBeCloseTo(571.43, 2)
  })

  it('saneia entradas inválidas antes do cálculo', () => {
    const unsafe = {
      ...baseItem,
      pricePerDay: Number.NaN,
      weeklyDiscount: '10' as unknown as number,
      weeklyDirectValue: '400' as unknown as number,
      weeklyUseDirectValue: 'true' as unknown as boolean,
    }

    const sanitized = sanitizeCartItemPricing(unsafe)
    expect(sanitized.pricePerDay).toBe(0)
    expect(sanitized.weeklyDiscount).toBe(10)
    expect(sanitized.weeklyDirectValue).toBe(400)
    expect(sanitized.weeklyUseDirectValue).toBe(false)
  })
})
