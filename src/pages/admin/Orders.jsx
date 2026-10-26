import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowUpRight, Search } from 'lucide-react'
import { getAdminOrders, updateOrderStatus } from '../../services/orderService.js'
import { firebaseConfigured } from '../../services/firebase.js'
import { formatCurrency } from '../../utils/formatCurrency.js'

const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']
const EMPTY_ORDERS = []

function orderTotal(order) {
  return (order.items || []).reduce((sum, item) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 0), 0)
}

function Orders() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const queryClient = useQueryClient()
  const ordersQuery = useQuery({ queryKey: ['admin', 'orders'], queryFn: getAdminOrders, enabled: firebaseConfigured, retry: 1 })
  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] }),
  })
  const orders = ordersQuery.data || EMPTY_ORDERS
  const visibleOrders = useMemo(() => orders.filter((order) => {
    const searchText = [order.id, order.shippingAddress?.fullName, order.shippingAddress?.email, order.shippingAddress?.phone].join(' ').toLowerCase()
    return searchText.includes(search.toLowerCase()) && (statusFilter === 'all' || order.status === statusFilter)
  }), [orders, search, statusFilter])
  const needsAction = orders.filter((order) => order.status === 'pending').length

  return (
    <div className="admin-section-page">
      <div className="admin-page-heading"><div><p className="admin-eyebrow">Fulfillment</p><h1>Orders</h1><p className="admin-heading-sub">Review customer orders and keep each delivery moving.</p></div><span className="admin-order-count">{needsAction} pending</span></div>
      {!firebaseConfigured ? <div className="admin-alert">Connect Firebase in <code>.env.local</code> to load customer orders.</div> : null}
      {ordersQuery.isError || statusMutation.isError ? <div className="admin-alert admin-alert-error">Couldn’t load or update orders. Check Firebase permissions and try again.</div> : null}
      <section className="admin-catalog-toolbar"><div><strong>{orders.length}</strong><span>orders</span></div><label className="admin-search"><Search size={15} /><input aria-label="Search orders" placeholder="Search order or customer" value={search} onChange={(event) => setSearch(event.target.value)} /></label><label className="admin-filter"><span className="sr-only">Filter by order status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="all">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}</select></label></section>
      {ordersQuery.isLoading ? <div className="admin-panel admin-empty-state">Loading customer orders…</div> : !visibleOrders.length ? <div className="admin-panel admin-empty-state"><h2>{orders.length ? 'No matching orders' : 'No orders yet'}</h2><p>{orders.length ? 'Try a different customer name or status.' : 'New customer orders will appear here.'}</p></div> : (
        <div className="admin-order-list">{visibleOrders.map((order) => <article className="admin-order-card" key={order.id}>
          <div className="admin-order-card-top"><div><p className="admin-eyebrow">Order #{order.id.slice(0, 8).toUpperCase()}</p><span>{String(order.createdAt || '').slice(0, 10)}</span></div><span className={`admin-status-pill ${order.status || 'pending'}`}>{order.status || 'pending'}</span></div>
          <div className="admin-order-card-main"><div className="admin-order-customer"><strong>{order.shippingAddress?.fullName || 'Customer'}</strong><span>{order.shippingAddress?.email || '—'}</span><span>{order.shippingAddress?.phone || '—'}</span><span>{[order.shippingAddress?.city, order.shippingAddress?.province].filter(Boolean).join(', ') || 'Address not provided'}</span></div><div className="admin-order-card-items"><strong>Items</strong>{(order.items || []).map((item) => <span key={item.productId}>{item.name} × {item.quantity}</span>)}</div><div className="admin-order-total"><small>Order total</small><strong>{formatCurrency(orderTotal(order))}</strong><small>{order.paymentMethod === 'cod' ? 'Cash on delivery' : 'Manual payment'}</small></div></div>
          {order.paymentMethod === 'manual' ? <div className="admin-payment-reference"><span>Reference: <strong>{order.transactionReference || 'Not provided'}</strong></span>{order.receiptUrl ? <a href={order.receiptUrl} target="_blank" rel="noreferrer">View receipt <ArrowUpRight size={13} /></a> : null}</div> : null}
          <div className="admin-order-card-foot"><span>Update status</span><select aria-label={`Status for order ${order.id}`} value={order.status || 'pending'} disabled={statusMutation.isPending} onChange={(event) => statusMutation.mutate({ id: order.id, status: event.target.value })}>{statuses.map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}</select></div>
        </article>)}</div>
      )}
    </div>
  )
}

export default Orders
