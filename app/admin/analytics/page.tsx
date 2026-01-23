"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart3, TrendingUp, Users, CreditCard, Activity, ShoppingBag, DollarSign } from "lucide-react"

interface AnalyticsData {
  stats: any
  revenueData: any[]
  topProducts: any[]
  topCustomers: any[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/stats?days=30")
      .then(res => res.json())
      .then(resData => {
        // Process top products and customers here or on backend
        // For now, let's pretend we have it in the response
        setData({
          stats: resData.stats,
          revenueData: resData.revenueData,
          topProducts: [
            { name: "Fortnite Cheat", sales: 154, revenue: 1230.45 },
            { name: "Rust Cheat", sales: 89, revenue: 889.11 },
            { name: "Valorant Cheat", sales: 45, revenue: 629.55 },
            { name: "Apex Legends", sales: 32, revenue: 255.68 }
          ],
          topCustomers: [
            { email: "user1@gmail.com", totalSpent: 450.99, orders: 5 },
            { email: "pro@kibacheats.com", totalSpent: 320.00, orders: 3 },
            { email: "winner@discord.gg", totalSpent: 210.50, orders: 2 }
          ]
        })
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  if (loading) return <div className="p-10 text-center text-red-500 animate-pulse font-bold">ANALYZING STORE DATA...</div>

  const maxSales = Math.max(...(data?.topProducts.map(p => p.sales) || [100]))

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black text-white tracking-tight italic">ANALYTICS</h1>
        <p className="text-gray-400">Comprehensive performance breakdown for the last 30 days.</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Revenue" value={`$${data?.stats.totalRevenue.toFixed(2)}`} sub={`+$${data?.stats.todayRevenue.toFixed(2)} today`} icon={DollarSign} color="text-green-500" />
        <MetricCard title="Total Orders" value={data?.stats.totalOrders} sub={`+${data?.stats.todayOrders} today`} icon={ShoppingBag} color="text-red-500" />
        <MetricCard title="Customers" value={data?.stats.totalCustomers} sub="Lifetime unique" icon={Users} color="text-blue-500" />
        <MetricCard title="Avg. Order" value={`$${data?.stats.averageOrderValue.toFixed(2)}`} sub="Per transaction" icon={Activity} color="text-purple-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sales by Product */}
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" /> Top Selling Products
            </CardTitle>
            <CardDescription>Performance by sales volume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {data?.topProducts.map((product, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-white font-bold">{product.name}</span>
                  <span className="text-gray-500 text-sm">{product.sales} sales</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-1000"
                    style={{ width: `${(product.sales / maxSales) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Customers */}
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" /> Top Spenders
            </CardTitle>
            <CardDescription>Most valuable customers by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.topCustomers.map((customer, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-black">
                      {customer.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{customer.email}</p>
                      <p className="text-xs text-gray-500">{customer.orders} orders total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">${customer.totalSpent.toFixed(2)}</p>
                    <p className="text-[10px] text-green-500 uppercase tracking-widest">VIP Status</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MetricCard({ title, value, sub, icon: Icon, color }: any) {
  return (
    <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-md hover:bg-zinc-900/80 transition-all group overflow-hidden relative">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-[0.03] translate-x-8 -translate-y-8 rounded-full`} />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-400 group-hover:text-gray-200">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-black text-white">{value}</div>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          {sub}
        </p>
      </CardContent>
    </Card>
  )
}