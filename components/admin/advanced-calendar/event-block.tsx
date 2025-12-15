'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { CalendarEvent } from './types'

interface EventBlockProps {
  event: CalendarEvent
  style: { top: number; height: number; left?: number; right?: number }
  onClick?: () => void
  className?: string
}

export function EventBlock({
  event,
  style,
  onClick,
  className,
}: EventBlockProps) {
  return (
    <div
      className={cn(
        'absolute rounded-md px-2 py-1 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-l-2',
        className
      )}
      style={{
        top: style.top,
        height: Math.max(style.height, 30),
        left: style.left ?? 4,
        right: style.right ?? 4,
        backgroundColor: event.color + '20',
        borderLeftColor: event.color,
      }}
      onClick={onClick}
    >
      <div className="text-xs font-medium text-gray-900 truncate">
        {event.title}
      </div>
      {style.height > 40 && (
        <div className="text-xs text-gray-600 mt-0.5">
          {format(event.start, 'HH:mm', { locale: ptBR })} -{' '}
          {format(event.end, 'HH:mm', { locale: ptBR })}
        </div>
      )}
    </div>
  )
}
