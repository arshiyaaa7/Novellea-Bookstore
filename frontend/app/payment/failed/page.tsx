"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { XCircle, ArrowLeft, RefreshCw, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import toast from "react-hot-toast"

export default function PaymentFailedPage() {
  const router = useRouter()

  const handleRetryPayment = () => {
    toast("Redirecting to checkout...")
    router.push("/checkout")
  }

  const handleReturnToCart = () => {
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-vintage-paper flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-vintage-paper/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-dusty-rose/20 p-8">
          {/* Failed Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <XCircle className="h-12 w-12 text-red-600" />
          </motion.div>

          {/* Failed Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="font-playfair font-bold text-deep-maroon text-3xl mb-4">Payment Failed</h1>
            <p className="text-muted-plum mb-6 leading-relaxed">
              We're sorry, but your payment could not be processed. This could be due to insufficient funds, network
              issues, or other technical problems.
            </p>
          </motion.div>

          {/* Error Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <p className="text-red-800 font-medium mb-2">Common reasons for payment failure:</p>
            <ul className="text-red-700 text-sm text-left space-y-1">
              <li>• Insufficient account balance</li>
              <li>• Incorrect card details</li>
              <li>• Network connectivity issues</li>
              <li>• Bank security restrictions</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-3"
          >
            <Button
              onClick={handleRetryPayment}
              className="w-full bg-dusty-rose hover:bg-dusty-rose/90 text-vintage-paper py-3"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </Button>

            <Button
              onClick={handleReturnToCart}
              variant="outline"
              className="w-full border-dusty-rose text-deep-maroon hover:bg-dusty-rose/10 bg-transparent"
            >
              <ArrowLeft className="ml-2 h-5 w-5" />
              Return to Cart
            </Button>

            <Link href="/books">
              <Button variant="ghost" className="w-full text-muted-plum hover:text-deep-maroon hover:bg-dusty-rose/5">
                Continue Shopping
              </Button>
            </Link>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 pt-6 border-t border-dusty-rose/20"
          >
            <p className="text-muted-plum text-sm mb-3">Need help with your payment?</p>
            <Link href="/contact">
              <Button
                variant="ghost"
                size="sm"
                className="text-dusty-rose hover:text-deep-maroon hover:bg-dusty-rose/5"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
