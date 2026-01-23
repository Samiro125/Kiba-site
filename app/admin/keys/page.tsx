"use client"

import { useEffect, useState } from "react"
import { Card, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { LicenseKey, Product } from "@/lib/types"
import { Edit3, Package, Clock, RefreshCw, Loader2, ShieldCheck, Database } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function LicenseKeysPage() {
  const [keys, setKeys] = useState<LicenseKey[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // UI State
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingDuration, setEditingDuration] = useState<{ productId: string, productName: string, duration: string } | null>(null)
  const [editKeysInput, setEditKeysInput] = useState("")
  const [isSyncing, setIsSyncing] = useState(false)

  const fetchData = () => {
    setLoading(true)
    Promise.all([
      fetch("/api/admin/license-keys").then(r => r.json()),
      fetch("/api/products").then(r => r.json())
    ])
      .then(([kData, pData]) => {
        setKeys(kData.keys || [])
        setProducts(pData || [])
      })
      .catch(err => {
        toast.error("Failed to load secure database")
        console.error(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const handleOpenEdit = (productId: string, productName: string, duration: string) => {
    // Get currently available keys for this combination
    const durationKeys = keys
      .filter(k => k.productId === productId && k.duration === duration && k.status === "available")
      .map(k => k.key)
      .join("\n")

    setEditingDuration({ productId, productName, duration })
    setEditKeysInput(durationKeys)
    setEditModalOpen(true)
  }

  const handleSyncKeys = async () => {
    if (!editingDuration) return
    setIsSyncing(true)

    const keysList = editKeysInput.split("\n").map(k => k.trim()).filter(k => k.length > 0)

    try {
      const res = await fetch("/api/admin/license-keys", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: editingDuration.productId,
          duration: editingDuration.duration,
          keys: keysList
        })
      })

      if (res.ok) {
        toast.success(`Encrypted Update Success: ${editingDuration.duration} keys for ${editingDuration.productName}`)
        setEditModalOpen(false)
        fetchData()
      } else {
        const err = await res.json()
        toast.error(err.error || "Failed to sync keys")
      }
    } catch (e) {
      toast.error("System Protocol Breach - Connection Error")
    } finally {
      setIsSyncing(false)
    }
  }

  // Calculate detailed inventory
  const inventoryData = products.map(p => {
    const productKeys = keys.filter(k => k.productId === p.id)

    // Get durations from product object
    const definedDurations = p.durations && p.durations.length > 0
      ? p.durations.map(d => d.duration)
      : []

    // Identify keys that don't match any defined duration
    const orphanedKeys = productKeys.filter(k =>
      k.status === "available" && (!k.duration || !definedDurations.includes(k.duration))
    ).length

    const durations = [...definedDurations]
    if (durations.length === 0) {
      durations.push("Universal")
    }

    const durationsStock = durations.map(dur => {
      const isUniversal = dur === "Universal"
      const available = productKeys.filter(k => {
        if (isUniversal) return k.status === "available" && (!k.duration || !definedDurations.includes(k.duration))
        return k.duration === dur && k.status === "available"
      }).length

      const used = productKeys.filter(k => {
        if (isUniversal) return k.status === "used" && (!k.duration || !definedDurations.includes(k.duration))
        return k.duration === dur && k.status === "used"
      }).length

      return {
        duration: dur,
        available,
        total: available + used
      }
    })

    const totalAvailable = productKeys.filter(k => k.status === "available").length
    return { ...p, durationsStock, totalAvailable }
  })

  return (
    <div className="space-y-8 pb-32 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter flex items-center gap-3">
            <Database className="w-8 h-8 text-red-600" />
            INVENTORY REPOSITORY
          </h1>
          <p className="text-gray-400 mt-1 font-medium">Control secure license strings and monitor stock levels per plan.</p>
        </div>
        <Button onClick={fetchData} variant="outline" className="border-white/5 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Database
        </Button>
      </div>

      <div className="grid gap-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
            <p className="text-red-500 font-black tracking-[0.3em] uppercase animate-pulse">Establishing Secure Connection...</p>
          </div>
        ) : (
          inventoryData.map(product => (
            <Card key={product.id} className="bg-zinc-900/40 border-white/5 backdrop-blur-2xl overflow-hidden group shadow-2xl relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-3xl -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />

              <div className="p-6 border-b border-white/5 bg-white/[0.01] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 flex items-center justify-center border border-white/10 group-hover:border-red-500/50 group-hover:bg-red-950/20 transition-all duration-500 shadow-xl">
                    <Package className="w-7 h-7 text-gray-500 group-hover:text-red-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight italic group-hover:text-red-500 transition-colors">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black text-zinc-500 tracking-[0.2em] uppercase">{product.game}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      <span className="text-[10px] font-black text-red-600 tracking-[0.2em] uppercase">{product.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`px-4 py-1 rounded-full text-[10px] font-black border transition-all ${product.totalAvailable > 0 ? "bg-green-600/10 text-green-500 border-green-500/20" : "bg-red-600/10 text-red-500 border-red-500/20 animate-pulse"}`}>
                    {product.totalAvailable} SECURE STRINGS AVAILABLE
                  </Badge>
                  <p className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase">Encryption Status: AES-256 Verified</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-black/30 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                      <th className="px-8 py-5">Access Plan</th>
                      <th className="px-8 py-5">Stock Health</th>
                      <th className="px-8 py-5">String Count</th>
                      <th className="px-8 py-5 text-right">Administrative Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {product.durationsStock.map(stock => (
                      <tr key={stock.duration} className="hover:bg-white/[0.02] transition-all duration-300 group/row">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-red-500/30 group-hover/row:text-red-500 transition-colors" />
                            <span className="font-black text-white text-base tracking-tight italic uppercase">{stock.duration} Access</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="flex-1 min-w-[120px] h-2 bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                              <div
                                className={`h-full transition-all duration-1000 rounded-full ${stock.available < 5 ? 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'bg-gradient-to-r from-green-600 to-green-400'}`}
                                style={{ width: `${Math.min((stock.available / 20) * 100, 100)}%` }}
                              />
                            </div>
                            <span className={`text-[10px] font-black tracking-widest uppercase ${stock.available < 5 ? 'text-red-500' : 'text-zinc-500'}`}>
                              {stock.available < 5 ? 'CRITICAL' : 'OPTIMAL'}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className={`font-mono text-lg font-black ${stock.available === 0 ? 'text-red-600' : 'text-white'}`}>
                              {stock.available.toString().padStart(2, '0')}
                            </span>
                            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Active Storage</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(product.id, product.name, stock.duration)}
                            className="text-zinc-400 hover:text-white hover:bg-red-600 bg-zinc-800/50 border border-white/5 hover:border-red-500 transition-all duration-300 rounded-xl px-5 font-black uppercase text-[10px] tracking-widest gap-2 group/btn shadow-lg"
                          >
                            <Edit3 className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                            Manage Keys
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl bg-zinc-950 border-white/10 text-white shadow-[0_0_100px_rgba(220,38,38,0.15)] rounded-[2rem] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-white/50 to-red-600" />

          <DialogHeader className="pt-6">
            <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-red-600" />
              Secure Stock Sync
            </DialogTitle>
            <div className="mt-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Product Identification</p>
              <p className="text-lg font-black text-white uppercase italic">{editingDuration?.productName}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-red-600 text-white border-none text-[8px] font-black px-2 py-0.5">{editingDuration?.duration} PLAN</Badge>
                <span className="text-[9px] text-zinc-600 font-medium">Overwriting active database strings for this segment.</span>
              </div>
            </div>
          </DialogHeader>

          <div className="py-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-zinc-800/20 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000" />
              <Textarea
                value={editKeysInput}
                onChange={(e) => setEditKeysInput(e.target.value)}
                placeholder="PASTE_ENCRYPTED_KEYS_HERE..."
                className="relative min-h-[350px] bg-black/80 border-white/5 text-green-500 font-mono text-xs leading-relaxed focus:border-red-500/50 rounded-xl p-6 shadow-3xl selection:bg-red-500/30 overflow-y-auto"
              />
            </div>
            <div className="mt-4 flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Parser Active</span>
              </div>
              <div className="text-[10px] text-white font-black uppercase tracking-[0.2em] bg-zinc-900 border border-white/5 px-3 py-1 rounded-full">
                {editKeysInput.split("\n").filter(k => k.trim()).length} STRINGS DETECTED
              </div>
            </div>
          </div>

          <DialogFooter className="pb-6 pt-2 gap-3">
            <Button variant="ghost" onClick={() => setEditModalOpen(false)} className="text-zinc-500 hover:text-white hover:bg-white/5 font-black uppercase text-[10px] tracking-widest px-8">
              Abort Sync
            </Button>
            <Button
              onClick={handleSyncKeys}
              disabled={isSyncing}
              className="bg-red-600 hover:bg-red-700 text-white font-black uppercase text-[10px] tracking-[0.2em] px-10 h-12 shadow-2xl shadow-red-900/40 rounded-xl active:scale-95 transition-all group"
            >
              {isSyncing ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Transmitting...</>
              ) : (
                <>Commit Database Changes</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}