export type ViewMode = 'daily' | 'weekly' | 'monthly' | 'timeline'

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
  /** Indica se é evento all-day */
  isAllDay?: boolean
  /** Indica se é evento multi-day (locações/orçamentos) */
  isMultiDay?: boolean
  /** Nome do cliente (para hierarquia) */
  clientName?: string
  /** Nome do equipamento (para hierarquia) */
  equipmentName?: string
  /** Nome do técnico */
  technicianName?: string
  /** Checklist de manutenção */
  checklist?: string[]
}

export interface CalendarResource {
  id: string
  name: string
}
