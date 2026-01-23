import { NextResponse } from "next/server"
import { notifyNewOrder, notifyOutOfStock } from "@/lib/discord"

export async function POST(req: Request) {
    try {
        const { type = "success" } = await req.json()

        if (type === "success") {
            // Test successful order notification
            await notifyNewOrder(
                "FORTNITE CHEAT",
                7.99,
                "customer@example.com",
                "TEST-ORDER-" + Date.now(),
                "XXXX-XXXX-XXXX-XXXX"
            )

            return NextResponse.json({
                success: true,
                message: "✅ Success notification sent to Discord! Check your server.",
                type: "New Order Alert"
            })
        } else if (type === "outofstock") {
            // Test out of stock notification
            await notifyOutOfStock(
                "RUST CHEAT",
                9.99,
                "customer@example.com",
                "TEST-ORDER-" + Date.now()
            )

            return NextResponse.json({
                success: true,
                message: "⚠️ Out of stock notification sent to Discord! Check your server.",
                type: "Stock Alert"
            })
        }

        return NextResponse.json({ error: "Invalid type" }, { status: 400 })

    } catch (error: any) {
        console.error("Discord test error:", error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
