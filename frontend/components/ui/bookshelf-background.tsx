"use client"
import Image from "next/image"

export function BookshelfBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main bookshelf background */}
      <div className="absolute inset-0">
        <Image
          src="/images/bookshelf-bg.png"
          alt="Bookshelf Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blush/95 via-cream/90 to-rose-gold-light/85" />
        {/* Additional texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(183,110,121,0.1),transparent_70%)]" />
      </div>
    </div>
  )
}
