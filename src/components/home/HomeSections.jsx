import { Link } from 'react-router'
import {
  ArrowRight,
  Flame,
  Flower2,
  Leaf,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wallet,
} from 'lucide-react'
import ProductCard from '../ui/ProductCard.jsx'
import {
  blogPosts,
  brandStory,
  careTips,
  categories,
  faqs,
  giftBanner,
  hero,
  instagramImages,
  occasions,
  promos,
  scentsBanner,
  seasonalBanner,
  testimonials,
  trustItems,
} from '../../data/homeContent.js'

const trustIcons = [Truck, Wallet, Sparkles, ShieldCheck]
const scentIcons = [Flower2, Flame, Leaf, Sparkles, Flower2]

export function HeroSection() {
  return (
    <section className="home-hero">
      <div className="home-hero-media" aria-hidden="true">
        <img src={hero.image} alt="" />
      </div>
      <div className="cf-container home-hero-content">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p>{hero.text}</p>
        <Link className="cf-btn" to="/shop">
          {hero.cta}
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Store benefits">
      <div className="cf-container trust-grid">
        {trustItems.map((item, index) => {
          const Icon = trustIcons[index] || Sparkles
          return (
            <div className="trust-item" key={item.label}>
              <span className="trust-icon">
                <Icon size={18} aria-hidden="true" />
              </span>
              <div>
                <strong>{item.label}</strong>
                <span>{item.hint}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function CategoryGrid() {
  return (
    <section className="cf-section">
      <div className="cf-container">
        <h2 className="cf-section-title">Explore Our Collections</h2>
        <p className="cf-section-sub">
          Shop by style — from cake candles to elegant gift sets.
        </p>
        <div className="category-grid">
          {categories.map((category) => (
            <Link className="category-card" key={category.title} to={category.to}>
              <img src={category.image} alt={category.title} loading="lazy" />
              <div className="category-card-meta">
                <h3>{category.title}</h3>
                <span>Shop now →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ScentsBanner() {
  return (
    <section className="cf-section" style={{ paddingTop: 0 }}>
      <div className="cf-container">
        <div className="feature-banner reveal">
          <img src={scentsBanner.image} alt="" />
          <div className="feature-banner-content">
            <h2>{scentsBanner.title}</h2>
            <p>{scentsBanner.text}</p>
            <Link className="cf-btn cf-btn-ghost" to="/shop?category=scented">
              {scentsBanner.cta}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <div className="scents-row">
              {scentsBanner.scents.map((scent, index) => {
                const Icon = scentIcons[index] || Flame
                return (
                  <span className="scent-chip" key={scent}>
                    <Icon size={14} aria-hidden="true" />
                    {scent}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function GiftBanner() {
  return (
    <section className="cf-section" style={{ paddingTop: 0 }}>
      <div className="cf-container">
        <div className="feature-banner">
          <img src={giftBanner.image} alt="" />
          <div className="feature-banner-content">
            <h2>{giftBanner.title}</h2>
            <p>{giftBanner.text}</p>
            <Link className="cf-btn" to={giftBanner.to}>
              {giftBanner.cta}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function BestSellers({ products }) {
  return (
    <section className="cf-section">
      <div className="cf-container">
        <h2 className="cf-section-title">Our Most Loved Candles</h2>
        <p className="cf-section-sub">Best sellers chosen by candle lovers across Pakistan.</p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function SeasonalBanner() {
  return (
    <section className="cf-section" style={{ paddingTop: 0 }}>
      <div className="cf-container">
        <div className="feature-banner">
          <img src={seasonalBanner.image} alt="" />
          <div className="feature-banner-content">
            <h2>{seasonalBanner.title}</h2>
            <p>{seasonalBanner.text}</p>
            <Link className="cf-btn" to={seasonalBanner.to}>
              {seasonalBanner.cta}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function OccasionGrid() {
  return (
    <section className="cf-section">
      <div className="cf-container">
        <h2 className="cf-section-title">Make Every Occasion Special</h2>
        <p className="cf-section-sub">Candles and gifts for the moments that matter most.</p>
        <div className="occasion-grid">
          {occasions.map((occasion) => (
            <Link className="occasion-card" key={occasion.title} to={occasion.to}>
              <img src={occasion.image} alt={occasion.title} loading="lazy" />
              <h3>{occasion.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PromoDuo() {
  return (
    <section className="cf-section" style={{ paddingTop: 0 }}>
      <div className="cf-container promo-duo">
        {promos.map((promo) => (
          <Link className="promo-card" key={promo.title} to={promo.to}>
            <img src={promo.image} alt="" />
            <div className="promo-card-content">
              <h3>{promo.title}</h3>
              <p>{promo.text}</p>
              <span className="cf-btn">
                {promo.cta}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function BrandStory() {
  return (
    <section className="cf-section">
      <div className="cf-container">
        <div className="brand-story">
          <div className="brand-story-media">
            <img src={brandStory.image} alt="Handcrafted Candle Fort candles" />
          </div>
          <div className="brand-story-content">
            <h2>{brandStory.title}</h2>
            <ul className="brand-points">
              {brandStory.points.map((point) => (
                <li key={point.title}>
                  <span className="point-icon">
                    <Sparkles size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{point.title}</strong>
                    <span>{point.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section className="cf-section" style={{ paddingTop: 0 }}>
      <div className="cf-container">
        <h2 className="cf-section-title">Loved by Candle Lovers</h2>
        <p className="cf-section-sub">Real stories from customers who lit up their moments with us.</p>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.name}>
              <div className="product-rating" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }, (_, index) => (
                  <Star key={index} size={14} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <p>“{item.quote}”</p>
              <div className="testimonial-author">
                <img src={item.avatar} alt="" />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function InstagramFeed() {
  return (
    <section className="cf-section">
      <div className="cf-container">
        <h2 className="cf-section-title">@candlefort</h2>
        <p className="cf-section-sub">Follow us for new drops, gift ideas, and candle inspiration.</p>
        <div className="instagram-grid">
          {instagramImages.map((image, index) => (
            <a
              key={image}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label={`Instagram photo ${index + 1}`}
            >
              <img src={image} alt="" loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function RecentlyViewed({ products }) {
  return (
    <section className="cf-section" style={{ paddingTop: 0 }}>
      <div className="cf-container">
        <h2 className="cf-section-title">Recently Viewed</h2>
        <p className="cf-section-sub">Pick up where you left off.</p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Guides() {
  return (
    <section className="cf-section" id="blog">
      <div className="cf-container guides-grid">
        <div>
          <h2 className="cf-section-title" style={{ textAlign: 'left' }}>
            Keep Your Candles Burning Beautifully
          </h2>
          <p className="cf-section-sub" style={{ textAlign: 'left', marginInline: 0 }}>
            Simple care tips for a cleaner, longer burn.
          </p>
          <ul className="care-list">
            {careTips.map((tip) => (
              <li key={tip.title}>
                <span className="point-icon">
                  <Flame size={16} aria-hidden="true" />
                </span>
                <div>
                  <strong>{tip.title}</strong>
                  <span>{tip.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="cf-section-title" style={{ textAlign: 'left' }}>
            Candle Tips, Gift Ideas & More
          </h2>
          <p className="cf-section-sub" style={{ textAlign: 'left', marginInline: 0 }}>
            Fresh inspiration from the Candle Fort journal.
          </p>
          <div className="blog-list">
            {blogPosts.map((post) => (
              <a className="blog-card" key={post.title} href={post.to}>
                <img src={post.image} alt="" loading="lazy" />
                <div>
                  <h3>{post.title}</h3>
                  <span>Read more →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function NewsletterFaq() {
  return (
    <section className="cf-section" id="faq">
      <div className="cf-container newsletter-faq">
        <div
          className="newsletter-card"
          style={{ backgroundImage: `url(${giftBanner.image})` }}
        >
          <h2>Join the Candle Fort Family</h2>
          <p>Get early access to drops, gifting ideas, and exclusive offers.</p>
          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
            <button type="submit" className="cf-btn">
              Subscribe
            </button>
          </form>
        </div>

        <div className="faq-card">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
