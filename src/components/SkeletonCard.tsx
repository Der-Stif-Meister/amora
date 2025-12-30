import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="product-card skeleton">
      <div className="media-wrap sh" />
      <div className="info">
        <div className="sh title-sh" />
        <div className="sh price-sh" />
      </div>
    </div>
  )
}
