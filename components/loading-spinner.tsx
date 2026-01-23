"use client"

export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin`}
        />
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl animate-pulse" />
      </div>
      
      {/* Loading text with emoji */}
      <div className="flex items-center gap-2 text-white font-medium">
        <span className="animate-bounce">🎮</span>
        <span>Loading</span>
        <span className="animate-pulse">...</span>
      </div>
    </div>
  )
}

export function CheckoutLoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Multiple rings */}
        <div className="w-20 h-20 rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-red-400/20 border-t-red-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
        <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl animate-pulse" />
      </div>
      
      {/* Loading text with emojis */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🔒</span>
          <span>Processing Payment</span>
          <span className="animate-bounce" style={{ animationDelay: '150ms' }}>💳</span>
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo placeholder */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-8 border-red-500/20 border-t-red-500 animate-spin" />
          <div className="absolute inset-4 rounded-full border-8 border-red-400/20 border-t-red-400 animate-spin" style={{ animationDirection: 'reverse' }} />
          <div className="absolute inset-0 rounded-full bg-red-500/30 blur-3xl animate-pulse" />
          
          {/* Center emoji */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl animate-pulse">🎮</span>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold text-white">KIBA CHEATS</h2>
          <div className="flex items-center gap-2 text-gray-400">
            <span>Loading</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
