'use client'

import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import type { CalendarEvent } from './types'
import { AggregatedEventsPopover } from './aggregated-events-popover'

interface EventBlockProps {
  event: CalendarEvent
  style: {
    top: number
    height: number | 'auto'
    left?: number
    right?: number
    width?: number
    isPending?: boolean
  }
  onClick?: () => void
  className?: string
}

type DensityLevel = 'very-small' | 'medium' | 'large'

function getDensityLevel(height: number | 'auto'): DensityLevel {
  if (height === 'auto') return 'medium'
  if (height < 28) return 'very-small'
  if (height <= 56) return 'medium'
  return 'large'
}

function formatEventTitle(event: CalendarEvent): string {
  // Formato: "Preventiva — Betoneira 320L"
  if (event.equipmentName) {
    return `${event.title} — ${event.equipmentName}`
  }
  return event.title
}

export function EventBlock({
  event,
  style,
  onClick,
  className,
}: EventBlockProps) {
  // Renderização especial para badge agregador "+N mais"
  if (event.isAggregatedIndicator && event.aggregatedEvents) {
    const badgeElement = (
      <div
        className={cn(
          'absolute rounded-md px-2 py-1',
          'bg-slate-600/90 text-white text-xs font-semibold',
          'flex items-center justify-center',
          'cursor-pointer hover:bg-slate-700 transition-colors',
          'shadow-md border border-slate-500',
          'z-30' // Z-index alto para ficar acima dos eventos
        )}
        style={{
          top: `${style.top}px`,
          left: `${style.left}px`,
          width: `${style.width}px`,
          height: '32px', // Altura compacta fixa
          bottom: '4px',
        }}
        title={`${event.aggregatedEvents.length} eventos adicionais`}
      >
        {event.title}
      </div>
    )

    return (
      <AggregatedEventsPopover
        trigger={badgeElement}
        events={event.aggregatedEvents}
        date={event.createdAt || event.start}
        onEventClick={onClick}
      />
    )
  }

  // Renderização normal para eventos regulares
  const isRejected = event.status === 'rejected' || event.status === 'REJECTED'
  const isPendingStatus =
    event.status === 'pending' || event.status === 'PENDING'
  const isPending =
    style.isPending ||
    style.height === 'auto' ||
    isRejected ||
    isPendingStatus ||
    event.isPendingRequest
  const heightValue = isPending ? 'auto' : Math.max(style.height as number, 30)
  const densityLevel = getDensityLevel(heightValue)

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

  // Todos os eventos ocupam toda a largura disponível da coluna
  positionStyle.width = style.width
    ? `${style.width}px`
    : `calc(100% - ${leftMargin + rightMargin}px)`

  // Z-index baseado no ID do evento para ordem consistente
  // Garantir que sempre seja um número válido, mesmo se o ID for inválido
  const idSuffix = event.id.slice(-2)
  const parsedId = parseInt(idSuffix, 16)
  positionStyle.zIndex = isNaN(parsedId) ? 10 : 10 + (parsedId % 10)

  const formattedTitle = formatEventTitle(event)

  // Determina qual meta mostrar (status OU cliente/obra, não os dois)
  const metaToShow = event.status || event.clientName || event.equipmentName

  return (
    <div
      className={cn(
        'absolute rounded-md px-2 py-1.5 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-l-2 flex flex-col min-h-[30px] isolate',
        className
      )}
      style={positionStyle}
      onClick={onClick}
    >
      {/* Título - sempre presente */}
      <div
        className={cn(
          'text-xs font-medium text-gray-900 leading-tight',
          (densityLevel === 'very-small' || isRejected) && 'truncate'
        )}
        style={{
          ...(densityLevel === 'very-small' || isRejected
            ? {
                // Para eventos rejeitados ou muito pequenos: ellipsis simples
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }
            : {
                // Para outros: multi-line com clamp
                display: '-webkit-box',
                WebkitLineClamp: densityLevel === 'medium' ? 2 : 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word',
                overflowWrap: 'anywhere',
              }),
        }}
      >
        {formattedTitle}
      </div>

      {/* Conteúdo adicional baseado na densidade */}
      {densityLevel !== 'very-small' && (
        <>
          {/* Tempo - quando couber (médio e grande) */}
          {(isPending || isRejected) && event.createdAt ? (
            <div className="text-xs text-gray-600 mt-0.5 leading-tight truncate">
              <span className="font-medium">
                {format(event.createdAt, 'HH:mm', { locale: ptBR })}
              </span>
              {isRejected && (
                <span className="text-gray-400 ml-1">(Rejeitado)</span>
              )}
              {!isRejected && (
                <span className="text-gray-400 ml-1">
                  (
                  {formatDistanceToNow(event.createdAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                  )
                </span>
              )}
            </div>
          ) : (
            <div className="text-xs text-gray-600 mt-0.5 leading-tight truncate">
              {format(event.start, 'HH:mm', { locale: ptBR })} -{' '}
              {format(event.end, 'HH:mm', { locale: ptBR })}
            </div>
          )}

          {/* Meta - apenas para grande (>56px) ou rejeitados */}
          {(densityLevel === 'large' || isRejected) && (
            <>
              {isRejected
                ? (event.clientName || event.equipmentName) && (
                    <div className="text-xs text-gray-500 mt-0.5 leading-tight truncate">
                      {event.clientName || event.equipmentName}
                    </div>
                  )
                : metaToShow && (
                    <div className="text-xs text-gray-500 mt-0.5 leading-tight truncate">
                      {event.status || event.clientName || event.equipmentName}
                    </div>
                  )}
            </>
          )}
        </>
      )}
    </div>
  )
}
