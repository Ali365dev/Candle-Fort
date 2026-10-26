import { Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, PackageCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { getCustomerOrders } from '../services/orderService.js'
import { formatCurrency } from '../utils/formatCurrency.js'

function TrackOrder() {
  const { user, configured } = useAuth()
  const ordersQuery = useQuery({
    queryKey: ['orders', 'customer', user?.uid],
    queryFn: () => getCustomerOrders(user.uid),
    enabled: configured && Boolean(user),
    retry: 1,
  })

  return (
    <main className="store-page tracking-page">
      <div className="store-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Track your order</span></div>
      <section className="tracking-heading"><span><PackageCheck size={24} /></span><p className="store-eyebrow">Your Candle Fort orders</p><h1>Track your order</h1><p>Sign in to see your order status and delivery details.</p></section>
      {!configured ? <p className="store-message">Firebase isn’t configured yet, so order tracking is unavailable.</p> : null}
      {!user && configured ? <div className="tracking-empty"><p>Sign in to view orders placed with your account.</p><Link className="store-button" to="/login" state={{ returnTo: '/track' }}>Sign in <ArrowRight size={15} /></Link></div> : null}
      {user && ordersQuery.isLoading ? <div className="store-empty">Loading your orders…</div> : null}
      {ordersQuery.isError ? <p className="store-message" role="alert">We couldn’t load your orders. Please try again later.</p> : null}
      {user && !ordersQuery.isLoading && !ordersQuery.isError && !ordersQuery.data?.length ? <div className="tracking-empty"><p>You don’t have any orders yet.</p><Link className="store-button" to="/shop">Explore candles <ArrowRight size={15} /></Link></div> : null}
      {ordersQuery.data?.length ? <div className="tracking-orders">{ordersQuery.data.map((order) => <article className="tracking-order" key={order.id}><div className="tracking-order-heading"><div><p className="store-eyebrow">Order #{order.id.slice(0, 8).toUpperCase()}</p><span>Placed {String(order.createdAt || '').slice(0, 10)}</span></div><strong className={`order-status status-${order.status || 'pending'}`}>{order.status || 'pending'}</strong></div><div className="tracking-order-items">{order.items?.map((item) => <div key={item.productId}><span>{item.name} × {item.quantity}</span><strong>{formatCurrency(Number(item.unitPrice) * Number(item.quantity))}</strong></div>)}</div><div className="tracking-order-foot"><span>{order.paymentMethod === 'cod' ? 'Cash on delivery' : 'Manual payment'}</span><strong>{formatCurrency((order.items || []).reduce((sum, item) => sum + Number(item.unitPrice) * Number(item.quantity), 0))}</strong></div></article>)}</div> : null}
    </main>
  )
}

export default TrackOrder
