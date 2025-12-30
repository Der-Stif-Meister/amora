import React, { useEffect, useState } from 'react'
import { useWishlist } from '../hooks/useWishlist'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'

export default function Wishlist() {
  const { items } = useWishlist()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch('/api/products.json')
      .then(r => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const wishProducts = products.filter(p => items.includes(p.id))

  return (
    <div className="page">
      <h2>Your Wishlist</h2>
      <p style={{color:'#64748b'}}>{wishProducts.length ? `Saved items (${wishProducts.length})` : 'Your wishlist is empty'}</p>

      <div className="grid">
        {loading ? Array.from({length:4}).map((_,i)=>(<SkeletonCard key={i}/>)) : wishProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
