"use client"

import { useEffect, useState, useCallback } from "react"

declare global {
  interface Window {
    storrik?: {
      configure: (config: { pk: string }) => void
      pay: (options: { productId: string; variantId: string }) => void
    }
  }
}

const STORRIK_SCRIPT_URL = "https://cdn.storrik.com/embed.js"
const STORRIK_PUBLIC_KEY = "pk_live_eeJCZUFwTPPN7WED5zKnkgvSE6o7GgqnSlVQWK96UgE"

export function useStorrik() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if script is already loaded
    if (window.storrik) {
      setIsLoaded(true)
      setIsLoading(false)
      return
    }

    // Check if script tag already exists
    const existingScript = document.querySelector(`script[src="${STORRIK_SCRIPT_URL}"]`)
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.storrik) {
          window.storrik.configure({ pk: STORRIK_PUBLIC_KEY })
          setIsLoaded(true)
        }
        setIsLoading(false)
      })
      return
    }

    // Load the script
    const script = document.createElement("script")
    script.src = STORRIK_SCRIPT_URL
    script.async = true

    script.onload = () => {
      if (window.storrik) {
        window.storrik.configure({ pk: STORRIK_PUBLIC_KEY })
        setIsLoaded(true)
      } else {
        setError("Storrik failed to initialize")
      }
      setIsLoading(false)
    }

    script.onerror = () => {
      setError("Failed to load Storrik script")
      setIsLoading(false)
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup not needed as we want the script to persist
    }
  }, [])

  const openCheckout = useCallback((productId: string, variantId: string) => {
    if (!window.storrik) {
      setError("Storrik is not loaded")
      return
    }

    window.storrik.pay({ productId, variantId })
  }, [])

  return {
    isLoaded,
    isLoading,
    error,
    openCheckout,
  }
}
