import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
    const status = searchParams.get("status")

    let keys = await db.licenseKeys.getAll()

    if (productId) {
      keys = keys.filter((k) => k.productId === productId)
    }

    if (status) {
      keys = keys.filter((k) => k.status === status)
    }

    return NextResponse.json({ keys })
  } catch (error) {
    console.error("Error fetching license keys:", error)
    return NextResponse.json(
      { error: "Failed to fetch license keys" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { productId, duration, keys } = await request.json()

    if (!productId || !keys || !Array.isArray(keys)) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      )
    }

    const licenseKeys = keys.map((key) => ({
      key: key.trim(),
      productId,
      duration,
      status: "available" as const,
    }))

    const created = await db.licenseKeys.bulkCreate(licenseKeys)

    return NextResponse.json({
      success: true,
      count: created.length,
      keys: created,
    })
  } catch (error) {
    console.error("Error creating license keys:", error)
    return NextResponse.json(
      { error: "Failed to create license keys" },
      { status: 500 }
    )
  }
}


export async function PUT(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { productId, duration, keys } = await request.json()

    if (!productId || !duration || !Array.isArray(keys)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const count = await db.licenseKeys.syncKeys(productId, duration, keys)

    return NextResponse.json({
      success: true,
      count
    })
  } catch (error) {
    console.error("Error syncing keys:", error)
    return NextResponse.json({ error: "Failed to sync keys" }, { status: 500 })
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
        { error: "Missing key ID" },
        { status: 400 }
      )
    }

    const deleted = await db.licenseKeys.delete(id)

    if (!deleted) {
      return NextResponse.json(
        { error: "Key not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting license key:", error)
    return NextResponse.json(
      { error: "Failed to delete license key" },
      { status: 500 }
    )
  }
}
