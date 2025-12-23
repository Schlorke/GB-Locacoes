'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { CalendarEvent } from './types'

interface EventPopoverProps {
  events: CalendarEvent[]
  date: Date
  trigger: React.ReactNode
  onEventClick?: (_event: CalendarEvent) => void
  className?: string
}

export function EventPopover({
  events,
  date,
  trigger,
  onEventClick,
  className,
}: EventPopoverProps) {
  if (events.length === 0) {
    return <>{trigger}</>
  }

  const formattedDate = format(date, "EEEE, d 'de' MMMM", { locale: ptBR })

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn('w-80 p-0', className)}
        align="start"
        side="bottom"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-gray-900 capitalize">
            {formattedDate}
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            {events.length} {events.length === 1 ? 'evento' : 'eventos'}
          </p>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <div className="p-2 space-y-1">
            {events.map((event) => (
              <button
                key={event.id}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                  'hover:bg-orange-50 focus:bg-orange-50 focus:outline-none',
                  'flex items-start gap-3 group'
                )}
                onClick={() => onEventClick?.(event)}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: event.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 group-hover:text-orange-600 truncate transition-colors">
                    {event.title}
                  </div>
                  <div className="text-xs text-gray-600 group-hover:text-orange-500 mt-0.5 transition-colors">
                    {format(event.start, 'HH:mm', { locale: ptBR })} -{' '}
                    {format(event.end, 'HH:mm', { locale: ptBR })}
                  </div>
                  {event.equipmentName && (
                    <div className="text-xs text-gray-500 group-hover:text-orange-500 mt-0.5 truncate transition-colors">
                      {event.equipmentName}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
