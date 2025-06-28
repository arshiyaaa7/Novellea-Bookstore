// =============================================================================
// USER PROFILE API SERVICE - User Service Integration Points
// =============================================================================

import type { User } from "./auth"

export interface UpdateProfileRequest {
  name?: string
  email?: string
  phone?: string
  address?: string
}

export interface Order {
  id: string
  date: string
  status: "Processing" | "In Transit" | "Delivered" | "Cancelled"
  total: number
  items: Array<{
    bookId: string
    title: string
    author: string
    quantity: number
    price: number
  }>
}

// =============================================================================
// USER SERVICE FUNCTIONS
// =============================================================================

const BASE_URL = "http://localhost:8080/api/users"

export const userService = {
  async getProfile(email: string): Promise<User> {
    console.log("🔄 [USER] Fetching user profile for:", email)
    const response = await fetch(`${BASE_URL}/profile/${email}`)
    if (!response.ok) throw new Error("Failed to fetch user profile")
    return response.json()
  },

  async updateProfile(updates: UpdateProfileRequest): Promise<User> {
    console.log("🔄 [USER] Updating profile:", updates)
    const token = localStorage.getItem("auth_token")
    const response = await fetch(`${BASE_URL}/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error("Failed to update profile")
    return response.json()
  },

  async getOrders(): Promise<Order[]> {
    console.log("🔄 [USER] Fetching user orders")
    const token = localStorage.getItem("auth_token")
    const response = await fetch(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error("Failed to fetch orders")
    return response.json()
  },

  async getOrderDetails(orderId: string): Promise<Order> {
    console.log("🔄 [USER] Fetching order details:", orderId)
    const token = localStorage.getItem("auth_token")
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error("Failed to fetch order details")
    return response.json()
  },

  // ✅ New: Fetch wishlist
  async getWishlist(userId: number): Promise<string[]> {
    console.log("🔄 [USER] Fetching wishlist for user ID:", userId)
    const response = await fetch(`${BASE_URL}/wishlist/${userId}`)
    if (!response.ok) throw new Error("Failed to fetch wishlist")
    return response.json()
  },

  // ✅ New: Update wishlist
  async updateWishlist(userId: number, wishlist: string[]): Promise<string[]> {
    console.log("📝 [USER] Updating wishlist for user ID:", userId, wishlist)
    const response = await fetch(`${BASE_URL}/wishlist/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wishlist),
    })
    if (!response.ok) throw new Error("Failed to update wishlist")
    return response.json()
  },
}
