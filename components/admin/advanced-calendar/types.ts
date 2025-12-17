export type ViewMode = 'daily' | 'weekly' | 'monthly'

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  resourceId?: string
  color: string
  type: 'delivery' | 'pickup' | 'maintenance' | 'rental'
  status: string
  metadata?: Record<string, unknown>
  /** Data/hora de criação da solicitação (para posicionar eventos PENDING) */
  createdAt?: Date
  /** Se true, usa altura automática e posiciona pelo createdAt */
  isPendingRequest?: boolean
}

export interface CalendarResource {
  id: string
  name: string
}
