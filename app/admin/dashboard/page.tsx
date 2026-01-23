"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DollarSign, ShoppingBag, Users, Activity, TrendingUp } from "lucide-react"
import { Stats, RevenueData } from "@/lib/types"

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  function formatTime(dateString: string) {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  useEffect(() => {
    fetch("/api/admin/stats?days=14")
      .then(res => res.json())
      .then(data => {
        if (data.stats) {
          setStats(data.stats)
          setRevenueData(data.revenueData || [])
          setRecentActivity(data.recentActivity || [])
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="h-96 flex items-center justify-center text-red-500 animate-pulse">Initializing System...</div>

  // Process data for chart
  const chartData = revenueData.length > 0 ? revenueData : []
  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 100)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Overview</h1>
        <p className="text-gray-400">Live store performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue.toFixed(2) || "0.00"}`}
          sub={`Today: +$${stats?.todayRevenue.toFixed(2)}`}
          icon={DollarSign}
          color="text-red-500"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          sub={`Today: +${stats?.todayOrders}`}
          icon={ShoppingBag}
          color="text-blue-500"
        />
        <StatCard
          title="Customers"
          value={stats?.totalCustomers || 0}
          sub="Lifetime unique"
          icon={Users}
          color="text-purple-500"
        />
        <StatCard
          title="Inventory"
          value={stats?.activeLicenseKeys || 0}
          sub="Keys available"
          icon={Activity}
          color="text-green-500"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 bg-zinc-900/50 border-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" /> Revenue Trend
            </CardTitle>
            <CardDescription>Performance over the last 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex items-end justify-between gap-2 px-2 pt-10">
              {chartData.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-gray-500">No revenue data available yet.</div>
              ) : chartData.map((d, i) => {
                const height = (d.revenue / maxRevenue) * 100
                return (
                  <div key={i} className="group relative flex-1 h-full flex items-end">
                    <div
                      className="w-full bg-zinc-800 rounded-t-sm hover:bg-red-600 transition-all duration-300 relative min-h-[4px]"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black border border-white/10 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-xl">
                        <span className="font-bold">${d.revenue.toFixed(2)}</span>
                        <br />
                        <span className="text-gray-400">{d.date}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between px-2 text-xs text-gray-600 mt-2 border-t border-white/5 pt-2">
              <span>{chartData[0]?.date || "Start"}</span>
              <span>{chartData[chartData.length - 1]?.date || "Today"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription>Latest store events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.length === 0 ? (
                <div className="text-gray-500 text-sm">No activity recorded recently.</div>
              ) : (
                recentActivity.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 animate-in slide-in-from-left duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className={`w-2 h-2 rounded-full ${item.type === 'order' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{item.user}</p>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{item.product} • {formatTime(item.date)}</p>
                    </div>
                    <div className={`text-xs font-black ${item.type === 'order' ? 'text-green-500' : 'text-blue-500'}`}>{item.amount}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, sub, icon: Icon, color }: any) {
  return (
    <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm hover:bg-zinc-900/80 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-gray-500 mt-1">{sub}</p>
      </CardContent>
    </Card>
  )
}