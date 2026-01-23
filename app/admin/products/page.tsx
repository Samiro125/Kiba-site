"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Product } from "@/lib/types"
import Image from "next/image"
import {
  Edit,
  Package,
  DollarSign,
  Star,
  TrendingUp,
  Search,
  Plus,
  Trash2,
  Save,
  X,
  Image as ImageIcon,
  Check,
  AlertCircle,
  MoreVertical,
  Filter
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // State for Modal/Form
  const [isEditing, setIsEditing] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [debugLog, setDebugLog] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products")
      if (res.ok) {
        setProducts(await res.json())
      }
    } catch (error) {
      console.error("Failed to fetch products", error)
    } finally {
      setLoading(false)
    }
  }

  // --- Actions ---

  const handleCreateNew = () => {
    setCurrentProduct({
      name: "",
      game: "",
      price: 0,
      category: "Game Cheat",
      status: "undetected",
      description: "",
      features: [],
      image: "",
      rating: 5,
      durations: []
    })
    setIsEditing(true)
  }

  const handleEditClick = (product: Product) => {
    // Deep copy to avoid mutating state directly
    setCurrentProduct(JSON.parse(JSON.stringify(product)))
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id))
        toast.success("Product deleted")
      } else {
        toast.error("Failed to delete product")
      }
    } catch (error) {
      toast.error("Error deleting product")
    }
  }

  const handleSave = async () => {
    if (!currentProduct) return
    setIsSaving(true)

    try {
      const isNew = !currentProduct.id
      const method = isNew ? "POST" : "PUT"
      const url = isNew ? "/api/products" : `/api/products/${currentProduct.id}`

      // Validation
      if (!currentProduct.name || !currentProduct.price) {
        alert("Name and Price are required")
        setIsSaving(false)
        return
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProduct)
      })

      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch (e) {
        throw new Error(`Server returned non-JSON: ${text.substring(0, 100)}...`)
      }

      if (res.ok) {
        toast.success(isNew ? "Product created!" : "Product updated!")
        await fetchProducts()
        setIsEditing(false)
        setCurrentProduct(null)
      } else {
        console.error("Save failed:", data)
        const errorMessage = data.error || 'Unknown error'
        toast.error(`Error: ${errorMessage}`)
        setDebugLog(JSON.stringify(data, null, 2))
      }
    } catch (error: any) {
      console.error("Error saving product", error)
      toast.error(`System error: ${error.message}`)
      setDebugLog(error.message + "\n" + (error.stack || ""))
    } finally {
      setIsSaving(false)
    }
  }

  // --- Form Helpers ---

  const updateField = (field: keyof Product, value: any) => {
    setCurrentProduct(prev => prev ? ({ ...prev, [field]: value }) : null)
  }

  const addFeature = () => {
    if (!currentProduct) return
    const newFeatures = [...(currentProduct.features || []), ""]
    updateField("features", newFeatures)
  }

  const updateFeature = (index: number, value: string) => {
    if (!currentProduct || !currentProduct.features) return
    const newFeatures = [...currentProduct.features]
    newFeatures[index] = value
    updateField("features", newFeatures)
  }

  const removeFeature = (index: number) => {
    if (!currentProduct || !currentProduct.features) return
    const newFeatures = currentProduct.features.filter((_, i) => i !== index)
    updateField("features", newFeatures)
  }

  const addDuration = () => {
    if (!currentProduct) return
    const newDurations = [...(currentProduct.durations || []), { duration: "1 Day", price: 0 }]
    updateField("durations", newDurations)
  }

  const updateDuration = (index: number, field: "duration" | "price", value: any) => {
    if (!currentProduct || !currentProduct.durations) return
    const newDurations = [...currentProduct.durations]
    // @ts-ignore
    newDurations[index][field] = value
    updateField("durations", newDurations)
  }

  const removeDuration = (index: number) => {
    if (!currentProduct || !currentProduct.durations) return
    const newDurations = currentProduct.durations.filter((_, i) => i !== index)
    updateField("durations", newDurations)
  }

  // --- Rendering ---

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.game.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeCount = products.filter(p => p.status === 'undetected').length
  const totalValue = products.reduce((acc, p) => acc + p.price, 0)

  return (
    <div className="space-y-8 relative min-h-screen pb-20">

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h2 className="text-3xl font-bold text-white">{products.length}</h2>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
              <Package className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Listings</p>
              <h2 className="text-3xl font-bold text-green-400">{activeCount}</h2>
            </div>
            <div className="p-3 bg-green-500/10 rounded-full text-green-400">
              <Check className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900/50 border-white/5 backdrop-blur-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Price</p>
              <h2 className="text-3xl font-bold text-yellow-400">${products.length ? (totalValue / products.length).toFixed(2) : 0}</h2>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-full text-yellow-400">
              <DollarSign className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-900/50 border-white/10 text-white focus:ring-red-500/50"
          />
        </div>
        <Button
          onClick={handleCreateNew}
          className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20 transition-all w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Product
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-20 text-gray-500 animate-pulse">Loading Catalog...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <Package className="w-16 h-16 text-zinc-800 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">No Products Found</h3>
            <p className="text-gray-500">Try adjusting your search or add a new product.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="bg-gradient-to-b from-zinc-900 to-black border border-white/5 overflow-hidden group hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-red-900/20"
            >
              <div className="relative h-48 overflow-hidden bg-black/50">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-zinc-700">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className={`${product.status === 'undetected' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                    product.status === 'updating' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                      'bg-red-500/20 text-red-400 border-red-500/30'
                    } border backdrop-blur-md uppercase text-[10px] tracking-wider`}>
                    {product.status}
                  </Badge>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge variant="outline" className="bg-black/50 border-white/10 text-xs backdrop-blur-md text-white">
                    {product.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-5">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.game}</p>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "fill-zinc-800 text-zinc-800"}`} />
                  ))}
                  <span className="text-xs text-zinc-500 ml-2">({product.rating.toFixed(1)})</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Base Price</span>
                    <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="h-9 w-9 bg-zinc-800/50 hover:bg-white/10 text-blue-400 hover:text-blue-300" onClick={() => handleEditClick(product)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-9 w-9 bg-zinc-800/50 hover:bg-red-500/20 text-red-400 hover:text-red-300" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* --- EDIT / CREATE MODAL --- */}
      {isEditing && currentProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">

            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10 bg-zinc-900/50">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {currentProduct.id ? "Edit Product" : "Create Product"}
                </h2>
                <p className="text-sm text-gray-400">Configure product details, pricing, and features.</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsEditing(false)} className="hover:bg-white/10 rounded-full">
                <X className="w-6 h-6 text-gray-400" />
              </Button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

              {/* Section: Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-red-500" /> Basic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Product Name *</Label>
                    <Input
                      value={currentProduct.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="bg-black/40 border-white/10 text-white focus:border-red-500/50"
                      placeholder="e.g. Apex Legends Aimbot"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Game Title</Label>
                    <Input
                      value={currentProduct.game}
                      onChange={(e) => updateField("game", e.target.value)}
                      className="bg-black/40 border-white/10 text-white"
                      placeholder="e.g. Apex Legends"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Category</Label>
                    <select
                      value={currentProduct.category}
                      onChange={(e) => updateField("category", e.target.value)}
                      className="w-full h-10 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
                    >
                      <option value="Game Cheat">Game Cheat</option>
                      <option value="Spoofer">Spoofer</option>
                      <option value="Account">Account</option>
                      <option value="Tool">Tool</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Status</Label>
                    <div className="flex gap-4">
                      <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors flex-1 ${currentProduct.status === 'undetected' ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30'}`}>
                        <input
                          type="radio"
                          name="status"
                          checked={currentProduct.status === 'undetected'}
                          onChange={() => updateField("status", "undetected")}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-center w-full gap-2">
                          <div className={`w-2 h-2 rounded-full ${currentProduct.status === 'undetected' ? 'bg-green-500' : 'bg-gray-600'}`} />
                          <span className="font-bold uppercase text-xs">Undetected</span>
                        </div>
                      </label>

                      <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors flex-1 ${currentProduct.status === 'updating' ? 'bg-orange-500/20 border-orange-500 text-orange-500' : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30'}`}>
                        <input
                          type="radio"
                          name="status"
                          checked={currentProduct.status === 'updating'}
                          onChange={() => updateField("status", "updating")}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-center w-full gap-2">
                          <div className={`w-2 h-2 rounded-full ${currentProduct.status === 'updating' ? 'bg-orange-500' : 'bg-gray-600'}`} />
                          <span className="font-bold uppercase text-xs">Updating</span>
                        </div>
                      </label>

                      <label className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors flex-1 ${currentProduct.status === 'down' ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30'}`}>
                        <input
                          type="radio"
                          name="status"
                          checked={currentProduct.status === 'down'}
                          onChange={() => updateField("status", "down")}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-center w-full gap-2">
                          <div className={`w-2 h-2 rounded-full ${currentProduct.status === 'down' ? 'bg-red-500' : 'bg-gray-600'}`} />
                          <span className="font-bold uppercase text-xs">Down</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Description</Label>
                  <Textarea
                    value={currentProduct.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="bg-black/40 border-white/10 text-white min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Image URL</Label>
                  <div className="flex gap-4">
                    <Input
                      value={currentProduct.image}
                      onChange={(e) => updateField("image", e.target.value)}
                      className="bg-black/40 border-white/10 text-white flex-1"
                      placeholder="https://..."
                    />
                    <div className="w-10 h-10 bg-zinc-800 rounded border border-white/10 overflow-hidden relative">
                      {currentProduct.image ? (
                        <Image src={currentProduct.image} alt="Preview" fill className="object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Pricing & Variants */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" /> Pricing & Variants
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Base Price ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={currentProduct.price}
                      onChange={(e) => updateField("price", parseFloat(e.target.value))}
                      className="bg-black/40 border-white/10 text-white font-mono text-lg"
                    />
                    <p className="text-xs text-gray-500">This is the default displayed price.</p>
                  </div>
                </div>

                <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-gray-300">Subscription Durations</Label>
                    <Button size="sm" variant="outline" onClick={addDuration} className="h-7 border-white/10 hover:bg-white/5">
                      <Plus className="w-3 h-3 mr-1" /> Add Variant
                    </Button>
                  </div>

                  {!currentProduct.durations?.length && (
                    <p className="text-sm text-gray-500 italic text-center py-4">No variants added. Product will sell at Base Price.</p>
                  )}

                  {currentProduct.durations?.map((dur, idx) => (
                    <div key={idx} className="flex gap-3 items-center animate-in slide-in-from-left-2 duration-200">
                      <Input
                        placeholder="Name (e.g. 1 Month)"
                        value={dur.duration}
                        onChange={(e) => updateDuration(idx, "duration", e.target.value)}
                        className="bg-black/40 border-white/10 text-white h-9"
                      />
                      <div className="relative w-32">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <Input
                          type="number"
                          step="0.01"
                          value={dur.price}
                          onChange={(e) => updateDuration(idx, "price", parseFloat(e.target.value))}
                          className="bg-black/40 border-white/10 text-white h-9 pl-6"
                        />
                      </div>
                      <Button size="icon" variant="ghost" className="h-9 w-9 text-red-400 hover:bg-red-500/10" onClick={() => removeDuration(idx)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Features */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-500" /> Features List
                </h3>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
                  {currentProduct.features?.map((feat, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Check className="w-4 h-4 text-blue-400" />
                      </div>
                      <Input
                        value={feat}
                        onChange={(e) => updateFeature(idx, e.target.value)}
                        className="bg-black/40 border-white/10 text-white h-10"
                        placeholder="Feature description..."
                      />
                      <Button size="icon" variant="ghost" onClick={() => removeFeature(idx)} className="text-gray-500 hover:text-white">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addFeature} className="w-full border-dashed border-white/10 hover:border-white/30 hover:bg-white/5 text-gray-400">
                    <Plus className="w-4 h-4 mr-2" /> Add Feature Line
                  </Button>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 bg-zinc-900/50 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-white">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-900/20 px-8"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </div>
                )}
              </Button>
            </div>

            {debugLog && (
              <div className="p-4 bg-red-950/50 border-t border-red-500/20">
                <p className="text-red-400 text-xs font-bold mb-2 uppercase">Debug Log:</p>
                <ScrollArea className="h-32 rounded border border-red-500/10 bg-black/50">
                  <pre className="text-xs text-red-300 p-3 font-mono">
                    {debugLog}
                  </pre>
                </ScrollArea>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}