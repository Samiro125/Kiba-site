"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    // Trigger confetti
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#EF4444", "#DC2626", "#F87171"],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#EF4444", "#DC2626", "#F87171"],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  // Countdown and redirect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      router.push("/guides")
    }
  }, [countdown, router])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-xl border-red-500/20">
            <CardContent className="p-12 text-center space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
                  <div className="relative bg-gradient-to-br from-red-600 to-red-700 rounded-full p-6">
                    <CheckCircle className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Payment Successful! 🎉
                </h1>
                <p className="text-gray-400 text-lg">
                  Thank you for your purchase!
                </p>
              </div>

              {/* Order Info */}
              {sessionId && (
                <div className="bg-black/50 border border-red-500/30 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Order ID</p>
                  <p className="text-white font-mono">{sessionId}</p>
                </div>
              )}

              {/* Email Check Notice */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-left space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-red-400" />
                  Check Your Email
                </h3>
                <p className="text-gray-300">
                  Your license key has been sent to your email address. Please check your inbox (and spam folder) for your key.
                </p>
              </div>

              {/* Redirect Notice */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  📖 Redirecting to Setup Guide...
                </h3>
                <p className="text-gray-300 mb-4">
                  You'll be automatically redirected to the setup guide in <span className="text-green-400 font-bold text-2xl">{countdown}</span> seconds
                </p>
                <p className="text-sm text-gray-400">
                  The guide will show you how to download the loader and activate your license key.
                </p>
              </div>

              {/* Quick Instructions */}
              <div className="text-left space-y-3 pt-4">
                <h3 className="text-lg font-bold text-white">Quick Start:</h3>
                <ol className="text-left space-y-2 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 text-sm font-bold">
                      1
                    </span>
                    <span>Check your email for your license key</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 text-sm font-bold">
                      2
                    </span>
                    <span>Follow the setup guide (opening automatically)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 text-sm font-bold">
                      3
                    </span>
                    <span>Download the loader from Discord</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 text-sm font-bold">
                      4
                    </span>
                    <span>Enter your key and start gaming!</span>
                  </li>
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Link href="/guides" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white h-12">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Go to Setup Guide Now
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full border-red-500/50 hover:bg-red-500/10 text-red-400 h-12">
                    Browse More Products
                  </Button>
                </Link>
              </div>

              {/* Support */}
              <p className="text-sm text-gray-400 pt-6">
                Need help? Contact us on Discord or email{" "}
                <a href="mailto:support@kibacheats.com" className="text-red-400 hover:underline">
                  support@kibacheats.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
