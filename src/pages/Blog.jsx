import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { blogPosts } from '../data/homeContent.js'

const articles = [
  { ...blogPosts[0], title: 'How to choose a candle gift', excerpt: 'Start with the person and the moment. A playful cake candle makes a celebration feel personal, while a beautifully presented candle set is an easy way to mark a thoughtful occasion.' },
  { ...blogPosts[1], title: 'Scent and glow for everyday moments', excerpt: 'A candle can make a room feel calmer and more inviting. Choose a design that feels at home in your space, then let its soft glow become part of your everyday ritual.' },
  { ...blogPosts[2], title: 'Simple candle care tips', excerpt: 'Trim the wick before lighting, place your candle on a stable heat-safe surface, and never leave a lit candle unattended. Let the wax cool completely before moving it.' },
]

function Blog() {
  return (
    <main className="store-page editorial-page">
      <div className="store-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Blog</span></div>
      <section className="shop-heading editorial-heading"><p className="store-eyebrow">The Candle Fort journal</p><h1>Stories for brighter moments</h1><p>Gift inspiration, candle care, and little ways to make everyday life feel special.</p></section>
      <div className="journal-grid">{articles.map((article, index) => <article className="journal-card" key={article.title}><img src={article.image} alt="" /><div><p className="store-eyebrow">{index === 2 ? 'Candle care' : 'Gift ideas'}</p><h2>{article.title}</h2><p>{article.excerpt}</p><a href="#journal">Read story <ArrowRight size={14} /></a></div></article>)}</div>
      <section className="journal-cta"><p className="store-eyebrow">Find your next favorite</p><h2>Make room for a little magic.</h2><Link className="store-button" to="/shop">Shop candles <ArrowRight size={16} /></Link></section>
    </main>
  )
}

export default Blog
