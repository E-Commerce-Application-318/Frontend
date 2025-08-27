"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { CartItem } from "@/components/cart/cart-item"
import Image from "next/image"

interface CheckoutPageProps {
  items: CartItem[]
  user?: {
    name: string
    email: string
    userType: "customer" | "seller"
  } | null
  onBack: () => void
  onOrderComplete: () => void
}


export function CheckoutPage({ items, user, onBack, onOrderComplete }: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    saveInfo: false,
    paymentMethod: "credit",
  })
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setShowSuccessModal(true)
  }

  const handleSuccessClose = () => {
    setShowSuccessModal(false)
    onOrderComplete()
  }

  <Button
    variant="outline"
    onClick={onBack}
    className="mb-4"
  >
    ← Back to Cart
  </Button>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Shipping Information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange("postalCode", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="saveInfo"
                  checked={formData.saveInfo}
                  onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
                />
                <Label htmlFor="saveInfo" className="text-sm">
                  Save this information for future orders
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Image
                    src={item.image || "/placeholder.svg?height=48&width=48"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">by {item.brand}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} • ${item.price}
                    </p>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold mb-3">Payment Method</h3>
            <RadioGroup
              value={formData.paymentMethod}
              onValueChange={(value) => handleInputChange("paymentMethod", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit" id="credit" />
                <Label htmlFor="credit">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash on Delivery</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Order placed successfully!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-sm space-y-1">
              <p>Items ordered: {items.length}</p>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <p>Shipping: ${shipping.toFixed(2)}</p>
              <p className="font-semibold">Total: ${total.toFixed(2)}</p>
              <p>Payment method: {formData.paymentMethod}</p>
              <p>Shipping to: {formData.address}</p>
            </div>
            <Button onClick={handleSuccessClose} className="w-full">
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
