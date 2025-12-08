'use client'

import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon, X } from 'lucide-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

export interface DateRangePickerProps {
  startDate: Date | null
  endDate: Date | null
  onDateChange: (_start: Date | null, _end: Date | null) => void
  unavailableDates?: Date[]
  minDate?: Date
  maxDate?: Date
  minDays?: number
  maxDays?: number
  className?: string
  placeholder?: string
  disabled?: boolean
  showClearButton?: boolean
}

export function DateRangePicker({
  startDate,
  endDate,
  onDateChange,
  unavailableDates = [],
  minDate,
  maxDate,
  minDays,
  maxDays,
  className,
  placeholder = 'Selecionar período',
  disabled = false,
  showClearButton = true,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedRange, setSelectedRange] = React.useState<
    DateRange | undefined
  >(
    startDate && endDate
      ? {
          from: startDate,
          to: endDate,
        }
      : undefined
  )

  React.useEffect(() => {
    if (startDate && endDate) {
      setSelectedRange({
        from: startDate,
        to: endDate,
      })
    } else {
      setSelectedRange(undefined)
    }
  }, [startDate, endDate])

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedRange(range)

    if (range?.from && range?.to) {
      // Validar período mínimo
      if (minDays) {
        const days = Math.ceil(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
        )
        if (days < minDays - 1) {
          // -1 porque o cálculo é inclusivo
          return
        }
      }

      // Validar período máximo
      if (maxDays) {
        const days = Math.ceil(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
        )
        if (days > maxDays - 1) {
          // -1 porque o cálculo é inclusivo
          return
        }
      }

      onDateChange(range.from, range.to)
      setOpen(false)
    } else if (range?.from) {
      // Apenas início selecionado, aguardar fim
      onDateChange(range.from, null)
    } else {
      onDateChange(null, null)
    }
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedRange(undefined)
    onDateChange(null, null)
  }

  // Data mínima: hoje (sem horas para comparação correta)
  const today = React.useMemo(() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }, [])

  // Data mínima efetiva: usar minDate se fornecido, senão usar hoje
  const effectiveMinDate = React.useMemo(() => {
    if (minDate) {
      const date = new Date(minDate)
      date.setHours(0, 0, 0, 0)
      return date
    }
    return today
  }, [minDate, today])

  const isDateDisabled = (date: Date) => {
    const dateToCheck = new Date(date)
    dateToCheck.setHours(0, 0, 0, 0)

    // Datas passadas (antes de hoje)
    if (dateToCheck < effectiveMinDate) {
      return true
    }

    // Datas futuras além do máximo
    if (maxDate) {
      const maxDateCheck = new Date(maxDate)
      maxDateCheck.setHours(0, 0, 0, 0)
      if (dateToCheck > maxDateCheck) {
        return true
      }
    }

    // Datas indisponíveis
    return unavailableDates.some((unavailableDate) => {
      const unavailable = new Date(unavailableDate)
      unavailable.setHours(0, 0, 0, 0)
      return dateToCheck.getTime() === unavailable.getTime()
    })
  }

  const displayText = React.useMemo(() => {
    if (startDate && endDate) {
      return `${format(startDate, 'dd/MM/yyyy', { locale: ptBR })} - ${format(endDate, 'dd/MM/yyyy', { locale: ptBR })}`
    }
    if (startDate) {
      return format(startDate, 'dd/MM/yyyy', { locale: ptBR })
    }
    return placeholder
  }, [startDate, endDate, placeholder])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors',
            'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            !startDate && !endDate && 'text-gray-500',
            className
          )}
        >
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            <span>{displayText}</span>
          </div>
          {showClearButton && (startDate || endDate) && (
            <X
              className="h-4 w-4 text-gray-400 hover:text-gray-600"
              onClick={handleClear}
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 shadow-xl border-gray-200"
        align="start"
      >
        <Calendar
          mode="range"
          defaultMonth={startDate || today}
          month={startDate || today} // Forçar mês atual se não houver seleção
          selected={selectedRange}
          onSelect={handleSelect}
          numberOfMonths={1}
          disabled={isDateDisabled}
          locale={ptBR}
          className="rounded-lg"
          fromDate={effectiveMinDate} // Data mínima: hoje
          fromMonth={(() => {
            // Primeiro dia do mês atual
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
            return firstDay
          })()} // Primeiro mês disponível: mês atual
          toDate={maxDate} // Data máxima se fornecida
          showOutsideDays={false} // Não mostrar dias de outros meses
        />
        {(minDays || maxDays) && (
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <div className="flex flex-col gap-1 text-xs text-gray-600">
              {minDays && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Período mínimo:</span>
                  <span>
                    {minDays} {minDays === 1 ? 'dia' : 'dias'}
                  </span>
                </div>
              )}
              {maxDays && (
                <div className="flex items-center gap-2">
                  <span className="font-medium">Período máximo:</span>
                  <span>
                    {maxDays} {maxDays === 1 ? 'dia' : 'dias'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
