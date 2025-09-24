import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  equipmentId: string;
  equipmentName: string;
  pricePerDay: number;
  quantity: number;
  days: number;
  selectedPeriod?: {
    id: string;
    label: string;
    period: string;
    multiplier: number;
    discount: number;
    popular?: boolean;
  };
  finalPrice?: number;
  maxStock?: number;
  description?: string;
  category?: { name: string };
  images?: string[];
  dailyDiscount?: number;
  weeklyDiscount?: number;
  biweeklyDiscount?: number;
  monthlyDiscount?: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (equipmentId: string) => void;
  updateItemQuantity: (equipmentId: string, quantity: number) => void;
  updateItemDays: (equipmentId: string, days: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) =>
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (i) => i.equipmentId === item.equipmentId
          );
          
          if (existingItemIndex >= 0) {
            // Se item já existe, atualiza com os novos dados
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              ...item,
              quantity: item.quantity, // Substitui a quantidade pela nova
            };
            return { items: updatedItems };
          } else {
            // Adiciona novo item
            return { items: [...state.items, item] };
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
        
      clearCart: () => set({ items: [] }),
      
      getItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const itemTotal = (item.finalPrice || item.pricePerDay * item.days) * item.quantity;
          return total + itemTotal;
        }, 0);
      },
    }),
    {
      name: 'gb-locacoes-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
