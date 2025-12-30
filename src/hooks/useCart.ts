import { useEffect, useState } from 'react'
import { Product } from '../data/products'

export type CartItem = { product: Product; qty: number; size?: string }

const CART_KEY = 'amora_cart_v1'

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      setItems([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const add = (product: Product, qty = 1, size?: string) => {
    setItems((cur) => {
      const found = cur.find((c) => c.product.id === product.id && c.size === size)
      if (found) {
        return cur.map((c) => (c.product.id === product.id && c.size === size ? { ...c, qty: c.qty + qty } : c))
      }
      return [...cur, { product, qty, size }]
    })
  }

  const remove = (productId: string, size?: string) => {
    setItems((cur) => cur.filter((c) => !(c.product.id === productId && c.size === size)))
  }

  const clear = () => setItems([])

  return { items, add, remove, clear }
}
