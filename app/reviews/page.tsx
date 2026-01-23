"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, Shield, Zap } from "lucide-react"

const reviews = [
  {
    id: 1,
    name: "Marcus_Pro",
    game: "Valorant",
    avatar: "M",
    rating: 5,
    date: "2 days ago",
    verified: true,
    review: "Best cheats I've ever used! The Valorant cheat is completely undetected and works flawlessly. The aimbot is smooth and natural-looking, ESP is crystal clear, and customer support responds within minutes. Been using for 3 months with zero issues. Absolutely worth every penny!",
    helpful: 47,
  },
  {
    id: 2,
    name: "Shadow_X",
    game: "Spoofer",
    avatar: "S",
    rating: 5,
    date: "5 days ago",
    verified: true,
    review: "The spoofer literally saved my account! Got hardware banned on multiple games but with KIBA's permanent spoofer, I'm back in action. Setup was super easy, works on all my games, and hasn't failed once. Customer service helped me through the whole process. 10/10 would recommend!",
    helpful: 38,
  },
  {
    id: 3,
    name: "Apex_King",
    game: "Apex Legends",
    avatar: "A",
    rating: 5,
    date: "1 week ago",
    verified: true,
    review: "Been using KIBA for 6+ months across Apex, Fortnite, and Rust. Never been detected once! The cheats are constantly updated, features are insane, and the Discord community is super helpful. This is the only cheat provider I trust. Quality is unmatched!",
    helpful: 52,
  },
  {
    id: 4,
    name: "FortniteGod",
    game: "Fortnite",
    avatar: "F",
    rating: 5,
    date: "1 week ago",
    verified: true,
    review: "Fortnite cheat is INSANE! Aimbot locks on perfectly, ESP shows everything, and it's completely undetected. I've been dominating lobbies and my stats have skyrocketed. The loader is easy to use and updates are instant. Best purchase I've made!",
    helpful: 41,
  },
  {
    id: 5,
    name: "RustLegend",
    game: "Rust",
    avatar: "R",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    review: "Rust cheat is a game-changer! No recoil, perfect aim, and I can see everyone through walls. Raiding bases has never been easier. Been using for 4 months on official servers with no bans. KIBA is the real deal!",
    helpful: 35,
  },
  {
    id: 6,
    name: "R6_Master",
    game: "Rainbow Six Siege",
    avatar: "R",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    review: "R6 Siege cheat is perfect! Wallhacks are clean, aimbot is smooth, and it's completely undetected. Ranked up from Gold to Diamond in one week. The ESP shows gadgets and operators clearly. Support team is amazing too!",
    helpful: 29,
  },
  {
    id: 7,
    name: "BF_Warrior",
    game: "Battlefield",
    avatar: "B",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    review: "Battlefield 6 cheat is incredible! Vehicle ESP, player ESP, aimbot - everything works perfectly. Topping leaderboards every match. The cheat is stable, never crashes, and updates are quick. Highly recommend!",
    helpful: 26,
  },
  {
    id: 8,
    name: "SpooferPro",
    game: "Temp Spoofer",
    avatar: "S",
    rating: 5,
    date: "3 weeks ago",
    verified: true,
    review: "Temp spoofer works like magic! Got banned on Valorant but this spoofer got me back in within minutes. Super affordable and does exactly what it promises. Great for testing or short-term use!",
    helpful: 22,
  },
  {
    id: 9,
    name: "CheatMaster",
    game: "Multiple Games",
    avatar: "C",
    rating: 5,
    date: "1 month ago",
    verified: true,
    review: "I've tried every cheat provider out there and KIBA is hands down the best! Undetected across all games, amazing features, fair prices, and the best support team. The Discord community is active and helpful. This is the only provider you need!",
    helpful: 68,
  },
  {
    id: 10,
    name: "ArcRaider",
    game: "Arc Raiders",
    avatar: "A",
    rating: 5,
    date: "1 month ago",
    verified: true,
    review: "Arc Raiders cheat is fire! Game is new but KIBA already has a fully working cheat. Aimbot, ESP, everything works perfectly. Love how fast they update for new games. Definitely worth it!",
    helpful: 18,
  },
]

export default function ReviewsPage() {
  const [filter, setFilter] = useState<string>("all")

  const filteredReviews = filter === "all" 
    ? reviews 
    : reviews.filter(r => r.game.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 gradient-text">
            Customer Reviews
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See what our 36,000+ satisfied customers have to say about Kiba Cheats
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          <Card className="glass text-center p-6">
            <div className="text-4xl font-bold text-red-400 mb-2">5.0</div>
            <div className="flex justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-red-400 text-red-400" />
              ))}
            </div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </Card>

          <Card className="glass text-center p-6">
            <div className="text-4xl font-bold text-red-400 mb-2">36K+</div>
            <div className="text-sm text-gray-400 mt-2">Happy Customers</div>
          </Card>

          <Card className="glass text-center p-6">
            <div className="text-4xl font-bold text-red-400 mb-2">100%</div>
            <div className="text-sm text-gray-400 mt-2">Undetected</div>
          </Card>

          <Card className="glass text-center p-6">
            <div className="text-4xl font-bold text-red-400 mb-2">24/7</div>
            <div className="text-sm text-gray-400 mt-2">Support</div>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["all", "valorant", "fortnite", "rust", "apex", "spoofer"].map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "default" : "outline"}
              className={filter === f 
                ? "bg-gradient-to-r from-red-600 to-red-700" 
                : "border-red-500/50 hover:bg-red-500/10"
              }
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredReviews.map((review, index) => (
            <Card 
              key={review.id} 
              className="glass hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white font-bold text-lg">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white">{review.name}</p>
                        {review.verified && (
                          <Shield className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{review.game}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-red-400 text-red-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {review.review}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-red-500/20">
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Verified Purchase
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="glass max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Join 36,000+ Satisfied Customers
            </h3>
            <p className="text-gray-400 mb-6">
              Experience the best gaming cheats with unmatched quality and support
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold h-14 px-8 text-lg"
              onClick={() => window.location.href = "/"}
            >
              Browse Products
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
