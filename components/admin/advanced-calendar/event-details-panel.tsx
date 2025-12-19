'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Edit,
  Calendar,
  Clock,
  Package,
  Wrench,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  MapPin,
  FileText,
  Truck,
} from 'lucide-react'
import type { CalendarEvent } from './types'

interface EventDetailsPanelProps {
  event: CalendarEvent | null
  open: boolean
  onOpenChange: (_open: boolean) => void
  onEdit?: (_event: CalendarEvent) => void
  onReschedule?: (_event: CalendarEvent) => void
  onComplete?: (_event: CalendarEvent) => void
  onCancel?: (_event: CalendarEvent) => void
  onOpenEquipment?: (_equipmentId?: string) => void
  onOpenRental?: (_rentalId: string) => void
  onOpenRoute?: (_event: CalendarEvent) => void
}

const TYPE_ICONS: Record<CalendarEvent['type'], typeof Package> = {
  delivery: Truck,
  pickup: Truck,
  maintenance: Wrench,
  rental: Package,
}

export function EventDetailsPanel({
  event,
  open,
  onOpenChange,
  onEdit,
  onReschedule,
  onComplete,
  onCancel,
  onOpenEquipment,
  onOpenRental,
  onOpenRoute,
}: EventDetailsPanelProps) {
  if (!event) return null

  const TypeIcon = TYPE_ICONS[event.type]
  const notes =
    event.metadata?.notes && typeof event.metadata.notes === 'string'
      ? event.metadata.notes
      : null

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
    if (lowerStatus.includes('atrasado') || lowerStatus.includes('cancelado')) {
      return 'destructive'
    }
    return 'outline'
  }

  const getStatusIcon = (status: string) => {
    const lowerStatus = status.toLowerCase()
    if (lowerStatus.includes('concluído') || lowerStatus.includes('completo')) {
      return <CheckCircle className="h-4 w-4" />
    }
    if (lowerStatus.includes('atrasado') || lowerStatus.includes('cancelado')) {
      return <XCircle className="h-4 w-4" />
    }
    if (lowerStatus.includes('pendente')) {
      return <AlertTriangle className="h-4 w-4" />
    }
    return null
  }

  const duration = Math.round(
    (event.end.getTime() - event.start.getTime()) / (1000 * 60)
  )
  const durationHours = Math.floor(duration / 60)
  const durationMinutes = duration % 60
  const durationText =
    durationHours > 0
      ? `${durationHours}h ${durationMinutes > 0 ? `${durationMinutes}min` : ''}`
      : `${durationMinutes}min`

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <div className="flex items-start gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{
                backgroundColor: event.color + '20',
                borderLeft: `3px solid ${event.color}`,
              }}
            >
              <TypeIcon className="h-5 w-5" style={{ color: event.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-xl font-semibold text-gray-900 break-words">
                {event.title}
              </SheetTitle>
              <SheetDescription className="mt-1">
                <Badge
                  variant={getStatusBadgeVariant(event.status)}
                  className="gap-1.5"
                >
                  {getStatusIcon(event.status)}
                  {event.status}
                </Badge>
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Datas e Horários */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              Datas e Horários
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Início:</span>
                <span className="text-sm font-medium text-gray-900">
                  {format(event.start, "dd 'de' MMMM, yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Fim:</span>
                <span className="text-sm font-medium text-gray-900">
                  {format(event.end, "dd 'de' MMMM, yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Duração:</span>
                <span className="text-sm font-medium text-gray-900">
                  {durationText}
                </span>
              </div>
              {(event.isAllDay || event.isMultiDay) && (
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {event.isAllDay ? 'Dia inteiro' : 'Múltiplos dias'}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Entidade Principal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-500" />
              Detalhes
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {event.equipmentName && (
                <div>
                  <span className="text-sm text-gray-600">Equipamento:</span>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {event.equipmentName}
                    </span>
                    {event.resourceId && onOpenEquipment && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenEquipment(event.resourceId)}
                        className="h-7"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Abrir
                      </Button>
                    )}
                  </div>
                </div>
              )}
              {event.clientName && (
                <div>
                  <span className="text-sm text-gray-600">Cliente/Obra:</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {event.clientName}
                  </p>
                </div>
              )}
              {event.technicianName && (
                <div>
                  <span className="text-sm text-gray-600">Técnico:</span>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {event.technicianName}
                  </p>
                </div>
              )}
              {event.type === 'rental' && event.id && onOpenRental && (
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenRental(event.id)}
                    className="w-full"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Abrir Locação
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Checklist */}
          {event.checklist && event.checklist.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-gray-500" />
                Checklist
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2">
                  {event.checklist.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Observações */}
          {notes && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                Observações
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {notes}
                </p>
              </div>
            </div>
          )}

          {/* Ações Rápidas */}
          <div className="space-y-3 pt-4 border-t">
            <h3 className="text-sm font-semibold text-gray-900">Ações</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onEdit(event)
                    onOpenChange(false)
                  }}
                  className="w-full"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
              {onReschedule && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onReschedule(event)
                    onOpenChange(false)
                  }}
                  className="w-full"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Reagendar
                </Button>
              )}
              {onComplete && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    onComplete(event)
                    onOpenChange(false)
                  }}
                  className="w-full"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Concluir
                </Button>
              )}
              {onCancel && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    onCancel(event)
                    onOpenChange(false)
                  }}
                  className="w-full"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              )}
              {onOpenRoute && event.type === 'delivery' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onOpenRoute(event)}
                  className="w-full sm:col-span-2"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Abrir Rota
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
