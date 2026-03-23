"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  delay?: number
  duration?: number
  /** "up" (default) | "left" | "right" | "scale" */
  variant?: "up" | "left" | "right" | "scale"
  className?: string
  style?: React.CSSProperties
  amount?: number
}

const variants = {
  up:    { hidden: { opacity: 0, y: 36 },           visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -48 },          visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 },           visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 },     visible: { opacity: 1, scale: 1 } },
}

export default function AnimateInView({
  children,
  delay = 0,
  duration = 0.65,
  variant = "up",
  className,
  style,
  amount = 0.2,
}: Props) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
