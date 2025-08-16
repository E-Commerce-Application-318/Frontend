"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { AuthForm } from "@/components/auth/auth-form"
import { ProductCatalog } from "@/components/products/product-catalog"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { ShoppingCartPage } from "@/components/cart/shopping-cart-page"
import { CheckoutPage } from "@/components/checkout/checkout-page"
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard"
import { SellerDashboard } from "@/components/dashboard/seller-dashboard"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/components/products/product-card"
import type { ShippingInfo } from "@/components/checkout/shipping-form"

type AppView = "catalog" | "auth" | "checkout" | "dashboard" | "cart"

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Classic Denim Jacket",
    price: 89,
    originalPrice: 120,
    image: "/classic-blue-denim-jacket.png",
    rating: 4.8,
    reviewCount: 324,
    category: "Jackets",
    inStock: true,
    seller: "Urban Style",
  },
  {
    id: "2",
    name: "Premium Cotton T-Shirt",
    price: 29,
    image: "/fashion-cotton-tshirt.png",
    rating: 4.7,
    reviewCount: 892,
    category: "T-Shirts",
    inStock: true,
    seller: "Comfort Wear",
  },
  {
    id: "3",
    name: "Designer Skinny Jeans",
    price: 79,
    originalPrice: 99,
    image: "/fashion-skinny-jeans.png",
    rating: 4.6,
    reviewCount: 456,
    category: "Jeans",
    inStock: false,
    seller: "Denim Co",
  },
  {
    id: "4",
    name: "Leather Ankle Boots",
    price: 149,
    originalPrice: 199,
    image: "/fashion-ankle-boots.png",
    rating: 4.9,
    reviewCount: 234,
    category: "Shoes",
    inStock: true,
    seller: "Footwear Plus",
  },
  {
    id: "5",
    name: "Casual Summer Dress",
    price: 65,
    image: "/summer-dress-floral.png",
    rating: 4.5,
    reviewCount: 178,
    category: "Dresses",
    inStock: true,
    seller: "Elegant Styles",
  },
  {
    id: "6",
    name: "Wool Blend Sweater",
    price: 95,
    originalPrice: 125,
    image: "/fashion-wool-sweater.png",
    rating: 4.8,
    reviewCount: 267,
    category: "Sweaters",
    inStock: true,
    seller: "Cozy Knits",
  },
  {
    id: "7",
    name: "Designer Handbag",
    price: 199,
    image: "/fashion-designer-handbag.png",
    rating: 4.7,
    reviewCount: 145,
    category: "Accessories",
    inStock: true,
    seller: "Luxury Bags",
  },
  {
    id: "8",
    name: "Athletic Sneakers",
    price: 129,
    originalPrice: 159,
    image: "/athletic-sneakers-white.png",
    rating: 4.6,
    reviewCount: 389,
    category: "Shoes",
    inStock: true,
    seller: "Sport Style",
  },
]

export default function HomePage() {
  const [user, setUser] = useState<{ name: string; email: string; userType: "customer" | "seller" } | null>(null)
  const [currentView, setCurrentView] = useState<AppView>("catalog")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  const { items: cartItems, addToCart, updateQuantity, removeFromCart, clearCart, getCartItemCount } = useCart()

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const productWithId = {
      ...newProduct,
      id: Date.now().toString(), // Simple ID generation
      rating: 0,
      reviewCount: 0,
    }
    setProducts((prev) => [...prev, productWithId])
  }

  const handleUpdateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((product) => (product.id === productId ? { ...product, ...updates } : product)))
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId))
  }

  const handleLogin = (email: string, password: string, userType: "customer" | "seller") => {
    setUser({
      name: email.split("@")[0],
      email: email,
      userType,
    })
    setCurrentView("catalog")
  }

  const handleRegister = (userData: any) => {
    setUser({
      name: userData.name,
      email: userData.email,
      userType: userData.userType,
    })
    setCurrentView("catalog")
  }

  const handleAuthClick = (mode: "login" | "register" = "login") => {
    setAuthMode(mode)
    setCurrentView("auth")
  }

  const handleCartClick = () => {
    setCurrentView("cart")
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const handleProductClick = (product: Product) => {
    // Handle product detail view - will be implemented later
    console.log("Product clicked:", product)
  }

  const handleCheckout = () => {
    if (!user) {
      setIsCartOpen(false)
      setCurrentView("auth")
      return
    }
    setIsCartOpen(false)
    setCurrentView("checkout")
  }

  const handlePayment = (shippingInfo: ShippingInfo) => {
    console.log("Proceeding to payment with:", { shippingInfo, cartItems })
  }

  const handleBackFromCheckout = () => {
    setCurrentView("catalog")
  }

  const handleDashboardClick = () => {
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView("catalog")
    clearCart()
  }

  const handleOrderComplete = () => {
    clearCart()
  }

  const handleBackFromCart = () => {
    setCurrentView("catalog")
  }

  const handleCartCheckout = () => {
    if (!user) {
      setCurrentView("auth")
      return
    }
    setCurrentView("checkout")
  }

  const handleHomeClick = () => {
    if (user?.userType === "seller") {
      setCurrentView("dashboard")
    } else {
      setCurrentView("catalog")
    }
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

      <main>
        {currentView === "auth" ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
            <AuthForm onLogin={handleLogin} onRegister={handleRegister} initialMode={authMode} />
          </div>
        ) : currentView === "checkout" ? (
          <CheckoutPage
            items={cartItems}
            user={user}
            onBack={handleBackFromCheckout}
            onOrderComplete={handleOrderComplete}
          />
        ) : currentView === "cart" ? (
          <ShoppingCartPage
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCartCheckout}
            onContinueShopping={handleBackFromCart}
          />
        ) : currentView === "dashboard" && user ? (
          user.userType === "seller" ? (
            <SellerDashboard
              user={user}
              products={products.filter((p) => p.seller === user.name || p.seller === `${user.name} Store`)}
              onAddProduct={handleAddProduct}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          ) : (
            <CustomerDashboard user={user} />
          )
        ) : (
          <ProductCatalog
            searchQuery={searchQuery}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
            products={products}
          />
        )}
      </main>

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
