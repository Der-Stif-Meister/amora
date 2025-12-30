import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import type { Product } from '../data/products'

export default function CategoryPage() {
  const { id } = useParams()
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products.json')
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
  }, [])

  const list = products.filter((p) => p.category.toLowerCase().includes((id || '').toLowerCase()))

  return (
    <div className="page">
      <h2>Category: {id}</h2>
      <div className="grid">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
