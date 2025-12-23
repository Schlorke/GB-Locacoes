'use client'

import { CalendarEvent } from './types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface AggregatedEventsPopoverProps {
  trigger: React.ReactNode
  events: CalendarEvent[]
  date: Date
  onEventClick?: (event: CalendarEvent) => void
}

export function AggregatedEventsPopover({
  trigger,
  events,
  date,
  onEventClick,
}: AggregatedEventsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-80 max-h-96 overflow-y-auto" align="start">
        <div className="space-y-2">
          <h3 className="font-semibold text-sm border-b pb-2">
            {format(date, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </h3>
          <div className="space-y-1">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-2 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => onEventClick?.(event)}
              >
                <div className="flex items-start gap-2">
                  <div
                    className="w-1 h-full rounded flex-shrink-0 mt-1"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {event.title}
                    </div>
                    <div className="text-xs text-gray-600">
                      {event.createdAt
                        ? format(event.createdAt, 'HH:mm')
                        : `${format(event.start, 'HH:mm')} - ${format(event.end, 'HH:mm')}`}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

