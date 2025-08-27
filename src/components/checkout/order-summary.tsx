"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import type { CartItem } from "@/components/cart/cart-item"
import Image from "next/image"

interface OrderSummaryProps {
  items: CartItem[]
  showItemDetails?: boolean
}

export function OrderSummary({ items, showItemDetails = true }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 100 ? 0 : 9.99 // Free shipping over $100
  const total = subtotal + tax + shipping
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showItemDetails && (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {item.quantity}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                  <p className="text-xs text-muted-foreground">by {item.seller}</p>
                </div>
                <div className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
            <Separator />
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({totalItems} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {shipping === 0 && subtotal > 100 && (
            <div className="text-xs text-green-600 font-medium">Free shipping applied!</div>
          )}
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
