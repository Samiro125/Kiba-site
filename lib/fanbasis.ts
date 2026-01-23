// Fanbasis API Client
// Handles session creation, retrieval, and signature verification

import crypto from "crypto"

export const fanbasisClient = {
  /**
   * Create a checkout session on Fanbasis
   */
  async createCheckoutSession(options: {
    product: { title: string; description?: string }
    amount_cents: number
    type: "onetime_non_reusable" | "onetime_reusable" | "subscription"
    success_url: string
    cancel_url?: string
    webhook_url?: string
    metadata?: Record<string, any>
  }) {
    const apiKey = process.env.FANBASIS_API_KEY
    if (!apiKey) {
      throw new Error("FANBASIS_API_KEY is not configured")
    }

    console.log("🔑 API Key present:", apiKey ? `${apiKey.substring(0, 10)}...` : "MISSING")
    console.log("📦 Request payload:", JSON.stringify({
      product: options.product,
      amount_cents: options.amount_cents,
      type: options.type
    }, null, 2))

    const response = await fetch("https://www.fanbasis.com/public-api/checkout-sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify(options)
    })

    const contentType = response.headers.get("content-type")

    if (!response.ok) {
      if (contentType && contentType.includes("application/json")) {
        const error = await response.json()
        throw new Error(error.message || `Fanbasis Error: ${response.status}`)
      } else {
        const text = await response.text()
        console.error("Fanbasis Non-JSON Error:", text.substring(0, 200))
        throw new Error(`API returned ${response.status}: ${response.statusText}. Check if the endpoint URL is correct.`)
      }
    }

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json()
      console.log("✅ Fanbasis Success Response:", JSON.stringify(data, null, 2))
      console.log("📋 Response keys:", Object.keys(data))
      return data
    } else {
      const text = await response.text()
      console.error("Fanbasis Success but Non-JSON:", text.substring(0, 200))
      throw new Error("API returned success but invalid data format (Not JSON)")
    }
  },

  /**
   * Verify a session status
   */
  async getSession(sessionId: string) {
    const apiKey = process.env.FANBASIS_API_KEY
    if (!apiKey) {
      throw new Error("FANBASIS_API_KEY is not configured")
    }

    const response = await fetch(`https://www.fanbasis.com/public-api/checkout-sessions/${sessionId}`, {
      headers: {
        "x-api-key": apiKey
      }
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  },

  /**
   * Verify the webhook signature from Fanbasis
   */
  verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean {
    if (!signature || !secret) return false

    try {
      const hmac = crypto.createHmac("sha256", secret)
      const digest = hmac.update(rawBody).digest("hex")
      return signature === digest
    } catch (error) {
      console.error("Signature verification error:", error)
      return false
    }
  }
}
