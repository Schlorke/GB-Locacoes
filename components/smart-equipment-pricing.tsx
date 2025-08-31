'use client'

import { EquipmentPricingSelector } from '@/components/equipment-pricing-selector'
import { SmartQuoteButton } from '@/components/smart-quote-button'
import { type PricingOption } from '@/contexts/quote-context'
import { useState, useCallback } from 'react'

interface SmartEquipmentPricingProps {
  equipmentId: string
  equipmentName: string
  pricePerDay: number
  isAvailable: boolean
  dailyDiscount?: number
  weeklyDiscount?: number
  biweeklyDiscount?: number
  monthlyDiscount?: number
  popularPeriod?: string
  maxStock?: number
  description?: string
  category?: {
    name: string
  }
  images?: string[]
  className?: string
}

export function SmartEquipmentPricing({
  equipmentId,
  equipmentName,
  pricePerDay,
  isAvailable,
  dailyDiscount = 0,
  weeklyDiscount = 0,
  biweeklyDiscount = 0,
  monthlyDiscount = 0,
  popularPeriod = 'weekly',
  maxStock,
  description,
  category,
  images,
  className,
}: SmartEquipmentPricingProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PricingOption | null>(
    null
  )
  const [finalPrice, setFinalPrice] = useState<number>(pricePerDay)

  const handlePeriodChange = useCallback(
    (option: PricingOption, totalPrice: number) => {
      setSelectedPeriod(option)
      setFinalPrice(totalPrice)
    },
    []
  )

  return (
    <div className={className}>
      {/* Sistema de Preços */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <EquipmentPricingSelector
          pricePerDay={pricePerDay}
          dailyDiscount={dailyDiscount}
          weeklyDiscount={weeklyDiscount}
          biweeklyDiscount={biweeklyDiscount}
          monthlyDiscount={monthlyDiscount}
          popularPeriod={popularPeriod}
          onPeriodChange={handlePeriodChange}
        />
      </div>

      {/* Call-to-Action Principal */}
      <div className="space-y-3 mt-4">
        {selectedPeriod ? (
          <SmartQuoteButton
            equipmentId={equipmentId}
            equipmentName={equipmentName}
            pricePerDay={pricePerDay}
            isAvailable={isAvailable}
            selectedPeriod={selectedPeriod}
            finalPrice={finalPrice}
            maxStock={maxStock}
            description={description}
            category={category}
            images={images}
            dailyDiscount={dailyDiscount}
            weeklyDiscount={weeklyDiscount}
            biweeklyDiscount={biweeklyDiscount}
            monthlyDiscount={monthlyDiscount}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg"
          />
        ) : (
          <SmartQuoteButton
            equipmentId={equipmentId}
            equipmentName={equipmentName}
            pricePerDay={pricePerDay}
            isAvailable={isAvailable}
            selectedPeriod={{
              id: 'daily',
              label: 'Diário',
              period: 'dia',
              multiplier: 1,
              discount: dailyDiscount,
              popular: popularPeriod === 'daily',
            }}
            finalPrice={pricePerDay}
            maxStock={maxStock}
            description={description}
            category={category}
            images={images}
            dailyDiscount={dailyDiscount}
            weeklyDiscount={weeklyDiscount}
            biweeklyDiscount={biweeklyDiscount}
            monthlyDiscount={monthlyDiscount}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg"
          />
        )}

        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>Entrega em Porto Alegre e região</span>
          </div>
          <div className="text-xs text-gray-500">Resposta em até 2 horas</div>
        </div>
      </div>
    </div>
  )
}
