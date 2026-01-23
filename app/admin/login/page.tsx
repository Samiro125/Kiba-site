"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Lock, User, Eye, EyeOff } from "lucide-react"
import { storeCredentials } from "@/lib/admin-auth"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Create auth cookie value
      const authValue = Buffer.from(`${username}:${password}`).toString("base64")

      // Set cookie
      document.cookie = `kiba_admin_auth=${authValue}; path=/; max-age=86400; SameSite=Strict`

      // Test the credentials by making a request
      const response = await fetch("/api/admin/stats")

      if (response.ok) {
        // Store credentials in sessionStorage as backup
        storeCredentials({ username, password })
        // Redirect to dashboard
        router.push("/admin/dashboard")
      } else {
        // Clear cookie if auth failed
        document.cookie = "kiba_admin_auth=; path=/; max-age=0"
        setError("Invalid username or password")
      }
    } catch (err) {
      document.cookie = "kiba_admin_auth=; path=/; max-age=0"
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setUsername("admin")
    setPassword("admin")
    // Auto-submit after a brief delay
    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement
      if (form) {
        form.requestSubmit()
      }
    }, 100)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-zinc-950/90 backdrop-blur-xl border-red-500/20 shadow-2xl shadow-red-500/10">
          <CardHeader className="space-y-6 pb-8">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
                <Image
                  src="/logo-no-background.png"
                  alt="Kiba Cheats"
                  width={200}
                  height={50}
                  className="relative"
                />
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
              <p className="text-gray-400">Sign in to manage your store</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="pl-10 bg-black/50 border-red-500/30 text-white h-12"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="pl-10 pr-10 bg-black/50 border-red-500/30 text-white h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold h-12 text-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/30"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Demo Login */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-red-500/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-950 text-gray-400">
                  Quick Access
                </span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleDemoLogin}
              variant="outline"
              className="w-full border-red-500/50 hover:bg-red-500/10 text-red-400 h-12"
            >
              Use Demo Credentials
            </Button>

            {/* Info */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm text-red-300 text-center">
                <strong>Demo Login:</strong> admin / admin
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Store
          </a>
        </div>
      </div>
    </div>
  )
}
