const TESTIMONIALS = [
  {
    id: 1,
    name: "Amara Osei",
    location: "Accra, Ghana",
    role: "Skincare Enthusiast",
    quote:
      "I never believed a moisturiser could genuinely change my skin until I tried Nakyl. Three weeks in and my hyperpigmentation has visibly faded. It feels like my skin finally exhaled.",
    rating: 5,
    product: "Luminous Ritual Serum",
    initials: "AO",
  },
  {
    id: 2,
    name: "Zara Mensah",
    location: "Lagos, Nigeria",
    role: "Content Creator",
    quote:
      "The fragrance collection is something else entirely — layered, sophisticated, and it lasts. People stop me on the street to ask what I'm wearing. Pure luxury.",
    rating: 5,
    product: "Oud & Amber Elixir",
    initials: "ZM",
  },
  {
    id: 3,
    name: "Leilani Mwangi",
    location: "Nairobi, Kenya",
    role: "Beauty Editor",
    quote:
      "As someone who reviews beauty products professionally, I rarely rave this openly. Nakyl's formulations are scientifically sound and sensorial in a way most luxury brands can't achieve.",
    rating: 5,
    product: "Velvet Repair Hair Oil",
    initials: "LM",
  },
  {
    id: 4,
    name: "Chidinma Adeyemi",
    location: "Abuja, Nigeria",
    role: "Dermatology Nurse",
    quote:
      "I recommend Nakyl to my patients with sensitive skin. Clean ingredients, no irritants, and results that speak for themselves. This brand has earned its place in my professional toolkit.",
    rating: 5,
    product: "Calm & Restore Toner",
    initials: "CA",
  },
];

const FEATURED = {
  name: "Dr. Nia Asante",
  location: "London, UK",
  role: "Holistic Wellness Practitioner",
  quote:
    "Nakyl understands something most brands don't — skincare is an act of self-respect. Every product in their range is thoughtfully constructed, ethically sourced, and genuinely effective. I've integrated their rituals into my wellness practice and the results are undeniable.",
  rating: 5,
  product: "The Full Ritual Collection",
  initials: "NA",
};

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={i < count ? "var(--gold)" : "none"}
          stroke={i < count ? "var(--gold)" : "rgba(212,175,106,0.35)"}
          strokeWidth="1"
        >
          <polygon points="6,1 7.5,4.5 11,4.5 8.5,7 9.5,11 6,8.5 2.5,11 3.5,7 1,4.5 4.5,4.5" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "linear-gradient(135deg, var(--burgundy), var(--burgundy-dark))",
        border: "1.5px solid var(--gold)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
          fontSize: "1rem",
          fontWeight: 500,
          color: "var(--gold)",
          letterSpacing: "0.05em",
        }}
      >
        {initials}
      </span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section style={{ background: "var(--background)", overflow: "hidden" }}>

      {/* Top ornamental border */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, var(--gold), transparent)" }} />

      <div className="px-4 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "72px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ display: "block", width: 40, height: 1, background: "var(--gold)", opacity: 0.6 }} />
            <span
              style={{
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--text-taupe)",
              }}
            >
              Client Testimonials
            </span>
            <span style={{ display: "block", width: 40, height: 1, background: "var(--gold)", opacity: 0.6 }} />
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(1.9rem, 4vw, 3rem)",
              letterSpacing: "0.04em",
              color: "var(--foreground)",
              lineHeight: 1.1,
            }}
          >
            Words from Our{" "}
            <em style={{ color: "var(--burgundy)", fontStyle: "italic" }}>Ritual Family</em>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              fontSize: "0.82rem",
              lineHeight: 1.8,
              color: "var(--text-muted)",
              maxWidth: "420px",
              textAlign: "center",
            }}
          >
            Real women. Real results. Every review is a story of skin that finally found its ritual.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div
          style={{
            position: "relative",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "2px",
            padding: "clamp(28px, 5vw, 64px) clamp(20px, 6vw, 80px)",
            marginBottom: "32px",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Decorative corner accents */}
          {[
            { top: 0, left: 0, borderTop: "1.5px solid var(--gold)", borderLeft: "1.5px solid var(--gold)" },
            { top: 0, right: 0, borderTop: "1.5px solid var(--gold)", borderRight: "1.5px solid var(--gold)" },
            { bottom: 0, left: 0, borderBottom: "1.5px solid var(--gold)", borderLeft: "1.5px solid var(--gold)" },
            { bottom: 0, right: 0, borderBottom: "1.5px solid var(--gold)", borderRight: "1.5px solid var(--gold)" },
          ].map((style, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                width: 24,
                height: 24,
                opacity: 0.55,
                ...style,
              }}
            />
          ))}

          {/* Large quote glyph */}
          <div
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontSize: "7rem",
              lineHeight: 0.5,
              color: "var(--gold)",
              opacity: 0.18,
              marginBottom: "24px",
              userSelect: "none",
            }}
          >
            &ldquo;
          </div>

          <StarRating count={FEATURED.rating} />
          <div style={{ marginTop: "8px" }} />

          <p
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.65rem",
              lineHeight: 1.55,
              color: "var(--foreground)",
              letterSpacing: "0.02em",
              maxWidth: "680px",
              margin: "20px auto 0",
            }}
          >
            {FEATURED.quote}
          </p>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              margin: "36px 0 28px",
            }}
          >
            <span style={{ display: "block", width: 40, height: 1, background: "var(--border)" }} />
            <span style={{ display: "block", width: 5, height: 5, borderRadius: "50%", background: "var(--gold)", opacity: 0.5 }} />
            <span style={{ display: "block", width: 40, height: 1, background: "var(--border)" }} />
          </div>

          {/* Author info */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <Avatar initials={FEATURED.initials} />
            <div style={{ marginTop: "8px" }}>
              <p
                style={{
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  letterSpacing: "0.06em",
                  marginBottom: "2px",
                }}
              >
                {FEATURED.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                }}
              >
                {FEATURED.role} &nbsp;·&nbsp; {FEATURED.location}
              </p>
              <p
                style={{
                  marginTop: "8px",
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  opacity: 0.85,
                }}
              >
                {FEATURED.product}
              </p>
            </div>
          </div>
        </div>

        {/* Grid of 4 testimonial cards */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Top row: stars + quote mark */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <StarRating count={t.rating} />
                <span
                  style={{
                    fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                    fontSize: "2.5rem",
                    lineHeight: 1,
                    color: "var(--gold)",
                    opacity: 0.25,
                    userSelect: "none",
                  }}
                >
                  &ldquo;
                </span>
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "1.05rem",
                  lineHeight: 1.65,
                  color: "var(--text-muted)",
                  letterSpacing: "0.01em",
                  flex: 1,
                }}
              >
                {t.quote}
              </p>

              {/* Product tag */}
              <div
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "4px 10px",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans), 'Jost', sans-serif",
                    fontSize: "0.52rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-taupe)",
                  }}
                >
                  {t.product}
                </span>
              </div>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "4px", borderTop: "1px solid var(--border)" }}>
                <Avatar initials={t.initials} />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-sans), 'Jost', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: "var(--foreground)",
                      letterSpacing: "0.05em",
                      marginBottom: "2px",
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-sans), 'Jost', sans-serif",
                      fontSize: "0.55rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-light)",
                    }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats bar */}
        <div className="testimonials-stats">
          {[
            { value: "4.9", label: "Average Rating" },
            { value: "2,400+", label: "Verified Reviews" },
            { value: "98%", label: "Would Recommend" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                  fontWeight: 300,
                  fontSize: "2.8rem",
                  color: "var(--burgundy)",
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.58rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom ornamental border */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, var(--gold), transparent)" }} />

    </section>
  );
}
