"use client";

import Link from "next/link";

const shopLinks = [
  { label: "Skincare",    href: "/shop?category=skincare" },
  { label: "Makeup",      href: "/shop?category=makeup" },
  { label: "Fragrances",  href: "/shop?category=fragrances" },
  { label: "Hair Care",   href: "/shop?category=hair-care" },
  { label: "Gift Sets",   href: "/shop?category=gift-sets" },
  { label: "Sale",        href: "/shop?category=sale" },
];

const helpLinks = [
  { label: "Skin Consultation", href: "#" },
  { label: "Track Order",       href: "#" },
  { label: "Returns Policy",    href: "#" },
  { label: "Shipping Info",     href: "#" },
  { label: "FAQs",              href: "#" },
  { label: "Contact Us",        href: "#" },
];

const nakylLinks = [
  { label: "Our Story",      href: "#" },
  { label: "Ingredients",    href: "#" },
  { label: "Sustainability", href: "#" },
  { label: "Stockists",      href: "#" },
  { label: "Press",          href: "#" },
  { label: "Careers",        href: "#" },
];

const socials = [
  { label: "ig", href: "#" },
  { label: "tt", href: "#" },
  { label: "wa", href: "#" },
  { label: "fb", href: "#" },
];

function FooterColumn({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-4">
      <p
        style={{
          fontFamily: "var(--font-jost), 'Jost', sans-serif",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          fontWeight: 500,
        }}
      >
        {heading}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              style={{
                fontFamily: "var(--font-jost), 'Jost', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.45)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "#120710" }}>
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="flex flex-col gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--gold)", fontSize: "0.5rem" }}>●</span>
            <span
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontWeight: 400,
                color: "var(--gold)",
                letterSpacing: "0.05em",
              }}
            >
              Nakyl
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-jost), 'Jost', sans-serif",
              fontSize: "0.8rem",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "220px",
            }}
          >
            Luxury beauty rooted in science, formulated with love. For women who demand more from their rituals.
          </p>

          {/* Socials */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "var(--font-jost), 'Jost', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                  color: "rgba(255,255,255,0.45)",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <FooterColumn heading="Shop"  links={shopLinks} />
        <FooterColumn heading="Help"  links={helpLinks} />
        <FooterColumn heading="Nakyl" links={nakylLinks} />
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        className="max-w-7xl mx-auto px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p
          style={{
            fontFamily: "var(--font-jost), 'Jost', sans-serif",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          © 2025 Nakyl Beauty. All rights reserved. Nairobi, Kenya.
        </p>

        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
            <Link
              key={item}
              href="#"
              style={{
                fontFamily: "var(--font-jost), 'Jost', sans-serif",
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.3)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
