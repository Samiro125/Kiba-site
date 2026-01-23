"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Star,
  ChevronRight,
  MessageSquare,
  Globe,
  Trophy
} from "lucide-react"
import { LogoCarousel } from "@/components/logo-carousel"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-red-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[150px] opacity-30" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-800/10 rounded-full blur-[120px] opacity-20" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                <Trophy className="w-4 h-4" />
                <span>#1 Trusted Provider in 2026</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                DOMINATE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-800">
                  WITHOUT LIMITS
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                Experience gaming like never before with our industry-leading, undetected tools. Stay ahead of the competition and secure your victory today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="h-14 bg-red-600 hover:bg-red-700 text-white px-10 text-lg font-bold rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                    Browse Store
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://discord.com/invite/82r9zWz2EA" target="_blank">
                  <Button size="lg" variant="outline" className="h-14 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-white px-10 text-lg font-bold rounded-2xl backdrop-blur-sm w-full sm:w-auto">
                    Join Discord
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        width={40}
                        height={40}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-500 mt-1"><span className="text-white font-bold">2.5k+</span> Reviews</p>
                </div>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="absolute inset-0 bg-red-600/20 blur-[100px] -z-10 rounded-full" />
              <div className="relative z-10 p-2 rounded-[2.5rem] bg-gradient-to-b from-zinc-800 to-zinc-950 shadow-2xl">
                <div className="absolute -top-32 left-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent to-red-600/50 -translate-x-1/2" />
                <Image
                  src="https://i.postimg.cc/Hsm3n1DP/image.png"
                  width={600}
                  height={400}
                  alt="Software Preview"
                  className="rounded-[2rem] object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Marquee Section */}
      <div className="relative z-10 py-10 bg-black/80 backdrop-blur-sm border-b border-zinc-900 overflow-hidden">
        <LogoCarousel />
      </div>

      {/* Our Exclusive Products Section */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase">OUR EXCLUSIVE PRODUCTS</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Fortnite Product */}
            <div className="flex flex-col items-center group">
              <Link href="/products/fortnite" className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:border-red-500/50 transition-all duration-500 shadow-2xl">
                <Image
                  src="https://i.postimg.cc/Sxdx9Z72/Kiba-Fortnite-Category.gif"
                  alt="Fortnite"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </Link>
              <div className="mt-6 text-center space-y-2">
                <Link href="/products/fortnite" className="group/link flex items-center justify-center gap-2">
                  <h4 className="text-xl font-black uppercase tracking-tighter">Fortnite</h4>
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center justify-center gap-0.5 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">KIBA Cheats</p>
              </div>
            </div>

            {/* Rust Product */}
            <div className="flex flex-col items-center group">
              <Link href="/products/rust" className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:border-red-500/50 transition-all duration-500 shadow-2xl">
                <Image
                  src="https://i.postimg.cc/0NtjTtbt/Kiba-Spoofer-Category.gif"
                  alt="Rust"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </Link>
              <div className="mt-6 text-center space-y-2">
                <Link href="/products/rust" className="group/link flex items-center justify-center gap-2">
                  <h4 className="text-xl font-black uppercase tracking-tighter">Rust</h4>
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center justify-center gap-0.5 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">KIBA Cheats</p>
              </div>
            </div>

            {/* HWID Spoofer Product */}
            <div className="flex flex-col items-center group">
              <Link href="/products/perm-spoofer" className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-zinc-800 bg-zinc-900/50 hover:border-red-500/50 transition-all duration-500 shadow-2xl">
                <Image
                  src="https://i.postimg.cc/6qp77DFW/Kiba-Spoofer-Category.gif"
                  alt="HWID Spoofer"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </Link>
              <div className="mt-6 text-center space-y-2">
                <Link href="/products/perm-spoofer" className="group/link flex items-center justify-center gap-2">
                  <h4 className="text-xl font-black uppercase tracking-tighter">HWID Spoofer</h4>
                  <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center justify-center gap-0.5 text-yellow-500">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">KIBA Cheats</p>
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <Link href="/products">
              <Button size="lg" className="h-16 bg-red-600 hover:bg-red-700 text-white px-12 text-xl font-black rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:scale-105 transition-all duration-300 group">
                <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Enhanced Discord/PayPal CTA */}
      <section className="relative z-10 py-20 pb-40 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative group p-1 md:p-[1px] rounded-[3.5rem] bg-gradient-to-br from-zinc-800/50 via-zinc-900/20 to-zinc-800/50 overflow-hidden">
            {/* Animated border glow */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent group-hover:via-red-400 group-hover:scale-x-110 transition-all duration-700" />

            <div className="relative p-12 md:p-24 rounded-[3.45rem] bg-black/90 backdrop-blur-xl overflow-hidden text-center">
              {/* Background complexity */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-800/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                {/* Community Icon with Pulsing Effect */}
                <div className="relative w-24 h-24 mx-auto">
                  <div className="absolute inset-0 bg-red-600/20 rounded-[2rem] blur-2xl animate-pulse" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.4)] rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <MessageSquare className="w-11 h-11 text-white fill-current" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none">
                    JOIN THE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">COMMUNITY</span>
                  </h3>
                  <p className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed max-w-lg mx-auto">
                    Get instant updates, priority support, and exclusive deals. Join over <span className="text-white font-bold">50k+</span> members today.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                  <Link href="https://discord.com/invite/82r9zWz2EA" target="_blank" className="w-full sm:w-auto">
                    <Button size="lg" className="h-16 w-full sm:px-12 bg-[#5865F2] hover:bg-[#4752C4] text-white text-xl font-black rounded-2xl shadow-[0_0_30px_rgba(88,101,242,0.3)] hover:scale-105 transition-all duration-300">
                      Join Discord
                    </Button>
                  </Link>
                  <Link href="https://discord.com/invite/82r9zWz2EA" target="_blank" className="w-full sm:w-auto">
                    <Button size="lg" className="h-16 w-full sm:px-12 bg-red-600 hover:bg-red-700 text-white text-xl font-black rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-105 transition-all duration-300">
                      PayPal Tickets
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 pt-10">
                  <div className="flex items-center gap-3 text-zinc-500/80 group/feat">
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover/feat:border-red-500 transition-colors">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover/feat:text-white transition-colors">Global Support</span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500/80 group/feat">
                    <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover/feat:border-red-500 transition-colors">
                      <Star className="w-4 h-4 fill-red-500 text-red-500" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] group-hover/feat:text-white transition-colors">Premium Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="relative z-10 py-12 border-t border-zinc-900 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-xl italic shadow-lg shadow-red-900/20">K</div>
            <span className="text-2xl font-black tracking-tighter">KIBA<span className="text-red-600">CHEATS</span></span>
          </div>

          <div className="flex gap-12 text-sm font-medium text-zinc-500">
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <Link href="https://discord.com/invite/82r9zWz2EA" target="_blank" className="hover:text-white transition-colors">Support</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

          <p className="text-zinc-600 text-sm">© 2026 KibaCheats. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
