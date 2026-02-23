app/api/webhooks/payments/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    console.log("Webhook received:", body);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return new NextResponse("Webhook error", { status: 400 });
  }
}
