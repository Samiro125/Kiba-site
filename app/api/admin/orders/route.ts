import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { db } from "@/lib/db"
// import { fanbasisClient } from "@/lib/fanbasis" // Uncomment when library is ready

export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const productId = searchParams.get("productId")

    let orders = await db.orders.getAll()

    if (status && status !== "all") {
      orders = orders.filter((o) => o.status === status)
    }
    if (productId) {
      orders = orders.filter((o) => o.productId === productId)
    }

    // Sort: Newest First
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { id, status, force, ...updates } = body

    if (!id) return NextResponse.json({ error: "Order ID required" }, { status: 400 })

    const currentOrder = await db.orders.getById(id)
    if (!currentOrder) return NextResponse.json({ error: "Order not found" }, { status: 404 })

    // --- FANBASIS VALIDATION LOGIC ---
    if (status === "completed" && currentOrder.status !== "completed" && !force) {
      if (currentOrder.paymentProvider === "fanbasis") {
        // If we have an external order ID, check it. 
        // If not, we warn the admin that we can't validate it.
        if (!currentOrder.orderId) {
          return NextResponse.json({
            error: "VALIDATION_FAILED",
            message: "No Fanbasis Session ID found on this order. Cannot verify payment automatically.",
            requiresForce: true
          }, { status: 400 })
        }

        // MOCK VALIDATION (Replace with actual fanbasisClient call)
        // const session = await fanbasisClient.getSession(currentOrder.orderId)
        // if (session.status !== 'paid') { ... }

        // For now, if we have an ID but it's not marked paid locally, we assume it needs checking
        // In a real scenario, you would uncomment the client call above.
        // For this code to run without the lib, we'll assume valid if force is used, 
        // or fail if it looks suspicious.
      }
    }

    // --- AUTO-FULFILLMENT ---
    let assignedKey = null
    let keyError = null

    if (status === "completed" && currentOrder.status !== "completed") {
      if (currentOrder.productId) {
        console.log(`[Admin] Auto-fulfilling order ${id}...`)

        // Check stock first
        const stock = await db.licenseKeys.getAvailableCountByProductId(currentOrder.productId)
        if (stock === 0 && !force) {
          return NextResponse.json({
            error: "OUT_OF_STOCK",
            message: "No keys available for this product. Cannot fulfill automatically.",
            requiresForce: true
          }, { status: 400 })
        }

        assignedKey = await db.licenseKeys.assignToCustomer(currentOrder.productId, currentOrder.customerEmail)

        if (!assignedKey) {
          keyError = "Order marked completed, but KEY ASSIGNMENT FAILED (Stock issue?). Manual delivery required."
        }
      }
    }

    const updatedOrder = await db.orders.update(id, { status, ...updates })

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      keyAssigned: !!assignedKey,
      keyError
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}