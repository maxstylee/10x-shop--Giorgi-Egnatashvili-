import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ScrollToTop } from './components/ScrollToTop.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { CartProvider } from './context/CartProvider.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 1. BrowserRouter — ერთადერთი როუტერის კონტეინერი */}
    <BrowserRouter>
      {/* 2. ScrollToTop — მარშრუტის ცვლილებისას გვერდის თავში გადახვევა */}
      <ScrollToTop />

      {/* 3. გლობალური Context პროვაიდერები (Auth & Cart) */}
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
