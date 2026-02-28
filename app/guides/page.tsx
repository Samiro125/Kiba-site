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
    "Arc Raiders Delta",
    "Arc Raiders Flo",
  ]

  const spooferProducts = ["Temp Spoofer", "Perm Spoofer"]

  return (
    <div className="min-h-screen text-foreground">
      <main className="container mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Setup <span className="text-red-500">Guides</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
            Step-by-step instructions to get your KIBA products up and running
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
            {/* Conditional rendering for Temp Spoofer specific guide */}
            {selectedProduct === "Temp Spoofer" ? (
              <>
                {/* Temp Spoofer Header */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6 hover:border-red-500/40 transition-all duration-500 hover:shadow-lg hover:shadow-red-500/10 animate-fade-in">
                  <h2 className="text-2xl font-bold text-white mb-2">Temp Spoofer</h2>
                  <p className="text-zinc-400">Hardware ID Spoofing Tool</p>
                </div>

                {/* Warning Banner */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <svg
                      className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-500 mb-2">System Modification Warning</h3>
                      <p className="text-zinc-300">
                        HWID spoofing modifies system files. Create a restore point before proceeding.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Temporary Spoofing Info */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Temporary Spoofing</h3>
                  <p className="text-zinc-400 mb-6">Changes reset on reboot - ideal for testing or temporary use</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-green-500 font-bold mb-3 flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Advantages
                      </h4>
                      <ul className="space-y-2 text-zinc-300">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>No permanent system modifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>Automatic revert on restart</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>Lower risk for beginners</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-yellow-500 font-bold mb-3 flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Considerations
                      </h4>
                      <ul className="space-y-2 text-zinc-300">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>Must re-run after each reboot</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>Less thorough coverage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>Not suitable for active bans</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 1 - Install Dependencies */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Install Dependencies</h3>
                      <p className="text-zinc-400 mb-4">Required system components</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">Download and install Visual C++ and DirectX runtimes.</p>
                        <div className="flex gap-3">
                          <Link href="https://gofile.io/d/0aJutp" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Visual C++
                            </Button>
                          </Link>
                          <Link href="https://gofile.io/d/Purzbq" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              DirectX
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Disable Protection */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Disable Protection</h3>
                      <p className="text-zinc-400 mb-4">Temporarily disable security software</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-2">
                          Disable Windows Defender and all third-party antivirus programs before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 - Run Spoofer */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Run Spoofer</h3>
                      <p className="text-zinc-400 mb-4">Execute with administrator privileges</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">
                          Launch as administrator, enter license key, and select target game from the menu.
                        </p>
                        {/* CHANGE> Updated temp spoofer download link */}
                        <Link href="https://gofile.io/d/83mVvQ" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-red-600 hover:bg-red-700 text-white">
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download Spoofer
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 - Verify Changes */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Verify Changes</h3>
                      <p className="text-zinc-400 mb-4">Confirm hardware ID modification</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-2">
                          Verify that serial numbers have changed, then launch your game normally.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-green-500">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium">Serial numbers successfully changed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Common Issues */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Common Issues
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">ERROR 246: HWID error</h3>
                      <p className="text-zinc-400">Open support ticket for HWID reset</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">ERROR 2: Login error</h3>
                      <p className="text-zinc-400">Configure DNS to 1.1.1.1 (Cloudflare) and retry</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">Serials not changing</h3>
                      <p className="text-zinc-400">Ensure Windows version is between 10 22H2 and 11 23H2</p>
                    </div>
                  </div>
                </div>
              </>
            ) : selectedProduct === "Perm Spoofer" ? (
              <>
                {/* Perm Spoofer Header */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Perm Spoofer</h2>
                  <p className="text-zinc-400">Hardware ID Spoofing Tool</p>
                </div>

                {/* Warning Banner */}
                <div className="bg-red-950/30 border-2 border-red-500 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <svg
                      className="h-8 w-8 text-red-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-xl font-bold text-red-500 mb-2">System Modification Warning</h3>
                      <p className="text-white">
                        HWID spoofing modifies system files. Create a restore point before proceeding.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Permanent Spoofing Info */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">Permanent Spoofing</h3>
                  <p className="text-zinc-400 mb-6">
                    Persistent changes that survive reboots - recommended for active users
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Advantages */}
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-green-500 mb-4">Advantages</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-zinc-300">
                          <svg
                            className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Survives system restarts
                        </li>
                        <li className="flex items-start gap-3 text-zinc-300">
                          <svg
                            className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          More comprehensive protection
                        </li>
                        <li className="flex items-start gap-3 text-zinc-300">
                          <svg
                            className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Better for long-term use
                        </li>
                      </ul>
                    </div>

                    {/* Considerations */}
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-6">
                      <h4 className="text-lg font-bold text-yellow-500 mb-4">Considerations</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-zinc-300">
                          <svg
                            className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          Permanent system changes
                        </li>
                        <li className="flex items-start gap-3 text-zinc-300">
                          <svg
                            className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          Manual revert required
                        </li>
                        <li className="flex items-start gap-3 text-zinc-300">
                          <svg
                            className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          More complex setup process
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 1 */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Install Dependencies</h3>
                      <p className="text-zinc-400 mb-4">Required system components</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">Download and install Visual C++ and DirectX runtimes.</p>
                        <div className="flex gap-4">
                          <Link href="https://gofile.io/d/0aJutp" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Visual C++
                            </Button>
                          </Link>
                          <Link href="https://gofile.io/d/Purzbq" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              DirectX
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Disable Protection</h3>
                      <p className="text-zinc-400 mb-4">Temporarily disable security software</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-2">
                          Disable Windows Defender and all third-party antivirus programs before proceeding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Run Spoofer</h3>
                      <p className="text-zinc-400 mb-4">Execute with administrator privileges</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">
                          Launch as administrator, enter license key, and select target game from the menu.
                        </p>
                        <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                          <a href="https://gofile.io/d/1F4bMf" target="_blank" rel="noopener noreferrer">
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download Spoofer
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Verify Changes</h3>
                      <p className="text-zinc-400 mb-4">Confirm hardware ID modification</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-2">
                          Verify that serial numbers have changed, then launch your game normally.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-green-500">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium">Verify serial changes before gaming</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Common Issues */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Common Issues
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">ERROR 246: HWID error</h3>
                      <p className="text-zinc-400">Open support ticket for HWID reset</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">ERROR 2: Login error</h3>
                      <p className="text-zinc-400">Configure DNS to 1.1.1.1 (Cloudflare) and retry</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">Serials not changing</h3>
                      <p className="text-zinc-400">Ensure Windows version is between 10 22H2 and 11 23H2</p>
                    </div>
                  </div>
                </div>
              </>
            ) : selectedProduct === "Fortnite" ? (
              <>
                {/* Fortnite Header */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Fortnite Ultimate</h2>
                  <p className="text-zinc-400">How to download and set up FN public</p>
                </div>

                {/* Prerequisites Section */}
                <div className="bg-zinc-900 border border-yellow-500/30 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    Prerequisites Installation
                  </h2>
                  <p className="text-zinc-400">Complete these steps in order before proceeding to cheat setup</p>
                </div>

                {/* Step 1 - DirectX SDK */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">DirectX SDK Installation</h3>
                      <p className="text-zinc-400 mb-4">Install Microsoft DirectX SDK</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2 text-white">
                          <li>Download DirectX SDK from the link below</li>
                          <li>Run the installer and follow the installation wizard</li>
                          <li>Wait for installation to complete before proceeding</li>
                        </ol>
                        <div className="mt-4">
                          <Link
                            href="https://download.microsoft.com/download/a/e/7/ae743f1f-632b-4809-87a9-aa1bb3458e31/DXSDK_Jun10.exe"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download DirectX SDK
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Visual C++ */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Visual C++ Redistributable</h3>
                      <p className="text-zinc-400 mb-4">Install VC++ Redistributable package</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2 text-white">
                          <li>Download VC++ Redistributable from the link below</li>
                          <li>Install the package</li>
                          <li>Complete this step after DirectX SDK installation</li>
                        </ol>
                        <div className="mt-4">
                          <Link
                            href="https://aka.ms/vs/17/release/vc_redist.x64.exe"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download VC++ Redistributable
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 - Action Recorder */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Action Recorder Installation</h3>
                      <p className="text-zinc-400 mb-4">Install Mirillis Action Recorder</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2 text-white">
                          <li>Download Action Recorder from the link below</li>
                          <li>Install the application</li>
                        </ol>
                        <div className="mt-4">
                          <Link href="https://mirillis.com/download-action" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download Action Recorder
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 - Antivirus Disabler */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Disable Antivirus</h3>
                      <p className="text-zinc-400 mb-4">Temporarily disable Windows Defender</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2 text-white">
                          <li>Download Sordum Defender Control from the link below</li>
                          <li>Run the tool to disable Windows Defender temporarily</li>
                        </ol>
                        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                          <p className="text-sm text-yellow-500">
                            ⚠️ <span className="font-bold">Warning:</span> Always disable antivirus before injection
                          </p>
                        </div>
                        <div className="mt-4">
                          <Link
                            href="https://www.sordum.org/downloads/?st-defender-control"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download Defender Control
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cheat Setup Section Header */}
                <div className="bg-zinc-900 border border-green-500/30 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Cheat Setup Process
                  </h2>
                  <p className="text-zinc-400">Now proceed with the cheat installation</p>
                </div>

                {/* Step 5 - Loader Installation */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Loader Installation & Activation</h3>
                      <p className="text-zinc-400 mb-4">Download and activate the cheat loader</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2 text-white">
                          <li>Download and install the cheat loader</li>
                          <li>Launch the loader application</li>
                          <li>Enter your activation key</li>
                          <li>
                            Click <span className="text-red-500 font-bold">INJECT</span> to inject the cheat
                          </li>
                        </ol>
                        <div className="mt-4">
                          <Link href="https://telegra.ph/KIBA-FAQ-EU-02-19-2" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                              Open Setup Guide
                            </Button>
                          </Link>
                          <Link href="https://telegra.ph/START-02-19-46" target="_blank" rel="noopener noreferrer" className="ml-3">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download Loader
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6 - Verification */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Verification</h3>
                      <p className="text-zinc-400 mb-4">Confirm successful injection</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">
                          When you see the system application launch with a message box, the cheat has been successfully
                          injected
                        </p>
                        <div className="bg-zinc-950 border border-zinc-700 rounded p-3 space-y-2">
                          <p className="text-white">Controller Configuration:</p>
                          <ul className="list-disc list-inside space-y-1 text-zinc-400 text-sm">
                            <li>
                              Click <span className="text-red-500 font-bold">NO</span> if you're not using a controller
                            </li>
                            <li>
                              Click <span className="text-green-500 font-bold">YES</span> if you're using a controller
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Launch & Usage Section Header */}
                <div className="bg-zinc-900 border border-blue-500/30 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-blue-500 mb-4 flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Game Launch & Usage
                  </h2>
                  <p className="text-zinc-400">Final steps to start playing</p>
                </div>

                {/* Step 7 - Final Steps */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      7
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Final Steps</h3>
                      <p className="text-zinc-400 mb-4">Launch the game</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2 text-white">
                          <li>Launch Action Recorder</li>
                          <li>Start your game</li>
                          <li>
                            Click <span className="text-green-500 font-bold">OK</span> when you reach the lobby
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 8 - Menu Controls */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      8
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Menu Controls</h3>
                      <p className="text-zinc-400 mb-4">How to access the cheat menu</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <div className="bg-zinc-950 border border-zinc-700 rounded p-4">
                          <p className="text-white mb-2">Open/Close Menu:</p>
                          <p className="text-zinc-400">
                            Press <span className="bg-zinc-800 text-white px-2 py-1 rounded font-mono">INSERT</span> or{" "}
                            <span className="bg-zinc-800 text-white px-2 py-1 rounded font-mono">F1</span> key
                          </p>
                        </div>
                        <div className="mt-4 bg-zinc-950 border border-zinc-700 rounded p-3">
                          <p className="text-sm text-zinc-400">
                            💡 <span className="text-white">Tip:</span> Use these keys to toggle the cheat menu during
                            gameplay
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-zinc-900 border border-yellow-500/30 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Important Notes
                  </h2>
                  <div className="space-y-3">
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex items-start gap-3">
                      <span className="text-yellow-500">⚠️</span>
                      <p className="text-zinc-300">Always disable antivirus before injection</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex items-start gap-3">
                      <span className="text-yellow-500">⚠️</span>
                      <p className="text-zinc-300">Follow the installation order strictly</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex items-start gap-3">
                      <span className="text-yellow-500">⚠️</span>
                      <p className="text-zinc-300">Make sure all prerequisites are installed before using the loader</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex items-start gap-3">
                      <span className="text-yellow-500">⚠️</span>
                      <p className="text-zinc-300">Keep Action Recorder running while playing</p>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-bold text-green-500 mb-2">You're all set!</h2>
                  <p className="text-zinc-400">Enjoy your gaming experience!</p>
                </div>
              </>
            ) : selectedProduct === "Arc Raiders Delta" ? (
              <>
                {/* Arc Raiders Delta Guide Header */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Arc Raiders Delta</h2>
                      <p className="text-zinc-400">Premium Safe Option - Maximum Security</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-500/10 border border-green-500 rounded-lg p-4 flex items-start gap-3">
                  <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-green-400 font-semibold mb-1">Recommended Option</p>
                    <p className="text-zinc-300 text-sm">Arc Raiders Delta provides maximum safety and premium features. Follow the full setup documentation for best results.</p>
                  </div>
                </div>

                {/* Step 1 - Full Setup Docs */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">1</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Follow the Full Setup Guide</h3>
                      <p className="text-zinc-400 mb-4">Complete setup instructions are available in our documentation</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">Click the button below to access the complete Arc Raiders Delta setup guide with all required steps.</p>
                        <Link href="https://telegra.ph/KIBA-FAQ-EU-02-19-2" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Open Full Setup Documentation
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Download Loader */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">2</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Download Delta Loader</h3>
                      <p className="text-zinc-400 mb-4">Get the loader after completing the setup steps</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">Download the Delta loader from MEGA after following the setup guide.</p>
                        <Link href="https://telegra.ph/START-02-19-46" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-red-600 hover:bg-red-700 text-white">
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Delta Loader
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Section */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Need Help?
                  </h2>
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                    <p className="text-zinc-300 mb-4">If you encounter any issues, join our Discord for support.</p>
                    <Link href="https://discord.gg/n42mcPBP6K" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                        Join Discord Support
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            ) : selectedProduct === "Arc Raiders Flo" ? (
              <>
                {/* Arc Raiders Flo Guide Header */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Arc Raiders Flo</h2>
                  <p className="text-zinc-400">Budget Cheat Option - External Software</p>
                </div>

                {/* Warning Banner */}
                <div className="bg-yellow-500/10 border border-yellow-500 rounded-lg p-4 flex items-start gap-3">
                  <svg className="h-6 w-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-yellow-400 font-semibold mb-1">System Configuration Required</p>
                    <p className="text-zinc-300 text-sm">This setup requires multiple system modifications including TPM, HVCI, and UAC changes. Follow all steps carefully.</p>
                  </div>
                </div>

                {/* Step 1 - Visual C++ */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">1</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Install Visual C++ Runtimes</h3>
                      <p className="text-zinc-400 mb-4">Download and install all Visual C++ redistributable packages</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">Install the All-in-One Visual C++ Runtime Package to ensure all required dependencies are available.</p>
                        <Link href="https://www.techpowerup.com/download/visual-c-redistributable-runtime-package-all-in-one/" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-red-600 hover:bg-red-700 text-white">
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Visual C++ All-in-One
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Defender Control */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">2</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Disable Windows Defender</h3>
                      <p className="text-zinc-400 mb-4">Use Defender Control to permanently disable Windows Defender</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">Download and use Sordum Defender Control to disable Windows Defender protection.</p>
                        <Link href="https://www.sordum.org/9480/defender-control-v2-1/#google_vignette" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-red-600 hover:bg-red-700 text-white">
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Defender Control
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 - OpenSSL */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Install OpenSSL</h3>
                      <p className="text-zinc-400 mb-4">Download and install OpenSSL for Windows</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">Install OpenSSL 3.6.0 for 64-bit Windows systems.</p>
                        <Link
                          href="https://slproweb.com/download/Win64OpenSSL-3_6_0.exe"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button className="bg-red-600 hover:bg-red-700 text-white">
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download OpenSSL 3.6.0
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Disable UAC</h3>
                      <p className="text-zinc-400 mb-4">Turn off User Account Control</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-2">
                          Disable User Account Control (UAC) to prevent security prompts:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-zinc-300">
                          <li>Open Control Panel → System and Security → Security and Maintenance</li>
                          <li>Click "Change User Account Control settings"</li>
                          <li>Move the slider to "Never notify"</li>
                          <li>Click OK and restart your computer</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Change PC Settings</h3>
                      <p className="text-zinc-400 mb-4">Disable TPM, HVCI, and security features</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 space-y-4">
                        <div>
                          <h4 className="text-white font-semibold mb-2">TPM (Trusted Platform Module)</h4>
                          <p className="text-zinc-300 mb-2">Switch off TPM in your computer's BIOS/UEFI settings:</p>
                          <ol className="list-decimal list-inside space-y-1 text-zinc-400 text-sm">
                            <li>Restart your PC and enter BIOS (usually DEL, F2, or F12)</li>
                            <li>Navigate to Security settings</li>
                            <li>Find TPM/Security Device and disable it</li>
                            <li>Save and exit BIOS</li>
                          </ol>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">HVCI / Core Isolation</h4>
                          <p className="text-zinc-300 mb-2">Disable from Windows Security:</p>
                          <ol className="list-decimal list-inside space-y-1 text-zinc-400 text-sm">
                            <li>Open Windows Security</li>
                            <li>Go to Device Security → Core isolation details</li>
                            <li>Turn off Memory integrity</li>
                            <li>Restart your computer</li>
                          </ol>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold mb-2">Windows Defender</h4>
                          <p className="text-zinc-300">Turn off Real-Time Protection and any third-party antivirus.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Install HudSight Overlay</h3>
                      <p className="text-zinc-400 mb-4">Download and configure HudSight for the cheat overlay</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">
                          Visit HudSight website and install the overlay software. We'll configure this more in Step 8.
                        </p>
                        <Link href="https://hudsight.com/" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-red-600 hover:bg-red-700 text-white">
                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download HudSight
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      7
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Download and Run Loader</h3>
                      <p className="text-zinc-400 mb-4">Get your loader and authenticate with your license key</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 space-y-4">
                        <div>
                          <p className="text-white mb-2">1. Download the loader from the link below</p>
                          <p className="text-white mb-2">2. Enter your license key on the download page</p>
                          <p className="text-white mb-4">3. Click Download to get the loader</p>
                          <Link
                            href="https://gofile.io/d/ZOBu68"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                              Download Flo Loader
                            </Button>
                          </Link>
                        </div>
                        <div className="bg-zinc-950 border border-zinc-700 rounded p-3">
                          <p className="text-white mb-2">Run the Loader:</p>
                          <ul className="list-disc list-inside space-y-1 text-zinc-400 text-sm">
                            <li>Right-click the loader file</li>
                            <li>Choose "Run as Administrator"</li>
                            <li>Enter your license key when prompted</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 8 */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      8
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Configure HudSight Overlay</h3>
                      <p className="text-zinc-400 mb-4">Set up the overlay for optimal performance</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2 text-white">
                          <li>Open HudSight (if not already running)</li>
                          <li>Ensure "Real Overlay" mode is ON</li>
                          <li>Run HudSight as Administrator for best compatibility</li>
                        </ol>
                        <div className="mt-4 bg-zinc-950 border border-zinc-700 rounded p-3">
                          <p className="text-sm text-zinc-400">
                            💡 <span className="text-white">Tip:</span> Keep HudSight running in the background while
                            using the cheat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Troubleshooting */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Common Issues
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">ERROR 246: HWID error</h3>
                      <p className="text-zinc-400">Open support ticket for HWID reset</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">ERROR 2: Login error</h3>
                      <p className="text-zinc-400">Configure DNS to 1.1.1.1 (Cloudflare) and retry</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                      <h3 className="text-white font-bold mb-2">Serials not changing</h3>
                      <p className="text-zinc-400">Ensure Windows version is between 10 22H2 and 11 23H2</p>
                    </div>
                  </div>
                </div>
              </>
            ) : selectedProduct === "Arc Raiders Flo" ? (
              <>
                {/* Arc Raiders Flo Guide Header */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Arc Raiders Flo</h2>
                  <p className="text-zinc-400">Budget Cheat Option - External Software</p>
                </div>

                {/* Warning Banner */}
                <div className="bg-yellow-500/10 border border-yellow-500 rounded-lg p-4 flex items-start gap-3">
                  <svg className="h-6 w-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-yellow-400 font-semibold mb-1">Budget Option</p>
                    <p className="text-zinc-300 text-sm">Arc Raiders Flo is a more affordable option. For maximum safety and features, consider Arc Raiders Delta.</p>
                  </div>
                </div>

                {/* Step 1 - Disable Antivirus */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">1</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Disable Antivirus</h3>
                      <p className="text-zinc-400 mb-4">Turn off Windows Defender and any third-party antivirus software</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2 text-white">
                          <li>Open Windows Security</li>
                          <li>Go to Virus & threat protection</li>
                          <li>Click "Manage settings"</li>
                          <li>Turn off Real-time protection</li>
                          <li>Disable any third-party antivirus</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Download and Run Loader */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">2</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Download and Run Loader</h3>
                      <p className="text-zinc-400 mb-4">Get your loader and authenticate with your license key</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 space-y-4">
                        <div>
                          <p className="text-white mb-2">1. Download the loader from the link below</p>
                          <p className="text-white mb-2">2. Extract the files to a folder</p>
                          <p className="text-white mb-4">3. Run the loader as Administrator</p>
                          <Link href="https://gofile.io/d/ZOBu68" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download Flo Loader
                            </Button>
                          </Link>
                        </div>
                        <div className="bg-zinc-950 border border-zinc-700 rounded p-3">
                          <p className="text-white mb-2">Run the Loader:</p>
                          <ul className="list-disc list-inside space-y-1 text-zinc-400 text-sm">
                            <li>Right-click the loader file</li>
                            <li>Choose "Run as Administrator"</li>
                            <li>Enter your license key when prompted</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 - Launch Game */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">3</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Launch Arc Raiders</h3>
                      <p className="text-zinc-400 mb-4">Start the game after the loader is ready</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2 text-white">
                          <li>Wait for the loader to show "Ready" or "Injected"</li>
                          <li>Launch Arc Raiders from Steam/Epic</li>
                          <li>Enter a match to see the cheat menu</li>
                        </ol>
                        <div className="mt-4 bg-zinc-950 border border-zinc-700 rounded p-3">
                          <p className="text-sm text-zinc-400">
                            <span className="text-white">Tip:</span> Press INSERT to open/close the cheat menu in-game.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Section */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Need Help?
                  </h2>
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                    <p className="text-zinc-300 mb-4">If you encounter any issues, join our Discord for support.</p>
                    <Link href="https://discord.gg/n42mcPBP6K" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                        Join Discord Support
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            ) : selectedProduct === "Rust" ? (
              <>
                {/* Rust Guide Header */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Rust Cheat</h2>
                  <p className="text-zinc-400">External Cheat Software</p>
                </div>

                {/* Step 1 - Visit Instructions Page */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Visit Instructions Page</h3>
                      <p className="text-zinc-400 mb-4">Access the full setup guide</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">
                          Click the button below to access the complete Rust setup instructions.
                        </p>
                        <Link href="https://telegra.ph/KIBA-FAQ-EU-02-19-2" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-red-600 hover:bg-red-700 text-white">
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            View Setup Instructions
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Download Loader */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Download Loader</h3>
                      <p className="text-zinc-400 mb-4">Get the Rust loader</p>
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                        <p className="text-white mb-4">
                          Download the loader from the link below and follow the instructions from step 1.
                        </p>
                        <Link href="https://telegra.ph/START-02-19-46" target="_blank" rel="noopener noreferrer">
                          <Button className="bg-red-600 hover:bg-red-700 text-white">
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                            Download Loader
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Section */}
                <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Need Help?
                  </h2>
                  <p className="text-zinc-400 mb-4">
                    If you encounter any issues during setup, please contact our support team on Discord.
                  </p>
                  <Link href="https://discord.gg/n42mcPBP6K" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
                      </svg>
                      Join Discord
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Default Guide - Fortnite Example */}
                {selectedProduct === "Fortnite" ? (
                  <>
                    {/* Fortnite Header */}
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6">
                      <h2 className="text-2xl font-bold text-white mb-2">Fortnite Ultimate</h2>
                      <p className="text-zinc-400">How to download and set up FN public</p>
                    </div>

                    {/* Prerequisites Section */}
                    <div className="bg-zinc-900 border border-yellow-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        Prerequisites Installation
                      </h2>
                      <p className="text-zinc-400">Complete these steps in order before proceeding to cheat setup</p>
                    </div>

                    {/* Step 1 - DirectX SDK */}
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          1
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">DirectX SDK Installation</h3>
                          <p className="text-zinc-400 mb-4">Install Microsoft DirectX SDK</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <ol className="list-decimal list-inside space-y-2 text-white">
                              <li>Download DirectX SDK from the link below</li>
                              <li>Run the installer and follow the installation wizard</li>
                              <li>Wait for installation to complete before proceeding</li>
                            </ol>
                            <div className="mt-4">
                              <Link
                                href="https://download.microsoft.com/download/a/e/7/ae743f1f-632b-4809-87a9-aa1bb3458e31/DXSDK_Jun10.exe"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button className="bg-red-600 hover:bg-red-700 text-white">
                                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                  </svg>
                                  Download DirectX SDK
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 2 - Visual C++ */}
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          2
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">Visual C++ Redistributable</h3>
                          <p className="text-zinc-400 mb-4">Install VC++ Redistributable package</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <ol className="list-decimal list-inside space-y-2 text-white">
                              <li>Download VC++ Redistributable from the link below</li>
                              <li>Install the package</li>
                              <li>Complete this step after DirectX SDK installation</li>
                            </ol>
                            <div className="mt-4">
                              <Link
                                href="https://aka.ms/vs/17/release/vc_redist.x64.exe"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button className="bg-red-600 hover:bg-red-700 text-white">
                                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                  </svg>
                                  Download VC++ Redistributable
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 3 - Action Recorder */}
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          3
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">Action Recorder Installation</h3>
                          <p className="text-zinc-400 mb-4">Install Mirillis Action Recorder</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <ol className="list-decimal list-inside space-y-2 text-white">
                              <li>Download Action Recorder from the link below</li>
                              <li>Install the application</li>
                            </ol>
                            <div className="mt-4">
                              <Link
                                href="https://mirillis.com/download-action"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button className="bg-red-600 hover:bg-red-700 text-white">
                                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                  </svg>
                                  Download Action Recorder
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 4 - Antivirus Disabler */}
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          4
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">Disable Antivirus</h3>
                          <p className="text-zinc-400 mb-4">Temporarily disable Windows Defender</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <ol className="list-decimal list-inside space-y-2 text-white">
                              <li>Download Sordum Defender Control from the link below</li>
                              <li>Run the tool to disable Windows Defender temporarily</li>
                            </ol>
                            <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded p-3">
                              <p className="text-sm text-yellow-500">
                                ⚠️ <span className="font-bold">Warning:</span> Always disable antivirus before injection
                              </p>
                            </div>
                            <div className="mt-4">
                              <Link
                                href="https://www.sordum.org/downloads/?st-defender-control"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button className="bg-red-600 hover:bg-red-700 text-white">
                                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                  </svg>
                                  Download Defender Control
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cheat Setup Section Header */}
                    <div className="bg-zinc-900 border border-green-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Cheat Setup Process
                      </h2>
                      <p className="text-zinc-400">Now proceed with the cheat installation</p>
                    </div>

                    {/* Step 5 - Loader Installation */}
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          5
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">Loader Installation & Activation</h3>
                          <p className="text-zinc-400 mb-4">Download and activate the cheat loader</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <ol className="list-decimal list-inside space-y-2 text-white">
                              <li>Download and install the cheat loader</li>
                              <li>Launch the loader application</li>
                              <li>Enter your activation key</li>
                              <li>
                                Click <span className="text-red-500 font-bold">INJECT</span> to inject the cheat
                              </li>
                            </ol>
                            <div className="mt-4">
                              <Link href="https://justaloader.xyz/" target="_blank" rel="noopener noreferrer">
                                <Button className="bg-red-600 hover:bg-red-700 text-white">
                                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                  </svg>
                                  Download Apex Loader
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 6 - Verification */}
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          6
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">Verification</h3>
                          <p className="text-zinc-400 mb-4">Confirm successful injection</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <p className="text-white mb-4">
                              When you see the system application launch with a message box, the cheat has been
                              successfully injected
                            </p>
                            <div className="bg-zinc-950 border border-zinc-700 rounded p-3 space-y-2">
                              <p className="text-white">Controller Configuration:</p>
                              <ul className="list-disc list-inside space-y-1 text-zinc-400 text-sm">
                                <li>
                                  Click <span className="text-red-500 font-bold">NO</span> if you're not using a
                                  controller
                                </li>
                                <li>
                                  Click <span className="text-green-500 font-bold">YES</span> if you're using a
                                  controller
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Game Launch & Usage Section Header */}
                    <div className="bg-zinc-900 border border-blue-500/30 rounded-lg p-6">
                      <h2 className="text-xl font-bold text-blue-500 mb-4 flex items-center gap-2">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Game Launch & Usage
                      </h2>
                      <p className="text-zinc-400">Final steps to start playing</p>
                    </div>

                    {/* Step 7 - Final Steps */}
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          7
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">Final Steps</h3>
                          <p className="text-zinc-400 mb-4">Launch the game</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <ol className="list-decimal list-inside space-y-2 text-white">
                              <li>Launch Action Recorder</li>
                              <li>Start your game</li>
                              <li>
                                Click <span className="text-green-500 font-bold">OK</span> when you reach the lobby
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 8 - Menu Controls */}
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                          8
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">Menu Controls</h3>
                          <p className="text-zinc-400 mb-4">How to access the cheat menu</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <div className="bg-zinc-950 border border-zinc-700 rounded p-4">
                              <p className="text-white mb-2">Open/Close Menu:</p>
                              <p className="text-zinc-400">
                                Press <span className="bg-zinc-800 text-white px-2 py-1 rounded font-mono">INSERT</span>{" "}
                                or <span className="bg-zinc-800 text-white px-2 py-1 rounded font-mono">F1</span> key
                              </p>
                            </div>
                            <div className="mt-4 bg-zinc-950 border border-zinc-700 rounded p-3">
                              <p className="text-sm text-zinc-400">
                                💡 <span className="text-white">Tip:</span> Use these keys to toggle the cheat menu
                                during gameplay
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-zinc-900 border border-yellow-500/30 rounded-lg p-8">
                      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        Important Notes
                      </h2>
                      <div className="space-y-3">
                        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex items-start gap-3">
                          <span className="text-yellow-500">⚠️</span>
                          <p className="text-zinc-300">Always disable antivirus before injection</p>
                        </div>
                        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex items-start gap-3">
                          <span className="text-yellow-500">⚠️</span>
                          <p className="text-zinc-300">Follow the installation order strictly</p>
                        </div>
                        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex items-start gap-3">
                          <span className="text-yellow-500">⚠️</span>
                          <p className="text-zinc-300">
                            Make sure all prerequisites are installed before using the loader
                          </p>
                        </div>
                        <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 flex items-start gap-3">
                          <span className="text-yellow-500">⚠️</span>
                          <p className="text-zinc-300">Keep Action Recorder running while playing</p>
                        </div>
                      </div>
                    </div>

                    {/* Success Message */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                      <h2 className="text-2xl font-bold text-green-500 mb-2">You're all set!</h2>
                      <p className="text-zinc-400">Enjoy your gaming experience!</p>
                    </div>
                  </>
                ) : selectedProduct === "Rainbow Six Siege" ? (
                  <>
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6">
                      <h2 className="text-2xl font-bold text-white mb-2">Rainbow Six Siege</h2>
                      <p className="text-zinc-400">How to download and set up R6 Siege cheat</p>
                    </div>
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">1</div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">Follow the Full Setup Guide</h3>
                          <p className="text-zinc-400 mb-4">Complete setup instructions are available in our documentation</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <p className="text-white mb-4">Click the button below to access the complete Rainbow Six Siege setup guide.</p>
                            <Link href="https://telegra.ph/KIBA-FAQ-EU-02-19-2" target="_blank" rel="noopener noreferrer">
                              <Button className="bg-green-600 hover:bg-green-700 text-white">
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Open Full Setup Documentation
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">2</div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">Download Loader</h3>
                          <p className="text-zinc-400 mb-4">Get the loader after completing the setup steps</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <p className="text-white mb-4">Download the loader after following the setup guide.</p>
                            <Link href="https://telegra.ph/START-02-19-46" target="_blank" rel="noopener noreferrer">
                              <Button className="bg-red-600 hover:bg-red-700 text-white">
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Loader
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : selectedProduct === "Valorant" ? (
                  <>
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-6">
                      <h2 className="text-2xl font-bold text-white mb-2">Valorant</h2>
                      <p className="text-zinc-400">How to download and set up Valorant cheat</p>
                    </div>
                    <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-red-600 text-white font-bold text-xl rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">1</div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-2">Download Loader</h3>
                          <p className="text-zinc-400 mb-4">Get the Valorant loader</p>
                          <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-4">
                            <p className="text-white mb-4">Click the button below to download the Valorant loader.</p>
                            <Link href="https://guide.sys-info.xyz/elevate" target="_blank" rel="noopener noreferrer">
                              <Button className="bg-red-600 hover:bg-red-700 text-white">
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Valorant Loader
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-zinc-900 border border-red-500/20 rounded-lg p-8 text-center">
                    <div className="mb-6">
                      <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <h2 className="text-2xl font-bold text-white mb-3">{selectedProduct}</h2>
                      <p className="text-xl text-red-400 font-semibold mb-2">You will get setup + loader after purchasing</p>
                      <p className="text-zinc-400">Complete setup instructions and the loader download link will be provided after your purchase is confirmed.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/products" rel="noopener noreferrer">
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          View Products
                        </Button>
                      </Link>
                      <Link href="https://discord.gg/n42mcPBP6K" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 bg-transparent">
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                          Contact Support
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
