'use client'

import { useEffect, useState, useMemo, useRef, useLayoutEffect } from 'react'
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
  endOfDay,
  max,
  min,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { EventBlock } from './event-block'
import { TimeIndicator } from './time-indicator'
import { AllDaySection, getAllDayEvents } from './all-day-section'
import { calculateEventPositions } from './event-overlap-manager'
import { QuickCreateDialog } from './quick-create-dialog'
import { HOUR_SLOT_HEIGHT, MINUTE_HEIGHT } from './constants'
import type { CalendarEvent } from './types'

interface WeeklyViewProps {
  date: Date
  events: CalendarEvent[]
  onEventClick?: (_event: CalendarEvent) => void
  onDateClick?: (_date: Date) => void
  onCreateEvent?: (_event: Partial<CalendarEvent>) => void
}

const HOURS = Array.from({ length: 24 }, (_, i) => i) // 00:00 at\u00e9 23:00

export function WeeklyView({
  date,
  events,
  onEventClick,
  onDateClick,
  onCreateEvent,
}: WeeklyViewProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)
  const [quickCreateDate, setQuickCreateDate] = useState<Date | null>(null)
  const [quickCreateTime, setQuickCreateTime] = useState<Date | null>(null)
  const columnRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [columnWidths, setColumnWidths] = useState<Map<string, number>>(
    new Map()
  )

  const weekStart = startOfWeek(date, { weekStartsOn: 1 }) // Começa na segunda
  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  )

  // Mede a largura real das colunas
  useLayoutEffect(() => {
    const updateWidths = () => {
      const newWidths = new Map<string, number>()
      columnRefs.current.forEach((el, key) => {
        if (el) {
          newWidths.set(key, el.clientWidth)
        }
      })

      // Só atualiza se os valores realmente mudaram
      setColumnWidths((prevWidths) => {
        let hasChanged = false
        if (prevWidths.size !== newWidths.size) {
          hasChanged = true
        } else {
          for (const [key, value] of newWidths) {
            if (prevWidths.get(key) !== value) {
              hasChanged = true
              break
            }
          }
        }
        return hasChanged ? newWidths : prevWidths
      })
    }

    // Usa requestAnimationFrame para evitar atualizações durante o render
    const rafId = requestAnimationFrame(() => {
      updateWidths()
    })

    window.addEventListener('resize', updateWidths)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateWidths)
    }
  }, [date]) // Depende apenas de date, que é mais estável

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Separa eventos all-day dos eventos do time-grid
  const allDayEvents = useMemo(() => getAllDayEvents(events), [events])

  const getTimeGridEventsForDay = (day: Date) => {
    const dayStart = startOfDay(day)
    const dayEnd = endOfDay(day)

    return events.filter((event) => {
      // Exclui eventos all-day/multi-day
      if (event.isAllDay || event.isMultiDay) return false

      // Para eventos pendentes ou rejeitados, usa createdAt para determinar o dia
      if (event.isPendingRequest && event.createdAt) {
        return event.createdAt >= dayStart && event.createdAt <= dayEnd
      }
      // Para outros eventos, inclui os que se sobrepõem ao dia
      return event.start <= dayEnd && event.end >= dayStart
    })
  }

  const handleSlotClick = (day: Date, hour: number) => {
    const clickedTime = setHours(setMinutes(day, 0), hour)
    setQuickCreateDate(day)
    setQuickCreateTime(clickedTime)
    setQuickCreateOpen(true)
    onDateClick?.(clickedTime)
  }

  const getEventPosition = (event: CalendarEvent, day: Date) => {
    const dayStart = startOfDay(day)
    const dayEnd = endOfDay(day)

    // Para eventos pendentes ou rejeitados, posiciona pelo horário de criação com altura auto
    if (event.isPendingRequest && event.createdAt) {
      const minutesFromDayStart = differenceInMinutes(event.createdAt, dayStart)
      return {
        top: Math.max(0, minutesFromDayStart * MINUTE_HEIGHT),
        height: 'auto' as const, // Altura automática
        isPending: true,
      }
    }

    // Limita o início e fim do evento ao dia atual
    const eventStart = max([event.start, dayStart])
    const eventEnd = min([event.end, dayEnd])

    // Calcula a posição dentro do dia (0-1439 minutos)
    const minutesFromDayStart = differenceInMinutes(eventStart, dayStart)
    const duration = differenceInMinutes(eventEnd, eventStart)

    // Limita a altura máxima a 24 horas (1440 minutos)
    const maxHeight = 1440 * MINUTE_HEIGHT
    const calculatedHeight = duration * MINUTE_HEIGHT

    return {
      top: Math.max(0, minutesFromDayStart * MINUTE_HEIGHT),
      height: Math.min(Math.max(calculatedHeight, 30), maxHeight),
      isPending: false,
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
      <div className="flex-1 flex">
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

            {/* Seção All-Day */}
            <AllDaySection
              date={day}
              events={allDayEvents}
              onEventClick={onEventClick}
            />

            {/* Grade de Horas */}
            <div
              ref={(el) => {
                if (el) columnRefs.current.set(day.toISOString(), el)
              }}
              className="relative h-[1440px]"
            >
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="h-[60px] border-b border-slate-100 hover:bg-gray-50/50 cursor-pointer transition-colors"
                  onClick={() => handleSlotClick(day, hour)}
                />
              ))}

              {/* Eventos do Time-Grid com Overlap Manager */}
              {(() => {
                const timeGridEvents = getTimeGridEventsForDay(day)
                const containerWidth =
                  columnWidths.get(day.toISOString()) || 200
                const positions = calculateEventPositions(
                  timeGridEvents,
                  day,
                  containerWidth
                )

                return positions.map((pos) => {
                  const position = getEventPosition(pos.event, day)
                  return (
                    <EventBlock
                      key={pos.event.id}
                      event={pos.event}
                      style={{
                        ...position,
                        left: pos.left,
                        width: pos.width,
                      }}
                      onClick={onEventClick}
                    />
                  )
                })
              })()}

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

      {/* Quick Create Dialog */}
      {quickCreateDate && quickCreateTime && (
        <QuickCreateDialog
          open={quickCreateOpen}
          onOpenChange={setQuickCreateOpen}
          defaultDate={quickCreateDate}
          defaultStartTime={quickCreateTime}
          onCreate={onCreateEvent}
        />
      )}
    </div>
  )
}
