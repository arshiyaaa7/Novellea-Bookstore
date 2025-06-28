"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, Search, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Catalog" },
    { href: "/offers", label: "Offers" },
    { href: "/about", label: "About" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-cream/95 backdrop-blur-lg shadow-lg border-b border-rose-gold-light/30"
          : "bg-cream/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="relative">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Novellea%202-IJo41Uw1aOPVgTVqiOAexO89scHHri.png"
                alt="Novellea Logo"
                width={120}
                height={60}
                className="h-10 w-auto transition-all duration-300 group-hover:brightness-110"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="relative text-maroon hover:text-rose-gold transition-colors duration-300 font-medium group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-gold to-rose-gold-light transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-maroon hover:text-rose-gold hover:bg-blush/50 transition-all duration-300"
              >
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Wishlist */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-maroon hover:text-rose-gold hover:bg-blush/50 transition-all duration-300"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Profile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/profile">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-maroon hover:text-rose-gold hover:bg-blush/50 transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Cart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-maroon hover:text-rose-gold hover:bg-blush/50 relative transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-rose-gold text-cream text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                  >
                    3
                  </motion.span>
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-maroon hover:text-rose-gold hover:bg-blush/50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-cream border-l border-rose-gold-light/30">
                <div className="flex flex-col space-y-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-maroon hover:text-rose-gold transition-colors duration-300 font-medium text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-rose-gold-light pt-6">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mb-3 shimmer-hover text-cream">Sign In</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-rose-gold text-maroon hover:bg-blush">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-rose-gold-light/30 py-4"
            >
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-gold h-4 w-4" />
                <Input
                  placeholder="Search for books, authors..."
                  className="pl-10 border-rose-gold-light focus:border-rose-gold bg-cream/50 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
