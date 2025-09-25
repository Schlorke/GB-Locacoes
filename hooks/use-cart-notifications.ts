'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/stores/useCartStore'
import { useNotifications } from './use-notifications'

export function useCartNotifications() {
  const { items, getItemCount, getTotalPrice } = useCartStore()
  const { addNotification } = useNotifications()

  const itemCount = getItemCount()
  const totalPrice = getTotalPrice()

  // Notificar quando item é adicionado ao carrinho
  useEffect(() => {
    if (items.length === 0) return

    const lastItem = items[items.length - 1]
    if (!lastItem) return

    // Verificar se é um item novo (não uma atualização)
    const isNewItem =
      items.filter((item) => item.equipmentId === lastItem.equipmentId)
        .length === 1

    if (isNewItem) {
      addNotification({
        type: 'equipment',
        title: 'Item Adicionado ao Carrinho',
        message: `${lastItem.equipmentName} foi adicionado ao seu carrinho. Total: ${itemCount} item${itemCount > 1 ? 's' : ''}`,
        priority: 'low',
        actionUrl: '/orcamento',
      })
    }
  }, [items, addNotification, itemCount])

  // Notificar quando carrinho fica vazio
  useEffect(() => {
    if (items.length === 0 && itemCount === 0) {
      // Só notifica se o carrinho estava com itens antes
      // Isso evita notificação no carregamento inicial
      const wasEmpty =
        localStorage.getItem('gb-locacoes-cart-was-empty') === 'true'
      if (!wasEmpty) {
        addNotification({
          type: 'equipment',
          title: 'Carrinho Esvaziado',
          message: 'Todos os itens foram removidos do seu carrinho.',
          priority: 'low',
          actionUrl: '/equipamentos',
        })
      }
    } else {
      localStorage.setItem('gb-locacoes-cart-was-empty', 'false')
    }
  }, [items, itemCount, addNotification])

  return {
    itemCount,
    totalPrice,
    hasItems: items.length > 0,
    items,
  }
}

// Extensão dos helpers de notificação para incluir notificações do carrinho
export const cartNotificationHelpers = {
  equipmentAddedToCart: (equipmentName: string, totalItems: number) => ({
    type: 'equipment' as const,
    title: 'Item Adicionado ao Carrinho',
    message: `${equipmentName} foi adicionado ao seu carrinho. Total: ${totalItems} item${totalItems > 1 ? 's' : ''}`,
    priority: 'low' as const,
    actionUrl: '/orcamento',
  }),

  cartEmptied: () => ({
    type: 'equipment' as const,
    title: 'Carrinho Esvaziado',
    message: 'Todos os itens foram removidos do seu carrinho.',
    priority: 'low' as const,
    actionUrl: '/equipamentos',
  }),

  cartAbandoned: (itemsCount: number) => ({
    type: 'equipment' as const,
    title: 'Carrinho Abandonado',
    message: `Você tem ${itemsCount} item${itemsCount > 1 ? 's' : ''} aguardando no seu carrinho. Finalize sua compra!`,
    priority: 'medium' as const,
    actionUrl: '/orcamento',
  }),

  priceChanged: (
    equipmentName: string,
    oldPrice: number,
    newPrice: number
  ) => ({
    type: 'equipment' as const,
    title: 'Preço Atualizado',
    message: `O preço de ${equipmentName} mudou de R$ ${oldPrice.toFixed(2)} para R$ ${newPrice.toFixed(2)}`,
    priority: 'medium' as const,
    actionUrl: '/orcamento',
  }),

  stockLow: (equipmentName: string, remainingStock: number) => ({
    type: 'equipment' as const,
    title: 'Estoque Baixo',
    message: `Apenas ${remainingStock} unidade${remainingStock > 1 ? 's' : ''} de ${equipmentName} restante${remainingStock > 1 ? 's' : ''}!`,
    priority: 'high' as const,
    actionUrl: '/orcamento',
  }),
}
