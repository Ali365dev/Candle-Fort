import { LayoutDashboard, Package, Plus, ReceiptText } from 'lucide-react'
import { NavLink, Outlet } from 'react-router'

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/products/new', label: 'Add Product', icon: Plus },
  { to: '/admin/orders', label: 'Orders', icon: ReceiptText },
]

function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <NavLink className="brand" to="/">
          Candle Fort
        </NavLink>
        <p className="admin-label">Admin</p>
        <nav aria-label="Admin navigation">
          {adminLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              className="admin-nav-link"
              end={end}
              key={to}
              to={to}
            >
              <Icon aria-hidden="true" size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
