import { Route, Routes } from 'react-router'
import StorefrontLayout from './components/layout/StorefrontLayout.jsx'
import AdminLayout from './components/layout/AdminLayout.jsx'
import AddProduct from './pages/admin/AddProduct.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Orders from './pages/admin/Orders.jsx'
import Products from './pages/admin/Products.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Shop from './pages/Shop.jsx'
import ProtectedAdminRoute from './routes/ProtectedAdminRoute.jsx'

function NotFound() {
  return (
    <main className="page">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
    </main>
  )
}

function App() {
  return (
    <CandleFortHome />
    // <Routes>
    //   <Route element={<StorefrontLayout />}>
    //     <Route index element={<Home />} />
    //     {/* <Route path="shop" element={<Shop />} />
    //     <Route path="products/:productId" element={<ProductDetails />} />
    //     <Route path="cart" element={<Cart />} />
    //     <Route path="checkout" element={<Checkout />} />
    //     <Route path="login" element={<Login />} /> */}
    //   </Route>
    //   {/* <Route path="admin" element={<ProtectedAdminRoute />}>
    //     <Route element={<AdminLayout />}>
    //       <Route index element={<Dashboard />} />
    //       <Route path="products" element={<Products />} />
    //       <Route path="products/new" element={<AddProduct />} />
    //       <Route path="orders" element={<Orders />} />
    //     </Route>
    //   </Route> */}
    //   <Route path="*" element={<NotFound />} />
    // </Routes>
  )
}

export default App
