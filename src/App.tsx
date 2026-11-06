import { Route, Routes } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductDetailPage } from './pages/ProductDetailPage'

/**
 * App — როუტების მთავარი ორკესტრატორი
 * შეიცავს ერთ Layout მარშრუტს (Header + <Outlet /> + Footer)
 * და ყველა აპლიკაციის გვერდს.
 */
export function App() {
  return (
    <Routes>
      {/* ერთი Layout მარშრუტი (Header + <Outlet /> + Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
