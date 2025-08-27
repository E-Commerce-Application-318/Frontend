"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, CreditCard, Package, Lock } from "lucide-react"
import type { CartItem } from "@/components/cart/cart-item"
import type { ShippingInfo } from "./shipping-form"
import type { PaymentInfo } from "./payment-form"
import Image from "next/image"

interface OrderReviewProps {
  items: CartItem[]
  shippingInfo: ShippingInfo
  paymentInfo: PaymentInfo
  onBack: () => void
  onConfirm: () => void
  isProcessing?: boolean
}

export function OrderReview({
  items,
  shippingInfo,
  paymentInfo,
  onBack,
  onConfirm,
  isProcessing = false,
}: OrderReviewProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + tax + shipping
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const maskCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, "")
    return `**** **** **** ${cleaned.slice(-4)}`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Items */}
          <div>
            <h3 className="font-medium mb-4">Items ({totalItems})</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium line-clamp-1">{item.name}</p>
                    <p className="text-sm text-muted-foreground">by {item.seller}</p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">${item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Shipping Information */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shipping Address
            </h3>
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">
                {shippingInfo.firstName} {shippingInfo.lastName}
              </p>
              <p>{shippingInfo.address}</p>
              <p>
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
              </p>
              <p>{shippingInfo.country}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {shippingInfo.email} • {shippingInfo.phone}
              </p>
            </div>
          </div>

          <Separator />

          {/* Payment Information */}
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Method
            </h3>
            <div className="p-3 bg-muted rounded-lg">
              {paymentInfo.method === "card" && (
                <>
                  <p className="font-medium">{maskCardNumber(paymentInfo.cardNumber)}</p>
                  <p className="text-sm text-muted-foreground">
                    {paymentInfo.cardholderName} • Expires {paymentInfo.expiryDate}
                  </p>
                  <p className="text-sm mt-2">
                    Billing: {paymentInfo.billingAddress.address}, {paymentInfo.billingAddress.city},{" "}
                    {paymentInfo.billingAddress.state} {paymentInfo.billingAddress.zipCode}
                  </p>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div>
            <h3 className="font-medium mb-3">Order Summary</h3>
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
              {shipping === 0 && <div className="text-xs text-green-600 font-medium">Free shipping applied!</div>}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Lock className="h-4 w-4 text-green-600" />
            <div className="text-sm">
              <p className="font-medium text-green-800">Secure Checkout</p>
              <p className="text-green-700">Your order and payment information is encrypted and secure.</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
              Back to Payment
            </Button>
            <Button onClick={onConfirm} disabled={isProcessing} className="flex-1">
              {isProcessing ? (
                <>
                  <Lock className="h-4 w-4 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                `Place Order - $${total.toFixed(2)}`
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
