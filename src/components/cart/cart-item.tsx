"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { Product } from "@/components/products/product-card"

export interface CartItem extends Product {
  quantity: number
}

interface CartItemProps {
  item: CartItem
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItemComponent({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      onRemove(item.id)
    } else {
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const subtotal = item.price * item.quantity

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-border">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">by {item.seller}</p>
        <div className="flex items-center mt-2">
          <span className="text-sm font-semibold text-primary">${item.price}</span>
          {item.originalPrice && (
            <span className="text-xs text-muted-foreground line-through ml-2">${item.originalPrice}</span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
          className="w-16 h-8 text-center text-sm"
          min="1"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Subtotal and Remove */}
      <div className="flex flex-col items-end space-y-2">
        <span className="text-sm font-semibold">${subtotal.toFixed(2)}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
