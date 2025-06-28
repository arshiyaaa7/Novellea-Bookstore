"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FlipWordsProps {
  words: string[]
  duration?: number
  className?: string
}

export function FlipWords({ words, duration = 3000, className }: FlipWordsProps) {
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words.length, duration])

  return (
    <span className={cn("relative inline-block", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: 90 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="inline-block"
        >
          {words[currentWord]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
