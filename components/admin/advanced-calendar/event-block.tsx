'use client'

import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { CalendarEvent } from './types'

interface EventBlockProps {
  event: CalendarEvent
  style: {
    top: number
    height: number | 'auto'
    left?: number
    right?: number
    isPending?: boolean
  }
  onClick?: () => void
  className?: string
}

export function EventBlock({
  event,
  style,
  onClick,
  className,
}: EventBlockProps) {
  const isPending = style.isPending || style.height === 'auto'
  const heightValue = isPending ? 'auto' : Math.max(style.height as number, 30)

  return (
    <div
      className={cn(
        'absolute rounded-md px-2 py-1 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-l-2',
        className
      )}
      style={{
        top: style.top,
        height: heightValue,
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
      {isPending && event.createdAt ? (
        <div className="text-xs text-gray-600 mt-0.5">
          <span className="font-medium">
            {format(event.createdAt, 'HH:mm', { locale: ptBR })}
          </span>
          <span className="text-gray-400 ml-1">
            (
            {formatDistanceToNow(event.createdAt, {
              locale: ptBR,
              addSuffix: true,
            })}
            )
          </span>
        </div>
      ) : (
        typeof style.height === 'number' &&
        style.height > 40 && (
          <div className="text-xs text-gray-600 mt-0.5">
            {format(event.start, 'HH:mm', { locale: ptBR })} -{' '}
            {format(event.end, 'HH:mm', { locale: ptBR })}
          </div>
        )
      )}
    </div>
  )
}
