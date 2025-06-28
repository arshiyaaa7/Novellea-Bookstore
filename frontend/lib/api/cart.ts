export interface CartItem {
  id: string
  bookId: string
  title: string
  author: string
  price: number
  image?: string
  quantity: number
  isbn?: string
  category?: string
  genre?: string
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  itemCount: number
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned"
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  paymentMethod: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentId?: string
  transactionId?: string
  shippingAddress: Address
  billingAddress: Address
  trackingNumber?: string
  estimatedDelivery?: string
  deliveredAt?: string
  createdAt: string
  updatedAt: string
  notes?: string
}

export interface OrderItem {
  id: string
  bookId: string
  title: string
  author: string
  price: number
  quantity: number
  image?: string
  isbn?: string
  category?: string
}

export interface Address {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  country: string
}

export interface CreateOrderRequest {
  shippingAddress: Address
  billingAddress?: Address
  paymentMethodId: string
  paymentMethod: string
  notes?: string
  couponCode?: string
}

export interface TrackingEvent {
  id: string
  status: string
  description: string
  location?: string
  timestamp: string
  isCompleted: boolean
}

export interface OrderTrackingResponse {
  order: Order
  tracking: TrackingEvent[]
}

// =============================================================================
// CART & ORDER API SERVICE CLASS
// =============================================================================

class CartOrderApiService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
  private retryAttempts = 3
  private retryDelay = 1000

  private getAuthHeaders(): Record<string, string> {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    }

    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, config)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))

          // Handle specific error cases
          if (response.status === 401) {
            localStorage.removeItem("authToken")
            window.location.href = "/login"
            throw new Error("Authentication required")
          }

          throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
        }

        // Handle empty responses
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          return await response.json()
        } else {
          return {} as T
        }
      } catch (error) {
        console.error(`API request failed (attempt ${attempt}):`, error)

        if (attempt === this.retryAttempts) {
          throw error
        }

        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay * attempt))
      }
    }

    throw new Error("Max retry attempts reached")
  }

  // =============================================================================
  // CART ENDPOINTS
  // =============================================================================

  // GET /api/cart - Get user's cart
  async getCart(): Promise<Cart> {
    console.log("🛒 [CART API] Fetching cart...")

    try {
      const cart = await this.makeRequest<Cart>("/cart")
      console.log("✅ [CART API] Cart fetched successfully:", { itemCount: cart.items.length })
      return cart
    } catch (error) {
      console.warn("⚠️ [CART API] Cart not found, returning empty cart")
      // Return empty cart if user doesn't have one yet
      return this.createEmptyCart()
    }
  }

  // POST /api/cart/items - Add item to cart
  async addToCart(bookId: string, quantity = 1): Promise<Cart> {
    console.log("🛒 [CART API] Adding item to cart:", { bookId, quantity })

    const cart = await this.makeRequest<Cart>("/cart/items", {
      method: "POST",
      body: JSON.stringify({ bookId, quantity }),
    })

    console.log("✅ [CART API] Item added to cart successfully")
    return cart
  }

  // PUT /api/cart/items/{itemId} - Update cart item quantity
  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    console.log("🛒 [CART API] Updating cart item:", { itemId, quantity })

    const cart = await this.makeRequest<Cart>(`/cart/items/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    })

    console.log("✅ [CART API] Cart item updated successfully")
    return cart
  }

  // DELETE /api/cart/items/{itemId} - Remove item from cart
  async removeFromCart(itemId: string): Promise<Cart> {
    console.log("🛒 [CART API] Removing item from cart:", itemId)

    const cart = await this.makeRequest<Cart>(`/cart/items/${itemId}`, {
      method: "DELETE",
    })

    console.log("✅ [CART API] Item removed from cart successfully")
    return cart
  }

  // DELETE /api/cart - Clear entire cart
  async clearCart(): Promise<void> {
    console.log("🛒 [CART API] Clearing cart...")

    await this.makeRequest<void>("/cart", {
      method: "DELETE",
    })

    console.log("✅ [CART API] Cart cleared successfully")
  }

  // POST /api/cart/sync - Sync local cart with server
  async syncCart(localItems: CartItem[]): Promise<Cart> {
    console.log("🛒 [CART API] Syncing cart with server:", { itemCount: localItems.length })

    const cart = await this.makeRequest<Cart>("/cart/sync", {
      method: "POST",
      body: JSON.stringify({ items: localItems }),
    })

    console.log("✅ [CART API] Cart synced successfully")
    return cart
  }

  // GET /api/cart/count - Get cart item count
  async getCartCount(): Promise<number> {
    try {
      const response = await this.makeRequest<{ count: number }>("/cart/count")
      return response.count || 0
    } catch (error) {
      console.warn("⚠️ [CART API] Failed to get cart count, returning 0")
      return 0
    }
  }

  // =============================================================================
  // ORDER ENDPOINTS
  // =============================================================================

  // POST /api/orders - Create order from cart
  async createOrder(request: CreateOrderRequest): Promise<Order> {
    console.log("📦 [ORDER API] Creating order...")

    const order = await this.makeRequest<Order>("/orders", {
      method: "POST",
      body: JSON.stringify({
        ...request,
        timestamp: new Date().toISOString(),
      }),
    })

    console.log("✅ [ORDER API] Order created successfully:", {
      orderId: order.id,
      orderNumber: order.orderNumber,
    })

    return order
  }

  // GET /api/orders - Get user's orders with pagination
  async getOrders(
    page = 1,
    limit = 10,
    filters?: {
      status?: Order["status"]
      paymentStatus?: Order["paymentStatus"]
      dateFrom?: string
      dateTo?: string
      search?: string
    },
  ): Promise<{
    orders: Order[]
    total: number
    page: number
    limit: number
    totalPages: number
  }> {
    console.log("📦 [ORDER API] Fetching orders:", { page, limit, filters })

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    })

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })
    }

    const response = await this.makeRequest<{
      orders: Order[]
      total: number
      page: number
      limit: number
      totalPages: number
    }>(`/orders?${params}`)

    console.log("✅ [ORDER API] Orders fetched successfully:", {
      orderCount: response.orders.length,
      total: response.total,
    })

    return response
  }

  // GET /api/orders/{orderId} - Get specific order
  async getOrderById(orderId: string): Promise<Order> {
    console.log("📦 [ORDER API] Fetching order:", orderId)

    const order = await this.makeRequest<Order>(`/orders/${orderId}`)

    console.log("✅ [ORDER API] Order fetched successfully:", {
      orderId: order.id,
      status: order.status,
    })

    return order
  }

  // PUT /api/orders/{orderId}/status - Update order status (admin only)
  async updateOrderStatus(
    orderId: string,
    status: Order["status"],
    trackingNumber?: string,
    notes?: string,
  ): Promise<Order> {
    console.log("📦 [ORDER API] Updating order status:", { orderId, status })

    const order = await this.makeRequest<Order>(`/orders/${orderId}/status`, {
      method: "PUT",
      body: JSON.stringify({
        status,
        trackingNumber,
        notes,
        timestamp: new Date().toISOString(),
      }),
    })

    console.log("✅ [ORDER API] Order status updated successfully")
    return order
  }

  // POST /api/orders/{orderId}/cancel - Cancel order
  async cancelOrder(orderId: string, reason?: string): Promise<Order> {
    console.log("📦 [ORDER API] Cancelling order:", { orderId, reason })

    const order = await this.makeRequest<Order>(`/orders/${orderId}/cancel`, {
      method: "POST",
      body: JSON.stringify({
        reason: reason || "Customer requested cancellation",
        timestamp: new Date().toISOString(),
      }),
    })

    console.log("✅ [ORDER API] Order cancelled successfully")
    return order
  }

  // POST /api/orders/{orderId}/return - Return order
  async returnOrder(
    orderId: string,
    items: Array<{ itemId: string; quantity: number; reason: string }>,
    reason: string,
  ): Promise<Order> {
    console.log("📦 [ORDER API] Processing order return:", { orderId, itemCount: items.length })

    const order = await this.makeRequest<Order>(`/orders/${orderId}/return`, {
      method: "POST",
      body: JSON.stringify({
        items,
        reason,
        timestamp: new Date().toISOString(),
      }),
    })

    console.log("✅ [ORDER API] Order return processed successfully")
    return order
  }

  // GET /api/orders/{orderId}/track - Track order
  async trackOrder(orderId: string): Promise<OrderTrackingResponse> {
    console.log("📦 [ORDER API] Tracking order:", orderId)

    const trackingData = await this.makeRequest<OrderTrackingResponse>(`/orders/${orderId}/track`)

    console.log("✅ [ORDER API] Order tracking fetched successfully:", {
      orderId: trackingData.order.id,
      eventCount: trackingData.tracking.length,
    })

    return trackingData
  }

  // GET /api/orders/track/{orderNumber} - Track order by order number
  async trackOrderByNumber(orderNumber: string): Promise<OrderTrackingResponse> {
    console.log("📦 [ORDER API] Tracking order by number:", orderNumber)

    const trackingData = await this.makeRequest<OrderTrackingResponse>(`/orders/track/${orderNumber}`)

    console.log("✅ [ORDER API] Order tracking fetched successfully")
    return trackingData
  }

  // GET /api/orders/{orderId}/invoice - Download invoice
  async downloadInvoice(orderId: string): Promise<Blob> {
    console.log("📦 [ORDER API] Downloading invoice:", orderId)

    const response = await fetch(`${this.baseUrl}/orders/${orderId}/invoice`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to download invoice: ${response.status}`)
    }

    console.log("✅ [ORDER API] Invoice downloaded successfully")
    return await response.blob()
  }

  // POST /api/orders/{orderId}/reorder - Reorder items
  async reorderItems(orderId: string): Promise<Cart> {
    console.log("📦 [ORDER API] Reordering items from order:", orderId)

    const cart = await this.makeRequest<Cart>(`/orders/${orderId}/reorder`, {
      method: "POST",
    })

    console.log("✅ [ORDER API] Items reordered successfully")
    return cart
  }

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  private createEmptyCart(): Cart {
    return {
      id: "",
      userId: "",
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 0,
      itemCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  calculateCartTotals(items: CartItem[]): {
    subtotal: number
    shipping: number
    tax: number
    total: number
    itemCount: number
  } {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const shipping = subtotal > 500 ? 0 : 50 // Free shipping over ₹500
    const tax = Math.round(subtotal * 0.18) // 18% GST
    const total = subtotal + shipping + tax

    return { subtotal, shipping, tax, total, itemCount }
  }

  getOrderStatusColor(status: Order["status"]): string {
    const statusColors = {
      pending: "text-yellow-600 bg-yellow-50",
      confirmed: "text-blue-600 bg-blue-50",
      processing: "text-purple-600 bg-purple-50",
      shipped: "text-indigo-600 bg-indigo-50",
      delivered: "text-green-600 bg-green-50",
      cancelled: "text-red-600 bg-red-50",
      returned: "text-gray-600 bg-gray-50",
    }
    return statusColors[status] || "text-gray-600 bg-gray-50"
  }

  getOrderStatusLabel(status: Order["status"]): string {
    const statusLabels = {
      pending: "Pending",
      confirmed: "Confirmed",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
      cancelled: "Cancelled",
      returned: "Returned",
    }
    return statusLabels[status] || status
  }

  getPaymentStatusColor(status: Order["paymentStatus"]): string {
    const statusColors = {
      pending: "text-yellow-600 bg-yellow-50",
      paid: "text-green-600 bg-green-50",
      failed: "text-red-600 bg-red-50",
      refunded: "text-gray-600 bg-gray-50",
    }
    return statusColors[status] || "text-gray-600 bg-gray-50"
  }

  canCancelOrder(order: Order): boolean {
    return ["pending", "confirmed"].includes(order.status) && order.paymentStatus !== "refunded"
  }

  canReturnOrder(order: Order): boolean {
    if (order.status !== "delivered") return false

    // Allow returns within 30 days of delivery
    if (order.deliveredAt) {
      const deliveryDate = new Date(order.deliveredAt)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      return deliveryDate > thirtyDaysAgo
    }

    return false
  }

  canReorder(order: Order): boolean {
    return !["cancelled", "returned"].includes(order.status)
  }

  formatOrderNumber(orderNumber: string): string {
    return `#${orderNumber.toUpperCase()}`
  }

  calculateEstimatedDelivery(order: Order): Date {
    const orderDate = new Date(order.createdAt)
    const deliveryDate = new Date(orderDate)

    // Add business days based on shipping method
    const businessDaysToAdd = order.shipping === 0 ? 5 : 3 // Standard vs Express

    let addedDays = 0
    while (addedDays < businessDaysToAdd) {
      deliveryDate.setDate(deliveryDate.getDate() + 1)
      // Skip weekends
      if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
        addedDays++
      }
    }

    return deliveryDate
  }

  generateTrackingEvents(order: Order): TrackingEvent[] {
    const events: TrackingEvent[] = []
    const orderDate = new Date(order.createdAt)

    // Order placed
    events.push({
      id: "1",
      status: "Order Placed",
      description: "Your order has been placed successfully",
      timestamp: orderDate.toISOString(),
      isCompleted: true,
    })

    // Order confirmed
    if (["confirmed", "processing", "shipped", "delivered"].includes(order.status)) {
      const confirmedDate = new Date(orderDate)
      confirmedDate.setHours(confirmedDate.getHours() + 1)
      events.push({
        id: "2",
        status: "Order Confirmed",
        description: "Your order has been confirmed and is being prepared",
        timestamp: confirmedDate.toISOString(),
        isCompleted: true,
      })
    }

    // Processing
    if (["processing", "shipped", "delivered"].includes(order.status)) {
      const processingDate = new Date(orderDate)
      processingDate.setDate(processingDate.getDate() + 1)
      events.push({
        id: "3",
        status: "Processing",
        description: "Your order is being processed and packed",
        timestamp: processingDate.toISOString(),
        isCompleted: true,
      })
    }

    // Shipped
    if (["shipped", "delivered"].includes(order.status)) {
      const shippedDate = new Date(orderDate)
      shippedDate.setDate(shippedDate.getDate() + 2)
      events.push({
        id: "4",
        status: "Shipped",
        description: `Your order has been shipped${order.trackingNumber ? ` (Tracking: ${order.trackingNumber})` : ""}`,
        timestamp: shippedDate.toISOString(),
        isCompleted: true,
      })
    }

    // Out for delivery
    if (order.status === "delivered") {
      const outForDeliveryDate = new Date(order.deliveredAt || new Date())
      outForDeliveryDate.setHours(outForDeliveryDate.getHours() - 2)
      events.push({
        id: "5",
        status: "Out for Delivery",
        description: "Your order is out for delivery",
        timestamp: outForDeliveryDate.toISOString(),
        isCompleted: true,
      })
    }

    // Delivered
    if (order.status === "delivered" && order.deliveredAt) {
      events.push({
        id: "6",
        status: "Delivered",
        description: "Your order has been delivered successfully",
        timestamp: order.deliveredAt,
        isCompleted: true,
      })
    }

    return events
  }
}

// Export singleton instance
export const cartOrderApiService = new CartOrderApiService()

// Export all types without comma to avoid syntax error
// export type {
//   Cart,
//   CartItem,
//   Order,
//   OrderItem,
//   Address,
//   CreateOrderRequest,
//   TrackingEvent,
// } 
