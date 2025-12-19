import type { CalendarEvent } from './types'
import { max, min, startOfDay, endOfDay } from 'date-fns'

export interface OverlapGroup {
  events: CalendarEvent[]
  startTime: Date
  endTime: Date
}

export interface EventPosition {
  event: CalendarEvent
  left: number
  width: number
  column: number
  totalColumns: number
  isAggregated: boolean
}

const MAX_VISIBLE_COLUMNS = 3

/**
 * Detecta grupos de eventos que se sobrepõem no mesmo horário
 */
export function detectOverlaps(
  events: CalendarEvent[],
  day: Date
): OverlapGroup[] {
  const dayStart = startOfDay(day)
  const dayEnd = endOfDay(day)

  // Filtra eventos que se sobrepõem ao dia
  const dayEvents = events.filter((event) => {
    if (event.isPendingRequest && event.createdAt) {
      return event.createdAt >= dayStart && event.createdAt <= dayEnd
    }
    return event.start <= dayEnd && event.end >= dayStart
  })

  // Ordena eventos por horário de início
  const sortedEvents = [...dayEvents].sort((a, b) => {
    const aStart = eventStartTime(a, day)
    const bStart = eventStartTime(b, day)
    return aStart.getTime() - bStart.getTime()
  })

  const groups: OverlapGroup[] = []
  const processed = new Set<string>()

  for (let i = 0; i < sortedEvents.length; i++) {
    const currentEvent = sortedEvents[i]
    if (!currentEvent || processed.has(currentEvent.id)) continue

    const currentStart = eventStartTime(currentEvent, day)
    const currentEnd = eventEndTime(currentEvent, day)

    const group: OverlapGroup = {
      events: [currentEvent],
      startTime: currentStart,
      endTime: currentEnd,
    }

    processed.add(currentEvent.id)

    // Encontra todos os eventos que se sobrepõem com o atual
    for (let j = i + 1; j < sortedEvents.length; j++) {
      const otherEvent = sortedEvents[j]
      if (!otherEvent || processed.has(otherEvent.id)) continue

      const otherStart = eventStartTime(otherEvent, day)
      const otherEnd = eventEndTime(otherEvent, day)

      // Verifica se há sobreposição
      if (
        (otherStart < currentEnd && otherEnd > currentStart) ||
        (currentStart < otherEnd && currentEnd > otherStart)
      ) {
        group.events.push(otherEvent)
        group.startTime = min([group.startTime, otherStart])
        group.endTime = max([group.endTime, otherEnd])
        processed.add(otherEvent.id)
      }
    }

    if (group.events.length > 1) {
      groups.push(group)
    }
  }

  return groups
}

/**
 * Calcula posições para eventos, lidando com overlaps
 */
export function calculateEventPositions(
  events: CalendarEvent[],
  day: Date,
  containerWidth: number = 100
): EventPosition[] {
  const positions: EventPosition[] = []
  const overlapGroups = detectOverlaps(events, day)
  const processedEvents = new Set<string>()

  // Processa grupos de overlap
  for (const group of overlapGroups) {
    const groupSize = group.events.length
    const visibleCount = Math.min(groupSize, MAX_VISIBLE_COLUMNS)

    // Calcula largura de cada coluna (deixa espaço para margens)
    // Colunas devem ter largura igual e compacta
    const margin = 2
    const totalMargin = margin * 2 * visibleCount
    const availableWidth = containerWidth - totalMargin
    const columnWidth = Math.max(availableWidth / visibleCount, 120) // Largura mínima de 120px por coluna

    group.events.forEach((event, index) => {
      if (index < MAX_VISIBLE_COLUMNS) {
        positions.push({
          event,
          left: index * (columnWidth + margin * 2) + margin,
          width: columnWidth,
          column: index,
          totalColumns: visibleCount,
          isAggregated: false,
        })
        processedEvents.add(event.id)
      }
    })

    // Se há mais eventos que o limite, adiciona um agregador
    if (groupSize > MAX_VISIBLE_COLUMNS) {
      const aggregatedCount = groupSize - MAX_VISIBLE_COLUMNS
      const firstAggregatedEvent = group.events[MAX_VISIBLE_COLUMNS]
      if (firstAggregatedEvent) {
        positions.push({
          event: {
            ...firstAggregatedEvent,
            title: `+${aggregatedCount} mais`,
            id: firstAggregatedEvent.id || `aggregated-${Date.now()}`,
          },
          left: MAX_VISIBLE_COLUMNS * (columnWidth + margin * 2) + margin,
          width: columnWidth,
          column: MAX_VISIBLE_COLUMNS,
          totalColumns: visibleCount + 1,
          isAggregated: true,
        })
      }
      // Marca todos os eventos agregados como processados
      group.events.slice(MAX_VISIBLE_COLUMNS).forEach((e) => {
        processedEvents.add(e.id)
      })
    }
  }

  // Processa eventos sem overlap (largura total da coluna)
  events.forEach((event) => {
    if (!processedEvents.has(event.id)) {
      positions.push({
        event,
        left: 4,
        width: containerWidth - 8, // Todos os eventos ocupam toda a largura disponível
        column: 0,
        totalColumns: 1,
        isAggregated: false,
      })
    }
  })

  return positions
}

/**
 * Obtém o horário de início de um evento dentro de um dia
 */
function eventStartTime(event: CalendarEvent, day: Date): Date {
  if (event.isPendingRequest && event.createdAt) {
    return event.createdAt
  }
  return max([event.start, startOfDay(day)])
}

/**
 * Obtém o horário de fim de um evento dentro de um dia
 */
function eventEndTime(event: CalendarEvent, day: Date): Date {
  if (event.isPendingRequest && event.createdAt) {
    // Para eventos pendentes, assume duração mínima de 30 minutos
    return new Date(event.createdAt.getTime() + 30 * 60 * 1000)
  }
  return min([event.end, endOfDay(day)])
}

/**
 * Obtém eventos agregados de um grupo de overlap
 */
export function getAggregatedEvents(
  overlapGroup: OverlapGroup
): CalendarEvent[] {
  if (overlapGroup.events.length <= MAX_VISIBLE_COLUMNS) {
    return []
  }
  return overlapGroup.events.slice(MAX_VISIBLE_COLUMNS)
}
