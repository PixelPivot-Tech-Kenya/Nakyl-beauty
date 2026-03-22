"use client"

import Image from "next/image"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/app/store/cartStore"

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const total = getTotalPrice()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeCart}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 100,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100dvh",
          width: "100%",
          maxWidth: 420,
          background: "var(--surface)",
          borderLeft: "1px solid var(--border)",
          zIndex: 101,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 28px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingBag size={18} strokeWidth={1.5} style={{ color: "var(--burgundy)" }} />
            <span
              style={{
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                fontSize: "1.3rem",
                fontWeight: 300,
                color: "var(--foreground)",
                letterSpacing: "0.04em",
              }}
            >
              Your Bag
            </span>
            {items.length > 0 && (
              <span
                style={{
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "var(--text-light)",
                }}
              >
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{ color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none", padding: 4 }}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
          {items.length === 0 ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                paddingTop: 80,
                textAlign: "center",
              }}
            >
              <ShoppingBag size={40} strokeWidth={1} style={{ color: "var(--border)" }} />
              <p
                style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  fontWeight: 300,
                  color: "var(--text-muted)",
                  letterSpacing: "0.02em",
                }}
              >
                Your bag is empty
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.75rem",
                  color: "var(--text-light)",
                  lineHeight: 1.6,
                }}
              >
                Add products to begin your ritual.
              </p>
              <button
                onClick={closeCart}
                style={{
                  marginTop: 8,
                  background: "var(--burgundy)",
                  color: "#fff",
                  border: "none",
                  padding: "12px 28px",
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {/* Product image */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 8,
                    background: product.image_bg ?? "#F7D6E0",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-sans), 'Jost', sans-serif",
                      fontSize: "0.58rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--text-taupe)",
                    }}
                  >
                    {product.category}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      fontWeight: 400,
                      color: "var(--foreground)",
                      lineHeight: 1.2,
                    }}
                  >
                    {product.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans), 'Jost', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      color: "var(--burgundy)",
                    }}
                  >
                    KES {(product.price * quantity).toLocaleString()}
                  </p>

                  {/* Quantity controls + remove */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid var(--border)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        style={{ padding: "4px 10px", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        style={{
                          padding: "4px 12px",
                          fontFamily: "var(--font-sans), 'Jost', sans-serif",
                          fontSize: "0.75rem",
                          color: "var(--foreground)",
                          borderLeft: "1px solid var(--border)",
                          borderRight: "1px solid var(--border)",
                        }}
                      >
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        style={{ padding: "4px 10px", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(product.id)}
                      style={{
                        background: "none",
                        border: "none",
                        fontFamily: "var(--font-sans), 'Jost', sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--text-light)",
                        cursor: "pointer",
                        textDecoration: "underline",
                        textUnderlineOffset: 3,
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 28px 28px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Subtotal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontSize: "1.3rem",
                  fontWeight: 400,
                  color: "var(--foreground)",
                  letterSpacing: "0.02em",
                }}
              >
                KES {total.toLocaleString()}
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.65rem",
                color: "var(--text-light)",
                lineHeight: 1.6,
              }}
            >
              Shipping and taxes calculated at checkout.
            </p>

            {/* Checkout button */}
            <a
              href="/checkout"
              onClick={closeCart}
              style={{
                display: "block",
                textAlign: "center",
                background: "var(--burgundy)",
                color: "#fff",
                padding: "16px",
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--burgundy-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--burgundy)")}
            >
              Proceed to Checkout
            </a>

            {/* Continue shopping */}
            <button
              onClick={closeCart}
              style={{
                background: "none",
                border: "none",
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
