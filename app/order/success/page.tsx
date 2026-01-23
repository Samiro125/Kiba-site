"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, ArrowRight, ShieldCheck, MessageSquare, Download } from "lucide-react"
import { useEffect, useState, Suspense } from "react"
import { motion } from "framer-motion"

function SuccessContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get("orderId") || "PENDING-CONFIRMATION"

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl w-full text-center space-y-10">

                {/* Animated Icon */}
                <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-20" />
                    <div className="absolute inset-0 bg-green-500/10 rounded-full blur-xl" />
                    <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                        <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
                        Payment <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Secure</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-medium max-w-lg mx-auto">
                        Your transaction has been verified. The secure extraction protocol has initiated delivery.
                    </p>
                </div>

                {/* Order Card */}
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent opacity-50" />

                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Transaction ID</p>
                            <p className="text-sm font-mono text-white truncate">{orderId}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <p className="text-sm font-bold text-green-500 uppercase">Confirmed</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Delivery Method</p>
                            <div className="flex items-center gap-2 text-white">
                                <Mail className="w-4 h-4" />
                                <p className="text-sm font-bold uppercase">Email Dispatch</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-4 text-left">
                        <ShieldCheck className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-green-400 uppercase tracking-widest">Next Steps</p>
                            <p className="text-xs text-green-300/80 leading-relaxed font-medium">
                                Your license key has been automatically generated and sent to your email address.
                                Please check your inbox (and spam folder) for an email from <span className="text-white">Kiba Cheats</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/" className="w-full sm:w-auto">
                        <Button className="w-full h-14 px-8 bg-zinc-900 text-white border border-white/10 hover:bg-zinc-800 rounded-xl font-bold uppercase tracking-widest hover:scale-105 transition-all">
                            Return to Store
                        </Button>
                    </Link>

                    <Link href="https://discord.com/invite/82r9zWz2EA" target="_blank" className="w-full sm:w-auto">
                        <Button className="w-full h-14 px-8 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-[#5865F2]/20 hover:scale-105 transition-all group">
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Join Community
                        </Button>
                    </Link>
                </div>

                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                    Need help? Contact support via Discord
                </p>
            </div>
        </div>
    )
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <SuccessContent />
        </Suspense>
    )
}
