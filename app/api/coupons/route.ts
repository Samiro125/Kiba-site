import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    const coupons = await db.coupons.getAll()
    return NextResponse.json(coupons)
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        // Helper to generate a code if missing? No, default to req body
        const newCoupon = await db.coupons.create(body)
        return NextResponse.json(newCoupon)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 })
    }
}
