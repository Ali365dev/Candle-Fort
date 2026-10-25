import { useState } from 'react'
import Placeholder from '../components/ui/Placeholder.jsx'
import { useCart } from '../context/CartContext.jsx'

function Checkout() {
  const { items, subtotal } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('cod')

  return (
    <main className="page">
      <h1>Checkout</h1>
      {items.length === 0 ? (
        <Placeholder>Add products to your cart before checkout.</Placeholder>
      ) : (
        <form className="form-stack">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <fieldset>
            <legend>Payment method</legend>
            <label className="choice">
              <input
                checked={paymentMethod === 'cod'}
                name="paymentMethod"
                onChange={() => setPaymentMethod('cod')}
                type="radio"
                value="cod"
              />
              Cash on Delivery (COD)
            </label>
            <label className="choice">
              <input
                checked={paymentMethod === 'manual'}
                name="paymentMethod"
                onChange={() => setPaymentMethod('manual')}
                type="radio"
                value="manual"
              />
              Manual payment
            </label>
          </fieldset>
          {paymentMethod === 'manual' && (
            <>
              <label>
                Transaction reference
                <input
                  autoComplete="off"
                  name="transactionReference"
                  placeholder="Enter your payment reference"
                  required
                />
              </label>
              <label>
                Receipt (optional)
                <input accept="image/*,application/pdf" name="receipt" type="file" />
              </label>
            </>
          )}
          <Placeholder>
            Order submission and delivery details will be implemented here.
          </Placeholder>
          <button disabled type="button">
            Place order (coming soon)
          </button>
        </form>
      )}
    </main>
  )
}

export default Checkout
