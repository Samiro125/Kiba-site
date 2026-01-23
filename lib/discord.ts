// Discord Webhook Integration

interface DiscordEmbed {
  title: string
  color: number
  fields: Array<{
    name: string
    value: string
    inline?: boolean
  }>
  timestamp: string
}

interface DiscordWebhookPayload {
  content: string
  embeds: DiscordEmbed[]
}

export async function sendDiscordNotification(
  content: string,
  embed: Omit<DiscordEmbed, "timestamp">
): Promise<boolean> {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    console.error("Discord webhook URL not configured")
    return false
  }

  const payload: DiscordWebhookPayload = {
    content,
    embeds: [
      {
        ...embed,
        timestamp: new Date().toISOString(),
      },
    ],
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    return response.ok
  } catch (error) {
    console.error("Failed to send Discord notification:", error)
    return false
  }
}

export async function notifyNewOrder(
  productName: string,
  amount: number,
  customerEmail: string,
  orderId: string,
  licenseKey?: string
): Promise<void> {
  const fields = [
    { name: "Product", value: productName, inline: true },
    { name: "Amount", value: `$${amount.toFixed(2)}`, inline: true },
    { name: "Customer", value: customerEmail, inline: false },
    { name: "Order ID", value: orderId, inline: true },
  ]

  if (licenseKey) {
    fields.push({ name: "License Key", value: `\`${licenseKey}\``, inline: true })
  }

  await sendDiscordNotification("🎮 **New Purchase!**", {
    title: "Order Completed",
    color: 0x10b981, // Green
    fields,
  })
}

export async function notifyOutOfStock(
  productName: string,
  amount: number,
  customerEmail: string,
  orderId: string
): Promise<void> {
  await sendDiscordNotification("⚠️ **New Purchase - OUT OF STOCK**", {
    title: "Order Completed - Key Pending",
    color: 0xffa500, // Orange
    fields: [
      { name: "Product", value: productName, inline: true },
      { name: "Amount", value: `$${amount.toFixed(2)}`, inline: true },
      { name: "Customer", value: customerEmail, inline: false },
      { name: "⚠️ Action Required", value: "Customer needs license key - check Discord tickets", inline: false },
    ],
  })
}

export async function notifyLowStock(productName: string, stockCount: number): Promise<void> {
  const isCritical = stockCount < 5
  
  await sendDiscordNotification(
    isCritical ? "🚨 **CRITICAL: Low Stock Alert**" : "⚠️ **Low Stock Alert**",
    {
      title: `Low Stock: ${productName}`,
      color: isCritical ? 0xff0000 : 0xffa500, // Red or Orange
      fields: [
        { name: "Product", value: productName, inline: true },
        { name: "Remaining Keys", value: stockCount.toString(), inline: true },
        { name: "Action Required", value: "Please add more license keys", inline: false },
      ],
    }
  )
}

export async function notifyPaymentFailed(
  productName: string,
  amount: number,
  customerEmail: string,
  orderId: string,
  reason?: string
): Promise<void> {
  await sendDiscordNotification("❌ **Payment Failed**", {
    title: "Payment Failed",
    color: 0xff0000, // Red
    fields: [
      { name: "Product", value: productName, inline: true },
      { name: "Amount", value: `$${amount.toFixed(2)}`, inline: true },
      { name: "Customer", value: customerEmail, inline: false },
      { name: "Order ID", value: orderId, inline: true },
      { name: "Reason", value: reason || "Unknown", inline: false },
    ],
  })
}

export async function notifyPaymentCancelled(
  productName: string,
  amount: number,
  customerEmail: string,
  orderId: string
): Promise<void> {
  await sendDiscordNotification("🚫 **Payment Cancelled**", {
    title: "Payment Cancelled by Customer",
    color: 0x6b7280, // Gray
    fields: [
      { name: "Product", value: productName, inline: true },
      { name: "Amount", value: `$${amount.toFixed(2)}`, inline: true },
      { name: "Customer", value: customerEmail, inline: false },
      { name: "Order ID", value: orderId, inline: true },
    ],
  })
}
