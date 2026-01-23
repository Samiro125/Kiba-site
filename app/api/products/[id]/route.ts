import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const product = await db.products.getById(id)
        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            )
        }

        // Get stock breakdown by duration
        const licenseKeys = await db.licenseKeys.getByProductId(id)
        const stockMapping: Record<string, number> = {}

        // Count available keys per duration
        licenseKeys.filter(k => k.status === "available").forEach(k => {
            const d = k.duration || "Universal"
            stockMapping[d] = (stockMapping[d] || 0) + 1
        })

        return NextResponse.json({
            ...product,
            stockMapping,
            totalStock: Object.values(stockMapping).reduce((a, b) => a + b, 0)
        })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        )
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        console.log(`[API] Updating product ${id}`, body)

        const updated = await db.products.update(id, body)
        console.log(`[API] Update result for ${id}:`, updated ? "Success" : "Not Found")

        if (!updated) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            )
        }

        return NextResponse.json(updated)
    } catch (error) {
        console.error("[API] Update Product Error:", error)
        return NextResponse.json(
            { error: "Failed to update product" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const success = await db.products.delete(id)
        if (!success) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            )
        }
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete product" },
            { status: 500 }
        )
    }
}
