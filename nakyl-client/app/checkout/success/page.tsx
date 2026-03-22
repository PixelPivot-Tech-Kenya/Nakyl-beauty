"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useCartStore } from "@/app/store/cartStore"

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div style={{
      minHeight: "100dvh",
      background: "var(--background)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
    }}>
      <div style={{
        textAlign: "center",
        maxWidth: 480,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}>
        {/* Gold check circle */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: "1.5px solid var(--gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "block", width: 28, height: 1, background: "var(--gold)", opacity: 0.6 }} />
          <span style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--text-taupe)",
          }}>
            Order Confirmed
          </span>
          <span style={{ display: "block", width: 28, height: 1, background: "var(--gold)", opacity: 0.6 }} />
        </div>

        <h1 style={{
          fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "2.8rem",
          color: "var(--foreground)",
          letterSpacing: "0.04em",
          lineHeight: 1.1,
        }}>
          Your ritual is on its way.
        </h1>

        <p style={{
          fontFamily: "var(--font-sans), 'Jost', sans-serif",
          fontSize: "0.82rem",
          lineHeight: 1.8,
          color: "var(--text-muted)",
          maxWidth: 380,
        }}>
          Thank you for your order. You will receive a confirmation email shortly. We are preparing your products with care.
        </p>

        {/* Thin divider */}
        <span style={{ display: "block", width: 48, height: 1, background: "var(--gold)", opacity: 0.4 }} />

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/shop"
            style={{
              background: "var(--burgundy)",
              color: "#fff",
              padding: "14px 32px",
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            style={{
              background: "transparent",
              color: "var(--foreground)",
              padding: "14px 32px",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
