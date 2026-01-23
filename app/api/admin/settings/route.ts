import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/auth"
import fs from 'fs/promises'
import path from 'path'

const SETTINGS_FILE = path.join(process.cwd(), "data", "settings.json")

// Ensure data directory exists
async function ensureSettings() {
    try {
        await fs.access(SETTINGS_FILE)
    } catch {
        const defaultSettings = {
            storeName: "Kiba Cheats",
            supportEmail: "support@kibacheats.com",
            currency: "USD",
            maintenanceMode: false,
            webhookSecret: ""
        }
        await fs.mkdir(path.dirname(SETTINGS_FILE), { recursive: true })
        await fs.writeFile(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2))
    }
}

export async function GET(request: NextRequest) {
    const authError = requireAuth(request)
    if (authError) return authError

    await ensureSettings()
    const data = await fs.readFile(SETTINGS_FILE, 'utf8')
    return NextResponse.json(JSON.parse(data))
}

export async function POST(request: NextRequest) {
    const authError = requireAuth(request)
    if (authError) return authError

    try {
        const body = await request.json()
        await ensureSettings()

        // Merge with existing to prevent data loss
        const currentRaw = await fs.readFile(SETTINGS_FILE, 'utf8')
        const current = JSON.parse(currentRaw)
        const updated = { ...current, ...body }

        await fs.writeFile(SETTINGS_FILE, JSON.stringify(updated, null, 2))

        return NextResponse.json(updated)
    } catch (error) {
        return NextResponse.json({ error: "Failed to save settings" }, { status: 500 })
    }
}
