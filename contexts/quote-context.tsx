'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface PricingOption {
  id: string
  label: string
  period: string
  multiplier: number
  discount: number
  popular?: boolean
}

export interface SelectedEquipmentForQuote {
  equipmentId: string
  equipmentName: string
  pricePerDay: number
  selectedPeriod: PricingOption
  finalPrice: number
  quantity: number
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
}

interface QuoteContextType {
  selectedEquipmentForQuote: SelectedEquipmentForQuote | null
  setSelectedEquipmentForQuote: (
    equipment: SelectedEquipmentForQuote | null
  ) => void
  clearSelection: () => void
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [selectedEquipmentForQuote, setSelectedEquipmentForQuote] =
    useState<SelectedEquipmentForQuote | null>(null)

  const clearSelection = () => {
    setSelectedEquipmentForQuote(null)
  }

  return (
    <QuoteContext.Provider
      value={{
        selectedEquipmentForQuote,
        setSelectedEquipmentForQuote,
        clearSelection,
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider')
  }
  return context
}
