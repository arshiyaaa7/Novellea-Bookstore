import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter, Crimson_Text } from "next/font/google"
import "./globals.css"
import { ResizableNavbar } from "@/components/ui/resizable-navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "react-hot-toast"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Novellea - Stories wrapped in grace",
  description: "Curated bookstore with elegant collection of stories",
  icons: {
    icon: "/images/novellea-logo.png",
    shortcut: "/images/novellea-logo.png",
    apple: "/images/novellea-logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${crimsonText.variable}`}>
      <body className="min-h-screen bg-vintage-paper font-inter">
        <ResizableNavbar />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#f8f6f3",
              color: "#4a3728",
              border: "1px solid #c4a484",
            },
          }}
        />
      </body>
    </html>
  )
}
