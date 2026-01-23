// Mailgun Email Integration

interface EmailOptions {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN
  const from = process.env.MAILGUN_FROM_EMAIL || "noreply@kibacheats.com"

  if (!apiKey || !domain) {
    console.error("Mailgun credentials not configured")
    return false
  }

  try {
    const formData = new FormData()
    formData.append("from", from)
    formData.append("to", to)
    formData.append("subject", subject)
    formData.append("html", html)

    const response = await fetch(
      `https://api.mailgun.net/v3/${domain}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        },
        body: formData,
      }
    )

    return response.ok
  } catch (error) {
    console.error("Failed to send email:", error)
    return false
  }
}

export function generateLicenseEmail(
  customerEmail: string,
  licenseKey: string,
  productName: string,
  orderId: string,
  amount: number
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Kiba Cheats License Key</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">KIBA CHEATS</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 2px;">GAMING ENHANCEMENT</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 24px;">🎮 Thank You for Your Purchase!</h2>
              <p style="color: #9ca3af; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                Your order has been confirmed and your license key is ready to use.
              </p>
              
              <!-- License Key Box -->
              <div style="background-color: #0a0a0a; border: 2px solid #8B5CF6; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
                <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your License Key</p>
                <p style="color: #8B5CF6; margin: 0; font-size: 24px; font-family: 'Courier New', monospace; font-weight: bold; letter-spacing: 2px;">${licenseKey}</p>
              </div>
              
              <!-- Order Details -->
              <table width="100%" cellpadding="10" cellspacing="0" style="margin: 30px 0; border-top: 1px solid #2a2a2a;">
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Product</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-weight: bold;">${productName}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Amount</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-weight: bold;">$${amount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Order Number</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-family: 'Courier New', monospace;">${orderId}</td>
                </tr>
              </table>
              
              <!-- Next Steps -->
              <div style="background-color: #0a0a0a; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: #8B5CF6; margin: 0 0 15px 0; font-size: 18px;">Next Steps:</h3>
                <ol style="color: #9ca3af; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Copy your license key above</li>
                  <li>Join our Discord server to download the loader</li>
                  <li>Run the loader and enter your license key</li>
                  <li>Enjoy your enhanced gaming experience!</li>
                </ol>
              </div>
              
              <!-- Discord Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://discord.com/invite/82r9zWz2EA" style="display: inline-block; background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 16px;">Join Discord Server</a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #9ca3af; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6;">
                Need help? Contact our support team on Discord or email us at support@kibacheats.com
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #2a2a2a;">
              <p style="color: #6b7280; margin: 0; font-size: 12px;">
                © 2024 Kiba Cheats. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export function generateOutOfStockEmail(
  customerEmail: string,
  productName: string,
  orderId: string,
  amount: number
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Kiba Cheats Order - License Key Pending</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">KIBA CHEATS</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; letter-spacing: 2px;">GAMING ENHANCEMENT</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 24px;">🎮 Thank You for Your Purchase!</h2>
              
              <!-- Warning Box -->
              <div style="background-color: #FFA500; background: linear-gradient(135deg, #FFA500 0%, #FF8C00 100%); border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
                <p style="color: #ffffff; margin: 0; font-size: 18px; font-weight: bold;">⚠️ License Key Pending</p>
              </div>
              
              <p style="color: #9ca3af; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                We're currently restocking license keys for <strong style="color: #ffffff;">${productName}</strong>. Your key will be delivered within 24 hours.
              </p>
              
              <p style="color: #9ca3af; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                We apologize for the delay and appreciate your patience!
              </p>
              
              <!-- Order Details -->
              <table width="100%" cellpadding="10" cellspacing="0" style="margin: 30px 0; border-top: 1px solid #2a2a2a;">
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Product</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-weight: bold;">${productName}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Amount</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-weight: bold;">$${amount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Order Number</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-family: 'Courier New', monospace;">${orderId}</td>
                </tr>
              </table>
              
              <!-- Next Steps -->
              <div style="background-color: #0a0a0a; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: #8B5CF6; margin: 0 0 15px 0; font-size: 18px;">To Receive Your Key:</h3>
                <ol style="color: #9ca3af; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Join our Discord server</li>
                  <li>Open a ticket in the #support channel</li>
                  <li>Provide your order number: <strong style="color: #ffffff;">${orderId}</strong></li>
                  <li>Receive your key within 24 hours</li>
                </ol>
              </div>
              
              <!-- Discord Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://discord.com/invite/82r9zWz2EA" style="display: inline-block; background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%); color: #ffffff; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: bold; font-size: 16px;">Join Discord & Open Ticket</a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #9ca3af; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6;">
                Thank you for choosing Kiba Cheats. We'll get your key to you as soon as possible!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #2a2a2a;">
              <p style="color: #6b7280; margin: 0; font-size: 12px;">
                © 2024 Kiba Cheats. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
