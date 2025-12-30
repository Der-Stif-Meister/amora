import React, { useEffect, useState } from 'react'
import type { Product } from '../data/products'
import { useCart } from '../hooks/useCart'

export default function QuickView({ product, onClose }:{ product: Product | null; onClose: ()=>void }){
  const { add } = useCart()
  const [idx, setIdx] = useState(0)
  useEffect(() => setIdx(0), [product])

  if (!product) return null

  const imgs = product.images && product.images.length ? product.images : ['/placeholder-person.svg']

  const next = () => setIdx((i) => (i + 1) % imgs.length)
  const prev = () => setIdx((i) => (i - 1 + imgs.length) % imgs.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [imgs.length])

  return (
    <div className="quickview-overlay" onClick={onClose}>
      <div className="quickview-card" onClick={(e)=>e.stopPropagation()}>
        <button className="qv-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="qv-grid">
          <div className="qv-media">
            <button className="qv-arrow left" onClick={prev} aria-label="Previous image">◀</button>
            <div className="img-wrapper qv-main-wrapper">
              <img loading="lazy" className="qv-main-img img-loading" src={imgs[idx]} alt={`${product.title} ${idx+1}`} onLoad={(e:any)=>{ e.currentTarget.classList.remove('img-loading'); e.currentTarget.classList.add('img-loaded')}} onError={(e:any)=>{ e.currentTarget.src='/placeholder-person.svg' }} />
              <div className="img-placeholder" aria-hidden="true"></div>
            </div>
            <button className="qv-arrow right" onClick={next} aria-label="Next image">▶</button>
            <div className="qv-thumbs">
              {imgs.map((u, i) => (
                <button key={i} className={`qv-thumb ${i===idx? 'on':''}`} onClick={() => setIdx(i)} aria-label={`View image ${i+1}`}>
                  <img loading="lazy" src={u} alt={`thumb ${i+1}`} className="thumb-img img-loading" onLoad={(e:any)=>{ e.currentTarget.classList.remove('img-loading'); e.currentTarget.classList.add('img-loaded')}} onError={(e:any)=>{ e.currentTarget.src='/placeholder-person.svg' }} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3>{product.title}</h3>
            <div className="qv-price">{product.currency} {product.price}</div>
            <p>{product.description}</p>
            <div className="qv-actions">
              <button onClick={()=>{ add(product,1); alert('Added to cart') }}>Add to cart</button>
              <a href={`/product/${product.id}`}>Open product page</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
