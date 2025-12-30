export type Product = {
  id: string
  title: string
  price: number
  currency?: string
  images: string[]
  category: string
  rating?: number
  reviews?: number
  description?: string
}

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Blue Summer Dress',
    price: 18,
    currency: 'GHS',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975919551-9a3a3d1b7b05?w=1200&q=80&auto=format&fit=crop',
    ],
    category: 'Women',
    rating: 4.5,
    reviews: 52,
    description: 'Lightweight blue dress perfect for summer events.'
  },
  {
    id: 'p2',
    title: 'Everyday Midi Dress',
    price: 16,
    currency: 'GHS',
    images: [
      'https://images.unsplash.com/photo-1520975919551-9a3a3d1b7b05?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1200&q=80&auto=format&fit=crop'
    ],
    category: 'Women',
    rating: 4.3,
    reviews: 31,
    description: 'Light and comfortable midi dress for everyday wear.'
  },
  {
    id: 'p3',
    title: 'Strappy Summer Dress',
    price: 22,
    currency: 'GHS',
    images: [
      'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975919551-9a3a3d1b7b05?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80&auto=format&fit=crop'
    ],
    category: 'Women',
    rating: 4.6,
    reviews: 42,
    description: 'Lightweight strappy dress perfect for warm days.'
  },
  {
    id: 'p4',
    title: 'Plus Size Wrap Dress',
    price: 20,
    currency: 'GHS',
    images: ['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1000&q=80&auto=format&fit=crop'],
    category: 'Plus Size',
    rating: 4.4,
    reviews: 18,
    description: 'Comfortable wrap dress for all-day wear.'
  },
  {
    id: 'p5',
    title: 'Floral Wrap Dress',
    price: 28,
    currency: 'GHS',
    images: [
      'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520975919551-9a3a3d1b7b05?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1200&q=80&auto=format&fit=crop'
    ],
    category: 'Women',
    rating: 4.5,
    reviews: 28,
    description: 'Flattering wrap dress with a delicate floral print.'
  }
]
