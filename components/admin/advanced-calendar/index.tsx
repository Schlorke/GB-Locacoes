'use client'

import { useState } from 'react'
import { addDays, addWeeks, addMonths, startOfDay } from 'date-fns'
import { CalendarHeader } from './calendar-header'
import { DailyView } from './daily-view'
import { WeeklyView } from './weekly-view'
import { MonthlyView } from './monthly-view'
import type { ViewMode, CalendarEvent, CalendarResource } from './types'

export interface AdvancedCalendarProps {
  events: CalendarEvent[]
  resources?: CalendarResource[]
  onEventClick?: (_event: CalendarEvent) => void
  onDateClick?: (_date: Date) => void
  onEventDrop?: (_eventId: string, _newStart: Date, _newEnd: Date) => void
  defaultViewMode?: ViewMode
  defaultDate?: Date
  className?: string
}

export function AdvancedCalendar({
  events,
  resources,
  onEventClick,
  onDateClick,
  onEventDrop: _onEventDrop,
  defaultViewMode = 'weekly',
  defaultDate,
  className,
}: AdvancedCalendarProps) {
  const [viewMode, setViewMode] = useState<ViewMode>(defaultViewMode)
  const [currentDate, setCurrentDate] = useState<Date>(
    defaultDate ? startOfDay(defaultDate) : startOfDay(new Date())
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
    }
  }

  return (
    <div
      className={`flex flex-col bg-white rounded-lg border border-slate-200 overflow-hidden ${className || ''}`}
    >
      <CalendarHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        currentDate={currentDate}
        onNavigate={handleNavigate}
      />
      <div className="flex-1 overflow-auto min-h-[500px]">
        {viewMode === 'daily' && (
          <DailyView
            date={currentDate}
            events={events}
            resources={resources}
            onEventClick={onEventClick}
            onDateClick={onDateClick}
          />
        )}
        {viewMode === 'weekly' && (
          <WeeklyView
            date={currentDate}
            events={events}
            onEventClick={onEventClick}
            onDateClick={onDateClick}
          />
        )}
        {viewMode === 'monthly' && (
          <MonthlyView
            date={currentDate}
            events={events}
            onEventClick={onEventClick}
            onDateClick={onDateClick}
          />
        )}
      </div>
    </div>
  )
}

// Re-export types for convenience
export type { ViewMode, CalendarEvent, CalendarResource } from './types'
