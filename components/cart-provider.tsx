"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface CartItem {
    id: string
    productId: string
    name: string
    duration: string
    price: number
    image: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, delta: number) => void
    clearCart: () => void
    total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('kiba_cart')
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
    }, [])

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('kiba_cart', JSON.stringify(items))
    }, [items])

    const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
        setItems(prev => {
            const existing = prev.find(i => i.productId === newItem.productId && i.duration === newItem.duration)
            if (existing) {
                toast.success(`Increased quantity of ${newItem.name} (${newItem.duration})`)
                return prev.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i)
            }
            toast.success(`Added ${newItem.name} (${newItem.duration}) to cart`)
            return [...prev, { ...newItem, id: Math.random().toString(36).substr(2, 9), quantity: 1 }]
        })
    }

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id))
        toast.info("Item removed from cart")
    }

    const updateQuantity = (id: string, delta: number) => {
        setItems(prev => prev.map(i => {
            if (i.id === id) {
                const newQty = Math.max(1, i.quantity + delta)
                return { ...i, quantity: newQty }
            }
            return i
        }))
    }

    const clearCart = () => setItems([])

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within CartProvider')
    return context
}
