'use client'

import { useMemo } from 'react'
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layout,
} from 'lucide-react'

type GanttMode = 'day' | 'week' | 'month'

interface GanttRow {
  id: string
  label: string
  group?: string
  meta?: {
    status?: string
    tags?: string[]
  }
}

interface GanttItem {
  id: string
  rowId: string
  start: Date
  end: Date
  title: string
  subtitle?: string
  kind?: string
  status?: string
  conflict?: boolean
}

interface GanttViewProps {
  mode: GanttMode
  startDate: Date
  rows: GanttRow[]
  items: GanttItem[]
  onModeChange: (_mode: GanttMode) => void
  onNavigate: (_direction: 'prev' | 'next' | 'today') => void
  onDateChange: (_date: Date) => void
  onItemSelect?: (_id: string) => void
  stickySidebarWidth?: string
}

const MODE_LABEL: Record<GanttMode, string> = {
  day: 'Diário',
  week: 'Semanal',
  month: 'Mensal',
}

const STATUS_COLORS: Record<string, string> = {
  SCHEDULED: 'bg-blue-100 text-blue-800 border-blue-200',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  COMPLETED: 'bg-green-100 text-green-800 border-green-200',
  CANCELLED: 'bg-red-100 text-red-800 border-red-200',
  DELIVERY: 'bg-blue-50 text-blue-800 border-blue-200',
  PICKUP: 'bg-purple-50 text-purple-800 border-purple-200',
  IN_TRANSIT: 'bg-orange-50 text-orange-800 border-orange-200',
  DEFAULT: 'bg-gray-100 text-gray-800 border-gray-200',
}

function getStatusClass(status?: string) {
  if (!status) return STATUS_COLORS.DEFAULT
  return STATUS_COLORS[status] ?? STATUS_COLORS.DEFAULT
}

function weekDays(base: Date) {
  const start = startOfWeek(base, { weekStartsOn: 1 })
  return eachDayOfInterval({ start, end: addDays(start, 6) })
}

function monthDays(base: Date) {
  const start = startOfMonth(base)
  const end = endOfMonth(base)
  return eachDayOfInterval({ start, end })
}

function dayHours() {
  return Array.from({ length: 24 }, (_, h) => h)
}

export function GanttView({
  mode,
  startDate,
  rows,
  items,
  onModeChange,
  onNavigate: _onNavigate,
  onDateChange,
  onItemSelect,
  stickySidebarWidth = '220px',
}: GanttViewProps) {
  const { columns, columnLabels } = useMemo(() => {
    if (mode === 'day') {
      return {
        columns: dayHours(),
        columnLabels: dayHours().map(
          (h) => `${h.toString().padStart(2, '0')}:00`
        ),
      }
    }
    if (mode === 'week') {
      const days = weekDays(startDate)
      return {
        columns: days,
        columnLabels: days.map((d) => format(d, 'EEE dd')),
      }
    }
    const days = monthDays(startDate)
    return { columns: days, columnLabels: days.map((d) => format(d, 'dd')) }
  }, [mode, startDate])

  const navigateDate = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      onDateChange(new Date())
      return
    }
    if (mode === 'day') {
      onDateChange(addDays(startDate, direction === 'next' ? 1 : -1))
    } else if (mode === 'week') {
      onDateChange(addWeeks(startDate, direction === 'next' ? 1 : -1))
    } else {
      onDateChange(addMonths(startDate, direction === 'next' ? 1 : -1))
    }
  }

  const getGridPosition = (item: GanttItem) => {
    if (mode === 'day') {
      const startHour = item.start.getHours()
      const endHour = Math.max(
        startHour + 1,
        item.end.getHours() + (item.end.getMinutes() > 0 ? 1 : 0)
      )
      return { gridColumnStart: startHour + 1, gridColumnEnd: endHour + 1 }
    }
    const cols = mode === 'week' ? weekDays(startDate) : monthDays(startDate)
    const startCol = cols.findIndex((d) => isSameDay(d, item.start))
    const endCol = cols.findIndex((d) => isSameDay(d, item.end))
    if (startCol === -1 && endCol === -1) return null
    const colStart = startCol === -1 ? 1 : startCol + 1
    const colEnd = (endCol === -1 ? cols.length : endCol) + 2
    return { gridColumnStart: colStart, gridColumnEnd: colEnd }
  }

  const title = (() => {
    if (mode === 'day') return format(startDate, "dd 'de' MMM, yyyy")
    if (mode === 'week') {
      const start = startOfWeek(startDate, { weekStartsOn: 1 })
      const end = addDays(start, 6)
      return `Semana de ${format(start, 'dd MMM')} – ${format(end, 'dd MMM, yyyy')}`
    }
    return format(startDate, 'MMMM yyyy')
  })()

  const monthGridDays = useMemo(() => {
    if (mode !== 'month') return []
    const start = startOfWeek(startOfMonth(startDate), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(startDate), { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }, [mode, startDate])

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateDate('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">{title}</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateDate('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-6 mx-2" />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigateDate('today')}
          >
            Hoje
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Layout className="h-4 w-4" />
                {MODE_LABEL[mode]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(['day', 'week', 'month'] as GanttMode[]).map((m) => (
                <DropdownMenuItem key={m} onSelect={() => onModeChange(m)}>
                  {MODE_LABEL[m]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                Calendário
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(d) => d && onDateChange(startOfDay(d))}
                month={startDate}
                onMonthChange={(d) => onDateChange(startOfDay(d))}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {mode === 'month' ? (
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50 border-b text-xs font-semibold text-gray-600">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((w) => (
              <div key={w} className="px-3 py-2 border-l first:border-l-0">
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {monthGridDays.map((day, idx) => {
              const dayItems = items.filter((it) => isSameDay(it.start, day))
              return (
                <div
                  key={day.toISOString() + idx}
                  className={cn(
                    'min-h-[96px] border-l border-b px-3 py-2 text-xs align-top',
                    isSameMonth(day, startDate)
                      ? 'bg-white'
                      : 'bg-gray-50/60 text-gray-400'
                  )}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-700">
                    <span>{format(day, 'dd')}</span>
                    {dayItems.length > 0 && (
                      <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
                        {dayItems.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayItems.slice(0, 3).map((it) => (
                      <button
                        key={it.id}
                        type="button"
                        onClick={() => onItemSelect?.(it.id)}
                        className={cn(
                          'w-full truncate rounded-md border px-2 py-1 text-[11px] text-left shadow-sm',
                          getStatusClass(it.status)
                        )}
                      >
                        {it.title}
                      </button>
                    ))}
                    {dayItems.length > 3 && (
                      <div className="text-[10px] text-gray-500">
                        +{dayItems.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
          <div
            className="grid"
            style={{ gridTemplateColumns: `${stickySidebarWidth} 1fr` }}
          >
            <div className="bg-gray-50 border-r px-3 py-2 text-sm font-semibold sticky left-0 z-10">
              Recurso
            </div>
            <div className="overflow-x-auto">
              <div
                className="grid min-w-[720px]"
                style={{
                  gridTemplateColumns:
                    mode === 'day'
                      ? 'repeat(24, minmax(64px, 1fr))'
                      : `repeat(${columns.length || 1}, minmax(96px, 1fr))`,
                }}
              >
                {columns.map((col, idx) => (
                  <div
                    key={idx}
                    className="border-b border-l px-3 py-2 text-xs font-semibold text-gray-600 bg-gray-50"
                  >
                    {columnLabels[idx]}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="divide-y">
            {rows.map((row) => (
              <div
                key={row.id}
                className="grid"
                style={{ gridTemplateColumns: `${stickySidebarWidth} 1fr` }}
              >
                <div className="bg-white border-r px-3 py-3 text-sm sticky left-0 z-10 flex flex-col gap-1">
                  <span className="font-medium text-gray-900">{row.label}</span>
                  {row.meta?.status && (
                    <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium text-gray-600">
                      {row.meta.status}
                    </span>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <div
                    className="relative grid min-w-[720px]"
                    style={{
                      gridTemplateColumns:
                        mode === 'day'
                          ? 'repeat(24, minmax(64px, 1fr))'
                          : `repeat(${columns.length || 1}, minmax(96px, 1fr))`,
                    }}
                  >
                    {items
                      .filter((it) => it.rowId === row.id)
                      .map((it) => {
                        const position = getGridPosition(it)
                        if (!position) return null
                        return (
                          <button
                            key={it.id}
                            type="button"
                            onClick={() => onItemSelect?.(it.id)}
                            className={cn(
                              'relative m-0.5 rounded-md border px-3 py-2 text-left text-xs shadow-sm transition hover:shadow-md',
                              getStatusClass(it.status),
                              it.conflict && 'ring-2 ring-orange-500/70'
                            )}
                            style={{
                              gridColumnStart: position.gridColumnStart,
                              gridColumnEnd: position.gridColumnEnd,
                            }}
                          >
                            <div className="flex items-center gap-1 text-[11px] font-semibold">
                              {it.title}
                            </div>
                            {it.subtitle && (
                              <div className="text-[11px] text-gray-700">
                                {it.subtitle}
                              </div>
                            )}
                            <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-600">
                              <Clock className="h-3 w-3" />
                              {format(
                                it.start,
                                mode === 'day' ? 'HH:mm' : 'dd/MM'
                              )}{' '}
                              –{' '}
                              {format(
                                it.end,
                                mode === 'day' ? 'HH:mm' : 'dd/MM'
                              )}
                            </div>
                          </button>
                        )
                      })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
