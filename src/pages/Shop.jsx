import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { ArrowRight, SlidersHorizontal } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import ProductCard from '../components/ui/ProductCard.jsx'
import { placeholderProducts } from '../data/homeContent.js'
import { firebaseConfigured } from '../services/firebase.js'
import { getProducts } from '../services/productService.js'
import { normalizeProduct, withFallbackImage } from '../utils/formatProduct.js'

const categories = [
  { value: '', label: 'All candles' },
  { value: 'cake', label: 'Cake candles' },
  { value: 'gift', label: 'Gifts & favors' },
  { value: 'scented', label: 'Scented candles' },
  { value: 'decorative', label: 'Decorative candles' },
]

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('featured')
  const category = searchParams.get('category') || ''
  const search = searchParams.get('q') || ''
  const productsQuery = useQuery({
    queryKey: ['products', 'shop'],
    queryFn: getProducts,
    enabled: firebaseConfigured,
    retry: 1,
  })

  const products = (productsQuery.data ?? [])
    .filter((product) => product.active !== false)
    .map(normalizeProduct)
    .map((product, index) => withFallbackImage(product, placeholderProducts[index % placeholderProducts.length].imageUrl))
  const catalog = products.length ? products : placeholderProducts
  const visibleProducts = useMemo(() => {
    const filtered = catalog.filter((product) => {
      const nameMatch = `${product.name} ${product.description || ''}`.toLowerCase().includes(search.toLowerCase())
      const productCategory = String(product.category || product.type || '').toLowerCase()
      const categoryMatch = !category || productCategory.includes(category) || (!productCategory && !firebaseConfigured)
      return nameMatch && categoryMatch
    })

    if (sort === 'price-low') return [...filtered].sort((a, b) => Number(a.price) - Number(b.price))
    if (sort === 'price-high') return [...filtered].sort((a, b) => Number(b.price) - Number(a.price))
    return filtered
  }, [catalog, category, search, sort])

  function updateCategory(value) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('category', value)
    else next.delete('category')
    setSearchParams(next)
  }

  return (
    <main className="store-page">
      <div className="store-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Shop</span></div>
      <section className="shop-heading">
        <p className="store-eyebrow">Made for your moments</p>
        <h1>Shop Candles</h1>
        <p>Handcrafted candles and thoughtful gifts to make every moment feel special.</p>
      </section>

      <nav className="shop-categories" aria-label="Shop by category">
        {categories.map((item) => <button className={category === item.value ? 'selected' : ''} key={item.value || 'all'} type="button" onClick={() => updateCategory(item.value)}>{item.label}</button>)}
      </nav>

      <div className="shop-toolbar">
        <p>{visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}</p>
        <label><SlidersHorizontal size={15} /><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
      </div>

      {productsQuery.isLoading ? <div className="store-empty">Loading our candle collection…</div> : null}
      {productsQuery.isError ? <p className="store-message" role="status">We couldn’t load the latest products. Showing our featured candles instead.</p> : null}
      {!productsQuery.isLoading && visibleProducts.length ? <div className="catalog-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : null}
      {!productsQuery.isLoading && !visibleProducts.length ? <div className="store-empty"><h2>No candles found</h2><p>Try another search or browse all candles.</p><button type="button" onClick={() => { setSearchParams({}); setSort('featured') }}>Show all candles <ArrowRight size={15} /></button></div> : null}
    </main>
  )
}

export default Shop
