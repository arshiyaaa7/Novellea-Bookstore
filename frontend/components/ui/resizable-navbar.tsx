"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, Search, Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export function ResizableNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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
          ? "bg-vintage-paper/95 backdrop-blur-xl shadow-lg border-b border-dusty-rose/20 py-2"
          : "bg-vintage-paper/90 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo with Feather Icon */}
          <Link href="/" className="flex items-center group">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Feather Icon */}
              <motion.div
                whileHover={{
                  y: -2,
                  filter: "drop-shadow(0 4px 8px rgba(74, 46, 35, 0.2))",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative"
              >
                <Image
                  src="/images/brand-feather.png"
                  alt="Novellea Feather"
                  width={isScrolled ? 24 : 28}
                  height={isScrolled ? 24 : 28}
                  className={`transition-all duration-500 ${isScrolled ? "w-6 h-6" : "w-7 h-7"} object-contain`}
                />
              </motion.div>

              {/* Novellea Text */}
              <div className="relative">
                <h1
                  className={`font-serif font-bold transition-all duration-500 ${
                    isScrolled ? "text-2xl" : "text-3xl"
                  } tracking-wide text-deep-maroon`}
                >
                  NOVELLEA
                </h1>
              </div>
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
                  className="relative text-deep-maroon hover:text-dusty-rose transition-colors duration-300 font-medium group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dusty-rose transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-deep-maroon hover:text-dusty-rose hover:bg-dusty-rose/10 transition-all duration-300"
            >
              {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="text-deep-maroon hover:text-dusty-rose hover:bg-dusty-rose/10 transition-all duration-300"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Profile */}
            <Link href="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="text-deep-maroon hover:text-dusty-rose hover:bg-dusty-rose/10 transition-all duration-300"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-deep-maroon hover:text-dusty-rose hover:bg-dusty-rose/10 relative transition-all duration-300"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-dusty-rose text-vintage-paper text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  0
                </span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-deep-maroon hover:text-dusty-rose hover:bg-dusty-rose/10"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-vintage-paper border-l border-dusty-rose/20">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src="/images/brand-feather.png"
                        alt="Novellea Feather"
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                      <h1 className="font-serif font-bold text-2xl tracking-wide text-deep-maroon">NOVELLEA</h1>
                    </div>
                  </div>

                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-deep-maroon hover:text-dusty-rose transition-colors duration-300 font-medium text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-dusty-rose/20 pt-6">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full mb-3 bg-dusty-rose hover:bg-dusty-rose/90 text-vintage-paper">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full border-dusty-rose text-deep-maroon hover:bg-dusty-rose/10"
                      >
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
              className="border-t border-dusty-rose/20 pt-4 mt-4"
            >
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dusty-rose h-4 w-4" />
                <Input
                  placeholder="Search for books, authors..."
                  className="pl-10 border-dusty-rose/30 focus:border-dusty-rose bg-vintage-paper/50 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
