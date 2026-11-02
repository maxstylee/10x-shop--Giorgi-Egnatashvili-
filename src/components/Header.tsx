export function Header() {
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

        <nav aria-label="მთავარი ნავიგაცია" className="flex items-center gap-4">
          <a
            href="#products-section"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition"
          >
            ტექნიკა
          </a>
          <a
            href="https://dummyjson.com/products/categories"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 transition"
          >
            კატეგორიები ↗
          </a>
        </nav>
      </div>
    </header>
  )
}
