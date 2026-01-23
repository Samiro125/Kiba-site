"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Coupon } from "@/lib/types"
import { Ticket, Plus, Trash2, Copy, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Create Form State
  const [newCode, setNewCode] = useState("")
  const [newValue, setNewValue] = useState("")

  const fetchCoupons = () => {
    fetch("/api/admin/coupons").then(res => res.json()).then(data => {
      setCoupons(data.coupons || [])
      setLoading(false)
    })
  }

  useEffect(() => { fetchCoupons() }, [])

  const handleCreate = async () => {
    if (!newCode || !newValue) return
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        body: JSON.stringify({
          code: newCode,
          value: parseFloat(newValue),
          type: "percentage", // simplified for demo
          status: "active"
        })
      })
      if (res.ok) {
        toast.success("Coupon created")
        setOpen(false)
        fetchCoupons()
        setNewCode(""); setNewValue("")
      }
    } catch (e) { toast.error("Failed to create") }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete coupon?")) return
    await fetch(`/api/admin/coupons?id=${id}`, { method: "DELETE" })
    fetchCoupons()
    toast.success("Coupon deleted")
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Coupons</h1>
          <p className="text-gray-400">Manage discount codes.</p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-white text-black hover:bg-gray-200">
              <Plus className="w-4 h-4 mr-2" /> Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-950 border-white/10 text-white">
            <DialogHeader><DialogTitle>New Coupon</DialogTitle></DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Code</Label>
                <Input value={newCode} onChange={e => setNewCode(e.target.value.toUpperCase())} placeholder="SUMMER2025" className="bg-black/50 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label>Discount Percentage (%)</Label>
                <Input type="number" value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="15" className="bg-black/50 border-white/10" />
              </div>
              <Button onClick={handleCreate} className="w-full bg-red-600 hover:bg-red-700 text-white">Create Coupon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? <p className="text-gray-500">Loading...</p> : coupons.map(c => (
          <div key={c.id} className="relative group flex h-32 w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 transition-all hover:border-red-500/30">
            <div className="flex w-24 flex-col items-center justify-center bg-gradient-to-br from-red-600 to-red-800 text-white p-4 relative">
              <Ticket className="w-8 h-8 mb-2 opacity-80" />
              <span className="text-xs font-bold uppercase tracking-wider opacity-75">Coupon</span>
            </div>
            <div className="flex flex-1 flex-col justify-between p-4 bg-zinc-900/50 backdrop-blur-sm">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">{c.code}</h3>
                <p className="text-sm text-gray-400">{c.value}% OFF</p>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => copyCode(c.code)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"><Copy className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(c.id)} className="p-2 hover:bg-red-500/10 rounded-full text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}