"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, Mail, ArrowRight } from "lucide-react"
import type { CartItem } from "@/components/cart/cart-item"
import type { ShippingInfo } from "./shipping-form"

interface OrderConfirmationProps {
  orderNumber: string
  items: CartItem[]
  shippingInfo: ShippingInfo
  total: number
  onContinueShopping: () => void
  onViewOrder?: () => void
}

export function OrderConfirmation({
  orderNumber,
  items,
  shippingInfo,
  total,
  onContinueShopping,
  onViewOrder,
}: OrderConfirmationProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5) // 5 days from now

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-green-800 mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-lg font-mono font-bold">{orderNumber}</p>
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Items */}
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium line-clamp-1">{item.name}</p>
                  <p className="text-sm text-muted-foreground">by {item.seller}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="flex justify-between items-center">
            <span className="font-medium">Total ({totalItems} items)</span>
            <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Shipping & Delivery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Shipping & Delivery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Shipping Address</h4>
              <div className="text-sm text-muted-foreground">
                <p>
                  {shippingInfo.firstName} {shippingInfo.lastName}
                </p>
                <p>{shippingInfo.address}</p>
                <p>
                  {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Estimated Delivery</h4>
              <div className="text-sm">
                <p className="font-medium text-primary">
                  {estimatedDelivery.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-muted-foreground">Standard shipping (5-7 business days)</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <p className="font-medium text-blue-800">Order Confirmation Email Sent</p>
            </div>
            <p className="text-sm text-blue-700">
              We've sent a confirmation email to {shippingInfo.email} with your order details and tracking information.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">1</span>
              </div>
              <div>
                <p className="font-medium">Order Processing</p>
                <p className="text-sm text-muted-foreground">We'll prepare your items for shipment</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">2</span>
              </div>
              <div>
                <p className="font-medium">Shipping Notification</p>
                <p className="text-sm text-muted-foreground">You'll receive tracking information via email</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary">3</span>
              </div>
              <div>
                <p className="font-medium">Delivery</p>
                <p className="text-sm text-muted-foreground">Your order arrives at your doorstep</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onContinueShopping} variant="outline" className="flex-1 bg-transparent">
          Continue Shopping
        </Button>
        {onViewOrder && (
          <Button onClick={onViewOrder} className="flex-1">
            View Order Details
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
