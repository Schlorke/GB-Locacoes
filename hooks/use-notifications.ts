'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSession } from 'next-auth/react'

export interface Notification {
  id: string
  type:
    | 'quote'
    | 'order'
    | 'payment'
    | 'equipment'
    | 'system'
    | 'rental'
    | 'delivery'
    | 'contract'
  title: string
  message: string
  isRead: boolean
  createdAt: Date
  actionUrl?: string
  priority: 'low' | 'medium' | 'high'
  readAt?: Date | null
  metadata?: Record<string, unknown>
}

export interface NotificationStats {
  total: number
  unread: number
  byType: Record<string, number>
}

interface ApiNotification {
  id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  actionUrl?: string
  priority: string
  readAt?: string | null
  metadata?: Record<string, unknown>
}

interface NotificationsResponse {
  notifications: ApiNotification[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  stats: {
    total: number
    unread: number
    byType: Record<string, number>
  }
}

// Chave para contador local (mantém compatibilidade com header/layout)
const UNREAD_COUNT_KEY = 'gb-locacoes-unread-count'

// Função para disparar evento de atualização (usado pelo header/layout)
function dispatchNotificationUpdate(unreadCount: number) {
  localStorage.setItem(UNREAD_COUNT_KEY, unreadCount.toString())
  const event = new CustomEvent('notificationUpdate', {
    detail: { unreadCount },
  })
  window.dispatchEvent(event)
}

export function useNotifications() {
  const { data: session, status } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [stats, setStats] = useState<NotificationStats>({
    total: 0,
    unread: 0,
    byType: {},
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchedRef = useRef(false)

  // Converter notificação da API para o formato do hook
  const mapApiNotification = useCallback(
    (apiNotif: ApiNotification): Notification => ({
      id: apiNotif.id,
      type: apiNotif.type.toLowerCase() as Notification['type'],
      title: apiNotif.title,
      message: apiNotif.message,
      isRead: apiNotif.isRead,
      createdAt: new Date(apiNotif.createdAt),
      actionUrl: apiNotif.actionUrl,
      priority: apiNotif.priority.toLowerCase() as Notification['priority'],
      readAt: apiNotif.readAt ? new Date(apiNotif.readAt) : null,
      metadata: apiNotif.metadata,
    }),
    []
  )

  // Carregar notificações da API
  const fetchNotifications = useCallback(async () => {
    if (status !== 'authenticated' || !session?.user?.id) {
      setIsLoading(false)
      return
    }

    try {
      setError(null)
      const response = await fetch('/api/client/notifications?limit=50')

      if (!response.ok) {
        throw new Error('Erro ao carregar notificações')
      }

      const data: NotificationsResponse = await response.json()

      const mappedNotifications = data.notifications.map(mapApiNotification)
      setNotifications(mappedNotifications)
      setStats(data.stats)
    } catch (err) {
      console.error('[useNotifications] Erro ao carregar:', err)
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id, status, mapApiNotification])

  // Carregar notificações quando sessão estiver disponível
  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      setIsLoading(false)
      return
    }

    // Evitar múltiplas requisições
    if (fetchedRef.current) return
    fetchedRef.current = true

    fetchNotifications()
  }, [status, fetchNotifications])

  // Marcar notificação como lida
  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const response = await fetch(
        `/api/client/notifications/${notificationId}`,
        {
          method: 'PATCH',
        }
      )

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: 'Erro desconhecido' }))
        throw new Error(
          errorData.error || `Erro ${response.status}: ${response.statusText}`
        )
      }

      await response.json()

      setNotifications((prev) => {
        const updated = prev.map((n) =>
          n.id === notificationId
            ? { ...n, isRead: true, readAt: new Date() }
            : n
        )
        return updated
      })

      setStats((prev) => {
        const newUnread = Math.max(0, prev.unread - 1)
        return { ...prev, unread: newUnread }
      })
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao marcar como lida'
      console.error('[useNotifications] Erro ao marcar como lida:', err)
      setError(errorMessage)
      // Não re-throw para evitar quebrar a UI, apenas logar o erro
    }
  }, [])

  // Marcar todas como lidas
  const markAllAsRead = useCallback(async () => {
    try {
      const response = await fetch('/api/client/notifications/mark-all-read', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Erro ao marcar todas como lidas')
      }

      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isRead: true, readAt: new Date() }))
      )

      setStats((prev) => {
        return { ...prev, unread: 0, byType: {} }
      })
    } catch (err) {
      console.error('[useNotifications] Erro ao marcar todas como lidas:', err)
    }
  }, [])

  // Remover notificação
  const removeNotification = useCallback(async (notificationId: string) => {
    try {
      const response = await fetch(
        `/api/client/notifications/${notificationId}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao remover notificação')
      }

      setNotifications((prev) => {
        const notification = prev.find((n) => n.id === notificationId)
        const updated = prev.filter((n) => n.id !== notificationId)

        if (notification && !notification.isRead) {
          setStats((prevStats) => {
            const newUnread = Math.max(0, prevStats.unread - 1)
            return {
              ...prevStats,
              unread: newUnread,
              total: prevStats.total - 1,
            }
          })
        } else {
          setStats((prevStats) => ({
            ...prevStats,
            total: prevStats.total - 1,
          }))
        }

        return updated
      })
    } catch (err) {
      console.error('[useNotifications] Erro ao remover:', err)
    }
  }, [])

  // Limpar todas as notificações (não implementado na API, mas mantém interface)
  const clearAll = useCallback(() => {
    // Para limpar todas, precisaria deletar uma a uma ou criar endpoint específico
    // Por ora, apenas limpa localmente
    setNotifications([])
    setStats({ total: 0, unread: 0, byType: {} })
  }, [])

  // Recarregar notificações
  const refresh = useCallback(() => {
    fetchedRef.current = false
    setIsLoading(true)
    fetchNotifications()
  }, [fetchNotifications])

  // Sincronizar contador global quando stats.unread mudar (após render)
  useEffect(() => {
    dispatchNotificationUpdate(stats.unread)
  }, [stats.unread])

  // Notificações não lidas
  const unreadNotifications = notifications.filter((n) => !n.isRead)

  // Notificações por prioridade
  const highPriorityNotifications = notifications.filter(
    (n) => n.priority === 'high' && !n.isRead
  )

  return {
    notifications,
    unreadNotifications,
    highPriorityNotifications,
    stats,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    refresh,
  }
}

// Funções utilitárias para criar notificações específicas (mantido para compatibilidade)
export const createNotificationHelpers = (
  _addNotification: (
    _notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>
  ) => string
) => ({
  // Nota: Essas funções são para uso legado com localStorage
  // Para criar notificações reais, use lib/notification-service.ts no servidor
  newQuote: (_equipmentName: string, _quoteId: string) => {
    console.warn(
      '[createNotificationHelpers] Use lib/notification-service.ts no servidor'
    )
    return ''
  },
  quoteApproved: (_equipmentName: string, _quoteId: string) => {
    console.warn(
      '[createNotificationHelpers] Use lib/notification-service.ts no servidor'
    )
    return ''
  },
  quoteRejected: (_equipmentName: string, _reason?: string) => {
    console.warn(
      '[createNotificationHelpers] Use lib/notification-service.ts no servidor'
    )
    return ''
  },
  newOrder: (_orderNumber: string) => {
    console.warn(
      '[createNotificationHelpers] Use lib/notification-service.ts no servidor'
    )
    return ''
  },
  orderStatusUpdate: (_orderNumber: string, _status: string) => {
    console.warn(
      '[createNotificationHelpers] Use lib/notification-service.ts no servidor'
    )
    return ''
  },
  paymentReceived: (_amount: number, _orderNumber: string) => {
    console.warn(
      '[createNotificationHelpers] Use lib/notification-service.ts no servidor'
    )
    return ''
  },
  equipmentAvailable: (_equipmentName: string) => {
    console.warn(
      '[createNotificationHelpers] Use lib/notification-service.ts no servidor'
    )
    return ''
  },
  systemMaintenance: (_message: string) => {
    console.warn(
      '[createNotificationHelpers] Use lib/notification-service.ts no servidor'
    )
    return ''
  },
  promotion: (_title: string, _message: string, _actionUrl?: string) => {
    console.warn(
      '[createNotificationHelpers] Use lib/notification-service.ts no servidor'
    )
    return ''
  },
})
