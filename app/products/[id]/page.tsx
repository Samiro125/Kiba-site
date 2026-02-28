"use client"

import { useEffect } from "react"

import { useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckoutModal } from "@/components/checkout-modal"
import { CryptoPaymentModal } from "@/components/crypto-payment-modal"

const products = [
  {
    id: "fortnite",
    name: "FORTNITE CHEAT",
    game: "Fortnite",
    image: "/images/fortnitee.png",
    prices: [
      { duration: "1 day", amount: "$7.99", originalAmount: "$14.99" },
      { duration: "1 week", amount: "$23.99", originalAmount: "$39.99", popular: true },
      { duration: "1 month", amount: "$43.99", originalAmount: "$69.99" },
      { duration: "lifetime", amount: "$109.99", originalAmount: "$179.99", popular: true, bestValue: true },
    ],
    rating: 5,
    totalReviews: 1248,
    color: "from-red-600 to-red-900",
    specifications: [
      { label: "Gameplay Modes", value: "AVAILABLE" },
      { label: "Last Updated", value: "22/11/2024" },
      { label: "Anti-Cheat System", value: "EAC/BattleEye" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Aimbot with Silent Aim and FOV customization",
      "ESP showing players, items, and distances",
      "New ESP for weapons and materials",
      "No fall damage and unlimited materials",
      "Instant build placement",
      "Customizable hotkeys",
      "Screen-size adjustable ESP",
    ],
  },
  {
    id: "rust",
    name: "RUST CHEAT",
    game: "Rust",
    image: "/images/rustt.png",
    prices: [
      { duration: "1 day", amount: "$9.99", originalAmount: "$17.99" },
      { duration: "1 week", amount: "$27.99", originalAmount: "$44.99", popular: true },
      { duration: "1 month", amount: "$59.99", originalAmount: "$89.99" },
      { duration: "lifetime", amount: "$119.99", originalAmount: "$199.99", popular: true, bestValue: true },
    ],
    rating: 4.8,
    totalReviews: 1089,
    color: "from-red-600 to-red-900",
    specifications: [
      { label: "Gameplay Modes", value: "AVAILABLE" },
      { label: "Last Updated", value: "20/11/2024" },
      { label: "Anti-Cheat System", value: "EAC" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "ESP for players, animals, and resources",
      "Aimbot with adjustable FOV and smoothing",
      "No recoil for all weapons",
      "Item ESP for loot and containers",
      "Silent melee attacks",
      "Admin flags detection",
      "Customizable colors and filters",
    ],
  },
  {
    id: "valorant",
    name: "VALORANT CHEAT",
    game: "Valorant",
    image: "/images/kiba-cheats-banner-20valo.webp",
    prices: [
      { duration: "1 day", amount: "$9.99", originalAmount: "$17.99" },
      { duration: "1 week", amount: "$27.99", originalAmount: "$44.99", popular: true },
      { duration: "1 month", amount: "$57.99", originalAmount: "$89.99" },
      { duration: "lifetime", amount: "$94.99", originalAmount: "$149.99" },
    ],
    rating: 4.9,
    totalReviews: 1367,
    color: "from-red-600 to-red-900",
    specifications: [
      { label: "Gameplay Modes", value: "AVAILABLE" },
      { label: "Last Updated", value: "23/11/2024" },
      { label: "Anti-Cheat System", value: "Vanguard" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Precision aimbot with bone selection",
      "ESP with player boxes and health",
      "Triggerbot with customizable delay",
      "Recoil control system",
      "Agent glow and outline ESP",
      "Visibility checks",
      "Stream-proof overlay",
    ],
  },
  {
    id: "apex",
    name: "APEX LEGENDS CHEAT",
    game: "Apex Legends",
    image: "/images/apex-new.png",
    prices: [
      { duration: "1 day", amount: "$7.99", originalAmount: "$14.99" },
      { duration: "1 week", amount: "$19.99", originalAmount: "$34.99", popular: true },
      { duration: "1 month", amount: "$43.99", originalAmount: "$69.99" },
      { duration: "lifetime", amount: "$74.99", originalAmount: "$119.99" },
    ],
    rating: 4.7,
    totalReviews: 1143,
    color: "from-red-600 to-red-900",
    specifications: [
      { label: "Gameplay Modes", value: "AVAILABLE" },
      { label: "Last Updated", value: "21/11/2024" },
      { label: "Anti-Cheat System", value: "EAC" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Advanced aimbot with prediction",
      "ESP for players and items",
      "Glow ESP for legends",
      "No recoil system",
      "2D radar overlay",
      "Spectator list",
      "Item filter customization",
    ],
  },
  {
    id: "r6",
    name: "RAINBOW SIX SIEGE CHEAT",
    game: "Rainbow Six Siege",
    image: "/images/r6666.png",
    prices: [
      { duration: "1 day", amount: "$9.99", originalAmount: "$17.99" },
      { duration: "1 week", amount: "$29.99", originalAmount: "$49.99", popular: true },
      { duration: "1 month", amount: "$59.99", originalAmount: "$89.99" },
      { duration: "lifetime", amount: "$89.99", originalAmount: "$149.99" },
    ],
    rating: 4.8,
    totalReviews: 967,
    color: "from-red-600 to-red-900",
    specifications: [
      { label: "Gameplay Modes", value: "AVAILABLE" },
      { label: "Last Updated", value: "19/11/2024" },
      { label: "Anti-Cheat System", value: "BattleEye" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Aimbot with smooth targeting",
      "ESP showing operators through walls",
      "Gadget ESP for traps and equipment",
      "No recoil for all weapons",
      "Crosshair customization",
      "Team identification",
      "Distance-based filtering",
    ],
  },
  {
    id: "arc-raiders",
    name: "ARC RAIDERS CHEAT",
    game: "Arc Raiders",
    image: "/images/arc-raiders-new.png",
    prices: [
      { duration: "1 day", amount: "$7.99", originalAmount: "$14.99" },
      { duration: "1 week", amount: "$23.99", originalAmount: "$39.99", popular: true },
      { duration: "1 month", amount: "$43.99", originalAmount: "$69.99" },
      { duration: "lifetime", amount: "$109.99", originalAmount: "$179.99", popular: true, bestValue: true },
    ],
    rating: 5.0,
    totalReviews: 723,
    color: "from-red-600 to-red-900",
    specifications: [
      { label: "Windows 10 & 11 (25H2 Supported)", value: "YES" },
      { label: "External Client", value: "YES" },
      { label: "USB Flash Drive Recommended", value: "YES" },
      { label: "Intel & AMD CPU's", value: "SUPPORTED" },
    ],
    features: [
      "Customizable hotkey",
      "Customizable FOV",
      "Customizable smoothing",
      "Humanized trajectories",
      "Smoothing threshold",
      "Aim prediction",
      "Ignore bots",
      "Maximum distance",
      "Player ESP",
      "Show team",
      "Show bots",
      "Visibility check",
      "Customizable boxes",
      "Snapline",
      "Distance",
      "Maximum distance",
      "2D radar",
      "Customizable size",
      "Instant delivery",
      "Auto update (no re-download)",
      "Fully streamproof",
      "Screenshots protection",
      "Disableable watermark",
      "Customizable colors",
    ],
  },
  {
    id: "call-of-duty",
    name: "CALL OF DUTY CHEAT",
    game: "Call of Duty",
    image: "/images/cod.png",
    prices: [
      { duration: "1 day", amount: "$9.99", originalAmount: "$17.99" },
      { duration: "1 week", amount: "$13.99", originalAmount: "$24.99", popular: true },
      { duration: "1 month", amount: "$24.99", originalAmount: "$39.99" },
      { duration: "lifetime", amount: "$44.99", originalAmount: "$69.99" },
    ],
    rating: 4.8,
    totalReviews: 1156,
    color: "from-red-600 to-red-900",
    specifications: [
      { label: "Gameplay Modes", value: "AVAILABLE" },
      { label: "Last Updated", value: "26/11/2024" },
      { label: "Anti-Cheat System", value: "Ricochet" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Advanced aimbot with bone targeting",
      "ESP for players and equipment",
      "No recoil and no spread",
      "Radar with enemy positions",
      "UAV jammer detection",
      "Customizable crosshair",
      "Instant delivery and 24/7 support",
    ],
  },
  {
    id: "fivem",
    name: "FIVEM CHEAT",
    game: "FiveM / GTA V",
    image: "/images/fivem.png",
    prices: [
      { duration: "1 week", amount: "$14.99", originalAmount: "$24.99", popular: true },
      { duration: "1 month", amount: "$29.99", originalAmount: "$49.99" },
      { duration: "lifetime", amount: "$59.99", originalAmount: "$99.99", bestValue: true },
    ],
    rating: 4.9,
    totalReviews: 876,
    color: "from-green-600 to-green-900",
    specifications: [
      { label: "Gameplay Modes", value: "AVAILABLE" },
      { label: "Last Updated", value: "15/01/2025" },
      { label: "Anti-Cheat System", value: "FiveM AC" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Aimbot with customizable FOV",
      "ESP for players and vehicles",
      "Triggerbot with delay settings",
      "No recoil system",
      "Vehicle ESP and teleport",
      "Money drops and recovery",
      "Customizable menu overlay",
    ],
  },
  {
    id: "perm-spoofer",
    name: "PERM SPOOFER",
    game: "Universal",
    image: "/images/perm-spoofer-red.jpg",
    prices: [
      { duration: "one-time", amount: "$13.99", originalAmount: "$19.99" },
      { duration: "lifetime", amount: "$24.99", originalAmount: "$34.99" },
    ],
    rating: 5.0,
    totalReviews: 2134,
    color: "from-red-600 to-red-900",
    specifications: [
      { label: "Compatibility", value: "UNIVERSAL" },
      { label: "Last Updated", value: "28/12/2024" },
      { label: "Hardware Support", value: "ALL DEVICES" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "HWID permanent spoofing",
      "MAC address changer",
      "Disk serial number spoofing",
      "System UUID modification",
      "Network adapter spoofing",
      "Registry cleaning",
      "Unban from hardware bans",
      "One-click spoofing",
      "Instant delivery and support",
    ],
  },
  {
    id: "temp-spoofer",
    name: "TEMP SPOOFER",
    game: "Universal",
    image: "/images/temp-spoofer-green.jpg",
    prices: [
      { duration: "3 day", amount: "$7.99", originalAmount: "$12.99" },
      { duration: "1 week", amount: "$9.99", originalAmount: "$14.99" },
      { duration: "1 month", amount: "$19.99", originalAmount: "$29.99" },
      { duration: "lifetime", amount: "$39.99", originalAmount: "$54.99" },
    ],
    rating: 5.0,
    totalReviews: 1876,
    color: "from-green-600 to-green-900",
    specifications: [
      { label: "Compatibility", value: "UNIVERSAL" },
      { label: "Last Updated", value: "28/12/2024" },
      { label: "Hardware Support", value: "ALL DEVICES" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Temporary HWID spoofing",
      "MAC address modification",
      "Quick ban bypass",
      "Registry cleaner included",
      "Easy-to-use interface",
      "Session-based spoofing",
      "Instant activation",
      "24/7 customer support",
    ],
  },
  {
    id: "accounts",
    name: "GAME ACCOUNTS",
    game: "Accounts",
    image: "/images/accounts.png",
    prices: [
      { duration: "Arc NFA Account", amount: "$9.90", originalAmount: "$14.90" },
      { duration: "Rust NFA Account", amount: "$9.90", originalAmount: "$14.90" },
      { duration: "BF6 NFA Account", amount: "$9.90", originalAmount: "$14.90" },
      { duration: "CS2 Prime NFA", amount: "$9.90", originalAmount: "$14.90" },
      { duration: "Dayz NFA Account", amount: "$9.90", originalAmount: "$14.90" },
      { duration: "EFT NFA Account", amount: "$9.90", originalAmount: "$14.90" },
      { duration: "Black Ops 7 NFA", amount: "$9.90", originalAmount: "$14.90" },
    ],
    rating: 5.0,
    totalReviews: 456,
    color: "from-orange-600 to-red-900",
    specifications: [
      { label: "Account Type", value: "NFA (Non-Full-Access)" },
      { label: "Play Time", value: "100+ Real Hours" },
      { label: "Delivery Time", value: "INSTANT" },
      { label: "Warranty", value: "6 Hours Protection" },
    ],
    features: [
      "100+ Hours: The account has more than 100 real hours played",
      "Non-Full-Access (NFA): Accounts last 12 hours or more",
      "6 Hour Warranty: If your account gets pulled back within 6 hours, contact support for compensation",
      "Instant delivery after purchase",
      "Verified and secure accounts",
      "24/7 customer support",
      "Video showcase guide included",
    ],
  },
]

const relatedProducts = [
  {
    id: "fortnite",
    title: "Fortnite Cheats",
    game: "Fortnite",
    image: "/images/fortnitee.png",
    price: "$7.99",
    badge: "Undetected",
  },
  {
    id: "rust",
    title: "Rust Cheats",
    game: "Rust",
    image: "/images/rustt.png",
    price: "$7.99",
    badge: "Undetected",
  },
  {
    id: "r6",
    title: "Rainbow Six Siege Cheats",
    game: "Rainbow Six Siege",
    image: "/images/r6666.png",
    price: "$7.99",
    badge: "Undetected",
  },
  {
    id: "arc-raiders",
    title: "Arc Raiders Cheats",
    game: "Arc Raiders",
    image: "/images/arc-raiders-new.png",
    price: "$7.99",
    badge: "Undetected",
  },
]

const productIdMap: Record<string, string> = {
  "r6-siege": "r6",
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [arcVariant, setArcVariant] = useState<"delta" | "flo" | null>(null)
  const [showArcModal, setShowArcModal] = useState(false)
  const [rustVariant, setRustVariant] = useState<"delta" | "flo" | null>(null)
  const [showRustModal, setShowRustModal] = useState(false)
  const [isCryptoOpen, setIsCryptoOpen] = useState(false)

  const actualId = productIdMap[params.id] || params.id
  const product = products.find((p) => p.id === actualId)
  
  // Show Arc Raiders variant modal on first visit
  useEffect(() => {
    if (actualId === "arc-raiders" && arcVariant === null) {
      setShowArcModal(true)
    }
    if (actualId === "rust" && rustVariant === null) {
      setShowRustModal(true)
    }
  }, [actualId, arcVariant, rustVariant])
  
  // Arc Raiders variant pricing
  const arcDeltaPrices = [
    { duration: "1 day", amount: "$9.99", originalAmount: "$17.99" },
    { duration: "1 week", amount: "$27.99", originalAmount: "$44.99", popular: true },
    { duration: "1 month", amount: "$57.99", originalAmount: "$89.99" },
    { duration: "lifetime", amount: "$109.99", originalAmount: "$179.99", popular: true, bestValue: true },
  ]
  
  const arcFloPrices = [
    { duration: "1 week", amount: "$11.99", originalAmount: "$19.99" },
    { duration: "1 month", amount: "$23.99", originalAmount: "$39.99", popular: true },
    { duration: "lifetime", amount: "$49.99", originalAmount: "$89.99", bestValue: true },
  ]
  
  // Get the correct prices based on variant for Arc Raiders
  const getArcPrices = () => arcVariant === "delta" || arcVariant === null ? arcDeltaPrices : arcFloPrices
  
  // Rust variant pricing
  const rustDeltaPrices = [
    { duration: "1 day", amount: "$9.99", originalAmount: "$17.99" },
    { duration: "1 week", amount: "$27.99", originalAmount: "$44.99", popular: true },
    { duration: "1 month", amount: "$59.99", originalAmount: "$89.99" },
    { duration: "lifetime", amount: "$119.99", originalAmount: "$199.99", popular: true, bestValue: true },
  ]
  
  const rustFloPrices = [
    { duration: "1 week", amount: "$11.99", originalAmount: "$19.99" },
    { duration: "1 month", amount: "$23.99", originalAmount: "$39.99", popular: true },
    { duration: "lifetime", amount: "$49.99", originalAmount: "$89.99", bestValue: true },
  ]
  
  // Get the correct prices based on variant for Rust
  const getRustPrices = () => rustVariant === "delta" || rustVariant === null ? rustDeltaPrices : rustFloPrices

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"features" | "requirements" | "faq">("features")

  if (!product) {
    notFound()
  }

  const currentPlan = product.prices[selectedPlan]
  const totalPrice = Number.parseFloat(currentPlan.amount.replace("$", "")).toFixed(2)

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Arc Raiders Variant Selection Modal */}
      {showArcModal && actualId === "arc-raiders" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-900/50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-red-900/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Version</h2>
              <p className="text-gray-400 text-sm">Select the Arc Raiders cheat version that fits your needs</p>
            </div>
            
            <div className="space-y-4">
              {/* Delta Option */}
              <button
                onClick={() => { setArcVariant("delta"); setShowArcModal(false); setSelectedPlan(0); }}
                className="w-full p-6 rounded-xl border-2 border-green-500/50 bg-green-950/20 hover:bg-green-950/40 hover:border-green-500 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-white">DELTA</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">RECOMMENDED</span>
                </div>
                <p className="text-green-400 text-sm mb-3">More Safe & Secure</p>
                <div className="text-left text-gray-400 text-xs space-y-1">
                  <p>Starting from $7.99/day</p>
                  <p>Higher security, premium features</p>
                </div>
              </button>
              
              {/* Flo Option */}
              <button
                onClick={() => { setArcVariant("flo"); setShowArcModal(false); setSelectedPlan(0); }}
                className="w-full p-6 rounded-xl border-2 border-yellow-500/50 bg-yellow-950/20 hover:bg-yellow-950/40 hover:border-yellow-500 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-white">FLO</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">BUDGET</span>
                </div>
                <p className="text-yellow-400 text-sm mb-3">Affordable Option</p>
                <div className="text-left text-gray-400 text-xs space-y-1">
                  <p>Starting from $11.99/week</p>
                  <p>Great value, essential features</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Rust Variant Selection Modal */}
      {showRustModal && actualId === "rust" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-900/50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl shadow-red-900/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Choose Your Version</h2>
              <p className="text-gray-400 text-sm">Select the Rust cheat version that fits your needs</p>
            </div>
            
            <div className="space-y-4">
              {/* Delta Option */}
              <button
                onClick={() => { setRustVariant("delta"); setShowRustModal(false); setSelectedPlan(0); }}
                className="w-full p-6 rounded-xl border-2 border-green-500/50 bg-green-950/20 hover:bg-green-950/40 hover:border-green-500 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-white">DELTA</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">RECOMMENDED</span>
                </div>
                <p className="text-green-400 text-sm mb-3">More Safe & Secure</p>
                <div className="text-left text-gray-400 text-xs space-y-1">
                  <p>Starting from $7.99/day</p>
                  <p>Higher security, premium features</p>
                </div>
              </button>
              
              {/* Flo Option */}
              <button
                onClick={() => { setRustVariant("flo"); setShowRustModal(false); setSelectedPlan(0); }}
                className="w-full p-6 rounded-xl border-2 border-yellow-500/50 bg-yellow-950/20 hover:bg-yellow-950/40 hover:border-yellow-500 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-white">FLO</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">BUDGET</span>
                </div>
                <p className="text-yellow-400 text-sm mb-3">Affordable Option</p>
                <div className="text-left text-gray-400 text-xs space-y-1">
                  <p>Starting from $11.99/week</p>
                  <p>Great value, essential features</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-1 container py-12 px-6 pt-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_450px]">
          {/* Left Column - Product Info */}
          <div className="space-y-6">
            {/* Product Image with overlay info */}
            <div className="relative overflow-hidden rounded-lg border border-white/10">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.game}
                width={1050}
                height={1050}
                className="w-full aspect-square object-cover"
              />
            </div>

            {/* Product Title and Rating */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg p-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-blue-400 font-medium">
                  {product.rating} ({product.totalReviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Specifications Grid */}
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-white font-bold mb-3 text-sm">Specifications</h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="bg-black/40 rounded p-3 border border-white/10">
                      <div className="text-xs text-gray-500 mb-1">{spec.label}</div>
                      <div className="text-sm font-medium text-blue-400">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Tabs */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4 border-b border-zinc-800">
                <button
                  onClick={() => setActiveTab("features")}
                  className={`font-bold text-sm pb-2 transition-colors ${
                    activeTab === "features" ? "text-white border-b-2 border-red-500" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => setActiveTab("requirements")}
                  className={`font-bold text-sm pb-2 transition-colors ${
                    activeTab === "requirements"
                      ? "text-white border-b-2 border-red-500"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Requirements
                </button>
                <button
                  onClick={() => setActiveTab("faq")}
                  className={`font-bold text-sm pb-2 transition-colors ${
                    activeTab === "faq" ? "text-white border-b-2 border-red-500" : "text-gray-400 hover:text-white"
                  }`}
                >
                  FAQ
                </button>
              </div>

              {activeTab === "features" && (
                actualId === "arc-raiders" && arcVariant === "delta" ? (
                  <div>
                    <h3 className="text-white font-bold text-xl mb-2">Features</h3>

                    {/* Requirements */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 mb-4 transition-all duration-500 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <span className="text-white font-bold text-sm">System Requirements</span>
                      </div>
                      <div className="grid grid-cols-1 gap-1.5">
                        {[
                          "INTEL + AMD CPU",
                          "Windows 10 - 11 | 1909 - 25H2",
                          "SVM [AMD] / VT-X [INTEL] (BIOS) enabled",
                          "16GB RAM (or more)",
                          "Hyper V disabled for AMD CPU only",
                          "Hyper V enabled for INTEL CPU only",
                          "Firmware in UEFI mode only for INTEL CPU",
                          "The system uses GPT format disk only for INTEL CPU",
                          "Secure Boot disabled",
                        ].map((req, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm group/req">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover/req:bg-red-400 transition-colors flex-shrink-0" />
                            <span className="text-gray-400 group-hover/req:text-gray-200 transition-colors">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Feature cards grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Aimbot */}
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-500 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1 group/aim">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center transition-all duration-300 group-hover/aim:bg-red-500/30 group-hover/aim:scale-110">
                            <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="text-white font-bold text-sm transition-colors duration-300 group-hover/aim:text-red-400">Aimbot</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {[
                            "Enable",
                            "Aim Key",
                            "Aim Type: (Mouse; Memory)",
                            "Smooth (slider)",
                            "Draw Fov",
                            "Fov Radius (slider)",
                            "Prediction",
                            "Prediction Dot",
                            "Target Line",
                            "Target Lock",
                            "Vischeck",
                            "Max Aim Distance (slider)",
                            "Target Bones",
                          ].map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm group/item">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover/item:bg-red-400 transition-colors flex-shrink-0" />
                              <span className="text-gray-400 group-hover/item:text-gray-200 transition-colors">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Visuals (ESP) */}
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-500 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1 group/esp">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center transition-all duration-300 group-hover/esp:bg-red-500/30 group-hover/esp:scale-110">
                            <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="text-white font-bold text-sm transition-colors duration-300 group-hover/esp:text-red-400">Visuals (ESP)</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {[
                            "Name (visible and invisible color)",
                            "Box (visible and invisible color)",
                            "Skeleton (visible and invisible color)",
                            "Squad (visible and invisible color)",
                            "Distance (visible and invisible color)",
                            "Health",
                            "Armor",
                            "Max Distance (slider)",
                            "Enable Arrows",
                            "Arrows range (slider)",
                            "Enable Radar",
                            "Radar Scale (slider)",
                            "Max Show Distance (slider)",
                            "Battle Mode key",
                            "Enable Battle Mode",
                          ].map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm group/item">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover/item:bg-red-400 transition-colors flex-shrink-0" />
                              <span className="text-gray-400 group-hover/item:text-gray-200 transition-colors">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* World ESP - Crates */}
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-500 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1 group/crate">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center transition-all duration-300 group-hover/crate:bg-red-500/30 group-hover/crate:scale-110">
                            <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="text-white font-bold text-sm transition-colors duration-300 group-hover/crate:text-red-400">World ESP (Crates, Drones, Items)</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {[
                            "Enable",
                            "Draw Dot",
                            "Draw Name / Draw Icon",
                            "Color",
                            "Draw Distance",
                            "Limit Distance",
                            "Max Distance (slider)",
                            "Show In BattleMode",
                            "Supports: Crates, Drones, Dropped Items",
                            "Supports: Corpse, Salvage, Carryable",
                            "Supports: Supply Station",
                            "Each option configurable separately",
                          ].map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm group/item">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover/item:bg-red-400 transition-colors flex-shrink-0" />
                              <span className="text-gray-400 group-hover/item:text-gray-200 transition-colors">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Config */}
                      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-500 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1 group/cfg">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center transition-all duration-300 group-hover/cfg:bg-red-500/30 group-hover/cfg:scale-110">
                            <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="text-white font-bold text-sm transition-colors duration-300 group-hover/cfg:text-red-400">Config System</span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {[
                            "Save config",
                            "Load config",
                            "Delete config",
                            "Share config",
                          ].map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm group/item">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover/item:bg-red-400 transition-colors flex-shrink-0" />
                              <span className="text-gray-400 group-hover/item:text-gray-200 transition-colors">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                <div>
                  <h3 className="text-white font-bold mb-4">Key Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.features.slice(0, 8).map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <svg
                          className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                )
              )}

              {activeTab === "requirements" && (
                <div>
                  <h3 className="text-white font-bold mb-4">System Requirements</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-red-500 font-semibold mb-2 text-sm">Minimum Requirements</h4>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Windows 10/11 (64-bit)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Intel Core i5 or AMD Ryzen 5 processor</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span>8GB RAM minimum</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span>NVIDIA GTX 1060 or AMD RX 580</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-red-500 font-semibold mb-2 text-sm">Recommended Requirements</h4>
                      <div className="space-y-2 text-sm text-gray-300">
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Windows 11 (64-bit)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Intel Core i7 or AMD Ryzen 7 processor</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span>16GB RAM or higher</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span>NVIDIA RTX 3060 or AMD RX 6700 XT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "faq" && (
                <div>
                  <h3 className="text-white font-bold mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="border-b border-zinc-800 pb-3">
                      <h4 className="text-white font-semibold mb-2 text-sm">Is this cheat undetected?</h4>
                      <p className="text-gray-400 text-sm">
                        Yes, our {product.game} cheat is regularly updated to remain undetected. We monitor anti-cheat
                        updates and push patches immediately to ensure maximum safety for our users.
                      </p>
                    </div>
                    <div className="border-b border-zinc-800 pb-3">
                      <h4 className="text-white font-semibold mb-2 text-sm">How do I download and install?</h4>
                      <p className="text-gray-400 text-sm">
                        After purchase, you'll receive a download link and detailed installation instructions via email.
                        The setup process is straightforward and typically takes less than 5 minutes.
                      </p>
                    </div>
                    <div className="border-b border-zinc-800 pb-3">
                      <h4 className="text-white font-semibold mb-2 text-sm">Can I use this on multiple computers?</h4>
                      <p className="text-gray-400 text-sm">
                        Your license is tied to one HWID (Hardware ID). If you need to reset your HWID or use it on a
                        different computer, contact our support team on Discord.
                      </p>
                    </div>
                    <div className="pb-3">
                      <h4 className="text-white font-semibold mb-2 text-sm">Do you offer support?</h4>
                      <p className="text-gray-400 text-sm">
                        Yes! Our support team is available 24/7 on Discord to help with any issues, setup questions, or
                        feature guidance. We're committed to ensuring you have the best experience.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Pricing Card */}
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-red-900/50 sticky top-24">
              <div className="p-6 space-y-5">
                {/* Arc Raiders Variant Selection */}
                {actualId === "arc-raiders" && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-white font-bold">Choose Version</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        onClick={() => { setArcVariant("delta"); setSelectedPlan(0); }}
                        className={`p-3 rounded-lg border transition-all ${
                          arcVariant === "delta"
                            ? "border-red-500 bg-red-950/30"
                            : "border-white/10 bg-black/20 hover:border-red-500/50"
                        }`}
                      >
                        <div className="text-white font-bold text-sm">DELTA</div>
                        <div className="text-green-400 text-xs mt-1">More Safe</div>
                      </button>
                      <button
                        onClick={() => { setArcVariant("flo"); setSelectedPlan(0); }}
                        className={`p-3 rounded-lg border transition-all ${
                          arcVariant === "flo"
                            ? "border-red-500 bg-red-950/30"
                            : "border-white/10 bg-black/20 hover:border-red-500/50"
                        }`}
                      >
                        <div className="text-white font-bold text-sm">FLO</div>
                        <div className="text-yellow-400 text-xs mt-1">Budget Option</div>
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Rust Variant Selection */}
                {actualId === "rust" && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-white font-bold">Choose Version</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <button
                        onClick={() => { setRustVariant("delta"); setSelectedPlan(0); }}
                        className={`p-3 rounded-lg border transition-all ${
                          rustVariant === "delta"
                            ? "border-red-500 bg-red-950/30"
                            : "border-white/10 bg-black/20 hover:border-red-500/50"
                        }`}
                      >
                        <div className="text-white font-bold text-sm">DELTA</div>
                        <div className="text-green-400 text-xs mt-1">More Safe</div>
                      </button>
                      <button
                        onClick={() => { setRustVariant("flo"); setSelectedPlan(0); }}
                        className={`p-3 rounded-lg border transition-all ${
                          rustVariant === "flo"
                            ? "border-red-500 bg-red-950/30"
                            : "border-white/10 bg-black/20 hover:border-red-500/50"
                        }`}
                      >
                        <div className="text-white font-bold text-sm">FLO</div>
                        <div className="text-yellow-400 text-xs mt-1">Budget Option</div>
                      </button>
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-white font-bold">Choose Your Plan</h3>
                  </div>
                  <div className="space-y-2">
                    {(actualId === "arc-raiders" ? getArcPrices() : actualId === "rust" ? getRustPrices() : product.prices).map((plan, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPlan(index)}
                        className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                          selectedPlan === index
                            ? "border-red-500 bg-red-950/30"
                            : "border-white/10 bg-black/20 hover:border-red-500/50"
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-medium text-white">{plan.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white text-lg">{plan.amount}</div>
                          {plan.originalAmount && (
                            <div className="text-xs text-gray-500 line-through">{plan.originalAmount}</div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Buy Button */}
                <Button
                  onClick={() => {
                    // Products with direct Shopify checkout
                    const shopifyProducts = [
                      "valorant", "temp-spoofer", "apex", "r6", "rust", 
                      "perm-spoofer", "fortnite", "call-of-duty", "accounts",

                    ]
                    const isArcDelta = actualId === "arc-raiders" && arcVariant === "delta"
                    const isArcFlo = actualId === "arc-raiders" && arcVariant === "flo"
                    
                    if (isArcDelta || isArcFlo || shopifyProducts.includes(actualId)) {
                      let checkoutUrls: string[] = []
                      
                      if (actualId === "valorant") {
                        // Valorant uses Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        if (selectedPlan === 0) w.storrik.pay("prod_38208c3d47cf3e4655261be6ce8d1be1", "var_700ebfaef0c177276900353d8af81b74")
                        if (selectedPlan === 1) w.storrik.pay("prod_38208c3d47cf3e4655261be6ce8d1be1", "var_06b4d1bf7e3cf5c4c14add979cb8f22a")
                        if (selectedPlan === 2) w.storrik.pay("prod_38208c3d47cf3e4655261be6ce8d1be1", "var_2c7f9947db0fc509e6f2daeefa05cb8d")
                        if (selectedPlan === 3) w.storrik.pay("prod_38208c3d47cf3e4655261be6ce8d1be1", "var_ca1f255023952eeffd219aaa96fd03ae")
                        return
                      } else if (isArcDelta) {
                        // Arc Raiders Delta uses Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        if (selectedPlan === 0) w.storrik.pay("prod_d43ef1f959c63f993844b17116f30924", "var_c57e0d7c4683dac03f853d386aba0b1d")
                        if (selectedPlan === 1) w.storrik.pay("prod_d43ef1f959c63f993844b17116f30924", "var_3347ba80ca5f2e762839f5e9e38e7115")
                        if (selectedPlan === 2) w.storrik.pay("prod_d43ef1f959c63f993844b17116f30924", "var_6c2d3e1b23872878f37e4bde693ef265")
                        if (selectedPlan === 3) w.storrik.pay("prod_d43ef1f959c63f993844b17116f30924", "var_58dba61731328474f920d3b786d2ee29")
                        return
                      } else if (isArcFlo) {
                        // Arc Raiders Flo uses Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        if (selectedPlan === 0) w.storrik.pay("prod_e48797d3b7531a89527bb77df3403ba7", "var_a1d317bde88c5c2402be30ddc8793427")
                        if (selectedPlan === 1) w.storrik.pay("prod_e48797d3b7531a89527bb77df3403ba7", "var_1dc0e3840d2ed8e5f1d510870176c7cf")
                        if (selectedPlan === 2) w.storrik.pay("prod_e48797d3b7531a89527bb77df3403ba7", "var_5c083736c33630e7896dc194c0d5bcb7")
                        return
                      } else if (actualId === "temp-spoofer") {
                        // Temp Spoofer uses Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        if (selectedPlan === 0) w.storrik.pay("prod_b227a6f466ae1c9564ec723f68252d28", "var_0b40ad7bf50999b7567bc5179a4e55ea")
                        if (selectedPlan === 1) w.storrik.pay("prod_b227a6f466ae1c9564ec723f68252d28", "var_f39e70f481cacfd1f694c8b61c655b89")
                        if (selectedPlan === 2) w.storrik.pay("prod_b227a6f466ae1c9564ec723f68252d28", "var_8533d1c4028ef382b4307b8fcfde41a0")
                        if (selectedPlan === 3) w.storrik.pay("prod_b227a6f466ae1c9564ec723f68252d28", "var_7ee6e856d6afe19c20c93bfc99b9973e")
                        return
                      } else if (actualId === "apex") {
                        // Apex uses Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        if (selectedPlan === 0) w.storrik.pay("prod_98758f3b05994e595b016777d9b9c767", "var_c32efd19a0498942cee52863230a9ee5")
                        if (selectedPlan === 1) w.storrik.pay("prod_98758f3b05994e595b016777d9b9c767", "var_51635894854e992dfcbb73fe284ba260")
                        if (selectedPlan === 2) w.storrik.pay("prod_98758f3b05994e595b016777d9b9c767", "var_bc6e02603108894afcab34600cf54485")
                        if (selectedPlan === 3) w.storrik.pay("prod_98758f3b05994e595b016777d9b9c767", "var_03021f3b324facd274965407fdd0dfc5")
                        return
                      } else if (actualId === "rust") {
                        // Rust uses Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        if (selectedPlan === 0) w.storrik.pay("prod_0e7cdf3b6c1b01801a5b1ef64c36d944", "var_3c46b1f775e4ac78ccbd237feea171e4")
                        if (selectedPlan === 1) w.storrik.pay("prod_0e7cdf3b6c1b01801a5b1ef64c36d944", "var_9f5f807009a021f3b8c02de123fbfa53")
                        if (selectedPlan === 2) w.storrik.pay("prod_0e7cdf3b6c1b01801a5b1ef64c36d944", "var_82dfbf2813792b0c45a4ce3d2e7290c9")
                        if (selectedPlan === 3) w.storrik.pay("prod_0e7cdf3b6c1b01801a5b1ef64c36d944", "var_56013fcdf9b3cc0ca307428c11c87399")
                        return
                      } else if (actualId === "perm-spoofer") {
                        // Perm Spoofer uses Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        if (selectedPlan === 0) w.storrik.pay("prod_71957086c73711b92de4d8409a6e2d09", "var_cafac9c0a64d0df628436b29eda27036")
                        if (selectedPlan === 1) w.storrik.pay("prod_71957086c73711b92de4d8409a6e2d09", "var_26c3abd69f4484ff0e0aded8a28c5876")
                        return
                      } else if (actualId === "fortnite") {
                        // Fortnite uses Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        if (selectedPlan === 0) w.storrik.pay("prod_52aa133cde67d1f0386bfb20fdd49d0d", "var_e6a2f9bb6a662830eab3b00fd231b7ff")
                        if (selectedPlan === 1) w.storrik.pay("prod_52aa133cde67d1f0386bfb20fdd49d0d", "var_a8a2c5e20e15f85e406c09afc879de0e")
                        if (selectedPlan === 2) w.storrik.pay("prod_52aa133cde67d1f0386bfb20fdd49d0d", "var_1b5a2a79f29dbbf97aa4d22f4a36f707")
                        if (selectedPlan === 3) w.storrik.pay("prod_52aa133cde67d1f0386bfb20fdd49d0d", "var_4257dcd182bf7955f6b8f6b0dfbbe692")
                        return
                      } else if (actualId === "call-of-duty") {
                        // COD uses Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        if (selectedPlan === 0) w.storrik.pay("prod_a02c802a3befba3bc65120190ae89b73", "var_3fa6a55487e809776b7f10197ed46159")
                        if (selectedPlan === 1) w.storrik.pay("prod_a02c802a3befba3bc65120190ae89b73", "var_38c382c3e578052d9d4f2b34ddaca3c2")
                        if (selectedPlan === 2) w.storrik.pay("prod_a02c802a3befba3bc65120190ae89b73", "var_08434791164095d7342ba18fd77c4532")
                        if (selectedPlan === 3) w.storrik.pay("prod_a02c802a3befba3bc65120190ae89b73", "var_66d621d60649b603b9218a5a2ba31225")
                        return
                      } else if (actualId === "r6") {
                        // R6 Siege uses Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        if (selectedPlan === 0) w.storrik.pay("prod_9d29f756990fdcf7a8e2d84340990ac4", "var_3c8023b2736168e46aa67d18fe0e00d4")
                        if (selectedPlan === 1) w.storrik.pay("prod_9d29f756990fdcf7a8e2d84340990ac4", "var_d5f0b2c9d1ac5abead44a4f3fe952f4f")
                        if (selectedPlan === 2) w.storrik.pay("prod_9d29f756990fdcf7a8e2d84340990ac4", "var_d5f0b2c9d1ac5abead44a4f3fe952f4f")
                        if (selectedPlan === 3) w.storrik.pay("prod_9d29f756990fdcf7a8e2d84340990ac4", "var_0d25afe42f6e5b063580c9f0cb819011")
                        return
                      } else if (actualId === "accounts") {
                        // Accounts use Storrik checkout modal
                        const w = window as unknown as { storrik?: { configure: (opts: { pk: string }) => void; pay: (productId: string, variantId: string) => void } }
                        if (!w.storrik) return
                        w.storrik.configure({ pk: "pk_live_iapU6j_nnzlD5yMbhNVpSCr3lHXSQZuM8naau4wmLzM" })
                        w.storrik.pay("prod_a02c802a3befba3bc65120190ae89b73", "var_f62ece1b638348d90afa293c3100cc5d")
                        return
                      }
                      
                      window.open(checkoutUrls[selectedPlan], "_blank")
                    } else {
                      setIsCheckoutOpen(true)
                    }
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-6 text-lg"
                >
                  Buy Here
                </Button>

                {/* Pay with Crypto */}
                <Button
                  onClick={() => setIsCryptoOpen(true)}
                  variant="outline"
                  className="w-full border-white/10 bg-transparent hover:bg-white/5 text-white font-bold py-6 text-lg"
                >
                  <svg className="w-5 h-5 mr-2 text-[#F7931A]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
                  </svg>
                  Pay with Crypto
                </Button>

                <CryptoPaymentModal
                  isOpen={isCryptoOpen}
                  onClose={() => setIsCryptoOpen(false)}
                  amount={(actualId === "arc-raiders" ? getArcPrices() : actualId === "rust" ? getRustPrices() : product.prices)[selectedPlan]?.amount || "$0"}
                  planName={`${product.name} - ${(actualId === "arc-raiders" ? getArcPrices() : actualId === "rust" ? getRustPrices() : product.prices)[selectedPlan]?.duration || ""}`}
                />

                {/* Secure Payment Badge */}
                <div className="bg-black/40 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-gray-400 font-medium text-sm">Accepted Payment Methods</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    {/* PayPal */}
                    <div className="bg-white rounded-lg px-4 py-3 flex items-center justify-center min-w-[70px]">
                      <span className="text-[#003087] font-bold text-lg">PayPal</span>
                    </div>

                    {/* Visa */}
                    <div className="bg-[#1A1F71] rounded-lg px-4 py-3 flex items-center justify-center min-w-[70px]">
                      <span className="text-white font-bold text-lg">VISA</span>
                    </div>

                    {/* Mastercard */}
                    <div className="bg-white rounded-lg px-4 py-3 flex items-center justify-center min-w-[70px]">
                      <div className="flex items-center gap-[-4px]">
                        <div className="w-6 h-6 rounded-full bg-[#EB001B]" />
                        <div className="w-6 h-6 rounded-full bg-[#FF5F00] -ml-2" />
                      </div>
                    </div>

                    {/* American Express */}
                    <div className="bg-[#006FCF] rounded-lg px-4 py-3 flex items-center justify-center min-w-[70px]">
                      <span className="text-white font-bold text-sm">AMEX</span>
                    </div>

                    {/* Bitcoin */}
                    <div className="bg-[#F7931A] rounded-lg px-4 py-3 flex items-center justify-center min-w-[70px]">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
                      </svg>
                    </div>

                    {/* Litecoin */}
                    <div className="bg-[#345D9D] rounded-lg px-4 py-3 flex items-center justify-center min-w-[70px]">
                      <span className="text-white font-bold text-xl">Ł</span>
                    </div>

                    {/* Cash App */}
                    <div className="bg-gradient-to-br from-[#00D632] via-[#00B523] to-[#00A82D] rounded-lg px-4 py-3 flex items-center justify-center min-w-[70px]">
                      <span className="text-white font-bold text-lg">$</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-700 rounded-full" />
            <h2 className="text-2xl font-bold">Related Products</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts
              .filter((p) => p.id !== actualId)
              .slice(0, 5)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <Card className="group overflow-hidden bg-gradient-to-br from-gray-900 to-black border-white/10 hover:border-red-500/50 transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-zinc-900 to-black">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.game}
                        width={400}
                        height={400}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-sm font-bold text-white mb-2">{relatedProduct.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">KIBA Cheats</span>
                        <span className="text-base font-bold text-white">{relatedProduct.price}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        productName={product.name}
        planName={product.prices[selectedPlan].duration}
        price={product.prices[selectedPlan].amount}
        checkoutUrl={
          actualId === "fortnite"
            ? [
                "https://www.fanbasis.com/agency-checkout/antweaks/2x4rW", // 1 day
                "https://www.fanbasis.com/agency-checkout/antweaks/869jg", // 1 week
                "https://www.fanbasis.com/agency-checkout/antweaks/gLZzk", // 1 month
                "https://www.fanbasis.com/agency-checkout/antweaks/wmVWr", // lifetime
              ][selectedPlan]
            : actualId === "valorant"
              ? [
                  "https://xyaniu.com/products/val-kiba?variant=56646571131224", // 1 day
                  "https://xyaniu.com/products/val-kiba?variant=56646571163992", // 1 week
                  "https://xyaniu.com/products/val-kiba?variant=56646571196760", // 1 month
                  "https://xyaniu.com/products/val-kiba?variant=56646571229528", // lifetime
                ][selectedPlan]
              : actualId === "r6"
              ? [
                  "https://www.fanbasis.com/agency-checkout/antweaks/Gv5Q3", // 1 day
                  "https://www.fanbasis.com/agency-checkout/antweaks/6RrA7", // 1 week
                  "https://www.fanbasis.com/agency-checkout/antweaks/7LvBw", // 1 month
                  "https://www.fanbasis.com/agency-checkout/antweaks/86wDl", // lifetime
                ][selectedPlan]
              : actualId === "apex"
                ? [
                    "https://www.fanbasis.com/agency-checkout/antweaks/4QR4k", // 1 day
                    "https://www.fanbasis.com/agency-checkout/antweaks/Q0Gx0", // 1 week
                    "https://www.fanbasis.com/agency-checkout/antweaks/RoJyO", // 1 month
                    "https://www.fanbasis.com/agency-checkout/antweaks/yryn6", // lifetime
                  ][selectedPlan]
                : actualId === "rust"
                ? rustVariant === "delta"
                  ? [
                      "https://www.fanbasis.com/agency-checkout/antweaks/WLOzn", // 1 day
                      "https://www.fanbasis.com/agency-checkout/antweaks/2vNXW", // 1 week
                      "https://www.fanbasis.com/agency-checkout/antweaks/32X39", // 1 month
                      "https://www.fanbasis.com/agency-checkout/antweaks/4R32k", // lifetime
                    ][selectedPlan]
                  : [
                      "https://www.fanbasis.com/agency-checkout/antweaks/jZQjP", // 1 week
                      "https://www.fanbasis.com/agency-checkout/antweaks/k8QkN", // 1 month
                      "https://www.fanbasis.com/agency-checkout/antweaks/lxQlg", // lifetime
                    ][selectedPlan]
                : actualId === "arc-raiders"
                  ? arcVariant === "delta"
                    ? [
                        "https://xyaniu.com/products/arc-rd-kiba-delta?variant=56646554354008", // 1 day
                        "https://xyaniu.com/products/arc-rd-kiba-delta?variant=56646554386776", // 1 week
                        "https://xyaniu.com/products/arc-rd-kiba-delta?variant=56646554419544", // 1 month
                        "https://xyaniu.com/products/arc-rd-kiba-delta?variant=56646554452312", // lifetime
                      ][selectedPlan]
                    : [
                        "https://www.fanbasis.com/agency-checkout/antweaks/5QnkK", // 1 week
                        "https://www.fanbasis.com/agency-checkout/antweaks/6XolV", // 1 month
                        "https://www.fanbasis.com/agency-checkout/antweaks/718my", // lifetime
                      ][selectedPlan]
                  : actualId === "call-of-duty"
                    ? [
                        "https://www.fanbasis.com/agency-checkout/antweaks/86NgW", // 1 week
                        "https://www.fanbasis.com/agency-checkout/antweaks/9QNjY", // 1 month
                        "https://www.fanbasis.com/agency-checkout/antweaks/0V7M3", // lifetime
                      ][selectedPlan]
                    : actualId === "fivem"
                              ? [
                                  "https://www.fanbasis.com/agency-checkout/antweaks/jZ09z", // 1 week
                                  "https://www.fanbasis.com/agency-checkout/antweaks/lx29J", // 1 month
                                  "https://www.fanbasis.com/agency-checkout/antweaks/mOY9A", // lifetime
                                ][selectedPlan]
                              : actualId === "perm-spoofer"
                              ? [
                                  "https://www.fanbasis.com/agency-checkout/antweaks/6RNwV", // one-time
                                  "https://www.fanbasis.com/agency-checkout/antweaks/7L0xy", // lifetime
                                ][selectedPlan]
                              : actualId === "temp-spoofer"
                                ? [
                                    "https://www.fanbasis.com/agency-checkout/antweaks/mQjn3", // 3 day
                                    "https://www.fanbasis.com/agency-checkout/antweaks/oQl0L", // 1 week
                                    "https://www.fanbasis.com/agency-checkout/antweaks/jqKky", // 1 month
                                    "https://www.fanbasis.com/agency-checkout/antweaks/l5gmj", // lifetime
                                  ][selectedPlan]
                                : actualId === "accounts"
                                  ? "https://storrik.com" // Accounts use Storrik modal
                                  
                                  : actualId === "valorant"
                                    ? [
                                        "https://www.fanbasis.com/agency-checkout/antweaks/nrkP5", // 1 week
                                        "https://www.fanbasis.com/agency-checkout/antweaks/pQmPQ", // 1 month
                                        "https://www.fanbasis.com/agency-checkout/antweaks/vovk8", // lifetime
                                      ][selectedPlan]
                                    : actualId === "apex"
                                        ? [
                                            "https://www.fanbasis.com/agency-checkout/antweaks/Q0Gx0", // 1 week
                                            "https://www.fanbasis.com/agency-checkout/antweaks/RoJyO", // 1 month
                                            "https://www.fanbasis.com/agency-checkout/antweaks/VPjDv", // lifetime
                                          ][selectedPlan]
                                        : [
                                            "https://fanbasis.com/agency-checkout/antweaks",
                                            "https://fanbasis.com/agency-checkout/antweaks",
                                            "https://fanbasis.com/agency-checkout/antweaks",
                                            "https://fanbasis.com/agency-checkout/antweaks",
                                          ][selectedPlan]
        }
      />
    </div>
  )
}
