// =============================================================================
// BOOKS CATALOG API SERVICE - Book Service Integration Points
// =============================================================================

export interface Book {
  id: number
  title: string
  author: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  genre: string
  format: string
  inStock: boolean
  image: string           // Changed to `image` instead of `imageurl`
  description: string
  fullDescription?: string
  publishYear: number
  pages?: number
  language?: string
  isbn?: string
  publisher?: string
  bestseller?: boolean
}

export interface SearchFilters {
  query?: string
  genres?: string[]
  authors?: string[]
  priceRange?: [number, number]
  inStockOnly?: boolean
  bestsellersOnly?: boolean
  sortBy?: "relevance" | "price-low" | "price-high" | "rating" | "newest" | "title"
}

export interface BooksResponse {
  books: Book[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// =============================================================================
// BOOKS SERVICE FUNCTIONS
// =============================================================================

const BASE_URL = "http://localhost:8081/api/books"

function mapBook(raw: any): Book {
  return {
    ...raw,
    image: raw.imageurl || "/placeholder.svg", // Map imageurl -> image
  }
}

export const booksService = {
  async getAllBooks(page = 1, limit = 20): Promise<BooksResponse> {
    console.log("🔄 [BOOKS] Fetching all books - Page:", page, "Limit:", limit)

    const response = await fetch(`${BASE_URL}`)
    if (!response.ok) throw new Error("Failed to fetch all books")

    const rawBooks: any[] = await response.json()
    const books = rawBooks.map(mapBook)

    return {
      books,
      total: books.length,
      page,
      limit,
      hasMore: books.length === limit,
    }
  },

  async searchBooks(filters: SearchFilters, page = 1, limit = 20): Promise<BooksResponse> {
    console.log("🔎 [BOOKS] Searching with filters:", filters)

    const isPriceFiltered =
      filters.priceRange && (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000)

    const isFiltered =
      !!filters.query ||
      (filters.genres?.length ?? 0) > 0 ||
      (filters.authors?.length ?? 0) > 0 ||
      !!filters.bestsellersOnly ||
      isPriceFiltered

    // 1. If no filters, fallback to getAllBooks
    if (!isFiltered) {
      return await this.getAllBooks(page, limit)
    }

    // 2. If only title query is present, call search endpoint
    if (filters.query) {
      const response = await fetch(`${BASE_URL}/search/title?title=${encodeURIComponent(filters.query)}`)
      if (!response.ok) throw new Error("Failed to search books")
      const rawBooks: any[] = await response.json()
      const books = rawBooks.map(mapBook)

      return {
        books,
        total: books.length,
        page,
        limit,
        hasMore: books.length === limit,
      }
    }

    // 3. Otherwise fetch all books and apply filters client-side
      const allBooksResp = await this.getAllBooks(page, limit)
      const filtered = allBooksResp.books.filter((book) => {
      const matchGenre = filters.genres?.length ? filters.genres.includes(book.genre) : true
      const matchAuthor = filters.authors?.length ? filters.authors.includes(book.author) : true
      const matchBestseller = filters.bestsellersOnly ? book.bestseller : true
      const matchPrice = isPriceFiltered
        ? book.price >= filters.priceRange![0] && book.price <= filters.priceRange![1]
        : true
      return matchGenre && matchAuthor && matchBestseller && matchPrice
    })

    return {
      books: filtered,
      total: filtered.length,
      page,
      limit,
      hasMore: filtered.length === limit,
    }
  },

  async getBookById(id: string): Promise<Book> {
    console.log("🔄 [BOOKS] Fetching book details:", id)

    const response = await fetch(`${BASE_URL}/${id}`)
    if (!response.ok) throw new Error("Book not found")

    const rawBook = await response.json()
    return mapBook(rawBook)
  },


  async getGenres(): Promise<string[]> {
    console.log("🔄 [BOOKS] Fetching available genres")

    const response = await fetch(`${BASE_URL}`)
    if (!response.ok) throw new Error("Failed to fetch genres")

    const rawBooks: any[] = await response.json()
    return Array.from(new Set(rawBooks.map((book) => book.genre)))
  },

  async getAuthors(): Promise<string[]> {
    console.log("🔄 [BOOKS] Fetching available authors")

    const response = await fetch(`${BASE_URL}`)
    if (!response.ok) throw new Error("Failed to fetch authors")

    const rawBooks: any[] = await response.json()
    return Array.from(new Set(rawBooks.map((book) => book.author)))
  },

  async getBestsellers(): Promise<Book[]> {
    console.log("🔄 [BOOKS] Fetching bestsellers")

    const response = await fetch(`${BASE_URL}/bestsellers`)
    if (!response.ok) throw new Error("Failed to fetch bestsellers")

    const rawBooks: any[] = await response.json()
    return rawBooks.map(mapBook)
  },

  async getFeaturedBooks(): Promise<Book[]> {
    console.log("🔄 [BOOKS] Fetching featured books")

    const response = await fetch(`${BASE_URL}/featured`)
    if (!response.ok) throw new Error("Failed to fetch featured books")

    const rawBooks: any[] = await response.json()
    return rawBooks.map(mapBook)
  },

  async getPopularBooks(): Promise<Book[]> {
    console.log("🔄 [BOOKS] Fetching popular books this week")

    const response = await fetch(`${BASE_URL}/popular`)
    if (!response.ok) throw new Error("Failed to fetch popular books")

    const rawBooks: any[] = await response.json()
    return rawBooks.map(mapBook)
  },

}

export default booksService
