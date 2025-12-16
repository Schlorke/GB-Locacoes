'use client'

import { useEffect, useState } from 'react'
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  setHours,
  setMinutes,
  differenceInMinutes,
  startOfDay,
  isToday,
  startOfToday,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { EventBlock } from './event-block'
import { TimeIndicator } from './time-indicator'
import { HOUR_SLOT_HEIGHT, MINUTE_HEIGHT } from './constants'
import type { CalendarEvent } from './types'

interface WeeklyViewProps {
  date: Date
  events: CalendarEvent[]
  onEventClick?: (_event: CalendarEvent) => void
  onDateClick?: (_date: Date) => void
}

const HOURS = Array.from({ length: 24 }, (_, i) => i) // 00:00 at\u00e9 23:00

export function WeeklyView({
  date,
  events,
  onEventClick,
  onDateClick,
}: WeeklyViewProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  const weekStart = startOfWeek(date, { weekStartsOn: 1 }) // Começa na segunda
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(event.start, day))
  }

  const getEventPosition = (event: CalendarEvent) => {
    const dayStart = startOfDay(event.start)
    const minutesFromStart = differenceInMinutes(event.start, dayStart)
    const duration = differenceInMinutes(event.end, event.start)

    return {
      top: minutesFromStart * MINUTE_HEIGHT,
      height: Math.max(duration * MINUTE_HEIGHT, 30),
    }
  }

  return (
    <div className="flex bg-white overflow-x-auto min-h-[500px]">
      {/* Coluna de Horas */}
      <div className="w-16 flex-shrink-0 bg-slate-50">
        <div className="h-16 border-b border-r border-slate-200" />
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="h-[60px] relative border-r border-slate-200"
          >
            {hour != 0 && (
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

      {/* Colunas dos Dias */}
      <div className="flex-1 flex min-w-[700px]">
        {weekDays.map((day, index) => (
          <div
            key={day.toISOString()}
            className={`flex-1 ${index < weekDays.length - 1 ? 'border-r border-slate-200' : ''}`}
          >
            {/* Header do Dia */}
            <div className="h-16 flex flex-col items-center justify-center border-b border-slate-200 bg-slate-50 sticky top-0 z-20">
              <span className="text-xs text-gray-600 uppercase font-medium">
                {format(day, 'EEE', { locale: ptBR })}
              </span>
              <span
                className={`text-lg font-semibold ${
                  isToday(day)
                    ? 'bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mt-1'
                    : 'text-gray-900 mt-1'
                }`}
              >
                {format(day, 'd')}
              </span>
            </div>

            {/* Grade de Horas */}
            <div className="relative">
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="h-[60px] border-b border-slate-100 hover:bg-gray-50/50 cursor-pointer transition-colors"
                  onClick={() =>
                    onDateClick?.(setHours(setMinutes(day, 0), hour))
                  }
                />
              ))}

              {/* Eventos */}
              {getEventsForDay(day).map((event) => {
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
              {isSameDay(currentTime, day) && (
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
