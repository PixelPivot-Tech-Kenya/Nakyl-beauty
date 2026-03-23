"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

const images = [
  { src: "/images/model1.jpeg", alt: "Nakyl model 1" },
  { src: "/images/model2.jpeg", alt: "Nakyl model 2" },
  { src: "/images/model3.jpeg", alt: "Nakyl model 3" },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length)
        setFading(false)
      }, 400)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  function goTo(index: number) {
    if (index === current) return
    setFading(true)
    setTimeout(() => {
      setCurrent(index)
      setFading(false)
    }, 400)
  }

  return (
    <div className="relative w-1/2 h-full overflow-hidden">
      {/* Image */}
      <Image
        key={current}
        src={images[current].src}
        alt={images[current].alt}
        width={1000}
        height={800}
        className="w-full h-full object-cover"
        style={{
          transition: "opacity 0.4s ease",
          opacity: fading ? 0 : 1,
        }}
        priority
      />

      {/* Left fade overlay blending into the burgundy panel */}
      <div className="absolute inset-0 bg-linear-to-r from-black/90 to-transparent" />

      {/* Dot indicators */}
      <div style={{
        position: "absolute",
        bottom: "28px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "10px",
        zIndex: 10,
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              borderRadius: i === current ? "4px" : "50%",
              background: i === current ? "var(--gold)" : "rgba(255,255,255,0.35)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Slide counter — top right */}
      <div style={{
        position: "absolute",
        top: "24px",
        right: "24px",
        fontFamily: "var(--font-sans), 'Jost', sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.45)",
        zIndex: 10,
      }}>
        {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  )
}
