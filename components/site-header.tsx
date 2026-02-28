"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-zinc-950/95 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/90 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-24 items-center justify-between lg:grid lg:grid-cols-[260px_1fr_auto] lg:gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center transition-all hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.3)] duration-300">
              <Image
                src="/images/extra-cheats-logo.png"
                alt="Extra Services"
                width={65}
                height={65}
                className="h-16 w-auto"
                priority
              />
              <span className="ml-2 text-xl font-bold text-white tracking-wide">Extra Services</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-start">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className={`flex items-center justify-center gap-2 text-lg font-medium transition-all duration-300 w-[100px] relative group ${
                  pathname === "/" ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                <svg
                  className="h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Store
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
              <Link
                href="/guides"
                className={`flex items-center justify-center gap-2 text-lg font-medium transition-all duration-300 w-[100px] relative group ${
                  pathname === "/guides" ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                <svg
                  className="h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Guide
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${pathname === "/guides" ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
              <Link
                href="/reviews"
                className={`flex items-center justify-center gap-2 text-lg font-medium transition-all duration-300 w-[100px] relative group ${
                  pathname === "/reviews" ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                <svg
                  className="h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Reviews
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${pathname === "/reviews" ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
              <Link
                href="/status"
                className={`flex items-center justify-center gap-2 text-lg font-medium transition-all duration-300 w-[100px] relative group ${
                  pathname === "/status" ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                <svg
                  className="h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Status
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${pathname === "/status" ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
              <Link
                href="/faq"
                className={`flex items-center justify-center gap-2 text-lg font-medium transition-all duration-300 w-[100px] relative group ${
                  pathname === "/faq" ? "text-white" : "text-white/80 hover:text-white"
                }`}
              >
                <svg
                  className="h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                FAQ
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300 ${pathname === "/faq" ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            </div>
          </nav>

          {/* Desktop Discord Button */}
          <div className="hidden lg:flex items-center justify-end">
            <Link
              href="https://discord.gg/n42mcPBP6K"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md bg-[#5865F2] px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-[#4752C4] hover:scale-105 hover:shadow-lg hover:shadow-[#5865F2]/50"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="hidden xl:inline">Discord</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-white transition-all duration-300 hover:scale-110"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 animate-scale-in" />
            ) : (
              <Menu className="h-6 w-6 animate-scale-in" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 animate-slide-in-left">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  pathname === "/" ? "bg-white text-black" : "text-white/80 hover:bg-zinc-800"
                }`}
              >
                <svg
                  className="h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Store
              </Link>
              <Link
                href="/guides"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  pathname === "/guides" ? "bg-white text-black" : "text-white/80 hover:bg-zinc-800"
                }`}
              >
                <svg
                  className="h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                Guide
              </Link>
              <Link
                href="/reviews"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  pathname === "/reviews" ? "bg-white text-black" : "text-white/80 hover:bg-zinc-800"
                }`}
              >
                <svg
                  className="h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                Reviews
              </Link>
              <Link
                href="/status"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  pathname === "/status" ? "bg-white text-black" : "text-white/80 hover:bg-zinc-800"
                }`}
              >
                <svg
                  className="h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Status
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  pathname === "/faq" ? "bg-white text-black" : "text-white/80 hover:bg-zinc-800"
                }`}
              >
                <svg
                  className="h-6 w-6 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                FAQ
              </Link>
              <Link
                href="https://discord.gg/n42mcPBP6K"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-md bg-[#5865F2] text-white hover:bg-[#4752C4] transition-all duration-300"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Join Discord
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
