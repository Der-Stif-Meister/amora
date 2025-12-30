import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ProfilePage from './pages/ProfilePage'
import Wishlist from './pages/Wishlist'
import Navbar from './components/Navbar'
import Chatbot from './components/Chatbot'

export default function App() {
  return (
    <div className="app-root">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>

      <Chatbot />
    </div>
  )
}
