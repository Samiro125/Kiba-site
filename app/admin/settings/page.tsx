"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, CreditCard, Save, Loader2 } from "lucide-react"
import { toast } from "sonner" // Ensure you have installed sonner

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // State matches the backend default structure
  const [data, setData] = useState({
    storeName: "",
    supportEmail: "",
    currency: "USD",
    webhookSecret: ""
  })

  // Load Settings on Mount
  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load")
        return res.json()
      })
      .then(setData)
      .catch(() => toast.error("Could not load settings"))
      .finally(() => setLoading(false))
  }, [])

  // Save Settings
  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        toast.success("Settings saved successfully!")
      } else {
        throw new Error("Save failed")
      }
    } catch (e) {
      toast.error("Failed to save settings. Check console.")
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  if (loading) return <div className="p-10 text-center text-gray-500 animate-pulse">Loading Configuration...</div>

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-24">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage global store configuration.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-zinc-900/50 border border-white/5 p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">General</TabsTrigger>
          <TabsTrigger value="payment" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Payments</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white"><Settings className="w-5 h-5" /> Store Details</CardTitle>
              <CardDescription>Basic information visible to customers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-gray-300">Store Name</Label>
                <Input
                  value={data.storeName}
                  onChange={e => handleChange("storeName", e.target.value)}
                  className="bg-black/40 border-white/10 text-white focus:border-red-500/50"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-300">Support Email</Label>
                <Input
                  value={data.supportEmail}
                  onChange={e => handleChange("supportEmail", e.target.value)}
                  className="bg-black/40 border-white/10 text-white focus:border-red-500/50"
                />
              </div>
              <div className="grid gap-2">
                <Label className="text-gray-300">Currency</Label>
                <Input
                  value={data.currency}
                  onChange={e => handleChange("currency", e.target.value)}
                  className="bg-black/40 border-white/10 text-white w-24 focus:border-red-500/50"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment">
          <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white"><CreditCard className="w-5 h-5" /> Fanbasis Integration</CardTitle>
              <CardDescription>Configure payment gateway connection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label className="text-gray-300">Webhook Secret</Label>
                <Input
                  type="password"
                  value={data.webhookSecret}
                  onChange={e => handleChange("webhookSecret", e.target.value)}
                  className="bg-black/40 border-white/10 text-white font-mono"
                  placeholder="whsec_..."
                />
                <p className="text-xs text-gray-500">Used to verify that purchase events are actually coming from Fanbasis.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end sticky bottom-6">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white min-w-[140px] shadow-lg shadow-red-900/20 transition-all"
        >
          {saving ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4 mr-2" /> Save Changes</>
          )}
        </Button>
      </div>
    </div>
  )
}