// Simple admin authentication
// Cookie-based authentication to avoid browser popup

import { NextRequest } from "next/server"

export function checkAdminAuth(request: NextRequest): boolean {
  const authCookie = request.cookies.get("kiba_admin_auth")

  if (!authCookie) {
    return false
  }

  try {
    // Decode the cookie value
    const decoded = Buffer.from(authCookie.value, "base64").toString("ascii")
    const [username, password] = decoded.split(":")

    // Use environment variables with fallback to 'admin'
    const validUsername = process.env.ADMIN_USERNAME || "admin"
    const validPassword = process.env.ADMIN_PASSWORD || "admin"

    return username === validUsername && password === validPassword
  } catch {
    return false
  }
}

export function requireAuth(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  return null
}
