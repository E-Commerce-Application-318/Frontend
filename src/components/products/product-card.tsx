"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Image from "next/image"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  category: string
  inStock: boolean
  seller: string
}

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onProductClick: (product: Product) => void
}

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg" onClick={() => onProductClick(product)}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              -{discountPercentage}%
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>

        <div className="p-4" onClick={() => onProductClick(product)}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm line-clamp-2 flex-1">{product.name}</h3>
          </div>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <div className="text-xs text-muted-foreground mb-3">by {product.seller}</div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product)
          }}
          className="w-full"
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}
