"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function GuidesPage() {
  const [selectedProduct, setSelectedProduct] = useState("Fortnite")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const gameProducts = [
    "Call of Duty",
    "Fortnite",
    "Arc Raiders",
  ]

  const spooferProducts = ["Temp Spoofer", "Perm Spoofer"]

  return (
    <div className="min-h-screen text-foreground">
      <main className="container mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Setup <span className="text-white">Guides</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Step-by-step instructions to get your Extra products up and running
          </p>
        </div>

        {/* Product Selector */}
        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-6 lg:gap-8">
          {/* Mobile Product Selector */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-full bg-black border border-zinc-800 rounded-lg p-4 flex items-center justify-between"
            >
              <span className="font-medium text-white">{selectedProduct}</span>
              <svg
                className={`h-5 w-5 text-green-500 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileMenuOpen && (
              <div className="mt-2 bg-black border border-zinc-800 rounded-lg p-3 space-y-4 max-h-[500px] overflow-y-auto">
                {/* Game Cheats Category */}
                <div>
                  <div className="flex items-center gap-2 mb-3 px-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Game Cheats</span>
                  </div>
                  <div className="space-y-1">
                    {gameProducts.map((product) => (
                      <button
                        key={product}
                        onClick={() => {
                          setSelectedProduct(product)
                          setMobileMenuOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm ${
                          selectedProduct === product
                            ? "bg-green-500/10 text-green-500 border border-green-500"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                        }`}
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                </div>

                {/* HWID Spoofers Category */}
                <div>
                  <div className="flex items-center gap-2 mb-3 px-2">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">HWID Spoofers</span>
                  </div>
                  <div className="space-y-1">
                    {spooferProducts.map((product) => (
                      <button
                        key={product}
                        onClick={() => {
                          setSelectedProduct(product)
                          setMobileMenuOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm ${
                          selectedProduct === product
                            ? "bg-green-500/10 text-green-500 border border-green-500"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                        }`}
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Product List */}
          <div className="hidden lg:block bg-black border border-zinc-800 rounded-lg p-5 h-fit sticky top-24 hover:border-zinc-700 transition-all duration-500">
            {/* Game Cheats Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Game Cheats</h3>
              </div>
              <div className="space-y-1.5">
                {gameProducts.map((product) => (
                  <button
                    key={product}
                    onClick={() => setSelectedProduct(product)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm ${
                      selectedProduct === product
                        ? "bg-green-500/10 text-green-500 border border-green-500"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                    }`}
                  >
                    {product}
                  </button>
                ))}
              </div>
            </div>

            {/* HWID Spoofers Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">HWID Spoofers</h3>
              </div>
              <div className="space-y-1.5">
                {spooferProducts.map((product) => (
                  <button
                    key={product}
                    onClick={() => setSelectedProduct(product)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm ${
                      selectedProduct === product
                        ? "bg-green-500/10 text-green-500 border border-green-500"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"
                    }`}
                  >
                    {product}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Setup Guide */}
          <div className="space-y-6 sm:space-8">
            {/* Locked State for All Products */}
            <div className="bg-black border border-zinc-800 rounded-xl p-8 text-center">
              {/* Lock Icon */}
              <div className="mb-6">
                <svg className="w-12 h-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>

              {/* Product Name */}
              <h2 className="text-2xl font-bold text-white mb-3">{selectedProduct}</h2>

              {/* Red Message */}
              <p className="text-red-500 font-medium mb-2">You will get setup + loader after purchasing</p>

              {/* Description */}
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">Complete setup instructions and the loader download link will be provided after your purchase is confirmed.</p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <Button className="bg-transparent border border-zinc-700 text-white hover:bg-zinc-800 px-6">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    View Products
                  </Button>
                </Link>
                <Link href="https://discord.gg/3fPNe8pUJG" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-zinc-800 text-white hover:bg-zinc-700 px-6">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
