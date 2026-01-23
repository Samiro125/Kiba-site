import { NextResponse } from "next/server"
import { db, initializeSampleData } from "@/lib/db"

export const dynamic = "force-dynamic"

// Ensure DB is initialized (will seed if empty)
initializeSampleData()

export async function GET() {
    try {
        const products = await db.products.getAll()

        const productsWithStock = await Promise.all(products.map(async (p) => {
            const licenseKeys = await db.licenseKeys.getByProductId(p.id)
            const stockMapping: Record<string, number> = {}

            licenseKeys.filter(k => k.status === "available").forEach(k => {
                const d = k.duration || "Universal"
                stockMapping[d] = (stockMapping[d] || 0) + 1
            })

            return {
                ...p,
                title: p.name, // Compatibility for frontend
                stockMapping,
                totalStock: Object.values(stockMapping).reduce((a, b) => a + b, 0)
            }
        }))

        return NextResponse.json(productsWithStock)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        )
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log("[API] Creating product:", body)
        const newProduct = await db.products.create(body)
        console.log("[API] Created product:", newProduct.id)
        return NextResponse.json(newProduct)
    } catch (error: any) {
        console.error("[API] Create Product Error:", error)
        return NextResponse.json(
            { error: error.message || "Failed to create product" },
            { status: 500 }
        )
    }
}
