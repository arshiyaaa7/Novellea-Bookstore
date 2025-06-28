"use client"

// =============================================================================
// ORDERS HOOK - React Hook for Order Management
// =============================================================================

import { useState, useEffect, useCallback } from "react"
import { userService, orderService, type Order } from "@/lib/api"
import { useAuth } from "./useAuth"

interface OrdersState {
  orders: Order[]
  currentOrder: Order | null
  isLoading: boolean
  error: string | null
}

export function useOrders() {
  const { isAuthenticated } = useAuth()
  const [state, setState] = useState<OrdersState>({
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null,
  })

  // Load orders when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadOrders()
    } else {
      setState((prev) => ({ ...prev, orders: [], currentOrder: null }))
    }
  }, [isAuthenticated])

  const loadOrders = useCallback(async () => {
    if (!isAuthenticated) return

    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      // TODO: Connect to /api/users/orders
      const orders = await userService.getOrders()

      setState((prev) => ({
        ...prev,
        orders,
        isLoading: false,
      }))

      return orders
    } catch (error: any) {
      console.error("🚨 [ORDERS] Load orders error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to load orders",
      }))
    }
  }, [isAuthenticated])

  const getOrderById = useCallback(async (orderId: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      // TODO: Connect to /api/users/orders/{orderId}
      const order = await userService.getOrderDetails(orderId)

      setState((prev) => ({
        ...prev,
        currentOrder: order,
        isLoading: false,
      }))

      return order
    } catch (error: any) {
      console.error("🚨 [ORDERS] Get order error:", error)
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || "Failed to load order details",
      }))
      throw error
    }
  }, [])

  const trackOrder = useCallback(async (orderId: string) => {
    try {
      // TODO: Connect to /api/orders/{orderId}/track
      const trackingInfo = await orderService.trackOrder(orderId)
      return trackingInfo
    } catch (error: any) {
      console.error("🚨 [ORDERS] Track order error:", error)
      throw error
    }
  }, [])

  return {
    ...state,
    loadOrders,
    getOrderById,
    trackOrder,
  }
}
