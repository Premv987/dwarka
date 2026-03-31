import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface StoreState {
  cart: CartItem[]
  isCartOpen: boolean
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  clearCart: () => void
  toggleCart: (isOpen?: boolean) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      isCartOpen: false,
      addToCart: (item) => set((state) => {
        const existing = state.cart.find((i) => i.id === item.id)
        if (existing) {
          return {
            cart: state.cart.map((i) => 
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            )
          }
        }
        return { cart: [...state.cart, item] }
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((i) => i.id !== id)
      })),
      updateQuantity: (id, delta) => set((state) => ({
        cart: state.cart.map((i) => {
          if (i.id === id) {
            const newQty = Math.max(1, i.quantity + delta)
            return { ...i, quantity: newQty }
          }
          return i
        })
      })),
      clearCart: () => set({ cart: [] }),
      toggleCart: (isOpen) => set((state) => ({ 
        isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen 
      })),
    }),
    {
      name: 'dwarka-cart-storage',
      partialize: (state) => ({ cart: state.cart }) // only persist cart
    }
  )
)
