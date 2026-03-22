"use client"

import { User, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/app/store/cartStore"

export default function NavbarLogos() {
  const { getTotalItems, toggleCart } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <div className="flex items-center gap-4 select-none">
      <button
        aria-label="Account"
        className="text-text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
      >
        <User size={20} strokeWidth={1.5} />
      </button>

      <button
        aria-label="Cart"
        onClick={toggleCart}
        className="relative text-text-muted hover:text-primary transition-colors duration-200 cursor-pointer"
      >
        <ShoppingBag size={20} strokeWidth={1.5} />
        {totalItems > 0 && (
          <span
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              background: "var(--burgundy)",
              color: "#fff",
              fontSize: "0.5rem",
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              letterSpacing: "0.04em",
              width: 16,
              height: 16,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>
    </div>
  )
}
