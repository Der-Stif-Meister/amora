import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import type { Product } from '../data/products'
import { useLocation } from 'react-router-dom'
import Carousel from '../components/Carousel'
import SkeletonCard from '../components/SkeletonCard'
import FilterDrawer from '../components/FilterDrawer'
import StyleQuiz from '../components/StyleQuiz'
import QuickView from '../components/QuickView'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [sortBy, setSortBy] = useState<string>('featured')
  const [activeFilters, setActiveFilters] = useState<{category?:string; maxPrice?:number}>({})
  const [quickProduct, setQuickProduct] = useState<any | null>(null)
  const location = useLocation()

  const query = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return (params.get('q') || '').toLowerCase().trim()
  }, [location.search])

  useEffect(() => {
    setLoading(true)
    fetch('/api/products.json')
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(()=>setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    let list = products.slice()
    if (activeFilters?.category) list = list.filter(p => p.category === activeFilters.category)
    if (activeFilters?.maxPrice && activeFilters.maxPrice > 0) list = list.filter(p => p.price <= (activeFilters.maxPrice || 0))
    if (query) list = list.filter((p) => (p.title + ' ' + (p.description || '')).toLowerCase().includes(query))
    // sorting
    if (sortBy === 'price-asc') list = list.sort((a,b)=>a.price-b.price)
    if (sortBy === 'price-desc') list = list.sort((a,b)=>b.price-a.price)
    if (sortBy === 'rating') list = list.sort((a,b)=>(b.rating||0)-(a.rating||0))
    return list
  }, [products, query, activeFilters])

  const applyFilters = (f:any) => {
    setFilterOpen(false)
    setActiveFilters(f || {})
  }

  useEffect(() => {
    const handler = (e: any) => setQuickProduct(e.detail)
    window.addEventListener('amora:quickview', handler)
    return () => window.removeEventListener('amora:quickview', handler)
  }, [])

  return (
    <div className="page home">
      <Carousel />

      <div className="actions-row">
        <button className="filter-btn" onClick={()=>setFilterOpen(true)}>Filters</button>
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} style={{padding:'8px 12px',borderRadius:8}} aria-label="Sort products">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
        <button className="quiz-open" onClick={()=>setQuizOpen(true)}>Take Style Quiz</button>
      </div>

      <section className="list">
        <h3>Trending Now</h3>
        <div className="grid">
          {loading ? Array.from({length:4}).map((_,i)=>(<SkeletonCard key={i}/>)) : filtered.slice(0, 6).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="list">
        <h3>Under ₵20</h3>
        <div className="grid">
          {loading ? Array.from({length:3}).map((_,i)=>(<SkeletonCard key={i}/>)) : filtered.filter((p) => p.price <= 20).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <FilterDrawer open={filterOpen} onClose={()=>setFilterOpen(false)} onApply={applyFilters} />
      <StyleQuiz open={quizOpen} onClose={()=>setQuizOpen(false)} />
      {quickProduct && <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} />}
    </div>
  )
}
