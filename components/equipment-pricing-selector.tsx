'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Clock, TrendingDown } from 'lucide-react'
import { useState, useEffect, useMemo, useRef } from 'react'

interface PricingOption {
  id: string
  label: string
  period: string
  multiplier: number
  discount: number
  directValue?: number
  useDirectValue?: boolean
  popular?: boolean
}

interface EquipmentPricingSelectorProps {
  pricePerDay: number
  onPeriodChange?: (option: PricingOption, totalPrice: number) => void
  className?: string
  // Admin-configured rental periods
  dailyDiscount?: number
  weeklyDiscount?: number
  biweeklyDiscount?: number
  monthlyDiscount?: number
  popularPeriod?: string
  // Direct value pricing configurations
  dailyDirectValue?: number
  weeklyDirectValue?: number
  biweeklyDirectValue?: number
  monthlyDirectValue?: number
  // Pricing method control (percentage or direct value)
  dailyUseDirectValue?: boolean
  weeklyUseDirectValue?: boolean
  biweeklyUseDirectValue?: boolean
  monthlyUseDirectValue?: boolean
}

// Function to generate pricing options based on equipment configuration
const generatePricingOptions = (
  dailyDiscount = 0,
  weeklyDiscount = 0,
  biweeklyDiscount = 0,
  monthlyDiscount = 0,
  popularPeriod = 'weekly',
  // Direct value pricing configurations
  dailyDirectValue = 0,
  weeklyDirectValue = 0,
  biweeklyDirectValue = 0,
  monthlyDirectValue = 0,
  // Pricing method control (percentage or direct value)
  dailyUseDirectValue = false,
  weeklyUseDirectValue = false,
  biweeklyUseDirectValue = false,
  monthlyUseDirectValue = false
): PricingOption[] => [
  {
    id: 'daily',
    label: 'Diário',
    period: 'dia',
    multiplier: 1,
    discount: dailyDiscount,
    directValue: dailyDirectValue,
    useDirectValue: dailyUseDirectValue,
    popular: popularPeriod === 'daily',
  },
  {
    id: 'weekly',
    label: 'Semanal',
    period: '7 dias',
    multiplier: 7,
    discount: weeklyDiscount,
    directValue: weeklyDirectValue,
    useDirectValue: weeklyUseDirectValue,
    popular: popularPeriod === 'weekly',
  },
  {
    id: 'biweekly',
    label: 'Quinzenal',
    period: '15 dias',
    multiplier: 15,
    discount: biweeklyDiscount,
    directValue: biweeklyDirectValue,
    useDirectValue: biweeklyUseDirectValue,
    popular: popularPeriod === 'biweekly',
  },
  {
    id: 'monthly',
    label: 'Mensal',
    period: '30 dias',
    multiplier: 30,
    discount: monthlyDiscount,
    directValue: monthlyDirectValue,
    useDirectValue: monthlyUseDirectValue,
    popular: popularPeriod === 'monthly',
  },
]

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function EquipmentPricingSelector({
  pricePerDay,
  onPeriodChange,
  className,
  dailyDiscount = 0,
  weeklyDiscount = 10,
  biweeklyDiscount = 15,
  monthlyDiscount = 20,
  popularPeriod = 'weekly',
  // Direct value pricing configurations
  dailyDirectValue = 0,
  weeklyDirectValue = 0,
  biweeklyDirectValue = 0,
  monthlyDirectValue = 0,
  // Pricing method control (percentage or direct value)
  dailyUseDirectValue = false,
  weeklyUseDirectValue = false,
  biweeklyUseDirectValue = false,
  monthlyUseDirectValue = false,
}: EquipmentPricingSelectorProps) {
  // Usar useMemo para evitar recriações desnecessárias
  const pricingOptions = useMemo(
    () =>
      generatePricingOptions(
        dailyDiscount,
        weeklyDiscount,
        biweeklyDiscount,
        monthlyDiscount,
        popularPeriod,
        dailyDirectValue,
        weeklyDirectValue,
        biweeklyDirectValue,
        monthlyDirectValue,
        dailyUseDirectValue,
        weeklyUseDirectValue,
        biweeklyUseDirectValue,
        monthlyUseDirectValue
      ),
    [
      dailyDiscount,
      weeklyDiscount,
      biweeklyDiscount,
      monthlyDiscount,
      popularPeriod,
      dailyDirectValue,
      weeklyDirectValue,
      biweeklyDirectValue,
      monthlyDirectValue,
      dailyUseDirectValue,
      weeklyUseDirectValue,
      biweeklyUseDirectValue,
      monthlyUseDirectValue,
    ]
  )

  const [selectedPeriod, setSelectedPeriod] = useState<PricingOption>(() => {
    return (
      pricingOptions[0] || pricingOptions.find((opt) => opt.id === 'daily')!
    )
  })

  // Usar ref para rastrear o ID selecionado e evitar loops
  const selectedIdRef = useRef(selectedPeriod.id)
  const prevPricingOptionsRef = useRef(pricingOptions)

  // Atualizar selectedPeriod apenas quando pricingOptions mudar (não quando selectedPeriod mudar)
  useEffect(() => {
    // Verificar se pricingOptions realmente mudou
    const optionsChanged =
      JSON.stringify(prevPricingOptionsRef.current) !==
      JSON.stringify(pricingOptions)

    if (optionsChanged) {
      const currentSelectedOption = pricingOptions.find(
        (opt) => opt.id === selectedIdRef.current
      )
      if (currentSelectedOption) {
        setSelectedPeriod(currentSelectedOption)
      }
      prevPricingOptionsRef.current = pricingOptions
    }
  }, [pricingOptions])

  // Atualizar ref quando selectedPeriod mudar
  useEffect(() => {
    selectedIdRef.current = selectedPeriod.id
  }, [selectedPeriod.id])

  // Notificar mudanças de preço quando pricePerDay ou descontos mudarem
  useEffect(() => {
    if (onPeriodChange) {
      const totalPrice = calculatePrice(selectedPeriod)
      onPeriodChange(selectedPeriod, totalPrice)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricePerDay, selectedPeriod])

  const calculatePrice = (option: PricingOption) => {
    // Se usar valor direto, retornar o valor direto (mesmo que seja 0)
    if (option.useDirectValue && option.directValue !== undefined && option.directValue !== null) {
      return option.directValue
    }
    
    // Caso contrário, calcular com desconto percentual
    const basePrice = pricePerDay * option.multiplier
    const discountAmount = basePrice * (option.discount / 100)
    return basePrice - discountAmount
  }

  const handlePeriodChange = (
    option: PricingOption,
    event?: React.MouseEvent
  ) => {
    // Prevenir propagação do evento para evitar submit do formulário
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    setSelectedPeriod(option)
    const totalPrice = calculatePrice(option)
    onPeriodChange?.(option, totalPrice)
  }

  const selectedPrice = calculatePrice(selectedPeriod)
  const originalPrice = pricePerDay * selectedPeriod.multiplier
  const isUsingDirectValue =
    selectedPeriod.useDirectValue &&
    selectedPeriod.directValue !== undefined &&
    selectedPeriod.directValue !== null

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
              type="button"
              variant={selectedPeriod.id === option.id ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'relative justify-center text-sm py-3 h-auto border transition-all duration-200 shadow-sm',
                selectedPeriod.id === option.id
                  ? 'bg-orange-600 hover:bg-orange-700 text-white border-orange-600 shadow-lg'
                  : 'bg-white border-gray-200 text-gray-700 hover:text-orange-500 hover:!bg-white hover:!border-gray-200'
              )}
              onClick={(e) => handlePeriodChange(option, e)}
            >
              <div className="text-center">
                <div className="font-semibold">{option.label}</div>
                {option.useDirectValue &&
                option.directValue !== undefined &&
                option.directValue !== null &&
                option.directValue > 0 ? (
                  <div className="text-xs opacity-90 mt-1">
                    {formatCurrency(option.directValue)}
                  </div>
                ) : option.useDirectValue &&
                  option.directValue !== undefined &&
                  option.directValue !== null &&
                  option.directValue === 0 ? (
                  <div className="text-xs opacity-90 mt-1">
                    R$ 0,00
                  </div>
                ) : option.discount > 0 ? (
                  <div className="text-xs opacity-90 mt-1">
                    {option.discount}% OFF
                  </div>
                ) : null}
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
          {!isUsingDirectValue && selectedPeriod.discount > 0 && (
            <div className="flex items-center gap-1 text-green-600">
              <TrendingDown className="h-3 w-3" />
              <span className="text-xs font-medium">
                {selectedPeriod.discount}% OFF
              </span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          {!isUsingDirectValue && selectedPeriod.discount > 0 && (
            <div className="text-xs text-gray-500 line-through">
              De: {formatCurrency(originalPrice)}
            </div>
          )}
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(selectedPrice)}
          </div>
          {!isUsingDirectValue && selectedPeriod.multiplier > 1 && (
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

      {/* Informações Adicionais - apenas para desconto percentual */}
      {!isUsingDirectValue && selectedPeriod.discount > 0 && (
        <div className="text-xs bg-green-50 p-2.5 rounded-md border border-green-200">
          <div className="flex items-center gap-1.5 text-green-700 font-medium">
            <TrendingDown className="h-3 w-3" />
            <span>
              Você economiza {formatCurrency(originalPrice - selectedPrice)} com
              este período!
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
