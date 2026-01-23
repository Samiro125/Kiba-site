"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, XCircle } from "lucide-react"

export default function TestEmailPage() {
    const [email, setEmail] = useState("leenathan710@gmail.com")
    const [productId, setProductId] = useState("fortnite")
    const [duration, setDuration] = useState("1 Day")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const testEmail = async () => {
        setLoading(true)
        setResult(null)

        try {
            const res = await fetch("/api/test-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, productId, duration })
            })

            const data = await res.json()
            setResult(data)
        } catch (error: any) {
            setResult({ success: false, error: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="container mx-auto max-w-2xl">
                <Card className="bg-zinc-900 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Mail className="w-6 h-6 text-red-500" />
                            Email Delivery Test
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-black border-white/10 text-white"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Product ID</label>
                                <Input
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    className="bg-black border-white/10 text-white"
                                    placeholder="fortnite"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Duration</label>
                                <Input
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="bg-black border-white/10 text-white"
                                    placeholder="1 Day"
                                />
                            </div>

                            <Button
                                onClick={testEmail}
                                disabled={loading}
                                className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-black uppercase"
                            >
                                {loading ? "Sending..." : "Send Test Email"}
                            </Button>
                        </div>

                        {result && (
                            <Card className={`${result.success ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                <CardContent className="pt-6">
                                    <div className="flex items-start gap-3">
                                        {result.success ? (
                                            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                                        ) : (
                                            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                                        )}
                                        <div className="flex-1">
                                            <p className={`font-bold ${result.success ? 'text-green-500' : 'text-red-500'}`}>
                                                {result.message || result.error || "Unknown error"}
                                            </p>
                                            {result.licenseKey && (
                                                <p className="text-white mt-2 font-mono text-sm">
                                                    License Key: {result.licenseKey}
                                                </p>
                                            )}
                                            {result.emailSent !== undefined && (
                                                <p className="text-zinc-400 text-sm mt-1">
                                                    Email Status: {result.emailSent ? "✅ Sent" : "❌ Failed"}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="text-xs text-zinc-500 space-y-1">
                            <p>• This will assign a real license key from your inventory</p>
                            <p>• Make sure you have keys available for the selected product/duration</p>
                            <p>• Check your email inbox (and spam folder) for the test email</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
