'use client'

import { Button } from '@/components/ui/button'
import {
  useQuote,
  type PricingOption,
  type SelectedEquipmentForQuote,
} from '@/contexts/quote-context'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

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
  className?: string
  size?: 'sm' | 'lg' | 'default'
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
  className,
  size = 'lg',
  children = 'Solicitar Orçamento Grátis',
}: SmartQuoteButtonProps) {
  const { setSelectedEquipmentForQuote } = useQuote()
  const router = useRouter()

  const handleQuoteRequest = useCallback(() => {
    if (!isAvailable) return

    // Preparar dados do equipamento selecionado
    const equipmentForQuote: SelectedEquipmentForQuote = {
      equipmentId,
      equipmentName,
      pricePerDay,
      selectedPeriod,
      finalPrice,
      quantity: 1,
      maxStock,
      description,
      category,
      images,
      dailyDiscount,
      weeklyDiscount,
      biweeklyDiscount,
      monthlyDiscount,
    }

    // Salvar no contexto global
    setSelectedEquipmentForQuote(equipmentForQuote)

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
    setSelectedEquipmentForQuote,
    router,
  ])

  if (!isAvailable) {
    return (
      <Button size={size} className={className} disabled>
        Equipamento Indisponível
      </Button>
    )
  }

  return (
    <Button size={size} className={className} onClick={handleQuoteRequest}>
      {children}
    </Button>
  )
}
