"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Are your cheats undetected?",
      answer:
        "Yes, our cheats are designed with advanced protection mechanisms to remain undetected by anti-cheat systems. We use state-of-the-art obfuscation techniques and constantly update our software to stay ahead of detection methods. However, no cheat can guarantee 100% undetectability, so we recommend following our usage guidelines and best practices.",
    },
    {
      question: "How do I download and install the cheats?",
      answer:
        "After purchasing, you'll receive access to your dashboard where you can download your cheat. Each product comes with a detailed installation guide available on our Guides page. Simply follow the step-by-step instructions, which include disabling antivirus software, extracting files, and running the loader. Our support team is available 24/7 if you need assistance.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods through our secure payment processor Fanbasis, including credit/debit cards, PayPal, and cryptocurrency. All transactions are encrypted and secure. Your payment information is never stored on our servers.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "Due to the digital nature of our products, we generally do not offer refunds once you've received access to the cheat. However, we evaluate refund requests on a case-by-case basis for technical issues that prevent the product from working as advertised. Please contact our support team within 24 hours of purchase if you encounter any problems.",
    },
    {
      question: "How often do you update your cheats?",
      answer:
        "We monitor game updates closely and release patches as needed, typically within 24-48 hours of a major game update. Minor updates and improvements are released regularly. You'll receive notifications through our Discord server and dashboard when updates are available. All updates are free for active subscription holders.",
    },
    {
      question: "Can I use the cheats on multiple computers?",
      answer:
        "Our licenses are typically bound to a single HWID (Hardware ID) for security purposes. If you need to switch computers or reset your HWID, you can do so through your dashboard. Some subscription tiers may allow multiple HWID slots. Contact support if you need to frequently switch between devices.",
    },
    {
      question: "How do I contact support if I have issues?",
      answer:
        "We offer 24/7 support through multiple channels. The fastest way to get help is through our Discord server where our support team and community are active. You can also submit a ticket through your dashboard for account-related issues. For urgent matters, our Discord server provides real-time assistance.",
    },
  ]

  return (
    <div className="min-h-screen text-white">
      <main className="container mx-auto px-6 py-16 pt-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Frequently Asked Questions</h1>
          <p className="text-lg text-zinc-400 text-pretty">
            Find answers to the most common questions about our cheats and services
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-lg bg-zinc-900/50 overflow-hidden transition-all duration-500 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1 animate-fade-in group/faq"
              style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-300 hover:bg-zinc-800/50 group-hover/faq:pl-8"
              >
                <span className="text-lg font-semibold pr-8">{faq.question}</span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-red-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-zinc-400 leading-relaxed border-t border-white/5 pt-4">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center bg-zinc-900 border border-red-500/20 rounded-lg p-8 hover:border-red-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-red-500/10 hover-border-glow">
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-zinc-400 mb-6">
            Join our Discord community for instant support and direct communication with our team
          </p>
          <Link href="https://discord.gg/n42mcPBP6K" target="_blank" rel="noopener noreferrer">
            <Button className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 text-base transition-all flex items-center gap-2 mx-auto">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.076.076 0 0 0 .084.028a14.09 14.09 0 0 0 1.226-1.994a.077.077 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join our Discord
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
