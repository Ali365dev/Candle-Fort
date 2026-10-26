import { ArrowUpRight, LayoutDashboard } from 'lucide-react'
import { Link, useParams } from 'react-router'

const sectionDetails = {
  slider: { title: 'Slider', description: 'Manage the main homepage banner slides.', preview: '/' },
  'middle-slider-list': { title: 'Middle Slider List', description: 'Manage the promotional banners shown between homepage sections.', preview: '/' },
  'featured-categories': { title: 'Featured Categories', description: 'Choose the categories highlighted on the homepage.', preview: '/shop' },
  'featured-products': { title: 'Featured Products', description: 'Choose which products are promoted on the homepage.', preview: '/shop' },
  'featured-blogs': { title: 'Featured Blogs', description: 'Choose the articles highlighted on the homepage.', preview: '/blog' },
  'marketing-section': { title: 'Marketing Section', description: 'Manage homepage marketing messages and promotional content.', preview: '/' },
  category: { title: 'Category', description: 'Review the product categories used in the storefront.', preview: '/shop' },
  'category-list': { title: 'Category List', description: 'Manage the product categories used in the storefront.', preview: '/shop' },
  'subcategory-list': { title: 'Subcategory List', description: 'Manage the subcategories used to organize products.', preview: '/shop' },
  blog: { title: 'Blog', description: 'Review the articles published on the storefront.', preview: '/blog' },
  'blog-list': { title: 'Blog List', description: 'Manage articles published on the storefront.', preview: '/blog' },
  'blog-category-list': { title: 'Blog Category List', description: 'Manage categories used to organize blog articles.', preview: '/blog' },
  pages: { title: 'Pages', description: 'Review the storefront information pages.', preview: '/about' },
  report: { title: 'Report', description: 'Store reports and sales summaries.', preview: null },
  settings: { title: 'Settings', description: 'Store and administrator settings.', preview: null },
  'app-settings': { title: 'App Settings', description: 'Manage general Candle Fort application settings.', preview: null },
  'about-us': { title: 'About Us', description: 'Manage the About Us content shown on the storefront.', preview: '/about' },
  colors: { title: 'Colors', description: 'Manage the storefront color palette.', preview: '/' },
  'promotional-overlay': { title: 'Promotional Overlay', description: 'Manage promotional messages displayed over storefront content.', preview: '/' },
  'shipping-methods': { title: 'Shipping Methods', description: 'Manage the shipping methods offered at checkout.', preview: '/checkout' },
  'shipping-rates': { title: 'Shipping Rates', description: 'Manage delivery rates used during checkout.', preview: '/checkout' },
  'size-variants': { title: 'Size Variants', description: 'Manage product size options.', preview: '/shop' },
  'theme-settings': { title: 'Theme Settings', description: 'Manage the Candle Fort storefront theme.', preview: '/' },
}

function AdminSection({ defaultSectionId = 'settings' }) {
  const { sectionId } = useParams()
  const section = sectionDetails[sectionId || defaultSectionId] || sectionDetails.settings

  return (
    <div className="admin-section-page">
      <div className="admin-page-heading">
        <div>
          <p className="admin-eyebrow">Candle Fort admin</p>
          <h1>{section.title}</h1>
          <p className="admin-heading-sub">{section.description}</p>
        </div>
      </div>
      <section className="admin-section-placeholder">
        <span><LayoutDashboard size={20} /></span>
        <h2>{section.title} workspace</h2>
        <p>This destination is connected in the admin menu. Its content editing tools are not available yet.</p>
        <div className="admin-section-placeholder-actions">
          {section.preview ? <Link to={section.preview}>Preview on storefront <ArrowUpRight size={14} /></Link> : null}
          <Link to="/admin">Back to dashboard</Link>
        </div>
      </section>
    </div>
  )
}

export default AdminSection
