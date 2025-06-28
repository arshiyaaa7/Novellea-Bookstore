"use client"

import { motion } from "framer-motion"

const bookSpines = [
  { height: "h-32", color: "bg-rose-gold", title: "Romance" },
  { height: "h-28", color: "bg-maroon", title: "Mystery" },
  { height: "h-36", color: "bg-rose-gold-light", title: "Fiction" },
  { height: "h-24", color: "bg-rose-gold", title: "Poetry" },
  { height: "h-40", color: "bg-maroon", title: "Biography" },
  { height: "h-32", color: "bg-rose-gold-light", title: "Fantasy" },
  { height: "h-28", color: "bg-rose-gold", title: "Drama" },
  { height: "h-36", color: "bg-maroon", title: "History" },
]

export function BookSpinePattern() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 opacity-20 pointer-events-none">
      {bookSpines.map((spine, index) => (
        <motion.div
          key={index}
          className={`${spine.height} w-8 ${spine.color} rounded-t-sm shadow-lg border-l border-white/20`}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.7 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          whileHover={{
            y: -5,
            opacity: 1,
            transition: { duration: 0.2 },
          }}
        >
          <div className="h-full flex items-center justify-center">
            <span className="text-cream text-xs font-medium transform -rotate-90 whitespace-nowrap">{spine.title}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
