'use client'

import { useMemo, useRef } from 'react'
import { format, startOfWeek, addDays, addWeeks, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CalendarEvent, CalendarResource } from './types'

// Mapeamento de dias da semana para abreviações (getDay() retorna 0=domingo, 1=segunda, etc.)
const WEEKDAY_ABBREVIATIONS: Record<number, string> = {
  0: 'DOM', // Domingo
  1: 'SEG', // Segunda
  2: 'TER', // Terça
  3: 'QUA', // Quarta
  4: 'QUI', // Quinta
  5: 'SEX', // Sexta
  6: 'SAB', // Sábado
}
const TIMELINE_ROW_HEIGHT = 60
const TIMELINE_HEADER_HEIGHT = TIMELINE_ROW_HEIGHT

interface TimelineViewProps {
  date: Date
  events: CalendarEvent[]
  resources?: CalendarResource[]
  onEventClick?: (_event: CalendarEvent) => void
  onDateClick?: (_date: Date) => void
}

export function TimelineView({
  date,
  events,
  resources,
  onEventClick,
  onDateClick,
}: TimelineViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Calcula o período visível (sempre semanal)
  const visiblePeriod = useMemo(() => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 })
    return {
      start: weekStart,
      end: addDays(weekStart, 6),
      days: Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    }
  }, [date])

  // Extrai recursos únicos dos eventos
  const timelineResources = useMemo(() => {
    if (resources && resources.length > 0) {
      return resources
    }

    // Extrai recursos dos eventos
    const resourceMap = new Map<string, CalendarResource>()
    events.forEach((event) => {
      if (event.resourceId && event.equipmentName) {
        if (!resourceMap.has(event.resourceId)) {
          resourceMap.set(event.resourceId, {
            id: event.resourceId,
            name: event.equipmentName,
          })
        }
      }
    })

    return Array.from(resourceMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    )
  }, [resources, events])

  const timelineRowTemplate = `repeat(${Math.max(
    timelineResources.length,
    1
  )}, minmax(${TIMELINE_ROW_HEIGHT}px, 1fr))`

  // Calcula posição e largura dos eventos na timeline
  const getEventPosition = (event: CalendarEvent) => {
    const periodStart = visiblePeriod.start.getTime()
    const periodEnd = visiblePeriod.end.getTime()

    // Para eventos rejeitados, usar a data de rejeição e ocupar toda a largura do dia
    if (event.status === 'rejected' && event.createdAt) {
      const rejectedDate = event.createdAt

      // Encontra o índice do dia na timeline
      const dayIndex = visiblePeriod.days.findIndex((day) =>
        isSameDay(day, rejectedDate)
      )

      if (dayIndex === -1) return null

      // Calcula a posição baseada no dia - ocupa toda a largura do dia
      const dayWidth = 100 / visiblePeriod.days.length
      const left = dayIndex * dayWidth

      return {
        left: `${left}%`,
        width: `${dayWidth}%`,
      }
    }

    // Para outros eventos, calcular normalmente
    const eventStart = Math.max(event.start.getTime(), periodStart)
    const eventEnd = Math.min(event.end.getTime(), periodEnd)

    if (eventStart >= periodEnd || eventEnd <= periodStart) {
      return null
    }

    const totalDuration = periodEnd - periodStart
    const eventDuration = eventEnd - eventStart
    const left = ((eventStart - periodStart) / totalDuration) * 100
    const width = (eventDuration / totalDuration) * 100

    return {
      left: `${left}%`,
      width: `${width}%`,
    }
  }

  // Filtra eventos por recurso
  const getEventsForResource = (resourceId: string) => {
    return events.filter((event) => {
      if (event.resourceId !== resourceId) return false

      // Para eventos rejeitados, verifica se a data de rejeição está no período visível
      if (event.status === 'rejected' && event.createdAt) {
        return visiblePeriod.days.some((day) =>
          isSameDay(day, event.createdAt!)
        )
      }

      // Para outros eventos, verifica se o evento se sobrepõe ao período visível
      return (
        event.start.getTime() <= visiblePeriod.end.getTime() &&
        event.end.getTime() >= visiblePeriod.start.getTime()
      )
    })
  }

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newDate =
      direction === 'prev' ? addWeeks(date, -1) : addWeeks(date, 1)
    onDateClick?.(newDate)
  }

  return (
    <div className="flex flex-col bg-white h-full">
      {/* Controles de Navegação */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigate('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNavigate('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-gray-700 px-2">
            {format(visiblePeriod.start, 'dd MMM', { locale: ptBR })} -{' '}
            {format(visiblePeriod.end, 'dd MMM yyyy', { locale: ptBR })}
          </span>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="flex overflow-hidden h-full">
        {/* Lista de Recursos (Sticky) */}
        <div className="flex-shrink-0 border-r border-slate-200 bg-slate-50 h-full flex flex-col overflow-hidden">
          <div
            className="flex-shrink-0 bg-slate-50 border-b border-slate-200 z-10"
            style={{
              height: TIMELINE_HEADER_HEIGHT,
              minHeight: TIMELINE_HEADER_HEIGHT,
              maxHeight: TIMELINE_HEADER_HEIGHT,
            }}
          >
            <div className="flex h-full w-full flex-col justify-center items-center px-3">
              <div className="text-sm font-semibold text-gray-700 whitespace-nowrap leading-none">
                Equipamentos
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto min-h-0">
            <div
              className="grid min-h-full"
              style={{ gridTemplateRows: timelineRowTemplate }}
            >
              {timelineResources.map((resource) => {
                return (
                  <div
                    key={resource.id}
                    className="px-3 flex items-center whitespace-nowrap border-b border-slate-200 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            events.find((e) => e.resourceId === resource.id)
                              ?.color || '#ea580c',
                        }}
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {resource.name}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div
          ref={scrollContainerRef}
          className="flex-1 min-w-0 h-full flex flex-col overflow-hidden"
        >
          {/* Header da Timeline */}
          <div
            className="flex-shrink-0 bg-white border-b border-slate-200 z-20"
            style={{
              height: TIMELINE_HEADER_HEIGHT,
              minHeight: TIMELINE_HEADER_HEIGHT,
              maxHeight: TIMELINE_HEADER_HEIGHT,
            }}
          >
            <div className="flex h-full w-full">
              {visiblePeriod.days.map((day) => (
                <div
                  key={day.toISOString()}
                  className="flex-1 border-r border-slate-200 last:border-r-0 flex flex-col justify-center items-center"
                >
                  <div className="text-xs font-semibold text-gray-600 uppercase">
                    {WEEKDAY_ABBREVIATIONS[day.getDay()]}
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {format(day, 'd')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Swimlanes Container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
            <div
              className="relative grid min-h-full"
              style={{
                gridTemplateRows: timelineRowTemplate,
                padding: 0,
                margin: 0,
              }}
            >
              {timelineResources.map((resource) => {
                const resourceEvents = getEventsForResource(resource.id)

                return (
                  <div
                    key={resource.id}
                    className="relative border-b border-slate-200 last:border-b-0"
                    style={{
                      minHeight: TIMELINE_ROW_HEIGHT,
                      paddingTop: 0,
                      paddingBottom: 0,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    {/* Eventos na Swimlane */}
                    {resourceEvents.map((event) => {
                      const position = getEventPosition(event)
                      if (!position) return null

                      return (
                        <div
                          key={event.id}
                          className="absolute top-1 bottom-1 rounded-md cursor-pointer hover:opacity-90 transition-opacity border-l-2 px-2 py-1 overflow-hidden"
                          style={{
                            left: position.left,
                            width: position.width,
                            backgroundColor: event.color + '20',
                            borderLeftColor: event.color,
                            minWidth: '60px',
                          }}
                          onClick={() => onEventClick?.(event)}
                          title={
                            event.status === 'rejected' && event.createdAt
                              ? `${event.title} - ${format(event.createdAt, 'HH:mm', { locale: ptBR })} (Rejeitado)`
                              : `${event.title} - ${format(event.start, 'HH:mm', { locale: ptBR })} - ${format(event.end, 'HH:mm', { locale: ptBR })}`
                          }
                        >
                          <div className="text-xs font-medium text-gray-900 truncate">
                            {event.title}
                          </div>
                          <div className="text-xs text-gray-600 truncate">
                            {event.status === 'rejected' && event.createdAt ? (
                              <>
                                {format(event.createdAt, 'HH:mm', {
                                  locale: ptBR,
                                })}{' '}
                                (Rejeitado)
                              </>
                            ) : (
                              <>
                                {format(event.start, 'HH:mm', { locale: ptBR })}{' '}
                                - {format(event.end, 'HH:mm', { locale: ptBR })}
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
