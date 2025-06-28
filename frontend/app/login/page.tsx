"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await login(formData.email, formData.password)

      // ✅ Save email for later use (profile page, etc.)
      localStorage.setItem("user_email", formData.email)

      // ✅ Redirect to profile page
      router.push("/profile")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-vintage-paper flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-vintage-paper/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-dusty-rose/20 p-8 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-vintage-paper font-serif font-bold text-2xl">N</span>
            </div>
            <h1 className="font-serif font-bold text-charcoal text-2xl mb-2">Welcome Back</h1>
            <p className="text-charcoal/70">Sign in to continue your literary journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                  className="border-amber-700 data-[state=checked]:bg-amber-700"
                  disabled={isLoading}
                />
                <Label htmlFor="remember" className="text-sm text-charcoal">
                  Remember me
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-amber-700 hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-amber-800 hover:bg-amber-900 text-vintage-paper py-3 font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-charcoal">
              Don't have an account?{" "}
              <Link href="/register" className="text-amber-700 hover:underline font-medium">
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
