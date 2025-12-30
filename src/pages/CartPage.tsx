import React from 'react'
import { useCart } from '../hooks/useCart'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const { items, remove, clear } = useCart()

  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0)

  return (
    <div className="page cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 && (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/">Continue shopping</Link>
        </div>
      )}

      {items.map((it) => (
        <div key={it.product.id + (it.size || '')} className="cart-item">
          <img src={it.product.images[0]} alt={it.product.title} />
          <div className="ci-info">
            <div className="ci-title">{it.product.title}</div>
            <div>Size: {it.size || '-'}</div>
            <div>Qty: {it.qty}</div>
          </div>
          <div className="ci-actions">
            <div className="ci-price">{it.product.currency} {it.product.price * it.qty}</div>
            <button onClick={() => remove(it.product.id, it.size)}>Remove</button>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <div className="cart-summary">
          <div>Total: GHS {total}</div>
          <div>
            <button onClick={clear}>Clear</button>
            <Link to="/checkout"><button>Checkout</button></Link>
          </div>
        </div>
      )}
    </div>
  )
}
