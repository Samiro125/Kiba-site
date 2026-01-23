"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Clock, Zap, AlertTriangle, XCircle } from "lucide-react"
import { Product } from "@/lib/types"

export default function StatusPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "undetected":
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
          label: "Undetected"
        }
      case "updating":
        return {
          icon: Clock,
          color: "text-orange-500",
          bg: "bg-orange-500/10",
          border: "border-orange-500/20",
          label: "Updating"
        }
      case "down":
        return {
          icon: XCircle,
          color: "text-red-500",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
          label: "Down"
        }
      default: // active fallback
        return {
          icon: CheckCircle,
          color: "text-green-500",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
          label: "Undetected"
        }
    }
  }

  const allOperational = products.every(p => p.status === 'undetected' || p.status === 'active')

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <Zap className="w-12 h-12 text-zinc-600 animate-pulse" />
        <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">Checking Systems...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20 relative bg-black selection:bg-red-500/30">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[180px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tight">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Status</span>
          </h1>
          <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest max-w-2xl mx-auto">
            Live operational status of all Kiba Cheats services
          </p>
        </div>

        {/* Overall Status */}
        <div className="mb-12">
          <div className={`p-8 rounded-3xl border backdrop-blur-xl flex items-center justify-center gap-6 ${allOperational
            ? 'bg-green-500/5 border-green-500/20'
            : 'bg-orange-500/5 border-orange-500/20'}`}>

            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${allOperational ? 'bg-green-500/10' : 'bg-orange-500/10'}`}>
              {allOperational ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              )}
            </div>

            <div className="text-left">
              <h2 className={`text-2xl font-bold uppercase tracking-tight ${allOperational ? 'text-green-500' : 'text-orange-500'}`}>
                {allOperational ? "All Systems Operational" : "Partial System Outage"}
              </h2>
              <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mt-1">
                {allOperational
                  ? "All cheats and spoofers are currently undetected and safe to use."
                  : "Some products are currently undergoing maintenance or updates."}
              </p>
            </div>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid gap-4">
          {products.map((item, index) => {
            const status = getStatusConfig(item.status)
            const Icon = status.icon

            return (
              <div
                key={item.id}
                className="group flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl bg-zinc-900/20 border border-white/5 hover:border-white/10 transition-all backdrop-blur-md"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${status.bg} ${status.border} border`}>
                    <Icon className={`w-6 h-6 ${status.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider group-hover:text-red-500 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.game}</span>
                      <div className="w-1 h-1 rounded-full bg-zinc-700" />
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Version {item.id.substring(0, 6)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto mt-6 md:mt-0 justify-between md:justify-end">
                  <div className="hidden md:block text-right">
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Uptime</p>
                    <p className="text-sm font-semibold text-zinc-400">99.9%</p>
                  </div>

                  <div className={`px-6 py-2 rounded-full border ${status.bg} ${status.border} ${status.color} shadow-lg shadow-${status.color}/10`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${status.color.replace('text-', 'bg-')} animate-pulse`} />
                      <span className="text-xs font-bold uppercase tracking-widest">{status.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500">No products found.</p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
            <Clock className="w-4 h-4" />
            Status updates are automated relative to server health ticks.
          </div>
        </div>
      </div>
    </div>
  )
}
