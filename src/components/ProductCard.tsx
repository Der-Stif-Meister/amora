import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../data/products'
import { useWishlist } from '../hooks/useWishlist'

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { toggle, has } = useWishlist()
  const [wish, setWish] = useState(false)

  React.useEffect(() => {
    setWish(has(product.id))
  }, [product.id, has])

  const badge = product.price <= 10 ? 'Under ₵10' : product.price <= 20 ? 'Under ₵20' : product.price <= 30 ? 'Hot' : ''

  return (
    <div className="product-card">
      <div className="media-wrap img-wrapper">
        <Link to={`/product/${product.id}`}>
          <img loading="lazy" className="card-img img-loading" src={product.images[0]} alt={product.title} onLoad={(e:any)=>{ e.currentTarget.classList.remove('img-loading'); e.currentTarget.classList.add('img-loaded')}} onError={(e:any)=>{ e.currentTarget.src='/placeholder-person.svg' }} />
          <div className="img-placeholder" aria-hidden="true"></div>
        </Link>
        <div className="badges">
          {badge && <span className="badge sale">{badge}</span>}
          {product.rating && <span className="badge rate">★ {product.rating}</span>}
        </div>
        <div className="hover-actions">
          <button className={`wish ${wish? 'on':''}`} onClick={() => { toggle(product.id); setWish(!wish) }} aria-label="Add to wishlist">{wish? '♥':'♡'}</button>
          <button className="quick" onClick={() => window.dispatchEvent(new CustomEvent('amora:quickview', { detail: product }))}>Quick View</button>
        </div>
      </div>
      <div className="info">
        <Link to={`/product/${product.id}`} className="title">{product.title}</Link>
        <div className="price">{product.currency || 'GHS'} {product.price}</div>
      </div>
    </div>
  )
}

export default ProductCard
