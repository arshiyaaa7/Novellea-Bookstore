"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti animation
    if (!showConfetti) {
      setShowConfetti(true)
      const duration = 3000
      const end = Date.now() + duration

      const colors = ["#c4a484", "#4a3728", "#6b5b73"]

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()
    }

    // Clear cart from localStorage/state since payment was successful
    // This would typically be handled by the backend
  }, [showConfetti])

  return (
    <div className="min-h-screen bg-vintage-paper flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-vintage-paper/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-dusty-rose/20 p-8">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-12 w-12 text-green-600" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="font-playfair font-bold text-deep-maroon text-3xl mb-4">Payment Successful!</h1>
            <p className="text-muted-plum mb-6 leading-relaxed">
              Thank you for your purchase! Your order has been confirmed and will be processed shortly.
            </p>
          </motion.div>

          {/* Order Details */}
          {orderId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-dusty-rose/10 rounded-lg p-4 mb-6"
            >
              <p className="text-deep-maroon font-medium mb-2">Order ID</p>
              <p className="text-muted-plum font-mono text-sm">{orderId}</p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-3"
          >
            <Link href="/profile?tab=orders">
              <Button className="w-full bg-dusty-rose hover:bg-dusty-rose/90 text-vintage-paper py-3">
                <Package className="h-5 w-5 mr-2" />
                View Order Details
              </Button>
            </Link>

            <Link href="/books">
              <Button
                variant="outline"
                className="w-full border-dusty-rose text-deep-maroon hover:bg-dusty-rose/10 bg-transparent"
              >
                Continue Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/">
              <Button variant="ghost" className="w-full text-muted-plum hover:text-deep-maroon hover:bg-dusty-rose/5">
                Back to Home
              </Button>
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 pt-6 border-t border-dusty-rose/20"
          >
            <p className="text-muted-plum text-sm">
              You will receive an email confirmation shortly with your order details and tracking information.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
