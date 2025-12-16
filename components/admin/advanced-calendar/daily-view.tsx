'use client'

import { useMemo, useEffect, useState } from 'react'
import {
  format,
  isSameDay,
  setHours,
  setMinutes,
  differenceInMinutes,
  startOfDay,
  startOfToday,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { EventBlock } from './event-block'
import { TimeIndicator } from './time-indicator'
import { HOUR_SLOT_HEIGHT, MINUTE_HEIGHT } from './constants'
import type { CalendarEvent, CalendarResource } from './types'

interface DailyViewProps {
  date: Date
  events: CalendarEvent[]
  resources?: CalendarResource[]
  onEventClick?: (_event: CalendarEvent) => void
  onDateClick?: (_date: Date) => void
}

const HOURS = Array.from({ length: 24 }, (_, i) => i) // 00:00 at\u00e9 23:00

export function DailyView({
  date,
  events,
  resources,
  onEventClick,
  onDateClick,
}: DailyViewProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  const dayEvents = useMemo(() => {
    return events.filter((event) => isSameDay(event.start, date))
  }, [events, date])

  const hasResources = Boolean(resources?.length)
  const getEventPosition = (event: CalendarEvent) => {
    const dayStart = startOfDay(event.start)
    const minutesFromStart = differenceInMinutes(event.start, dayStart)
    const duration = differenceInMinutes(event.end, event.start)

    return {
      top: minutesFromStart * MINUTE_HEIGHT,
      height: Math.max(duration * MINUTE_HEIGHT, 30),
    }
  }

  const resourceColumns: CalendarResource[] = hasResources
    ? resources!
    : [{ id: 'default', name: 'Eventos' }]

  return (
    <div className="flex bg-white min-h-[500px]">
      {/* Coluna de Horas */}
      <div className="w-16 flex-shrink-0 border-r border-slate-200 bg-slate-50">
        <div className="h-12 border-b border-slate-200" />{' '}
        {/* Espaço para header */}
        {HOURS.map((hour) => (
          <div key={hour} className="h-[60px] relative">
            {hour !== 0 && (
              <div className="absolute -top-2.5 right-1 text-xs text-gray-600 bg-slate-50 px-1">
                {format(
                  setMinutes(setHours(startOfToday(), hour), 0),
                  'HH:mm',
                  {
                    locale: ptBR,
                  }
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Colunas de Recursos */}
      <div className="flex-1 flex overflow-x-auto">
        {resourceColumns.map((resource, index) => (
          <div
            key={resource.id}
            className={`flex-1 min-w-[200px] ${index < resourceColumns.length - 1 ? 'border-r border-slate-200' : ''}`}
          >
            {/* Header do Recurso */}
            <div className="h-12 flex items-center justify-center border-b border-slate-200 bg-slate-50 sticky top-0 z-20">
              <span className="text-sm font-medium text-gray-900">
                {resource.name}
              </span>
            </div>

            {/* Grade de Horas */}
            <div className={`relative ${index === 0 ? '' : ''}`}>
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="h-[60px] border-b border-slate-100 hover:bg-gray-50/50 cursor-pointer transition-colors"
                  onClick={() =>
                    onDateClick?.(setHours(setMinutes(date, 0), hour))
                  }
                />
              ))}

              {/* Eventos */}
              {dayEvents
                .filter(
                  (event) => !hasResources || event.resourceId === resource.id
                )
                .map((event) => {
                  const position = getEventPosition(event)
                  return (
                    <EventBlock
                      key={event.id}
                      event={event}
                      style={position}
                      onClick={() => onEventClick?.(event)}
                    />
                  )
                })}

              {/* Linha do Tempo Atual */}
              {isSameDay(currentTime, date) && (
                <TimeIndicator
                  currentTime={currentTime}
                  hourSlotHeight={HOUR_SLOT_HEIGHT}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
