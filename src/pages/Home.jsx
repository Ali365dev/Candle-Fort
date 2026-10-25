import { useQuery } from '@tanstack/react-query'
import {
  BestSellers,
  BrandStory,
  CategoryGrid,
  GiftBanner,
  Guides,
  HeroSection,
  InstagramFeed,
  NewsletterFaq,
  OccasionGrid,
  PromoDuo,
  RecentlyViewed,
  ScentsBanner,
  SeasonalBanner,
  Testimonials,
  TrustBar,
} from '../components/home/HomeSections.jsx'
import {
  placeholderProducts,
  recentlyViewedFallback,
} from '../data/homeContent.js'
import { firebaseConfigured } from '../services/firebase.js'
import { getProducts } from '../services/productService.js'
import { normalizeProduct, withFallbackImage } from '../utils/formatProduct.js'

function Home() {
  const productsQuery = useQuery({
    queryKey: ['products', 'home'],
    queryFn: getProducts,
    enabled: firebaseConfigured,
    retry: 1,
  })

  const liveProducts = (productsQuery.data ?? [])
    .map(normalizeProduct)
    .map((product, index) =>
      withFallbackImage(
        product,
        placeholderProducts[index % placeholderProducts.length].imageUrl,
      ),
    )

  const bestSellers =
    liveProducts.length > 0
      ? liveProducts.slice(0, 5)
      : placeholderProducts

  const recentlyViewed =
    liveProducts.length > 1
      ? liveProducts.slice(0, 4)
      : recentlyViewedFallback

  return (
    <main>
      <HeroSection />
      <TrustBar />
      <CategoryGrid />
      <ScentsBanner />
      <GiftBanner />
      <BestSellers products={bestSellers} />
      <SeasonalBanner />
      <OccasionGrid />
      <PromoDuo />
      <BrandStory />
      <Testimonials />
      <InstagramFeed />
      <RecentlyViewed products={recentlyViewed} />
      <Guides />
      <NewsletterFaq />
    </main>
  )
}

export default Home
