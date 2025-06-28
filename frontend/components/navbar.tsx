"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Catalog" },
    { href: "/offers", label: "Offers" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav className="bg-cream border-b border-rose-gold-light sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Novellea%202-IJo41Uw1aOPVgTVqiOAexO89scHHri.png"
              alt="Novellea Logo"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-maroon hover:text-rose-gold transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-maroon hover:text-rose-gold hover:bg-blush">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-maroon hover:text-rose-gold hover:bg-blush relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-rose-gold text-cream text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-maroon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-cream">
                <div className="flex flex-col space-y-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-maroon hover:text-rose-gold transition-colors duration-200 font-medium text-lg"
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
      </div>
    </nav>
  )
}
