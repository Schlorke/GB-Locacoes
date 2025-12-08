import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { sanitizeCartItemPricing } from '@/lib/pricing'

export interface CartItem {
  equipmentId: string
  equipmentName: string
  pricePerDay: number
  quantity: number
  days: number
  selectedPeriod?: {
    id: string
    label: string
    period: string
    multiplier: number
    discount: number
    popular?: boolean
  }
  finalPrice?: number
  maxStock?: number
  description?: string
  category?: { name: string }
  images?: string[]
  // Datas de locação
  startDate?: Date
  endDate?: Date
  // Indica se finais de semana estão incluídos na contagem de dias
  includeWeekends?: boolean
  // Descontos percentuais
  dailyDiscount?: number
  weeklyDiscount?: number
  biweeklyDiscount?: number
  monthlyDiscount?: number
  // Valores diretos
  dailyDirectValue?: number
  weeklyDirectValue?: number
  biweeklyDirectValue?: number
  monthlyDirectValue?: number
  // Flags de uso de valor direto
  dailyUseDirectValue?: boolean
  weeklyUseDirectValue?: boolean
  biweeklyUseDirectValue?: boolean
  monthlyUseDirectValue?: boolean
}

interface CartState {
  items: CartItem[]
  addItem: (_item: CartItem) => void
  removeItem: (_equipmentId: string) => void
  updateItemQuantity: (_equipmentId: string, _quantity: number) => void
  updateItemDays: (_equipmentId: string, _days: number) => void
  hydrateItems: (_items: CartItem[]) => void
  clearCart: () => void
  getItemCount: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const safeItem = sanitizeCartItemPricing(item)
          const existingItemIndex = state.items.findIndex(
            (i) => i.equipmentId === safeItem.equipmentId
          )

          if (existingItemIndex >= 0) {
            // Se item já existe, atualiza com os novos dados
            const updatedItems = [...state.items]
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              ...safeItem,
              quantity: safeItem.quantity, // Substitui a quantidade pela nova
            }
            return { items: updatedItems }
          } else {
            // Adiciona novo item
            return { items: [...state.items, safeItem] }
          }
        }),

      removeItem: (equipmentId) =>
        set((state) => ({
          items: state.items.filter((i) => i.equipmentId !== equipmentId),
        })),

      updateItemQuantity: (equipmentId, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.equipmentId === equipmentId ? { ...i, quantity } : i
          ),
        })),

      updateItemDays: (equipmentId, days) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.equipmentId === equipmentId ? { ...i, days } : i
          ),
        })),

      hydrateItems: (items) =>
        set({
          items: items.map((item) => sanitizeCartItemPricing(item)),
        }),

      clearCart: () => set({ items: [] }),

      getItemCount: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          const itemTotal =
            (item.finalPrice || item.pricePerDay * item.days) * item.quantity
          return total + itemTotal
        }, 0)
      },
    }),
    {
      name: 'gb-locacoes-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
