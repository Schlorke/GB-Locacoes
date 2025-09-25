'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

export interface Notification {
  id: string
  type: 'quote' | 'order' | 'payment' | 'equipment' | 'system'
  title: string
  message: string
  isRead: boolean
  createdAt: Date
  actionUrl?: string
  priority: 'low' | 'medium' | 'high'
}

export interface NotificationStats {
  total: number
  unread: number
  byType: {
    quote: number
    order: number
    payment: number
    equipment: number
    system: number
  }
}

const NOTIFICATIONS_STORAGE_KEY = 'gb-locacoes-notifications'

export function useNotifications() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carregar notificações do localStorage
  useEffect(() => {
    if (!session?.user?.email) return

    try {
      const stored = localStorage.getItem(`${NOTIFICATIONS_STORAGE_KEY}-${session.user.email}`)
      if (stored) {
        const parsed = JSON.parse(stored)
        setNotifications(parsed.map((n: any) => ({
          ...n,
          createdAt: new Date(n.createdAt)
        })))
      }
    } catch (error) {
      console.error('Erro ao carregar notificações:', error)
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.email])

  // Salvar notificações no localStorage
  const saveNotifications = useCallback((newNotifications: Notification[]) => {
    if (!session?.user?.email) return

    try {
      localStorage.setItem(
        `${NOTIFICATIONS_STORAGE_KEY}-${session.user.email}`,
        JSON.stringify(newNotifications)
      )
    } catch (error) {
      console.error('Erro ao salvar notificações:', error)
    }
  }, [session?.user?.email])

  // Adicionar nova notificação
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      isRead: false
    }

    setNotifications(prev => {
      const updated = [newNotification, ...prev].slice(0, 50) // Manter apenas as 50 mais recentes
      saveNotifications(updated)
      return updated
    })

    return newNotification.id
  }, [saveNotifications])

  // Marcar notificação como lida
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
      saveNotifications(updated)
      return updated
    })
  }, [saveNotifications])

  // Marcar todas como lidas
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, isRead: true }))
      saveNotifications(updated)
      return updated
    })
  }, [saveNotifications])

  // Remover notificação
  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== notificationId)
      saveNotifications(updated)
      return updated
    })
  }, [saveNotifications])

  // Limpar todas as notificações
  const clearAll = useCallback(() => {
    setNotifications([])
    if (session?.user?.email) {
      localStorage.removeItem(`${NOTIFICATIONS_STORAGE_KEY}-${session.user.email}`)
    }
  }, [session?.user?.email])

  // Estatísticas das notificações
  const stats: NotificationStats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.isRead).length,
    byType: {
      quote: notifications.filter(n => n.type === 'quote' && !n.isRead).length,
      order: notifications.filter(n => n.type === 'order' && !n.isRead).length,
      payment: notifications.filter(n => n.type === 'payment' && !n.isRead).length,
      equipment: notifications.filter(n => n.type === 'equipment' && !n.isRead).length,
      system: notifications.filter(n => n.type === 'system' && !n.isRead).length
    }
  }

  // Notificações não lidas
  const unreadNotifications = notifications.filter(n => !n.isRead)

  // Notificações por prioridade
  const highPriorityNotifications = notifications.filter(n => n.priority === 'high' && !n.isRead)

  return {
    notifications,
    unreadNotifications,
    highPriorityNotifications,
    stats,
    isLoading,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  }
}

// Funções utilitárias para criar notificações específicas
export const createNotificationHelpers = (addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => string) => ({
  // Notificação de novo orçamento
  newQuote: (equipmentName: string, quoteId: string) => addNotification({
    type: 'quote',
    title: 'Novo Orçamento Criado',
    message: `Seu orçamento para ${equipmentName} foi criado com sucesso!`,
    priority: 'medium',
    actionUrl: `/area-cliente/orcamentos/${quoteId}`
  }),

  // Notificação de orçamento aprovado
  quoteApproved: (equipmentName: string, quoteId: string) => addNotification({
    type: 'quote',
    title: 'Orçamento Aprovado!',
    message: `Seu orçamento para ${equipmentName} foi aprovado e está pronto para locação.`,
    priority: 'high',
    actionUrl: `/area-cliente/orcamentos/${quoteId}`
  }),

  // Notificação de orçamento rejeitado
  quoteRejected: (equipmentName: string, reason?: string) => addNotification({
    type: 'quote',
    title: 'Orçamento Rejeitado',
    message: `Seu orçamento para ${equipmentName} foi rejeitado.${reason ? ` Motivo: ${reason}` : ''}`,
    priority: 'medium',
    actionUrl: '/area-cliente/orcamentos'
  }),

  // Notificação de novo pedido
  newOrder: (orderNumber: string) => addNotification({
    type: 'order',
    title: 'Pedido Confirmado',
    message: `Seu pedido #${orderNumber} foi confirmado e está sendo processado.`,
    priority: 'high',
    actionUrl: `/area-cliente/pedidos/${orderNumber}`
  }),

  // Notificação de status do pedido
  orderStatusUpdate: (orderNumber: string, status: string) => addNotification({
    type: 'order',
    title: 'Status do Pedido Atualizado',
    message: `Seu pedido #${orderNumber} agora está: ${status}`,
    priority: 'medium',
    actionUrl: `/area-cliente/pedidos/${orderNumber}`
  }),

  // Notificação de pagamento
  paymentReceived: (amount: number, orderNumber: string) => addNotification({
    type: 'payment',
    title: 'Pagamento Confirmado',
    message: `Pagamento de R$ ${amount.toFixed(2)} confirmado para o pedido #${orderNumber}.`,
    priority: 'high',
    actionUrl: `/area-cliente/pedidos/${orderNumber}`
  }),

  // Notificação de equipamento disponível
  equipmentAvailable: (equipmentName: string) => addNotification({
    type: 'equipment',
    title: 'Equipamento Disponível',
    message: `${equipmentName} está disponível para locação!`,
    priority: 'medium',
    actionUrl: '/equipamentos'
  }),

  // Notificação de sistema
  systemMaintenance: (message: string) => addNotification({
    type: 'system',
    title: 'Manutenção do Sistema',
    message,
    priority: 'low',
    actionUrl: '/sobre'
  }),

  // Notificação de promoção
  promotion: (title: string, message: string, actionUrl?: string) => addNotification({
    type: 'system',
    title,
    message,
    priority: 'medium',
    actionUrl
  })
})
