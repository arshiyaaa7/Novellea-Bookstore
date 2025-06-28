"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedTextProps {
  text: string
  className?: string
}

export function AnimatedText({ text, className }: AnimatedTextProps) {
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn("text-center", className)}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: "8px" }}
          key={index}
          className={cn(
            "inline-block",
            index === 0 && "text-rose-gold",
            index === 1 && "text-maroon",
            index === 2 && "text-rose-gold-light",
            index === 3 && "text-maroon",
            index === 4 && "text-rose-gold",
            index === 5 && "text-maroon",
            index === 6 && "text-rose-gold-light",
            index === 7 && "text-maroon",
            index === 8 && "text-rose-gold",
          )}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
