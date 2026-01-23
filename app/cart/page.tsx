"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap, Info, CreditCard, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, total, clearCart } = useCart()
    const [email, setEmail] = useState("")
    const [checkoutLoading, setCheckoutLoading] = useState(false)

    const handleCheckout = async () => {
        if (items.length === 0) return
        if (!email || !email.includes("@")) {
            toast.error("Invalid Extraction Point: Please provide a valid email.")
            return
        }

        setCheckoutLoading(true)
        try {
            // In a real multi-item setup, we'd send all items to the backend.
            // Fanbasis might require individual sessions or a custom bundle.
            // For this implementation, we simulate a bundle request.

            const res = await fetch("/api/fanbasis/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    items: items.map(i => ({
                        id: i.productId,
                        name: i.name,
                        duration: i.duration,
                        price: i.price,
                        quantity: i.quantity
                    })),
                    isCartCheckout: true,
                    total: total
                })
            })

            if (res.ok) {
                const data = await res.json()
                const url = data.url || data.payment_link
                if (url) {
                    window.location.href = url
                } else {
                    toast.error("Gateway Link Failure")
                    setCheckoutLoading(false)
                }
            } else {
                const err = await res.json()
                toast.error(err.error || "Execution Error")
                setCheckoutLoading(false)
            }
        } catch (e) {
            toast.error("System Override Detected: Checkout Failed")
            setCheckoutLoading(false)
        }
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center space-y-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-20 animate-pulse" />
                    <div className="relative w-32 h-32 rounded-[2rem] bg-zinc-900 border border-white/5 flex items-center justify-center shadow-2xl">
                        <ShoppingBag className="w-16 h-16 text-zinc-800" />
                    </div>
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Cart Empty</h1>
                    <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest max-w-sm mx-auto">
                        Your secure shopping container is currently empty. Initialize your loadout to proceed.
                    </p>
                </div>
                <Link href="/products">
                    <Button className="h-16 px-10 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-red-900/20 active:scale-95 transition-all">
                        Return to Store
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-transparent selection:bg-red-500/30 pt-40 pb-32 relative text-left">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Side: Items */}
                    <div className="flex-1 space-y-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase flex items-center gap-4">
                                Loadout Summary
                                <Badge className="bg-red-600 text-white font-black text-[10px] px-3 py-1 rounded-full border-none">
                                    {items.length} MODULES
                                </Badge>
                            </h1>
                            <Button
                                variant="ghost"
                                onClick={clearCart}
                                className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-red-500 hover:bg-red-500/5"
                            >
                                Dump Entire Container
                            </Button>
                        </div>

                        <div className="grid gap-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-2xl hover:border-white/10 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/[0.02] blur-3xl rounded-full" />

                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-black border border-white/5 shadow-xl">
                                            <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{item.name}</h3>
                                                <span className="text-lg font-black text-white italic">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest bg-white/5 border-white/10 text-zinc-500">
                                                    {item.duration} Plan
                                                </Badge>
                                                <span className="text-[10px] text-zinc-700 font-bold uppercase tracking-widest">${item.price.toFixed(2)} per unit</span>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-1 bg-black/60 rounded-xl border border-white/5 p-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <span className="w-10 text-center text-xs font-black text-white">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="h-8 w-8 text-zinc-500 hover:text-white hover:bg-white/5 rounded-lg"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-zinc-700 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" strokeWidth={3} />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Execution Details */}
                    <div className="lg:w-[400px] space-y-8">
                        <div className="sticky top-40 space-y-6">
                            <div className="p-8 rounded-[2.5rem] bg-zinc-900/60 border border-white/5 backdrop-blur-3xl shadow-3xl space-y-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[100px] -z-10 rounded-full" />

                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Transaction Manifest</p>
                                    <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Execution Details</h2>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Base Payload</span>
                                        <span className="text-xs font-black text-white">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-2">
                                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Protocol Fee</span>
                                        <span className="text-xs font-black text-green-500 uppercase">FREE</span>
                                    </div>
                                    <div className="h-px bg-white/5" />
                                    <div className="flex justify-between items-end px-2 pt-2">
                                        <span className="text-sm font-black text-white uppercase tracking-widest">Total Valuation</span>
                                        <span className="text-3xl font-black text-white italic tracking-tighter">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative group/mail">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within/mail:text-red-500 transition-colors" />
                                        <Input
                                            placeholder="RECIPIENT@GMAIL.COM"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="h-16 bg-black/40 border-white/5 rounded-2xl pl-14 text-[10px] font-black tracking-widest text-zinc-400 focus:border-red-500/30 transition-all uppercase"
                                        />
                                    </div>

                                    <Button
                                        onClick={handleCheckout}
                                        disabled={checkoutLoading}
                                        className="w-full h-20 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-red-900/40 active:scale-95 transition-all text-sm group"
                                    >
                                        {checkoutLoading ? (
                                            <><div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3" /> Transmitting...</>
                                        ) : (
                                            <><CreditCard className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" /> Secure Checkout</>
                                        )}
                                    </Button>
                                </div>

                                <div className="flex items-center justify-center gap-4 text-zinc-600">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[8px] font-black uppercase tracking-widest">SSL Encrypted 256-Bit Gateway</span>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md space-y-4">
                                <div className="flex items-center gap-3">
                                    <Info className="w-4 h-4 text-red-500" />
                                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Protocol Information</p>
                                </div>
                                <p className="text-[9px] text-zinc-500 font-bold leading-relaxed uppercase tracking-widest">
                                    Keys are automatically extracted and delivered to your specified email protocol upon successful payment validation. No manual intervention required.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
