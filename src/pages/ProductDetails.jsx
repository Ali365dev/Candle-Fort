import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Minus, Plus, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { placeholderProducts } from '../data/homeContent.js'
import { firebaseConfigured } from '../services/firebase.js'
import { getProduct } from '../services/productService.js'
import { normalizeProduct, withFallbackImage } from '../utils/formatProduct.js'
import { formatCurrency } from '../utils/formatCurrency.js'

function ProductDetails() {
  const { productId } = useParams()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const productQuery = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    enabled: firebaseConfigured && !productId.startsWith('placeholder'),
    retry: 1,
  })
  const fallback = placeholderProducts.find((item) => item.id === productId)
  const product = productQuery.data?.active !== false && productQuery.data
    ? withFallbackImage(normalizeProduct(productQuery.data), fallback?.imageUrl)
    : fallback

  if (productQuery.isLoading) return <main className="store-page"><div className="store-empty">Loading candle details…</div></main>
  if (!product) return <main className="store-page"><div className="store-empty"><h1>This candle isn’t available</h1><p>It may have been removed from the collection.</p><Link className="store-button" to="/shop"><ArrowLeft size={16} /> Back to the shop</Link></div></main>

  function handleAdd() {
    addItem({ id: product.id, name: product.name, price: Number(product.price), imageUrl: product.imageUrl }, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  const description = product.description || 'A hand-finished candle made to add a little warmth and magic to your everyday moments.'

  return (
    <main className="store-page product-page">
      <div className="store-breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/shop">Shop</Link><span>/</span><span>{product.name}</span></div>
      <section className="product-detail-grid">
        <div className="product-detail-photo"><img src={product.imageUrl} alt={product.name} /></div>
        <div className="product-detail-copy">
          <p className="store-eyebrow">Handcrafted with care</p>
          <h1>{product.name}</h1>
          <div className="product-detail-rating" aria-label={`${product.rating || 5} out of 5 stars`}>★★★★★ <span>Made with care by Candle Fort</span></div>
          <p className="product-detail-price">{formatCurrency(product.price)}</p>
          <p className="product-detail-description">{description}</p>
          <div className="detail-quantity-row"><span>Quantity</span><div className="quantity-stepper"><button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={15} /></button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => value + 1)}><Plus size={15} /></button></div></div>
          <button className="store-button product-add-button" type="button" onClick={handleAdd}>{added ? 'Added to your bag' : 'Add to Cart'} <Plus size={17} /></button>
          <Link className="product-buy-link" to="/cart">View your shopping bag</Link>
          <div className="product-perks"><div><Truck size={18} /><span>Delivery across Pakistan</span></div><div><ShieldCheck size={18} /><span>Easy returns</span></div><div><Sparkles size={18} /><span>Thoughtfully made</span></div></div>
          <details className="product-detail-accordion" open><summary>About this candle</summary><p>{description}</p></details>
          <details className="product-detail-accordion"><summary>Shipping &amp; returns</summary><p>Orders are delivered across Pakistan. If your candle arrives damaged, contact us with your order details so we can help.</p></details>
          <details className="product-detail-accordion"><summary>Candle care</summary><p>Trim the wick before each burn, use a heat-safe surface, and never leave a lit candle unattended.</p></details>
        </div>
      </section>
    </main>
  )
}

export default ProductDetails
