"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, RefreshCw, Shield, CheckCircle2, AlertTriangle, XCircle, TrendingUp, Sparkles, Clock, Wrench } from "lucide-react"

type StatusType = "undetected" | "updating" | "detected"

interface Product {
  id: string
  name: string
  image: string
  status: StatusType
  updatedAt: string
  href: string
}

const products: Product[] = [

  { id: "arc-raiders", name: "Arc Raiders", image: "/images/arc-raiders-extra.png", status: "undetected", updatedAt: "Feb 14, 2026 09:35 PM", href: "/products/arc-raiders" },

  { id: "cod", name: "Call of Duty", image: "/images/cod-extra.png", status: "undetected", updatedAt: "Feb 14, 2026 09:40 PM", href: "/products/cod" },

  { id: "fortnite", name: "Fortnite", image: "/images/fortnite-extra.png", status: "undetected", updatedAt: "Feb 14, 2026 10:00 PM", href: "/products/fortnite" },
  { id: "fivem", name: "FiveM", image: "/images/fivem.png", status: "undetected", updatedAt: "Feb 14, 2026 07:50 PM", href: "/products/fivem" },


  { id: "temp-spoofer", name: "Temp Spoofer", image: "/images/temp-spoofer-extra.jpg", status: "undetected", updatedAt: "Feb 14, 2026 08:45 PM", href: "/products/temp-spoofer" },
  { id: "perm-spoofer", name: "Perm Spoofer", image: "/images/perm-spoofer-extra.jpg", status: "undetected", updatedAt: "Feb 14, 2026 08:40 PM", href: "/products/perm-spoofer" },

]

const statusConfig = {
  undetected: { label: "UNDETECTED (WORKING)", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", dot: "bg-green-400", icon: CheckCircle2 },
  updating: { label: "UPDATING (NOT WORKING)", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", dot: "bg-yellow-400", icon: AlertTriangle },
  detected: { label: "DETECTED (NOT WORKING)", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", dot: "bg-red-400", icon: XCircle },
}

export default function StatusPage() {
  const [refreshCountdown, setRefreshCountdown] = useState(60)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) return 60
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setRefreshCountdown(60)
    setTimeout(() => setIsRefreshing(false), 1500)
  }

  const totalProducts = products.length
  const workingCount = products.filter((p) => p.status === "undetected").length
  const updatingCount = products.filter((p) => p.status === "updating").length
  const uptimeRate = totalProducts > 0 ? Math.round((workingCount / totalProducts) * 100) : 0

  // Group products by name for category display
  const grouped = products.reduce<Record<string, Product[]>>((acc, p) => {
    const key = p.name.toUpperCase()
    if (!acc[key]) acc[key] = []
    acc[key].push(p)
    return acc
  }, {})

  return (
    <div className="min-h-screen text-foreground">
      <main className="flex-1 pt-24">
        <div className="container px-6 max-w-5xl mx-auto">

          {/* Header */}
          <div className={`text-center mb-12 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
              </span>
              Live Status Monitor
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 text-balance">
              Status Updates{" "}
              <br className="hidden md:block" />
              For our <span className="text-red-500">Cheats</span>
            </h1>
            <p className="text-gray-400 max-w-md mx-auto mb-6 text-sm leading-relaxed">
              Stay informed on the status of our cheats and hacks, with real-time updates to keep you in the loop.
            </p>

            {/* Refresh */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh Status
              </button>
              <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Clock className="w-3.5 h-3.5" />
                Next refresh: {refreshCountdown}s
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Total Products */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur p-5 group/s1 hover:border-white/15 hover:-translate-y-2 hover:shadow-lg hover:shadow-white/5 transition-all duration-500">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center transition-all duration-300 group-hover/s1:bg-white/10 group-hover/s1:scale-110">
                  <Shield className="w-4.5 h-4.5 text-gray-400 transition-colors duration-300 group-hover/s1:text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-gray-600 transition-all duration-300 group-hover/s1:text-red-400 group-hover/s1:scale-110" />
              </div>
              <div className="text-3xl font-bold text-white mb-0.5 transition-all duration-300 group-hover/s1:scale-110 origin-left">{totalProducts}</div>
              <div className="text-xs text-gray-500 transition-colors duration-300 group-hover/s1:text-gray-300">Total Products</div>
            </div>

            {/* Working */}
            <div className="rounded-xl border border-green-500/10 bg-green-500/[0.02] backdrop-blur p-5 group/s2 hover:border-green-500/30 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center transition-all duration-300 group-hover/s2:bg-green-500/20 group-hover/s2:scale-110">
                  <CheckCircle2 className="w-4.5 h-4.5 text-green-400" />
                </div>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                </span>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-0.5 transition-all duration-300 group-hover/s2:scale-110 origin-left">{workingCount}</div>
              <div className="text-xs text-gray-500 transition-colors duration-300 group-hover/s2:text-gray-300">Working</div>
            </div>

            {/* Updating */}
            <div className="rounded-xl border border-yellow-500/10 bg-yellow-500/[0.02] backdrop-blur p-5 group/s3 hover:border-yellow-500/30 hover:-translate-y-2 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center transition-all duration-300 group-hover/s3:bg-yellow-500/20 group-hover/s3:scale-110">
                  <Wrench className="w-4.5 h-4.5 text-yellow-400 transition-transform duration-300 group-hover/s3:rotate-45" />
                </div>
                <Sparkles className="w-4 h-4 text-gray-600 transition-all duration-300 group-hover/s3:text-yellow-400 group-hover/s3:scale-110" />
              </div>
              <div className="text-3xl font-bold text-white mb-0.5 transition-all duration-300 group-hover/s3:scale-110 origin-left">{updatingCount}</div>
              <div className="text-xs text-gray-500 transition-colors duration-300 group-hover/s3:text-gray-300">Updating</div>
            </div>

            {/* Uptime Rate */}
            <div className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur p-5 group/s4 hover:border-green-500/20 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-500">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center transition-all duration-300 group-hover/s4:bg-green-500/10 group-hover/s4:scale-110">
                  <svg className="w-4.5 h-4.5 text-gray-400 transition-colors duration-300 group-hover/s4:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <Sparkles className="w-4 h-4 text-gray-600 transition-all duration-300 group-hover/s4:text-green-400 group-hover/s4:scale-110" />
              </div>
              <div className="text-3xl font-bold text-white mb-0.5 transition-all duration-300 group-hover/s4:text-green-400 group-hover/s4:scale-110 origin-left">{uptimeRate}%</div>
              <div className="text-xs text-gray-500 transition-colors duration-300 group-hover/s4:text-gray-300">Uptime Rate</div>
            </div>
          </div>

          {/* Status Legend */}
          <div className={`rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur p-3 mb-10 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center gap-1.5 text-gray-400 text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Status Legend:
            </div>
            {Object.entries(statusConfig).map(([key, config]) => (
              <div key={key} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color} border ${config.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                {config.label}
              </div>
            ))}
          </div>

          {/* Product List */}
          <div className={`space-y-6 pb-20 transition-all duration-700 delay-400 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {Object.entries(grouped).map(([category, items], categoryIndex) => (
              <div key={category} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${categoryIndex * 80}ms`, animationFillMode: "both", animationDuration: "500ms" }}>
                {/* Category Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-5 rounded-full bg-red-500" />
                    <h3 className="text-sm font-bold text-white tracking-wider">{category}</h3>
                  </div>
                  <span className="text-xs text-gray-600">{items.length} product{items.length > 1 ? "s" : ""}</span>
                </div>

                {/* Product Items */}
                <div className="space-y-2">
                  {items.map((product) => {
                    const config = statusConfig[product.status]
                    const Icon = config.icon
                    return (
                      <div
                        key={product.id}
                        className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur p-4 flex items-center justify-between gap-4 hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-500 group"
                      >
                        {/* Left: Icon + Name */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-black transition-all duration-300 group-hover:border-red-500/30 group-hover:scale-110">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-white truncate transition-colors duration-300 group-hover:text-red-400">{product.name}</div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              Updated {product.updatedAt}
                            </div>
                          </div>
                        </div>

                        {/* Right: Status + Purchase */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.color} border ${config.border}`}>
                            <span className="relative flex h-2 w-2">
                              <span className={`absolute inline-flex h-full w-full rounded-full ${config.dot} opacity-75 animate-ping`} />
                              <span className={`relative inline-flex h-2 w-2 rounded-full ${config.dot}`} />
                            </span>
                            <Icon className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{config.label}</span>
                          </div>
                          <Link
                            href={product.href}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-all group-hover:shadow-lg group-hover:shadow-red-500/20"
                          >
                            Purchase Now
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/80 backdrop-blur py-8 relative z-10">
        <div className="container px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold text-white">KIBACHEATS</h3>
              <p className="text-sm text-gray-400">
                Providing high-quality gaming enhancements since 2018. Our mission is to improve your daily gaming experience.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-red-400 transition-all duration-300 hover:translate-x-1 inline-block">Home</Link></li>
                <li><Link href="/products" className="hover:text-red-400 transition-all duration-300 hover:translate-x-1 inline-block">Products</Link></li>
                <li><Link href="/status" className="hover:text-red-400 transition-all duration-300 hover:translate-x-1 inline-block">Status</Link></li>
                <li><Link href="/reviews" className="hover:text-red-400 transition-all duration-300 hover:translate-x-1 inline-block">Reviews</Link></li>
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
                <li>support@kibacheats.com</li>
                <li>Join our Discord for faster support</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-white/5 pt-8 text-center">
            <p className="text-sm text-gray-400">2025 KIBA CHEATS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
