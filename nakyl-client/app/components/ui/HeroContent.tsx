"use client"

import { motion } from "framer-motion"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

const stats = [
  { value: "12K+", label: "Happy Clients" },
  { value: "98%",  label: "Natural Ingredients" },
  { value: "50+",  label: "Products" },
]

export default function HeroContent() {
  return (
    <div className="bg-primary text-white w-1/2 flex flex-col justify-between px-16 py-16 relative overflow-hidden">

      {/* Decorative: soft gold radial glow — top-right */}
      <div style={{
        position: "absolute", top: "-90px", right: "-90px",
        width: "360px", height: "360px",
        background: "radial-gradient(circle, rgba(212,175,106,0.13) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* Decorative: soft gold radial glow — bottom-left */}
      <div style={{
        position: "absolute", bottom: "-70px", left: "-70px",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(212,175,106,0.08) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      {/* Decorative: thin gold vertical accent line on left edge */}
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.45 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{
          position: "absolute", top: 0, left: 0,
          width: "2px", height: "100%",
          background: "linear-gradient(to bottom, transparent, var(--gold) 25%, var(--gold) 75%, transparent)",
          transformOrigin: "top",
        }}
      />

      {/* Main content */}
      <div className="flex flex-col gap-6 relative z-10">

        {/* Eyebrow */}
        <motion.div className="flex items-center gap-3" {...fadeUp(0.15)}>
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 32, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            style={{ display: "block", height: 1, background: "var(--gold)" }}
          />
          <span style={{
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}>New Collection · 2025</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 {...fadeUp(0.3)} style={{
          fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
          fontWeight: 300,
          fontSize: "3.6rem",
          lineHeight: 1.08,
          color: "#ffffff",
        }}>
          Rituals that<br />
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>transform.</em>
        </motion.h1>

        {/* Body text */}
        <motion.p {...fadeUp(0.45)} style={{
          fontFamily: "var(--font-sans), 'Jost', sans-serif",
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "rgba(255,255,255,0.65)",
          maxWidth: "380px",
        }}>
          Luxury beauty rooted in science — formulated for the woman who refuses to compromise. Each product is a ritual, not just a routine.
        </motion.p>

        {/* CTA row */}
        <motion.div className="flex items-center gap-8 mt-2" {...fadeUp(0.58)}>
          <motion.button
            whileHover={{ scale: 1.03, borderColor: "rgba(212,175,106,0.8)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(212,175,106,0.45)",
              color: "#ffffff",
              padding: "14px 28px",
              fontSize: "0.75rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans), 'Jost', sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
            Explore Collection
            <span style={{ color: "var(--gold)", fontSize: "1rem" }}>→</span>
          </motion.button>
          <a href="#" style={{
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "var(--font-sans), 'Jost', sans-serif",
            borderBottom: "1px solid rgba(255,255,255,0.18)",
            paddingBottom: "2px",
          }}>
            Our Rituals
          </a>
        </motion.div>
      </div>

      {/* Stats row — bottom */}
      <div className="relative z-10">
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.7 }}
          style={{
            display: "block", width: "100%", height: "0.5px",
            background: "rgba(255,255,255,0.12)", marginBottom: "20px",
            transformOrigin: "left",
          }}
        />
        <div className="flex gap-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.75 + i * 0.1 }}
            >
              <p style={{
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "1.65rem",
                color: "#ffffff",
                lineHeight: 1,
              }}>{stat.value}</p>
              <p style={{
                fontFamily: "var(--font-sans), 'Jost', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.38)",
                marginTop: "6px",
              }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
