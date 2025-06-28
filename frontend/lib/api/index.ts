// =============================================================================
// API SERVICES BARREL EXPORT
// =============================================================================

// Export all API services for easy importing
export * from "./auth"
export * from "./user"
export * from "./books"
export * from "./cart"

// =============================================================================
// API CONFIGURATION
// =============================================================================

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
}

// =============================================================================
// API UTILITIES
// =============================================================================

export const apiUtils = {
  // Helper to create authenticated headers
  getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem("auth_token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  },

  // Helper to handle API errors
  handleApiError(error: any): never {
    console.error("🚨 [API] Error:", error)

    if (error.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_data")
      window.location.href = "/login"
    }

    throw error
  },

  // Helper to make authenticated requests
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const headers = {
      ...this.getAuthHeaders(),
      ...options.headers,
    }

    const response = await fetch(`${API_CONFIG.BASE_URL}${url}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      this.handleApiError({
        status: response.status,
        message: await response.text(),
      })
    }

    return response
  },
}

// =============================================================================
// MOCK DATA TOGGLE
// =============================================================================

// Set this to false when connecting to real backend
export const USE_MOCK_DATA = true

// Helper to conditionally use mock or real data
export const withMockFallback = <T>(mockFn: () => Promise<T>, realFn: () => Promise<T>): Promise<T> => {
  return USE_MOCK_DATA ? mockFn() : realFn();
}
