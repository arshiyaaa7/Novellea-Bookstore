"use client"

// =============================================================================
// AUTHENTICATION HOOK - React Hook for Auth State Management
// =============================================================================

import { useState, useEffect, useCallback } from "react"
import { authService, userService, getToken, getUser, setToken, setUser, type User } from "@/lib/api"
import toast from "react-hot-toast"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  })

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getToken()
        const userData = getUser()

        if (token && userData) {
          // TODO: Verify token with backend when connected
          const isValid = await authService.verifyToken(token)

          if (isValid) {
            setState({
              user: userData,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            })
          } else {
            // Token invalid, clear auth data
            await logout()
          }
        } else {
          setState((prev) => ({ ...prev, isLoading: false }))
        }
      } catch (error) {
        console.error("🚨 [AUTH] Initialization error:", error)
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: "Authentication initialization failed",
        })
      }
    }

    initializeAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await authService.login({ email, password })

      setToken(response.token)
      setUser(response.user)

      if (response.refreshToken) {
        localStorage.setItem("refresh_token", response.refreshToken)
      }

      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      toast.success(`Welcome back, ${response.user.name}!`)
      return response
    } catch (error: any) {
      const errorMessage = error.message || "Login failed"
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      toast.error(errorMessage)
      throw error
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      const response = await authService.register({ name, email, password })

      setToken(response.token)
      setUser(response.user)

      if (response.refreshToken) {
        localStorage.setItem("refresh_token", response.refreshToken)
      }

      setState({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      })

      toast.success(`Welcome to Novellea, ${response.user.name}!`)
      return response
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed"
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }))
      toast.error(errorMessage)
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      await authService.logout()

      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })

      toast.success("Logged out successfully")
    } catch (error) {
      console.error("🚨 [AUTH] Logout error:", error)
      // Still clear local state even if API call fails
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    }
  }, [])

  const updateProfile = useCallback(
    async (updates: Partial<User>) => {
      if (!state.user) return

      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const updatedUser = await userService.updateProfile(updates)

        setUser(updatedUser)
        setState((prev) => ({
          ...prev,
          user: updatedUser,
          isLoading: false,
        }))

        toast.success("Profile updated successfully")
        return updatedUser
      } catch (error: any) {
        const errorMessage = error.message || "Profile update failed"
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }))
        toast.error(errorMessage)
        throw error
      }
    },
    [state.user],
  )

  return {
    ...state,
    login,
    register,
    logout,
    updateProfile,
  }
}
