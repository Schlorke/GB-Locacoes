'use client'

import { format, differenceInMinutes, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TimeIndicatorProps {
  currentTime: Date
  hourHeight: number
}

export function TimeIndicator({ currentTime, hourHeight }: TimeIndicatorProps) {
  const minutesFromMidnight = differenceInMinutes(
    currentTime,
    startOfDay(currentTime)
  )
  const top = (minutesFromMidnight / 60) * hourHeight

  return (
    <div
      className="absolute left-0 right-0 flex items-center z-10 pointer-events-none"
      style={{ top }}
    >
      <div className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-r font-medium shadow-sm">
        {format(currentTime, 'HH:mm', { locale: ptBR })}
      </div>
      <div className="flex-1 h-0.5 bg-orange-500 shadow-sm" />
    </div>
  )
}
