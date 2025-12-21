'use client'

import { useMemo } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
} from 'date-fns'
import { cn } from '@/lib/utils'
import { EventPopover } from './event-popover'
import { AllDaySectionMonthly } from './all-day-section'
import type { CalendarEvent } from './types'

interface MonthlyViewProps {
  date: Date
  events: CalendarEvent[]
  onEventClick?: (_event: CalendarEvent) => void
  onDateClick?: (_date: Date) => void
  onColumnClick?: (
    _columnId: string,
    _columnName: string,
    _events: CalendarEvent[]
  ) => void
}

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']

export function MonthlyView({
  date,
  events,
  onEventClick,
  onDateClick,
  onColumnClick,
}: MonthlyViewProps) {
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })

    const days: Date[] = []
    let currentDay = calendarStart

    while (currentDay <= calendarEnd) {
      days.push(currentDay)
      currentDay = addDays(currentDay, 1)
    }

    return days
  }, [date])

  const getTimeGridEventsForDay = (day: Date) => {
    return events.filter((event) => {
      // Apenas eventos que não são all-day/multi-day
      if (event.isAllDay || event.isMultiDay) return false
      return isSameDay(event.start, day)
    })
  }

  // Agrupa os dias por coluna (dia da semana)
  const daysByColumn = useMemo(() => {
    const columns: Date[][] = [[], [], [], [], [], [], []]
    calendarDays.forEach((day) => {
      const dayOfWeek = day.getDay()
      // Converte domingo (0) para índice 6, segunda (1) para 0, etc.
      const columnIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1
      const column = columns[columnIndex]
      if (column) {
        column.push(day)
      }
    })
    return columns
  }, [calendarDays])

  return (
    <div className="flex flex-col bg-white min-h-[500px] relative">
      {/* Grade do Calendário - 7 Colunas */}
      <div className="flex-1 grid grid-cols-7 relative">
        {WEEKDAYS.map((dayName, columnIndex) => {
          const columnDays = daysByColumn[columnIndex] ?? []
          const weekdayEvents = events.filter((event) => {
            const eventWeekday = event.start.getDay()
            const targetWeekday = (columnIndex + 1) % 7
            return (
              eventWeekday === targetWeekday && isSameMonth(event.start, date)
            )
          })

          return (
            <div
              key={columnIndex}
              className="flex flex-col border-r border-slate-200 last:border-r-0"
            >
              {/* Header do Recurso (Peer) */}
              <div
                className="peer py-3 text-center text-sm font-semibold text-gray-700 border-b border-slate-200 bg-slate-50 sticky top-0 z-20 cursor-pointer hover:bg-orange-50 transition-colors group"
                onClick={() => {
                  onColumnClick?.(
                    `weekday-${columnIndex}`,
                    `Todos os ${dayName} do mês`,
                    weekdayEvents
                  )
                }}
              >
                <span className="group-hover:text-orange-600 transition-colors">
                  {dayName}
                </span>
              </div>

              {/* Blocos de Dias da Coluna */}
              <div className="flex-1 flex flex-col peer-hover:bg-orange-50/30 transition-colors">
                {columnDays.map((day) => {
                  const isCurrentMonth = isSameMonth(day, date)
                  const isCurrentDay = isToday(day)

                  return (
                    <div
                      key={day.toISOString()}
                      className={cn(
                        'min-h-[120px] p-2 border-b border-slate-200 cursor-pointer transition-colors hover:bg-gray-50/50',
                        !isCurrentMonth && 'opacity-40'
                      )}
                      style={{
                        backgroundColor: !isCurrentMonth
                          ? 'rgba(241, 245, 249, 0.3)'
                          : undefined,
                      }}
                      onClick={() => onDateClick?.(day)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={cn(
                            'text-sm',
                            isCurrentDay
                              ? 'bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-semibold'
                              : 'text-gray-900'
                          )}
                        >
                          {format(day, 'd')}
                        </span>
                      </div>

                      {/* Eventos All-Day/Multi-Day */}
                      <AllDaySectionMonthly
                        day={day}
                        events={events}
                        onEventClick={onEventClick}
                        maxVisible={2}
                      />

                      {/* Eventos do Time-Grid */}
                      <div className="space-y-1 mt-1">
                        {getTimeGridEventsForDay(day)
                          .slice(0, 3)
                          .map((event) => (
                            <div
                              key={event.id}
                              className="text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity border-l-2"
                              style={{
                                backgroundColor: event.color + '20',
                                borderLeftColor: event.color,
                                color: '#1f2937',
                              }}
                              onClick={(e) => {
                                e.stopPropagation()
                                onEventClick?.(event)
                              }}
                            >
                              {event.title}
                            </div>
                          ))}
                        {getTimeGridEventsForDay(day).length > 3 && (
                          <EventPopover
                            events={getTimeGridEventsForDay(day).slice(3)}
                            date={day}
                            onEventClick={(event) => {
                              onEventClick?.(event)
                            }}
                            trigger={
                              <div
                                className="text-xs text-gray-600 px-2 font-medium cursor-pointer hover:text-gray-900 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                +{getTimeGridEventsForDay(day).length - 3} mais
                              </div>
                            }
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
