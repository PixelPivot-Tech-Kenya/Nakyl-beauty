"use client"

import { useState } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import TopBar from "@/app/components/ui/TopBar"
import Navbar from "@/app/components/ui/Navbar"
import ProductCard from "@/app/components/product/ProductCard"
import { STATIC_PRODUCTS } from "@/app/data/products"
import ShopFilters from "@/app/components/ui/ShopFilters"

// When Supabase is seeded, replace STATIC_PRODUCTS with:
// const { data: products } = await createClient().from("products").select("*")

export default function ShopPage() {
  const products = STATIC_PRODUCTS
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div>
      <TopBar />
      <Navbar />

      {/* Page header */}
      <section className="px-4 py-10 sm:px-8 lg:px-16 lg:py-14" style={{ background: "var(--surface-muted)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <span style={{ display: "block", width: 32, height: 1, background: "var(--gold)" }} />
          <span
            style={{
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--text-taupe)",
            }}
          >
            All Products
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "var(--foreground)",
            letterSpacing: "0.03em",
            lineHeight: 1.1,
          }}
        >
          The Full Collection
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            marginTop: 12,
            maxWidth: 480,
          }}
        >
          Every product is a ritual. Browse the full Nakyl collection — from serums to fragrances.
        </p>
      </section>

      {/* Shop body */}
      <section className="px-4 py-8 sm:px-8 lg:px-16 lg:py-12" style={{ background: "var(--background)" }}>

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between mb-4 lg:hidden">
          <span style={{ fontFamily: "var(--font-sans), 'Jost', sans-serif", fontSize: "0.7rem", color: "var(--text-light)", letterSpacing: "0.08em" }}>
            {products.length} products
          </span>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "1px solid var(--border)",
              padding: "8px 16px",
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            {filtersOpen ? <X size={14} /> : <SlidersHorizontal size={14} />}
            {filtersOpen ? "Close" : "Filters"}
          </button>
        </div>

        {/* Mobile filter panel */}
        {filtersOpen && (
          <div className="lg:hidden mb-6 p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <ShopFilters />
          </div>
        )}

        <div className="flex gap-12 items-start">

          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block shrink-0" style={{ width: 220 }}>
            <ShopFilters />
          </aside>

          {/* Product grid */}
          <div style={{ flex: 1 }}>
            {/* Sort bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 28,
                paddingBottom: 16,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                className="hidden lg:inline"
                style={{
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.7rem",
                  color: "var(--text-light)",
                  letterSpacing: "0.08em",
                }}
              >
                {products.length} products
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
                <span
                  style={{
                    fontFamily: "var(--font-sans), 'Jost', sans-serif",
                    fontSize: "0.62rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  Sort by
                </span>
                <select
                  style={{
                    fontFamily: "var(--font-sans), 'Jost', sans-serif",
                    fontSize: "0.72rem",
                    color: "var(--foreground)",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    padding: "6px 12px",
                    outline: "none",
                    cursor: "pointer",
                    letterSpacing: "0.06em",
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="bestseller">Best Sellers</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 24,
              }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
