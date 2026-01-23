// Admin authentication helper for client-side
// Stores credentials in sessionStorage for the session

export interface AdminCredentials {
  username: string
  password: string
}

const STORAGE_KEY = "kiba_admin_auth"

export function getStoredCredentials(): AdminCredentials | null {
  if (typeof window === "undefined") return null
  
  const stored = sessionStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function storeCredentials(credentials: AdminCredentials): void {
  if (typeof window === "undefined") return
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(credentials))
}

export function clearCredentials(): void {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(STORAGE_KEY)
}

export function getAuthHeader(): string | null {
  const creds = getStoredCredentials()
  if (!creds) return null
  return `Basic ${btoa(`${creds.username}:${creds.password}`)}`
}

export async function promptForCredentials(): Promise<AdminCredentials | null> {
  const stored = getStoredCredentials()
  if (stored) return stored

  const username = prompt("Enter admin username:", "admin")
  const password = prompt("Enter admin password:", "admin")
  
  if (!username || !password) return null
  
  const credentials = { username, password }
  storeCredentials(credentials)
  return credentials
}
