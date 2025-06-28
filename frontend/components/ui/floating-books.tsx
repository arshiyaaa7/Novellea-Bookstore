"use client"

import { motion } from "framer-motion"

// Simplified floating elements that work with bookshelf background
export function FloatingBooks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle floating sparkles instead of books */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-rose-gold/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
