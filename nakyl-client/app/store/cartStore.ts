import { create } from "zustand"
import { persist } from "zustand/middleware"

// ── Types ─────────────────────────────────────────────

export type CartProduct = {
  id: string
  name: string
  category: string
  price: number
  original_price?: number | null
  image_url: string
  image_bg?: string
  slug: string
}

export type CartItem = {
  product: CartProduct
  quantity: number
}

type CartStore = {
  // State
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (product: CartProduct) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void

  // Derived helpers
  getTotalItems: () => number
  getTotalPrice: () => number
}

// ── Store ─────────────────────────────────────────────

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // ── Initial State ──────────────────────────────
      items: [],
      isOpen: false,

      // ── Actions ────────────────────────────────────

      addItem: (product) => {
        const existing = get().items.find((i) => i.product.id === product.id)

        if (existing) {
          // Product already in cart — just bump the quantity
          set({
            items: get().items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          // New product — add it with quantity 1
          set({ items: [...get().items, { product, quantity: 1 }] })
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          // If quantity drops below 1, remove the item entirely
          get().removeItem(productId)
          return
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // ── Derived Helpers ────────────────────────────

      getTotalItems: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, i) => sum + i.product.price * i.quantity,
          0
        )
      },
    }),
    {
      name: "nakyl-cart", // key used in localStorage
      // Only persist the items array — not the drawer open/close state
      partialize: (state) => ({ items: state.items }),
    }
  )
)
