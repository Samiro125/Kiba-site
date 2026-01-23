import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const amount = parseFloat(searchParams.get("amount") || "0")

    if (!code) {
      return NextResponse.json(
        { valid: false, message: "Coupon code required" },
        { status: 400 }
      )
    }

    const validation = await db.coupons.validate(code, amount)

    return NextResponse.json(validation)
  } catch (error) {
    console.error("Error validating coupon:", error)
    return NextResponse.json(
      { valid: false, message: "Failed to validate coupon" },
      { status: 500 }
    )
  }
}
