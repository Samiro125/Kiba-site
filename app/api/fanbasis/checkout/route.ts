import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { fanbasisClient } from "@/lib/fanbasis"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      productId,
      email,
      couponCode,
      price: overridePrice,
      duration,
      isCartCheckout,
      items,
      total: cartTotal
    } = body

    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
    let amount = 0
    let description = ""
    let title = ""
    let metadataItems: any = {}

    if (isCartCheckout && Array.isArray(items)) {
      amount = cartTotal
      title = "Kiba Cheats - Bundle Order"
      description = items.map(i => `${i.name} (${i.duration}) x${i.quantity}`).join(", ")

      const displayRequestName = items.map(i => `${i.name}`).join(" + ")

      // Create a unified order for the cart
      const pendingOrder = await db.orders.create({
        productId: "multi",
        productName: displayRequestName.length > 50 ? `${items[0].name} + ${items.length - 1} others` : displayRequestName,
        customerEmail: email,
        amount: amount,
        status: "pending",
        orderId: "",
        paymentProvider: "fanbasis",
        items: items.map(i => ({
          productId: i.id,
          productName: i.name,
          duration: i.duration,
          quantity: i.quantity,
          price: i.price
        }))
      })

      metadataItems = { orderId: pendingOrder.id, type: "cart" }

    } else {
      // Single product logic
      const product = await db.products.getById(productId)
      if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

      amount = overridePrice || product.price
      title = `${product.name} - ${duration || 'Access'}`
      description = `Gaming enhancement for ${product.game}`

      // Apply coupon logic for single items if needed (handled by frontend usually)

      const pendingOrder = await db.orders.create({
        productId: product.id,
        productName: product.name,
        customerEmail: email,
        amount: amount,
        status: "pending",
        orderId: "",
        duration: duration,
        paymentProvider: "fanbasis",
      })

      metadataItems = { orderId: pendingOrder.id, type: "single" }
    }

    if (amount < 0.50) amount = 0.50;

    try {
      const session = await fanbasisClient.createCheckoutSession({
        product: {
          title: title,
          description: description
        },
        amount_cents: Math.round(amount * 100),
        type: "onetime_non_reusable",
        success_url: `${baseUrl}/order/success?orderId=${metadataItems.orderId}`,
        cancel_url: `${baseUrl}/products`,
        webhook_url: `${baseUrl}/api/webhooks/fanbasis`,
        metadata: {
          ...metadataItems,
          email: email
        }
      })

      // Fanbasis returns { status: "success", data: { payment_link: "..." } }
      const url = session.data?.payment_link || session.payment_link

      if (!url) {
        console.error("❌ NO URL FOUND IN RESPONSE. Full response:", JSON.stringify(session, null, 2))
        throw new Error("No checkout URL returned from payment provider")
      }

      console.log("✅ Checkout URL:", url)
      return NextResponse.json({ url })

    } catch (apiError: any) {
      console.error("❌ Fanbasis API Fail:", apiError.message)
      await db.orders.update(metadataItems.orderId, { status: "failed" })
      return NextResponse.json({ error: `Payment provider error: ${apiError.message}` }, { status: 502 })
    }

  } catch (error) {
    console.error("Checkout Error", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
