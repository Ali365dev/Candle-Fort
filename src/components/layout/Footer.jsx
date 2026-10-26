import { Globe, MessageCircle, Phone, Share2 } from 'lucide-react'
import { Link } from 'react-router'
import { logo } from '../../data/homeContent.js'

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <>
      <section className="landing-newsletter">
        <div className="landing-container"><strong>Let’s keep in touch! Get email offers &amp; the latest news from us</strong>
          <form onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="newsletter-email">Your email</label><input id="newsletter-email" type="email" required placeholder="Enter your E-mail" /><button type="submit">Subscribe</button></form>
        </div>
      </section>
      <footer className="site-footer" id="footer">
        <div className="cf-container">
          <div className="footer-grid">
            <div className="footer-brand"><img src={logo} alt="Candle Fort" /><p>Candle Fort was created with a passion for the warmth, comfort, and beauty that candles bring into our lives. We believe a candle is more than just a source of light — it’s a way to create an atmosphere, express your style, and make ordinary moments feel special.</p></div>
            <div className="footer-col"><h3>Policies</h3><ul><li><Link to="/returns">Refund / Return Policy</Link></li><li><Link to="/about">About Us</Link></li><li><Link to="/contact">Contact Us</Link></li><li><Link to="/blog">Blogs</Link></li></ul></div>
            <div className="footer-col"><h3>Contact Info</h3><ul><li><a href="tel:+923210000262"><Phone size={13} /> +923210000262</a></li><li><a href="mailto:candlefort@gmail.com">candlefort@gmail.com</a></li></ul><h3 className="footer-social-title">Follow Us</h3><div className="social-links"><a href="https://facebook.com" aria-label="Facebook"><Share2 size={17} /></a><a href="https://instagram.com" aria-label="Instagram"><Globe size={17} /></a><a href="https://wa.me/923210000262" aria-label="WhatsApp"><MessageCircle size={17} /></a></div></div>
          </div>
          <div className="footer-bottom"><span>CandleFort © {currentYear}. All Rights Reserved</span><span>Powered by : <a href="#footer">CommCart</a></span></div>
        </div>
      </footer>
      <a className="whatsapp-float" href="https://wa.me/923210000262" aria-label="Chat with Candle Fort on WhatsApp"><MessageCircle size={21} /></a>
    </>
  )
}

export default Footer
