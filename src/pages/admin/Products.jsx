import { Link } from 'react-router'
import Placeholder from '../../components/ui/Placeholder.jsx'

function Products() {
  return (
    <>
      <div className="page-heading">
        <h1>Products</h1>
        <Link className="button-link" to="/admin/products/new">
          Add product
        </Link>
      </div>
      <Placeholder>Product management will be connected to Firestore here.</Placeholder>
    </>
  )
}

export default Products
