export interface PaymentMethod {
  id: string
  type: "card" | "upi" | "netbanking" | "wallet" | "cod"
  name: string
  details: {
    // For cards
    last4?: string
    brand?: string
    expiryMonth?: number
    expiryYear?: number
    // For UPI
    vpa?: string
    // For wallets
    walletName?: string
    // For net banking
    bankName?: string
  }
  isDefault: boolean
  createdAt: string
}

export interface PaymentRequest {
  orderId: string
  amount: number
  currency: string
  paymentMethodId: string
  paymentMethod: PaymentMethod["type"]
  customerInfo: {
    name: string
    email: string
    phone: string
  }
  billingAddress: {
    address: string
    city: string
    state: string
    pincode: string
    country: string
  }
  returnUrl?: string
  webhookUrl?: string
  metadata?: Record<string, any>
}

export interface PaymentResponse {
  paymentId: string
  orderId: string
  status: "pending" | "processing" | "completed" | "failed" | "cancelled"
  amount: number
  currency: string
  paymentMethod: PaymentMethod["type"]
  transactionId?: string
  gatewayResponse?: any
  redirectUrl?: string
  qrCode?: string // For UPI payments
  createdAt: string
  completedAt?: string
  failureReason?: string
}

export interface PaymentStatus {
  paymentId: string
  orderId: string
  status: PaymentResponse["status"]
  amount: number
  currency: string
  transactionId?: string
  gatewayTransactionId?: string
  paymentMethod: PaymentMethod["type"]
  createdAt: string
  updatedAt: string
  completedAt?: string
  failureReason?: string
  refundAmount?: number
  refundStatus?: "none" | "partial" | "full" | "processing" | "failed"
}

export interface RefundRequest {
  paymentId: string
  amount?: number // Partial refund amount, if not provided, full refund
  reason: string
  notes?: string
}

export interface RefundResponse {
  refundId: string
  paymentId: string
  orderId: string
  amount: number
  status: "processing" | "completed" | "failed"
  reason: string
  gatewayRefundId?: string
  createdAt: string
  completedAt?: string
  failureReason?: string
}

export interface WebhookPayload {
  event: "payment.completed" | "payment.failed" | "payment.cancelled" | "refund.completed" | "refund.failed"
  paymentId: string
  orderId: string
  status: string
  amount: number
  currency: string
  transactionId?: string
  timestamp: string
  signature: string
  data: any
}

class PaymentApiService {
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

          if (response.status === 401) {
            localStorage.removeItem("authToken")
            window.location.href = "/login"
            throw new Error("Authentication required")
          }

          throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
        }

        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          return await response.json()
        } else {
          return {} as T
        }
      } catch (error) {
        console.error(`Payment API request failed (attempt ${attempt}):`, error)

        if (attempt === this.retryAttempts) {
          throw error
        }

        await new Promise((resolve) => setTimeout(resolve, this.retryDelay * attempt))
      }
    }

    throw new Error("Max retry attempts reached")
  }

  // =============================================================================
  // PAYMENT METHODS
  // =============================================================================

  // GET /api/payment/methods - Get user's saved payment methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    console.log("💳 [PAYMENT API] Fetching payment methods...")

    const methods = await this.makeRequest<PaymentMethod[]>("/payment/methods")

    console.log("✅ [PAYMENT API] Payment methods fetched:", { count: methods.length })
    return methods
  }

  // POST /api/payment/methods - Add new payment method
  async addPaymentMethod(method: Omit<PaymentMethod, "id" | "createdAt">): Promise<PaymentMethod> {
    console.log("💳 [PAYMENT API] Adding payment method:", method.type)

    const newMethod = await this.makeRequest<PaymentMethod>("/payment/methods", {
      method: "POST",
      body: JSON.stringify(method),
    })

    console.log("✅ [PAYMENT API] Payment method added successfully")
    return newMethod
  }

  // DELETE /api/payment/methods/{methodId} - Remove payment method
  async removePaymentMethod(methodId: string): Promise<void> {
    console.log("💳 [PAYMENT API] Removing payment method:", methodId)

    await this.makeRequest<void>(`/payment/methods/${methodId}`, {
      method: "DELETE",
    })

    console.log("✅ [PAYMENT API] Payment method removed successfully")
  }

  // PUT /api/payment/methods/{methodId}/default - Set default payment method
  async setDefaultPaymentMethod(methodId: string): Promise<PaymentMethod> {
    console.log("💳 [PAYMENT API] Setting default payment method:", methodId)

    const method = await this.makeRequest<PaymentMethod>(`/payment/methods/${methodId}/default`, {
      method: "PUT",
    })

    console.log("✅ [PAYMENT API] Default payment method set successfully")
    return method
  }

  // =============================================================================
  // PAYMENT PROCESSING
  // =============================================================================

  // POST /api/payment/initiate - Initiate payment
  async initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
    console.log("💳 [PAYMENT API] Initiating payment:", {
      orderId: request.orderId,
      amount: request.amount,
      paymentMethod: request.paymentMethod,
    })

    const payment = await this.makeRequest<PaymentResponse>("/payment/initiate", {
      method: "POST",
      body: JSON.stringify({
        ...request,
        timestamp: new Date().toISOString(),
      }),
    })

    console.log("✅ [PAYMENT API] Payment initiated successfully:", {
      paymentId: payment.paymentId,
      status: payment.status,
    })

    return payment
  }

  // GET /api/payment/{paymentId}/status - Get payment status
  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    console.log("💳 [PAYMENT API] Checking payment status:", paymentId)

    const status = await this.makeRequest<PaymentStatus>(`/payment/${paymentId}/status`)

    console.log("✅ [PAYMENT API] Payment status fetched:", {
      paymentId: status.paymentId,
      status: status.status,
    })

    return status
  }

  // POST /api/payment/{paymentId}/confirm - Confirm payment (for certain payment methods)
  async confirmPayment(paymentId: string, confirmationData?: any): Promise<PaymentResponse> {
    console.log("💳 [PAYMENT API] Confirming payment:", paymentId)

    const payment = await this.makeRequest<PaymentResponse>(`/payment/${paymentId}/confirm`, {
      method: "POST",
      body: JSON.stringify({
        confirmationData,
        timestamp: new Date().toISOString(),
      }),
    })

    console.log("✅ [PAYMENT API] Payment confirmed successfully")
    return payment
  }

  // POST /api/payment/{paymentId}/cancel - Cancel payment
  async cancelPayment(paymentId: string, reason?: string): Promise<PaymentResponse> {
    console.log("💳 [PAYMENT API] Cancelling payment:", paymentId)

    const payment = await this.makeRequest<PaymentResponse>(`/payment/${paymentId}/cancel`, {
      method: "POST",
      body: JSON.stringify({
        reason: reason || "User cancelled payment",
        timestamp: new Date().toISOString(),
      }),
    })

    console.log("✅ [PAYMENT API] Payment cancelled successfully")
    return payment
  }

  // =============================================================================
  // REFUNDS
  // =============================================================================

  // POST /api/payment/{paymentId}/refund - Process refund
  async processRefund(paymentId: string, request: Omit<RefundRequest, "paymentId">): Promise<RefundResponse> {
    console.log("💳 [PAYMENT API] Processing refund:", {
      paymentId,
      amount: request.amount,
      reason: request.reason,
    })

    const refund = await this.makeRequest<RefundResponse>(`/payment/${paymentId}/refund`, {
      method: "POST",
      body: JSON.stringify({
        ...request,
        timestamp: new Date().toISOString(),
      }),
    })

    console.log("✅ [PAYMENT API] Refund processed successfully:", {
      refundId: refund.refundId,
      status: refund.status,
    })

    return refund
  }

  // GET /api/payment/{paymentId}/refunds - Get refund history
  async getRefundHistory(paymentId: string): Promise<RefundResponse[]> {
    console.log("💳 [PAYMENT API] Fetching refund history:", paymentId)

    const refunds = await this.makeRequest<RefundResponse[]>(`/payment/${paymentId}/refunds`)

    console.log("✅ [PAYMENT API] Refund history fetched:", { count: refunds.length })
    return refunds
  }

  // GET /api/payment/refunds/{refundId}/status - Get refund status
  async getRefundStatus(refundId: string): Promise<RefundResponse> {
    console.log("💳 [PAYMENT API] Checking refund status:", refundId)

    const refund = await this.makeRequest<RefundResponse>(`/payment/refunds/${refundId}/status`)

    console.log("✅ [PAYMENT API] Refund status fetched:", {
      refundId: refund.refundId,
      status: refund.status,
    })

    return refund
  }

  // =============================================================================
  // WEBHOOKS
  // =============================================================================

  // POST /api/payment/webhook - Handle payment webhook
  async handleWebhook(payload: WebhookPayload): Promise<{ success: boolean; message: string }> {
    console.log("💳 [PAYMENT API] Handling webhook:", {
      event: payload.event,
      paymentId: payload.paymentId,
    })

    const result = await this.makeRequest<{ success: boolean; message: string }>("/payment/webhook", {
      method: "POST",
      body: JSON.stringify(payload),
    })

    console.log("✅ [PAYMENT API] Webhook handled successfully")
    return result
  }

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  getPaymentMethodIcon(type: PaymentMethod["type"]): string {
    const icons = {
      card: "💳",
      upi: "📱",
      netbanking: "🏦",
      wallet: "👛",
      cod: "💵",
    }
    return icons[type] || "💳"
  }

  getPaymentMethodName(type: PaymentMethod["type"]): string {
    const names = {
      card: "Credit/Debit Card",
      upi: "UPI",
      netbanking: "Net Banking",
      wallet: "Digital Wallet",
      cod: "Cash on Delivery",
    }
    return names[type] || type
  }

  getPaymentStatusColor(status: PaymentResponse["status"]): string {
    const colors = {
      pending: "text-yellow-600 bg-yellow-50",
      processing: "text-blue-600 bg-blue-50",
      completed: "text-green-600 bg-green-50",
      failed: "text-red-600 bg-red-50",
      cancelled: "text-gray-600 bg-gray-50",
    }
    return colors[status] || "text-gray-600 bg-gray-50"
  }

  getPaymentStatusLabel(status: PaymentResponse["status"]): string {
    const labels = {
      pending: "Pending",
      processing: "Processing",
      completed: "Completed",
      failed: "Failed",
      cancelled: "Cancelled",
    }
    return labels[status] || status
  }

  formatAmount(amount: number, currency = "INR"): string {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  formatCardNumber(cardNumber: string): string {
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")
  }

  maskCardNumber(cardNumber: string): string {
    if (cardNumber.length < 4) return cardNumber
    return "**** **** **** " + cardNumber.slice(-4)
  }

  validateCardNumber(cardNumber: string): boolean {
    // Luhn algorithm for card validation
    const digits = cardNumber.replace(/\D/g, "")
    let sum = 0
    let isEven = false

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = Number.parseInt(digits[i])

      if (isEven) {
        digit *= 2
        if (digit > 9) {
          digit -= 9
        }
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0
  }

  validateUPI(vpa: string): boolean {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/
    return upiRegex.test(vpa)
  }

  generatePaymentReference(): string {
    return "PAY_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9).toUpperCase()
  }

  calculateProcessingFee(amount: number, paymentMethod: PaymentMethod["type"]): number {
    const feeRates = {
      card: 0.02, // 2%
      upi: 0.005, // 0.5%
      netbanking: 0.015, // 1.5%
      wallet: 0.01, // 1%
      cod: 25, // Flat ₹25
    }

    if (paymentMethod === "cod") {
      return feeRates.cod
    }

    return Math.round(amount * feeRates[paymentMethod] * 100) / 100
  }

  isPaymentMethodAvailable(type: PaymentMethod["type"], amount: number): boolean {
    // COD not available for orders above ₹50,000
    if (type === "cod" && amount > 50000) {
      return false
    }

    // UPI has a limit of ₹1,00,000 per transaction
    if (type === "upi" && amount > 100000) {
      return false
    }

    return true
  }
}

// Export singleton instance
export const paymentApiService = new PaymentApiService()

// // Export all types
// export type {
//   PaymentMethod,
//   PaymentRequest,
//   PaymentResponse,
//   PaymentStatus,
//   RefundRequest,
//   RefundResponse,
//   WebhookPayload,
// }
