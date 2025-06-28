"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, Filter, Star, Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const books = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.5,
    reviews: 1247,
    genre: "Fiction",
    format: "Hardcover",
    inStock: true,
    image: "/placeholder.svg?height=300&width=200",
    description: "A novel about all the choices that go into a life well lived.",
    publishYear: 2020,
    bestseller: true,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    originalPrice: 22.99,
    rating: 4.8,
    reviews: 2156,
    genre: "Self-Help",
    format: "Paperback",
    inStock: true,
    image: "/placeholder.svg?height=300&width=200",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    publishYear: 2018,
    bestseller: true,
  },
  {
    id: 3,
    title: "Dune",
    author: "Frank Herbert",
    price: 16.99,
    originalPrice: 19.99,
    rating: 4.6,
    reviews: 3421,
    genre: "Science Fiction",
    format: "Paperback",
    inStock: true,
    image: "/placeholder.svg?height=300&width=200",
    description: "The epic science fiction masterpiece",
    publishYear: 1965,
    bestseller: false,
  },
  {
    id: 4,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 21.99,
    originalPrice: 26.99,
    rating: 4.7,
    reviews: 1876,
    genre: "Romance",
    format: "Hardcover",
    inStock: false,
    image: "/placeholder.svg?height=300&width=200",
    description: "A captivating novel about a reclusive Hollywood icon",
    publishYear: 2017,
    bestseller: true,
  },
  {
    id: 5,
    title: "Educated",
    author: "Tara Westover",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.4,
    reviews: 987,
    genre: "Biography",
    format: "Paperback",
    inStock: true,
    image: "/placeholder.svg?height=300&width=200",
    description: "A memoir about education, family, and the struggle for self-invention",
    publishYear: 2018,
    bestseller: false,
  },
  {
    id: 6,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 15.99,
    originalPrice: 18.99,
    rating: 4.3,
    reviews: 1543,
    genre: "Mystery",
    format: "Paperback",
    inStock: true,
    image: "/placeholder.svg?height=300&width=200",
    description: "A psychological thriller about a woman who refuses to speak",
    publishYear: 2019,
    bestseller: false,
  },
  {
    id: 7,
    title: "Becoming",
    author: "Michelle Obama",
    price: 22.99,
    originalPrice: 27.99,
    rating: 4.9,
    reviews: 2987,
    genre: "Biography",
    format: "Hardcover",
    inStock: true,
    image: "/placeholder.svg?height=300&width=200",
    description: "An intimate, powerful memoir by the former First Lady",
    publishYear: 2018,
    bestseller: true,
  },
  {
    id: 8,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 14.99,
    originalPrice: 17.99,
    rating: 4.8,
    reviews: 4521,
    genre: "Fantasy",
    format: "Paperback",
    inStock: true,
    image: "/placeholder.svg?height=300&width=200",
    description: "The classic fantasy adventure that started it all",
    publishYear: 1937,
    bestseller: false,
  },
]

const genres = ["Fiction", "Self-Help", "Science Fiction", "Romance", "Biography", "Mystery", "Fantasy"]
const formats = ["Hardcover", "Paperback", "Ebook", "Audiobook"]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedFormats, setSelectedFormats] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50])
  const [sortBy, setSortBy] = useState("relevance")
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [showBestsellersOnly, setShowBestsellersOnly] = useState(false)

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(book.genre)
        const matchesFormat = selectedFormats.length === 0 || selectedFormats.includes(book.format)
        const matchesPrice = book.price >= priceRange[0] && book.price <= priceRange[1]
        const matchesStock = !showInStockOnly || book.inStock
        const matchesBestseller = !showBestsellersOnly || book.bestseller

        return matchesSearch && matchesGenre && matchesFormat && matchesPrice && matchesStock && matchesBestseller
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "newest":
            return b.publishYear - a.publishYear
          case "title":
            return a.title.localeCompare(b.title)
          default:
            return 0
        }
      })
  }, [searchTerm, selectedGenres, selectedFormats, priceRange, sortBy, showInStockOnly, showBestsellersOnly])

  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre])
    } else {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    }
  }

  const handleFormatChange = (format: string, checked: boolean) => {
    if (checked) {
      setSelectedFormats([...selectedFormats, format])
    } else {
      setSelectedFormats(selectedFormats.filter((f) => f !== format))
    }
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setSelectedFormats([])
    setPriceRange([0, 50])
    setShowInStockOnly(false)
    setShowBestsellersOnly(false)
    setSearchTerm("")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Genre</h3>
        <div className="space-y-2">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox
                id={genre}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
              />
              <Label htmlFor={genre} className="text-sm font-normal">
                {genre}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Format</h3>
        <div className="space-y-2">
          {formats.map((format) => (
            <div key={format} className="flex items-center space-x-2">
              <Checkbox
                id={format}
                checked={selectedFormats.includes(format)}
                onCheckedChange={(checked) => handleFormatChange(format, checked as boolean)}
              />
              <Label htmlFor={format} className="text-sm font-normal">
                {format}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={50} min={0} step={1} className="mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="inStock" checked={showInStockOnly} onCheckedChange={setShowInStockOnly} />
          <Label htmlFor="inStock" className="text-sm font-normal">
            In Stock Only
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="bestsellers" checked={showBestsellersOnly} onCheckedChange={setShowBestsellersOnly} />
          <Label htmlFor="bestsellers" className="text-sm font-normal">
            Bestsellers Only
          </Label>
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">BookHaven</h1>
          <p className="text-slate-600">Discover your next favorite book</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by title, author, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-slate-200 focus:border-slate-400 rounded-xl shadow-sm"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Filters</h2>
              <Filter className="h-5 w-5 text-slate-500" />
            </div>
            <FilterContent />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>Refine your book search</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-slate-600">{filteredBooks.length} books found</span>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters */}
            {(selectedGenres.length > 0 || selectedFormats.length > 0 || showInStockOnly || showBestsellersOnly) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {selectedGenres.map((genre) => (
                    <Badge key={genre} variant="secondary" className="px-3 py-1">
                      {genre}
                      <button
                        onClick={() => handleGenreChange(genre, false)}
                        className="ml-2 text-slate-500 hover:text-slate-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {selectedFormats.map((format) => (
                    <Badge key={format} variant="secondary" className="px-3 py-1">
                      {format}
                      <button
                        onClick={() => handleFormatChange(format, false)}
                        className="ml-2 text-slate-500 hover:text-slate-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {showInStockOnly && (
                    <Badge variant="secondary" className="px-3 py-1">
                      In Stock
                      <button
                        onClick={() => setShowInStockOnly(false)}
                        className="ml-2 text-slate-500 hover:text-slate-700"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {showBestsellersOnly && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Bestsellers
                      <button
                        onClick={() => setShowBestsellersOnly(false)}
                        className="ml-2 text-slate-500 hover:text-slate-700"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <Card
                  key={book.id}
                  className="group hover:shadow-lg transition-all duration-300 border-slate-200 overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={book.image || "/placeholder.svg"}
                      alt={book.title}
                      width={200}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {book.bestseller && (
                      <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
                    )}
                    {!book.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2 group-hover:text-slate-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-2">by {book.author}</p>

                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-500">
                        {book.rating} ({book.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">${book.price}</span>
                        {book.originalPrice > book.price && (
                          <span className="text-sm text-slate-500 line-through">${book.originalPrice}</span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {book.format}
                      </Badge>
                    </div>

                    <Button
                      className="w-full"
                      disabled={!book.inStock}
                      variant={book.inStock ? "default" : "secondary"}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {book.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-slate-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No books found</h3>
                <p className="text-slate-500 mb-4">Try adjusting your search or filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
