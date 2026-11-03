import type { User } from '../types/auth'

interface HeaderProps {
  cartCount: number
  onOpenCart: () => void
  user: User | null
  onOpenLogin: () => void
  onLogout: () => void
}

export function Header({
  cartCount,
  onOpenCart,
  user,
  onOpenLogin,
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white font-black text-xl shadow-md shadow-indigo-500/20">
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
        </div>

        <nav aria-label="მთავარი ნავიგაცია" className="flex items-center gap-3">
          {/* მომხმარებლის სტატუსი / Login ღილაკი (Conditional Rendering) */}
          {user ? (
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 dark:border-gray-800 dark:bg-gray-900">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                👤 {user.username}
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="cursor-pointer text-[11px] font-medium text-rose-500 hover:text-rose-600 dark:text-rose-400 transition ml-1 underline"
              >
                გამოსვლა
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 transition"
            >
              <span>🔑</span>
              <span>შესვლა</span>
            </button>
          )}

          {/* კალათის გახსნის ღილაკი ბეიჯით */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`კალათის გახსნა, ${cartCount} პროდუქტი`}
            className="cursor-pointer relative inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-500/25 transition hover:bg-indigo-700 active:scale-95"
          >
            <span aria-hidden="true">🛒</span>
            <span className="hidden sm:inline">კალათა</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold text-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
