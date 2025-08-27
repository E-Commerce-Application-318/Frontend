"use client"

import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { ShoppingCartPage } from "@/components/cart/shopping-cart-page"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeFromCart } = useCart()

  const handleCheckout = () => {
    // TODO: Check if user is logged in via global state
    router.push("/checkout")
  }

  const handleContinueShopping = () => {
    router.push("/")
  }

  return (
    <PageLayout>
      <ShoppingCartPage
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        onContinueShopping={handleContinueShopping}
      />
    </PageLayout>
  )
}
