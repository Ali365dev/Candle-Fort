import { useQuery } from '@tanstack/react-query'
import { ArrowRight, CircleDollarSign, Clock3, Package, Plus, ReceiptText, ShoppingBag, TrendingUp } from 'lucide-react'
import { Link } from 'react-router'
import { getAdminOrders } from '../../services/orderService.js'
import { getProducts } from '../../services/productService.js'
import { firebaseConfigured } from '../../services/firebase.js'
import { formatCurrency } from '../../utils/formatCurrency.js'

const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

function orderTotal(order) {
  return (order.items || []).reduce((total, item) => total + Number(item.unitPrice || 0) * Number(item.quantity || 0), 0)
}

function Dashboard() {
  const ordersQuery = useQuery({ queryKey: ['admin', 'orders'], queryFn: getAdminOrders, enabled: firebaseConfigured, retry: 1 })
  const productsQuery = useQuery({ queryKey: ['admin', 'products'], queryFn: getProducts, enabled: firebaseConfigured, retry: 1 })
  const orders = ordersQuery.data || []
  const products = productsQuery.data || []
  const pendingCount = orders.filter((order) => order.status === 'pending').length
  const confirmedRevenue = orders.filter((order) => !['cancelled'].includes(order.status)).reduce((sum, order) => sum + orderTotal(order), 0)
  const statusCounts = statuses.map((status) => ({ status, count: orders.filter((order) => order.status === status).length }))
  const maxStatusCount = Math.max(1, ...statusCounts.map((item) => item.count))

  return (
    <div className="admin-dashboard">
      <div className="admin-page-heading"><div><p className="admin-eyebrow">Store overview</p><h1>Dashboard</h1><p className="admin-heading-sub">A clear view of your Candle Fort store today.</p></div><Link className="admin-primary-button" to="/admin/products/new"><Plus size={16} /> Add a product</Link></div>
      {!firebaseConfigured ? <div className="admin-alert">Connect Firebase in <code>.env.local</code> to load your store data.</div> : null}
      {ordersQuery.isError || productsQuery.isError ? <div className="admin-alert admin-alert-error">Some store data could not be loaded. Check Firebase permissions and try again.</div> : null}
      <section className="admin-stat-grid" aria-label="Store metrics">
        <article className="admin-stat-card"><span className="admin-stat-icon violet"><ShoppingBag size={18} /></span><div><span>Total orders</span><strong>{ordersQuery.isLoading ? '—' : orders.length}</strong><small>All time</small></div><ReceiptText className="admin-stat-watermark" size={30} /></article>
        <article className="admin-stat-card"><span className="admin-stat-icon peach"><Package size={18} /></span><div><span>Products</span><strong>{productsQuery.isLoading ? '—' : products.length}</strong><small>In your catalog</small></div><Package className="admin-stat-watermark" size={30} /></article>
        <article className="admin-stat-card"><span className="admin-stat-icon amber"><Clock3 size={18} /></span><div><span>Needs attention</span><strong>{ordersQuery.isLoading ? '—' : pendingCount}</strong><small>Pending orders</small></div><Clock3 className="admin-stat-watermark" size={30} /></article>
        <article className="admin-stat-card"><span className="admin-stat-icon green"><CircleDollarSign size={18} /></span><div><span>Order value</span><strong>{ordersQuery.isLoading ? '—' : formatCurrency(confirmedRevenue)}</strong><small>Excludes cancelled orders</small></div><TrendingUp className="admin-stat-watermark" size={30} /></article>
      </section>
      <section className="admin-dashboard-grid">
        <article className="admin-panel admin-recent-panel"><div className="admin-panel-heading"><div><h2>Recent orders</h2><p>Keep up with your latest customer orders.</p></div><Link to="/admin/orders">View all <ArrowRight size={14} /></Link></div>
          {ordersQuery.isLoading ? <p className="admin-empty-state">Loading orders…</p> : orders.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.slice(0, 5).map((order) => <tr key={order.id}><td><strong>#{order.id.slice(0, 7).toUpperCase()}</strong></td><td>{order.shippingAddress?.fullName || 'Customer'}</td><td>{String(order.createdAt || '').slice(0, 10)}</td><td>{formatCurrency(orderTotal(order))}</td><td><span className={`admin-status-pill ${order.status || 'pending'}`}>{order.status || 'pending'}</span></td></tr>)}</tbody></table></div> : <p className="admin-empty-state">Your first order will show up here.</p>}
        </article>
        <article className="admin-panel admin-status-panel"><div className="admin-panel-heading"><div><h2>Order status</h2><p>Where your orders are in the journey.</p></div></div><div className="admin-status-list">{statusCounts.map(({ status, count }) => <div className="admin-status-row" key={status}><span>{status}</span><div className="admin-status-track"><i className={`bar-${status}`} style={{ width: `${(count / maxStatusCount) * 100}%` }} /></div><strong>{count}</strong></div>)}</div></article>
      </section>
      <section className="admin-quick-actions"><div><span className="admin-quick-icon"><Package size={18} /></span><span><strong>Grow your collection</strong><small>Add a new candle to the store.</small></span><Link to="/admin/products/new" aria-label="Add a new product"><ArrowRight size={17} /></Link></div><div><span className="admin-quick-icon orders"><ReceiptText size={18} /></span><span><strong>Manage orders</strong><small>Update order status and review payment.</small></span><Link to="/admin/orders" aria-label="Manage orders"><ArrowRight size={17} /></Link></div></section>
    </div>
  )
}

export default Dashboard
