"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Download, Key, Play, Settings } from "lucide-react"

export default function InstructionsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Setup Instructions
          </h1>
          <p className="text-gray-400 text-lg">
            Follow these steps to get your cheat up and running
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="glass animate-fade-in">
            <CardContent className="p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-2xl font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Key className="w-6 h-6 text-red-400" />
                    <h3 className="text-2xl font-bold text-white">Get Your License Key</h3>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    After purchasing, you'll receive your license key via email within seconds. The email will contain:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Your unique license key (format: XXXX-XXXX-XXXX-XXXX)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Order confirmation and receipt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Discord invite link for support</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <p className="text-sm text-amber-300 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>Check your spam folder if you don't see the email within 5 minutes</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card className="glass animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Download className="w-6 h-6 text-red-400" />
                    <h3 className="text-2xl font-bold text-white">Download the Loader</h3>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Join our Discord server to access the loader download:
                  </p>
                  <ol className="space-y-3 text-gray-300 mb-4">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
                        1
                      </span>
                      <span>Click the Discord invite link from your email</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
                        2
                      </span>
                      <span>Navigate to the #downloads channel</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
                        3
                      </span>
                      <span>Download the loader for your game</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
                        4
                      </span>
                      <span>Extract the files to a folder on your desktop</span>
                    </li>
                  </ol>
                  <a 
                    href="https://discord.com/invite/82r9zWz2EA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold px-6 py-3 rounded-lg transition-all">
                      Join Discord
                    </button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card className="glass animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-2xl font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Settings className="w-6 h-6 text-red-400" />
                    <h3 className="text-2xl font-bold text-white">Disable Antivirus</h3>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Temporarily disable your antivirus to prevent false positives:
                  </p>
                  <ul className="space-y-2 text-gray-300 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Add the loader folder to your antivirus exclusions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Disable Windows Defender real-time protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Turn off any third-party antivirus software</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-300">
                      <strong>Note:</strong> Our software is 100% safe. Antivirus programs flag cheats as false positives because they modify game memory.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card className="glass animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="p-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-2xl font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Play className="w-6 h-6 text-red-400" />
                    <h3 className="text-2xl font-bold text-white">Run the Loader</h3>
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    Launch the loader and activate your cheat:
                  </p>
                  <ol className="space-y-3 text-gray-300 mb-4">
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
                        1
                      </span>
                      <span>Right-click the loader and select "Run as Administrator"</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
                        2
                      </span>
                      <span>Enter your license key when prompted</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
                        3
                      </span>
                      <span>Wait for authentication (usually 5-10 seconds)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
                        4
                      </span>
                      <span>Launch your game</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
                        5
                      </span>
                      <span>The cheat will automatically inject</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 text-sm font-bold">
                        6
                      </span>
                      <span>Press INSERT or HOME to open the menu</span>
                    </li>
                  </ol>
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-sm text-green-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>You're all set! Enjoy your enhanced gaming experience.</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Troubleshooting */}
        <Card className="glass mt-8">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Troubleshooting</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white mb-2">Loader won't start?</h4>
                <p className="text-gray-300 text-sm">
                  Make sure you're running as administrator and your antivirus is disabled. Also check that you have .NET Framework 4.8 installed.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Invalid license key?</h4>
                <p className="text-gray-300 text-sm">
                  Double-check that you copied the key correctly from your email. If the issue persists, contact support on Discord.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">Cheat not injecting?</h4>
                <p className="text-gray-300 text-sm">
                  Restart both the loader and your game. Make sure you're launching the game AFTER starting the loader.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support CTA */}
        <div className="text-center mt-8">
          <Card className="glass p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Help?
            </h3>
            <p className="text-gray-400 mb-6">
              Our support team is available 24/7 on Discord
            </p>
            <a 
              href="https://discord.com/invite/82r9zWz2EA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold px-8 py-3 rounded-lg transition-all">
                Get Support
              </button>
            </a>
          </Card>
        </div>
      </div>
    </div>
  )
}
