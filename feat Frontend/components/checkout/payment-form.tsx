"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Wallet, Shield, Lock } from "lucide-react"

export interface PaymentInfo {
  method: "card" | "paypal" | "apple-pay"
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  billingAddress: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  savePaymentMethod: boolean
}

interface PaymentFormProps {
  onSubmit: (data: PaymentInfo) => void
  onBack: () => void
  isProcessing?: boolean
}

export function PaymentForm({ onSubmit, onBack, isProcessing = false }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "apple-pay">("card")
  const [formData, setFormData] = useState<PaymentInfo>({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },
    savePaymentMethod: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.startsWith("billingAddress.")) {
      const addressField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, method: paymentMethod })
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`
    }
    return v
  }

  const isFormValid = () => {
    if (paymentMethod === "card") {
      return (
        formData.cardNumber.replace(/\s/g, "").length >= 13 &&
        formData.expiryDate.length === 5 &&
        formData.cvv.length >= 3 &&
        formData.cardholderName &&
        formData.billingAddress.address &&
        formData.billingAddress.city &&
        formData.billingAddress.state &&
        formData.billingAddress.zipCode
      )
    }
    return true // For other payment methods
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as any)}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-50">
                <RadioGroupItem value="paypal" id="paypal" disabled />
                <Label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                  <Wallet className="h-4 w-4" />
                  PayPal (Coming Soon)
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg opacity-50">
                <RadioGroupItem value="apple-pay" id="apple-pay" disabled />
                <Label htmlFor="apple-pay" className="flex items-center gap-2 cursor-pointer">
                  <Wallet className="h-4 w-4" />
                  Apple Pay (Coming Soon)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Credit Card Form */}
          {paymentMethod === "card" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  type="text"
                  placeholder="Enter name on card"
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing Address</h3>

                <div className="space-y-2">
                  <Label htmlFor="billingAddress">Street Address</Label>
                  <Input
                    id="billingAddress"
                    type="text"
                    placeholder="Enter billing address"
                    value={formData.billingAddress.address}
                    onChange={(e) => handleInputChange("billingAddress.address", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingCity">City</Label>
                    <Input
                      id="billingCity"
                      type="text"
                      placeholder="Enter city"
                      value={formData.billingAddress.city}
                      onChange={(e) => handleInputChange("billingAddress.city", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingState">State</Label>
                    <Select
                      value={formData.billingAddress.state}
                      onValueChange={(value) => handleInputChange("billingAddress.state", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="billingZip">ZIP Code</Label>
                    <Input
                      id="billingZip"
                      type="text"
                      placeholder="Enter ZIP"
                      value={formData.billingAddress.zipCode}
                      onChange={(e) => handleInputChange("billingAddress.zipCode", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="savePayment"
                  checked={formData.savePaymentMethod}
                  onCheckedChange={(checked) => handleInputChange("savePaymentMethod", checked as boolean)}
                />
                <Label htmlFor="savePayment" className="text-sm">
                  Save payment method for future purchases
                </Label>
              </div>
            </>
          )}

          {/* Security Notice */}
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Shield className="h-4 w-4 text-green-600" />
            <div className="text-sm">
              <p className="font-medium">Your payment is secure</p>
              <p className="text-muted-foreground">We use industry-standard encryption to protect your information.</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
              Back to Shipping
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isProcessing}
              className="flex-1 bg-primary hover:bg-secondary"
            >
              {isProcessing ? (
                <>
                  <Lock className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Review Order"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
