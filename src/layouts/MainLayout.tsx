import type { ReactNode } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import type { User } from '../types/auth'

interface MainLayoutProps {
  children: ReactNode
  cartCount: number
  onOpenCart: () => void
  user: User | null
  onOpenLogin: () => void
  onLogout: () => void
}

/**
 * MainLayout — საიტის ძირითადი ჩონჩხი (Layout)
 * იყენებს props.children-ს, რათა შიგთავსი ჩასვას Header-სა და Footer-ს შორის.
 */
export function MainLayout({
  children,
  cartCount,
  onOpenCart,
  user,
  onOpenLogin,
  onLogout,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* ჰედერი კალათისა და ავტორიზაციის ღილაკებით */}
      <Header
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        user={user}
        onOpenLogin={onOpenLogin}
        onLogout={onLogout}
      />

      {/* ძირითადი კონტენტი (props.children) */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* ფუტერი */}
      <Footer />
    </div>
  )
}
