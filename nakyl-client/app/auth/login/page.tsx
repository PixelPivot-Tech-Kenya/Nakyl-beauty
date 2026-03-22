"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/app/lib/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/checkout")
  }

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
        width: "100%",
        maxWidth: 420,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        padding: "48px 40px",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ display: "block", width: 24, height: 1, background: "var(--gold)" }} />
            <span style={{
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--text-taupe)",
            }}>
              Welcome Back
            </span>
            <span style={{ display: "block", width: 24, height: 1, background: "var(--gold)" }} />
          </div>
          <h1 style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "2.2rem",
            color: "var(--foreground)",
            letterSpacing: "0.04em",
          }}>
            Sign In
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}>
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "12px 16px",
                border: "1px solid var(--border)",
                background: "var(--background)",
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.82rem",
                color: "var(--foreground)",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "12px 16px",
                border: "1px solid var(--border)",
                background: "var(--background)",
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.82rem",
                color: "var(--foreground)",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <p style={{
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.72rem",
              color: "var(--burgundy)",
              letterSpacing: "0.04em",
            }}>
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
              padding: "14px",
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "background 0.2s",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer links */}
        <div style={{ marginTop: 28, textAlign: "center", display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/auth/signup" style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.7rem",
            color: "var(--text-muted)",
            textDecoration: "none",
            letterSpacing: "0.06em",
          }}>
            Don&apos;t have an account?{" "}
            <span style={{ color: "var(--burgundy)", textDecoration: "underline", textUnderlineOffset: 3 }}>
              Create one
            </span>
          </Link>
          <Link href="/" style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.62rem",
            color: "var(--text-light)",
            textDecoration: "none",
            letterSpacing: "0.06em",
          }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
