'use client'

import { useMemo, useEffect, useState, useRef, useLayoutEffect } from 'react'
import {
  format,
  isSameDay,
  setHours,
  setMinutes,
  differenceInMinutes,
  startOfDay,
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
import type { CalendarEvent, CalendarResource } from './types'

interface DailyViewProps {
  date: Date
  events: CalendarEvent[]
  resources?: CalendarResource[]
  onEventClick?: (_event: CalendarEvent) => void
  onDateClick?: (_date: Date) => void
  onCreateEvent?: (_event: Partial<CalendarEvent>) => void
}

const HOURS = Array.from({ length: 24 }, (_, i) => i) // 00:00 at\u00e9 23:00

export function DailyView({
  date,
  events,
  resources,
  onEventClick,
  onDateClick,
  onCreateEvent,
}: DailyViewProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)
  const [quickCreateTime, setQuickCreateTime] = useState<Date | null>(null)
  const columnRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const [columnWidths, setColumnWidths] = useState<Map<string, number>>(
    new Map()
  )

  const hasResources = Boolean(resources?.length)
  const resourceColumns = useMemo<CalendarResource[]>(
    () => (hasResources ? resources! : [{ id: 'default', name: 'Eventos' }]),
    [hasResources, resources]
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
      setColumnWidths(newWidths)
    }

    updateWidths()
    window.addEventListener('resize', updateWidths)
    return () => window.removeEventListener('resize', updateWidths)
  }, [resourceColumns])

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Separa eventos all-day dos eventos do time-grid
  const allDayEvents = useMemo(() => getAllDayEvents(events), [events])

  const timeGridEvents = useMemo(() => {
    const dayStart = startOfDay(date)
    const dayEnd = endOfDay(date)

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
  }, [events, date])

  const handleSlotClick = (hour: number) => {
    const clickedTime = setHours(setMinutes(date, 0), hour)
    setQuickCreateTime(clickedTime)
    setQuickCreateOpen(true)
    onDateClick?.(clickedTime)
  }

  const getEventPosition = (event: CalendarEvent) => {
    const dayStart = startOfDay(date)
    const dayEnd = endOfDay(date)

    // Para eventos pendentes ou rejeitados, posiciona pelo horário de criação com altura auto
    if (event.isPendingRequest && event.createdAt) {
      const minutesFromDayStart = differenceInMinutes(event.createdAt, dayStart)
      return {
        top: Math.max(0, minutesFromDayStart * MINUTE_HEIGHT),
        height: 'auto' as const,
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
      <div className="flex-1 flex">
        {resourceColumns.map((resource, index) => (
          <div
            key={resource.id}
            className={`flex-1 ${index < resourceColumns.length - 1 ? 'border-r border-slate-200' : ''}`}
          >
            {/* Header do Recurso */}
            <div className="h-12 flex items-center justify-center border-b border-slate-200 bg-slate-50 sticky top-0 z-20">
              <span className="text-sm font-medium text-gray-900">
                {resource.name}
              </span>
            </div>

            {/* Seção All-Day (apenas na primeira coluna) */}
            {index === 0 && (
              <AllDaySection
                date={date}
                events={allDayEvents}
                onEventClick={onEventClick}
              />
            )}

            {/* Grade de Horas */}
            <div
              ref={(el) => {
                if (el) columnRefs.current.set(resource.id, el)
              }}
              className={`relative h-[1440px] ${index === 0 ? '' : ''}`}
            >
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="h-[60px] border-b border-slate-100 hover:bg-gray-50/50 cursor-pointer transition-colors"
                  onClick={() => handleSlotClick(hour)}
                />
              ))}

              {/* Eventos do Time-Grid com Overlap Manager */}
              {(() => {
                const resourceEvents = timeGridEvents.filter(
                  (event) => !hasResources || event.resourceId === resource.id
                )
                const containerWidth = columnWidths.get(resource.id) || 200
                const positions = calculateEventPositions(
                  resourceEvents,
                  date,
                  containerWidth
                )

                return positions.map((pos) => {
                  const position = getEventPosition(pos.event)
                  return (
                    <EventBlock
                      key={pos.event.id}
                      event={pos.event}
                      style={{
                        ...position,
                        left: pos.left,
                        width: pos.width,
                      }}
                      onClick={() => onEventClick?.(pos.event)}
                    />
                  )
                })
              })()}

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

      {/* Quick Create Dialog */}
      {quickCreateTime && (
        <QuickCreateDialog
          open={quickCreateOpen}
          onOpenChange={setQuickCreateOpen}
          defaultDate={date}
          defaultStartTime={quickCreateTime}
          onCreate={onCreateEvent}
        />
      )}
    </div>
  )
}
