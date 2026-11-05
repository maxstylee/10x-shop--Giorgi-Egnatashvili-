import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { CartProvider } from './context/CartProvider'
import { MainLayout } from './layouts/MainLayout'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductDetailPage } from './pages/ProductDetailPage'

/**
 * App — ძირითადი Root კომპონენტი
 * 1. BrowserRouter: უზრუნველყოფს Client-Side Routing-ს reload-ის გარეშე.
 * 2. AuthProvider & CartProvider: გლობალური მდგომარეობის მართვა (Context API).
 * 3. MainLayout: საერთო ჩონჩხი (Header, Footer, props.children).
 * 4. Routes: 6 ძირითადი როუტი (/, /products/:id, /cart, /login, /checkout, *).
 */
export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
