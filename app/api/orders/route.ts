import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { db } from "@/lib/db"

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

        // Sort by newest first
        orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        return NextResponse.json({ orders })
    } catch (error) {
        console.error("Error fetching orders:", error)
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
                if (!currentOrder.orderId) {
                    return NextResponse.json({
                        error: "VALIDATION_FAILED",
                        message: "No Fanbasis Session ID found on this order. Cannot verify payment automatically.",
                        requiresForce: true
                    }, { status: 400 })
                }
            }
        }

        // --- AUTO-FULFILLMENT ---
        let assignedKey = null
        let keyError = null

        if (status === "completed" && currentOrder.status !== "completed") {
            if (currentOrder.productId) {
                console.log(`[Admin] Auto-fulfilling order ${id}...`)

                // Check stock first
                const stock = await db.licenseKeys.getAvailableCountByProductId(currentOrder.productId, currentOrder.duration)
                if (stock === 0 && !force) {
                    return NextResponse.json({
                        error: "OUT_OF_STOCK",
                        message: `No keys available for ${currentOrder.productId} (${currentOrder.duration || 'Universal'}). Cannot fulfill automatically.`,
                        requiresForce: true
                    }, { status: 400 })
                }

                assignedKey = await db.licenseKeys.assignToCustomer(currentOrder.productId, currentOrder.customerEmail, currentOrder.duration)

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