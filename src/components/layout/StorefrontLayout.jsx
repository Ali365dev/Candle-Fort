import { Outlet } from 'react-router'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

function StorefrontLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default StorefrontLayout
