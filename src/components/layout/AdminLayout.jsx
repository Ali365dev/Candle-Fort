import {
  BarChart3,
  ChevronDown,
  FileText,
  Folder,
  Home,
  LogOut,
  Megaphone,
  Newspaper,
  Package,
  PanelsTopLeft,
  Settings,
  ShoppingCart,
  Star,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext.jsx'
import { signOut } from '../../services/authService.js'
import { logo } from '../../data/homeContent.js'

const homeLinks = [
  { to: '/admin/manage/sliders', label: 'Slider', icon: PanelsTopLeft },
  { to: '/admin/manage/middleSliders', label: 'Middle Slider List', icon: PanelsTopLeft },
  { to: '/admin/manage/featuredCategories', label: 'Featured Categories', icon: Folder },
  { to: '/admin/manage/featuredProducts', label: 'Featured Products', icon: Star },
  { to: '/admin/manage/featuredBlogs', label: 'Featured Blogs', icon: Newspaper },
  { to: '/admin/manage/marketingSection', label: 'Marketing Section', icon: Megaphone },
]

const categoryLinks = [
  { to: '/admin/manage/categories', label: 'Category List' },
  { to: '/admin/manage/subcategories', label: 'Subcategory List' },
]

const blogLinks = [
  { to: '/admin/manage/blogs', label: 'Blog List' },
  { to: '/admin/manage/blogCategories', label: 'Blog Category List' },
]

const settingLinks = [
  { to: '/admin/manage/appSettings', label: 'App Settings' },
  { to: '/admin/manage/aboutUs', label: 'About Us' },
  { to: '/admin/manage/colors', label: 'Colors' },
  { to: '/admin/manage/overlays', label: 'Promotional Overlay' },
  { to: '/admin/manage/shippingMethods', label: 'Shipping Methods' },
  { to: '/admin/manage/shippingRates', label: 'Shipping Rates' },
  { to: '/admin/manage/sizeVariants', label: 'Size Variants' },
  { to: '/admin/manage/themeSettings', label: 'Theme Settings' },
]

function AdminLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [signOutError, setSignOutError] = useState('')
  const [homeOpen, setHomeOpen] = useState(true)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [blogOpen, setBlogOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  async function handleSignOut() {
    setSignOutError('')
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      setSignOutError(error.message)
    }
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <NavLink className="admin-brand" to="/">
          <img src={logo} alt="" />
          <span><strong>Candle Fort</strong><small>STORE ADMIN</small></span>
        </NavLink>
        <p className="admin-label">Main</p>
        <nav aria-label="Admin navigation">
          <div className="admin-nav-group">
            <div className="admin-nav-parent-row">
              <NavLink className="admin-nav-link" end to="/admin"><Home aria-hidden="true" size={18} />Home</NavLink>
              <button className={`admin-nav-toggle${homeOpen ? ' expanded' : ''}`} type="button" aria-label={`${homeOpen ? 'Collapse' : 'Expand'} Home links`} aria-expanded={homeOpen} onClick={() => setHomeOpen((open) => !open)}><ChevronDown size={14} /></button>
            </div>
            {homeOpen ? <div className="admin-subnav">
              {homeLinks.map(({ to, label, icon: Icon }) => <NavLink className="admin-subnav-link" key={to} to={to}><Icon aria-hidden="true" size={14} />{label}</NavLink>)}
            </div> : null}
          </div>
          <div className="admin-nav-group">
            <div className="admin-nav-parent-row"><NavLink className="admin-nav-link" to="/admin/manage/categories"><Folder aria-hidden="true" size={18} />Category</NavLink><button className={`admin-nav-toggle${categoryOpen ? ' expanded' : ''}`} type="button" aria-label={`${categoryOpen ? 'Collapse' : 'Expand'} Category links`} aria-expanded={categoryOpen} onClick={() => setCategoryOpen((open) => !open)}><ChevronDown size={14} /></button></div>
            {categoryOpen ? <div className="admin-subnav">{categoryLinks.map(({ to, label }) => <NavLink className="admin-subnav-link" key={to} to={to}>{label}</NavLink>)}</div> : null}
          </div>
          <NavLink className="admin-nav-link" to="/admin/product-list"><Package aria-hidden="true" size={18} />Product</NavLink>
          <NavLink className="admin-nav-link" to="/admin/orders"><ShoppingCart aria-hidden="true" size={18} />Order</NavLink>
          <div className="admin-nav-group">
            <div className="admin-nav-parent-row"><NavLink className="admin-nav-link" to="/admin/manage/blogs"><Newspaper aria-hidden="true" size={18} />Blog</NavLink><button className={`admin-nav-toggle${blogOpen ? ' expanded' : ''}`} type="button" aria-label={`${blogOpen ? 'Collapse' : 'Expand'} Blog links`} aria-expanded={blogOpen} onClick={() => setBlogOpen((open) => !open)}><ChevronDown size={14} /></button></div>
            {blogOpen ? <div className="admin-subnav">{blogLinks.map(({ to, label }) => <NavLink className="admin-subnav-link" key={to} to={to}>{label}</NavLink>)}</div> : null}
          </div>
          <NavLink className="admin-nav-link" to="/admin/manage/pages"><FileText aria-hidden="true" size={18} />Pages</NavLink>
          <NavLink className="admin-nav-link" to="/admin/report"><BarChart3 aria-hidden="true" size={18} />Report</NavLink>
        </nav>
        <p className="admin-label admin-system-label">System</p>
        <div className="admin-nav-parent-row">
          <NavLink className="admin-nav-link" to="/admin/manage/appSettings"><Settings aria-hidden="true" size={18} />Settings</NavLink>
          <button className={`admin-nav-toggle${settingsOpen ? ' expanded' : ''}`} type="button" aria-label={`${settingsOpen ? 'Collapse' : 'Expand'} Settings links`} aria-expanded={settingsOpen} onClick={() => setSettingsOpen((open) => !open)}><ChevronDown size={14} /></button>
        </div>
        {settingsOpen ? <div className="admin-subnav">{settingLinks.map(({ to, label }) => <NavLink className="admin-subnav-link" key={to} to={to}>{label}</NavLink>)}</div> : null}
        <div className="admin-sidebar-foot"><span className="admin-status-dot" /> {user?.email || 'Admin'}</div>
      </aside>
      <main className="admin-content">
        <header className="admin-topbar"><div><span>Signed in as</span><strong>{user?.email || 'Candle Fort admin'}</strong></div><button type="button" onClick={handleSignOut}><LogOut size={15} /> Sign out</button></header>
        <div className="admin-page-content"><Outlet /></div>
        {signOutError ? <p className="error-message admin-signout-error" role="alert">{signOutError}</p> : null}
      </main>
    </div>
  )
}

export default AdminLayout
