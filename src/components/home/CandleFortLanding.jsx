import { useRef } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, ArrowRight, BadgeCheck, Banknote, ShieldCheck } from 'lucide-react'
import lifestyle from '../../assets/images/image-16.webp'
import heroPhoto from '../../assets/images/image-6.webp'
import cakePhoto from '../../assets/images/image-7.webp'
import giftPhoto from '../../assets/images/image-8.webp'
import blogPhoto from '../../assets/images/image-19.webp'
import blogHands from '../../assets/images/image-20.webp'
import { placeholderProducts } from '../../data/homeContent.js'
import ProductCard from '../ui/ProductCard.jsx'

const blogPosts = [
  { title: 'Our Candles', image: blogPhoto },
  { title: 'Light Up Your Moments', image: blogHands },
]

function SectionIntro({ title, children, dark = false }) {
  return (
    <div className={`landing-intro${dark ? ' landing-intro-dark' : ''}`}>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  )
}

function ProductShelf({ title, products, dark = false, intro }) {
  const shelf = useRef(null)
  const items = products.slice(0, 4)

  return (
    <section className={`landing-products${dark ? ' landing-products-dark' : ''}`}>
      <div className="landing-container">
        <SectionIntro title={title} dark={dark}>{intro}</SectionIntro>
        <div className="landing-product-grid" ref={shelf}>
          {items.map((product, index) => {
            const fallback = placeholderProducts[index % placeholderProducts.length]
            return <ProductCard key={`${product.id}-${index}`} product={{ ...fallback, ...product, imageUrl: product.imageUrl || fallback.imageUrl }} />
          })}
        </div>
        <div className="landing-shelf-controls" aria-label={`${title} carousel controls`}>
          <button type="button" aria-label="Scroll products left" onClick={() => shelf.current?.scrollBy({ left: -280, behavior: 'smooth' })}><ArrowLeft size={17} /></button>
          <button type="button" aria-label="Scroll products right" onClick={() => shelf.current?.scrollBy({ left: 280, behavior: 'smooth' })}><ArrowRight size={17} /></button>
        </div>
      </div>
    </section>
  )
}

function CandleFortLanding({ products, recentlyViewed }) {
  const liveProducts = products.length ? products : featuredProducts
  return (
    <main className="replica-home">
      <section className="landing-hero" aria-label="Candle Fort collection">
        <img src={heroPhoto} alt="A warm candlelit arrangement from Candle Fort" />
        <div className="landing-hero-shade" />
        <div className="landing-container landing-hero-content">
          <h1>A Little Magic To Your<br />Everyday Life</h1>
          <p className="landing-kicker">A LITTLE MAGIC TO YOUR EVERYDAY LIFE</p>
          <p>At Candle Fort, we believe that the little things can make life feel extraordinary. Our candles are created to bring warmth, beauty, and a touch of elegance to your everyday spaces.</p>
          <Link className="landing-button" to="/shop">Our Collection <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="landing-trust" aria-label="Shopping benefits">
        <div><BadgeCheck /><span>Luxury Quality You Can Feel</span></div>
        <div><ShieldCheck /><span>Easy Returns – No Questions Asked</span></div>
        <div><Banknote /><span>Pay When You Receive</span></div>
      </section>

      <section className="landing-collections landing-container">
        <SectionIntro title="Light Up Your Moments">At Candle Fort, we believe that the little things can make life feel extraordinary. Our candles are created to bring warmth, beauty, and a touch of elegance to your everyday spaces.</SectionIntro>
        <div className="landing-category-grid">
          <Link to="/shop?category=cake"><img src={cakePhoto} alt="Berry cake candle" /><span>Signature Candles</span></Link>
          <Link to="/shop?category=gift"><img src={giftPhoto} alt="Gift candles in a gold presentation box" /><span>Gifts &amp; Favors</span></Link>
        </div>
      </section>

      <ProductShelf title="Every Candle Tells A Story." products={liveProducts} intro="From customized candles and charming mini candles to scented candles, thoughtful giveaway gifts, and beautiful bouquet candles, our creations are designed to make gifting and celebrations more memorable." />

      <section className="landing-story-banner">
        <img src={lifestyle} alt="A collection of softly glowing scented candles" />
        <div className="landing-story-overlay" />
        <div className="landing-container landing-story-copy">
          <p className="landing-kicker">A LITTLE MAGIC TO YOUR EVERYDAY LIFE</p>
          <h2>We believe that the little things</h2>
          <p>Our candles are created to bring warmth, beauty, and a touch of elegance to your everyday spaces.</p>
          <Link className="landing-button" to="/shop">Shop Now <ArrowRight size={15} /></Link>
        </div>
      </section>

      <ProductShelf title="Light Up Your Moments." products={[placeholderProducts[4], placeholderProducts[2], placeholderProducts[3], placeholderProducts[0]]} dark intro="Make every moment feel memorable. Discover candles that add warmth to your space and a little magic to your everyday life." />

      <ProductShelf title="Discover Candles That Add Warmth To Your Space" products={recentlyViewed.length ? recentlyViewed : placeholderProducts} intro="Discover candles that add warmth to your space and a little magic to your everyday life." />

      <section className="landing-blogs landing-container" id="blog">
        <SectionIntro title="Featured Blogs">Explore our highlighted blogs to get inspired by gift ideas, exquisite table arrangements, and thoughtful living.</SectionIntro>
        <div className="landing-blog-grid">
          {blogPosts.map((post) => <a href="#blog" key={post.title}><img src={post.image} alt="" /><h3>{post.title}</h3></a>)}
        </div>
      </section>
    </main>
  )
}

export default CandleFortLanding
