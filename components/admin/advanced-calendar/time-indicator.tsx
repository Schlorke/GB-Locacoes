'use client'

import { format, differenceInMinutes, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MINUTE_HEIGHT, TIME_INDICATOR_LINE_HEIGHT } from './constants'

interface TimeIndicatorProps {
  currentTime: Date
  hourSlotHeight: number
}

export function TimeIndicator({
  currentTime,
  hourSlotHeight: _hourSlotHeight,
}: TimeIndicatorProps) {
  // Calcula minutos desde meia-noite
  const dayStart = startOfDay(currentTime)
  const minutesFromStart = differenceInMinutes(currentTime, dayStart)

  const lineHeight = TIME_INDICATOR_LINE_HEIGHT

  // Calcula a posição EXATA da linha laranja
  // A LINHA precisa estar alinhada com o border-b do slot de hora
  // O border-b está na posição: minutos * MINUTE_HEIGHT
  // Centraliza a linha subtraindo metade da altura
  const lineTopPosition = minutesFromStart * MINUTE_HEIGHT - lineHeight / 2

  return (
    <div
      className="absolute left-0 right-0 z-10 pointer-events-none"
      style={{ top: Math.max(0, lineTopPosition) }}
    >
      {/* Container flex: bloco à esquerda, linha à direita */}
      <div className="flex items-center" style={{ height: lineHeight }}>
        {/* Bloco do horário - centralizado verticalmente com a linha */}
        <div className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-r font-medium shadow-sm">
          {format(currentTime, 'HH:mm', { locale: ptBR })}
        </div>
        {/* LINHA LARANJA - esta é a que precisa estar alinhada com o border-b */}
        <div
          className="flex-1 bg-orange-500 shadow-sm"
          style={{ height: lineHeight }}
        />
      </div>
    </div>
  )
}
