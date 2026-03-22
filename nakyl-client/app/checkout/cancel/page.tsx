import Link from "next/link"

export default function CancelPage() {
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
        maxWidth: 440,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}>
        {/* Icon */}
        <div style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: "1.5px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>

        {/* Eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "block", width: 28, height: 1, background: "var(--border)" }} />
          <span style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--text-light)",
          }}>
            Payment Cancelled
          </span>
          <span style={{ display: "block", width: 28, height: 1, background: "var(--border)" }} />
        </div>

        <h1 style={{
          fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "2.6rem",
          color: "var(--foreground)",
          letterSpacing: "0.04em",
          lineHeight: 1.1,
        }}>
          Your bag is still waiting.
        </h1>

        <p style={{
          fontFamily: "var(--font-sans), 'Jost', sans-serif",
          fontSize: "0.82rem",
          lineHeight: 1.8,
          color: "var(--text-muted)",
          maxWidth: 340,
        }}>
          No payment was taken. Your items are still in your bag whenever you are ready.
        </p>

        <span style={{ display: "block", width: 48, height: 1, background: "var(--border)", opacity: 0.6 }} />

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/checkout"
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
            Try Again
          </Link>
          <Link
            href="/cart"
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
            View Bag
          </Link>
        </div>
      </div>
    </div>
  )
}
