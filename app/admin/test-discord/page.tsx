"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

export default function TestDiscordPage() {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    const testDiscord = async (type: "success" | "outofstock") => {
        setLoading(true)
        setResult(null)

        try {
            const res = await fetch("/api/test-discord", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type })
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
                            <MessageSquare className="w-6 h-6 text-[#5865F2]" />
                            Discord Webhook Test
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            <Button
                                onClick={() => testDiscord("success")}
                                disabled={loading}
                                className="w-full h-16 bg-green-600 hover:bg-green-700 text-white font-black uppercase text-sm flex items-center justify-center gap-3"
                            >
                                <CheckCircle className="w-5 h-5" />
                                Test Success Notification
                            </Button>

                            <Button
                                onClick={() => testDiscord("outofstock")}
                                disabled={loading}
                                className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase text-sm flex items-center justify-center gap-3"
                            >
                                <AlertTriangle className="w-5 h-5" />
                                Test Out of Stock Alert
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
                                            {result.type && (
                                                <p className="text-zinc-400 text-sm mt-1">
                                                    Type: {result.type}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="p-6 rounded-2xl bg-zinc-950/50 border border-white/5 space-y-4">
                            <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-[#5865F2]" />
                                What Gets Posted to Discord
                            </h3>

                            <div className="space-y-3 text-xs text-zinc-400">
                                <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                                    <p className="text-green-500 font-bold mb-1">✅ Success Notification:</p>
                                    <ul className="space-y-1 ml-4">
                                        <li>• Product name and price</li>
                                        <li>• Customer email</li>
                                        <li>• Order ID</li>
                                        <li>• License key (masked)</li>
                                        <li>• Timestamp</li>
                                    </ul>
                                </div>

                                <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                                    <p className="text-orange-500 font-bold mb-1">⚠️ Out of Stock Alert:</p>
                                    <ul className="space-y-1 ml-4">
                                        <li>• Product that ran out</li>
                                        <li>• Customer who needs key</li>
                                        <li>• Order ID to fulfill</li>
                                        <li>• Urgent action required</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-white/5">
                                <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                                    Current Webhook: {process.env.NEXT_PUBLIC_APP_URL || "Not configured"}
                                </p>
                            </div>
                        </div>

                        <div className="text-xs text-zinc-500 space-y-1">
                            <p>• Make sure your Discord webhook URL is set in .ENV</p>
                            <p>• Check your Discord server after clicking the buttons above</p>
                            <p>• These are the exact notifications sent after real purchases</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
