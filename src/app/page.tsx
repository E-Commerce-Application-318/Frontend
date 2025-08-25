"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { ProductCatalog } from "@/components/products/product-catalog"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/components/products/product-card"

// Initial demo products (stored in /public folder)
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Classic Denim Jacket",
    price: 89,
    originalPrice: 120,
    image: "/classic-blue-denim-jacket.png", // image must be inside /publics
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
    image: "/fashion-summer-dress.png",
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
    image: "/athletic-sneakers-white.png.png",
    rating: 4.6,
    reviewCount: 389,
    category: "Shoes",
    inStock: true,
    seller: "Sport Style",
  },
]

export default function HomePage() {
  const router = useRouter() // declare router
  // TODO: Replace with global user state
  const [user, setUser] = useState<{ name: string; email: string; userType: "customer" | "seller" } | null>(null)

  // Search input for products
  const [searchQuery, setSearchQuery] = useState("")

  // Store products - TODO: Move to global state
  const [products, setProducts] = useState<Product[]>(initialProducts)

  // Cart hook (manages items and cart actions)
  const { addToCart } = useCart()

  useEffect(() => {
    const saved = localStorage.getItem("user")
    if (saved) {
      setUser(JSON.parse(saved))
    } else {
      router.push("/login") // redirect if not logged in
    }
  }, [router])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  return (
    <PageLayout user={user}>
      <ProductCatalog
        searchQuery={searchQuery}
        onAddToCart={handleAddToCart}
        onProductClick={(p) => console.log("Product clicked:", p)}
        products={products}
      />
    </PageLayout>
  )
}
