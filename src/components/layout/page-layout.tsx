"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { useCart } from "@/hooks/use-cart"

interface PageLayoutProps {
  children: React.ReactNode
  user?: {
    name: string
    email: string
    userType: "customer" | "seller"
  } | null
}

export function PageLayout({ children, user = null }: PageLayoutProps) {
  const router = useRouter()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items: cartItems, updateQuantity, removeFromCart, clearCart, getCartItemCount } = useCart()

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
    // TODO: Implement proper logout with global state
    clearCart()
    router.push("/")
  }

  const handleCheckout = () => {
    if (!user) {
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
        user={user}
        cartItemCount={getCartItemCount()}
        onAuthClick={handleAuthClick}
        onCartClick={handleCartClick}
        onDashboardClick={handleDashboardClick}
        onLogout={handleLogout}
        onHomeClick={handleHomeClick}
      />

      <main>{children}</main>

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
