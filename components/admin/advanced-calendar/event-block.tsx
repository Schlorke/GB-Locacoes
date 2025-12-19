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

  // Determina posicionamento horizontal de forma segura
  // Sempre usa left + width para evitar conflitos de posicionamento
  const positionStyle: React.CSSProperties = {
    top: `${style.top}px`,
    height: typeof heightValue === 'number' ? `${heightValue}px` : heightValue,
    backgroundColor: event.color + '20',
    borderLeftColor: event.color,
  }

  // Calcula margens (padrão: 4px em cada lado)
  const leftMargin = style.left ?? 4
  const rightMargin = style.right ?? 4

  // Sempre usa left + width para garantir posicionamento correto
  positionStyle.left = `${leftMargin}px`
  positionStyle.width = `calc(100% - ${leftMargin + rightMargin}px)`

  // Z-index baseado no ID do evento para ordem consistente
  positionStyle.zIndex = 10 + (parseInt(event.id.slice(-2), 16) % 10)

  return (
    <div
      className={cn(
        'absolute rounded-md px-2 py-1.5 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-l-2 flex flex-col min-h-[30px] isolate',
        className
      )}
      style={positionStyle}
      onClick={onClick}
    >
      <div
        className="text-xs font-medium text-gray-900 leading-tight"
        style={{
          display: '-webkit-box',
          WebkitLineClamp:
            typeof heightValue === 'number' && heightValue < 60 ? 1 : 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
        }}
      >
        {event.title}
      </div>
      {isPending && event.createdAt ? (
        <div className="text-xs text-gray-600 mt-1 leading-tight truncate">
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
          <div className="text-xs text-gray-600 mt-1 leading-tight whitespace-nowrap truncate">
            {format(event.start, 'HH:mm', { locale: ptBR })} -{' '}
            {format(event.end, 'HH:mm', { locale: ptBR })}
          </div>
        )
      )}
    </div>
  )
}
