import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { fanbasisClient } from "@/lib/fanbasis"
import { sendEmail, generateLicenseEmail, generateOutOfStockEmail } from "@/lib/email"
import { notifyNewOrder, notifyOutOfStock } from "@/lib/discord"

export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get("X-Webhook-Signature") || req.headers.get("x-webhook-signature") || ""
    const secret = process.env.FANBASIS_WEBHOOK_SECRET || ""

    console.log("Webhook received. Signature present:", !!signature)

    // 1. Verify Signature
    if (secret && !fanbasisClient.verifyWebhookSignature(rawBody, signature, secret)) {
      console.error("Invalid webhook signature detected")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const event = JSON.parse(rawBody)
    console.log("Fanbasis Event Type:", event.type)

    // 2. Handle successful payment
    if (event.type === "payment.succeeded" || event.type === "product.purchased") {
      const metadata = event.metadata || event.data?.metadata || {}
      const orderId = metadata.orderId

      if (!orderId) {
        console.error("No orderId found in event metadata")
        return NextResponse.json({ received: true })
      }

      // Update local order status
      const order = await db.orders.getById(orderId)
      if (order && order.status !== "completed") {
        console.log(`Fulfilling order: ${orderId} for ${order.customerEmail}`)

        // Update with Fanbasis transaction ID if available
        const transactionId = event.data?.id || event.id || ""

        await db.orders.update(orderId, {
          status: "completed",
          orderId: transactionId,
          amount: event.data?.amount_total ? event.data.amount_total / 100 : order.amount
        })

        // 3. Automated Key Fulfillment (Support for Cart/Single)
        const itemsToFulfill = order.items && order.items.length > 0
          ? order.items
          : [{ productId: order.productId, productName: order.productName, duration: order.duration, quantity: 1, price: order.amount }]

        for (const item of itemsToFulfill) {
          // For each item, handle quantity (usually 1 but support multiple)
          for (let q = 0; q < (item.quantity || 1); q++) {
            const assignedKey = await db.licenseKeys.assignToCustomer(
              item.productId,
              order.customerEmail,
              item.duration
            )

            if (assignedKey) {
              console.log(`✅ Key Assigned: ${assignedKey.key} to ${order.customerEmail} for ${item.productName}`)

              // Send Email with Template
              const html = generateLicenseEmail(
                order.customerEmail,
                assignedKey.key,
                item.productName,
                orderId,
                item.price || order.amount
              )

              await sendEmail({
                to: order.customerEmail,
                subject: `Your ${item.productName} License Key | Kiba Cheats`,
                html
              });

              // Notify Discord
              await notifyNewOrder(
                item.productName,
                item.price || order.amount,
                order.customerEmail,
                orderId,
                assignedKey.key
              )
            } else {
              console.error(`❌ STOCK ALERT: No keys available for ${item.productId} (${item.duration})`)

              const html = generateOutOfStockEmail(
                order.customerEmail,
                item.productName,
                orderId,
                item.price || order.amount
              )

              await sendEmail({
                to: order.customerEmail,
                subject: `License Key Pending: ${item.productName} | Kiba Cheats`,
                html
              })

              await notifyOutOfStock(
                item.productName,
                item.price || order.amount,
                order.customerEmail,
                orderId
              )
            }
          }
        }
      }
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error("Critical Webhook Failure:", error)
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 })
  }
}
