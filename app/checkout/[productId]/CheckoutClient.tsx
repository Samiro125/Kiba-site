"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useStorrik } from "./useStorrik"
import { Button } from "@/components/ui/button"

const DEFAULT_VARIANT_ID = "var_c57e0d7c4683dac03f853d386aba0b1d"

interface CheckoutClientProps {
  productId: string
}

export function CheckoutClient({ productId }: CheckoutClientProps) {
  const searchParams = useSearchParams()
  const variantId = searchParams.get("variantId") || DEFAULT_VARIANT_ID
  const { isLoaded, isLoading, error, openCheckout } = useStorrik()

  // Auto-open checkout when Storrik is loaded
  useEffect(() => {
    if (isLoaded && productId && variantId) {
      openCheckout(productId, variantId)
    }
  }, [isLoaded, productId, variantId, openCheckout])

  const handleOpenCheckout = () => {
    if (isLoaded) {
      openCheckout(productId, variantId)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        {isLoading && (
          <div className="space-y-4">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-gray-400">Loading checkout...</p>
          </div>
        )}

        {error && (
          <div className="space-y-4">
            <p className="text-red-500">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Retry
            </Button>
          </div>
        )}

        {isLoaded && !error && (
          <div className="space-y-4">
            <p className="text-gray-400">Checkout should open automatically.</p>
            <Button
              onClick={handleOpenCheckout}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-4 px-8"
            >
              Open Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
