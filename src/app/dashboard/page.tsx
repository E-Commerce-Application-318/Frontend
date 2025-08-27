"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard"
import { SellerDashboard } from "@/components/dashboard/seller-dashboard"
import type { Product } from "@/components/products/product-card"

type User = {
  name: string
  email: string
  userType: "customer" | "seller"
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  // lấy user từ localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/login")
    }
  }, [router])

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
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, ...updates } : product
      )
    )
  }

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId))
  }

  return (
    <PageLayout user={user}>
      <div className="p-6">
        {user?.userType === "seller" ? (
          <SellerDashboard
            user={user}
            products={products.filter(
              (p) => p.seller === user.name || p.seller === `${user.name} Store`
            )}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        ) : (
          user && <CustomerDashboard user={user} />
        )}
      </div>
    </PageLayout>
  )
}
