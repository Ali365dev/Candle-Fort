import { useParams } from 'react-router'
import Placeholder from '../components/ui/Placeholder.jsx'

function ProductDetails() {
  const { productId } = useParams()

  return (
    <main className="page">
      <h1>Product details</h1>
      <Placeholder>
        Product information for {productId} will be loaded here.
      </Placeholder>
    </main>
  )
}

export default ProductDetails
