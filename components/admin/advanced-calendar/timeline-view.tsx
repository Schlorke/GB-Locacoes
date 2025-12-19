'use client'

import { useMemo, useState, useRef } from 'react'
import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  addMonths,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  isSameDay,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { CalendarEvent, CalendarResource } from './types'

interface TimelineViewProps {
  date: Date
  events: CalendarEvent[]
  resources?: CalendarResource[]
  onEventClick?: (_event: CalendarEvent) => void
  onDateClick?: (_date: Date) => void
}

type TimelineZoom = 'day' | 'week' | 'month'

export function TimelineView({
  date,
  events,
  resources,
  onEventClick,
  onDateClick,
}: TimelineViewProps) {
  const [zoom, setZoom] = useState<TimelineZoom>('week')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Calcula o período visível baseado no zoom
  const visiblePeriod = useMemo(() => {
    switch (zoom) {
      case 'day':
        return {
          start: startOfDay(date),
          end: endOfDay(date),
          days: [date],
        }
      case 'week': {
        const weekStart = startOfWeek(date, { weekStartsOn: 1 })
        return {
          start: weekStart,
          end: addDays(weekStart, 6),
          days: Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
        }
      }
      case 'month': {
        const monthStart = startOfMonth(date)
        const monthEnd = endOfMonth(date)
        const days: Date[] = []
        let current = monthStart
        while (current <= monthEnd) {
          days.push(current)
          current = addDays(current, 1)
        }
        return {
          start: monthStart,
          end: monthEnd,
          days,
        }
      }
      default:
        return {
          start: date,
          end: date,
          days: [date],
        }
    }
  }, [date, zoom])

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
      direction === 'prev'
        ? zoom === 'day'
          ? addDays(date, -1)
          : zoom === 'week'
            ? addWeeks(date, -1)
            : addMonths(date, -1)
        : zoom === 'day'
          ? addDays(date, 1)
          : zoom === 'week'
            ? addWeeks(date, 1)
            : addMonths(date, 1)
    onDateClick?.(newDate)
  }

  return (
    <div className="flex flex-col bg-white min-h-[500px] h-full">
      {/* Controles de Zoom e Navegação */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
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
        <div className="flex items-center gap-2">
          <Button
            variant={zoom === 'day' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setZoom('day')}
          >
            Dia
          </Button>
          <Button
            variant={zoom === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setZoom('week')}
          >
            Semana
          </Button>
          <Button
            variant={zoom === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setZoom('month')}
          >
            Mês
          </Button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="flex-1 overflow-hidden flex">
        {/* Lista de Recursos (Sticky) */}
        <div
          className="flex-shrink-0 border-r border-slate-200 bg-slate-50 overflow-y-auto"
          style={{ width: 'fit-content', minWidth: 'fit-content' }}
        >
          <div
            className="sticky top-0 bg-slate-50 border-b border-slate-200 z-10"
            style={{ height: '48px' }}
          >
            <div className="h-full flex items-center px-3 whitespace-nowrap">
              <h3 className="text-sm font-semibold text-gray-700">
                Equipamentos
              </h3>
            </div>
          </div>
          <div>
            {timelineResources.map((resource) => (
              <div
                key={resource.id}
                className="px-3 flex items-center border-b border-slate-200 whitespace-nowrap"
                style={{
                  height: '60px',
                  minHeight: '60px',
                }}
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
            ))}
          </div>
        </div>

        {/* Timeline Grid */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto overflow-y-auto"
        >
          <div className="relative w-full">
            {/* Header da Timeline */}
            <div
              className="sticky top-0 bg-white border-b border-slate-200 z-20"
              style={{ height: '48px' }}
            >
              <div className="flex h-full w-full">
                {visiblePeriod.days.map((day) => (
                  <div
                    key={day.toISOString()}
                    className="flex-1 border-r border-slate-200 last:border-r-0 flex flex-col justify-center items-center"
                  >
                    <div className="text-xs font-semibold text-gray-600 uppercase">
                      {format(day, 'EEE', { locale: ptBR })}
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {format(day, 'd')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Swimlanes */}
            <div className="relative">
              {timelineResources.map((resource) => {
                const resourceEvents = getEventsForResource(resource.id)

                return (
                  <div
                    key={resource.id}
                    className="relative border-b border-slate-200"
                    style={{
                      height: '60px',
                      minHeight: '60px',
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
