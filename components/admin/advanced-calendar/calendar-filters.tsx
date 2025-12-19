'use client'

import { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { FilterResetButton } from '@/components/ui/filter-reset-button'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CalendarEvent, CalendarResource } from './types'

export interface CalendarFiltersState {
  equipmentTypes: string[]
  eventStatuses: string[]
  eventTypes: CalendarEvent['type'][]
  searchQuery: string
}

export const DEFAULT_FILTERS: CalendarFiltersState = {
  equipmentTypes: [],
  eventStatuses: [],
  eventTypes: [],
  searchQuery: '',
}

interface CalendarFiltersProps {
  events: CalendarEvent[]
  resources?: CalendarResource[]
  filters: CalendarFiltersState
  onFiltersChange: (_filters: CalendarFiltersState) => void
  className?: string
}

// Status comuns de eventos
const EVENT_STATUSES = [
  'Pendente',
  'Em Andamento',
  'Concluído',
  'Atrasado',
  'Cancelado',
]

// Tipos de eventos
const EVENT_TYPES: Array<{ value: CalendarEvent['type']; label: string }> = [
  { value: 'maintenance', label: 'Manutenção' },
  { value: 'rental', label: 'Locação' },
  { value: 'delivery', label: 'Entrega' },
  { value: 'pickup', label: 'Retirada' },
]

export function CalendarFilters({
  events,
  filters,
  onFiltersChange,
  className,
}: CalendarFiltersProps) {
  // Extrai tipos de equipamentos únicos dos eventos
  const availableEquipmentTypes = useMemo(() => {
    const types = new Set<string>()
    events.forEach((event) => {
      if (event.equipmentName) {
        types.add(event.equipmentName)
      }
    })
    return Array.from(types).sort()
  }, [events])

  const handleEquipmentTypeToggle = (type: string) => {
    const newTypes = filters.equipmentTypes.includes(type)
      ? filters.equipmentTypes.filter((t) => t !== type)
      : [...filters.equipmentTypes, type]
    onFiltersChange({ ...filters, equipmentTypes: newTypes })
  }

  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.eventStatuses.includes(status)
      ? filters.eventStatuses.filter((s) => s !== status)
      : [...filters.eventStatuses, status]
    onFiltersChange({ ...filters, eventStatuses: newStatuses })
  }

  const handleEventTypeToggle = (type: CalendarEvent['type']) => {
    const newTypes = filters.eventTypes.includes(type)
      ? filters.eventTypes.filter((t) => t !== type)
      : [...filters.eventTypes, type]
    onFiltersChange({ ...filters, eventTypes: newTypes })
  }

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchQuery: value })
  }

  const handleReset = () => {
    onFiltersChange(DEFAULT_FILTERS)
  }

  const hasActiveFilters =
    filters.equipmentTypes.length > 0 ||
    filters.eventStatuses.length > 0 ||
    filters.eventTypes.length > 0 ||
    filters.searchQuery.trim().length > 0

  return (
    <Card className={cn('border-slate-200', className)}>
      <CardContent className="p-4 space-y-4">
        {/* Busca */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium">
            Buscar
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Cliente, técnico, equipamento..."
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
            {filters.searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tipo de Equipamento */}
        {availableEquipmentTypes.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tipo de Equipamento</Label>
            <div className="max-h-32 overflow-y-auto space-y-2">
              {availableEquipmentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`equipment-${type}`}
                    checked={filters.equipmentTypes.includes(type)}
                    onCheckedChange={() => handleEquipmentTypeToggle(type)}
                  />
                  <Label
                    htmlFor={`equipment-${type}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status do Evento */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Status</Label>
          <div className="space-y-2">
            {EVENT_STATUSES.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={`status-${status}`}
                  checked={filters.eventStatuses.includes(status)}
                  onCheckedChange={() => handleStatusToggle(status)}
                />
                <Label
                  htmlFor={`status-${status}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {status}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Tipo de Evento */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Tipo de Evento</Label>
          <div className="space-y-2">
            {EVENT_TYPES.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`event-type-${type.value}`}
                  checked={filters.eventTypes.includes(type.value)}
                  onCheckedChange={() => handleEventTypeToggle(type.value)}
                />
                <Label
                  htmlFor={`event-type-${type.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <div className="pt-2 border-t">
            <FilterResetButton
              onClick={handleReset}
              title="Limpar filtros"
              size="md"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Aplica filtros aos eventos
 */
export function applyFilters(
  events: CalendarEvent[],
  filters: CalendarFiltersState
): CalendarEvent[] {
  return events.filter((event) => {
    // Filtro por tipo de equipamento
    if (
      filters.equipmentTypes.length > 0 &&
      event.equipmentName &&
      !filters.equipmentTypes.includes(event.equipmentName)
    ) {
      return false
    }

    // Filtro por status
    if (
      filters.eventStatuses.length > 0 &&
      !filters.eventStatuses.includes(event.status)
    ) {
      return false
    }

    // Filtro por tipo de evento
    if (
      filters.eventTypes.length > 0 &&
      !filters.eventTypes.includes(event.type)
    ) {
      return false
    }

    // Filtro por busca (cliente, técnico, equipamento, título)
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase()
      const matches =
        event.title.toLowerCase().includes(query) ||
        event.clientName?.toLowerCase().includes(query) ||
        event.technicianName?.toLowerCase().includes(query) ||
        event.equipmentName?.toLowerCase().includes(query)
      if (!matches) {
        return false
      }
    }

    return true
  })
}
