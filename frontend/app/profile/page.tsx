"use client"

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

import { useEffect, useState } from "react"
import { User, Mail, Phone, MapPin, Edit, Package, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    wishlist: [],
  })

  // TODO: Fetch order history from Order Microservice using user ID or email
  const orderHistory: {
    id: string
    date: string
    status: string
    total: number
    books: string[]
  }[] = []

  useEffect(() => {
    // ✅ Fetch user profile on mount
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("user_email")
        if (!email) {
          window.location.href = "/login"
          return
        }
        const res = await fetch(`${API_BASE}/profile/${email}`)
        if (!res.ok) throw new Error("Failed to fetch profile")
        const data = await res.json()
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          wishlist: data.wishlist || [],
        })
      } catch (err) {
        console.error("Error loading profile", err)
        alert("Could not load profile.")
      }
    }
    fetchProfile()
  }, [])

  const handleSave = () => {
    fetch(`${API_BASE}/profile/${formData.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update profile")
        return res.json()
      })
      .then((data) => {
        setFormData(data)
        setIsEditing(false)
        console.log("Profile updated successfully:", data)
      })
      .catch((err) => {
        console.error("Error updating profile:", err)
        alert("Failed to update profile. Please try again.")
      })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100"
      case "In Transit":
        return "text-blue-600 bg-blue-100"
      case "Processing":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-blush py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-playfair font-bold text-maroon text-4xl mb-2">My Profile</h1>
          <p className="text-rose-gold">Manage your account and orders</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-cream border border-rose-gold-light">
              <TabsTrigger value="profile" className="data-[state=active]:bg-rose-gold data-[state=active]:text-cream">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-rose-gold data-[state=active]:text-cream">
                <Package className="h-4 w-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="data-[state=active]:bg-rose-gold data-[state=active]:text-cream">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="bg-cream rounded-lg p-6 border border-rose-gold-light shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-playfair font-semibold text-maroon text-2xl">Personal Information</h2>
                  <Button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    variant="outline"
                    className="border-rose-gold text-rose-gold hover:bg-rose-gold hover:text-cream"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-maroon font-medium">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-gold h-4 w-4" />
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 border-rose-gold-light focus:border-rose-gold disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-maroon font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-gold h-4 w-4" />
                        <Input
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 border-rose-gold-light focus:border-rose-gold disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-maroon font-medium">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-gold h-4 w-4" />
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 border-rose-gold-light focus:border-rose-gold disabled:bg-gray-50"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-maroon font-medium">
                        Address
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-rose-gold h-4 w-4" />
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10 border-rose-gold-light focus:border-rose-gold disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Logout Button */}
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  localStorage.clear()
                  window.location.href = "/"
                }}
                variant="outline"
                className="border-black text-black font-playfair hover:bg-black hover:text-white"
              >
                Logout
              </Button>
            </div>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <div className="bg-cream rounded-lg p-6 border border-rose-gold-light shadow-sm">
                <h2 className="font-playfair font-semibold text-maroon text-2xl mb-6">Order History</h2>

                {/* TODO: Replace this with fetched orders from Order Microservice */}
                <div className="space-y-4">
                  {orderHistory.length === 0 ? (
                    <p className="text-rose-gold">You have no orders yet.</p>
                  ) : (
                    orderHistory.map((order) => (
                      <div
                        key={order.id}
                        className="border border-rose-gold-light rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-maroon">Order #{order.id}</h3>
                            <p className="text-rose-gold text-sm">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                            <p className="text-maroon font-bold mt-1">₹{order.total}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-maroon text-sm mb-2">Books:</p>
                          <ul className="text-rose-gold text-sm">
                            {order.books.map((book, index) => (
                              <li key={index}>• {book}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <div className="bg-cream rounded-lg p-6 border border-rose-gold-light shadow-sm">
                <h2 className="font-playfair font-semibold text-maroon text-2xl mb-6">My Wishlist</h2>

                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-rose-gold mx-auto mb-4" />
                  <h3 className="font-playfair text-xl text-maroon mb-2">Your wishlist is empty</h3>
                  <p className="text-rose-gold mb-6">Save books you love for later</p>
                  <Button className="shimmer-hover text-cream">Browse Books</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
