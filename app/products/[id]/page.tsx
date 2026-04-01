"use client"

import { useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckoutModal } from "@/components/checkout-modal"


const products = [
  {
    id: "fortnite",
    name: "FORTNITE CHEAT",
    game: "Fortnite",
    image: "/images/fortnite-product.png",
    prices: [
      { duration: "1 day", amount: "$10.99", originalAmount: "$19.99", checkoutUrl: "https://buy.stripe.com/8x27sN3v1fRpg633TZcs80D" },
      { duration: "3 day", amount: "$17.99", originalAmount: "$29.99", checkoutUrl: "https://buy.stripe.com/fZu14p2qX9t1075duzcs80E" },
      { duration: "7 day", amount: "$27.99", originalAmount: "$49.99", popular: true, checkoutUrl: "https://buy.stripe.com/fZu28tfdJ34D6vt4Y3cs80F" },
      { duration: "30 day", amount: "$59.99", originalAmount: "$99.99", checkoutUrl: "https://buy.stripe.com/9B65kF5D9bB95rp8afcs80G" },
      { duration: "lifetime", amount: "$249.99", originalAmount: "$399.99", popular: true, bestValue: true, checkoutUrl: "https://buy.stripe.com/8x214p5D9fRp6vt76bcs80H" },
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
    id: "call-of-duty",
    name: "CALL OF DUTY CHEAT",
    game: "Call of Duty",
    image: "/images/cod-product.png",
    prices: [
      { duration: "1 day", amount: "$9.99", originalAmount: "$19.99", checkoutUrl: "https://buy.stripe.com/8x200lghN5cLg63duzcs80h" },
      { duration: "1 week", amount: "$17.99", originalAmount: "$31.99", popular: true, checkoutUrl: "https://buy.stripe.com/7sY8wR9TpfRp7zxduzcs80i" },
      { duration: "1 month", amount: "$34.99", originalAmount: "$59.99", checkoutUrl: "https://buy.stripe.com/9B69AV7LhcFd5rpfCHcs80j" },
      { duration: "lifetime", amount: "$149.99", originalAmount: "$249.99", bestValue: true, checkoutUrl: "https://buy.stripe.com/9B6dRb3v134D2fd9ejcs80k" },
    ],
    rating: 4.8,
    totalReviews: 1156,
    color: "from-zinc-600 to-zinc-900",
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
    id: "arc-raiders",
    name: "ARC RAIDERS CHEAT",
    game: "Arc Raiders",
    image: "/images/arc-raiders-product.png",
    prices: [
      { duration: "1 day", amount: "$9.99", originalAmount: "$19.99", checkoutUrl: "https://buy.stripe.com/7sY6oJd5B9t17zx8afcs80a" },
      { duration: "1 week", amount: "$21.99", originalAmount: "$39.99", popular: true, checkoutUrl: "https://buy.stripe.com/cNi6oJ2qX5cLg63bmrcs80m" },
      { duration: "1 month", amount: "$57.99", originalAmount: "$99.99", checkoutUrl: "https://buy.stripe.com/aFa14pghN48H5rp627cs80B" },
      { duration: "lifetime", amount: "$119.99", originalAmount: "$199.99", popular: true, bestValue: true, checkoutUrl: "https://buy.stripe.com/eVqeVfghNcFd4nl0HNcs80o" },
    ],
    rating: 5.0,
    totalReviews: 723,
    color: "from-blue-600 to-blue-900",
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
      "Player ESP",
      "Show team",
      "Visibility check",
      "Customizable boxes",
      "Snapline",
      "2D radar",
      "Instant delivery",
      "Auto update (no re-download)",
      "Fully streamproof",
    ],
  },
  {
    id: "apex-legends",
    name: "APEX LEGENDS CHEAT",
    game: "Apex Legends",
    image: "/images/apex-legends.png",
    prices: [
      { duration: "1 day", amount: "$8.99", originalAmount: "$14.99" },
      { duration: "3 day", amount: "$14.99", originalAmount: "$24.99", popular: true },
      { duration: "7 day", amount: "$19.99", originalAmount: "$34.99" },
      { duration: "30 day", amount: "$24.99", originalAmount: "$44.99" },
      { duration: "lifetime", amount: "$49.99", originalAmount: "$99.99", bestValue: true },
    ],
    rating: 5.0,
    totalReviews: 842,
    color: "from-teal-600 to-teal-900",
    specifications: [
      { label: "Gameplay Modes", value: "AVAILABLE" },
      { label: "Anti-Cheat System", value: "EAC" },
      { label: "Intel & AMD CPU's", value: "SUPPORTED" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Aimbot with customizable FOV and smoothing",
      "ESP for players, loot and distances",
      "No recoil and no spread",
      "Radar with enemy positions",
      "Visibility check",
      "Customizable hotkeys",
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
    id: "hwid-spoofer",
    name: "HWID SPOOFER",
    game: "Universal",
    image: "/images/hwid-product.png",
    hasVariants: true,
    variants: [
      {
        id: "perm",
        name: "PERM",
        tagline: "Permanent Solution",
        tag: "RECOMMENDED",
        tagColor: "bg-green-500",
        description: "Permanent HWID changes that persist after reboot",
        startingPrice: "$24.99",
        prices: [
          { duration: "one-time", amount: "$24.99", originalAmount: "$39.99" },
          { duration: "lifetime", amount: "$79.99", originalAmount: "$129.99" },
        ],
      },
      {
        id: "temp",
        name: "TEMP",
        tagline: "Temporary Solution",
        tag: "BUDGET",
        tagColor: "bg-zinc-500",
        description: "Session-based spoofing, resets on reboot",
        startingPrice: "$7.99",
        prices: [
          { duration: "3 day", amount: "$7.99", originalAmount: "$12.99" },
          { duration: "1 week", amount: "$11.99", originalAmount: "$19.99" },
          { duration: "1 month", amount: "$19.99", originalAmount: "$29.99" },
          { duration: "lifetime", amount: "$39.99", originalAmount: "$54.99" },
        ],
      },
    ],
    prices: [
      { duration: "3 day", amount: "$7.99", originalAmount: "$12.99" },
    ],
    rating: 5.0,
    totalReviews: 4010,
    color: "from-green-600 to-green-900",
    specifications: [
      { label: "Compatibility", value: "UNIVERSAL" },
      { label: "Last Updated", value: "28/12/2024" },
      { label: "Hardware Support", value: "ALL DEVICES" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "HWID spoofing (permanent or temporary)",
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
  {
    id: "rainbow-six",
    name: "RAINBOW SIX",
    game: "Rainbow Six Siege",
    image: "/images/r6-product.png",
    prices: [
      { duration: "1 day", amount: "$12.99", originalAmount: "$24.99", checkoutUrl: "https://buy.stripe.com/cNi5kF5D90Wv1b9duzcs80p" },
      { duration: "1 week", amount: "$24.99", originalAmount: "$44.99", popular: true, checkoutUrl: "https://buy.stripe.com/4gM4gBe9F48HaLJeyDcs80q" },
      { duration: "1 month", amount: "$49.99", originalAmount: "$89.99", checkoutUrl: "https://buy.stripe.com/00wfZj7Lh9t19HF2PVcs80r" },
      { duration: "lifetime", amount: "$129.99", originalAmount: "$249.99", popular: true, bestValue: true, checkoutUrl: "https://buy.stripe.com/4gM9AV8Pl0Wv6vt3TZcs80s" },
    ],
    rating: 5.0,
    totalReviews: 892,
    color: "from-blue-600 to-blue-900",
    specifications: [
      { label: "Compatibility", value: "PC" },
      { label: "Last Updated", value: "28/12/2024" },
      { label: "Status", value: "UNDETECTED" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Aimbot with adjustable FOV",
      "ESP & Wallhack",
      "No recoil & no spread",
      "Triggerbot",
      "Radar hack",
      "Instant delivery",
      "24/7 support",
      "Regular updates",
    ],
  },
  {
    id: "valorant",
    name: "VALORANT",
    game: "Valorant",
    image: "/images/category-warframe.webp",
    prices: [
      { duration: "1 day", amount: "$9.99", originalAmount: "$19.99", checkoutUrl: "https://buy.stripe.com/5kQcN78Pl6gP075aincs80t" },
      { duration: "3 day", amount: "$14.99", originalAmount: "$24.99", checkoutUrl: "https://buy.stripe.com/cNibJ39Tp48HbPNduzcs80C" },
      { duration: "1 week", amount: "$19.99", originalAmount: "$34.99", popular: true, checkoutUrl: "https://buy.stripe.com/14A28t0iPbB94nlgGLcs80u" },
      { duration: "1 month", amount: "$39.99", originalAmount: "$69.99", checkoutUrl: "https://buy.stripe.com/bJe5kF9Tp0Wvg63eyDcs80v" },
      { duration: "lifetime", amount: "$119.99", originalAmount: "$199.99", popular: true, bestValue: true, checkoutUrl: "https://buy.stripe.com/7sY8wR7Lh5cL4nl1LRcs80w" },
    ],
    rating: 5.0,
    totalReviews: 1892,
    color: "from-red-600 to-red-900",
    specifications: [
      { label: "Compatibility", value: "PC" },
      { label: "Last Updated", value: "28/12/2024" },
      { label: "Status", value: "UNDETECTED" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Aimbot with smooth aim",
      "ESP & Wallhack",
      "No recoil",
      "Triggerbot",
      "Radar hack",
      "Agent ESP",
      "Instant delivery",
      "24/7 support",
    ],
  },
  {
    id: "apex-legends",
    name: "APEX LEGENDS",
    game: "Apex Legends",
    image: "/images/apex-product.png",
    prices: [
      { duration: "1 day", amount: "$8.99", originalAmount: "$17.99", checkoutUrl: "https://buy.stripe.com/eVqcN7c1xcFd5rp2PVcs804" },
      { duration: "3 day", amount: "$12.99", originalAmount: "$24.99", checkoutUrl: "https://buy.stripe.com/14A00l1mTfRpcTR2PVcs805" },
      { duration: "1 week", amount: "$17.99", originalAmount: "$34.99", popular: true, checkoutUrl: "https://buy.stripe.com/9B67sN1mT0Wv2fdduzcs807" },
      { duration: "1 month", amount: "$22.99", originalAmount: "$44.99", checkoutUrl: "https://buy.stripe.com/dRm14p0iPfRp7zx2PVcs808" },
      { duration: "lifetime", amount: "$47.99", originalAmount: "$99.99", popular: true, bestValue: true, checkoutUrl: "https://buy.stripe.com/5kQcN7fdJ9t17zx1LRcs809" },
    ],
    rating: 5.0,
    totalReviews: 1543,
    color: "from-red-600 to-orange-900",
    specifications: [
      { label: "Compatibility", value: "PC" },
      { label: "Last Updated", value: "28/12/2024" },
      { label: "Status", value: "UNDETECTED" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Aimbot with smooth aim",
      "ESP & Wallhack",
      "No recoil",
      "Triggerbot",
      "Item ESP",
      "Radar hack",
      "Instant delivery",
      "24/7 support",
    ],
  },
  {
    id: "rust",
    name: "RUST",
    game: "Rust",
    image: "/images/category-cs2.webp",
    prices: [
      { duration: "1 day", amount: "$9.99", originalAmount: "$19.99", checkoutUrl: "https://buy.stripe.com/cNidRbd5B8oXg63bmrcs80x" },
      { duration: "1 week", amount: "$27.99", originalAmount: "$49.99", popular: true, checkoutUrl: "https://buy.stripe.com/5kQ6oJd5BgVt8DBaincs80y" },
      { duration: "1 month", amount: "$54.99", originalAmount: "$99.99", checkoutUrl: "https://buy.stripe.com/cNifZjc1x8oXg630HNcs80z" },
      { duration: "lifetime", amount: "$119.99", originalAmount: "$199.99", popular: true, bestValue: true, checkoutUrl: "https://buy.stripe.com/bJe8wR2qX34D9HF9ejcs80A" },
    ],
    rating: 5.0,
    totalReviews: 1654,
    color: "from-orange-600 to-orange-900",
    specifications: [
      { label: "Compatibility", value: "PC" },
      { label: "Last Updated", value: "28/12/2024" },
      { label: "Status", value: "UNDETECTED" },
      { label: "Windows 10/11", value: "SUPPORTED" },
    ],
    features: [
      "Aimbot with prediction",
      "ESP & Wallhack",
      "No recoil",
      "Player ESP with health",
      "Item ESP",
      "Radar hack",
      "Instant delivery",
      "24/7 support",
    ],
  },
]

const relatedProducts = [
  {
    id: "fortnite",
    title: "Fortnite Cheats",
    game: "Fortnite",
    image: "/images/category-fortnite.webp",
    price: "$7.99",
    badge: "Undetected",
  },
  {
    id: "call-of-duty",
    title: "Call of Duty Cheats",
    game: "Call of Duty",
    image: "/images/category-arc-raiders.webp",
    price: "$11.99",
    badge: "Undetected",
  },
]

const productIdMap: Record<string, string> = {
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [selectedPlan, setSelectedPlan] = useState(0)
  const [showModal, setShowModal] = useState(false)
  
  const [showVariantModal, setShowVariantModal] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)

  const actualId = productIdMap[id] || id
  const product = products.find((p) => p.id === actualId)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [shopifyUrl, setShopifyUrl] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"features" | "requirements" | "faq">("features")

  // Show variant modal on mount for products with variants
  useEffect(() => {
    if (product?.hasVariants && !selectedVariant) {
      setShowVariantModal(true)
    }
  }, [product, selectedVariant])

  if (!product) {
    notFound()
  }

  // Get current prices based on selected variant
  const currentPrices = product.hasVariants && selectedVariant
    ? product.variants?.find(v => v.id === selectedVariant)?.prices || product.prices
    : product.prices
  
  const currentPlan = currentPrices[selectedPlan] || currentPrices[0]
  const totalPrice = Number.parseFloat(currentPlan.amount.replace("$", "")).toFixed(2)
  
  // Debug logging
  console.log("[v0] Product ID:", id, "Actual ID:", actualId, "Product Name:", product.name)
  console.log("[v0] Selected Plan:", selectedPlan, "Current Plan:", currentPlan)
  console.log("[v0] Checkout URL:", (currentPlan as { checkoutUrl?: string })?.checkoutUrl)

  return (
    <div className="flex min-h-screen flex-col bg-black">
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
                actualId === "arc-raiders" ? (
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
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <h3 className="text-white font-bold">Choose Your Plan</h3>
                  </div>
                  {/* Variant selector button for HWID spoofer */}
                  {product.hasVariants && (
                    <button
                      onClick={() => setShowVariantModal(true)}
                      className="w-full flex items-center justify-between p-3 mb-3 rounded-lg border border-green-500/50 bg-green-950/20 hover:bg-green-950/30 transition-all"
                    >
                      <span className="text-green-400 font-medium">
                        {selectedVariant ? `${selectedVariant.toUpperCase()} Spoofer` : "Select Version"}
                      </span>
                      <span className="text-zinc-400 text-sm">Change</span>
                    </button>
                  )}
                  <div className="space-y-2">
                    {currentPrices.map((plan, index) => (
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
                    // Handle HWID spoofer with variants - must select variant first
                    if (actualId === "hwid-spoofer" && !selectedVariant) {
                      setShowVariantModal(true)
                      return
                    }
                    
                    // Always show checkout modal for all products
                    setIsCheckoutOpen(true)
                  }}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-6 text-lg"
                >
                  Buy Here
                </Button>

                {/* Pay with Crypto or PayPal */}
                <Button
                  onClick={() => window.open("https://kibacheats.mykomerza.com/products", "_blank")}
                  variant="outline"
                  className="w-full border-white/10 bg-transparent hover:bg-white/5 text-white font-bold py-6 text-lg"
                >
                  <svg className="w-5 h-5 mr-2 text-[#F7931A]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z" />
                  </svg>
                  Pay with Crypto / PayPal
                </Button>

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
        planName={currentPrices[selectedPlan]?.duration || ""}
        price={currentPrices[selectedPlan]?.amount || "$0"}
        checkoutUrl={
          // First check if the selected price has a checkoutUrl
          (currentPrices[selectedPlan] as { checkoutUrl?: string })?.checkoutUrl ||
          // Fallback to product-specific URLs
          (actualId === "fortnite"
            ? "https://kibacheats.mykomerza.com/product?id=fortnitech"
            : actualId === "arc-raiders"
              ? "https://kibacheats.mykomerza.com/product?id=arc-raiders"
              : actualId === "call-of-duty"
                ? "https://kibacheats.mykomerza.com/product?id=cod"
                : actualId === "apex-legends"
                  ? "https://kibacheats.mykomerza.com/product?id=21ccd3fa-5d24-46c7-a6ed-c85f67baf47d"
                : actualId === "fivem"
                  ? [
                      "https://www.fanbasis.com/agency-checkout/antweaks/jZ09z", // 1 week
                      "https://www.fanbasis.com/agency-checkout/antweaks/lx29J", // 1 month
                      "https://www.fanbasis.com/agency-checkout/antweaks/mOY9A", // lifetime
                    ][selectedPlan]
                  : actualId === "hwid-spoofer" && selectedVariant === "perm"
                    ? "https://kibacheats.mykomerza.com/product?id=perm"
                    : actualId === "hwid-spoofer" && selectedVariant === "temp"
                      ? "https://kibacheats.mykomerza.com/product?id=temp"
                      : actualId === "accounts"
                        ? "https://storrik.com"
                        : "https://kibacheats.mykomerza.com")
        }
      />

      {/* Variant Selector Modal for HWID Spoofer */}
      {showVariantModal && product.hasVariants && product.variants && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => {
                if (selectedVariant) {
                  setShowVariantModal(false)
                }
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-white text-center mb-2">Choose Your Version</h2>
            <p className="text-zinc-400 text-center mb-6">Select the HWID Spoofer version that fits your needs</p>

            <div className="space-y-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariant(variant.id)
                    setSelectedPlan(0)
                    setShowVariantModal(false)
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedVariant === variant.id
                      ? "border-green-500 bg-green-950/30"
                      : "border-zinc-700 bg-zinc-900/50 hover:border-green-500/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-bold text-white">{variant.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${variant.tagColor} text-white`}>
                      {variant.tag}
                    </span>
                  </div>
                  <p className="text-green-400 font-medium mb-1">{variant.tagline}</p>
                  <p className="text-sm text-zinc-400 mb-2">Starting from {variant.startingPrice}</p>
                  <p className="text-xs text-zinc-500">{variant.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shopify Checkout Modal */}
      {shopifyUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShopifyUrl(null)} />
          <div className="relative w-full max-w-2xl mx-4 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 overflow-hidden" style={{ height: "80vh" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <h2 className="text-lg font-bold text-white">Secure Checkout</h2>
              <button onClick={() => setShopifyUrl(null)} className="text-zinc-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <iframe
              src={shopifyUrl}
              className="w-full h-full"
              style={{ height: "calc(80vh - 61px)" }}
              title="Shopify Checkout"
            />
          </div>
        </div>
      )}
    </div>
  )
}
