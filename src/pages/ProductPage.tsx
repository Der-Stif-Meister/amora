import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Product } from '../data/products'
import { useCart } from '../hooks/useCart'

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const { add } = useCart()
  const [size, setSize] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!id) return
    fetch('/api/products.json')
      .then((r) => r.json())
      .then((data: Product[]) => {
        const p = data.find((item) => item.id === id) || null
        setProduct(p)
      })
      .catch(() => setProduct(null))
  }, [id])

  if (!product) return <div className="page">Product not found</div>

  return (
    <div className="page product-page">
      <div className="product-grid">
        <div className="media">
          <img src={product.images[0]} alt={product.title} />
        </div>
        <div className="meta">
          <h2>{product.title}</h2>
          <div className="price">{product.currency} {product.price}</div>
          <div className="desc">{product.description}</div>

          <div className="selectors">
            <label>
              Size
              <select value={size} onChange={(e) => setSize(e.target.value)}>
                <option value="">Select</option>
                <option>XS</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </label>
          </div>

          <div className="actions">
            <button onClick={() => add(product, 1, size)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
