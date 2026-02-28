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
    image: "/images/fortnitee.png",
    price: "$14.65",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "rust",
    title: "RUST",
    game: "Rust",
    image: "/images/rustt.png",
    price: "$14.65",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "valorant",
    title: "VALORANT",
    game: "Valorant",
    image: "/images/kiba-cheats-banner-20valo.webp",
    price: "$16.99",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "r6-siege",
    title: "RAINBOW SIX SIEGE",
    game: "R6 Siege",
    image: "/images/r6666.png",
    price: "$15.99",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "apex",
    title: "APEX LEGENDS",
    game: "Apex",
    image: "/images/apex-20-282-29.png",
    price: "$14.65",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "arc-raiders",
    title: "ARC RAIDERS",
    game: "Arc Raiders",
    image: "/images/arc-20raiders.png",
    price: "$12.99",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "temp-spoofer",
    title: "TEMP SPOOFER",
    game: "Spoofer",
    image: "/images/temp.jpg",
    price: "$5.99",
    rating: 5,
    category: "Spoofer",
  },
  {
    id: "perm-spoofer",
    title: "PERM SPOOFER",
    game: "Spoofer",
    image: "/images/perm.webp",
    price: "$8.99",
    rating: 5,
    category: "Spoofer",
  },
  {
    id: "cod",
    title: "CALL OF DUTY",
    game: "Call of Duty",
    image: "/images/cod.png",
    price: "$13.99",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "fivem",
    title: "FIVEM",
    game: "FiveM / GTA V",
    image: "/images/fivem.png",
    price: "$14.99",
    rating: 5,
    category: "Game Cheat",
  },
  {
    id: "accounts",
    title: "ACCOUNTS",
    game: "Accounts",
    image: "/images/accounts.png",
    price: "$9.99",
    rating: 5,
    category: "Accounts",
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
      {/* Red Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/50 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
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
            <h1 className="text-4xl font-bold text-red-500 mb-6">All Products</h1>

            {/* Search and Filter */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border-zinc-800 pl-10 text-white placeholder:text-gray-500 focus-visible:ring-red-500"
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="animate-fade-in" style={{ animationDelay: `${products.indexOf(product) * 0.05}s`, animationFillMode: "both" }}>
                <Card className="group overflow-hidden border-zinc-800 bg-zinc-900/50 backdrop-blur transition-all duration-500 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/15 hover:-translate-y-2 cursor-pointer hover-border-glow">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={1050}
                      height={1050}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-red-600/90 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                        View Product
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-bold text-white group-hover:text-red-500 transition-all duration-300 group-hover:translate-x-1">
                      {product.title}
                    </h3>
                    <div className="mb-2 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:fill-yellow-300" style={{ transitionDelay: `${i * 60}ms` }} viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-green-500 transition-all duration-300 group-hover:text-green-400 group-hover:scale-110 origin-left">{product.price}</span>
                      <span className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-zinc-300">{product.category}</span>
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
                  <Link href="/" className="hover:text-red-400 transition-all duration-300 hover:translate-x-1 inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-red-400 transition-all duration-300 hover:translate-x-1 inline-block">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-red-400 transition-all duration-300 hover:translate-x-1 inline-block">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-red-400 transition-all duration-300 hover:translate-x-1 inline-block">
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
