import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)

  const startCheckout = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/create-checkout-session`, { method: 'POST', headers: { 'Content-Type': 'application/json' } })
      const data = await res.json()
      if (data && data.url) {
        // redirect to returned url (mock)
        window.location.href = data.url
      } else {
        alert('Failed to create checkout session')
      }
    } catch (e) {
      alert('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page checkout-page">
      <h2>Checkout</h2>
      <p>This is a mock checkout page. Click below to simulate a payment flow.</p>
      <div>
        <button onClick={startCheckout} disabled={loading} className="checkout-button">{loading ? 'Redirecting...' : 'Proceed to Payment'}</button>
      </div>
    </div>
  )
}
