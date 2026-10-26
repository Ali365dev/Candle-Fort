import { Link } from 'react-router'
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

function Contact() {
  return (
    <main className="store-page editorial-page">
      <div className="store-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Contact Us</span></div>
      <section className="contact-heading"><p className="store-eyebrow">We’re here to help</p><h1>Let’s talk candles.</h1><p>Questions about an order, a gift, or a candle? Get in touch and our team will be happy to help.</p></section>
      <section className="contact-card-grid">
        <a href="tel:+923210000262"><span><Phone size={20} /></span><small>Call us</small><strong>+92 321 0000262</strong><p>Speak with the Candle Fort team.</p></a>
        <a href="mailto:candlefort@gmail.com"><span><Mail size={20} /></span><small>Email us</small><strong>candlefort@gmail.com</strong><p>Send us your question anytime.</p></a>
        <a href="https://wa.me/923210000262"><span><MessageCircle size={20} /></span><small>Message us</small><strong>WhatsApp</strong><p>Chat with us about your order or gift.</p></a>
      </section>
      <section className="contact-note"><span><MapPin size={20} /></span><div><h2>We deliver across Pakistan</h2><p>Delivery details and timing are confirmed with you after your order is placed.</p></div></section>
      <section className="journal-cta"><p className="store-eyebrow">Need something special?</p><h2>Explore candles made for your moments.</h2><Link className="store-button" to="/shop">Visit the shop <ArrowRight size={16} /></Link></section>
    </main>
  )
}

export default Contact
