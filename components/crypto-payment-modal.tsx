"use client"

import { useState, useRef, useCallback } from "react"
import { X, ArrowLeft, Check, Copy } from "lucide-react"

type CryptoType = "ltc" | "btc"
type ModalStep = "select" | "payment" | "confirmed"

interface CryptoPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: string
  planName: string
}

const ADDRESSES: Record<CryptoType, string> = {
  ltc: "ltc1q2grh5ufayg2z5n9hf6escl2yhxs3e5h9uqd33t",
  btc: "bc1qdzl2hm3ln949ma7qkeunltz8nrzcwn6edavkwa",
}

const CRYPTO_INFO: Record<CryptoType, { name: string; symbol: string; color: string; iconBg: string }> = {
  ltc: { name: "Litecoin", symbol: "LTC", color: "#345D9D", iconBg: "#345D9D" },
  btc: { name: "Bitcoin", symbol: "BTC", color: "#F7931A", iconBg: "#8B5E0A" },
}

export function CryptoPaymentModal({ isOpen, onClose, amount, planName }: CryptoPaymentModalProps) {
  const [step, setStep] = useState<ModalStep>("select")
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType | null>(null)
  const [copied, setCopied] = useState(false)
  const [sliderValue, setSliderValue] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const numericAmount = Number.parseFloat(amount.replace("$", "")) || 0
  const invoiceId = `INV-${Date.now().toString(36).toUpperCase()}`

  // Rough conversion rates (static approximations)
  const getCryptoAmount = (crypto: CryptoType) => {
    const rates: Record<CryptoType, number> = { ltc: 85, btc: 97000 }
    return (numericAmount / rates[crypto]).toFixed(crypto === "btc" ? 6 : 4)
  }

  const handleCopy = async () => {
    if (!selectedCrypto) return
    await navigator.clipboard.writeText(ADDRESSES[selectedCrypto])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSelectCrypto = (crypto: CryptoType) => {
    setSelectedCrypto(crypto)
    setStep("payment")
    setSliderValue(0)
  }

  const handleBack = () => {
    setStep("select")
    setSelectedCrypto(null)
    setSliderValue(0)
  }

  const handleClose = () => {
    setStep("select")
    setSelectedCrypto(null)
    setSliderValue(0)
    onClose()
  }

  const handleSliderMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || !isDragging) return
      const rect = sliderRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setSliderValue(percentage)
      if (percentage >= 85) {
        setStep("confirmed")
        setIsDragging(false)
      }
    },
    [isDragging],
  )

  const handleSliderEnd = useCallback(() => {
    setIsDragging(false)
    if (sliderValue < 85) {
      setSliderValue(0)
    }
  }, [sliderValue])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f] shadow-2xl">
        {/* Select Payment Step */}
        {step === "select" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Select Payment</h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Litecoin Card */}
              <button
                onClick={() => handleSelectCrypto("ltc")}
                className="w-full p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#345D9D]/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#345D9D] flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">{"$"}</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold text-lg group-hover:text-[#5a8fd4] transition-colors">
                      Litecoin
                    </div>
                    <div className="text-gray-500 text-sm">LTC</div>
                  </div>
                </div>
              </button>

              {/* Bitcoin Card */}
              <button
                onClick={() => handleSelectCrypto("btc")}
                className="w-full p-6 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#F7931A]/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#8B5E0A] flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#F7931A]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-semibold text-lg group-hover:text-[#F7931A] transition-colors">
                      Bitcoin
                    </div>
                    <div className="text-gray-500 text-sm">BTC</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Payment Details Step */}
        {step === "payment" && selectedCrypto && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Change Method
              </button>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">Complete Payment</h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Plan</span>
                <span className="text-white font-medium text-sm">{planName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Amount Due</span>
                <span className="text-white font-bold text-xl">{amount}</span>
              </div>
            </div>

            <div className="text-center mb-5">
              <div className="text-gray-500 text-xs uppercase tracking-widest mb-2">Send Exactly</div>
              <div className="text-white text-3xl font-bold">
                {getCryptoAmount(selectedCrypto)} {CRYPTO_INFO[selectedCrypto].symbol}
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 bg-black/40 rounded-xl border border-white/10 p-3 mb-6">
              <div className="flex-1 text-gray-300 text-sm font-mono truncate">
                {ADDRESSES[selectedCrypto]}
              </div>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>

            {/* Slide to Confirm */}
            <div className="relative">
              <div
                ref={sliderRef}
                className="relative h-14 rounded-full bg-black/60 border border-white/10 overflow-hidden cursor-pointer select-none"
                onMouseDown={(e) => {
                  setIsDragging(true)
                  handleSliderMove(e.clientX)
                }}
                onMouseMove={(e) => handleSliderMove(e.clientX)}
                onMouseUp={handleSliderEnd}
                onMouseLeave={handleSliderEnd}
                onTouchStart={(e) => {
                  setIsDragging(true)
                  handleSliderMove(e.touches[0].clientX)
                }}
                onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
                onTouchEnd={handleSliderEnd}
              >
                {/* Progress fill */}
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600/30 to-blue-500/20 transition-all duration-75"
                  style={{ width: `${sliderValue}%` }}
                />

                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-gray-400 font-semibold text-sm tracking-wide uppercase">
                    Slide to Confirm Sent
                  </span>
                </div>

                {/* Slider thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-600 shadow-lg flex items-center justify-center transition-all duration-75"
                  style={{ left: `calc(${sliderValue}% - ${sliderValue > 5 ? 20 : 0}px + 4px)` }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 text-xs text-center mt-2">
                Slide to 85% to confirm payment sent
              </p>
            </div>
          </div>
        )}

        {/* Confirmed Step - Order Pending */}
        {step === "confirmed" && selectedCrypto && (
          <div className="p-6 text-center">
            {/* Spinning loader icon */}
            <div className="w-20 h-20 rounded-full border-4 border-[#C8960C]/30 flex items-center justify-center mx-auto mb-5 mt-2">
              <svg className="w-10 h-10 text-[#C8960C] animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Order Pending</h2>
            <p className="text-gray-400 text-sm mb-6">
              Your order has been submitted and is awaiting verification
            </p>

            {/* Order ID */}
            <div className="bg-black/40 rounded-xl border border-white/10 p-4 mb-4">
              <div className="text-gray-400 text-sm mb-1">Order ID</div>
              <div className="text-[#C8960C] font-bold text-lg tracking-wider">{invoiceId}</div>
            </div>

            {/* Action Required */}
            <div className="rounded-xl border border-[#C8960C]/50 bg-[#C8960C]/5 p-4 mb-6 text-left">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#C8960C]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C8960C] text-sm font-bold">!</span>
                </div>
                <span className="text-white font-bold text-sm">Action Required</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Please create a ticket in our Discord server with your{" "}
                <span className="text-[#C8960C] font-semibold">Order ID</span> and{" "}
                <span className="text-[#C8960C] font-semibold">proof of purchase</span>{" "}
                (transaction screenshot) to receive your license key.
              </p>
            </div>

            {/* Create Ticket on Discord */}
            <a
              href="https://discord.gg/3fPNe8pUJG"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold transition-all flex items-center justify-center gap-2 mb-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
              </svg>
              Create Ticket on Discord
            </a>

            {/* Close */}
            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold transition-all"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
