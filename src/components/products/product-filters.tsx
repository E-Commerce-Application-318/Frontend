"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Filter, X } from "lucide-react"

export interface FilterOptions {
  categories: string[]
  priceRange: [number, number]
  inStockOnly: boolean
  minRating: number
  sortBy: "name" | "price-low" | "price-high" | "rating" | "newest"
}

interface ProductFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
  availableCategories: string[]
  isOpen: boolean
  onToggle: () => void
}

export function ProductFilters({
  filters,
  onFiltersChange,
  availableCategories,
  isOpen,
  onToggle,
}: ProductFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange)

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked ? [...filters.categories, category] : filters.categories.filter((c) => c !== category)

    onFiltersChange({ ...filters, categories: newCategories })
  }

  const handlePriceRangeChange = (range: [number, number]) => {
    setLocalPriceRange(range)
    onFiltersChange({ ...filters, priceRange: range })
  }

  const clearFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: [0, 2000],
      inStockOnly: false,
      minRating: 0,
      sortBy: "name",
    })
    setLocalPriceRange([0, 2000])
  }

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button variant="outline" onClick={onToggle} className="w-full bg-transparent">
          <Filter className="w-4 h-4 mr-2" />
          {isOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>

      {/* Filters Panel */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Filters</CardTitle>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sort By */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Sort By</Label>
              <Select
                value={filters.sortBy}
                onValueChange={(value) =>
                  onFiltersChange({
                    ...filters,
                    sortBy: value as FilterOptions["sortBy"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Categories */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Categories</Label>
              <div className="space-y-2">
                {availableCategories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Price Range: ${localPriceRange[0]} - ${localPriceRange[1]}
              </Label>
              <Slider
                value={localPriceRange}
                onValueChange={(value) => handlePriceRangeChange(value as [number, number])}
                max={2000}
                min={0}
                step={50}
                className="w-full"
              />
            </div>

            {/* Minimum Rating */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
              <Select
                value={filters.minRating.toString()}
                onValueChange={(value) => onFiltersChange({ ...filters, minRating: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any Rating</SelectItem>
                  <SelectItem value="1">1+ Stars</SelectItem>
                  <SelectItem value="2">2+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* In Stock Only */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => onFiltersChange({ ...filters, inStockOnly: checked as boolean })}
              />
              <Label htmlFor="inStock" className="text-sm">
                In Stock Only
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
