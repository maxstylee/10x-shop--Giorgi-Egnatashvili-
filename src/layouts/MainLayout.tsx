import type { ReactNode } from 'react'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

interface MainLayoutProps {
  children: ReactNode // props.children კომპოზიცია
}

/**
 * MainLayout — საიტის საერთო ჩონჩხი (Layout)
 * იყენებს props.children-ს და შეიცავს Header-სა და Footer-ს.
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
