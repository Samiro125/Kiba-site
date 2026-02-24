import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"

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
    <html lang="en">
      <body className={inter.className}>
        {/* Animated Gradient Mesh Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent animate-gradient-shift" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent animate-gradient-shift-reverse" />
        </div>

        {/* Subtle Floating Dots */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={`dot-${i}`}
              className="absolute rounded-full bg-red-500/30 animate-float-gentle"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${20 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle Grid Overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.5) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <SiteHeader />

        <div className="relative z-10">{children}</div>
        <script src="https://cdn.storrik.com/embed.js" async />
      </body>
    </html>
  )
}
