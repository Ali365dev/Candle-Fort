import { Link } from 'react-router'
import Placeholder from '../components/ui/Placeholder.jsx'
import { useCart } from '../context/CartContext.jsx'

function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart()

  return (
    <main className="page">
      <h1>Your cart</h1>
      {items.length === 0 ? (
        <>
          <Placeholder>Your cart is empty.</Placeholder>
          <Link className="button-link" to="/shop">
            Browse the shop
          </Link>
        </>
      ) : (
        <>
          <ul className="cart-list">
            {items.map(({ product, quantity }) => (
              <li className="cart-item" key={product.id}>
                <div>
                  <h2>{product.name}</h2>
                  <p>
                    {quantity} × ${Number(product.price ?? 0).toFixed(2)}
                  </p>
                </div>
                <label>
                  Quantity
                  <input
                    min="1"
                    onChange={(event) =>
                      updateQuantity(product.id, Number(event.target.value))
                    }
                    type="number"
                    value={quantity}
                  />
                </label>
                <button onClick={() => removeItem(product.id)} type="button">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="cart-subtotal">Subtotal: ${subtotal.toFixed(2)}</p>
          <Link className="button-link" to="/checkout">
            Continue to checkout
          </Link>
        </>
      )}
    </main>
  )
}

export default Cart
