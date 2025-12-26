'use client'

import { useCartStore } from '@/stores/useCartStore'
import { NotificationType, NotificationPriority } from '@prisma/client'

export function useCartNotifications() {
  const { items, getItemCount, getTotalPrice } = useCartStore()

  const itemCount = getItemCount()
  const totalPrice = getTotalPrice()

  // Nota: Notificações de carrinho abandonado devem ser criadas via API/server-side
  // usando NotificationService. Este hook apenas fornece dados do carrinho.

  return {
    itemCount,
    totalPrice,
    hasItems: items.length > 0,
    items,
  }
}

// Helper para notificação de carrinho abandonado
// Nota: Use NotificationService no server-side para criar notificações
export const cartNotificationHelpers = {
  cartAbandoned: (itemsCount: number) => ({
    type: NotificationType.EQUIPMENT_AVAILABLE,
    title: 'Carrinho Abandonado',
    message: `Você tem ${itemsCount} item${itemsCount > 1 ? 's' : ''} aguardando no seu carrinho. Finalize sua compra!`,
    priority: NotificationPriority.MEDIUM,
    actionUrl: '/orcamento',
  }),
}
