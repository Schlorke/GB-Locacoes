'use client'

import { useCartStore } from '@/stores/useCartStore'

export function useCartNotifications() {
  const { items, getItemCount, getTotalPrice } = useCartStore()

  const itemCount = getItemCount()
  const totalPrice = getTotalPrice()

  // Nota: Notificações de carrinho abandonado devem ser criadas no servidor
  // usando lib/notification-service.ts quando apropriado

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
