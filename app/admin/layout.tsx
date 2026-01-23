"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingBag,
  Key,
  Ticket,
  Package,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  User
} from "lucide-react"
import { getStoredCredentials, clearCredentials } from "@/lib/admin-auth"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "License Keys", href: "/admin/keys", icon: Key },
  { name: "Coupons", href: "/admin/coupons", icon: Ticket },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuthenticated(true)
      return
    }
    const creds = getStoredCredentials()
    if (!creds) router.push("/admin/login")
    else setIsAuthenticated(true)
  }, [pathname, router])

  const handleLogout = () => {
    document.cookie = "kiba_admin_auth=; path=/; max-age=0"
    clearCredentials()
    router.push("/admin/login")
  }

  if (pathname === "/admin/login") return <>{children}</>

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black text-zinc-100 font-sans selection:bg-red-500/30">

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-400" />
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/20">
              <span className="font-bold text-white">K</span>
            </div>
            <span className="font-bold text-lg tracking-tight">Kiba<span className="text-red-500">Cheats</span></span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-zinc-900/50 border border-white/5 rounded-full px-4 py-1.5 focus-within:border-red-500/50 transition-colors">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-gray-600"
            />
          </div>
          <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors group">
            <Bell className="w-5 h-5 text-gray-400 group-hover:text-white" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/10 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-300" />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-black/80 backdrop-blur-md border-r border-white/5 transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full px-3 py-6 flex flex-col">
          <div className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Main Menu
          </div>
          <nav className="space-y-1 flex-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                    isActive
                      ? "text-white bg-white/5 border border-white/5"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-lg" />
                  )}
                  <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-red-500" : "text-gray-500 group-hover:text-gray-300")} />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto px-3 pt-4 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 min-h-screen">
        <div className="p-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/80 z-30 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}