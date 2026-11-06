import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

export function Header() {
  const { user, logout } = useAuth()
  const { totalCount } = useCart()

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* ლოგო და სათაური — მთავარ გვერდზე გადასვლა */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black text-xl shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            10x
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              10x Tech Shop
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ტექნიკისა და ელექტრონიკის კატალოგი
            </p>
          </div>
        </Link>

        {/* ნავიგაცია NavLink-ის active კლასით */}
        <nav aria-label="მთავარი ნავიგაცია" className="flex items-center gap-3">
          {/* კატალოგის NavLink */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `hidden sm:inline-block text-sm font-medium transition ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 pb-0.5'
                  : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
              }`
            }
          >
            კატალოგი
          </NavLink>

          {/* მომხმარებლის სტატუსი ან შესვლის NavLink */}
          {user ? (
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-gray-800 dark:bg-gray-900">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                👤 {user.username}
              </span>
              <button
                type="button"
                onClick={logout}
                className="cursor-pointer text-[11px] font-medium text-rose-500 hover:text-rose-600 dark:text-rose-400 transition ml-1 underline"
              >
                გამოსვლა
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition ${
                  isActive
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:border-indigo-500 dark:text-indigo-300 shadow-xs'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800'
                }`
              }
            >
              <span>🔑</span>
              <span>შესვლა</span>
            </NavLink>
          )}

          {/* კალათის NavLink active ეფექტითა და ბეიჯით */}
          <NavLink
            to="/cart"
            aria-label={`კალათა, ${totalCount} პროდუქტი`}
            className={({ isActive }) =>
              `relative inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white transition active:scale-95 ${
                isActive
                  ? 'bg-indigo-700 shadow-md ring-2 ring-indigo-400 ring-offset-2 dark:ring-offset-gray-900'
                  : 'bg-indigo-600 shadow-sm shadow-indigo-500/25 hover:bg-indigo-700'
              }`
            }
          >
            <span aria-hidden="true">🛒</span>
            <span className="hidden sm:inline">კალათა</span>
            {totalCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold text-white shadow-xs">
                {totalCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
