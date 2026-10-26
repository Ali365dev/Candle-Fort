import { Link } from 'react-router'
import { ArrowLeft, ArrowRight, Heart, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { formatCurrency } from '../utils/formatCurrency.js'

function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart()

  return (
    <main className="store-page cart-page">
      <div className="store-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Shopping bag</span></div>
      <div className="cart-title-row"><div><p className="store-eyebrow">Your favorites, together</p><h1>Shopping Bag</h1></div><span>{items.length} {items.length === 1 ? 'item' : 'items'}</span></div>
      {!items.length ? <section className="cart-empty"><span><Heart size={26} /></span><h2>Your bag is waiting for a little magic</h2><p>Find a candle or thoughtful gift for your next special moment.</p><Link className="store-button" to="/shop">Explore the collection <ArrowRight size={16} /></Link></section> : (
        <div className="cart-layout">
          <section className="cart-items-panel" aria-label="Items in your shopping bag">
            <div className="cart-items-heading"><span>Product</span><span>Quantity</span><span>Total</span></div>
            {items.map(({ product, quantity }) => <article className="cart-line-item" key={product.id}>
              <Link className="cart-product-thumb" to={`/products/${product.id}`}><img src={product.imageUrl} alt={product.name} /></Link>
              <div className="cart-product-copy"><Link to={`/products/${product.id}`}>{product.name}</Link><span>{formatCurrency(product.price)} each</span><button className="cart-remove-mobile" type="button" onClick={() => removeItem(product.id)}><Trash2 size={14} /> Remove</button></div>
              <label className="cart-quantity"><span className="sr-only">Quantity for {product.name}</span><input min="1" type="number" value={quantity} onChange={(event) => { const next = Number(event.target.value); if (Number.isInteger(next) && next > 0) updateQuantity(product.id, next) }} /></label>
              <strong className="cart-line-total">{formatCurrency(Number(product.price) * quantity)}</strong>
              <button className="cart-remove-desktop" type="button" aria-label={`Remove ${product.name}`} onClick={() => removeItem(product.id)}><Trash2 size={16} /></button>
            </article>)}
            <Link className="continue-shopping" to="/shop"><ArrowLeft size={15} /> Continue shopping</Link>
          </section>
          <aside className="cart-summary"><h2>Order summary</h2><div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><p>Delivery will be confirmed when we contact you about your order.</p><Link className="store-button" to="/checkout">Continue to checkout <ArrowRight size={16} /></Link><div className="cart-summary-note">Secure checkout <span>•</span> Cash on delivery available</div></aside>
        </div>
      )}
    </main>
  )
}

export default Cart
