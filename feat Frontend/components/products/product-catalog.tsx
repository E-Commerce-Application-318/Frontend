"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { ProductCard, type Product } from "./product-card"
import { ProductFilters, type FilterOptions } from "./product-filters"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Grid, List } from "lucide-react"

interface ProductCatalogProps {
  searchQuery?: string
  onAddToCart: (product: Product) => void
  onProductClick: (product: Product) => void
  products: Product[]
}

export function ProductCatalog({ searchQuery = "", onAddToCart, onProductClick, products }: ProductCatalogProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 2000],
    inStockOnly: false,
    minRating: 0,
    sortBy: "name",
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const availableCategories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)))
  }, [products])

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Search query filter
      const matchesSearch =
        !localSearchQuery ||
        product.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        product.seller.toLowerCase().includes(localSearchQuery.toLowerCase())

      // Category filter
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category)

      // Price range filter
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      // Stock filter
      const matchesStock = !filters.inStockOnly || product.inStock

      // Rating filter
      const matchesRating = product.rating >= filters.minRating

      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesRating
    })

    // Sort products
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // For demo purposes, reverse the array
        filtered.reverse()
        break
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [localSearchQuery, filters, products])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by the useMemo above
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            availableCategories={availableCategories}
            isOpen={filtersOpen}
            onToggle={() => setFiltersOpen(!filtersOpen)}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">Products</h2>
              <p className="text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setFilters({
                    categories: [],
                    priceRange: [0, 2000],
                    inStockOnly: false,
                    minRating: 0,
                    sortBy: "name",
                  })
                  setLocalSearchQuery("")
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
