"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/components/products/product-card"

interface PageLayoutProps {
  children: React.ReactElement<{ onAddToCart?: (product: Product) => void }>
  user?: {
    name: string
    email: string
    userType: "customer" | "seller"
  } | null
}

export function PageLayout({ children, user = null }: PageLayoutProps) {
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(user) // add state user
  const { items: cartItems, updateQuantity, removeFromCart, clearCart, getCartItemCount } = useCart()


  // read user from localStorage when load the page
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
  }, [])

  // === Navigation Handlers ===
  const handleAuthClick = (mode: "login" | "register" = "login") => {
    router.push(mode === "login" ? "/login" : "/register")
  }

  const handleCartClick = () => {
    router.push("/cart")
  }

  const handleDashboardClick = () => {
    router.push("/dashboard")
  }

  const handleHomeClick = () => {
    router.push("/")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")   // fix logout 
    // TODO: Implement proper logout with global state
    clearCart()
    setCurrentUser(null) // update state 
    router.push("/")
  }

  const handleCheckout = () => {
    if (!currentUser) {
      setIsCartOpen(false)
      router.push("/login")
      return
    }
    setIsCartOpen(false)
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={currentUser}  //  using state instead prop user
        cartItemCount={getCartItemCount()}
        onAuthClick={handleAuthClick}
        onCartClick={handleCartClick}
        onDashboardClick={handleDashboardClick}
        onLogout={handleLogout}
        onHomeClick={handleHomeClick}
      />

      <main> {children}</main>

      {/* Side cart drawer */}
      <CartDrawer
        items={cartItems}
        isOpen={isCartOpen}
        onOpenChange={setIsCartOpen}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
      />
    </div>
  )
}
