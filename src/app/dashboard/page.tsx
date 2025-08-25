"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard"
import { SellerDashboard } from "@/components/dashboard/seller-dashboard"
import type { Product } from "@/components/products/product-card"

export default function DashboardPage() {
  const router = useRouter()
  
  // TODO: Replace with real user auth from global state
  const user = { name: "demo", email: "demo@mail.com", userType: "seller" as const }
  
  // TODO: Replace with global product state management
  const [products, setProducts] = useState<Product[]>([])

  const handleAddProduct = (newProduct: Omit<Product, "id">) => {
    const productWithId = {
      ...newProduct,
      id: Date.now().toString(),
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

  // If not logged in, redirect to login
  // TODO: Implement proper auth check
  // if (!user) {
  //   router.push("/login")
  //   return null
  // }

  return (
    <PageLayout user={user}>
      <div className="p-6">
        {user.userType === "seller" ? (
          <SellerDashboard 
            user={user} 
            products={products.filter((p) => p.seller === user.name || p.seller === `${user.name} Store`)} 
            onAddProduct={handleAddProduct} 
            onUpdateProduct={handleUpdateProduct} 
            onDeleteProduct={handleDeleteProduct} 
          />
        ) : (
          <CustomerDashboard user={user} />
        )}
      </div>
    </PageLayout>
  )
}
