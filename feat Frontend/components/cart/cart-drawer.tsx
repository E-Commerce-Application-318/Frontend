"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import { CartItemComponent, type CartItem } from "./cart-item"

interface CartDrawerProps {
  items: CartItem[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
  onCheckout: () => void
}

export function CartDrawer({
  items,
  isOpen,
  onOpenChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartDrawerProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 100 ? 0 : 9.99 // Free shipping over $100
  const total = subtotal + tax + shipping

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Shopping Cart</span>
              {totalItems > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </Badge>
              )}
            </div>
            {items.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearCart}>
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some products to get started!</p>
                <Button onClick={() => onOpenChange(false)}>Continue Shopping</Button>
              </div>
            ) : (
              <div className="space-y-0">
                {items.map((item) => (
                  <CartItemComponent
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="border-t border-border pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping === 0 && subtotal > 100 && (
                  <p className="text-xs text-green-600">🎉 You qualify for free shipping!</p>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={onCheckout} className="w-full" size="lg">
                Proceed to Checkout
              </Button>

              <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
