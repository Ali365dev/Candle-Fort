import { Route, Routes } from 'react-router'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'
import StorefrontLayout from './components/layout/StorefrontLayout.jsx'
import AdminLayout from './components/layout/AdminLayout.jsx'
import AddProduct from './pages/admin/AddProduct.jsx'
import AdminModuleManager, { AdminModuleFormRoute } from './pages/admin/AdminModuleManager.jsx'
import AdminSection from './pages/admin/AdminSection.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Orders from './pages/admin/Orders.jsx'
import Products from './pages/admin/Products.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Returns from './pages/Returns.jsx'
import Shop from './pages/Shop.jsx'
import TrackOrder from './pages/TrackOrder.jsx'
import ProtectedAdminRoute from './routes/ProtectedAdminRoute.jsx'

function App() {
  return (
    <Routes>
      <Route element={<StorefrontLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="returns" element={<Returns />} />
        <Route path="track" element={<TrackOrder />} />
      </Route>
      <Route path="admin" element={<ProtectedAdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product-list" element={<Products />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<AddProduct />} />
          <Route path="products/:productId/edit" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="manage/:moduleId" element={<AdminModuleManager />} />
          <Route path="manage/:moduleId/new" element={<AdminModuleFormRoute mode="new" />} />
          <Route path="manage/:moduleId/:recordId/edit" element={<AdminModuleFormRoute />} />
          <Route path="sections/:sectionId" element={<AdminSection />} />
          <Route path="category" element={<AdminModuleManager moduleId="categories" />} />
          <Route path="category/:sectionId" element={<AdminSection />} />
          <Route path="blog" element={<AdminModuleManager moduleId="blogs" />} />
          <Route path="blog/:sectionId" element={<AdminSection />} />
          <Route path="pages" element={<AdminModuleManager moduleId="pages" />} />
          <Route path="report" element={<AdminSection defaultSectionId="report" />} />
          <Route path="settings" element={<AdminModuleManager moduleId="appSettings" />} />
          <Route path="settings/:sectionId" element={<AdminSection />} />
        </Route>
      </Route>
      <Route path="*" element={<main className="page"><h1>Page not found</h1><p>The page you are looking for does not exist.</p></main>} />
    </Routes>
  )
}

export default App
