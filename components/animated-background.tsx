"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [dots, setDots] = useState<Array<{
    id: number
    width: number
    height: number
    left: number
    top: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    // Generate dots only on client side to avoid hydration mismatch
    const generatedDots = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      width: 2 + Math.random() * 4,
      height: 2 + Math.random() * 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 20 + Math.random() * 10,
    }))
    setDots(generatedDots)
  }, [])

  return (
    <>
      {/* Animated Gradient Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent animate-gradient-shift" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent animate-gradient-shift-reverse" />
      </div>

      {/* Subtle Floating Dots */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full bg-red-500/30 animate-float-gentle"
            style={{
              width: `${dot.width}px`,
              height: `${dot.height}px`,
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              animationDelay: `${dot.delay}s`,
              animationDuration: `${dot.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Premium Grid Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#ea580c_1px,transparent_1px),linear-gradient(to_bottom,#ea580c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.15]" />
    </>
  )
}
