'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Clock, TrendingDown } from 'lucide-react'
import { useState } from 'react'

interface PricingOption {
  id: 'daily' | 'weekly' | 'biweekly' | 'monthly'
  label: string
  period: string
  multiplier: number
  discount: number
  popular?: boolean
}

interface EquipmentPricingSelectorProps {
  pricePerDay: number
  onPeriodChange?: (option: PricingOption, totalPrice: number) => void
  className?: string
}

const pricingOptions: PricingOption[] = [
  {
    id: 'daily',
    label: 'Diário',
    period: 'dia',
    multiplier: 1,
    discount: 0,
  },
  {
    id: 'weekly',
    label: 'Semanal',
    period: 'semana',
    multiplier: 7,
    discount: 5, // 5% desconto
    popular: true,
  },
  {
    id: 'biweekly',
    label: 'Quinzenal',
    period: 'quinzena',
    multiplier: 15,
    discount: 10, // 10% desconto
  },
  {
    id: 'monthly',
    label: 'Mensal',
    period: 'mês',
    multiplier: 30,
    discount: 15, // 15% desconto
  },
]

export function EquipmentPricingSelector({
  pricePerDay,
  onPeriodChange,
  className,
}: EquipmentPricingSelectorProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PricingOption>(
    pricingOptions[0] || pricingOptions.find((opt) => opt.id === 'daily')!
  )

  const calculatePrice = (option: PricingOption) => {
    const basePrice = pricePerDay * option.multiplier
    const discountAmount = basePrice * (option.discount / 100)
    return basePrice - discountAmount
  }

  const handlePeriodChange = (option: PricingOption) => {
    setSelectedPeriod(option)
    const totalPrice = calculatePrice(option)
    // Para uso futuro: integração com sistema de orçamento
    onPeriodChange?.(option, totalPrice)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const selectedPrice = calculatePrice(selectedPeriod)
  const originalPrice = pricePerDay * selectedPeriod.multiplier

  return (
    <div className={cn('space-y-3', className)}>
      {/* Seletor de Período */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Período de Locação
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {pricingOptions.map((option) => (
            <Button
              key={option.id}
              variant={selectedPeriod.id === option.id ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'relative justify-center text-sm py-3 h-auto border transition-all duration-200 shadow-sm hover:shadow-md',
                selectedPeriod.id === option.id
                  ? 'bg-orange-600 hover:bg-orange-700 text-white border-orange-600 shadow-lg'
                  : 'bg-white hover:bg-orange-50 hover:border-orange-300 text-gray-700'
              )}
              onClick={() => handlePeriodChange(option)}
            >
              <div className="text-center">
                <div className="font-semibold">{option.label}</div>
                {option.discount > 0 && (
                  <div className="text-xs opacity-90 mt-1">
                    {option.discount}% OFF
                  </div>
                )}
              </div>
              {option.popular && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 text-xs px-2 py-1 h-auto font-medium shadow-md"
                >
                  Popular
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Exibição do Preço */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-lg p-3 border border-orange-200/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Clock className="h-3 w-3" />
            <span>Preço por {selectedPeriod.period}</span>
          </div>
          {selectedPeriod.discount > 0 && (
            <div className="flex items-center gap-1 text-green-600">
              <TrendingDown className="h-3 w-3" />
              <span className="text-xs font-medium">
                {selectedPeriod.discount}% OFF
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          {selectedPeriod.discount > 0 && (
            <div className="text-xs text-gray-500 line-through">
              De: {formatCurrency(originalPrice)}
            </div>
          )}
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(selectedPrice)}
          </div>
          {selectedPeriod.multiplier > 1 && (
            <div className="text-xs text-gray-600">
              {formatCurrency(selectedPrice / selectedPeriod.multiplier)} por
              dia
              {selectedPeriod.discount > 0 && (
                <span className="text-green-600 ml-1 font-medium">
                  (economia: {formatCurrency(originalPrice - selectedPrice)})
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Informações Adicionais */}
      {selectedPeriod.discount > 0 && (
        <div className="text-xs bg-green-50 p-2.5 rounded-md border border-green-200">
          <div className="font-medium text-green-800 mb-1">
            💰 Economia de {formatCurrency(originalPrice - selectedPrice)} no
            período {selectedPeriod.label.toLowerCase()}
          </div>
          <div className="text-green-700">
            Descontos maiores para períodos mais longos
          </div>
        </div>
      )}
    </div>
  )
}
