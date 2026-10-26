import { Link } from 'react-router'
import { ArrowRight, Heart, Leaf, Sparkles } from 'lucide-react'
import lifestyle from '../assets/images/image-16.webp'
import giftBox from '../assets/images/image-8.webp'
import cakeCandle from '../assets/images/image-10.webp'

function About() {
  return (
    <main className="store-page editorial-page">
      <div className="store-breadcrumb"><Link to="/">Home</Link><span>/</span><span>About Us</span></div>
      <section className="editorial-hero"><img src={lifestyle} alt="Candle Fort candles glowing in a warm evening setting" /><div><p className="store-eyebrow">A little magic to your everyday life</p><h1>Made to make moments feel special.</h1><p>Thoughtful candles, handcrafted with care and made to bring warmth to the everyday.</p></div></section>
      <section className="about-story"><div><p className="store-eyebrow">Our story</p><h2>Every candle tells a story.</h2><p>At Candle Fort, we believe the little things can make life feel extraordinary. A gentle glow, a thoughtful gift, or a candle made for someone you love can turn an ordinary day into a moment worth remembering.</p><p>Our collection brings together decorative cake candles, signature designs, and gifts for celebrations and everyday spaces. Each piece is chosen to feel personal, warm, and a little magical.</p><Link className="store-button" to="/shop">Explore our collection <ArrowRight size={16} /></Link></div><img src={cakeCandle} alt="Purple berry cake candle" /></section>
      <section className="about-values"><div><span><Heart size={21} /></span><h3>Made with care</h3><p>Details and finishing that make each candle feel special.</p></div><div><span><Sparkles size={21} /></span><h3>Made for gifting</h3><p>Thoughtful designs for birthdays, celebrations, and little surprises.</p></div><div><span><Leaf size={21} /></span><h3>Made for your space</h3><p>Pieces that bring a warm glow and a personal touch to your home.</p></div></section>
      <section className="about-gift"><img src={giftBox} alt="Candle Fort gift set" /><div><p className="store-eyebrow">Gifts &amp; favors</p><h2>A thoughtful gift, ready to delight.</h2><p>Find a special candle for your next celebration, or choose a gift set made to leave a lasting impression.</p><Link className="store-button" to="/shop?category=gift">Shop gifts <ArrowRight size={16} /></Link></div></section>
    </main>
  )
}

export default About
