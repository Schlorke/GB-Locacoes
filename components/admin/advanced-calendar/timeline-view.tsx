'use client'

import { useMemo, useState } from 'react'
import { format, startOfWeek, addDays, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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

// Mapeamento de cores por status
const STATUS_COLORS: Record<string, string> = {
  pending: '#f97316', // Laranja (orange-500) - mais claro para diferenciar do vermelho
  approved: '#22c55e', // Verde (green-500)
  rejected: '#ef4444', // Vermelho (red-500)
  completed: '#3b82f6', // Azul (blue-500)
}

interface TimelineViewProps {
  date: Date
  events: CalendarEvent[]
  resources?: CalendarResource[]
  onEventClick?: (_event: CalendarEvent) => void
  onDateClick?: (_date: Date) => void
  onColumnClick?: (
    _columnId: string,
    _columnName: string,
    _events: CalendarEvent[]
  ) => void
}

export function TimelineView({
  date,
  events,
  resources,
  onEventClick,
  onDateClick: _onDateClick,
  onColumnClick,
}: TimelineViewProps) {
  const [isEquipmentHovered, setIsEquipmentHovered] = useState(false)
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
      // Ordena os recursos mantendo a ordem: pending, approved, rejected
      const statusOrder = ['pending', 'approved', 'rejected', 'completed']
      return [...resources].sort((a, b) => {
        const aIndex = statusOrder.indexOf(a.id)
        const bIndex = statusOrder.indexOf(b.id)
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
        if (aIndex !== -1) return -1
        if (bIndex !== -1) return 1
        return a.name.localeCompare(b.name)
      })
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

    // Para eventos rejeitados ou pendentes, usar a data de criação e ocupar toda a largura do dia
    if (
      (event.status === 'rejected' || event.status === 'pending') &&
      event.createdAt
    ) {
      const eventDate = event.createdAt

      // Encontra o índice do dia na timeline
      const dayIndex = visiblePeriod.days.findIndex((day) =>
        isSameDay(day, eventDate)
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

      // Para eventos rejeitados ou pendentes, verifica se a data de criação está no período visível
      if (
        (event.status === 'rejected' || event.status === 'pending') &&
        event.createdAt
      ) {
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

  return (
    <div className="flex flex-col bg-white h-full">
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
        <div
          className="grid min-h-full"
          style={{
            gridTemplateColumns: 'max-content 1fr',
            gridTemplateRows: `${TIMELINE_HEADER_HEIGHT}px ${timelineRowTemplate}`,
          }}
        >
          {/* Header da Lista de Recursos */}
          <div
            className="sticky top-0 flex h-full w-full flex-col justify-center items-center px-3 border-b border-r border-slate-200 bg-slate-50 cursor-pointer transition-colors group hover:bg-orange-50"
            style={{
              height: TIMELINE_HEADER_HEIGHT,
              minHeight: TIMELINE_HEADER_HEIGHT,
              maxHeight: TIMELINE_HEADER_HEIGHT,
            }}
            onMouseEnter={() => setIsEquipmentHovered(true)}
            onMouseLeave={() => setIsEquipmentHovered(false)}
            onClick={() => {
              // Coleta todos os eventos da semana visivel (todos os equipamentos)
              const weekEvents = events.filter((event) => {
                // Para eventos rejeitados ou pendentes, verifica se a data de criação está no período visível
                if (
                  (event.status === 'rejected' || event.status === 'pending') &&
                  event.createdAt
                ) {
                  return visiblePeriod.days.some((day) =>
                    isSameDay(day, event.createdAt!)
                  )
                }
                // Para outros eventos, verifica se o evento se sobrepoe ao periodo visivel
                return (
                  event.start.getTime() <= visiblePeriod.end.getTime() &&
                  event.end.getTime() >= visiblePeriod.start.getTime()
                )
              })

              onColumnClick?.(
                'all-equipments',
                'Todos os Equipamentos - Semana',
                weekEvents
              )
            }}
          >
            <div className="text-sm font-semibold text-gray-700 whitespace-nowrap leading-none group-hover:text-orange-600 transition-colors">
              Equipamentos
            </div>
          </div>

          {/* Camada de Colunas (Headers + Hover) */}
          <div
            className="relative"
            style={{
              gridColumn: 2,
              gridRow: '1 / -1',
            }}
          >
            <div className="flex h-full w-full">
              {visiblePeriod.days.map((day, dayIndex) => {
                const isLastDay = dayIndex === visiblePeriod.days.length - 1
                const dayBorderClass = isLastDay ? 'border-r-0' : 'border-r'
                const isDayHighlighted = isEquipmentHovered
                // Calcula eventos para este dia
                const dayEvents = events.filter((event) => {
                  if (
                    (event.status === 'rejected' ||
                      event.status === 'pending') &&
                    event.createdAt
                  ) {
                    return isSameDay(day, event.createdAt)
                  }
                  return (
                    event.start.getTime() <= day.getTime() + 86400000 &&
                    event.end.getTime() >= day.getTime()
                  )
                })

                return (
                  <div key={day.toISOString()} className="flex-1 relative">
                    <div
                      className={`peer sticky top-0 flex flex-col items-center justify-center border-b border-slate-200 cursor-pointer transition-colors group hover:bg-orange-50 ${dayBorderClass} ${
                        isDayHighlighted ? 'bg-orange-50' : 'bg-slate-50'
                      }`}
                      style={{
                        height: TIMELINE_HEADER_HEIGHT,
                        minHeight: TIMELINE_HEADER_HEIGHT,
                        maxHeight: TIMELINE_HEADER_HEIGHT,
                      }}
                      onClick={() => {
                        onColumnClick?.(
                          day.toISOString(),
                          format(day, "EEEE, dd 'de' MMM", { locale: ptBR }),
                          dayEvents
                        )
                      }}
                    >
                      <div
                        className={`text-xs font-semibold uppercase transition-colors ${
                          isDayHighlighted
                            ? 'text-orange-600'
                            : 'text-gray-600 group-hover:text-orange-600'
                        }`}
                      >
                        {WEEKDAY_ABBREVIATIONS[day.getDay()]}
                      </div>
                      <div
                        className={`text-sm font-bold transition-colors ${
                          isDayHighlighted
                            ? 'text-orange-600'
                            : 'text-gray-900 group-hover:text-orange-600'
                        }`}
                      >
                        {format(day, 'd')}
                      </div>
                    </div>
                    <div
                      className={`absolute inset-x-0 bottom-0 peer-hover:bg-orange-50/30 transition-colors ${
                        isDayHighlighted ? 'bg-orange-50/30' : ''
                      }`}
                      style={{ top: TIMELINE_HEADER_HEIGHT }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Linhas de Recursos */}
          {timelineResources.map((resource, index) => {
            const resourceEvents = getEventsForResource(resource.id)
            const isLastRow = index === timelineResources.length - 1
            const rowBorderClass = isLastRow ? 'border-b-0' : 'border-b'
            const isResourceHighlighted = isEquipmentHovered

            return (
              <div key={resource.id} className="contents">
                <div
                  className={`peer px-3 flex items-center whitespace-nowrap border-r border-slate-200 cursor-pointer transition-colors hover:bg-orange-50 group ${rowBorderClass} ${
                    isResourceHighlighted ? 'bg-orange-50' : 'bg-slate-50'
                  }`}
                  style={{
                    gridColumn: 1,
                    gridRow: index + 2,
                    minHeight: TIMELINE_ROW_HEIGHT,
                  }}
                  onClick={() => {
                    // Coleta todos os eventos deste recurso para a semana visivel
                    onColumnClick?.(resource.id, resource.name, resourceEvents)
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor:
                          STATUS_COLORS[resource.id] ||
                          events.find((e) => e.resourceId === resource.id)
                            ?.color ||
                          '#f97316',
                      }}
                    />
                    <span
                      className={`text-sm font-medium transition-colors ${
                        isResourceHighlighted
                          ? 'text-orange-600'
                          : 'text-gray-900 group-hover:text-orange-600'
                      }`}
                    >
                      {resource.name}
                    </span>
                  </div>
                </div>

                <div
                  className={`relative cursor-pointer transition-colors hover:bg-orange-50/30 peer-hover:bg-orange-50/30 ${rowBorderClass} border-slate-200 ${
                    isResourceHighlighted ? 'bg-orange-50/30' : ''
                  }`}
                  style={{
                    gridColumn: 2,
                    gridRow: index + 2,
                    minHeight: TIMELINE_ROW_HEIGHT,
                  }}
                  onClick={() => {
                    onColumnClick?.(resource.id, resource.name, resourceEvents)
                  }}
                >
                  {/* Eventos na Swimlane - Posicionamento Original (podem se estender por multiplos dias) */}
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
                        onClick={(e) => {
                          e.stopPropagation()
                          onEventClick?.(event)
                        }}
                        title={
                          (event.status === 'rejected' ||
                            event.status === 'pending') &&
                          event.createdAt
                            ? `${event.title} - ${format(event.createdAt, 'HH:mm', { locale: ptBR })} (${event.status === 'rejected' ? 'Rejeitado' : 'Pendente'})`
                            : `${event.title} - ${format(event.start, 'HH:mm', { locale: ptBR })} - ${format(event.end, 'HH:mm', { locale: ptBR })}`
                        }
                      >
                        <div className="text-xs font-medium text-gray-900 truncate">
                          {event.title}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {(event.status === 'rejected' ||
                            event.status === 'pending') &&
                          event.createdAt ? (
                            <>
                              {format(event.createdAt, 'HH:mm', {
                                locale: ptBR,
                              })}{' '}
                              (
                              {event.status === 'rejected'
                                ? 'Rejeitado'
                                : 'Pendente'}
                              )
                            </>
                          ) : (
                            <>
                              {format(event.start, 'HH:mm', { locale: ptBR })} -{' '}
                              {format(event.end, 'HH:mm', { locale: ptBR })}
                            </>
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
    </div>
  )
}
