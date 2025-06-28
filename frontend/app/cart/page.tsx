"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

export default function CartPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { cart, isLoading, isUpdating, updateCartItem, removeFromCart, clearCart, loadCart } = useCart()
  const [clearingCart, setClearingCart] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/cart")
      return
    }

    if (isAuthenticated && !cart) {
      loadCart()
    }
  }, [isAuthenticated, cart, loadCart, router])

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveItem(itemId)
      return
    }

    try {
      await updateCartItem(itemId, newQuantity)
    } catch (error) {
      console.error("Failed to update quantity:", error)
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId)
      toast.success("Item removed from cart")
    } catch (error) {
      console.error("Failed to remove item:", error)
      toast.error("Failed to remove item")
    }
  }

  const handleClearCart = async () => {
    try {
      setClearingCart(true)
      await clearCart()
      toast.success("Cart cleared")
    } catch (error) {
      console.error("Failed to clear cart:", error)
      toast.error("Failed to clear cart")
    } finally {
      setClearingCart(false)
    }
  }

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) {
      toast.error("Your cart is empty")
      return
    }
    router.push("/checkout")
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-blush py-16">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-rose-gold">Loading your cart...</p>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-blush py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-rose-gold mx-auto mb-6" />
            <h1 className="font-playfair font-bold text-maroon text-3xl mb-4">Please Sign In</h1>
            <p className="text-rose-gold mb-8">You need to be signed in to view your cart.</p>
            <Link href="/login?redirect=/cart">
              <Button className="shimmer-hover text-cream">
                Sign In
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Empty cart
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-blush py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-rose-gold mx-auto mb-6" />
            <h1 className="font-playfair font-bold text-maroon text-3xl mb-4">Your Cart is Empty</h1>
            <p className="text-rose-gold mb-8">Looks like you haven't added any books to your cart yet.</p>
            <Link href="/books">
              <Button className="shimmer-hover text-cream">
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blush py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-playfair font-bold text-maroon text-4xl mb-2">Shopping Cart</h1>
          <p className="text-rose-gold">
            {cart.itemCount} {cart.itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-playfair font-semibold text-maroon text-xl">Your Items</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearCart}
                disabled={clearingCart || isUpdating}
                className="border-red-500 text-red-600 hover:bg-red-50 bg-transparent"
              >
                {clearingCart ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
                Clear Cart
              </Button>
            </div>

            <AnimatePresence>
              {cart.items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-cream rounded-lg p-6 border border-rose-gold-light shadow-sm"
                >
                  <div className="flex gap-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={120}
                      className="rounded border border-rose-gold-light flex-shrink-0"
                    />

                    <div className="flex-1">
                      <h3 className="font-playfair font-semibold text-maroon text-lg mb-1">{item.title}</h3>
                      <p className="text-rose-gold mb-3">by {item.author}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-maroon font-medium">Qty:</span>
                          <div className="flex items-center border border-rose-gold-light rounded">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 text-maroon hover:text-rose-gold"
                              disabled={isUpdating}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-3 py-1 text-maroon font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 text-maroon hover:text-rose-gold"
                              disabled={isUpdating}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-bold text-maroon text-lg">₹{item.price * item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            disabled={isUpdating}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream rounded-lg p-6 border border-rose-gold-light shadow-sm sticky top-8">
              <h2 className="font-playfair font-semibold text-maroon text-xl mb-6">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-maroon">
                  <span>Subtotal ({cart.itemCount} items)</span>
                  <span>₹{cart.subtotal}</span>
                </div>
                <div className="flex justify-between text-maroon">
                  <span>Shipping</span>
                  <span>{cart.shipping === 0 ? "Free" : `₹${cart.shipping}`}</span>
                </div>
                {cart.shipping === 0 && cart.subtotal > 500 && (
                  <p className="text-green-600 text-sm">🎉 Free shipping on orders over ₹500!</p>
                )}
                <Separator className="bg-rose-gold-light" />
                <div className="flex justify-between font-bold text-maroon text-lg">
                  <span>Total</span>
                  <span>₹{cart.total}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full mt-6 shimmer-hover text-cream py-3"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <Link href="/books">
                <Button
                  variant="outline"
                  className="w-full mt-3 border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-cream bg-transparent"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
