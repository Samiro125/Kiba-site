"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, ArrowLeft, Zap, Shield, CheckCircle, Monitor, ArrowRight, Grid, List, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

const categories = ["All", "Game Cheat", "Spoofer", "Account", "Tool"]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        if (res.ok) {
          const data = await res.json()
          setProducts(data)
        }
      } catch (error) {
        console.error("Failed to fetch products", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch = (product.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
        (product.game?.toLowerCase() || "").includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    }
  )

  return (
    <div className="flex min-h-screen flex-col bg-transparent selection:bg-red-500/30 overflow-hidden text-left">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[180px]" />
      </div>

      <main className="flex-1 pt-32 pb-40 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">

          {/* Hero Section */}
          <div className="mb-20 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-red-500 transition-colors group">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Store Protocol
            </Link>
            <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
              Software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-white">Repository</span>
            </h1>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-2xl">
            <div className="flex flex-wrap items-center gap-3">
              {categories.map(cat => (
                <Button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  variant="ghost"
                  className={`h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat
                      ? "bg-red-600 text-white shadow-xl shadow-red-900/40"
                      : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                    }`}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="w-full lg:w-96 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
              <Input
                placeholder="FILTER BY GAME OR MODULE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 bg-black/40 border-white/5 rounded-xl pl-12 text-[10px] font-black tracking-[0.2em] text-zinc-400 focus:border-red-500/40 transition-all uppercase"
              />
            </div>
          </div>

          {/* Products List */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-[4/5] rounded-[2.5rem] bg-zinc-900/40 animate-pulse border border-white/5" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => {
                const out = product.totalStock === 0
                return (
                  <Link key={product.id} href={`/products/${product.id}`} className="group relative">
                    <Card className="rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-3xl overflow-hidden transition-all duration-700 hover:border-red-500/30 hover:-translate-y-2 group-hover:shadow-[0_40px_100px_rgba(220,38,38,0.1)]">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                        />

                        <div className="absolute top-8 left-8 z-20 flex gap-2">
                          <Badge className="bg-white text-black font-black text-[8px] px-3 py-1 rounded-full border-none">
                            {product.category}
                          </Badge>
                          {out && (
                            <Badge className="bg-red-600 text-white font-black text-[8px] px-3 py-1 rounded-full border-none shadow-lg shadow-red-900/40">
                              OUT OF STOCK
                            </Badge>
                          )}
                        </div>

                        <div className="absolute top-8 right-8 z-20">
                          <div className="w-10 h-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                            <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
                          </div>
                        </div>

                        {/* Hover Overlay Info */}
                        <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      </div>

                      <div className="p-10 relative z-20 space-y-6">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-red-600 uppercase tracking-[0.4em]">{product.game}</p>
                          <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">{product.name}</h3>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Pricing Model</span>
                            <span className="text-2xl font-black text-white italic tracking-tighter">
                              ${product.durations && product.durations.length > 0
                                ? Math.min(...product.durations.map(d => d.price)).toFixed(2)
                                : product.price.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Inventory Status</span>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${out ? 'text-red-500' : 'text-green-500'}`}>
                              {out ? 'Depleted' : `${product.totalStock} Active Keys`}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 flex items-center gap-4">
                          <Button className="flex-1 h-14 rounded-2xl bg-white text-black hover:bg-red-600 hover:text-white font-black uppercase tracking-widest text-[10px] transition-all duration-300">
                            View Modules
                          </Button>
                          <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:bg-red-600/10 group-hover:text-red-500 transition-all">
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <div className="py-40 text-center space-y-6 flex flex-col items-center">
              <div className="w-24 h-24 rounded-[2rem] bg-zinc-900 border border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-red-600/5 blur-2xl" />
                <Search className="h-10 w-10 text-zinc-800" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">No Modules Extracted</h3>
                <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest">Your current search query returned 0 results from the repository.</p>
              </div>
              <Button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                variant="outline"
                className="border-white/5 bg-white/5 text-white font-black text-[10px] tracking-widest uppercase h-12 px-8 rounded-xl"
              >
                Reset Store Protocol
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
