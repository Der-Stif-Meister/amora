import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'

export default function Navbar() {
  const [q, setQ] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { items } = useCart()
  const { items: wishItems } = useWishlist()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate(`/?q=${encodeURIComponent(q)}`)
  }

  const cartCount = items.reduce((s, it) => s + it.qty, 0)

  return (
    <nav className="nav sticky">
      <div className="nav-left">
        <Link to="/" className="brand"><img src="/logo.svg" alt="Amora" style={{height:28}}/></Link>
        <div className="nav-links">
          <Link to="/category/women">Women</Link>
          <Link to="/category/men">Men</Link>
          <Link to="/category/plus">Plus Size</Link>
        </div>
      </div>

      <form className="nav-search" onSubmit={submit}>
        <input aria-label="Search" placeholder="Search products, e.g. 'blue dress'" value={q} onChange={(e) => setQ(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <div className="nav-right">
        <Link to="/cart">Cart{cartCount > 0 ? ` (${cartCount})` : ''}</Link>
        <Link to="/wishlist">Wishlist{wishItems && wishItems.length ? ` (${wishItems.length})` : ''}</Link>
        <Link to="/profile">Profile</Link>
        <button className="quiz-btn" onClick={() => navigate('#style-quiz')}>Style Quiz</button>
      </div>

      <button className="mobile-toggle" aria-label="Menu" onClick={() => setMobileOpen((s) => !s)}>
        ☰
      </button>

      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/category/women" onClick={() => setMobileOpen(false)}>Women</Link>
          <Link to="/category/men" onClick={() => setMobileOpen(false)}>Men</Link>
          <Link to="/category/plus" onClick={() => setMobileOpen(false)}>Plus Size</Link>
          <Link to="/cart" onClick={() => setMobileOpen(false)}>Cart{cartCount > 0 ? ` (${cartCount})` : ''}</Link>
          <Link to="/wishlist" onClick={() => setMobileOpen(false)}>Wishlist{wishItems && wishItems.length ? ` (${wishItems.length})` : ''}</Link>
          <Link to="/profile" onClick={() => setMobileOpen(false)}>Profile</Link>
        </div>
      )}
    </nav>
  )
}
