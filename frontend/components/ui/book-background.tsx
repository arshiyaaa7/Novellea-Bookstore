"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const backgroundBooks = [
  {
    src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop",
    position: "top-10 left-10",
    delay: 0,
  },
  {
    src: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=120&h=180&fit=crop",
    position: "top-20 right-20",
    delay: 0.5,
  },
  {
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=180&fit=crop",
    position: "bottom-32 left-16",
    delay: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=180&fit=crop",
    position: "bottom-20 right-10",
    delay: 1.5,
  },
  {
    src: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&h=180&fit=crop",
    position: "top-1/2 left-5",
    delay: 2,
  },
  {
    src: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=120&h=180&fit=crop",
    position: "top-1/3 right-5",
    delay: 2.5,
  },
]

export function BookBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {backgroundBooks.map((book, index) => (
        <motion.div
          key={index}
          className={`absolute ${book.position} opacity-15 hover:opacity-30 transition-opacity duration-500`}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{
            opacity: 0.15,
            scale: 1,
            rotate: Math.random() * 20 - 10,
          }}
          transition={{
            duration: 1.5,
            delay: book.delay,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.1,
            opacity: 0.3,
            transition: { duration: 0.3 },
          }}
        >
          <div className="relative w-24 h-36 md:w-32 md:h-48 rounded-lg shadow-2xl border border-white/30 backdrop-blur-sm">
            <Image
              src={book.src || "/placeholder.svg"}
              alt="Background book"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 96px, 128px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 rounded-lg" />
            <div className="absolute inset-0 bg-rose-gold/10 rounded-lg" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
