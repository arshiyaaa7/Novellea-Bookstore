"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingCart, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface BookCardProps {
  id: number
  title: string
  author: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number | { id: number; reviewerName: string; comment: string; rating: number }[]
  image: string
  genre: string
  bestseller?: boolean
  onAddToCart?: () => void
  onQuickView?: () => void
}

const genreGradients: Record<string, string> = {
  Romance: "bg-gradient-to-r from-pink-400 to-red-500",
  Fiction: "bg-gradient-to-r from-blue-400 to-indigo-500",
  "Self-Help": "bg-gradient-to-r from-green-400 to-emerald-500",
  Biography: "bg-gradient-to-r from-purple-400 to-violet-500",
  Mystery: "bg-gradient-to-r from-gray-600 to-gray-800",
  Fantasy: "bg-gradient-to-r from-amber-400 to-orange-500",
  "Science Fiction": "bg-gradient-to-r from-cyan-400 to-blue-500",
}

export function BookCard({
  id,
  title,
  author,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  genre,
  bestseller,
  onAddToCart,
  onQuickView,
}: BookCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-xs text-charcoal/70 ml-1">
          ({Array.isArray(reviews) ? reviews.length : reviews})
        </span>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{
          scale: 1.03,
          y: -8,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-vintage-paper rounded-2xl shadow-sm border border-dusty-rose/20 overflow-hidden relative h-full flex flex-col group-hover:shadow-2xl group-hover:shadow-dusty-rose/20 transition-all duration-300"
      >
        {bestseller && (
          <div className="absolute top-0 right-0 z-20">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-vintage-paper text-xs font-bold px-3 py-1 transform rotate-12 translate-x-2 -translate-y-1 shadow-lg">
              BESTSELLER
            </div>
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-orange-600/30"></div>
          </div>
        )}

        <div className="relative overflow-hidden">
          <Link href={`/books/${id}`}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={200}
                height={280}
                className="w-full h-64 object-cover"
              />
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center"
                  >
                    <motion.button
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                      onClick={onQuickView}
                      className="bg-vintage-paper/90 backdrop-blur-sm text-charcoal px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-vintage-paper transition-colors duration-200"
                    >
                      <Eye className="h-4 w-4" />
                      Quick View
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>

          <div className="absolute top-3 left-3">
            <Badge
              className={`${genreGradients[genre] || "bg-gradient-to-r from-gray-400 to-gray-600"} text-vintage-paper border-0 font-medium shadow-lg`}
            >
              {genre}
            </Badge>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWishlist}
            className="absolute top-3 right-3 bg-vintage-paper/90 backdrop-blur-sm hover:bg-vintage-paper text-charcoal p-2 rounded-full shadow-lg transition-all duration-200"
          >
            <Heart
              className={`h-4 w-4 transition-colors duration-200 ${
                isWishlisted ? "text-red-500 fill-red-500" : "text-charcoal"
              }`}
            />
          </motion.button>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <Link href={`/books/${id}`}>
            <h3 className="font-serif font-semibold text-charcoal text-lg mb-2 line-clamp-2 group-hover:text-dusty-rose transition-colors duration-200 leading-tight">
              {title}
            </h3>
          </Link>

          <p className="text-muted-plum text-sm mb-3 font-medium">by {author}</p>

          <div className="mb-4">{renderStars()}</div>

          <div className="flex items-center justify-between mb-4 mt-auto">
            <div className="flex items-center gap-2">
              <span className="font-bold text-charcoal text-xl">₹{price}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-muted-plum line-through">₹{originalPrice}</span>
              )}
            </div>
            {originalPrice && originalPrice > price && (
              <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
                Save ₹{originalPrice - price}
              </Badge>
            )}
          </div>

          <motion.div whileHover="hover" className="relative overflow-hidden">
            <motion.button
              onClick={onAddToCart}
              className="w-full bg-dusty-rose hover:bg-dusty-rose text-vintage-paper py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 relative overflow-hidden group/button transition-all duration-300"
            >
              <motion.div
                variants={{
                  hover: { x: 0 },
                }}
                initial={{ x: "-100%" }}
                className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700"
              />
              <div className="relative z-10 flex items-center gap-2">
                <motion.div
                  variants={{
                    hover: {
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                    },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingCart className="h-4 w-4" />
                </motion.div>
                <span>Add to Cart</span>
              </div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
