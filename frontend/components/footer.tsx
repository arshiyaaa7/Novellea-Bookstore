import Link from "next/link"
import { Heart, Instagram, Twitter, Facebook } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-vintage-paper border-t border-dusty-rose/20 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand with Logo + Text block */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src="/images/novellea-full-logo.png"
                alt="Novellea Logo"
                width={64}
                height={64}
                className="h-16 w-auto object-contain"
              />
              <div>
                <h2 className="font-playfair font-semibold text-deep-maroon text-lg mb-1">
                  Novellea – <span className="whitespace-nowrap">Stories wrapped in grace!</span>
                </h2>
                <p className="text-deep-maroon text-sm leading-relaxed max-w-md">
                  Curating beautiful stories for beautiful souls. Discover your next favorite book in our carefully
                  selected collection of literary treasures.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-semibold text-deep-maroon mb-4">Quick Links</h3>
            <div className="space-y-2">
              {["Home", "Catalog", "About", "Contact"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="block text-deep-maroon hover:text-dusty-rose transition-colors duration-200 text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-playfair font-semibold text-deep-maroon mb-4">Support</h3>
            <div className="space-y-2">
              {["FAQ", "Terms", "Privacy", "Returns"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="block text-deep-maroon hover:text-dusty-rose transition-colors duration-200 text-sm"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dusty-rose/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-deep-maroon text-sm mb-4 md:mb-0">
            © 2024 Novellea. Made with <Heart className="inline h-4 w-4 text-dusty-rose" /> for book lovers.
          </p>
          <div className="flex space-x-4">
            {[Instagram, Twitter, Facebook].map((Icon, index) => (
              <Link
                key={index}
                href="#"
                className="text-deep-maroon hover:text-dusty-rose transition-colors duration-200"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
