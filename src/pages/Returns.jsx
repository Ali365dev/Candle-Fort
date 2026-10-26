import { Link } from 'react-router'
import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react'

function Returns() {
  return (
    <main className="store-page editorial-page">
      <div className="store-breadcrumb"><Link to="/">Home</Link><span>/</span><span>Returns &amp; support</span></div>
      <section className="policy-card"><span><ShieldCheck size={25} /></span><p className="store-eyebrow">Here to help</p><h1>Returns &amp; order support</h1><p>If your order arrives damaged or something isn’t right, please contact us with your order number and a photo of the item. Our team will help you find the right next step.</p><p>For the quickest support, get in touch within 48 hours of delivery.</p><a className="store-button" href="https://wa.me/923210000262">Contact us on WhatsApp <MessageCircle size={16} /></a><Link className="policy-email" to="/contact">See all contact options <ArrowRight size={14} /></Link></section>
    </main>
  )
}

export default Returns
