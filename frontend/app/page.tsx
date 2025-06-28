"use client"
import Link from "next/link"
import { ArrowRight, BookOpen, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlipWords } from "@/components/ui/flip-words"
import { LibraryBackground } from "@/components/ui/library-background"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { booksService } from "@/lib/api/books"

const flipWords = ["transformative", "magical", "timeless", "unforgettable", "inspiring"]
import { Book } from "@/lib/api/books"

export default function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([])
  const [popularBooks, setPopularBooks] = useState<Book[]>([])

  useEffect(() => {
    async function loadBooks() {
      try {
        const featured = await booksService.getFeaturedBooks()
        const popular = await booksService.getPopularBooks()
        setFeaturedBooks(featured.slice(0, 3))
        setPopularBooks(popular.slice(0, 4))
      } catch (err) {
        console.error("❌ Failed to fetch books:", err)
      }
    }

    loadBooks()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* New Vintage Books Flatlay Background */}
        <LibraryBackground />

        {/* Enhanced gradient mask for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-charcoal/10 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Enhanced Brand Identity with Dark Colors */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-4"
            >
              <div className="flex items-center justify-center space-x-3 group">
                <motion.div
                  whileHover={{
                    rotate: [0, -5, 5, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0"
                >
                <Image
                  src="/images/brand-feather.png"
                  alt="Novellea Feather"
                  width={100}
                  height={100}
                  className="w-20 h-20 object-contain"  // Tailwind's 80px
                  sizes="(max-width: 768px) 100vw, 120px"
                />
                </motion.div>
                <h1 className="font-serif text-3xl font-bold tracking-wide text-charcoal drop-shadow-lg">NOVELLEA</h1>
              </div>
            </motion.div>

            {/* Main Hero Heading with Enhanced Contrast */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="mb-12"
            >
              <div className="bg-vintage-paper/85 backdrop-blur-lg rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl relative overflow-hidden max-w-4xl mx-auto border border-amber-200/50">
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent rounded-2xl"></div>

                {/* Feather Icon and Heading Container */}
                <div className="flex items-start justify-center gap-3 md:gap-4 relative z-10">
                  {/* Feather Icon */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    whileHover={{
                      y: -3,
                      scale: 1.05,
                      filter: "drop-shadow(0 4px 12px rgba(45, 45, 45, 0.3))",
                    }}
                    className="flex-shrink-0 mt-1 md:mt-2"
                  >
                    {/* <Image
                      src="/images/hero-feather.png"
                      alt="Novellea Feather"
                      width={32}
                      height={32}
                      className="w-6 h-6 md:w-8 md:h-8 object-contain"
                      style={{
                        filter: "brightness(0) saturate(100%) invert(15%) sepia(15%) saturate(1000%) hue-rotate(10deg)",
                      }}
                    /> */}
                  </motion.div>

                  {/* Main Heading */}
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-charcoal leading-tight drop-shadow-sm text-left flex-1">
                    Discover books that are{" "}
                    <span className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 bg-clip-text text-transparent font-bold">
                      <FlipWords words={flipWords} duration={3500} />
                    </span>{" "}
                    — welcome to India's most elegant online bookstore.
                  </h2>
                </div>
              </div>
            </motion.div>

            {/* Feature Highlights with Enhanced Contrast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
            >
              <div className="bg-vintage-paper/90 backdrop-blur-md rounded-xl p-4 hover:scale-105 transition-all duration-300 border border-amber-200/30 shadow-lg">
                <BookOpen className="h-6 w-6 text-amber-700 mx-auto mb-2" />
                <h3 className="font-serif font-semibold text-charcoal mb-1 text-sm">Curated Collection</h3>
                <p className="text-charcoal/70 text-xs">Handpicked stories for discerning readers</p>
              </div>

              <div className="bg-vintage-paper/90 backdrop-blur-md rounded-xl p-4 hover:scale-105 transition-all duration-300 border border-amber-200/30 shadow-lg">
                <Sparkles className="h-6 w-6 text-amber-700 mx-auto mb-2" />
                <h3 className="font-serif font-semibold text-charcoal mb-1 text-sm">Literary Excellence</h3>
                <p className="text-charcoal/70 text-xs">Award-winning and critically acclaimed titles</p>
              </div>

              <div className="bg-vintage-paper/90 backdrop-blur-md rounded-xl p-4 hover:scale-105 transition-all duration-300 border border-amber-200/30 shadow-lg">
                <Heart className="h-6 w-6 text-amber-700 mx-auto mb-2" />
                <h3 className="font-serif font-semibold text-charcoal mb-1 text-sm">Reader Community</h3>
                <p className="text-charcoal/70 text-xs">Join thousands of passionate book lovers</p>
              </div>
            </motion.div>

            {/* Auth Buttons with Enhanced Styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 justify-center mb-10"
            >
              <Link href="/login">
                <Button
                  size="default"
                  className="bg-amber-800 hover:bg-amber-900 text-vintage-paper px-8 py-3 text-base font-medium hover:scale-105 transition-all duration-300 shadow-lg rounded-xl"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="default"
                  variant="outline"
                  className="border-2 border-amber-800 text-charcoal hover:bg-amber-800 hover:text-vintage-paper px-8 py-3 text-base font-medium hover:scale-105 transition-all duration-300 shadow-lg bg-vintage-paper/80 backdrop-blur-md rounded-xl"
                >
                  Register
                </Button>
              </Link>
            </motion.div>

            {/* Call to Action with Enhanced Styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-6"
            >
              <Link href="/books">
                <Button
                  variant="outline"
                  size="default"
                  className="border-2 border-amber-800 text-charcoal hover:bg-amber-800 hover:text-vintage-paper hover:scale-105 transition-all duration-300 shadow-lg bg-vintage-paper/80 backdrop-blur-md rounded-xl px-6 py-3"
                >
                  Explore Our Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-amber-800/60 rounded-full flex justify-center bg-vintage-paper/60 backdrop-blur-md"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="w-0.5 h-2 bg-amber-800 rounded-full mt-1.5"
            />
          </motion.div>
        </motion.div> */}
      </section>

      {/* Featured Collections Section */}
      <section className="py-20 bg-soft-ivory relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-amber-600 rounded-full"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 border border-amber-600 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair font-bold text-charcoal text-4xl md:text-5xl mb-4">Featured Collections</h2>
              <p className="text-charcoal/70 text-xl max-w-2xl mx-auto">
                Curated selections that capture the essence of great literature
              </p>
            </motion.div>
          </div>

          {/* Placeholder for dynamic content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredBooks.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-vintage-paper/80 backdrop-blur-md rounded-2xl p-8 h-80 flex flex-col justify-between hover:scale-105 transition-all duration-300 border border-amber-200/30 shadow-lg"
              >
                <div>
                  <div className="w-16 h-16 bg-amber-700/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="font-serif font-semibold text-charcoal text-xl mb-3 truncate">{book.title}</h3>
                  <p className="text-charcoal/70 line-clamp-2">{book.description}</p>
                </div>
                <div className="h-10 bg-amber-700/10 rounded-lg flex items-center justify-center text-sm text-charcoal font-medium">
                  {book.author}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular This Week Section */}
      <section className="py-20 bg-vintage-paper relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair font-bold text-charcoal text-4xl md:text-5xl mb-4">Popular This Week</h2>
              <p className="text-charcoal/70 text-xl max-w-2xl mx-auto">Trending stories that readers can't put down</p>
            </motion.div>
          </div>

          {/* Placeholder for dynamic content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {popularBooks.map((book, i) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-vintage-paper/80 backdrop-blur-md rounded-2xl p-6 h-96 flex flex-col hover:scale-105 transition-all duration-300 border border-amber-200/30 shadow-lg"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="rounded-xl h-48 w-full object-cover mb-4"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-charcoal truncate">{book.title}</h4>
                    <p className="text-sm text-charcoal/70 truncate">{book.author}</p>
                  </div>
                  <div className="mt-4 text-sm text-amber-800 font-medium">
                    ₹{book.price.toFixed(2)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-amber-100/50 to-amber-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="bg-vintage-paper/90 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-amber-200/50">
              <Sparkles className="h-16 w-16 text-amber-700 mx-auto mb-6" />
              <h2 className="font-playfair font-bold text-charcoal text-3xl md:text-4xl mb-6">
                Join Our Literary Journey
              </h2>
              <p className="text-charcoal/70 text-lg mb-8 max-w-2xl mx-auto">
                Subscribe to discover new releases, exclusive offers, and curated reading recommendations
              </p>
              <p className="font-serif text-charcoal/60 italic mb-8">Where every page turns into a new adventure</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-amber-800 hover:bg-amber-900 text-vintage-paper px-8 py-4 text-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg rounded-xl"
                  >
                    Start Reading Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
