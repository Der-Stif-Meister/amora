import React, { useState } from 'react'

export default function FilterDrawer({ open, onClose, onApply }: { open: boolean; onClose: ()=>void; onApply: (filters:any)=>void }) {
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState(0)

  if (!open) return null

  return (
    <div className="filter-drawer">
      <div className="fd-head">
        <h3>Filters</h3>
        <button onClick={onClose}>Close</button>
      </div>

      <div className="fd-body">
        <label>Category
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Plus Size">Plus Size</option>
            <option value="Accessories">Accessories</option>
          </select>
        </label>

        <label>Max price (GHS)
          <input type="number" value={maxPrice||''} onChange={(e)=>setMaxPrice(Number(e.target.value))} />
        </label>
      </div>

      <div className="fd-footer">
        <button onClick={()=>{ setCategory(''); setMaxPrice(0); onApply({}) }}>Reset</button>
        <button onClick={()=>onApply({ category, maxPrice })}>Apply</button>
      </div>
    </div>
  )
}
