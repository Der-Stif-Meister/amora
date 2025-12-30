import { useEffect, useState } from 'react'

const W_KEY = 'amora_wishlist_v1'

export function useWishlist() {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(W_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      setItems([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(W_KEY, JSON.stringify(items))
  }, [items])

  const toggle = (id: string) => {
    setItems((cur) => (cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id]))
  }

  const has = (id: string) => items.includes(id)

  return { items, toggle, has }
}
