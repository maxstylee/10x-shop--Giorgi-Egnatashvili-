import { useEffect, useState } from 'react'
import { CartModal } from './components/CartModal'
import { LoginModal } from './components/LoginModal'
import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import type { User } from './types/auth'
import type { CartItem } from './types/cart'
import type { Product } from './types/product'

const CART_STORAGE_KEY = '10x_shop_cart'
const USER_STORAGE_KEY = '10x_shop_user'

/**
 * App — Root კომპონენტი
 * მართავს საერთო Cart და Login მდგომარეობებს (Lifting State Up)
 * და localStorage-თან სინქრონიზაციას.
 */
export function App() {
  // 1. Cart State (Lazy Initializer)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })

  // 2. User State (Login / Auth)
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY)
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  // მოდალების გახსნა/დახურვის State
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false)

  // 3. Cart-ის სინქრონიზაცია localStorage-ში
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (err) {
      console.error('კალათის შენახვა localStorage-ში ვერ მოხერხდა', err)
    }
  }, [cart])

  // 4. Cart Immutable Actions: დამატება
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { product, quantity: 1 }]
    })
  }

  // Cart Immutable Actions: რაოდენობის შეცვლა
  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.product.id !== productId)
      }
      return prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    })
  }

  // Cart Immutable Actions: წაშლა
  const handleRemoveFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  // Cart: გასუფთავება
  const handleClearCart = () => {
    setCart([])
  }

  // 5. Auth Actions: Login & Logout
  const handleLogin = (newUser: User) => {
    setUser(newUser)
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser))
    } catch (err) {
      console.error('მომხმარებლის შენახვა ვერ მოხერხდა', err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    try {
      localStorage.removeItem(USER_STORAGE_KEY)
    } catch (err) {
      console.error('მომხმარებლის წაშლა ვერ მოხერხდა', err)
    }
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <MainLayout
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      >
        <HomePage onAddToCart={handleAddToCart} />
      </MainLayout>

      {/* კალათის მოდალი */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* ავტორიზაციის მოდალი (კონტროლირებადი ფორმა) */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </>
  )
}

export default App
