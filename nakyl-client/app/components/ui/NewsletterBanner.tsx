"use client"

import { useState } from "react"

export default function NewsletterBanner() {
  const [email, setEmail] = useState("")

  return (
    <section style={{ background: "var(--surface-muted)" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "96px 64px",
          gap: "20px",
          maxWidth: "680px",
          margin: "0 auto",
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <span style={{ display: "block", width: 32, height: 1, background: "var(--gold)", opacity: 0.7 }} />
          <span
            style={{
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "var(--text-taupe)",
            }}
          >
            Join the Ritual
          </span>
          <span style={{ display: "block", width: 32, height: 1, background: "var(--gold)", opacity: 0.7 }} />
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "2.8rem",
            letterSpacing: "0.03em",
            color: "var(--foreground)",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Elevate your{" "}
          <em style={{ color: "var(--burgundy)", fontStyle: "italic" }}>beauty ritual.</em>
        </h2>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.85rem",
            lineHeight: 1.8,
            color: "var(--text-muted)",
            maxWidth: "460px",
            margin: 0,
          }}
        >
          Get early access to new collections, exclusive member discounts, and rituals curated just for you. No spam — ever.
        </p>

        {/* Input + Button */}
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: "480px",
            marginTop: "12px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              padding: "16px 20px",
              border: "none",
              outline: "none",
              background: "transparent",
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.82rem",
              color: "var(--foreground)",
              letterSpacing: "0.02em",
            }}
          />
          <button
            style={{
              background: "var(--burgundy)",
              color: "#ffffff",
              border: "none",
              padding: "16px 28px",
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--burgundy-hover)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--burgundy)")}
          >
            Subscribe
          </button>
        </div>

        {/* Fine print */}
        <p
          style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.68rem",
            color: "var(--text-light)",
            letterSpacing: "0.04em",
            margin: 0,
          }}
        >
          Join 12,000+ women. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
