"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [showSearchFilter, setShowSearchFilter] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("Everywhere")

  const pricingTiers = [
    {
      duration: "1 Week",
      price: "$14.65",
      originalPrice: "$19.99",
      badge: null,
      checkoutUrl: "https://www.fanbasis.com/agency-checkout/antweaks/6RX5O",
    },
    {
      duration: "1 Month",
      price: "$27.65",
      originalPrice: "$29.99",
      badge: null,
      checkoutUrl: "https://www.fanbasis.com/agency-checkout/antweaks/7L15Q",
    },
    {
      duration: "Lifetime (Private Features)",
      price: "$59.99",
      originalPrice: "$79.99",
      badge: null,
      checkoutUrl: "https://www.fanbasis.com/agency-checkout/antweaks/8615j",
    },
  ]

  const handleProductClick = (productId: string) => {
    window.location.href = `/products/${productId}`
  }

  const products = [
    {
      id: "fortnite",
      title: "FORTNITE",
      game: "Fortnite",
      image: "/images/fortnite-extra.png",
      price: "$13.99",
      rating: 5,
      color: "from-red-500/20 to-red-900/20",
    },
    {
      id: "temp-spoofer",
      title: "TEMP SPOOFER",
      game: "Spoofer",
      image: "/images/temp-spoofer-green.jpg",
      price: "$7.99",
      rating: 5,
      color: "from-green-500/20 to-green-900/20",
    },
    {
      id: "rust",
      title: "RUST",
      game: "Rust",
      image: "/images/rustt.png",
      price: "$13.99",
      rating: 5,
      color: "from-red-500/20 to-orange-900/20",
    },
    {
      id: "arc-raiders",
      title: "ARC RAIDERS",
      game: "Arc Raiders",
      image: "/images/arc-raiders-extra.png",
      price: "$13.99",
      rating: 5,
      color: "from-green-500/20 to-green-900/20",
    },
    {
      id: "perm-spoofer",
      title: "PERM SPOOFER",
      game: "Universal Spoofer",
      image: "/images/perm-spoofer-red.jpg",
      price: "$13.99",
      rating: 5,
      color: "from-red-500/20 to-red-900/20",
    },
    {
      id: "apex",
      title: "APEX LEGENDS",
      game: "Apex",
      image: "/images/apex-new.png",
      price: "$13.99",
      rating: 5,
      color: "from-cyan-500/20 to-cyan-900/20",
    },
    {
      id: "call-of-duty",
      title: "CALL OF DUTY",
      game: "Call of Duty",
      image: "/images/cod-extra.png",
      price: "$13.99",
      rating: 5,
      color: "from-red-500/20 to-red-900/20",
    },
    {
      id: "r6-siege",
      title: "RAINBOW SIX SIEGE",
      game: "R6 Siege",
      image: "/images/r6666.png",
      price: "$13.99",
      rating: 5,
      color: "from-red-500/20 to-red-900/20",
    },
    {
      id: "valorant",
      title: "VALORANT",
      game: "Valorant",
      image: "/images/kiba-cheats-banner-20valo.webp",
      price: "$13.99",
      rating: 5,
      color: "from-red-500/20 to-red-900/20",
    },
    {
      id: "accounts",
      title: "ACCOUNTS",
      game: "Accounts",
      image: "/images/accounts.png",
      price: "$9.99",
      rating: 5,
      color: "from-teal-500/20 to-teal-900/20",
    },
  ]

  const searchFilters = ["Everywhere", "Status Updates", "Topics", "Pages", "Files", "Products", "Members"]

  return (
    <div className="flex min-h-screen flex-col bg-black">
      {/* Main Content */}
      <main className="flex-1 min-h-screen relative z-10">
        {/* Hero Section with Background Image and Centered Content */}
        <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden border-b border-zinc-800">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/dark-tactical-soldiers-gaming-combat-scene.jpg"
              alt="Hero Background"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          </div>

          {/* Content */}
          <div className="container relative z-10 px-4">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto py-12">
              {/* Logo */}
              <div className="mb-4">
                <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">EXTRA</h1>
                <div className="text-sm text-zinc-400 tracking-[0.3em] mt-1">CHEATS</div>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Undetected Gaming Cheats</h2>

              {/* Description */}
              <p className="text-lg text-zinc-400 max-w-2xl">Dominate and Win every Game with our Undetected Cheats</p>
            </div>
          </div>
        </section>

        {/* PayPal Banner */}
        <div className="bg-black border-y border-zinc-800">
          <div className="container mx-auto max-w-5xl px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl bg-black p-6 border border-zinc-800 hover:border-red-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-red-500/10 group/paypal">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 transition-all duration-500 group-hover/paypal:scale-110 group-hover/paypal:shadow-lg group-hover/paypal:shadow-blue-500/30">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#00A4E4">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.77.77 0 0 1 .76-.633h8.78c2.86 0 4.842 1.862 4.842 4.554 0 3.307-2.468 5.63-6.002 5.63H9.96l-1.023 5.996a.641.641 0 0 1-.633.528l-.228.542zm2.01-10.252h2.09c1.876 0 3.115-1.235 3.115-3.4 0-1.338-.947-2.2-2.473-2.2H7.297l-1.055 5.6h2.844z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Buying with PayPal?</h3>
                  <p className="text-sm text-zinc-400 max-w-md">
                    To buy with PayPal, please join our PayPal server and make a ticket.
                  </p>
                </div>
              </div>
              <Link
                href="https://discord.gg/AxE897SHap"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-3 rounded-lg shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300 whitespace-nowrap">
                  Join Discord
                </button>
              </Link>
            </div>
          </div>
        </div>

        <section className="py-16 md:py-24 bg-black" id="featured">
          <div className="container">
            <div className="mb-12 text-center">
              <div className="mb-4">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Featured Products</h2>
                <Separator className="mt-4 w-16 bg-red-500" />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "both" }}
                >
                  <Card className="overflow-hidden bg-card border-border hover:border-red-500/50 transition-all duration-500 cursor-pointer group hover-lift hover-border-glow hover:shadow-2xl hover:shadow-red-500/20">
                    <div className="relative overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={`${product.game} product`}
                        width={1050}
                        height={1050}
                        className="object-cover w-full aspect-square transition-transform duration-700 group-hover:scale-115"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-red-600/90 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                          View Product
                          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="mb-2 text-xl font-bold transition-all duration-300 group-hover:text-red-500 group-hover:translate-x-1 hover-text-glow">
                        {product.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground transition-all duration-300 group-hover:text-zinc-300">{product.game}</p>
                      <div className="mb-4 flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="h-4 w-4 fill-yellow-400 transition-all duration-300 group-hover:scale-125 group-hover:fill-yellow-300"
                            viewBox="0 0 20 20"
                            style={{ transitionDelay: `${i * 80}ms` }}
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-red-400 transition-all duration-300 group-hover:text-red-300 group-hover:scale-110 origin-left">
                          {product.price}
                        </span>
                        <span className="text-xs text-muted-foreground transition-all duration-300 group-hover:text-zinc-400">Extra Cheats</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">What Cheat Users Say</h2>
              <p className="text-zinc-400">
                Join thousands of satisfied users who have elevated their competitive gameplay
              </p>
            </div>

            <div className="relative overflow-hidden">
              {/* Infinite scrolling container */}
              <div className="flex gap-6 animate-scroll-left">
                {/* First set of reviews */}
                <Card className="bg-black border-zinc-800 p-6 min-w-[350px] flex-shrink-0 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-2 transition-all duration-500 group/card">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-red-500 transition-transform duration-300 group-hover/card:scale-110" style={{ transitionDelay: `${i * 60}ms` }} viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-4 transition-colors duration-300 group-hover/card:text-white">
                    "Best cheats I've ever used! The Valorant cheat is undetected and works flawlessly. Customer support
                    is top-notch too."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold transition-all duration-300 group-hover/card:scale-110 group-hover/card:shadow-lg group-hover/card:shadow-red-500/50">
                      M
                    </div>
                    <div>
                      <p className="font-semibold text-white">Marcus_Pro</p>
                      <p className="text-xs text-zinc-400 transition-colors duration-300 group-hover/card:text-red-400">Valorant User</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-black border-zinc-800 p-6 min-w-[350px] flex-shrink-0 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-2 transition-all duration-500 group/card2">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-red-500 transition-transform duration-300 group-hover/card2:scale-110" style={{ transitionDelay: `${i * 60}ms` }} viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-4 transition-colors duration-300 group-hover/card2:text-white">
                    "The spoofer saved my account! Got banned before but with Extra's temp spoofer I'm back in the game
                    with zero issues."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold transition-all duration-300 group-hover/card2:scale-110 group-hover/card2:shadow-lg group-hover/card2:shadow-red-500/50">
                      S
                    </div>
                    <div>
                      <p className="font-semibold text-white">Shadow_X</p>
                      <p className="text-xs text-zinc-400 transition-colors duration-300 group-hover/card2:text-red-400">Spoofer User</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-black border-zinc-800 p-6 min-w-[350px] flex-shrink-0 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-2 transition-all duration-500 group/card3">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-red-500 transition-transform duration-300 group-hover/card3:scale-110" style={{ transitionDelay: `${i * 60}ms` }} viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-4 transition-colors duration-300 group-hover/card3:text-white">
                    "Been using Extra Cheats for 6+ months across multiple games. Never been detected, constantly updated, and
                    the community is amazing!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold transition-all duration-300 group-hover/card3:scale-110 group-hover/card3:shadow-lg group-hover/card3:shadow-red-500/50">
                      A
                    </div>
                    <div>
                      <p className="font-semibold text-white">Apex_King</p>
                      <p className="text-xs text-zinc-400 transition-colors duration-300 group-hover/card3:text-red-400">Long-time User</p>
                    </div>
                  </div>
                </Card>

                {/* Duplicate set for seamless loop */}
                <Card className="bg-black border-zinc-800 p-6 min-w-[350px] flex-shrink-0 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-2 transition-all duration-500">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-red-500" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-4">
                    "Best cheats I've ever used! The Valorant cheat is undetected and works flawlessly. Customer support
                    is top-notch too."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                      M
                    </div>
                    <div>
                      <p className="font-semibold text-white">Marcus_Pro</p>
                      <p className="text-xs text-zinc-400">Valorant User</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-black border-zinc-800 p-6 min-w-[350px] flex-shrink-0 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-2 transition-all duration-500">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-red-500" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-4">
                    "The spoofer saved my account! Got banned before but with Extra's temp spoofer I'm back in the game
                    with zero issues."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <p className="font-semibold text-white">Shadow_X</p>
                      <p className="text-xs text-zinc-400">Spoofer User</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-black border-zinc-800 p-6 min-w-[350px] flex-shrink-0 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10 hover:-translate-y-2 transition-all duration-500">
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-red-500" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-zinc-300 mb-4">
                    "Been using Extra Cheats for 6+ months across multiple games. Never been detected, constantly updated, and
                    the community is amazing!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-semibold text-white">Apex_King</p>
                      <p className="text-xs text-zinc-400">Long-time User</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link href="/reviews">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
                  View All Reviews
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Dialog */}
        {/* <Dialog open={isPricingOpen} onOpenChange={setIsPricingOpen}>
          <DialogContent className="sm:max-w-[600px] bg-zinc-950 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Choose Your Plan</DialogTitle>
              <DialogDescription className="text-zinc-400">
                Select a pricing option for {selectedProduct}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {pricingTiers.map((tier, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden bg-zinc-900 border-zinc-800 hover:border-red-500 transition-all cursor-pointer group"
                >
                  {tier.badge && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-red-600 text-white px-2 py-1 rounded">{tier.badge}</span>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-2">{tier.duration}</h3>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-red-400">{tier.price}</span>
                          <span className="text-lg text-zinc-500 line-through">{tier.originalPrice}</span>
                        </div>
                      </div>
                      <Button
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => window.open(tier.checkoutUrl, "_blank")}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog> */}

        <section className="bg-black py-16 border-y border-zinc-800">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center group/f1 hover-float cursor-default">
                <div className="rounded-full bg-red-600/10 p-3 mb-4 inline-flex border border-red-600/20 transition-all duration-500 group-hover/f1:bg-red-600/20 group-hover/f1:border-red-500/40 group-hover/f1:shadow-lg group-hover/f1:shadow-red-500/20 group-hover/f1:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500 transition-transform duration-300 group-hover/f1:rotate-12"
                  >
                    <path d="M12 2a10 10 0 0 1 7.07 17.07l-1.41-1.41A8 8 0 1 0 12 20v2a10 10 0 0 1 0-20z" />
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white transition-colors duration-300 group-hover/f1:text-red-400">Secure & Undetected</h3>
                <p className="text-sm text-zinc-400">
                  Our software is designed to be undetectable by anti-cheat systems.
                </p>
              </div>
              <div className="text-center group/f2 hover-float cursor-default">
                <div className="rounded-full bg-red-600/10 p-3 mb-4 inline-flex border border-red-600/20 transition-all duration-500 group-hover/f2:bg-red-600/20 group-hover/f2:border-red-500/40 group-hover/f2:shadow-lg group-hover/f2:shadow-red-500/20 group-hover/f2:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500 transition-transform duration-300 group-hover/f2:rotate-180"
                  >
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white transition-colors duration-300 group-hover/f2:text-red-400">Regular Updates</h3>
                <p className="text-sm text-zinc-400">
                  We constantly update our products to ensure compatibility with game updates.
                </p>
              </div>
              <div className="text-center group/f3 hover-float cursor-default">
                <div className="rounded-full bg-red-600/10 p-3 mb-4 inline-flex border border-red-600/20 transition-all duration-500 group-hover/f3:bg-red-600/20 group-hover/f3:border-red-500/40 group-hover/f3:shadow-lg group-hover/f3:shadow-red-500/20 group-hover/f3:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500 transition-transform duration-300 group-hover/f3:scale-125"
                  >
                    <path d="M15 11c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white transition-colors duration-300 group-hover/f3:text-red-400">Global Support</h3>
                <p className="text-sm text-zinc-400">
                  Our support team is available 24/7 to assist customers worldwide.
                </p>
              </div>
              <div className="text-center group/f4 hover-float cursor-default">
                <div className="rounded-full bg-red-600/10 p-3 mb-4 inline-flex border border-red-600/20 transition-all duration-500 group-hover/f4:bg-red-600/20 group-hover/f4:border-red-500/40 group-hover/f4:shadow-lg group-hover/f4:shadow-red-500/20 group-hover/f4:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500 transition-transform duration-300 group-hover/f4:rotate-12"
                  >
                    <path d="M16 16h.01" />
                    <path d="M11 15h.01" />
                    <path d="M16 16h.01" />
                    <path d="m2 16 20 6-6-20L2 16Z" />
                    <path d="M5.71 17.11 17.2 11.7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white transition-colors duration-300 group-hover/f4:text-red-400">Customer Satisfaction</h3>
                <p className="text-sm text-zinc-400">
                  We prioritize customer satisfaction with high-quality products and support.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/30">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/extra-cheats-logo.png"
                  alt="Extra Cheats"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="text-lg font-bold text-white">Extra Cheats</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                Providing high-quality gaming enhancements since 2018. Our mission is to improve your gaming experience.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-red-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-red-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-red-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-red-500 transition-all duration-300 hover:scale-125 hover:-translate-y-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-red-400 transition-all duration-300 animated-underline hover:translate-x-1 inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-muted-foreground hover:text-red-400 transition-all duration-300 animated-underline hover:translate-x-1 inline-block">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-red-400 transition-all duration-300 animated-underline hover:translate-x-1 inline-block">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Games</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products/fortnite"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Fortnite
                  </Link>
                </li>
                <li>
                  <Link href="/products/rust" className="text-muted-foreground hover:text-foreground transition-colors">
                    Rust
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/valorant"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Valorant
                  </Link>
                </li>
                <li>
                  <Link href="/products/apex" className="text-muted-foreground hover:text-foreground transition-colors">
                    Apex Legends
                  </Link>
                </li>
                <li>
                  <Link href="/products/csgo" className="text-muted-foreground hover:text-foreground transition-colors">
                    CS:GO
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/r6-siege"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Rainbow Six Siege
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/battlefield"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Battlefield 6
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/arc-raiders"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Arc Raiders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/perm-spoofer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Spoofer (Permanent)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/temp-spoofer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Spoofer (Temporary)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/call-of-duty"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Call of Duty
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/r6-siege"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Rainbow Six Siege
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/battlefield"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Battlefield 6
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/minecraft"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Minecraft
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/marvel-rivals"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Marvel Rivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/accounts"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Accounts
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 text-muted-foreground"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-sm text-muted-foreground">+1 (123) 456-7890</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 text-muted-foreground"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="m2 16 20 6-6-20L2 16Z" />
                    <path d="M5.71 17.11 17.2 11.7" />
                  </svg>
                  <span className="text-sm text-muted-foreground">support at kibacheats dot com</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 text-muted-foreground"
                  >
                    <path d="M15 11h.01" />
                    <path d="M11 15h.01" />
                    <path d="M16 16h.01" />
                    <path d="m2 16 20 6-6-20L2 16Z" />
                    <path d="M5.71 17.11 17.2 11.7" />
                  </svg>
                  <span className="text-sm text-muted-foreground">Join our Discord for faster support</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">Copyright 2023 Extra Cheats. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/refund" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
