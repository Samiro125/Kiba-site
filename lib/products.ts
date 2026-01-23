// Product catalog for Kiba Cheats
// Now using DB as source of truth

import { db } from "./db"
import { Product } from "./types" // Ensure we import shared types

export { type Product }

// Backward compatibility helpers for server-side code
export async function getProductById(id: string): Promise<Product | undefined> {
  return db.products.getById(id)
}

export async function getProductsByCategory(category: Product["category"]): Promise<Product[]> {
  const all = await db.products.getAll()
  return all.filter(p => p.category === category && p.status === "active")
}

export async function getActiveProducts(): Promise<Product[]> {
  const all = await db.products.getAll()
  return all.filter(p => p.status === "active")
}

