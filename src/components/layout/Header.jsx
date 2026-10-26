import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { Heart, Menu, Phone, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { logo } from '../../data/homeContent.js'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop?category=gift', label: 'Gifts & Favors' },
  { to: '/shop?category=cake', label: 'Signature Candles' },
  { to: '/about', label: 'About Us' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact Us' },
]

function Header() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <div className="top-bar">
        <div className="cf-container top-bar-inner">
          <span>Easy Returns – No Questions Asked</span>
          <div className="top-bar-right"><Link to="/track">Track Your Order</Link><Link to="/login"><UserRound size={12} /> Sign in</Link></div>
        </div>
      </div>
      <header className="site-header">
        <div className="cf-container site-header-inner">
          <Link className="brand" to="/" aria-label="Candle Fort home"><img className="brand-logo" src={logo} alt="Candle Fort" /></Link>
          <form className="header-search" action="/shop" role="search">
            <label className="sr-only" htmlFor="store-search">Search for items</label>
            <input id="store-search" name="q" type="search" placeholder="Search for items" />
            <button type="submit" aria-label="Search"><Search size={17} /></button>
          </form>
          <div className="header-contact"><Phone size={19} /><span><small>Call Us Now</small><a href="tel:+923210000262">+92 321 0000262</a></span></div>
          <div className="header-actions">
            <Link className="icon-btn" to="/login" aria-label="Sign in"><Heart size={20} /></Link>
            <Link className="icon-btn cart-link" to="/cart" aria-label={`Cart, ${itemCount} items`}><ShoppingBag size={21} />{itemCount > 0 ? <span className="cart-badge">{itemCount}</span> : null}</Link>
            <button type="button" className="icon-btn nav-toggle" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
        <nav className={`site-nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
          <div className="cf-container site-nav-inner">
            {navLinks.map((link) => link.to.startsWith('#')
              ? <a key={link.label} href={link.to} onClick={() => setMenuOpen(false)}>{link.label}</a>
              : <NavLink key={link.label} className={({ isActive }) => {
                if (link.to.includes('?category=')) return location.search === link.to.slice(link.to.indexOf('?')) ? 'active' : ''
                return isActive ? 'active' : ''
              }} to={link.to} end={link.end} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>)}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
