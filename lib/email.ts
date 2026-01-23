// Gmail SMTP Email Integration
import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
}

// Create reusable transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export async function sendEmail({ to, subject, html }: EmailOptions): Promise<boolean> {
  const smtpUser = process.env.SMTP_USER
  const smtpPassword = process.env.SMTP_PASSWORD
  const fromEmail = process.env.SMTP_FROM_EMAIL || smtpUser
  const fromName = process.env.SMTP_FROM_NAME || "Kiba Cheats"

  if (!smtpUser || !smtpPassword) {
    console.error("SMTP credentials not configured")
    return false
  }

  try {
    const transporter = createTransporter()

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      html,
    })

    console.log(`Email sent successfully to ${to}`)
    return true
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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 1px;">KIBA CHEATS</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 13px; letter-spacing: 3px; opacity: 0.9;">PREMIUM GAMING ENHANCEMENT</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">🎮 Thank You for Your Purchase!</h2>
              <p style="color: #9ca3af; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                Your order has been confirmed and your license key is ready to use. Get started now!
              </p>
              
              <!-- License Key Box -->
              <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border: 2px solid #EF4444; border-radius: 10px; padding: 25px; margin: 30px 0; text-align: center; box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);">
                <p style="color: #9ca3af; margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Your License Key</p>
                <p style="color: #EF4444; margin: 0; font-size: 22px; font-family: 'Courier New', Courier, monospace; font-weight: bold; letter-spacing: 3px; word-break: break-all;">${licenseKey}</p>
              </div>
              
              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; border-top: 1px solid #2a2a2a;">
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Product</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-weight: 600;">${productName}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Amount Paid</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-weight: 600;">$${amount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Order Number</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-family: 'Courier New', Courier, monospace; font-size: 13px;">${orderId}</td>
                </tr>
              </table>
              
              <!-- Next Steps -->
              <div style="background-color: #0a0a0a; border-left: 4px solid #EF4444; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: #EF4444; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">📋 Next Steps:</h3>
                <ol style="color: #9ca3af; margin: 0; padding-left: 20px; line-height: 2;">
                  <li style="margin-bottom: 8px;">Copy your license key above</li>
                  <li style="margin-bottom: 8px;">Click the button below to open the setup guide</li>
                  <li style="margin-bottom: 8px;">Download the loader from our Discord</li>
                  <li style="margin-bottom: 8px;">Run the loader and enter your license key</li>
                  <li>Enjoy your enhanced gaming experience!</li>
                </ol>
              </div>
              
              <!-- Setup Guide Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/guides" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">Open Setup Guide</a>
                  </td>
                </tr>
              </table>
              
              <!-- Discord Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://discord.com/invite/82r9zWz2EA" style="display: inline-block; background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">Join Discord Server</a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #9ca3af; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; text-align: center;">
                Need help? Contact our support team on Discord or email us at <a href="mailto:support@kibacheats.com" style="color: #EF4444; text-decoration: none;">support@kibacheats.com</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #2a2a2a;">
              <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 12px;">
                © ${new Date().getFullYear()} Kiba Cheats. All rights reserved.
              </p>
              <p style="color: #4b5563; margin: 0; font-size: 11px;">
                This email was sent to ${customerEmail}
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
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 1px;">KIBA CHEATS</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 13px; letter-spacing: 3px; opacity: 0.9;">PREMIUM GAMING ENHANCEMENT</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">🎮 Thank You for Your Purchase!</h2>
              
              <!-- Warning Box -->
              <div style="background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%); border-radius: 10px; padding: 20px; margin: 30px 0; text-align: center; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
                <p style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 600;">⚠️ License Key Pending</p>
              </div>
              
              <p style="color: #9ca3af; margin: 0 0 20px 0; font-size: 16px; line-height: 1.6;">
                We're currently restocking license keys for <strong style="color: #ffffff;">${productName}</strong>. Your key will be delivered within 24 hours.
              </p>
              
              <p style="color: #9ca3af; margin: 0 0 30px 0; font-size: 16px; line-height: 1.6;">
                We apologize for the delay and appreciate your patience!
              </p>
              
              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0; border-top: 1px solid #2a2a2a;">
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Product</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-weight: 600;">${productName}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Amount Paid</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-weight: 600;">$${amount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a;">Order Number</td>
                  <td style="color: #ffffff; font-size: 14px; padding: 15px 0; border-bottom: 1px solid #2a2a2a; text-align: right; font-family: 'Courier New', Courier, monospace; font-size: 13px;">${orderId}</td>
                </tr>
              </table>
              
              <!-- Next Steps -->
              <div style="background-color: #0a0a0a; border-left: 4px solid #F59E0B; border-radius: 8px; padding: 20px; margin: 30px 0;">
                <h3 style="color: #F59E0B; margin: 0 0 15px 0; font-size: 18px; font-weight: 600;">📋 To Receive Your Key:</h3>
                <ol style="color: #9ca3af; margin: 0; padding-left: 20px; line-height: 2;">
                  <li style="margin-bottom: 8px;">Join our Discord server</li>
                  <li style="margin-bottom: 8px;">Open a ticket in the #support channel</li>
                  <li style="margin-bottom: 8px;">Provide your order number: <strong style="color: #ffffff;">${orderId}</strong></li>
                  <li>Receive your key within 24 hours</li>
                </ol>
              </div>
              
              <!-- Discord Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://discord.com/invite/82r9zWz2EA" style="display: inline-block; background: linear-gradient(135deg, #DC2626 0%, #EF4444 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">Join Discord & Open Ticket</a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #9ca3af; margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; text-align: center;">
                Thank you for choosing Kiba Cheats. We'll get your key to you as soon as possible!
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #2a2a2a;">
              <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 12px;">
                © ${new Date().getFullYear()} Kiba Cheats. All rights reserved.
              </p>
              <p style="color: #4b5563; margin: 0; font-size: 11px;">
                This email was sent to ${customerEmail}
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
