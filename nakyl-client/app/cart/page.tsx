"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import TopBar from "@/app/components/ui/TopBar"
import Navbar from "@/app/components/ui/Navbar"
import { useCartStore } from "@/app/store/cartStore"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  const total = getTotalPrice()
  const shipping = total >= 3000 ? 0 : 350
  const grandTotal = total + shipping

  return (
    <div>
      <TopBar />
      <Navbar />

      {/* Page header */}
      <section className="px-4 py-10 sm:px-8 lg:px-16 lg:py-12" style={{ background: "var(--surface-muted)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ display: "block", width: 32, height: 1, background: "var(--gold)" }} />
          <span style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--text-taupe)",
          }}>
            Your Selection
          </span>
        </div>
        <h1 style={{
          fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "2.8rem",
          color: "var(--foreground)",
          letterSpacing: "0.03em",
          lineHeight: 1.1,
        }}>
          Your Bag
        </h1>
      </section>

      <section className="px-4 py-10 sm:px-8 lg:px-16 lg:py-16" style={{ background: "var(--background)" }}>

        {items.length === 0 ? (
          /* Empty state */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingTop: 80, paddingBottom: 80, textAlign: "center" }}>
            <ShoppingBag size={48} strokeWidth={1} style={{ color: "var(--border)" }} />
            <p style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontSize: "1.6rem",
              fontWeight: 300,
              color: "var(--text-muted)",
            }}>
              Your bag is empty
            </p>
            <p style={{
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.8rem",
              color: "var(--text-light)",
              lineHeight: 1.7,
            }}>
              You haven&apos;t added anything yet. Start your ritual.
            </p>
            <Link
              href="/shop"
              style={{
                marginTop: 12,
                display: "inline-block",
                background: "var(--burgundy)",
                color: "#fff",
                padding: "14px 36px",
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

            {/* Items list */}
            <div style={{ flex: 1 }}>

              {/* Column headers */}
              <div className="cart-headers">
                {["Product", "Price", "Quantity", "Total", ""].map((h) => (
                  <span key={h} style={{
                    fontFamily: "var(--font-sans), 'Jost', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--text-light)",
                  }}>
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-row">
                  {/* Product info */}
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      background: product.image_bg ?? "#F7D6E0",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Image src={product.image_url} alt={product.name} width={60} height={60} className="object-contain" />
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "var(--font-sans), 'Jost', sans-serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--text-taupe)",
                        marginBottom: 4,
                      }}>
                        {product.category}
                      </p>
                      <p style={{
                        fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                        color: "var(--foreground)",
                        lineHeight: 1.2,
                      }}>
                        {product.name}
                      </p>
                    </div>
                  </div>

                  {/* On mobile: price + qty + total + remove grouped */}
                  <div className="cart-row-meta">
                    {/* Unit price */}
                    <span style={{
                      fontFamily: "var(--font-sans), 'Jost', sans-serif",
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                    }}>
                      KES {product.price.toLocaleString()}
                    </span>

                    {/* Quantity controls */}
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      border: "1px solid var(--border)",
                      borderRadius: 2,
                    }}>
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{
                        padding: "6px 14px",
                        fontFamily: "var(--font-sans), 'Jost', sans-serif",
                        fontSize: "0.78rem",
                        color: "var(--foreground)",
                        borderLeft: "1px solid var(--border)",
                        borderRight: "1px solid var(--border)",
                      }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        style={{ padding: "6px 10px", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Line total */}
                    <span style={{
                      fontFamily: "var(--font-sans), 'Jost', sans-serif",
                      fontSize: "0.88rem",
                      fontWeight: 500,
                      color: "var(--burgundy)",
                    }}>
                      KES {(product.price * quantity).toLocaleString()}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(product.id)}
                      aria-label="Remove item"
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-light)", display: "flex", padding: 4 }}
                    >
                      <X size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={clearCart}
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "var(--font-sans), 'Jost', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--text-light)",
                    cursor: "pointer",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Clear Bag
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="w-full lg:w-80 lg:shrink-0" style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}>
              <h2 style={{
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "1.4rem",
                color: "var(--foreground)",
                letterSpacing: "0.04em",
                paddingBottom: 16,
                borderBottom: "1px solid var(--border)",
              }}>
                Order Summary
              </h2>

              {/* Subtotal */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.78rem", color: "var(--text-muted)" }}>Subtotal</span>
                <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.82rem", color: "var(--foreground)" }}>
                  KES {total.toLocaleString()}
                </span>
              </div>

              {/* Shipping */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.78rem", color: "var(--text-muted)" }}>Shipping</span>
                <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.82rem", color: shipping === 0 ? "green" : "var(--foreground)" }}>
                  {shipping === 0 ? "Free" : `KES ${shipping.toLocaleString()}`}
                </span>
              </div>

              {total < 3000 && (
                <p style={{
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.65rem",
                  color: "var(--text-taupe)",
                  lineHeight: 1.6,
                  background: "var(--surface-muted)",
                  padding: "10px 12px",
                }}>
                  Add KES {(3000 - total).toLocaleString()} more for free shipping.
                </p>
              )}

              {/* Divider */}
              <span style={{ display: "block", height: 1, background: "var(--border)" }} />

              {/* Grand total */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}>
                  Total
                </span>
                <span style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: "var(--foreground)",
                }}>
                  KES {grandTotal.toLocaleString()}
                </span>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
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
                  marginTop: 8,
                  transition: "background 0.2s",
                }}
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                style={{
                  display: "block",
                  textAlign: "center",
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
