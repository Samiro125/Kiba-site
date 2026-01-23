"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  planName: string
  price: string
  checkoutUrl: string
}

export function CheckoutModal({ isOpen, onClose, productName, planName, price, checkoutUrl }: CheckoutModalProps) {
  const [email, setEmail] = useState("")

  if (!isOpen) return null

  const handleContinue = () => {
    // Open checkout in new tab
    window.open(checkoutUrl, "_blank")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-zinc-900 rounded-lg shadow-2xl border border-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">Secure Checkout</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Payment Details Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Payment Details</h3>
            <span className="text-sm font-medium text-green-500">100% Secure</span>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm text-zinc-400">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <p className="text-xs text-zinc-500">You can enter your email in the next step</p>
          </div>

          {/* Accepted Payment Methods */}
          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-green-500/10 rounded flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">Accepted Payment Methods:</p>
                <p className="text-xs text-zinc-400">
                  Credit Cards, Debit Cards, Bitcoin, Ethereum, and 30+ other methods
                </p>
              </div>
            </div>
          </div>

          {/* Product Summary */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Product</span>
              <span className="text-white font-medium text-right">
                {productName} - {planName}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm">Total</span>
              <span className="text-white font-bold text-2xl">{price}</span>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-6 text-base"
          >
            Continue to Payment - {price}
          </Button>

          {/* Cancel Button */}
          <button onClick={onClose} className="w-full text-zinc-400 hover:text-white text-sm transition-colors">
            Cancel
          </button>

          {/* Secure Payment Text */}
          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-2">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Secure payment processing</span>
          </div>
        </div>
      </div>
    </div>
  )
}
