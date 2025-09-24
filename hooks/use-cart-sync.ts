'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/stores/useCartStore'

export function useCartSync() {
  const { data: session, status } = useSession()
  const { items: localCartItems, clearCart, addItem } = useCartStore()

  useEffect(() => {
    const syncCart = async () => {
      // Só sincroniza se o usuário estiver logado e houver itens no carrinho local
      if (status === 'authenticated' && session?.user?.id && localCartItems.length > 0) {
        try {
          // Busca o carrinho do servidor
          const serverCartResponse = await fetch('/api/cart/sync')
          if (serverCartResponse.ok) {
            const serverCart = await serverCartResponse.json()
            
            // Se não há carrinho no servidor, cria um com os itens locais
            if (!serverCart || serverCart.items.length === 0) {
              await fetch('/api/cart/merge', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  items: localCartItems,
                }),
              })
            } else {
              // Se há carrinho no servidor, mescla com os itens locais
              await fetch('/api/cart/merge', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  items: localCartItems,
                }),
              })
              
              // Atualiza o carrinho local com os dados do servidor
              const updatedServerCartResponse = await fetch('/api/cart/sync')
              if (updatedServerCartResponse.ok) {
                const updatedServerCart = await updatedServerCartResponse.json()
                
                // Limpa o carrinho local e adiciona os itens do servidor
                clearCart()
                updatedServerCart.items.forEach((item: any) => {
                  addItem({
                    equipmentId: item.equipmentId,
                    equipmentName: item.equipment.name,
                    pricePerDay: Number(item.pricePerDay),
                    quantity: item.quantity,
                    days: item.days,
                    finalPrice: item.finalPrice ? Number(item.finalPrice) : undefined,
                    maxStock: item.equipment.maxStock,
                    description: item.equipment.description,
                    category: item.equipment.category,
                    images: item.equipment.images,
                  })
                })
              }
            }
          }
        } catch (error) {
          console.error('Erro ao sincronizar carrinho:', error)
        }
      }
    }

    // Sincroniza quando o usuário faz login
    if (status === 'authenticated') {
      syncCart()
    }
  }, [status, session?.user?.id, localCartItems.length, clearCart, addItem])

  return {
    isSyncing: status === 'loading',
  }
}
