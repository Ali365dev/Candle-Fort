import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { createOrder } from '../services/orderService.js'
import { formatCurrency } from '../utils/formatCurrency.js'

function Checkout() {
  const { user, configured } = useAuth()
  const { items, subtotal, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    const formData = new FormData(event.currentTarget)
    const receiptFile = formData.get('receipt')

    try {
      const id = await createOrder({
        userId: user.uid,
        items,
        paymentMethod,
        transactionReference: String(formData.get('transactionReference') || ''),
        receiptFile: receiptFile?.size ? receiptFile : null,
        shippingAddress: {
          fullName: String(formData.get('fullName') || '').trim(),
          email: String(formData.get('email') || '').trim(),
          phone: String(formData.get('phone') || '').trim(),
          address: String(formData.get('address') || '').trim(),
          city: String(formData.get('city') || '').trim(),
          province: String(formData.get('province') || '').trim(),
          postalCode: String(formData.get('postalCode') || '').trim(),
        },
      })
      setOrderId(id)
      clearCart()
    } catch (orderError) {
      setError(orderError.message || 'Your order could not be placed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (orderId) return <main className="store-page"><section className="order-success"><span><ShieldCheck size={32} /></span><p className="store-eyebrow">Order received</p><h1>Thank you for your order</h1><p>Your order <strong>#{orderId.slice(0, 8).toUpperCase()}</strong> is in our hands. We’ll contact you to confirm delivery details.</p><Link className="store-button" to="/shop">Continue shopping <ArrowRight size={16} /></Link></section></main>

  if (!items.length) return <main className="store-page"><section className="cart-empty"><h1>Your bag is empty</h1><p>Add a candle before heading to checkout.</p><Link className="store-button" to="/shop">Browse candles <ArrowRight size={16} /></Link></section></main>

  return (
    <main className="store-page checkout-page">
      <div className="store-breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/cart">Shopping bag</Link><span>/</span><span>Checkout</span></div>
      <div className="cart-title-row"><div><p className="store-eyebrow">Almost yours</p><h1>Checkout</h1></div><span className="checkout-secure"><LockKeyhole size={14} /> Secure checkout</span></div>
      {!configured ? <p className="store-message" role="status">Firebase isn’t configured. Add your Firebase settings in .env.local before placing an order.</p> : null}
      {!user ? <section className="checkout-account-prompt"><h2>Sign in to place your order</h2><p>Your account keeps your order details together and lets us securely save your delivery information.</p><Link className="store-button" to="/login" state={{ returnTo: '/checkout' }}>Sign in or create an account <ArrowRight size={16} /></Link></section> : (
        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-fields">
            <section className="checkout-section"><div className="checkout-section-heading"><span>1</span><div><h2>Delivery information</h2><p>Where should we send your candles?</p></div></div>
              <div className="checkout-form-grid">
                <label className="checkout-field checkout-field-full">Full name<input autoComplete="name" name="fullName" required /></label>
                <label className="checkout-field">Email address<input autoComplete="email" defaultValue={user.email || ''} name="email" required type="email" /></label>
                <label className="checkout-field">Phone number<input autoComplete="tel" name="phone" placeholder="+92 3XX XXXXXXX" required type="tel" /></label>
                <label className="checkout-field checkout-field-full">Street address<input autoComplete="street-address" name="address" required /></label>
                <label className="checkout-field">City<input autoComplete="address-level2" name="city" required /></label>
                <label className="checkout-field">Province<input autoComplete="address-level1" name="province" required /></label>
                <label className="checkout-field">Postal code <span className="optional-label">Optional</span><input autoComplete="postal-code" name="postalCode" /></label>
              </div>
            </section>
            <section className="checkout-section"><div className="checkout-section-heading"><span>2</span><div><h2>Payment method</h2><p>Choose how you’d like to pay.</p></div></div>
              <label className={`payment-option${paymentMethod === 'cod' ? ' selected' : ''}`}><input checked={paymentMethod === 'cod'} name="paymentMethod" onChange={() => setPaymentMethod('cod')} type="radio" /><span><strong>Cash on delivery</strong><small>Pay when your order arrives.</small></span><span className="payment-option-tag">Popular</span></label>
              <label className={`payment-option${paymentMethod === 'manual' ? ' selected' : ''}`}><input checked={paymentMethod === 'manual'} name="paymentMethod" onChange={() => setPaymentMethod('manual')} type="radio" /><span><strong>Manual payment</strong><small>Share your transaction reference after payment.</small></span></label>
              {paymentMethod === 'manual' ? <div className="manual-payment-fields"><label className="checkout-field">Transaction reference<input autoComplete="off" name="transactionReference" placeholder="Enter your payment reference" required /></label><label className="checkout-field">Payment receipt <span className="optional-label">Optional · image or PDF, up to 5 MB</span><input accept="image/*,application/pdf" name="receipt" type="file" /></label></div> : null}
            </section>
          </div>
          <aside className="checkout-summary"><h2>Your order</h2><div className="checkout-order-lines">{items.map(({ product, quantity }) => <div className="checkout-order-line" key={product.id}><img src={product.imageUrl} alt="" /><span>{product.name}<small>Qty {quantity}</small></span><strong>{formatCurrency(Number(product.price) * quantity)}</strong></div>)}</div><div className="checkout-total"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div><p className="checkout-delivery-note">We’ll confirm delivery cost with you before dispatch.</p>{error ? <p className="error-message" role="alert">{error}</p> : null}<button className="store-button" disabled={!configured || submitting} type="submit">{submitting ? 'Placing your order…' : 'Place order'} <ArrowRight size={16} /></button><p className="checkout-protected"><LockKeyhole size={13} /> Your information is protected.</p></aside>
        </form>
      )}
    </main>
  )
}

export default Checkout
