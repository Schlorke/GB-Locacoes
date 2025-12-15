export type ViewMode = 'daily' | 'weekly' | 'monthly'

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resourceId?: string
  color: string
  type: 'delivery' | 'pickup' | 'maintenance'
  status: string
  metadata?: Record<string, unknown>
}

export interface CalendarResource {
  id: string
  name: string
}
