import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import { db } from "@/lib/db"
import { Stats, RevenueData } from "@/lib/types"

export async function GET(request: NextRequest) {
  const authError = requireAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get("days") || "30")

    const orders = await db.orders.getAll()
    const completedOrders = orders.filter((o) => o.status === "completed")

    const totalRevenue = await db.orders.getTotalRevenue()
    const todayRevenue = await db.orders.getTodayRevenue()
    const totalOrders = completedOrders.length

    const today = new Date().toISOString().split("T")[0]
    const todayOrders = completedOrders.filter((o) =>
      o.createdAt.startsWith(today)
    ).length

    const uniqueCustomers = new Set(completedOrders.map((o) => o.customerEmail))
    const totalCustomers = uniqueCustomers.size

    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    const allKeys = await db.licenseKeys.getAll()
    const activeLicenseKeys = allKeys.filter((k) => k.status === "available").length

    // Calculate revenue by date for chart
    const revenueByDate: Map<string, RevenueData> = new Map()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    completedOrders.forEach((order) => {
      const date = order.createdAt.split("T")[0]
      if (new Date(date) >= startDate) {
        const existing = revenueByDate.get(date) || { date, revenue: 0, orders: 0 }
        revenueByDate.set(date, {
          date,
          revenue: existing.revenue + order.amount,
          orders: existing.orders + 1,
        })
      }
    })

    const revenueData = Array.from(revenueByDate.values()).sort(
      (a, b) => a.date.localeCompare(b.date)
    )

    const stats: Stats = {
      totalRevenue,
      todayRevenue,
      totalOrders,
      todayOrders,
      totalCustomers,
      averageOrderValue,
      conversionRate: 0, // Would need traffic data
      activeLicenseKeys,
    }

    // Recent Activity
    const recentOrders = completedOrders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map(o => ({
        type: "order" as const,
        user: o.customerEmail,
        product: o.productName,
        date: o.createdAt,
        amount: `$${o.amount.toFixed(2)}`
      }))

    const recentKeys = allKeys
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map(k => ({
        type: "key" as const,
        user: "System",
        product: "License Key Stock",
        date: k.createdAt,
        amount: "Restocked"
      }))

    const recentActivity = [...recentOrders, ...recentKeys]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)

    return NextResponse.json({ stats, revenueData, recentActivity })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
