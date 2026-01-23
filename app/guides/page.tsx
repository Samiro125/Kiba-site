"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ChevronRight, Gamepad2, Shield } from "lucide-react"
import Link from "next/link"

export default function GuidesPage() {
  const [selectedGame, setSelectedGame] = useState("fortnite")

  const gameCategories = [
    {
      id: "game-cheats",
      name: "GAME CHEATS",
      icon: Gamepad2,
      games: [
        { id: "fortnite", name: "Fortnite" },
        { id: "call-of-duty", name: "Call of Duty" },
        { id: "apex", name: "Apex Legends" },
        { id: "rainbow-six", name: "Rainbow Six Siege" },
        { id: "rust", name: "Rust" },
        { id: "valorant", name: "Valorant" },
        { id: "minecraft", name: "Minecraft" },
        { id: "dead-by-daylight", name: "Dead by Daylight" },
        { id: "cs-go", name: "CS:GO" },
        { id: "marvel-rivals", name: "Marvel Rivals" },
        { id: "arc-raiders", name: "Arc Raiders Dema" },
        { id: "arc-raiders-fo", name: "Arc Raiders F/O" },
        { id: "battlefield", name: "Battlefield 6" },
      ],
    },
    {
      id: "hwid-spoofers",
      name: "HWID SPOOFERS",
      icon: Shield,
      games: [
        { id: "temp-spoofer", name: "Temp Spoofer" },
        { id: "perm-spoofer", name: "Perm Spoofer" },
      ],
    },
  ]

  const guides = {
    fortnite: {
      title: "Fortnite Ultimate",
      subtitle: "How to download and set up FN public",
      prerequisites: [
        "Windows 10/11 (64-bit)",
        "Secure Boot disabled in BIOS",
        "Antivirus disabled or exclusions added",
        "Latest Windows updates installed",
      ],
      steps: [
        {
          number: 1,
          title: "DirectX SDK Installation",
          description: "Install Microsoft DirectX SDK",
          instructions: [
            "Download DirectX SDK from the link below",
            "Run the installer and follow the installation wizard",
            "Wait for installation to complete before proceeding",
          ],
          downloadUrl: "https://www.microsoft.com/en-us/download/details.aspx?id=6812",
          downloadText: "Download DirectX SDK",
        },
        {
          number: 2,
          title: "Visual C++ Redistributable",
          description: "Install VC++ Redistributable package",
          instructions: [
            "Download VC++ Redistributable from the link below",
            "Install the package",
            "Complete this step after DirectX SDK installation",
          ],
          downloadUrl: "https://aka.ms/vs/17/release/vc_redist.x64.exe",
          downloadText: "Download VC++ Redistributable",
        },
        {
          number: 3,
          title: "Download Loader",
          description: "Get the KIBA loader from Discord",
          instructions: [
            "Join our Discord server",
            "Navigate to #downloads channel",
            "Download the latest loader version",
            "Extract to a safe location (not Desktop)",
          ],
          downloadUrl: "https://discord.com/invite/82r9zWz2EA",
          downloadText: "Join Discord",
        },
        {
          number: 4,
          title: "Run Loader",
          description: "Launch and authenticate",
          instructions: [
            "Run the loader as Administrator",
            "Enter your license key from email",
            "Wait for injection to complete",
            "Launch Fortnite and enjoy!",
          ],
        },
      ],
    },
    "call-of-duty": {
      title: "Call of Duty",
      subtitle: "Setup guide for COD cheats",
      prerequisites: [
        "Windows 10/11 (64-bit)",
        "Game installed and updated",
        "Antivirus disabled",
      ],
      steps: [
        {
          number: 1,
          title: "Prerequisites Installation",
          description: "Install required dependencies",
          instructions: [
            "Download and install DirectX SDK",
            "Download and install VC++ Redistributable",
            "Restart your computer",
          ],
          downloadUrl: "https://www.microsoft.com/en-us/download/details.aspx?id=6812",
          downloadText: "Download DirectX SDK",
        },
        {
          number: 2,
          title: "Download Loader",
          description: "Get the loader from Discord",
          instructions: [
            "Join Discord server",
            "Go to #downloads",
            "Download COD loader",
          ],
          downloadUrl: "https://discord.com/invite/82r9zWz2EA",
          downloadText: "Join Discord",
        },
        {
          number: 3,
          title: "Launch",
          description: "Run and inject",
          instructions: [
            "Run loader as admin",
            "Enter license key",
            "Launch game",
          ],
        },
      ],
    },
    "temp-spoofer": {
      title: "Temp Spoofer",
      subtitle: "Temporary HWID spoofer setup",
      prerequisites: [
        "Windows 10/11",
        "Secure Boot disabled",
        "TPM disabled (optional)",
      ],
      steps: [
        {
          number: 1,
          title: "Download Spoofer",
          description: "Get the spoofer from Discord",
          instructions: [
            "Join Discord server",
            "Navigate to #spoofer-downloads",
            "Download temp spoofer",
          ],
          downloadUrl: "https://discord.com/invite/82r9zWz2EA",
          downloadText: "Join Discord",
        },
        {
          number: 2,
          title: "Run Spoofer",
          description: "Execute and spoof",
          instructions: [
            "Run as Administrator",
            "Click 'Spoof' button",
            "Restart computer",
            "Verify spoof worked",
          ],
        },
      ],
    },
  }

  const currentGuide = guides[selectedGame as keyof typeof guides] || guides.fortnite

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Setup <span className="text-red-500">Guides</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Step-by-step instructions to get your KIBA products up and running
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-zinc-950 border-zinc-800 sticky top-4">
              <CardContent className="p-4">
                {gameCategories.map((category) => (
                  <div key={category.id} className="mb-6">
                    <div className="flex items-center gap-2 mb-3 text-green-400">
                      <category.icon className="w-4 h-4" />
                      <h3 className="text-xs font-bold uppercase tracking-wider">
                        {category.name}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      {category.games.map((game) => (
                        <button
                          key={game.id}
                          onClick={() => setSelectedGame(game.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                            selectedGame === game.id
                              ? "bg-red-500 text-white font-medium"
                              : "text-gray-400 hover:bg-zinc-900 hover:text-white"
                          }`}
                        >
                          {game.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Guide Header */}
            <Card className="bg-zinc-950 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-3xl text-white">
                  {currentGuide.title}
                </CardTitle>
                <p className="text-gray-400">{currentGuide.subtitle}</p>
              </CardHeader>
            </Card>

            {/* Prerequisites */}
            <Card className="bg-zinc-950 border-amber-500/20">
              <CardHeader>
                <CardTitle className="text-xl text-amber-400 flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  Prerequisites Installation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  Complete these steps in order before proceeding to cheat setup
                </p>
                <ul className="space-y-2">
                  {currentGuide.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <ChevronRight className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{prereq}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Steps */}
            {currentGuide.steps.map((step) => (
              <Card key={step.number} className="bg-zinc-950 border-zinc-800">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl text-white mb-1">
                        {step.title}
                      </CardTitle>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-20">
                  <ol className="space-y-3 mb-6">
                    {step.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <span className="flex-shrink-0 w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs text-gray-400">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ol>
                  {step.downloadUrl && (
                    <Link href={step.downloadUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        {step.downloadText}
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Support Card */}
            <Card className="bg-gradient-to-r from-red-950/50 to-zinc-950 border-red-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
                <p className="text-gray-300 mb-4">
                  If you encounter any issues during setup, our support team is here to help!
                </p>
                <div className="flex gap-4">
                  <Link href="https://discord.com/invite/82r9zWz2EA" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-red-600 hover:bg-red-700">
                      Join Discord Support
                    </Button>
                  </Link>
                  <Link href="/faq">
                    <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400">
                      View FAQ
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
