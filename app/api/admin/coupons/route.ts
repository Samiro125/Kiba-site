import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const coupons = await db.coupons.getAll()
    return NextResponse.json({ coupons })
  } catch (error) {
    console.error("Error fetching coupons:", error)
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const data = await request.json()
    const { code, type, value, expiresAt, usageLimit, minPurchase, status } = data

    if (!code || !type || value === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const coupon = await db.coupons.create({
      code: code.toUpperCase(),
      type,
      value,
      expiresAt,
      usageLimit,
      minPurchase,
      status: status || "active",
    })

    return NextResponse.json({ coupon })
  } catch (error) {
    console.error("Error creating coupon:", error)
    return NextResponse.json(
      { error: "Failed to create coupon" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { id, ...updates } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: "Missing coupon ID" },
        { status: 400 }
      )
    }

    const coupon = await db.coupons.update(id, updates)

    if (!coupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ coupon })
  } catch (error) {
    console.error("Error updating coupon:", error)
    return NextResponse.json(
      { error: "Failed to update coupon" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Missing coupon ID" },
        { status: 400 }
      )
    }

    const deleted = await db.coupons.delete(id)

    if (!deleted) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting coupon:", error)
    return NextResponse.json(
      { error: "Failed to delete coupon" },
      { status: 500 }
    )
  }
}
