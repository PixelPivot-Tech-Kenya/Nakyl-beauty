"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCartStore } from "@/app/store/cartStore"

type ShippingForm = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
}

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCartStore()
  const total = getTotalPrice()
  const shipping = total >= 3000 ? 0 : 350
  const grandTotal = total + shipping

  const [form, setForm] = useState<ShippingForm>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Kenya",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (items.length === 0) return

    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(({ product, quantity }) => ({
            id: product.id,
            name: product.name,
            image_url: product.image_url,
            price: product.price,
            quantity,
          })),
          shippingAddress: form,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.")
        setLoading(false)
        return
      }

      // Redirect to Stripe checkout
      window.location.href = data.url
    } catch {
      setError("Network error. Please check your connection and try again.")
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    padding: "12px 16px",
    border: "1px solid var(--border)",
    background: "var(--background)",
    fontFamily: "var(--font-sans), 'Jost', sans-serif",
    fontSize: "0.82rem",
    color: "var(--foreground)",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans), 'Jost', sans-serif",
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "100dvh", background: "var(--background)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
        <p style={{ fontFamily: "var(--font-display), 'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 300, color: "var(--text-muted)" }}>
          Your bag is empty.
        </p>
        <Link href="/shop" style={{ background: "var(--burgundy)", color: "#fff", padding: "12px 32px", fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none" }}>
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100dvh", background: "var(--background)" }}>

      {/* Top bar */}
      <div className="px-4 sm:px-10 lg:px-16" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ fontFamily: "var(--font-display), 'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 300, color: "var(--foreground)", textDecoration: "none", letterSpacing: "0.1em" }}>
          Nakyl
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {["Bag", "Shipping", "Payment"].map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <span className="checkout-step-connector" style={{ width: 24, height: 1, background: "var(--border)", display: "block" }} />}
              <span style={{
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: i === 1 ? "var(--burgundy)" : "var(--text-light)",
                fontWeight: i === 1 ? 500 : 300,
              }}>
                {step}
              </span>
            </div>
          ))}
        </div>
        <Link href="/cart" style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.62rem", letterSpacing: "0.12em", color: "var(--text-light)", textDecoration: "underline", textUnderlineOffset: 3 }}>
          ← Edit Bag
        </Link>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row" style={{ minHeight: "calc(100dvh - 65px)" }}>

        {/* Left — Shipping form */}
        <div className="flex-1 px-4 py-10 sm:px-8 md:px-16 md:py-14 md:border-r" style={{ borderColor: "var(--border)" }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ display: "block", width: 28, height: 1, background: "var(--gold)" }} />
                <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--text-taupe)" }}>
                  Delivery Details
                </span>
              </div>
              <h1 style={{ fontFamily: "var(--font-display), 'Cormorant Garamond', serif", fontWeight: 300, fontSize: "2.4rem", color: "var(--foreground)", letterSpacing: "0.03em" }}>
                Where shall we send your ritual?
              </h1>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Full name */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Full Name</label>
                <input name="fullName" type="text" required value={form.fullName} onChange={handleChange} style={inputStyle} />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>Phone</label>
                  <input name="phone" type="tel" required value={form.phone} onChange={handleChange} style={inputStyle} placeholder="+254" />
                </div>
              </div>

              {/* Address */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Street Address</label>
                <input name="address" type="text" required value={form.address} onChange={handleChange} style={inputStyle} />
              </div>

              {/* City + Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>City</label>
                  <input name="city" type="text" required value={form.city} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>Country</label>
                  <select name="country" value={form.country} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="Kenya">Kenya</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="South Africa">South Africa</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {error && (
                <p style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.72rem", color: "var(--burgundy)", letterSpacing: "0.04em" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 8,
                  background: "var(--burgundy)",
                  color: "#fff",
                  border: "none",
                  padding: "16px",
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  transition: "background 0.2s",
                }}
              >
                {loading ? "Redirecting to payment..." : "Continue to Payment →"}
              </button>

              <p style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.65rem", color: "var(--text-light)", lineHeight: 1.6 }}>
                You will be redirected to our secure payment provider. Your card details are never stored by Nakyl.
              </p>
            </form>
          </div>
        </div>

        {/* Right — Order summary */}
        <div className="w-full md:w-96 md:shrink-0 px-4 py-10 sm:px-8 md:px-10 md:py-14" style={{ background: "var(--surface-muted)" }}>
          <h2 style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "1.4rem",
            color: "var(--foreground)",
            letterSpacing: "0.04em",
            marginBottom: 28,
            paddingBottom: 16,
            borderBottom: "1px solid var(--border)",
          }}>
            Order Summary
          </h2>

          {/* Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
            {items.map(({ product, quantity }) => (
              <div key={product.id} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{
                  position: "relative",
                  width: 56,
                  height: 56,
                  borderRadius: 6,
                  background: product.image_bg ?? "#F7D6E0",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Image src={product.image_url} alt={product.name} width={44} height={44} className="object-contain" />
                  {/* Quantity badge */}
                  <span style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "var(--burgundy)",
                    color: "#fff",
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-sans), 'Jost', sans-serif",
                    fontSize: "0.55rem",
                  }}>
                    {quantity}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-display), 'Cormorant Garamond', serif", fontSize: "0.95rem", color: "var(--foreground)", lineHeight: 1.2 }}>
                    {product.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.62rem", color: "var(--text-taupe)", letterSpacing: "0.1em" }}>
                    {product.category}
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.82rem", color: "var(--foreground)", fontWeight: 500 }}>
                  KES {(product.price * quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.75rem", color: "var(--text-muted)" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.78rem", color: "var(--foreground)" }}>KES {total.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.75rem", color: "var(--text-muted)" }}>Shipping</span>
              <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.78rem", color: shipping === 0 ? "green" : "var(--foreground)" }}>
                {shipping === 0 ? "Free" : `KES ${shipping.toLocaleString()}`}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 16, marginTop: 4 }}>
              <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>Total</span>
              <span style={{ fontFamily: "var(--font-display), 'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "var(--foreground)" }}>
                KES {grandTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
