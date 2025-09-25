'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/stores/useCartStore'
import { useNotifications } from './use-notifications'

export function useCartNotifications() {
  const { items, getItemCount, getTotalPrice } = useCartStore()
  const { addNotification } = useNotifications()

  const itemCount = getItemCount()
  const totalPrice = getTotalPrice()

  // Notificar carrinho abandonado após 5 minutos de inatividade
  useEffect(() => {
    if (items.length === 0) return

    const timer = setTimeout(() => {
      addNotification({
        type: 'equipment',
        title: 'Carrinho Abandonado',
        message: `Você tem ${itemCount} item${itemCount > 1 ? 's' : ''} aguardando no seu carrinho. Finalize sua compra!`,
        priority: 'medium',
        actionUrl: '/orcamento',
      })
    }, 5 * 60 * 1000) // 5 minutos

    return () => clearTimeout(timer)
  }, [items, addNotification, itemCount])

  return {
    itemCount,
    totalPrice,
    hasItems: items.length > 0,
    items,
  }
}

// Helper para notificação de carrinho abandonado
export const cartNotificationHelpers = {
  cartAbandoned: (itemsCount: number) => ({
    type: 'equipment' as const,
    title: 'Carrinho Abandonado',
    message: `Você tem ${itemsCount} item${itemsCount > 1 ? 's' : ''} aguardando no seu carrinho. Finalize sua compra!`,
    priority: 'medium' as const,
    actionUrl: '/orcamento',
  }),
}
