"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: "fortnite",
    title: "FORTNITE",
    game: "Fortnite",
    image: "/images/category-fortnite.webp",
    price: "$10.99",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "arc-raiders",
    title: "ARC RAIDERS",
    game: "Arc Raiders",
    image: "/images/category-arc-raiders.webp",
    price: "$10.99",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "call-of-duty",
    title: "CALL OF DUTY",
    game: "Call of Duty",
    image: "/images/category-cod.webp",
    price: "$11.99",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "hwid-spoofer",
    title: "HWID SPOOFER",
    game: "Universal Spoofer",
    image: "/images/category-spoofer.webp",
    price: "$7.99",
    rating: 5,
    category: "Spoofer",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilterMenu, setShowFilterMenu] = useState(false)

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.game.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 pt-20 relative z-10">
        <div className="container px-6 py-12">
          {/* Back to Home */}
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-6">All Products</h1>

            {/* Search and Filter */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border-zinc-800 pl-10 text-white placeholder:text-gray-500 focus-visible:ring-white"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="animate-fade-in" style={{ animationDelay: `${products.indexOf(product) * 0.05}s`, animationFillMode: "both" }}>
                <Card className="group overflow-hidden border-zinc-800 bg-black backdrop-blur transition-all duration-500 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-2 cursor-pointer">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={600}
                      height={600}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-bold text-white mb-1 transition-all duration-300 group-hover:text-blue-400">
                        {product.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mb-2">{product.game}</p>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-3 w-3 fill-yellow-400" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-400">{product.price}</span>
                        <span className="text-xs text-zinc-500">{product.category}</span>
                      </div>
                      <div className="mt-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-white">
                          View Product
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-400">No products found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-8">
        <div className="container px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">KIBACHEATS</h3>
              <p className="text-sm text-gray-400">
                Providing high-quality gaming enhancements since 2018. Our mission is to improve your daily gaming
                experience.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-white transition-all duration-300 hover:translate-x-1 inline-block">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Games</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Fortnite</li>
                <li>Rust</li>
                <li>Valorant</li>
                <li>Apex Legends</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+1 (555) 456-7890</li>
                <li>support@kibacheats.com</li>
                <li>Join our Discord for faster support</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-zinc-800 pt-8 text-center">
            <p className="text-sm text-gray-400">© 2025 KIBA CHEATS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
