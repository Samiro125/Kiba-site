import { Suspense } from "react"
import { CheckoutClient } from "./CheckoutClient"

interface CheckoutPageProps {
  params: Promise<{ productId: string }>
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { productId } = await params

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutClient productId={productId} />
    </Suspense>
  )
}
