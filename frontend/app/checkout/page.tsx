"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, MapPin, User, Phone, Mail, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { motion } from "framer-motion"
import toast from "react-hot-toast"

interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  paymentMethod: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { cart, isLoading, loadCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout")
      return
    }

    if (isAuthenticated && !cart) {
      loadCart()
    }

    // Pre-fill form with user data if available
    if (user) {
      const nameParts = user.name?.split(" ") || ["", ""]
      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      }))
    }
  }, [isAuthenticated, cart, loadCart, router, user])

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = (): boolean => {
    const requiredFields: (keyof CheckoutFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ]

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`)
        return false
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return false
    }

    // Phone validation
    const phoneRegex = /^[+]?[\d\s\-()]{10,}$/
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number")
      return false
    }

    return true
  }

  const handlePayment = async () => {
    if (!cart || cart.items.length === 0) {
      toast.error("Your cart is empty")
      router.push("/cart")
      return
    }

    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      // Initiate payment
      const paymentData = {
        userId: user?.id,
        totalAmount: cart.total,
        items: cart.items.map((item) => ({
          bookId: item.bookId,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
      }

      // TODO: Replace with actual API call
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify(paymentData),
      })

      if (!response.ok) {
        throw new Error("Payment initiation failed")
      }

      const result = await response.json()

      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate webhook response
      const webhookResponse = await simulateWebhookResponse()

      if (webhookResponse.status === "SUCCESS") {
        router.push(`/payment/success?orderId=${result.orderId || "mock-order-id"}`)
      } else {
        router.push("/payment/failed")
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed. Please try again.")
      router.push("/payment/failed")
    } finally {
      setIsProcessing(false)
    }
  }

  // Simulate webhook response
  const simulateWebhookResponse = async (): Promise<{ status: "SUCCESS" | "FAILED" }> => {
    // Mock webhook response - 80% success rate
    return new Promise((resolve) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2
        resolve({ status: isSuccess ? "SUCCESS" : "FAILED" })
      }, 1000)
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-blush py-16">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-rose-gold">Loading checkout...</p>
        </div>
      </div>
    )
  }

  // Empty cart redirect
  if (!cart || cart.items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-blush py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-maroon hover:text-rose-gold hover:bg-cream"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Button>

        <div className="text-center mb-8">
          <h1 className="font-playfair font-bold text-maroon text-4xl mb-2">Checkout</h1>
          <p className="text-rose-gold">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-cream rounded-lg p-6 border border-rose-gold-light shadow-sm"
          >
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="font-playfair font-semibold text-maroon text-xl mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-rose-gold" />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-maroon">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="border-rose-gold-light focus:border-rose-gold"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-maroon">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="border-rose-gold-light focus:border-rose-gold"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-maroon">
                      Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-gold h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="pl-10 border-rose-gold-light focus:border-rose-gold"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-maroon">
                      Phone *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-gold h-4 w-4" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10 border-rose-gold-light focus:border-rose-gold"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-rose-gold-light" />

              {/* Delivery Address */}
              <div>
                <h2 className="font-playfair font-semibold text-maroon text-xl mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-rose-gold" />
                  Delivery Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-maroon">
                      Street Address *
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="border-rose-gold-light focus:border-rose-gold"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-maroon">
                        City *
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="border-rose-gold-light focus:border-rose-gold"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-maroon">
                        State *
                      </Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger className="border-rose-gold-light focus:border-rose-gold">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="delhi">Delhi</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                          <SelectItem value="gujarat">Gujarat</SelectItem>
                          <SelectItem value="rajasthan">Rajasthan</SelectItem>
                          <SelectItem value="west-bengal">West Bengal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="pincode" className="text-maroon">
                        PIN Code *
                      </Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        className="border-rose-gold-light focus:border-rose-gold"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-rose-gold-light" />

              {/* Payment Method */}
              <div>
                <h2 className="font-playfair font-semibold text-maroon text-xl mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-rose-gold" />
                  Payment Method
                </h2>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <SelectTrigger className="border-rose-gold-light focus:border-rose-gold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="netbanking">Net Banking</SelectItem>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-cream rounded-lg p-6 border border-rose-gold-light shadow-sm h-fit sticky top-8"
          >
            <h2 className="font-playfair font-semibold text-maroon text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="text-maroon font-medium">{item.title}</p>
                    <p className="text-rose-gold text-sm">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <span className="text-maroon font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <Separator className="bg-rose-gold-light mb-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-maroon">
                <span>Subtotal ({cart.itemCount} items)</span>
                <span>₹{cart.subtotal}</span>
              </div>
              <div className="flex justify-between text-maroon">
                <span>Shipping</span>
                <span>{cart.shipping === 0 ? "Free" : `₹${cart.shipping}`}</span>
              </div>
              <Separator className="bg-rose-gold-light" />
              <div className="flex justify-between font-bold text-maroon text-lg">
                <span>Total</span>
                <span>₹{cart.total}</span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full mt-6 shimmer-hover text-cream py-3"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Processing Payment...
                </div>
              ) : (
                `Confirm Payment - ₹${cart.total}`
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
