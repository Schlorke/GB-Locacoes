'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { NotificationType, NotificationPriority } from '@prisma/client'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  isRead: boolean
  createdAt: Date
  readAt?: Date | null
  actionUrl?: string | null
  priority: NotificationPriority
  metadata?: Record<string, unknown> | null
  expiresAt?: Date | null
}

export interface NotificationStats {
  total: number
  unread: number
  byType: Record<string, number>
  byPriority: Record<string, number>
}

interface NotificationFromAPI {
  id: string
  type: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
  readAt?: string | null
  expiresAt?: string | null
  actionUrl?: string | null
  priority: string
  metadata?: Record<string, unknown> | null
}

const NOTIFICATIONS_STORAGE_KEY = 'gb-locacoes-notifications-cache'

export function useNotifications() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<NotificationStats>({
    total: 0,
    unread: 0,
    byType: {},
    byPriority: {},
  })

  // Carregar notificações da API
  const fetchNotifications = useCallback(async () => {
    if (!session?.user) {
      setIsLoading(false)
      return
    }

    try {
      const [notificationsRes, statsRes] = await Promise.all([
        fetch('/api/client/notifications?limit=50'),
        fetch('/api/client/notifications/stats'),
      ])

      if (!notificationsRes.ok) {
        const errorData = await notificationsRes.json().catch(() => ({}))
        throw new Error(
          errorData.error ||
            `Failed to fetch notifications: ${notificationsRes.status}`
        )
      }

      if (!statsRes.ok) {
        const errorData = await statsRes.json().catch(() => ({}))
        throw new Error(
          errorData.error || `Failed to fetch stats: ${statsRes.status}`
        )
      }

      const notificationsData = await notificationsRes.json()
      const statsData = await statsRes.json()

      const formattedNotifications: Notification[] =
        notificationsData.notifications.map((n: NotificationFromAPI) => ({
          ...n,
          createdAt: new Date(n.createdAt),
          readAt: n.readAt ? new Date(n.readAt) : null,
          expiresAt: n.expiresAt ? new Date(n.expiresAt) : null,
        }))

      setNotifications(formattedNotifications)
      setStats(statsData)

      // Cache no localStorage para performance
      if (session.user.email) {
        try {
          localStorage.setItem(
            `${NOTIFICATIONS_STORAGE_KEY}-${session.user.email}`,
            JSON.stringify({
              notifications: formattedNotifications,
              stats: statsData,
              timestamp: Date.now(),
            })
          )
        } catch (_error) {
          // Ignorar erros de localStorage
        }
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error)

      // Log detalhado do erro para debug
      if (error instanceof Error) {
        console.error('Erro detalhado:', {
          message: error.message,
          stack: error.stack,
        })
      }

      // Fallback para cache se API falhar
      if (session?.user?.email) {
        try {
          const cached = localStorage.getItem(
            `${NOTIFICATIONS_STORAGE_KEY}-${session.user.email}`
          )
          if (cached) {
            const parsed = JSON.parse(cached)
            if (parsed.timestamp && Date.now() - parsed.timestamp < 60000) {
              // Cache válido por 1 minuto
              setNotifications(
                parsed.notifications.map((n: NotificationFromAPI) => ({
                  ...n,
                  createdAt: new Date(n.createdAt),
                  readAt: n.readAt ? new Date(n.readAt) : null,
                  expiresAt: n.expiresAt ? new Date(n.expiresAt) : null,
                }))
              )
              setStats(parsed.stats)
            }
          }
        } catch (_cacheError) {
          // Ignorar erros de cache
        }
      }

      // Se não há cache, definir arrays vazios para evitar erro de renderização
      setNotifications([])
      setStats({
        total: 0,
        unread: 0,
        byType: {},
        byPriority: {},
      })
    } finally {
      setIsLoading(false)
    }
  }, [session?.user])

  // Carregar notificações ao montar e quando sessão mudar
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // Marcar notificação como lida
  const markAsRead = useCallback(
    async (notificationId: string) => {
      // Otimista: atualizar UI imediatamente
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId
            ? { ...n, isRead: true, readAt: new Date() }
            : n
        )
      )

      try {
        const res = await fetch(
          `/api/client/notifications/${notificationId}/read`,
          {
            method: 'PATCH',
          }
        )

        if (!res.ok) {
          throw new Error('Failed to mark notification as read')
        }

        // Atualizar stats
        await fetchNotifications()
      } catch (error) {
        console.error('Erro ao marcar notificação como lida:', error)
        // Reverter otimista
        fetchNotifications()
      }
    },
    [fetchNotifications]
  )

  // Marcar todas como lidas
  const markAllAsRead = useCallback(async () => {
    // Otimista
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true, readAt: new Date() }))
    )

    try {
      const res = await fetch('/api/client/notifications/read-all', {
        method: 'PATCH',
      })

      if (!res.ok) {
        throw new Error('Failed to mark all notifications as read')
      }

      await fetchNotifications()
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error)
      fetchNotifications()
    }
  }, [fetchNotifications])

  // Remover notificação
  const removeNotification = useCallback(
    async (notificationId: string) => {
      // Otimista
      const removed = notifications.find((n) => n.id === notificationId)
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId))

      try {
        const res = await fetch(`/api/client/notifications/${notificationId}`, {
          method: 'DELETE',
        })

        if (!res.ok) {
          throw new Error('Failed to delete notification')
        }

        await fetchNotifications()
      } catch (error) {
        console.error('Erro ao remover notificação:', error)
        // Reverter otimista
        if (removed) {
          setNotifications((prev) => [...prev, removed])
        }
        fetchNotifications()
      }
    },
    [notifications, fetchNotifications]
  )

  // Limpar todas as notificações lidas
  const clearAll = useCallback(async () => {
    try {
      const res = await fetch('/api/client/notifications/delete-read', {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to clear notifications')
      }

      await fetchNotifications()
    } catch (error) {
      console.error('Erro ao limpar notificações:', error)
    }
  }, [fetchNotifications])

  // Notificações não lidas
  const unreadNotifications = notifications.filter((n) => !n.isRead)

  // Notificações por prioridade
  const highPriorityNotifications = notifications.filter(
    (n) => (n.priority === 'HIGH' || n.priority === 'URGENT') && !n.isRead
  )

  return {
    notifications,
    unreadNotifications,
    highPriorityNotifications,
    stats,
    isLoading,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    refresh: fetchNotifications,
  }
}

// Funções utilitárias para criar notificações específicas
export const createNotificationHelpers = (
  addNotification: (
    _notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>
  ) => string
) => ({
  // Notificação de novo orçamento
  newQuote: (equipmentName: string, quoteId: string) =>
    addNotification({
      type: NotificationType.QUOTE_CREATED,
      title: 'Novo Orçamento Criado',
      message: `Seu orçamento para ${equipmentName} foi criado com sucesso!`,
      priority: NotificationPriority.MEDIUM,
      actionUrl: `/area-cliente/orcamentos/${quoteId}`,
    }),

  // Notificação de orçamento aprovado
  quoteApproved: (equipmentName: string, quoteId: string) =>
    addNotification({
      type: NotificationType.QUOTE_APPROVED,
      title: 'Orçamento Aprovado!',
      message: `Seu orçamento para ${equipmentName} foi aprovado e está pronto para locação.`,
      priority: NotificationPriority.HIGH,
      actionUrl: `/area-cliente/orcamentos/${quoteId}`,
    }),

  // Notificação de orçamento rejeitado
  quoteRejected: (equipmentName: string, reason?: string) =>
    addNotification({
      type: NotificationType.QUOTE_REJECTED,
      title: 'Orçamento Rejeitado',
      message: `Seu orçamento para ${equipmentName} foi rejeitado.${reason ? ` Motivo: ${reason}` : ''}`,
      priority: NotificationPriority.MEDIUM,
      actionUrl: '/area-cliente/orcamentos',
    }),

  // Notificação de novo pedido
  newOrder: (orderNumber: string) =>
    addNotification({
      type: NotificationType.RENTAL_CREATED,
      title: 'Pedido Confirmado',
      message: `Seu pedido #${orderNumber} foi confirmado e está sendo processado.`,
      priority: NotificationPriority.HIGH,
      actionUrl: `/area-cliente/pedidos/${orderNumber}`,
    }),

  // Notificação de status do pedido
  orderStatusUpdate: (orderNumber: string, status: string) =>
    addNotification({
      type: NotificationType.RENTAL_ACTIVE,
      title: 'Status do Pedido Atualizado',
      message: `Seu pedido #${orderNumber} agora está: ${status}`,
      priority: NotificationPriority.MEDIUM,
      actionUrl: `/area-cliente/pedidos/${orderNumber}`,
    }),

  // Notificação de pagamento
  paymentReceived: (amount: number, orderNumber: string) =>
    addNotification({
      type: NotificationType.PAYMENT_RECEIVED,
      title: 'Pagamento Confirmado',
      message: `Pagamento de R$ ${amount.toFixed(2)} confirmado para o pedido #${orderNumber}.`,
      priority: NotificationPriority.HIGH,
      actionUrl: `/area-cliente/pedidos/${orderNumber}`,
    }),

  // Notificação de equipamento disponível
  equipmentAvailable: (equipmentName: string) =>
    addNotification({
      type: NotificationType.EQUIPMENT_AVAILABLE,
      title: 'Equipamento Disponível',
      message: `${equipmentName} está disponível para locação!`,
      priority: NotificationPriority.MEDIUM,
      actionUrl: '/equipamentos',
    }),

  // Notificação de sistema
  systemMaintenance: (message: string) =>
    addNotification({
      type: NotificationType.PROMOTION,
      title: 'Manutenção do Sistema',
      message,
      priority: NotificationPriority.LOW,
      actionUrl: '/sobre',
    }),

  // Notificação de promoção
  promotion: (title: string, message: string, actionUrl?: string) =>
    addNotification({
      type: NotificationType.PROMOTION,
      title,
      message,
      priority: NotificationPriority.MEDIUM,
      actionUrl,
    }),
})
