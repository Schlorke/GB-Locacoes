'use client'

import { EquipmentPricingSelector } from '@/components/equipment-pricing-selector'
import { SmartQuoteButton } from '@/components/smart-quote-button'
import {
  calculateIntelligentPrice,
  getPricingConfig,
  sanitizeCartItemPricing,
} from '@/lib/pricing'
import { useCallback, useState, useEffect, useMemo } from 'react'
import { Calendar } from '@/components/ui/calendar'
import {
  format,
  differenceInDays,
  addDays,
  eachDayOfInterval,
  isWeekend,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DateRange } from 'react-day-picker'
import { Calendar as CalendarIcon, X, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { HybridTooltip } from '@/components/ui/HybridTooltip'

export interface PricingOption {
  id: string
  label: string
  period: string
  multiplier: number
  discount: number
  popular?: boolean
}

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
  // Campos de valor direto
  dailyDirectValue?: number
  weeklyDirectValue?: number
  biweeklyDirectValue?: number
  monthlyDirectValue?: number
  // Campos de controle de método de preço
  dailyUseDirectValue?: boolean
  weeklyUseDirectValue?: boolean
  biweeklyUseDirectValue?: boolean
  monthlyUseDirectValue?: boolean
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
  // Campos de valor direto
  dailyDirectValue = 0,
  weeklyDirectValue = 0,
  biweeklyDirectValue = 0,
  monthlyDirectValue = 0,
  // Campos de controle de método de preço
  dailyUseDirectValue = false,
  weeklyUseDirectValue = false,
  biweeklyUseDirectValue = false,
  monthlyUseDirectValue = false,
}: SmartEquipmentPricingProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PricingOption | null>(
    null
  )
  const [finalPrice, setFinalPrice] = useState<number>(pricePerDay)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectedDays, setSelectedDays] = useState<number>(0)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    startDate && endDate ? { from: startDate, to: endDate } : undefined
  )
  // Estado para incluir ou não finais de semana na locação
  // Por padrão, apenas dias úteis (seg-sex) são considerados
  const [includeWeekends, setIncludeWeekends] = useState(false)

  /**
   * Conta o número de dias úteis (seg-sex) entre duas datas.
   * Se includeWeekends for true, conta todos os dias.
   */
  const countBusinessDays = useCallback(
    (start: Date, end: Date, includeWeekendDays: boolean): number => {
      if (includeWeekendDays) {
        // Conta todos os dias
        return differenceInDays(end, start) + 1
      }

      // Conta apenas dias úteis (seg-sex)
      const allDays = eachDayOfInterval({ start, end })
      return allDays.filter((day) => !isWeekend(day)).length
    },
    []
  )

  // Função para determinar o período correto baseado nos dias selecionados
  const getPeriodFromDays = useCallback(
    (days: number): PricingOption => {
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

      const pricingConfig = getPricingConfig(equipment, days)

      const periodMap: Record<string, PricingOption> = {
        daily: {
          id: 'daily',
          label: 'Diário',
          period: 'dia',
          multiplier: 1,
          discount: dailyDiscount,
          popular: popularPeriod === 'daily',
        },
        weekly: {
          id: 'weekly',
          label: 'Semanal',
          period: '7 dias',
          multiplier: 7,
          discount: weeklyDiscount,
          popular: popularPeriod === 'weekly',
        },
        biweekly: {
          id: 'biweekly',
          label: 'Quinzenal',
          period: '15 dias',
          multiplier: 15,
          discount: biweeklyDiscount,
          popular: popularPeriod === 'biweekly',
        },
        monthly: {
          id: 'monthly',
          label: 'Mensal',
          period: '30 dias',
          multiplier: 30,
          discount: monthlyDiscount,
          popular: popularPeriod === 'monthly',
        },
      }

      const selectedPeriod = periodMap[pricingConfig.period]
      return selectedPeriod ?? periodMap.daily!
    },
    [
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
      popularPeriod,
    ]
  )

  // Quando o usuário seleciona um período (botão), ajustar baseado nas datas do calendário
  const handlePeriodChange = useCallback(
    (option: PricingOption, totalPrice: number) => {
      // Se há datas selecionadas no calendário, usar os dias reais
      if (startDate && endDate && selectedDays > 0) {
        // Determinar o período correto baseado nos dias reais
        const correctPeriod = getPeriodFromDays(selectedDays)

        // Se o período selecionado não corresponde aos dias reais, ajustar
        if (correctPeriod.id !== option.id) {
          // Ajustar para o período correto baseado nos dias
          const adjustedPeriod = correctPeriod
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
          const adjustedPrice = calculateIntelligentPrice(
            equipment,
            selectedDays
          )

          setSelectedPeriod(adjustedPeriod)
          setFinalPrice(adjustedPrice)
          return
        }
      }

      // Se não há datas selecionadas, usar o período do botão normalmente
      setSelectedPeriod(option)
      setFinalPrice(totalPrice)
    },
    [
      startDate,
      endDate,
      selectedDays,
      getPeriodFromDays,
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
    ]
  )

  const handleDateRangeChange = useCallback(
    (start: Date | null, end: Date | null, days: number) => {
      setStartDate(start)
      setEndDate(end)
      setSelectedDays(days)

      if (start && end && days > 0) {
        // Calcular preço baseado nos dias reais
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

        const totalPrice = calculateIntelligentPrice(equipment, days)
        setFinalPrice(totalPrice)

        // Determinar período correto baseado nos dias reais selecionados
        const correctPeriod = getPeriodFromDays(days)
        setSelectedPeriod(correctPeriod)
      } else {
        // Se não há datas, resetar para período padrão
        setSelectedPeriod(null)
        setFinalPrice(pricePerDay)
      }
    },
    [
      getPeriodFromDays,
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
    ]
  )

  // Atualizar selectedRange quando startDate/endDate mudarem externamente
  // Mas NÃO interferir quando o calendário está aberto (usuário selecionando)
  useEffect(() => {
    // Se o calendário está aberto, não sobrescrever a seleção visual
    // para não interferir no processo de seleção do react-day-picker
    if (isCalendarOpen) {
      return
    }

    if (startDate && endDate) {
      setSelectedRange({ from: startDate, to: endDate })
    } else if (startDate) {
      setSelectedRange({ from: startDate, to: undefined })
    } else {
      setSelectedRange(undefined)
    }
  }, [startDate, endDate, isCalendarOpen])

  // Recalcular quando a opção de incluir finais de semana muda
  useEffect(() => {
    if (startDate && endDate) {
      // Recalcular número de dias com a nova configuração
      const newDays = countBusinessDays(startDate, endDate, includeWeekends)

      if (newDays > 0) {
        handleDateRangeChange(startDate, endDate, newDays)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeWeekends])

  // Handler para seleção no calendário
  const handleCalendarSelect = useCallback(
    (range: DateRange | undefined) => {
      // Sempre atualizar a seleção visual do calendário
      setSelectedRange(range)

      if (range?.from && range?.to) {
        // Verificar se é o mesmo dia (primeiro clique) - NÃO fechar o calendário
        const isSameDay =
          range.from.getFullYear() === range.to.getFullYear() &&
          range.from.getMonth() === range.to.getMonth() &&
          range.from.getDate() === range.to.getDate()

        if (isSameDay) {
          // Primeiro clique: apenas manter a seleção visual, não processar ainda
          // O calendário permanece aberto esperando o segundo clique
          // Definir startDate para mostrar no botão, mas sem fechar
          setStartDate(range.from)
          setEndDate(null)
          setSelectedDays(0)
          return
        }

        // Segundo clique: range completo selecionado (datas diferentes)
        // Contar dias considerando se finais de semana estão incluídos
        const days = countBusinessDays(range.from, range.to, includeWeekends)

        // Validar período mínimo
        if (days < 1) {
          return
        }

        // Validar período máximo (365 dias úteis ou totais dependendo da opção)
        if (days > 365) {
          return
        }

        handleDateRangeChange(range.from, range.to, days)
        setIsCalendarOpen(false) // Fechar calendário apenas após seleção completa
      } else if (range?.from) {
        // Apenas início selecionado (clique inicial), aguardar fim
        setStartDate(range.from)
        setEndDate(null)
        setSelectedDays(0)
      } else {
        // Nenhuma seleção
        handleDateRangeChange(null, null, 0)
      }
    },
    [handleDateRangeChange, countBusinessDays, includeWeekends]
  )

  // Handler para limpar seleção
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedRange(undefined)
      handleDateRangeChange(null, null, 0)
    },
    [handleDateRangeChange]
  )

  // Data mínima (hoje)
  const today = useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])

  // Data máxima (1 ano no futuro)
  const maxDate = useMemo(() => addDays(new Date(), 365), [])

  const firstDayOfCurrentMonth = useMemo(() => {
    return new Date(today.getFullYear(), today.getMonth(), 1)
  }, [today])

  const isDateDisabled = useCallback(
    (date: Date) => {
      const dateToCheck = new Date(date)
      dateToCheck.setHours(0, 0, 0, 0)

      // Datas passadas (antes de hoje)
      if (dateToCheck < today) {
        return true
      }

      // Datas futuras além do máximo
      if (dateToCheck > maxDate) {
        return true
      }

      // Se finais de semana não estão incluídos, desabilitar sábado e domingo
      if (!includeWeekends && isWeekend(dateToCheck)) {
        return true
      }

      return false
    },
    [today, maxDate, includeWeekends]
  )

  // Texto do botão
  const displayText = useMemo(() => {
    if (startDate && endDate) {
      return `${format(startDate, 'dd/MM/yyyy', { locale: ptBR })} até ${format(endDate, 'dd/MM/yyyy', { locale: ptBR })}`
    }
    if (startDate) {
      return format(startDate, 'dd/MM/yyyy', { locale: ptBR })
    }
    return 'Selecione as datas de início e fim'
  }, [startDate, endDate])

  return (
    <div className={className}>
      {/* Sistema de Preços */}
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm space-y-4">
        {/* Título */}
        <h4 className="text-sm font-semibold text-gray-900">
          Período de Locação
        </h4>

        {/* Botão de seleção de datas */}
        <button
          type="button"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className={cn(
            'flex h-10 w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors overflow-hidden',
            'hover:bg-gray-50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            !startDate && !endDate
              ? 'justify-center text-gray-500'
              : 'justify-center relative'
          )}
        >
          {!startDate && !endDate ? (
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="whitespace-nowrap">{displayText}</span>
              <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
            </div>
          ) : (
            <>
              <span className="flex-1 text-center whitespace-nowrap">
                {displayText}
              </span>
              <X
                className="h-4 w-4 text-gray-400 hover:text-gray-600 absolute right-3"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear(e)
                }}
              />
            </>
          )}
        </button>

        {/* Toggle para incluir finais de semana */}
        <div className="flex items-center gap-2 py-1">
          <Checkbox
            id="include-weekends"
            checked={includeWeekends}
            onCheckedChange={(checked) => setIncludeWeekends(checked === true)}
            className="data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
          />
          <Label
            htmlFor="include-weekends"
            className="text-sm font-normal text-gray-700 cursor-pointer select-none"
          >
            Incluir finais de semana
          </Label>
          <HybridTooltip
            content="💡 Quando ativado, sábados e domingos são incluídos na contagem de dias da locação. Por padrão, apenas dias úteis (segunda a sexta) são considerados no cálculo do preço."
            side="top"
            align="center"
          >
            <Info className="size-4 text-gray-700 cursor-help transition-colors hover:text-orange-600" />
          </HybridTooltip>
        </div>

        {/* Calendário inline - aparece quando isCalendarOpen é true */}
        {isCalendarOpen && (
          <div className="border border-gray-200 rounded-md bg-white p-0 shadow-md overflow-hidden max-w-full">
            <Calendar
              mode="range"
              defaultMonth={startDate || today}
              month={startDate || today}
              selected={selectedRange}
              onSelect={handleCalendarSelect}
              numberOfMonths={1}
              disabled={isDateDisabled}
              locale={ptBR}
              fromDate={today}
              fromMonth={firstDayOfCurrentMonth}
              toDate={maxDate}
              showOutsideDays={false}
              includeWeekends={includeWeekends}
            />
            <div className="border-t border-gray-200 px-3 py-2">
              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                <div>Período mínimo: 1 dia</div>
                <div>Período máximo: 365 dias</div>
                {selectedDays > 0 && (
                  <div className="text-green-600 font-medium">
                    ✓ {selectedDays} {selectedDays === 1 ? 'dia' : 'dias'}{' '}
                    {includeWeekends ? 'totais' : 'úteis'} selecionado
                    {selectedDays === 1 ? '' : 's'}
                  </div>
                )}
                {!includeWeekends && selectedDays === 0 && (
                  <div className="text-orange-600 font-medium">
                    ⚠️ Apenas dias úteis (seg-sex)
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Seletor de Período - Mostra preços baseados nas datas selecionadas */}
        <EquipmentPricingSelector
          pricePerDay={pricePerDay}
          dailyDiscount={dailyDiscount}
          weeklyDiscount={weeklyDiscount}
          biweeklyDiscount={biweeklyDiscount}
          monthlyDiscount={monthlyDiscount}
          popularPeriod={popularPeriod}
          dailyDirectValue={dailyDirectValue}
          weeklyDirectValue={weeklyDirectValue}
          biweeklyDirectValue={biweeklyDirectValue}
          monthlyDirectValue={monthlyDirectValue}
          dailyUseDirectValue={dailyUseDirectValue}
          weeklyUseDirectValue={weeklyUseDirectValue}
          biweeklyUseDirectValue={biweeklyUseDirectValue}
          monthlyUseDirectValue={monthlyUseDirectValue}
          onPeriodChange={handlePeriodChange}
          selectedDays={selectedDays}
          startDate={startDate}
          endDate={endDate}
          selectedPeriod={selectedPeriod}
        />
      </div>

      {/* Call-to-Action Principal */}
      <div className="space-y-3 mt-4">
        {selectedPeriod || (startDate && endDate) ? (
          <SmartQuoteButton
            equipmentId={equipmentId}
            equipmentName={equipmentName}
            pricePerDay={pricePerDay}
            isAvailable={isAvailable}
            selectedPeriod={
              selectedPeriod || {
                id: 'daily',
                label: 'Diário',
                period: 'dia',
                multiplier: 1,
                discount: dailyDiscount,
                popular: popularPeriod === 'daily',
              }
            }
            finalPrice={finalPrice}
            maxStock={maxStock}
            description={description}
            category={category}
            images={images}
            dailyDiscount={dailyDiscount}
            weeklyDiscount={weeklyDiscount}
            biweeklyDiscount={biweeklyDiscount}
            monthlyDiscount={monthlyDiscount}
            startDate={startDate}
            endDate={endDate}
            selectedDays={selectedDays}
            includeWeekends={includeWeekends}
            variant="gradient"
            className="w-full bg-[linear-gradient(to_right,#f97316,#ea580c,#f97316)] bg-[length:200%_100%] bg-left hover:bg-right transition-[background-position,transform,box-shadow] duration-500 ease-in-out"
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
            includeWeekends={includeWeekends}
            variant="gradient"
            className="w-full bg-[linear-gradient(to_right,#f97316,#ea580c,#f97316)] bg-[length:200%_100%] bg-left hover:bg-right transition-[background-position,transform,box-shadow] duration-500 ease-in-out"
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
