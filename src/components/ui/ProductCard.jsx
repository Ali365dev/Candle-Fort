import { Link } from 'react-router'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { formatCurrency } from '../../utils/formatCurrency.js'

function ProductCard({ product }) {
  const { addItem } = useCart()
  const rating = Number(product.rating ?? 5)
  const image = product.imageUrl || product.image || ''
  function handleAdd() {
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
          <Link to={`/products/${product.id}`}>{product.name}</Link>
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
        <p className="product-price">{formatCurrency(product.price)}</p>
        <div className="product-actions">
          <button type="button" className="cf-btn" onClick={handleAdd}>
            Add to Cart
          </button>
          <button
            type="button"
            className="cf-btn icon-add"
            onClick={handleAdd}
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
