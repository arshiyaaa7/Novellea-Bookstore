"use client"

// =============================================================================
// BOOKS HOOK - React Hook for Books Data Management
// =============================================================================

import { useState, useEffect, useCallback } from "react"
import { booksService, type Book, type SearchFilters } from "@/lib/api"

interface BooksState {
  books: Book[]
  featuredBooks: Book[]
  currentBook: Book | null
  isLoading: boolean
  isSearching: boolean
  error: string | null
  hasMore: boolean
  total: number
}

export function useBooks() {
  const [state, setState] = useState<BooksState>({
    books: [],
    featuredBooks: [],
    currentBook: null,
    isLoading: false,
    isSearching: false,
    error: null,
    hasMore: false,
    total: 0,
  })

  // Load featured books on mount
  useEffect(() => {
    loadFeaturedBooks()
  }, [])

  const loadFeaturedBooks = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      // TODO: Connect to /api/books/featured
      const featured = await booksService.getFeaturedBooks()

      setState((prev) => ({
        ...prev,
        featuredBooks: featured,
        isLoading: false,
      }))
    } catch (error: any) {
      console.error("🚨 [BOOKS] Featured books error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to load featured books",
      }))
    }
  }, [])

  const searchBooks = useCallback(async (filters: SearchFilters, page = 1, limit = 20) => {
    try {
      setState((prev) => ({ ...prev, isSearching: true, error: null }))

      // TODO: Connect to /api/books/search
      const response = await booksService.searchBooks(filters, page, limit)

      setState((prev) => ({
        ...prev,
        books: page === 1 ? response.books : [...prev.books, ...response.books],
        total: response.total,
        hasMore: response.hasMore,
        isSearching: false,
      }))

      return response
    } catch (error: any) {
      console.error("🚨 [BOOKS] Search error:", error)
      setState((prev) => ({
        ...prev,
        isSearching: false,
        error: error.message || "Search failed",
      }))
      throw error
    }
  }, [])

  const loadAllBooks = useCallback(async (page = 1, limit = 20) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      // TODO: Connect to /api/books
      const response = await booksService.getAllBooks(page, limit)

      setState((prev) => ({
        ...prev,
        books: page === 1 ? response.books : [...prev.books, ...response.books],
        total: response.total,
        hasMore: response.hasMore,
        isLoading: false,
      }))

      return response
    } catch (error: any) {
      console.error("🚨 [BOOKS] Load books error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to load books",
      }))
      throw error
    }
  }, [])

  const getBookById = useCallback(async (id: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      // TODO: Connect to /api/books/{id}
      const book = await booksService.getBookById(id)

      setState((prev) => ({
        ...prev,
        currentBook: book,
        isLoading: false,
      }))

      return book
    } catch (error: any) {
      console.error("🚨 [BOOKS] Get book error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to load book details",
      }))
      throw error
    }
  }, [])

  const clearBooks = useCallback(() => {
    setState((prev) => ({
      ...prev,
      books: [],
      total: 0,
      hasMore: false,
    }))
  }, [])

  return {
    ...state,
    searchBooks,
    loadAllBooks,
    loadFeaturedBooks,
    getBookById,
    clearBooks,
  }
}
