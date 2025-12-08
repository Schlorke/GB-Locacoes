'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Clock, TrendingDown } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import {
  calculateIntelligentPrice,
  getPricingConfig,
  sanitizeCartItemPricing,
} from '@/lib/pricing'

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
  onPeriodChange?: (_option: PricingOption, _totalPrice: number) => void
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
  // Datas selecionadas no calendário (para sincronização)
  selectedDays?: number
  startDate?: Date | null
  endDate?: Date | null
  selectedPeriod?: PricingOption | null
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
  // Datas selecionadas no calendário
  selectedDays = 0,
  startDate,
  endDate: _endDate,
  selectedPeriod: externalSelectedPeriod,
}: EquipmentPricingSelectorProps) {
  // Variável endDate ignorada pois só usamos startDate para determinar se há seleção
  void _endDate

  // Se alguma data está selecionada no calendário (mesmo que seja só startDate),
  // os botões de período não podem ser clicados - o período é determinado pelas datas
  const hasAnyDateSelected = startDate !== null && startDate !== undefined
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

  // Se há datas selecionadas, usar o período externo (sincronizado com calendário)
  // Caso contrário, usar estado interno
  const [internalSelectedPeriod, setInternalSelectedPeriod] =
    useState<PricingOption>(() => {
      return (
        pricingOptions[0] || pricingOptions.find((opt) => opt.id === 'daily')!
      )
    })

  // Período "Diário" para usar quando há apenas startDate selecionado
  const dailyPeriod =
    pricingOptions.find((opt) => opt.id === 'daily') || pricingOptions[0]!

  // Determinar qual período usar:
  // - Se há qualquer data selecionada no calendário (startDate existe) mas ainda não temos
  //   o range completo (selectedDays === 0), mostrar "Diário" como padrão (1 dia selecionado)
  // - Se há range completo (selectedDays > 0), usar período externo calculado
  // - Se não há nenhuma data selecionada, usar período interno (selecionado pelo usuário)
  const selectedPeriod =
    hasAnyDateSelected && selectedDays === 0
      ? dailyPeriod // Mostrar "Diário" quando apenas startDate está selecionado
      : selectedDays > 0 && externalSelectedPeriod
        ? externalSelectedPeriod
        : internalSelectedPeriod

  // Sincronizar período interno quando período externo mudar (se não há datas selecionadas)
  useEffect(() => {
    if (selectedDays === 0 && externalSelectedPeriod) {
      const matchingOption = pricingOptions.find(
        (opt) => opt.id === externalSelectedPeriod.id
      )
      if (matchingOption) {
        setInternalSelectedPeriod(matchingOption)
      }
    }
  }, [externalSelectedPeriod, selectedDays, pricingOptions])

  // Atualizar período interno quando pricingOptions mudar
  useEffect(() => {
    if (selectedDays === 0) {
      const currentOption = pricingOptions.find(
        (opt) => opt.id === internalSelectedPeriod.id
      )
      if (currentOption) {
        setInternalSelectedPeriod(currentOption)
      }
    }
  }, [pricingOptions, selectedDays, internalSelectedPeriod.id])

  // Notificar mudanças de preço quando pricePerDay, descontos ou dias selecionados mudarem
  useEffect(() => {
    if (onPeriodChange) {
      const totalPrice = calculatePrice(selectedPeriod)
      onPeriodChange(selectedPeriod, totalPrice)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricePerDay, selectedPeriod, selectedDays])

  const calculatePrice = (option: PricingOption) => {
    // Se há dias selecionados no calendário, calcular baseado nos dias REAIS
    if (selectedDays > 0) {
      const equipment = sanitizeCartItemPricing({
        pricePerDay,
        dailyDiscount,
        weeklyDiscount,
        biweeklyDiscount,
        monthlyDiscount,
        dailyDirectValue,
        weeklyDirectValue,
        biweeklyDirectValue,
        monthlyDirectValue,
        dailyUseDirectValue,
        weeklyUseDirectValue,
        biweeklyUseDirectValue,
        monthlyUseDirectValue,
      })

      // Calcular preço inteligente baseado nos dias reais
      return calculateIntelligentPrice(equipment, selectedDays)
    }

    // Se não há datas selecionadas, usar cálculo padrão do período
    // Se usar valor direto, retornar o valor direto (mesmo que seja 0)
    if (
      option.useDirectValue &&
      option.directValue !== undefined &&
      option.directValue !== null
    ) {
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

    // Se há qualquer data selecionada no calendário, não permitir mudança de período
    // O período é determinado automaticamente pelas datas selecionadas
    if (hasAnyDateSelected) {
      return
    }

    // Se não há datas, permitir seleção normal
    setInternalSelectedPeriod(option)
    const totalPrice = calculatePrice(option)
    onPeriodChange?.(option, totalPrice)
  }

  const selectedPrice = calculatePrice(selectedPeriod)

  // Calcular preço original baseado nos dias reais ou no período
  const originalPrice =
    selectedDays > 0
      ? pricePerDay * selectedDays // Preço sem desconto baseado nos dias reais
      : pricePerDay * selectedPeriod.multiplier // Preço do período padrão

  // Determinar se está usando valor direto
  const equipment = sanitizeCartItemPricing({
    pricePerDay,
    dailyDiscount,
    weeklyDiscount,
    biweeklyDiscount,
    monthlyDiscount,
    dailyDirectValue,
    weeklyDirectValue,
    biweeklyDirectValue,
    monthlyDirectValue,
    dailyUseDirectValue,
    weeklyUseDirectValue,
    biweeklyUseDirectValue,
    monthlyUseDirectValue,
  })

  const pricingConfig =
    selectedDays > 0 ? getPricingConfig(equipment, selectedDays) : null

  const isUsingDirectValue =
    selectedDays > 0
      ? (pricingConfig?.useDirectValue ?? false)
      : selectedPeriod.useDirectValue &&
        selectedPeriod.directValue !== undefined &&
        selectedPeriod.directValue !== null

  return (
    <div className={cn('space-y-3', className)}>
      {/* Seletor de Período */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Desconto aplicado
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {pricingOptions.map((option) => (
            <Button
              key={option.id}
              type="button"
              variant={selectedPeriod.id === option.id ? 'gradient' : 'outline'}
              size="sm"
              className={cn(
                'relative justify-center text-sm py-3 h-auto border shadow-sm',
                selectedPeriod.id === option.id
                  ? 'bg-[linear-gradient(to_right,#f97316,#ea580c,#f97316)] bg-[length:200%_100%] bg-left hover:bg-right text-white border-orange-600 shadow-lg transition-[background-position,transform,box-shadow] duration-500 ease-in-out'
                  : 'bg-white border-gray-200 text-gray-700 hover:text-orange-500 hover:!bg-white hover:!border-gray-200 transition-[color,transform,box-shadow] duration-300'
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
                  <div className="text-xs opacity-90 mt-1">R$ 0,00</div>
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
            <span>
              {selectedDays > 0
                ? `Preço por ${selectedDays} ${selectedDays === 1 ? 'dia' : 'dias'}`
                : `Preço por ${selectedPeriod.period}`}
            </span>
          </div>
          {!isUsingDirectValue &&
            ((selectedDays > 0 &&
              pricingConfig &&
              pricingConfig.discount > 0) ||
              (selectedDays === 0 && selectedPeriod.discount > 0)) && (
              <div className="flex items-center gap-1 text-green-600">
                <TrendingDown className="h-3 w-3" />
                <span className="text-xs font-medium">
                  {selectedDays > 0 && pricingConfig
                    ? `${pricingConfig.discount}% OFF`
                    : `${selectedPeriod.discount}% OFF`}
                </span>
              </div>
            )}
        </div>

        <div className="space-y-1">
          {!isUsingDirectValue &&
            ((selectedDays > 0 &&
              pricingConfig &&
              pricingConfig.discount > 0) ||
              (selectedDays === 0 && selectedPeriod.discount > 0)) && (
              <div className="text-xs text-gray-500 line-through">
                De: {formatCurrency(originalPrice)}
              </div>
            )}
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(selectedPrice)}
          </div>
          {!isUsingDirectValue &&
            ((selectedDays > 0 && selectedDays > 1) ||
              (selectedDays === 0 && selectedPeriod.multiplier > 1)) && (
              <div className="text-xs text-gray-600">
                {formatCurrency(
                  selectedDays > 0
                    ? selectedPrice / selectedDays
                    : selectedPrice / selectedPeriod.multiplier
                )}{' '}
                por dia
                {((selectedDays > 0 &&
                  pricingConfig &&
                  pricingConfig.discount > 0) ||
                  (selectedDays === 0 && selectedPeriod.discount > 0)) && (
                  <span className="text-green-600 ml-1 font-medium">
                    (economia: {formatCurrency(originalPrice - selectedPrice)})
                  </span>
                )}
              </div>
            )}
        </div>
      </div>

      {/* Informações Adicionais - apenas para desconto percentual */}
      {!isUsingDirectValue &&
        ((selectedDays > 0 && pricingConfig && pricingConfig.discount > 0) ||
          (selectedDays === 0 && selectedPeriod.discount > 0)) && (
          <div className="text-xs bg-green-50 p-2.5 rounded-md border border-green-200">
            <div className="flex items-center gap-1.5 text-green-700 font-medium">
              <TrendingDown className="h-3 w-3" />
              <span>
                Você economiza {formatCurrency(originalPrice - selectedPrice)}{' '}
                com este período!
              </span>
            </div>
          </div>
        )}
    </div>
  )
}
