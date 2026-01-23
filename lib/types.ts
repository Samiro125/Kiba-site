// Type definitions for Kiba Cheats

export interface LicenseKey {
  id: string
  key: string
  productId: string
  duration?: string // Added for specific duration stocking
  status: "available" | "used"
  usedBy?: string
  usedAt?: string
  createdAt: string
}

export interface Order {
  id: string
  orderId: string
  customerEmail: string
  productId: string
  productName: string
  amount: number
  status: "completed" | "pending" | "failed" | "cancelled"
  licenseKey?: string
  createdAt: string
  paymentProvider: "fanbasis"
  duration?: string
  couponId?: string
  items?: {
    productId: string
    productName: string
    duration: string
    quantity: number
    price: number
  }[]
  metadata?: Record<string, any>
}

export interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  expiresAt?: string
  usageLimit?: number
  usageCount: number
  minPurchase?: number
  status: "active" | "inactive" | "expired"
  createdAt: string
}

export interface ProductDuration {
  duration: string
  price: number
  originalPrice?: number
}

export interface Product {
  id: string
  name: string
  game: string
  price: number
  originalPrice?: number
  category: "Game Cheat" | "Spoofer" | "Account" | "Tool"
  rating: number
  image: string
  description: string
  features: string[]
  status: "undetected" | "updating" | "down"
  color: string
  durations?: ProductDuration[]
  stockMapping?: Record<string, number>
  totalStock?: number
}

export interface Stats {
  totalRevenue: number
  todayRevenue: number
  totalOrders: number
  todayOrders: number
  totalCustomers: number
  averageOrderValue: number
  conversionRate: number
  activeLicenseKeys: number
}

export interface RevenueData {
  date: string
  revenue: number
  orders: number
}
