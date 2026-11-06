import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

/**
 * MainLayout — Layout მარშრუტი (Header + <Outlet /> + Footer)
 * ყველა გვერდი ზის ამ Layout-ში <Outlet /> კომპონენტის მეშვეობით,
 * რაც გამორიცხავს Header-ისა და Footer-ის ყოველ გვერდზე დუბლირებას.
 */
export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
