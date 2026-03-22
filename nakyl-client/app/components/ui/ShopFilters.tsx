"use client"

const CATEGORIES = ["Skincare", "Hair Care", "Fragrance", "Makeup"]
const BADGES = ["Bestseller", "New", "Sale", "Natural"]

export default function ShopFilters() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>

      {/* Categories */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--text-taupe)",
            marginBottom: 16,
          }}
        >
          Category
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {["All", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                textAlign: "left",
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                color: cat === "All" ? "var(--burgundy)" : "var(--text-muted)",
                cursor: "pointer",
                fontWeight: cat === "All" ? 500 : 300,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--burgundy)")}
              onMouseLeave={(e) => {
                if (cat !== "All") e.currentTarget.style.color = "var(--text-muted)"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <span style={{ display: "block", height: 1, background: "var(--border)" }} />

      {/* Price range */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--text-taupe)",
            marginBottom: 16,
          }}
        >
          Price Range
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "Under KES 1,500", value: "0-1500" },
            { label: "KES 1,500 – 3,000", value: "1500-3000" },
            { label: "KES 3,000 – 5,000", value: "3000-5000" },
            { label: "Above KES 5,000", value: "5000+" },
          ].map((range) => (
            <label
              key={range.value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                letterSpacing: "0.04em",
              }}
            >
              <input
                type="checkbox"
                style={{ accentColor: "var(--burgundy)", cursor: "pointer" }}
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {/* Divider */}
      <span style={{ display: "block", height: 1, background: "var(--border)" }} />

      {/* Badges */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--text-taupe)",
            marginBottom: 16,
          }}
        >
          Filter by
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {BADGES.map((badge) => (
            <label
              key={badge}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                letterSpacing: "0.04em",
              }}
            >
              <input
                type="checkbox"
                style={{ accentColor: "var(--burgundy)", cursor: "pointer" }}
              />
              {badge}
            </label>
          ))}
        </div>
      </div>

      {/* Divider */}
      <span style={{ display: "block", height: 1, background: "var(--border)" }} />

      {/* Clear filters */}
      <button
        style={{
          background: "none",
          border: "1px solid var(--border)",
          padding: "10px 0",
          fontFamily: "var(--font-sans), 'Jost', sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          cursor: "pointer",
          transition: "border-color 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--burgundy)"
          e.currentTarget.style.color = "var(--burgundy)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)"
          e.currentTarget.style.color = "var(--text-muted)"
        }}
      >
        Clear Filters
      </button>
    </div>
  )
}
