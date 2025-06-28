"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import booksService from "@/lib/api/books"
import type { Book } from "@/lib/api/books"

export default function BookDetailPage() {
  const { id } = useParams()
  const [book, setBook] = useState<Book | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchBook = async () => {
      try {
        const data = await booksService.getBookById(id as string)
        setBook(data)
      } catch (err) {
        console.error("Failed to fetch book:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} copies of ${book?.title} to cart`)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    console.log(`${isWishlisted ? "Removing from" : "Adding to"} wishlist: ${book?.title}`)
  }

  if (loading || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blush text-maroon">
        Loading book details...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blush py-8">
      <div className="container mx-auto px-4">
        <Link href="/books">
          <Button variant="ghost" className="mb-6 text-maroon hover:text-rose-gold hover:bg-cream">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src={book.image || "/placeholder.svg"}
                alt={book.title}
                width={400}
                height={600}
                className="rounded-lg shadow-lg border border-rose-gold-light"
              />
              {book.bestseller && <Badge className="absolute top-4 left-4 bg-rose-gold text-cream">Bestseller</Badge>}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="font-playfair font-bold text-maroon text-3xl md:text-4xl mb-2">{book.title}</h1>
              <p className="text-rose-gold text-xl mb-4">by {book.author}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-maroon font-medium">{book.rating}</span>
                  <span className="text-rose-gold">({book.reviews} reviews)</span>
                </div>
                <Badge variant="outline" className="border-rose-gold text-rose-gold">
                  {book.genre}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold text-maroon text-3xl">₹{book.price}</span>
              {book.originalPrice && book.originalPrice > book.price && (
                <span className="text-rose-gold text-xl line-through">₹{book.originalPrice}</span>
              )}
              {book.originalPrice && (
                <Badge className="bg-green-100 text-green-800">Save ₹{book.originalPrice - book.price}</Badge>
              )}
            </div>

            <div>
              <h3 className="font-playfair font-semibold text-maroon text-xl mb-3">Description</h3>
              <p className="text-maroon leading-relaxed mb-4">{book.description}</p>
              <p className="text-maroon/80 leading-relaxed">{book.fullDescription}</p>
            </div>

            <Separator className="bg-rose-gold-light" />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-rose-gold">Publisher:</span>
                <span className="text-maroon ml-2">{book.publisher}</span>
              </div>
              <div>
                <span className="text-rose-gold">Pages:</span>
                <span className="text-maroon ml-2">{book.pages}</span>
              </div>
              <div>
                <span className="text-rose-gold">Language:</span>
                <span className="text-maroon ml-2">{book.language}</span>
              </div>
              <div className="col-span-2">
                <span className="text-rose-gold">ISBN:</span>
                <span className="text-maroon ml-2">{book.isbn}</span>
              </div>
            </div>

            <Separator className="bg-rose-gold-light" />

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-maroon font-medium">Quantity:</span>
                <div className="flex items-center border border-rose-gold-light rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-maroon hover:text-rose-gold"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-maroon font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-maroon hover:text-rose-gold"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 shimmer-hover text-cream py-3"
                  disabled={!book.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {book.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleWishlist}
                  className={`border-rose-gold ${
                    isWishlisted ? "bg-rose-gold text-cream" : "text-rose-gold hover:bg-rose-gold hover:text-cream"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button
                  variant="outline"
                  className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-cream"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${book.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className="text-maroon">{book.inStock ? "In Stock - Ready to ship" : "Out of Stock"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
