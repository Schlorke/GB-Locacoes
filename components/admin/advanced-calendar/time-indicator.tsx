'use client'

import { format, differenceInMinutes, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TIME_INDICATOR_LINE_HEIGHT } from './constants'

interface TimeIndicatorProps {
  currentTime: Date
  hourSlotHeight: number
}

export function TimeIndicator({
  currentTime,
  hourSlotHeight,
}: TimeIndicatorProps) {
  const minutesFromMidnight = differenceInMinutes(
    currentTime,
    startOfDay(currentTime)
  )
  const minutesInDay = 24 * 60
  const minuteHeight = hourSlotHeight / 60
  const lineHeight = TIME_INDICATOR_LINE_HEIGHT
  const minutesWithinDay =
    ((minutesFromMidnight % minutesInDay) + minutesInDay) % minutesInDay
  const topPosition = minutesWithinDay * minuteHeight - lineHeight / 2

  return (
    <div
      className="absolute left-0 right-0 z-10 pointer-events-none flex items-center"
      style={{ top: topPosition <= 0 ? 0 : topPosition }}
    >
      {/* Label - alinhado verticalmente com a linha */}
      <div
        className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-r font-medium shadow-sm"
        style={{ marginTop: -(lineHeight / 2) }}
      >
        {format(currentTime, 'HH:mm', { locale: ptBR })}
      </div>
      {/* Linha - alinhada com o border-b do bloco de hora */}
      <div
        className="flex-1 bg-orange-500 shadow-sm"
        style={{ height: lineHeight }}
      />
    </div>
  )
}
