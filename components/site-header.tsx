"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-provider"

const navItems = [
  { name: "Home", href: "/", icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
  { name: "Products", href: "/products", icon: <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /> },
  { name: "Guide", href: "/guides", icon: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /> },
  { name: "Reviews", href: "/reviews", icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /> },
  { name: "Status", href: "/status", icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /> },
  { name: "FAQ", href: "/faq", icon: <circle cx="12" cy="12" r="10" /> },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-500/10 bg-black/40 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between lg:grid lg:grid-cols-[200px_minmax(0,1fr)_auto] lg:gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center transition-transform hover:scale-105 duration-300">
              <Image
                src="/logo-no-background.png"
                alt="Kiba Cheats"
                width={200}
                height={50}
                className="h-14 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 text-[15px] font-medium transition-all duration-300 relative group ${pathname === item.href ? "text-red-500" : "text-white/80 hover:text-red-500"
                    }`}
                >
                  <svg
                    className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                    {item.name === "Home" && <polyline points="9 22 9 12 15 12 15 22" />}
                    {item.name === "Products" && (
                      <>
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </>
                    )}
                    {item.name === "Guide" && <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />}
                    {item.name === "FAQ" && (
                      <>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </>
                    )}
                  </svg>
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 ${pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                  />
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Discord Button & Cart */}
          <div className="hidden lg:flex items-center justify-end gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-white hover:text-red-500 transition-all duration-300 group"
            >
              <ShoppingBag className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white ring-2 ring-black animate-in zoom-in duration-300">
                  {items.length}
                </span>
              )}
            </Link>
            <Link
              href="https://discord.com/invite/82r9zWz2EA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md bg-[#5865F2] px-4 py-2 text-[14px] font-medium text-white transition-all duration-300 hover:bg-[#4752C4] hover:scale-105 hover:shadow-lg hover:shadow-[#5865F2]/50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="hidden xl:inline">Discord</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-white hover:text-red-500 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 py-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${pathname === item.href ? "bg-red-600 text-white" : "text-white/80 hover:bg-zinc-800"
                    }`}
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                  </svg>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
