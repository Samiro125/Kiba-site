# Gmail SMTP Setup Guide

This guide will help you set up Gmail SMTP for sending emails from your Kiba Cheats platform.

## Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the prompts to enable 2FA if not already enabled

## Step 2: Generate App Password

1. Go to https://myaccount.google.com/apppasswords
2. You may need to sign in again
3. In the "Select app" dropdown, choose "Mail"
4. In the "Select device" dropdown, choose "Other (Custom name)"
5. Enter "Kiba Cheats" as the name
6. Click "Generate"
7. **IMPORTANT**: Copy the 16-character password that appears (it will look like: `xxxx xxxx xxxx xxxx`)
8. Save this password securely - you won't be able to see it again!

## Step 3: Update Environment Variables

Open your `.env.local` file and update these values:

```env
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
SMTP_FROM_EMAIL=your-email@gmail.com
SMTP_FROM_NAME=Kiba Cheats
```

Replace:
- `your-email@gmail.com` with your actual Gmail address
- `xxxx xxxx xxxx xxxx` with the app password you generated (include the spaces or remove them, both work)

## Step 4: Install Dependencies

Run this command to install nodemailer:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Step 5: Test Email Sending

Start your development server:

```bash
npm run dev
```

Then test by making a purchase on your site. You should receive an email with your license key!

## Troubleshooting

### "Invalid login" error
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Factor Authentication is enabled
- Double-check the email address is correct

### "Connection timeout" error
- Check your firewall settings
- Make sure port 587 is not blocked
- Try using port 465 with `secure: true` instead

### Emails going to spam
- Add SPF records to your domain DNS
- Use a custom domain email instead of Gmail for production
- Ask recipients to mark your emails as "Not Spam"

## Production Recommendations

For production, consider using:
- **SendGrid**: Free tier includes 100 emails/day
- **Mailgun**: Free tier includes 5,000 emails/month
- **AWS SES**: Very cheap, $0.10 per 1,000 emails
- **Resend**: Modern email API with great deliverability

Gmail SMTP is great for development and testing, but has daily sending limits (500 emails/day for regular accounts, 2,000/day for Google Workspace).

## Email Limits

Gmail SMTP limits:
- **Regular Gmail**: 500 emails per day
- **Google Workspace**: 2,000 emails per day
- **Per message**: 500 recipients maximum

If you expect more than 500 orders per day, switch to a dedicated email service provider.

## Security Notes

- Never commit your `.env.local` file to Git
- Keep your App Password secure
- Rotate App Passwords periodically
- Use environment variables for all sensitive data
- Consider using a dedicated email account for transactional emails

## Testing Email Templates

You can test your email templates by creating a test order or using a tool like:
- Mailtrap (for development)
- Litmus (for testing across email clients)
- Email on Acid (for comprehensive testing)

---

**Need help?** Join our Discord: https://discord.com/invite/82r9zWz2EA
