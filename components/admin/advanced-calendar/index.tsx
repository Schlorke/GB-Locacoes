'use client'

import { useState, useMemo } from 'react'
import { addDays, addWeeks, addMonths, startOfDay } from 'date-fns'
import { CalendarHeader } from './calendar-header'
import { DailyView } from './daily-view'
import { MonthlyView } from './monthly-view'
import { TimelineView } from './timeline-view'
import { EventDetailsPanel } from './event-details-panel'
import { ColumnEventsPanel } from './column-events-panel'
import {
  CalendarFilters,
  applyFilters,
  type CalendarFiltersState,
  DEFAULT_FILTERS,
} from './calendar-filters'
import type { ViewMode, CalendarEvent, CalendarResource } from './types'

export interface AdvancedCalendarProps {
  events: CalendarEvent[]
  resources?: CalendarResource[]
  onEventClick?: (_event: CalendarEvent) => void
  onDateClick?: (_date: Date) => void
  onEventDrop?: (_eventId: string, _newStart: Date, _newEnd: Date) => void
  onCreateEvent?: (_event: Partial<CalendarEvent>) => void
  onEditEvent?: (_event: CalendarEvent) => void
  onRescheduleEvent?: (_event: CalendarEvent) => void
  onCompleteEvent?: (_event: CalendarEvent) => void
  onCancelEvent?: (_event: CalendarEvent) => void
  onOpenEquipment?: (_equipmentId?: string) => void
  onOpenRental?: (_rentalId: string) => void
  onOpenRoute?: (_event: CalendarEvent) => void
  defaultViewMode?: ViewMode
  defaultDate?: Date
  className?: string
  showFilters?: boolean
}

export function AdvancedCalendar({
  events,
  resources,
  onEventClick,
  onDateClick,
  onEventDrop: _onEventDrop,
  onCreateEvent,
  onEditEvent,
  onRescheduleEvent,
  onCompleteEvent,
  onCancelEvent,
  onOpenEquipment,
  onOpenRental,
  onOpenRoute,
  defaultViewMode = 'weekly',
  defaultDate,
  className,
  showFilters = false,
}: AdvancedCalendarProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode)
  const [currentDate, setCurrentDate] = useState<Date>(
    defaultDate ? startOfDay(defaultDate) : startOfDay(new Date())
  )
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false)
  const [filters, setFilters] = useState<CalendarFiltersState>(DEFAULT_FILTERS)
  const [selectedColumn, setSelectedColumn] = useState<{
    id: string
    name: string
    events: CalendarEvent[]
  } | null>(null)
  const [isColumnPanelOpen, setIsColumnPanelOpen] = useState(false)

  // Aplica filtros aos eventos
  const filteredEvents = useMemo(
    () => applyFilters(events, filters),
    [events, filters]
  )

  const handleNavigate = (direction: 'prev' | 'next' | 'today') => {
    if (direction === 'today') {
      setCurrentDate(startOfDay(new Date()))
      return
    }

    const modifier = direction === 'prev' ? -1 : 1
    switch (viewMode) {
      case 'daily':
        setCurrentDate((prev) => addDays(prev, modifier))
        break
      case 'weekly':
        setCurrentDate((prev) => addWeeks(prev, modifier))
        break
      case 'monthly':
        setCurrentDate((prev) => addMonths(prev, modifier))
        break
      case 'timeline':
        setCurrentDate((prev) => addWeeks(prev, modifier))
        break
    }
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsDetailsPanelOpen(true)
    onEventClick?.(event)
  }

  const handleDateClick = (date: Date) => {
    setCurrentDate(date)
    onDateClick?.(date)
  }

  const handleColumnClick = (
    columnId: string,
    columnName: string,
    columnEvents: CalendarEvent[]
  ) => {
    setSelectedColumn({ id: columnId, name: columnName, events: columnEvents })
    setIsColumnPanelOpen(true)
  }

  return (
    <>
      <div
        className={`flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden ${className || ''}`}
      >
        <CalendarHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          currentDate={currentDate}
          onNavigate={handleNavigate}
        />

        {showFilters && (
          <div className="px-4 py-3 border-b border-slate-200">
            <CalendarFilters
              events={events}
              resources={resources}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {viewMode === 'daily' && (
            <DailyView
              date={currentDate}
              events={filteredEvents}
              resources={resources}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
              onCreateEvent={onCreateEvent}
              onColumnClick={handleColumnClick}
            />
          )}
          {viewMode === 'weekly' && (
            <TimelineView
              date={currentDate}
              events={filteredEvents}
              resources={resources}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
              onColumnClick={handleColumnClick}
            />
          )}
          {viewMode === 'monthly' && (
            <MonthlyView
              date={currentDate}
              events={filteredEvents}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
              onColumnClick={handleColumnClick}
            />
          )}
          {viewMode === 'timeline' && (
            <TimelineView
              date={currentDate}
              events={filteredEvents}
              resources={resources}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
              onColumnClick={handleColumnClick}
            />
          )}
        </div>
      </div>

      {/* Event Details Panel */}
      <EventDetailsPanel
        event={selectedEvent}
        open={isDetailsPanelOpen}
        onOpenChange={setIsDetailsPanelOpen}
        onEdit={onEditEvent}
        onReschedule={onRescheduleEvent}
        onComplete={onCompleteEvent}
        onCancel={onCancelEvent}
        onOpenEquipment={onOpenEquipment}
        onOpenRental={onOpenRental}
        onOpenRoute={onOpenRoute}
      />

      {/* Column Events Panel - NOVO */}
      <ColumnEventsPanel
        columnId={selectedColumn?.id || null}
        columnName={selectedColumn?.name || ''}
        events={selectedColumn?.events || []}
        open={isColumnPanelOpen}
        onOpenChange={setIsColumnPanelOpen}
        onEventClick={(event) => {
          handleEventClick(event)
          setIsColumnPanelOpen(false) // Fecha sidebar ao abrir dialog
        }}
        viewMode={viewMode}
      />
    </>
  )
}

// Re-export types for convenience
export type { ViewMode, CalendarEvent, CalendarResource } from './types'
