'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Calendar,
  Clock,
  Package,
  User,
  Wrench,
  Truck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
} from 'lucide-react'
import type { CalendarEvent, ViewMode } from './types'

interface ColumnEventsPanelProps {
  columnId: string | null
  columnName: string
  events: CalendarEvent[]
  open: boolean
  onOpenChange: (_open: boolean) => void
  onEventClick: (_event: CalendarEvent) => void
  viewMode: ViewMode
}

const TYPE_ICONS: Record<CalendarEvent['type'], typeof Package> = {
  delivery: Truck,
  pickup: Truck,
  maintenance: Wrench,
  rental: Package,
}

const TYPE_LABELS: Record<CalendarEvent['type'], string> = {
  delivery: 'Entrega',
  pickup: 'Coleta',
  maintenance: 'Manutenção',
  rental: 'Locação',
}

export function ColumnEventsPanel({
  columnId: _columnId,
  columnName,
  events,
  open,
  onOpenChange,
  onEventClick,
  viewMode,
}: ColumnEventsPanelProps) {
  const getStatusBadgeVariant = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes('concluído') || lowerStatus.includes('completo')) {
      return 'default'
    }
    if (
      lowerStatus.includes('pendente') ||
      lowerStatus.includes('aguardando')
    ) {
      return 'secondary'
    }
    if (
      lowerStatus.includes('atrasado') ||
      lowerStatus.includes('cancelado') ||
      lowerStatus.includes('rejeitado')
    ) {
      return 'destructive'
    }
    return 'outline'
  }

  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes('concluído') || lowerStatus.includes('completo')) {
      return <CheckCircle className="h-3 w-3" />
    }
    if (
      lowerStatus.includes('atrasado') ||
      lowerStatus.includes('cancelado') ||
      lowerStatus.includes('rejeitado')
    ) {
      return <XCircle className="h-3 w-3" />
    }
    if (lowerStatus.includes('pendente')) {
      return <AlertTriangle className="h-3 w-3" />
    }
    return null
  }

  const sortedEvents = [...events].sort((a, b) => {
    // Ordena por horário de início (ou createdAt para eventos pendentes)
    const timeA = a.isPendingRequest && a.createdAt ? a.createdAt : a.start
    const timeB = b.isPendingRequest && b.createdAt ? b.createdAt : b.start
    return timeA.getTime() - timeB.getTime()
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-50 border-l-3 border-orange-600">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl font-semibold text-gray-900 break-words">
                {columnName}
              </SheetTitle>
              <div className="mt-2">
                <Badge variant="outline" className="gap-1.5">
                  <FileText className="h-3 w-3" />
                  {events.length} {events.length === 1 ? 'evento' : 'eventos'}
                </Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6">
          {events.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Nenhum evento encontrado
              </h3>
              <p className="text-sm text-gray-500 text-center">
                Não há eventos agendados para esta{' '}
                {viewMode === 'daily' ? 'categoria' : 'data'}.
              </p>
            </div>
          ) : (
            // Lista de Eventos
            <div className="space-y-3">
              {sortedEvents.map((event) => {
                const TypeIcon = TYPE_ICONS[event.type]
                const duration = Math.round(
                  (event.end.getTime() - event.start.getTime()) / (1000 * 60)
                )
                const durationHours = Math.floor(duration / 60)
                const durationMinutes = duration % 60
                const durationText =
                  durationHours > 0
                    ? `${durationHours}h${durationMinutes > 0 ? ` ${durationMinutes}min` : ''}`
                    : `${durationMinutes}min`

                return (
                  <div
                    key={event.id}
                    className="relative rounded-lg border border-slate-200 bg-white p-4 hover:border-orange-300 hover:shadow-md transition-all duration-200 cursor-pointer group"
                    onClick={() => onEventClick(event)}
                  >
                    {/* Borda lateral colorida */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                      style={{ backgroundColor: event.color }}
                    />

                    {/* Conteúdo do Card */}
                    <div className="ml-2 space-y-2">
                      {/* Header do Card */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div
                            className="flex items-center justify-center w-8 h-8 rounded-md flex-shrink-0"
                            style={{
                              backgroundColor: event.color + '20',
                            }}
                          >
                            <TypeIcon
                              className="h-4 w-4"
                              style={{ color: event.color }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500 uppercase tracking-wide">
                              {TYPE_LABELS[event.type]}
                            </div>
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {event.title}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={getStatusBadgeVariant(event.status)}
                          className="gap-1 flex-shrink-0"
                        >
                          {getStatusIcon(event.status)}
                          {event.status}
                        </Badge>
                      </div>

                      <Separator />

                      {/* Detalhes */}
                      <div className="space-y-1.5 text-sm">
                        {event.clientName && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <User className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                            <span className="truncate">{event.clientName}</span>
                          </div>
                        )}
                        {event.equipmentName && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <Package className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                            <span className="truncate">
                              {event.equipmentName}
                            </span>
                          </div>
                        )}
                        {event.technicianName && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <Wrench className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                            <span className="truncate">
                              {event.technicianName}
                            </span>
                          </div>
                        )}

                        {/* Horário */}
                        <div className="flex items-center gap-2 text-gray-700 pt-1">
                          <Clock className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                          <span className="text-xs">
                            {event.isPendingRequest && event.createdAt ? (
                              <>
                                Criado em{' '}
                                {format(event.createdAt, 'HH:mm', {
                                  locale: ptBR,
                                })}
                              </>
                            ) : (
                              <>
                                {format(event.start, 'HH:mm', { locale: ptBR })}{' '}
                                - {format(event.end, 'HH:mm', { locale: ptBR })}{' '}
                                <span className="text-gray-500">
                                  ({durationText})
                                </span>
                              </>
                            )}
                          </span>
                        </div>

                        {/* All-day ou Multi-day badges */}
                        {(event.isAllDay || event.isMultiDay) && (
                          <div className="pt-1">
                            <Badge variant="outline" className="text-xs">
                              {event.isAllDay
                                ? 'Dia inteiro'
                                : 'Múltiplos dias'}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Hover indicator */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer Info */}
        {events.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-xs text-gray-500 text-center">
              Clique em um evento para ver mais detalhes
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
