"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { motion } from "framer-motion"
import Image from "next/image"
import { useAuth } from "@/hooks/useAuth"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    try {
      await register(formData.name, formData.email, formData.password)

      // Redirect to dashboard
      router.push("/")
    } catch (error) {
      // Error handling is done in the useAuth hook
      console.error("Registration failed:", error)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/vintage-books-flatlay.png"
          alt="Vintage Books Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-vintage-paper/80 via-soft-ivory/75 to-vintage-paper/85" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md w-full"
        >
          <div className="bg-vintage-paper/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-dusty-rose/20 p-8 relative overflow-hidden">
            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center mb-4"
              >
                <Image
                  src="/images/brand-feather.png"
                  alt="Novellea Feather"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
              </motion.div>
              <h1 className="font-serif font-bold text-charcoal text-3xl mb-2">Join Novellea</h1>
              <p className="text-charcoal/70 font-medium">Begin your literary journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-charcoal font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700 h-5 w-5" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 border-dusty-rose/30 focus:border-amber-700 focus:ring-amber-700/20 bg-vintage-paper/50 backdrop-blur-sm transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-charcoal font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700 h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 border-dusty-rose/30 focus:border-amber-700 focus:ring-amber-700/20 bg-vintage-paper/50 backdrop-blur-sm transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-charcoal font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 border-dusty-rose/30 focus:border-amber-700 focus:ring-amber-700/20 bg-vintage-paper/50 backdrop-blur-sm transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-700 hover:text-charcoal transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-charcoal font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-700 h-5 w-5" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10 pr-10 border-dusty-rose/30 focus:border-amber-700 focus:ring-amber-700/20 bg-vintage-paper/50 backdrop-blur-sm transition-all duration-300"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-700 hover:text-charcoal transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                  className="border-amber-700 data-[state=checked]:bg-amber-700 data-[state=checked]:border-amber-700"
                  disabled={isLoading}
                />
                <Label htmlFor="terms" className="text-sm text-charcoal">
                  I agree to the{" "}
                  <Link href="/terms" className="text-amber-700 hover:underline font-medium">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-amber-700 hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-900 text-vintage-paper py-3 font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={!formData.agreeToTerms || isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6 relative z-10">
              <p className="text-charcoal">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-amber-700 hover:underline font-medium transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
