'use client'

import { Button } from '@/components/ui/button'
import { useCartStore, type CartItem } from '@/stores/useCartStore'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export interface PricingOption {
  id: string
  label: string
  period: string
  multiplier: number
  discount: number
  popular?: boolean
}

interface SmartQuoteButtonProps {
  equipmentId: string
  equipmentName: string
  pricePerDay: number
  isAvailable: boolean
  selectedPeriod: PricingOption
  finalPrice: number
  maxStock?: number
  description?: string
  category?: {
    name: string
  }
  images?: string[]
  dailyDiscount?: number
  weeklyDiscount?: number
  biweeklyDiscount?: number
  monthlyDiscount?: number
  startDate?: Date | null
  endDate?: Date | null
  selectedDays?: number
  /** Indica se finais de semana estão incluídos na contagem de dias */
  includeWeekends?: boolean
  className?: string
  size?: 'sm' | 'lg' | 'default'
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'reset'
    | 'gradient'
    | 'link'
  children?: React.ReactNode
}

export function SmartQuoteButton({
  equipmentId,
  equipmentName,
  pricePerDay,
  isAvailable,
  selectedPeriod,
  finalPrice,
  maxStock,
  description,
  category,
  images,
  dailyDiscount,
  weeklyDiscount,
  biweeklyDiscount,
  monthlyDiscount,
  startDate,
  endDate,
  selectedDays,
  includeWeekends = false,
  className,
  size = 'lg',
  variant = 'default',
  children = 'Solicitar Orçamento Grátis',
}: SmartQuoteButtonProps) {
  const { addItem } = useCartStore()
  const router = useRouter()

  const handleQuoteRequest = useCallback(() => {
    if (!isAvailable) return

    // Calcular dias: usar selectedDays se disponível, senão usar multiplier do período
    const days = selectedDays || selectedPeriod.multiplier

    // Preparar dados do equipamento selecionado
    const equipmentForQuote: CartItem = {
      equipmentId,
      equipmentName,
      pricePerDay,
      quantity: 1,
      days,
      selectedPeriod,
      finalPrice,
      maxStock,
      description,
      category,
      images,
      dailyDiscount,
      weeklyDiscount,
      biweeklyDiscount,
      monthlyDiscount,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      includeWeekends,
    }

    // Adicionar ao carrinho
    addItem(equipmentForQuote)

    // Navegar para página de orçamento
    router.push('/orcamento')
  }, [
    equipmentId,
    equipmentName,
    pricePerDay,
    selectedPeriod,
    finalPrice,
    isAvailable,
    maxStock,
    description,
    category,
    images,
    dailyDiscount,
    weeklyDiscount,
    biweeklyDiscount,
    monthlyDiscount,
    startDate,
    endDate,
    selectedDays,
    includeWeekends,
    addItem,
    router,
  ])

  if (!isAvailable) {
    return (
      <Button size={size} variant={variant} className={className} disabled>
        Equipamento Indisponível
      </Button>
    )
  }

  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={handleQuoteRequest}
    >
      {children}
    </Button>
  )
}
