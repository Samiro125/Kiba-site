import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SecurityProtection } from "@/components/security-protection"
import { AnimatedBackground } from "@/components/animated-background"
import { Toaster } from "@/components/ui/sonner"
import { CartProvider } from "@/components/cart-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KIBA CHEATS - Gaming Enhancement Software",
  description: "Empowering your gaming experience with high-quality gaming enhancements.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <CartProvider>
          <SecurityProtection />
          <AnimatedBackground />
          <SiteHeader />
          <div className="relative z-10">{children}</div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
