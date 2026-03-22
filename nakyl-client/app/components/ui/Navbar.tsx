"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import NavbarLogos from "./NavLogos";

const links = [
  { label: "Home",    href: "/" },
  { label: "Shop",    href: "/shop" },
  { label: "About",   href: "#" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between py-5 px-8 md:px-16 bg-surface/95 backdrop-blur-sm border-b border-border">
        <Logo />

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-sans), 'Jost', sans-serif",
                  fontSize: "0.7rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--burgundy)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop icons */}
        <div className="hidden md:flex">
          <NavbarLogos />
        </div>

        {/* Mobile right — icons + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <NavbarLogos />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{ color: "var(--text-muted)" }}
          >
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden sticky top-17.25 z-40 border-b border-border"
          style={{ background: "var(--surface)" }}
        >
          <ul className="flex flex-col px-8 py-4 gap-5">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "var(--font-sans), 'Jost', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
