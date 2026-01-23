"use client"

import { useEffect } from "react"

export function SecurityProtection() {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault()
        return false
      }
    }

    // Detect DevTools
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold

      if (widthThreshold || heightThreshold) {
        document.body.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #0a0a0a; color: #fff; font-family: Arial, sans-serif;">
            <div style="text-align: center;">
              <h1 style="font-size: 48px; margin-bottom: 20px;">⚠️</h1>
              <h2 style="font-size: 32px; margin-bottom: 10px;">Developer Tools Detected</h2>
              <p style="color: #9ca3af;">Please close developer tools to continue.</p>
            </div>
          </div>
        `
      }
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    const interval = setInterval(detectDevTools, 1000)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
      clearInterval(interval)
    }
  }, [])

  return null
}
