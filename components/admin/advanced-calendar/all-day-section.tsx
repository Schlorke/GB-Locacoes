'use client'

import { format, isSameDay, startOfDay, endOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { CalendarEvent } from './types'

interface AllDaySectionProps {
  date: Date
  events: CalendarEvent[]
  onEventClick?: (_event: CalendarEvent) => void
  className?: string
}

/**
 * Classifica eventos como all-day/multi-day ou time-grid
 * Locações/Orçamentos = all-day/multi-day
 * Manutenção/Logística = time-grid
 */
export function classifyEventType(event: CalendarEvent): {
  isAllDay: boolean
  isMultiDay: boolean
} {
  // Se já está marcado explicitamente
  if (event.isAllDay !== undefined || event.isMultiDay !== undefined) {
    return {
      isAllDay: event.isAllDay ?? false,
      isMultiDay: event.isMultiDay ?? false,
    }
  }

  // Locações e orçamentos são tratados como multi-day
  if (event.type === 'rental') {
    const duration = event.end.getTime() - event.start.getTime()
    const days = duration / (1000 * 60 * 60 * 24)
    return {
      isAllDay: days >= 1,
      isMultiDay: days > 1,
    }
  }

  // Manutenção e logística ficam no time-grid
  return {
    isAllDay: false,
    isMultiDay: false,
  }
}

/**
 * Filtra eventos all-day/multi-day
 */
export function getAllDayEvents(events: CalendarEvent[]): CalendarEvent[] {
  return events.filter((event) => {
    const { isAllDay, isMultiDay } = classifyEventType(event)
    return isAllDay || isMultiDay
  })
}

/**
 * Componente para renderizar eventos all-day/multi-day
 * em uma faixa superior separada da grade de horas
 */
export function AllDaySection({
  date,
  events,
  onEventClick,
  className,
}: AllDaySectionProps) {
  const dayStart = startOfDay(date)
  const dayEnd = endOfDay(date)

  const allDayEvents = getAllDayEvents(events).filter((event) => {
    // Inclui eventos que se sobrepõem ao dia
    return event.start <= dayEnd && event.end >= dayStart
  })

  if (allDayEvents.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'border-b border-slate-200 bg-slate-50/50 min-h-[40px] px-2 py-2',
        className
      )}
    >
      <div className="flex items-center gap-1 mb-1">
        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Dia Inteiro
        </span>
      </div>
      <div className="space-y-1">
        {allDayEvents.map((event) => {
          // Calcula quantos dias o evento ocupa neste dia específico
          const eventStart = event.start < dayStart ? dayStart : event.start
          const eventEnd = event.end > dayEnd ? dayEnd : event.end
          const isStart = isSameDay(event.start, date)
          const isEnd = isSameDay(event.end, date)
          const isMiddle = !isStart && !isEnd

          return (
            <div
              key={event.id}
              className={cn(
                'text-xs px-2 py-1.5 rounded cursor-pointer hover:opacity-80 transition-opacity border-l-2',
                isStart && 'rounded-l-md',
                isEnd && 'rounded-r-md',
                isMiddle && 'rounded-none'
              )}
              style={{
                backgroundColor: event.color + '20',
                borderLeftColor: event.color,
                color: '#1f2937',
              }}
              onClick={() => onEventClick?.(event)}
            >
              <div className="font-medium truncate">{event.title}</div>
              {(isStart || isMiddle) && (
                <div className="text-xs text-gray-600 mt-0.5 truncate">
                  {format(eventStart, 'HH:mm', { locale: ptBR })} -{' '}
                  {format(eventEnd, 'HH:mm', { locale: ptBR })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Versão para visualização mensal - renderiza barras/itens por dia
 */
export function AllDaySectionMonthly({
  day,
  events,
  onEventClick,
  maxVisible = 2,
}: {
  day: Date
  events: CalendarEvent[]
  onEventClick?: (_event: CalendarEvent) => void
  maxVisible?: number
}) {
  const dayStart = startOfDay(day)
  const dayEnd = endOfDay(day)

  const allDayEvents = getAllDayEvents(events).filter((event) => {
    return event.start <= dayEnd && event.end >= dayStart
  })

  if (allDayEvents.length === 0) {
    return null
  }

  const visibleEvents = allDayEvents.slice(0, maxVisible)
  const remainingCount = allDayEvents.length - maxVisible

  return (
    <div className="space-y-1">
      {visibleEvents.map((event) => (
        <div
          key={event.id}
          className="text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity border-l-2"
          style={{
            backgroundColor: event.color + '20',
            borderLeftColor: event.color,
            color: '#1f2937',
          }}
          onClick={() => onEventClick?.(event)}
        >
          {event.title}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="text-xs text-gray-600 px-2 font-medium">
          +{remainingCount} mais
        </div>
      )}
    </div>
  )
}
