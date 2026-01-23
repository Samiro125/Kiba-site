"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Order } from "@/lib/types"
import { toast } from "sonner"
import { Search, RefreshCw, Eye, X, ShieldAlert, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [validationError, setValidationError] = useState<{ msg: string, requiresForce: boolean } | null>(null)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/orders")
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      toast.error("Connection error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  const handleUpdateStatus = async (status: string, force: boolean = false) => {
    if (!selectedOrder) return
    setIsUpdating(true)
    setValidationError(null)

    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedOrder.id, status, force })
      })
      const data = await res.json()

      if (res.ok) {
        toast.success(`Order updated to ${status}`)
        if (data.keyAssigned) toast.success("License key auto-delivered!")
        if (data.keyError) toast.warning(data.keyError)

        fetchOrders()
        setSelectedOrder(null)
      } else {
        // Handle Validation Errors
        if (data.requiresForce) {
          setValidationError({ msg: data.message, requiresForce: true })
        } else {
          toast.error(data.error || "Update failed")
        }
      }
    } catch (e) {
      toast.error("System error")
    } finally {
      setIsUpdating(false)
    }
  }

  // Filter Logic
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || order.customerEmail.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || order.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 relative min-h-screen pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Orders</h1>
          <p className="text-gray-400">Transaction validation & fulfillment.</p>
        </div>
        <Button onClick={fetchOrders} variant="outline" className="bg-zinc-900 border-white/10 hover:bg-white/5 text-white">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>

      <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input placeholder="Search ID or Email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-black/40 border-white/10 text-white focus:ring-red-500/50" />
          </div>
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            {['all', 'completed', 'pending', 'failed'].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === f ? 'bg-zinc-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="rounded-xl border border-white/5 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/40 text-gray-400 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}><td colSpan={6} className="px-6 py-4"><div className="h-8 bg-white/5 rounded animate-pulse" /></td></tr>
                ))
              ) : filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500 text-xs">#{order.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 text-white">{order.customerEmail}</td>
                  <td className="px-6 py-4 text-gray-300">{order.productName}</td>
                  <td className="px-6 py-4 font-bold text-white">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className={`uppercase text-[10px] ${order.status === 'completed' ? 'text-green-400 border-green-500/20 bg-green-500/10' :
                      order.status === 'failed' ? 'text-red-400 border-red-500/20 bg-red-500/10' :
                        'text-amber-400 border-amber-500/20 bg-amber-500/10'
                      }`}>{order.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)} className="text-gray-400 hover:text-white hover:bg-white/10">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-zinc-950 border border-white/10 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900/50">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500" /> Review Order
              </h3>
              <Button variant="ghost" size="icon" onClick={() => { setSelectedOrder(null); setValidationError(null); }}><X className="w-5 h-5" /></Button>
            </div>

            <div className="p-6 space-y-4">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Order ID</Label>
                  <p className="font-mono text-sm text-white">{selectedOrder.id}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500">Amount</Label>
                  <p className="text-sm font-bold text-green-400">${selectedOrder.amount.toFixed(2)}</p>
                </div>
              </div>

              {/* Validation Warning */}
              {validationError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm text-red-200 font-medium">{validationError.msg}</p>
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus('completed', true)}
                      className="bg-red-600 hover:bg-red-700 text-white w-full"
                    >
                      I understand, Force Complete
                    </Button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {!validationError && (
                <div className="pt-4 border-t border-white/5">
                  <Label className="mb-3 block text-white font-bold">Set Status</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {['completed', 'pending', 'failed'].map(s => (
                      <Button
                        key={s}
                        disabled={isUpdating || selectedOrder.status === s}
                        onClick={() => handleUpdateStatus(s)}
                        className={`capitalize ${selectedOrder.status === s ? 'bg-white text-black' : 'bg-zinc-800 text-gray-400 hover:text-white'}`}
                      >
                        {isUpdating && selectedOrder.status !== s ? <Loader2 className="w-4 h-4 animate-spin" /> : s}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}