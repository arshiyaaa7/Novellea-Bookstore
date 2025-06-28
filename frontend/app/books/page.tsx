"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Search,
  Filter,
  SlidersHorizontal,
  DollarSign,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BookCard } from "@/components/book-card"
import booksService from "@/lib/api/books"
import type { Book } from "@/lib/api/books"

const genres = [
  "Fiction",
  "Romance",
  "Self-Help",
  "Biography",
  "Mystery",
  "Fantasy",
  "Science Fiction",
  "Strategy",
  "Psychology",
  "Dark Fantasy",
]

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000])
  const [sortBy, setSortBy] = useState("relevance")
  const [showBestsellersOnly, setShowBestsellersOnly] = useState(false)

  const uniqueAuthors = useMemo(
    () => [...new Set(books.map((book) => book.author))],
    [books]
  )

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const filters = {
          query: searchTerm,
          genres: selectedGenres,
          authors: selectedAuthors,
          priceRange: [priceRange[0], priceRange[1]] as [number, number],
          bestsellersOnly: showBestsellersOnly,
        }
        const response = await booksService.searchBooks(filters)
        setBooks(response.books)
      } catch (err) {
        console.error("Error loading books:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [searchTerm, selectedGenres, selectedAuthors, priceRange, showBestsellersOnly])

  const filteredBooks = useMemo(() => {
    return books.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
  }, [books, sortBy])

  const handleGenreChange = (genre: string, checked: boolean) => {
    setSelectedGenres(
      checked
        ? [...selectedGenres, genre]
        : selectedGenres.filter((g) => g !== genre)
    )
  }

  const handleAuthorChange = (author: string, checked: boolean) => {
    setSelectedAuthors(
      checked
        ? [...selectedAuthors, author]
        : selectedAuthors.filter((a) => a !== author)
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setSelectedAuthors([])
    setPriceRange([0, 1000])
    setShowBestsellersOnly(false)
    setSearchTerm("")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-playfair font-semibold text-maroon mb-3">Genre</h3>
        <div className="space-y-2">
          {genres.map((genre) => (
            <div key={genre} className="flex items-center space-x-2">
              <Checkbox
                id={genre}
                checked={selectedGenres.includes(genre)}
                onCheckedChange={(checked) =>
                  handleGenreChange(genre, checked as boolean)
                }
                className="border-rose-gold data-[state=checked]:bg-rose-gold"
              />
              <Label htmlFor={genre} className="text-sm text-maroon">
                {genre}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-playfair font-semibold text-maroon mb-3">Author</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {uniqueAuthors.map((author) => (
            <div key={author} className="flex items-center space-x-2">
              <Checkbox
                id={author}
                checked={selectedAuthors.includes(author)}
                onCheckedChange={(checked) =>
                  handleAuthorChange(author, checked as boolean)
                }
                className="border-rose-gold data-[state=checked]:bg-rose-gold"
              />
              <Label htmlFor={author} className="text-sm text-maroon">
                {author}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-playfair font-semibold text-maroon mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            min={0}
            step={50}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-rose-gold">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="bestsellers"
          checked={showBestsellersOnly}
          onCheckedChange={(checked) => setShowBestsellersOnly(checked === true)}
          className="border-rose-gold data-[state=checked]:bg-rose-gold"
        />
        <Label htmlFor="bestsellers" className="text-sm text-maroon">
          Bestsellers Only
        </Label>
      </div>

      <Button
        onClick={clearFilters}
        variant="outline"
        className="w-full border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-cream"
      >
        Clear All Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-blush py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-playfair font-bold text-maroon text-4xl mb-2">
            Our Collection
          </h1>
          <p className="text-rose-gold text-lg">Discover your next favorite story</p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-gold h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-rose-gold-light focus:border-rose-gold bg-cream"
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-80 bg-cream rounded-lg shadow-sm border border-rose-gold-light p-6 h-fit sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair font-semibold text-maroon text-xl">Filters</h2>
              <Filter className="h-5 w-5 text-rose-gold" />
            </div>
            <FilterContent />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-cream"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 bg-cream">
                    <SheetHeader>
                      <SheetTitle className="font-playfair text-maroon">Filters</SheetTitle>
                      <SheetDescription className="text-rose-gold">
                        Refine your book search
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <span className="text-rose-gold">
                  {filteredBooks.length} book{filteredBooks.length !== 1 ? "s" : ""} found
                </span>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-rose-gold-light focus:border-rose-gold bg-cream">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-cream border-rose-gold-light">
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="title">Title A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  {...book}
                  id={book.id}
                  onAddToCart={() => {
                    console.log(`Adding ${book.title} to cart`)
                  }}
                />
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <div className="text-rose-gold mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-maroon mb-2">
                  No books found
                </h3>
                <p className="text-rose-gold mb-4">
                  Try adjusting your search or filters
                </p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-cream"
                >
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