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
  // Calcula a posição exata baseada nos minutos desde meia-noite
  // Cada hora = 60px, cada minuto = 1px (60px / 60 minutos)
  // A linha tem h-0.5 (2px), então ajustamos -1px para alinhar a borda superior
  // da linha com o border-b do bloco de hora correspondente
  const topPosition = (minutesFromMidnight / 60) * hourHeight - 1

  return (
    <div
      className="absolute left-0 right-0 z-10 pointer-events-none flex items-center"
      style={{ top: `${topPosition}px` }}
    >
      {/* Label - alinhado verticalmente com a linha */}
      <div className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-r font-medium shadow-sm -mt-[1px]">
        {format(currentTime, 'HH:mm', { locale: ptBR })}
      </div>
      {/* Linha - alinhada com o border-b do bloco de hora */}
      <div className="flex-1 h-0.5 bg-orange-500 shadow-sm" />
    </div>
  )
}
