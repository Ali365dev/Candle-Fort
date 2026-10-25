import { Link } from 'react-router'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'

function formatPrice(price) {
  return `Rs. ${Number(price || 0).toLocaleString('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

function ProductCard({ product }) {
  const { addItem } = useCart()
  const rating = Number(product.rating ?? 5)
  const image = product.imageUrl || product.image || ''
  const isPlaceholder = String(product.id).startsWith('placeholder') ||
    String(product.id).startsWith('rv-')

  function handleAdd() {
    if (isPlaceholder) return
    addItem(
      {
        id: product.id,
        name: product.name,
        price: Number(product.price ?? 0),
        imageUrl: image,
      },
      1,
    )
  }

  return (
    <article className="product-card">
      <div className="product-card-media">
        {image ? <img src={image} alt={product.name} loading="lazy" /> : null}
        <button type="button" className="wish-btn" aria-label="Add to wishlist">
          <Heart size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="product-card-body">
        <h3>
          {isPlaceholder ? (
            product.name
          ) : (
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          )}
        </h3>
        <div className="product-rating" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              size={14}
              fill={index < rating ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="product-price">{formatPrice(product.price)}</p>
        <div className="product-actions">
          <button type="button" className="cf-btn" onClick={handleAdd} disabled={isPlaceholder}>
            Add to Cart
          </button>
          <button
            type="button"
            className="cf-btn icon-add"
            onClick={handleAdd}
            disabled={isPlaceholder}
            aria-label="Quick add to cart"
          >
            <ShoppingCart size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
