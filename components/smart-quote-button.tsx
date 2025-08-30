'use client'

import { Button } from '@/components/ui/button'
import { useQuote, type PricingOption, type SelectedEquipmentForQuote } from '@/contexts/quote-context'
import Link from 'next/link'
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
  imageUrl?: string
  images?: string[]
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
  imageUrl,
  images,
  className,
  size = 'lg',
  children = 'Solicitar Orçamento Grátis'
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
      imageUrl,
      images
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
    setSelectedEquipmentForQuote,
    router
  ])

  if (!isAvailable) {
    return (
      <Button
        size={size}
        className={className}
        disabled
      >
        Equipamento Indisponível
      </Button>
    )
  }

  return (
    <Button
      size={size}
      className={className}
      onClick={handleQuoteRequest}
    >
      {children}
    </Button>
  )
}
