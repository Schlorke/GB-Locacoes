'use client'

import { format, addDays, startOfWeek } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  GanttChartSquare,
  Columns3,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ViewToggle } from '@/components/ui/view-toggle'
import type { ViewMode } from './types'

interface CalendarHeaderProps {
  viewMode: ViewMode
  onViewModeChange: (_mode: ViewMode) => void
  currentDate: Date
  onNavigate: (_direction: 'prev' | 'next' | 'today') => void
}

const viewOptions = [
  { value: 'daily', label: 'Diário', icon: Columns3 },
  { value: 'weekly', label: 'Semanal', icon: GanttChartSquare },
  { value: 'monthly', label: 'Calendário', icon: Calendar },
]

export function CalendarHeader({
  viewMode,
  onViewModeChange,
  currentDate,
  onNavigate,
}: CalendarHeaderProps) {
  const getTitle = (): string => {
    switch (viewMode) {
      case 'daily':
        return format(currentDate, "dd 'de' MMMM, yyyy", { locale: ptBR })
      case 'weekly': {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) // Segunda-feira
        const weekEnd = addDays(weekStart, 6)
        return `Semana de ${format(weekStart, 'dd MMM', { locale: ptBR })} – ${format(weekEnd, 'dd MMM, yyyy', { locale: ptBR })}`
      }
      case 'monthly':
        return format(currentDate, 'MMMM yyyy', { locale: ptBR })
      default:
        return format(currentDate, 'MMMM yyyy', { locale: ptBR })
    }
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-3 border-b border-slate-200 bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-2 w-full">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('prev')}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('next')}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 capitalize flex-1 text-center sm:text-left">
          {getTitle()}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('today')}
          className="text-gray-700 border border-gray-200"
        >
          Hoje
        </Button>
      </div>
      <div className="w-full sm:w-auto flex justify-center sm:justify-start">
        <ViewToggle
          options={viewOptions}
          value={viewMode}
          onValueChange={(value) => onViewModeChange(value as ViewMode)}
        />
      </div>
    </div>
  )
}
