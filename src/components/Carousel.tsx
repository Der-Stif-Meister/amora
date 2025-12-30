import React, { useEffect, useState } from 'react'

const slides = [
  { id: 's1', title: 'New Arrivals', subtitle: 'Fresh styles every week', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1600&q=80&auto=format&fit=crop' },
  { id: 's2', title: 'Flash Sale', subtitle: 'Up to 50% off selected items', image: 'https://images.unsplash.com/photo-1520975919551-9a3a3d1b7b05?w=1600&q=80&auto=format&fit=crop' },
  { id: 's3', title: 'Trending Now', subtitle: 'Curated picks for you', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1600&q=80&auto=format&fit=crop' }
]

export default function Carousel() {
  const [index, setIndex] = useState(0)
  const [countdown, setCountdown] = useState<string>('')

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500)
    return () => clearInterval(t)
  }, [])

  // simple flash sale countdown to a fixed time (24h from now for demo)
  useEffect(() => {
    const target = Date.now() + 24 * 60 * 60 * 1000
    const id = setInterval(() => {
      const diff = Math.max(0, target - Date.now())
      const hrs = Math.floor(diff / (1000 * 60 * 60))
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const secs = Math.floor((diff % (1000 * 60)) / 1000)
      setCountdown(`${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`)
      if (diff <= 0) clearInterval(id)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="carousel">
      {slides.map((s, i) => (
        <div key={s.id} className={`slide ${i === index ? 'active' : ''} ${s.id==='s2' ? 'sale-slide' : ''}`}>
          <div className="slide-img-wrapper">
            <img loading="lazy" className="slide-img img-loading" src={s.image} alt={s.title} onLoad={(e:any)=>{ e.currentTarget.classList.remove('img-loading'); e.currentTarget.classList.add('img-loaded')}} onError={(e:any)=>{ e.currentTarget.style.display='none' }} />
            <div className="img-placeholder" aria-hidden="true"></div>
          </div>
          <div className="slide-content">
            <div className="promo-chips">
              <span className="chip">Free shipping</span>
              {s.id === 's2' && <span className="chip sale">Flash Sale</span>}
            </div>
            <h3>{s.title}</h3>
            <p>{s.subtitle}</p>
            {s.id === 's2' && (
              <div className="hero-cta">
                <button className="checkout-button" onClick={() => { window.location.href = '/category/women' }}>Shop Now</button>
                <div className="countdown">Ends in <strong>{countdown}</strong></div>
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button key={i} className={`dot ${i===index?'on':''}`} onClick={() => setIndex(i)} aria-label={`Go to slide ${i+1}`} />
        ))}
      </div>
    </div>
  )
}
