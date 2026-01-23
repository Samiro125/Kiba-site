import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sendEmail, generateLicenseEmail } from "@/lib/email"

export async function POST(req: Request) {
    try {
        const { email, productId, duration } = await req.json()

        if (!email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 })
        }

        // Get product
        const product = await db.products.getById(productId || "fortnite")
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 })
        }

        // Try to assign a key
        const assignedKey = await db.licenseKeys.assignToCustomer(
            product.id,
            email,
            duration || "1 Day"
        )

        if (!assignedKey) {
            return NextResponse.json({
                success: false,
                message: "No keys available for this product/duration"
            })
        }

        // Generate and send email
        const html = generateLicenseEmail(
            email,
            assignedKey.key,
            product.name,
            "TEST-ORDER-" + Date.now(),
            7.99
        )

        const emailSent = await sendEmail({
            to: email,
            subject: `[TEST] Your ${product.name} License Key | Kiba Cheats`,
            html
        })

        return NextResponse.json({
            success: true,
            emailSent,
            licenseKey: assignedKey.key,
            message: emailSent
                ? "✅ Email sent successfully! Check your inbox."
                : "⚠️ Key assigned but email failed. Check SMTP settings."
        })

    } catch (error: any) {
        console.error("Test email error:", error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
