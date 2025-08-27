"use client"

import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { CheckoutPage } from "@/components/checkout/checkout-page"
import { useCart } from "@/hooks/use-cart"

export default function Checkout() {
   const router = useRouter()
  const { items, clearCart } = useCart()

  const handleBack = () => {
    router.push("/cart")
  }

  const handleOrderComplete = () => {
    clearCart()
    router.push("/") // Redirect to home page after successful order
  }

  return (
    <PageLayout>
      <CheckoutPage
        items={items}
        user={null} // TODO: Replace with real user auth from global state
        onBack={handleBack}
        onOrderComplete={handleOrderComplete}
      />
    </PageLayout>
  )
}

