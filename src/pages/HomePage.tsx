import { useEffect, useState } from 'react'
import { getProductsByCategory, TECH_CATEGORIES } from '../api/products'
import { ProductCard } from '../components/ProductCard'
import { ProductSkeleton } from '../components/ProductSkeleton'
import type { Product } from '../types/product'

interface HomePageProps {
  onAddToCart: (product: Product) => void // Callback Prop კალათაში დასამატებლად
}

/**
 * HomePage — მთავარი გვერდის კომპონენტი
 * იღებს onAddToCart callback prop-ს და გადასცემს თითოეულ ProductCard-ს.
 */
export function HomePage({ onAddToCart }: HomePageProps) {
  // 1. State (მდგომარეობები)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('smartphones')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // 2. მონაცემების ხელით განახლება (Refresh ღილაკისთვის)
  const handleRefresh = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getProductsByCategory(selectedCategory, 12, 0)
      setProducts(data.products)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'უცნობი შეცდომა მონაცემების ჩატვირთვისას')
    } finally {
      setIsLoading(false)
    }
  }

  // 3. useEffect — იტვირთება გვერდის გახსნისას და ყოველ ჯერზე, როდესაც კატეგორია იცვლება
  useEffect(() => {
    let isSubscribed = true

    async function loadCategoryProducts() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getProductsByCategory(selectedCategory, 12, 0)
        if (isSubscribed) {
          setProducts(data.products)
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err instanceof Error ? err.message : 'ტექნიკის ჩატვირთვა ვერ მოხერხდა')
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false)
        }
      }
    }

    loadCategoryProducts()

    return () => {
      isSubscribed = false
    }
  }, [selectedCategory])

  const currentCategoryObj = TECH_CATEGORIES.find((c) => c.slug === selectedCategory)

  return (
    <section id="products-section" aria-labelledby="products-heading">
      {/* სექციის სათაური და აღწერა */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <span>⚡</span>
            <span>ტექნოლოგიები & გაჯეტები</span>
          </div>
          <h2 id="products-heading" className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            {currentCategoryObj ? `${currentCategoryObj.icon} ${currentCategoryObj.name}` : 'ტექნიკის კატალოგი'}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            DummyJSON API-დან მიღებული ტექნიკის პროდუქტები
          </p>
        </div>

        {/* განახლების (Refresh) ღილაკი */}
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isLoading}
          className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-xl bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-xs ring-1 ring-gray-200 transition hover:bg-gray-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 md:self-auto dark:bg-gray-900 dark:text-gray-200 dark:ring-gray-800 dark:hover:bg-gray-800"
        >
          <span className={isLoading ? 'animate-spin' : ''}>🔄</span>
          განახლება
        </button>
      </div>

      {/* ტექნიკის კატეგორიების ტაბები (ფილტრი) */}
      <div className="mt-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4 dark:border-gray-800" role="tablist" aria-label="ტექნიკის კატეგორიები">
        {TECH_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category.slug
          return (
            <button
              key={category.slug}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(category.slug)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition active:scale-95 ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-800'
              }`}
            >
              <span aria-hidden="true">{category.icon}</span>
              {category.name}
            </button>
          )
        })}
      </div>

      {/* 1. Loading State (ჩატვირთვის პროცესი - სკელეტონები) */}
      {isLoading && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {/* 2. Error State (შეცდომის ეკრანი) */}
      {!isLoading && error && (
        <div role="alert" className="my-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900/50 dark:bg-red-950/30">
          <span className="text-3xl" aria-hidden="true">⚠️</span>
          <h3 className="mt-2 text-base font-semibold text-red-800 dark:text-red-200">
            მონაცემების ჩატვირთვა ვერ მოხერხდა
          </h3>
          <p className="mt-1 text-sm text-red-600 dark:text-red-300">
            {error}
          </p>
          <button
            type="button"
            onClick={handleRefresh}
            className="mt-4 cursor-pointer rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
          >
            ხელახლა ცდა
          </button>
        </div>
      )}

      {/* 3. Empty State (თუ კატეგორიაში მონაცემი არაა) */}
      {!isLoading && !error && products.length === 0 && (
        <div className="my-12 text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium">ამ კატეგორიაში პროდუქტები ვერ მოიძებნა</p>
        </div>
      )}

      {/* 4. Success State (ტექნიკის პროდუქტების ბარათები) */}
      {!isLoading && !error && products.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  )
}
