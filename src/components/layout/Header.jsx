import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { logo } from '../../data/homeContent.js'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?category=gift', label: 'Gift Sets' },
  { to: '/shop?category=cake', label: 'Candles' },
  { to: '#business', label: 'Business' },
  { to: '#blog', label: 'Blog' },
  { to: '#contact', label: 'Contact' },
]

function Header() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="top-bar">
        <div className="cf-container top-bar-inner">
          <div className="top-bar-left">
            <span>Free Delivery Across Pakistan</span>
            <span>Cash on Delivery Available</span>
          </div>
          <div className="top-bar-right">
            <a href="#track">Track Your Order</a>
            <Link to="/login">Login / Register</Link>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="cf-container site-header-inner">
          <Link className="brand" to="/" aria-label="Candle Fort home">
            <img className="brand-logo" src={logo} alt="Candle Fort" />
          </Link>

          <nav
            className={`site-nav${menuOpen ? ' open' : ''}`}
            aria-label="Main navigation"
          >
            {navLinks.map((link) =>
              link.to.startsWith('#') ? (
                <a key={link.label} href={link.to} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="header-actions">
            <a className="icon-btn" href="#search" aria-label="Search">
              <Search size={20} aria-hidden="true" />
            </a>
            <a className="icon-btn" href="#wishlist" aria-label="Wishlist">
              <Heart size={20} aria-hidden="true" />
            </a>
            <Link className="icon-btn" to="/login" aria-label="Account">
              <User size={20} aria-hidden="true" />
            </Link>
            <Link className="icon-btn" to="/cart" aria-label={`Cart, ${itemCount} items`}>
              <ShoppingBag size={20} aria-hidden="true" />
              {itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null}
            </Link>
            <button
              type="button"
              className="icon-btn nav-toggle"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X size={22} aria-hidden="true" />
              ) : (
                <Menu size={22} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
