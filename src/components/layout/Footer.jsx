import { Link } from 'react-router'
import { Globe, Share2, Video } from 'lucide-react'
import { logo } from '../../data/homeContent.js'

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="cf-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={logo} alt="Candle Fort" />
            <p>
              Premium handcrafted candles made to light up your moments — elegant,
              fragrant, and gift-ready.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">
                <Share2 size={16} aria-hidden="true" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Globe size={16} aria-hidden="true" />
              </a>
              <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer">
                <Video size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Shop by Category</h3>
            <ul>
              <li>
                <Link to="/shop?category=cake">Cake Candles</Link>
              </li>
              <li>
                <Link to="/shop?category=jar">Jar Candles</Link>
              </li>
              <li>
                <Link to="/shop?category=gift">Gift Sets</Link>
              </li>
              <li>
                <Link to="/shop?category=scented">Scented Candles</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Customer Care</h3>
            <ul>
              <li>
                <a href="#track">Track Order</a>
              </li>
              <li>
                <a href="#shipping">Shipping Info</a>
              </li>
              <li>
                <a href="#returns">Returns</a>
              </li>
              <li>
                <a href="#faq">FAQs</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact Info</h3>
            <ul>
              <li>hello@candlefort.com</li>
              <li>+92 300 0000000</li>
              <li>Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Candle Fort. All rights reserved.</p>
          <div className="payment-row" aria-label="Accepted payments">
            <span className="payment-pill">COD</span>
            <span className="payment-pill">VISA</span>
            <span className="payment-pill">MC</span>
            <span className="payment-pill">JazzCash</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
