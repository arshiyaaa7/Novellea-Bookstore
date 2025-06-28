// =============================================================================
// AUTH API SERVICE - User Service Integration Points
// =============================================================================

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

// =============================================================================
// AUTH SERVICE FUNCTIONS
// =============================================================================

const BASE_URL = "http://localhost:8080/api/users"

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    console.log("🔄 [AUTH] Login attempt:", credentials.email)
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Login failed: ${error}`)
    }

    return await response.json()
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    console.log("🔄 [AUTH] Registration attempt:", userData.email)
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Registration failed: ${error}`)
    }

    return await response.json()
  },

  async logout(): Promise<void> {
    console.log("🔄 [AUTH] Logout")

    // Clear local storage
    localStorage.removeItem("auth_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user_data")
  },

  async refreshToken(): Promise<string> {
    console.log("🔄 [AUTH] Token refresh")
    // You can implement a backend `/refresh-token` endpoint later
    throw new Error("Token refresh not implemented")
  },

  async verifyToken(token: string): Promise<boolean> {
    console.log("🔄 [AUTH] Token verification")
    // You can implement a backend `/verify` endpoint later
    return !!token
  },
}

// =============================================================================
// AUTH UTILITIES
// =============================================================================

export const getToken = (): string | null => {
  return localStorage.getItem("auth_token")
}

export const setToken = (token: string): void => {
  localStorage.setItem("auth_token", token)
}

export const getUser = (): User | null => {
  const userData = localStorage.getItem("user_data")
  return userData ? JSON.parse(userData) : null
}

export const setUser = (user: User): void => {
  localStorage.setItem("user_data", JSON.stringify(user))
}

export const isAuthenticated = (): boolean => {
  return !!getToken()
}
