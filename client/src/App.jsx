import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Carts from './pages/Carts'
import ProductDetails from './pages/ProductDetails'
import Checkout from './components/Checkout'
import OrderSuccess from './components/OrderSuccess'
import { SignIn } from '@clerk/clerk-react'

const App = () => {

  const location = useLocation()

  // pages where navbar should not appear
  const hideNavbar = ["/sign-in"]

  return (
    <>

      {/* {!hideNavbar.includes(location.pathname) && <Navbar />} */}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Carts />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Clerk page */}
        <Route
          path="/sign-in"
          element={
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
              <SignIn afterSignInUrl="/" />
            </div>
          }
        />

      </Routes>

    </>
  )
}

export default App