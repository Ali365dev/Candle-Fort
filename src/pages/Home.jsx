import { useQuery } from '@tanstack/react-query'
import { placeholderProducts } from '../data/homeContent.js'
import { firebaseConfigured } from '../services/firebase.js'
import { getProducts } from '../services/productService.js'
import { normalizeProduct, withFallbackImage } from '../utils/formatProduct.js'
import CandleFortLanding from '../components/home/CandleFortLanding.jsx'

function Home() {
  const productsQuery = useQuery({
    queryKey: ['products', 'home'],
    queryFn: getProducts,
    enabled: firebaseConfigured,
    retry: 1,
  })

  const liveProducts = (productsQuery.data ?? [])
    .filter((product) => product.active !== false)
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
      : placeholderProducts.slice(1, 5)

  return (
    <CandleFortLanding products={bestSellers} recentlyViewed={recentlyViewed} />
  )
}

export default Home
