'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar as CalendarIcon, Truck, MapPin } from 'lucide-react'
import { format } from 'date-fns'

interface Delivery {
  id: string
  type: 'DELIVERY' | 'PICKUP'
  status: string
  scheduledAt: string
  address: {
    street?: string
    city?: string
  }
  rental: {
    users: {
      name: string | null
    }
  }
}

interface LogisticsCalendarProps {
  deliveries: Delivery[]
  onDateSelect?: (_date: Date) => void
  selectedDate?: Date
}

export function LogisticsCalendar({
  deliveries,
  onDateSelect,
  selectedDate,
}: LogisticsCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    selectedDate || new Date()
  )

  // Agrupar entregas por data
  const deliveriesByDate = deliveries.reduce(
    (acc, delivery) => {
      const dateKey = format(new Date(delivery.scheduledAt), 'yyyy-MM-dd')
      if (!acc[dateKey]) {
        acc[dateKey] = []
      }
      acc[dateKey].push(delivery)
      return acc
    },
    {} as Record<string, Delivery[]>
  )

  // Criar modificadores para o calendário
  const modifiers = {
    hasDeliveries: Object.keys(deliveriesByDate).map(
      (dateKey) => new Date(dateKey)
    ),
    hasScheduled: Object.keys(deliveriesByDate)
      .filter((dateKey) =>
        deliveriesByDate[dateKey]?.some((d) => d.status === 'SCHEDULED')
      )
      .map((dateKey) => new Date(dateKey)),
    hasInTransit: Object.keys(deliveriesByDate)
      .filter((dateKey) =>
        deliveriesByDate[dateKey]?.some((d) => d.status === 'IN_TRANSIT')
      )
      .map((dateKey) => new Date(dateKey)),
    hasCompleted: Object.keys(deliveriesByDate)
      .filter((dateKey) =>
        deliveriesByDate[dateKey]?.some((d) => d.status === 'COMPLETED')
      )
      .map((dateKey) => new Date(dateKey)),
  }

  const modifiersClassNames = {
    hasDeliveries: 'bg-blue-50 border-blue-200',
    hasScheduled: 'bg-yellow-50 border-yellow-300',
    hasInTransit: 'bg-orange-50 border-orange-300',
    hasCompleted: 'bg-green-50 border-green-300',
  }

  const handleDayClick = (date: Date | undefined) => {
    if (date && onDateSelect) {
      onDateSelect(date)
    }
  }

  const getDeliveriesForDate = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd')
    return deliveriesByDate[dateKey] || []
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Agenda de Entregas e Coletas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDayClick}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className="rounded-md border"
          />

          {/* Legenda */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 bg-yellow-50 border-yellow-300" />
              <span>Agendada</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 bg-orange-50 border-orange-300" />
              <span>Em Trânsito</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 bg-green-50 border-green-300" />
              <span>Concluída</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 bg-blue-50 border-blue-200" />
              <span>Com Entregas</span>
            </div>
          </div>

          {/* Detalhes do dia selecionado */}
          {selectedDate && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <h4 className="font-semibold mb-3">
                {format(selectedDate, "dd 'de' MMMM 'de' yyyy")}
              </h4>
              {getDeliveriesForDate(selectedDate).length > 0 ? (
                <div className="space-y-2">
                  {getDeliveriesForDate(selectedDate).map((delivery) => (
                    <div
                      key={delivery.id}
                      className="p-3 bg-white rounded border flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck className="w-4 h-4 text-gray-500" />
                          <Badge
                            variant="outline"
                            className={
                              delivery.type === 'DELIVERY'
                                ? 'bg-blue-50 text-blue-800'
                                : 'bg-purple-50 text-purple-800'
                            }
                          >
                            {delivery.type === 'DELIVERY'
                              ? 'Entrega'
                              : 'Coleta'}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              delivery.status === 'SCHEDULED'
                                ? 'bg-yellow-50 text-yellow-800'
                                : delivery.status === 'IN_TRANSIT'
                                  ? 'bg-orange-50 text-orange-800'
                                  : 'bg-green-50 text-green-800'
                            }
                          >
                            {delivery.status === 'SCHEDULED'
                              ? 'Agendada'
                              : delivery.status === 'IN_TRANSIT'
                                ? 'Em Trânsito'
                                : 'Concluída'}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {delivery.rental.users.name || 'Cliente'}
                        </p>
                        {delivery.address.city && (
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {delivery.address.city}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          {format(new Date(delivery.scheduledAt), 'HH:mm')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Nenhuma entrega ou coleta agendada para este dia
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
