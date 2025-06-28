"use client"

// =============================================================================
// CART HOOK - React Hook for Cart State Management
// =============================================================================

import { useState, useEffect, useCallback } from "react"
import { cartService, paymentService, type Cart, type PaymentRequest } from "@/lib/api"
import { useAuth } from "./useAuth"
import toast from "react-hot-toast"

interface CartState {
  cart: Cart | null
  isLoading: boolean
  isUpdating: boolean
  error: string | null
}

export function useCart() {
  const { user, isAuthenticated } = useAuth()
  const [state, setState] = useState<CartState>({
    cart: null,
    isLoading: false,
    isUpdating: false,
    error: null,
  })

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadCart()
    } else {
      setState((prev) => ({ ...prev, cart: null }))
    }
  }, [isAuthenticated, user?.id])

  const loadCart = useCallback(async () => {
    if (!isAuthenticated || !user?.id) return

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      const cart = await cartService.getCart(user.id)

      setState((prev) => ({
        ...prev,
        cart,
        isLoading: false,
      }))

      return cart
    } catch (error: any) {
      console.error("🚨 [CART] Load cart error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to load cart",
      }))
    }
  }, [isAuthenticated, user?.id])

  const addToCart = useCallback(
    async (bookId: string, quantity = 1) => {
      if (!isAuthenticated || !user?.id) {
        toast.error("Please login to add items to cart")
        return
      }

      try {
        setState((prev) => ({ ...prev, isUpdating: true, error: null }))

        const updatedCart = await cartService.addToCart(user.id, bookId, quantity)

        setState((prev) => ({
          ...prev,
          cart: updatedCart,
          isUpdating: false,
        }))

        toast.success("Item added to cart")
        return updatedCart
      } catch (error: any) {
        console.error("🚨 [CART] Add to cart error:", error)
        setState((prev) => ({
          ...prev,
          isUpdating: false,
          error: error.message || "Failed to add item to cart",
        }))
        toast.error("Failed to add item to cart")
        throw error
      }
    },
    [isAuthenticated, user?.id],
  )

  const updateCartItem = useCallback(
    async (itemId: string, quantity: number) => {
      if (!user?.id) return

      try {
        setState((prev) => ({ ...prev, isUpdating: true, error: null }))

        const updatedCart = await cartService.updateCartItem(user.id, itemId, quantity)

        setState((prev) => ({
          ...prev,
          cart: updatedCart,
          isUpdating: false,
        }))

        return updatedCart
      } catch (error: any) {
        console.error("🚨 [CART] Update cart error:", error)
        setState((prev) => ({
          ...prev,
          isUpdating: false,
          error: error.message || "Failed to update cart",
        }))
        toast.error("Failed to update cart")
        throw error
      }
    },
    [user?.id],
  )

  const removeFromCart = useCallback(
    async (itemId: string) => {
      if (!user?.id) return

      try {
        setState((prev) => ({ ...prev, isUpdating: true, error: null }))

        const updatedCart = await cartService.removeFromCart(user.id, itemId)

        setState((prev) => ({
          ...prev,
          cart: updatedCart,
          isUpdating: false,
        }))

        return updatedCart
      } catch (error: any) {
        console.error("🚨 [CART] Remove from cart error:", error)
        setState((prev) => ({
          ...prev,
          isUpdating: false,
          error: error.message || "Failed to remove item",
        }))
        throw error
      }
    },
    [user?.id],
  )

  const clearCart = useCallback(async () => {
    if (!user?.id) return

    try {
      setState((prev) => ({ ...prev, isUpdating: true, error: null }))

      await cartService.clearCart(user.id)

      setState((prev) => ({
        ...prev,
        cart: {
          id: `cart-${user.id}`,
          items: [],
          subtotal: 0,
          shipping: 0,
          total: 0,
          itemCount: 0,
        },
        isUpdating: false,
      }))
    } catch (error: any) {
      console.error("🚨 [CART] Clear cart error:", error)
      setState((prev) => ({
        ...prev,
        isUpdating: false,
        error: error.message || "Failed to clear cart",
      }))
      throw error
    }
  }, [user?.id])

  const initiatePayment = useCallback(async (paymentData: PaymentRequest) => {
    try {
      setState((prev) => ({ ...prev, isUpdating: true, error: null }))

      const result = await paymentService.initiatePayment(paymentData)

      setState((prev) => ({
        ...prev,
        isUpdating: false,
      }))

      return result
    } catch (error: any) {
      console.error("🚨 [CART] Payment initiation error:", error)
      setState((prev) => ({
        ...prev,
        isUpdating: false,
        error: error.message || "Failed to initiate payment",
      }))
      throw error
    }
  }, [])

  return {
    ...state,
    loadCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    initiatePayment,
  }
}
