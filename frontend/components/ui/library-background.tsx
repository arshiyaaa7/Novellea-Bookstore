"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";

export function LibraryBackground() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* New vintage books flatlay background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <Image
          src="/images/vintage-books-flatlay.png"
          alt="Vintage Books and Roses Flatlay"
          fill
          className="object-cover object-center"
          priority
          quality={95}
        />

        {/* Light overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-vintage-paper/40 via-soft-ivory/30 to-vintage-paper/35" />

        {/* Center highlight for content area */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(248,246,243,0.25),transparent_70%)]" />
      </motion.div>

      {/* Gentle floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-600/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 0.4, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20,
            }}
          />
        ))}
      </div>
    </div>
  )
}
