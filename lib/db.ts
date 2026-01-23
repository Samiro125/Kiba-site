import { LicenseKey, Order, Coupon, Product } from "./types"
import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const DB_PATH = path.join(DATA_DIR, "db.json")

// Data structure for JSON file
interface DBData {
  licenseKeys: LicenseKey[]
  orders: Order[]
  coupons: Coupon[]
  products: Product[]
}

// Initial empty state
const initialState: DBData = {
  licenseKeys: [],
  orders: [],
  coupons: [],
  products: []
}

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify(initialState, null, 2))
}

// Helper to read data
function readDb(): DBData {
  try {
    const data = fs.readFileSync(DB_PATH, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading DB:", error)
    return initialState
  }
}

// Helper to write data
function writeDb(data: DBData) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("Error writing DB:", error)
  }
}

export const db = {
  products: {
    async getAll(): Promise<Product[]> {
      const { products } = readDb()
      return products
    },

    async getById(id: string): Promise<Product | undefined> {
      const { products } = readDb()
      return products.find((p) => p.id === id)
    },

    async create(product: Partial<Product>): Promise<Product> {
      const data = readDb()

      const newProduct = {
        ...product,
        id: product.id || product.name?.toLowerCase().replace(/\s+/g, '-') || `prod_${Date.now()}`,
        status: product.status || "undetected",
        createdAt: new Date().toISOString()
      } as Product

      // Check if exists
      const index = data.products.findIndex(p => p.id === newProduct.id)
      if (index >= 0) {
        // If ID exists (e.g. manual ID conflict), append timestamp
        newProduct.id = `${newProduct.id}-${Date.now()}`
      }

      data.products.push(newProduct)
      writeDb(data)
      return newProduct
    },

    async update(id: string, updates: Partial<Product>): Promise<Product | null> {
      const data = readDb()
      const index = data.products.findIndex(p => p.id === id)
      if (index === -1) return null

      data.products[index] = { ...data.products[index], ...updates }
      writeDb(data)
      return data.products[index]
    },

    async delete(id: string): Promise<boolean> {
      const data = readDb()
      const initialLength = data.products.length
      data.products = data.products.filter(p => p.id !== id)
      if (data.products.length !== initialLength) {
        writeDb(data)
        return true
      }
      return false
    }
  },

  licenseKeys: {
    async getAll(): Promise<LicenseKey[]> {
      const { licenseKeys } = readDb()
      return licenseKeys
    },

    async getByProductId(productId: string): Promise<LicenseKey[]> {
      const { licenseKeys } = readDb()
      return licenseKeys.filter((key) => key.productId === productId)
    },

    async getAvailableByProductId(productId: string, duration?: string): Promise<LicenseKey | null> {
      const { licenseKeys } = readDb()
      const available = licenseKeys.find(
        (key) => key.productId === productId &&
          key.status === "available" &&
          (!duration || key.duration === duration)
      )
      return available || null
    },

    async getAvailableCountByProductId(productId: string, duration?: string): Promise<number> {
      const { licenseKeys } = readDb()
      return licenseKeys.filter(
        (key) => key.productId === productId &&
          key.status === "available" &&
          (!duration || key.duration === duration)
      ).length
    },

    async create(key: Omit<LicenseKey, "id" | "createdAt">): Promise<LicenseKey> {
      const data = readDb()
      const newKey: LicenseKey = {
        ...key,
        id: `key_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      }
      data.licenseKeys.push(newKey)
      writeDb(data)
      return newKey
    },

    async bulkCreate(keys: Array<Omit<LicenseKey, "id" | "createdAt">>): Promise<LicenseKey[]> {
      const data = readDb()
      const newKeys = keys.map((key) => ({
        ...key,
        id: `key_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      }))
      data.licenseKeys.push(...newKeys)
      writeDb(data)
      return newKeys
    },

    async update(id: string, updates: Partial<LicenseKey>): Promise<LicenseKey | null> {
      const data = readDb()
      const index = data.licenseKeys.findIndex((k) => k.id === id)
      if (index === -1) return null

      data.licenseKeys[index] = { ...data.licenseKeys[index], ...updates }
      writeDb(data)
      return data.licenseKeys[index]
    },

    async assignToCustomer(
      productId: string,
      customerEmail: string,
      duration?: string
    ): Promise<LicenseKey | null> {
      const data = readDb()
      // Get all available keys
      const availableIndices = data.licenseKeys
        .map((key, index) => ({ key, index }))
        .filter(({ key }) =>
          key.productId === productId &&
          key.status === "available" &&
          (!duration || key.duration === duration)
        )

      if (availableIndices.length === 0) return null

      // Pick random
      const randomIdx = Math.floor(Math.random() * availableIndices.length)
      const { key, index: realIndex } = availableIndices[randomIdx]

      // Update
      data.licenseKeys[realIndex] = {
        ...key,
        status: "used",
        usedBy: customerEmail,
        usedAt: new Date().toISOString()
      }

      writeDb(data)
      return data.licenseKeys[realIndex]
    },

    async syncKeys(productId: string, duration: string, keyStrings: string[]): Promise<number> {
      const data = readDb()

      // Remove current available keys for this combination
      const initialCount = data.licenseKeys.length
      data.licenseKeys = data.licenseKeys.filter(k =>
        !(k.productId === productId && k.duration === duration && k.status === "available")
      )

      // Add newcomers
      const newKeys: LicenseKey[] = keyStrings.map(keyStr => ({
        id: `key_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        key: keyStr.trim(),
        productId,
        duration,
        status: "available",
        createdAt: new Date().toISOString()
      }))

      data.licenseKeys.push(...newKeys)
      writeDb(data)
      return newKeys.length
    },

    async delete(id: string): Promise<boolean> {
      const data = readDb()
      const initialLen = data.licenseKeys.length
      data.licenseKeys = data.licenseKeys.filter((k) => k.id !== id)

      if (data.licenseKeys.length !== initialLen) {
        writeDb(data)
        return true
      }
      return false
    },
  },

  orders: {
    async getAll(): Promise<Order[]> {
      const { orders } = readDb()
      return orders.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    },

    async getById(id: string): Promise<Order | null> {
      const { orders } = readDb()
      return orders.find((o) => o.id === id) || null
    },

    async getByOrderId(orderId: string): Promise<Order | null> {
      const { orders } = readDb()
      return orders.find((o) => o.orderId === orderId) || null
    },

    async create(order: Omit<Order, "id" | "createdAt">): Promise<Order> {
      const data = readDb()
      const newOrder: Order = {
        ...order,
        id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
      }
      data.orders.push(newOrder)
      writeDb(data)
      return newOrder
    },

    async update(id: string, updates: Partial<Order>): Promise<Order | null> {
      const data = readDb()
      const index = data.orders.findIndex(o => o.id === id)
      if (index === -1) return null

      data.orders[index] = { ...data.orders[index], ...updates }
      writeDb(data)
      return data.orders[index]
    },

    async getTotalRevenue(): Promise<number> {
      const { orders } = readDb()
      return orders
        .filter((o) => o.status === "completed")
        .reduce((sum, o) => sum + o.amount, 0)
    },

    async getTodayRevenue(): Promise<number> {
      const { orders } = readDb()
      const today = new Date().toISOString().split("T")[0]
      return orders
        .filter(
          (o) =>
            o.status === "completed" && o.createdAt.startsWith(today)
        )
        .reduce((sum, o) => sum + o.amount, 0)
    },

    async getRevenueByDateRange(startDate: string, endDate: string): Promise<number> {
      const { orders } = readDb()
      return orders
        .filter(
          (o) =>
            o.status === "completed" &&
            o.createdAt >= startDate &&
            o.createdAt <= endDate
        )
        .reduce((sum, o) => sum + o.amount, 0)
    },
  },

  coupons: {
    async getAll(): Promise<Coupon[]> {
      const { coupons } = readDb()
      return coupons
    },

    async getByCode(code: string): Promise<Coupon | null> {
      const { coupons } = readDb()
      return coupons.find(c => c.code.toLowerCase() === code.toLowerCase()) || null
    },

    async create(coupon: Omit<Coupon, "id" | "createdAt" | "usageCount">): Promise<Coupon> {
      const data = readDb()
      const newCoupon: Coupon = {
        ...coupon,
        id: `coupon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        usageCount: 0,
        createdAt: new Date().toISOString(),
      }
      data.coupons.push(newCoupon)
      writeDb(data)
      return newCoupon
    },

    async update(id: string, updates: Partial<Coupon>): Promise<Coupon | null> {
      const data = readDb()
      const index = data.coupons.findIndex(c => c.id === id)
      if (index === -1) return null

      data.coupons[index] = { ...data.coupons[index], ...updates }
      writeDb(data)
      return data.coupons[index]
    },

    async incrementUsage(id: string): Promise<Coupon | null> {
      const data = readDb()
      const index = data.coupons.findIndex(c => c.id === id)
      if (index === -1) return null

      data.coupons[index].usageCount += 1
      writeDb(data)
      return data.coupons[index]
    },

    async delete(id: string): Promise<boolean> {
      const data = readDb()
      const initialLen = data.coupons.length
      data.coupons = data.coupons.filter(c => c.id !== id)
      if (data.coupons.length !== initialLen) {
        writeDb(data)
        return true
      }
      return false
    },

    async validate(code: string, amount: number): Promise<{ valid: boolean; discount?: number; message?: string }> {
      const coupon = await this.getByCode(code)

      if (!coupon) {
        return { valid: false, message: "Invalid coupon code" }
      }

      if (coupon.status !== "active") {
        return { valid: false, message: "Coupon is not active" }
      }

      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
        return { valid: false, message: "Coupon has expired" }
      }

      if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
        return { valid: false, message: "Coupon usage limit reached" }
      }

      if (coupon.minPurchase && amount < coupon.minPurchase) {
        return { valid: false, message: `Minimum purchase of $${coupon.minPurchase} required` }
      }

      const discount = coupon.type === "percentage"
        ? (amount * coupon.value) / 100
        : coupon.value

      return { valid: true, discount }
    },
  },
}

// Initial Seeding Logic
export function initializeSampleData() {
  const data = readDb()

  // If products are already present, don't seed
  if (data.products.length > 0) return

  console.log("[DB] Initializing sample data...")

  const sampleProducts: Product[] = [
    {
      id: "fortnite",
      name: "FORTNITE CHEAT",
      game: "Fortnite",
      price: 7.99,
      category: "Game Cheat",
      rating: 5,
      image: "/images/fortnitee.png",
      description: "Dominate Fortnite with our undetected cheat featuring aimbot, ESP, and more.",
      features: ["Aimbot", "ESP", "Undetected"],
      status: "active",
      color: "from-red-500/20 to-red-900/20",
      durations: [
        { duration: "1 Day", price: 7.99 },
        { duration: "1 Week", price: 23.99 },
        { duration: "1 Month", price: 43.99 },
        { duration: "Lifetime", price: 109.99 }
      ]
    },
    {
      id: "rust",
      name: "RUST CHEAT",
      game: "Rust",
      price: 9.99,
      category: "Game Cheat",
      rating: 5,
      image: "/images/rustt.png",
      description: "Survive and thrive in Rust with our premium cheat suite.",
      features: ["Debug Camera", "Spiderman", "No Recoil"],
      status: "active",
      color: "from-red-500/20 to-orange-900/20",
      durations: [
        { duration: "1 Day", price: 9.99 },
        { duration: "1 Week", price: 27.99 },
        { duration: "1 Month", price: 59.99 },
        { duration: "Lifetime", price: 119.99 }
      ]
    },
    {
      id: "valorant",
      name: "VALORANT CHEAT",
      game: "Valorant",
      price: 13.99,
      category: "Game Cheat",
      rating: 5,
      image: "/images/kiba-cheats-banner-20valo.webp",
      description: "Rank up fast in Valorant with our kernel-level undetected cheat.",
      features: ["Triggerbot", "Wallhack", "Skin Changer"],
      status: "active",
      color: "from-red-500/20 to-red-900/20",
      durations: [
        { duration: "1 Week", price: 13.99 },
        { duration: "1 Month", price: 24.99 },
        { duration: "Lifetime", price: 44.99 }
      ]
    },
    {
      id: "perm-spoofer",
      name: "PERM SPOOFER",
      game: "Universal Spoofer",
      price: 13.99,
      category: "Spoofer",
      rating: 5,
      image: "/images/perm-spoofer-red.jpg",
      description: "Permanent HWID spoofer for long-term protection.",
      features: ["Permanent Fix", "Deep Clean", "Safe"],
      status: "active",
      color: "from-red-500/20 to-red-900/20",
      durations: [
        { duration: "One-Time", price: 13.99 },
        { duration: "Lifetime", price: 24.99 }
      ]
    },
    {
      id: "apex",
      name: "APEX LEGENDS CHEAT",
      game: "Apex",
      price: 7.99,
      category: "Game Cheat",
      rating: 5,
      image: "/images/apex-new.png",
      description: "Become the champion in Apex Legends with our advanced features.",
      features: ["Glow", "RCS", "Item ESP"],
      status: "active",
      color: "from-cyan-500/20 to-cyan-900/20",
      durations: [
        { duration: "1 Day", price: 7.99 },
        { duration: "1 Week", price: 19.99 },
        { duration: "1 Month", price: 43.99 },
        { duration: "Lifetime", price: 74.99 }
      ]
    }
  ]

  data.products = sampleProducts
  writeDb(data)
}
