"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft, CheckCircle, Shield, Zap, Box, Star,
  AlertTriangle, Monitor, ShoppingBag, ArrowRight,
  Mail, X, ChevronRight, Plus, ShoppingCart, Info
} from "lucide-react"
import { useState, useEffect, use } from "react"
import { Product } from "@/lib/types"
import { useCart } from "@/components/cart-provider"
import { Badge } from "@/components/ui/badge"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = resolvedParams.id
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(0)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`)
        if (res.ok) {
          const data: Product = await res.json()
          setProduct(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <Zap className="w-12 h-12 text-red-600 animate-pulse" />
        <p className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500">Decrypting Catalog...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-center">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-6 animate-pulse" />
        <h1 className="mb-4 text-3xl font-bold text-white">Product Not Found</h1>
        <p className="mb-8 text-gray-400">The product identifier "{id}" does not exist.</p>
        <Link href="/products">
          <Button variant="outline" className="border-red-500 text-red-500">
            Return to Store
          </Button>
        </Link>
      </div>
    )
  }

  const selectedDuration = product.durations?.[selectedDurationIndex]
  const currentPrice = selectedDuration?.price ?? product.price
  const currentDurationLabel = selectedDuration?.duration ?? "Universal"

  // Stock Check Logic
  const currentStock = product.stockMapping?.[currentDurationLabel] || 0
  const isOutOfStock = currentStock <= 0

  const handleAddToCart = () => {
    if (isOutOfStock) return
    addToCart({
      productId: product.id,
      name: product.name,
      duration: currentDurationLabel,
      price: currentPrice,
      image: product.image
    })
  }

  return (
    <div className="min-h-screen bg-transparent selection:bg-red-500/30 overflow-hidden text-left relative pt-12">
      {/* Dynamic Backgrounds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-red-900/5 rounded-full blur-[180px]" />
      </div>

      <main className="container mx-auto px-4 py-20 relative z-10 max-w-7xl space-y-12">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-md w-fit">
            <Link href="/products" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Catalog</Link>
            <ChevronRight className="w-3 h-3 text-zinc-700" />
            <span className="text-xs font-black uppercase tracking-widest text-white">{product.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">System Undetected</span>
            </div>
          </div>
        </div>

        {/* Main Interface Card */}
        <div className="rounded-[3rem] border border-white/5 bg-zinc-950/40 backdrop-blur-3xl overflow-hidden shadow-2xl relative">
          <div className="grid lg:grid-cols-2 gap-0 items-start">

            {/* Image Section */}
            <div className="relative group bg-zinc-950 border-r border-white/5 w-full">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={1200}
                height={1200}
                className="w-full h-auto object-cover"
                priority
              />

              <div className="absolute top-6 left-6 z-30 flex flex-wrap gap-2">
                <Badge className="bg-red-600 text-white border-none font-black text-[9px] px-3 py-1 rounded-md shadow-lg shadow-red-900/40">
                  KERNEL LEVEL
                </Badge>
              </div>

              <div className="absolute bottom-6 left-6 z-30">
                <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,1)] animate-pulse" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">Undetected</span>
                </div>
              </div>
            </div>

            {/* Config Section */}
            <div className="flex flex-col p-8 md:p-14 relative z-20 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tight">{product.name}</h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">500+ Verified Sales</span>
                </div>
              </div>

              {/* Selection Logic */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Select Access Period</p>
                  <div className="h-px flex-1 bg-white/5 ml-6" />
                </div>

                <div className="grid gap-3">
                  {product.durations?.map((d, index) => {
                    const active = selectedDurationIndex === index
                    const stock = product.stockMapping?.[d.duration] || 0
                    const out = stock <= 0

                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedDurationIndex(index)}
                        className={`p-5 rounded-2xl border transition-all duration-300 flex justify-between items-center cursor-pointer relative overflow-hidden group/item ${active
                          ? "bg-red-600/10 border-red-500/50 shadow-2xl"
                          : "bg-black/40 border-white/5 hover:border-white/10"
                          } ${out ? 'opacity-50 grayscale' : ''}`}
                      >
                        <div className="flex items-center gap-4 text-left relative z-10">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${active ? "bg-red-600 border-red-500 shadow-xl" : "bg-zinc-900 border-white/5"}`}>
                            <Zap className={`w-5 h-5 ${active ? "text-white" : "text-zinc-500"}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className={`text-sm font-black uppercase tracking-widest ${active ? "text-white" : "text-zinc-400"}`}>{d.duration}</p>
                              {out && <Badge className="bg-red-600/20 text-red-500 border-none text-[8px] font-black">SOLD OUT</Badge>}
                            </div>
                            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">
                              {out ? "Restocking in Progress" : "Instant Digital Key"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right flex flex-col items-end gap-1 relative z-10">
                          <span className={`text-2xl font-bold tracking-tight ${active ? "text-white" : "text-zinc-300"}`}>${d.price.toFixed(2)}</span>
                          {active && !out && (
                            <div className="flex items-center gap-1.5 text-red-500 text-[8px] font-black uppercase tracking-[0.2em] animate-in slide-in-from-right-2">
                              <CheckCircle className="w-3 h-3" /> Selected Configuration
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 space-y-4">
                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`flex-1 h-20 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3 ${isOutOfStock
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-red-900/40'
                      }`}
                  >
                    {isOutOfStock ? (
                      <><AlertTriangle className="w-5 h-5" /> Variant Out of Stock</>
                    ) : (
                      <><ShoppingCart className="w-5 h-5" /> Add to Shopping Cart</>
                    )}
                  </Button>

                  <Link href="/cart" className="contents">
                    <Button variant="outline" className="h-20 w-24 rounded-[1.5rem] border-white/5 bg-zinc-900/40 hover:bg-zinc-800 text-white transition-all group">
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-center gap-6 px-10 py-5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500/50" />
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Encrypted Auth</span>
                  </div>
                  <div className="w-px h-4 bg-white/5" />
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-blue-500/50" />
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Instant Sync</span>
                  </div>
                  <div className="w-px h-4 bg-white/5" />
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-purple-500/50" />
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">HWID Spoofer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 items-stretch">
          <DetailCard
            title="Module Features"
            icon={Zap}
            items={product.features?.length > 0 ? product.features : ["Advanced customization", "Low resource usage"]}
          />
          <DetailCard
            title="Requirements"
            icon={Monitor}
            items={["Windows 10/11", "Intel/AMD CPU", "64-Bit OS Only"]}
          />
          <DetailCard
            title="Auto-Fulfillment"
            icon={Mail}
            items={["Instant Email Key", "Setup Guide PDF", "Discord Support"]}
          />
          <DetailCard
            title="Security Specs"
            icon={Shield}
            items={["Cloud Injected", "VMT Hooking", "Unique Build"]}
          />
        </div>
      </main>
    </div>
  )
}

function DetailCard({ title, items, icon: Icon }: any) {
  return (
    <div className="bg-zinc-950/40 backdrop-blur-xl rounded-[2rem] border border-white/5 p-8 hover:border-white/10 transition-all duration-500 group/detail relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/5 blur-3xl rounded-full" />
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover/detail:border-red-500/50 transition-colors">
          <Icon className="w-4 h-4 text-zinc-500 group-hover/detail:text-red-500" />
        </div>
        <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">{title}</h4>
      </div>
      <ul className="space-y-3">
        {items.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-4">
            <CheckCircle className="h-3.5 w-3.5 text-red-500/50 mt-0.5" />
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest group-hover/detail:text-zinc-300 transition-colors">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}
