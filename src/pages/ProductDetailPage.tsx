import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../api/products'
import { useCart } from '../hooks/useCart'
import type { Product } from '../types/product'

/**
 * ProductDetailPage — პროდუქტის დეტალური გვერდი (/products/:id)
 */
export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isSubscribed = true
    if (!id) return
    const productId = id

    async function fetchDetail() {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getProductById(productId)
        if (isSubscribed) {
          setProduct(data)
          setSelectedImage(data.thumbnail)
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err instanceof Error ? err.message : 'პროდუქტის ჩატვირთვა ვერ მოხერხდა')
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false)
        }
      }
    }

    fetchDetail()

    return () => {
      isSubscribed = false
    }
  }, [id])

  if (isLoading) {
    return (
      <div className="py-16 text-center animate-pulse">
        <div className="mx-auto h-72 w-72 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        <div className="mx-auto mt-6 h-6 w-64 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mx-auto mt-3 h-4 w-96 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div role="alert" className="my-12 rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/30">
        <span className="text-4xl" aria-hidden="true">⚠️</span>
        <h2 className="mt-2 text-lg font-bold text-red-800 dark:text-red-200">
          {error || 'პროდუქტი ვერ მოიძებნა'}
        </h2>
        <Link
          to="/"
          className="mt-4 inline-block rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
        >
          ⬅️ კატალოგში დაბრუნება
        </Link>
      </div>
    )
  }

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2)

  return (
    <article className="space-y-6">
      {/* უკან დაბრუნების ბმული */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
      >
        <span>←</span>
        <span>კატალოგში დაბრუნება</span>
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* სურათების გალერეა */}
        <div className="space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* დამატებითი სურათების მინიატურები */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border bg-white p-1 transition dark:bg-gray-900 ${
                    selectedImage === img
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'border-gray-200 hover:border-gray-400 dark:border-gray-800'
                  }`}
                >
                  <img src={img} alt={`${product.title} - ${idx}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* პროდუქტის დეტალები */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 capitalize dark:bg-indigo-950 dark:text-indigo-300">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ბრენდი: <strong className="text-gray-800 dark:text-gray-200">{product.brand}</strong>
                </span>
              )}
              <span className="text-xs font-semibold text-amber-500">
                ★ {product.rating.toFixed(1)} / 5.0
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
              {product.title}
            </h2>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {product.description}
            </p>

            {/* ფასი */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/50">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-sm text-gray-400 line-through">
                      ${originalPrice}
                    </span>
                    <span className="rounded-lg bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
                      -{Math.round(product.discountPercentage)}% ფასდაკლება
                    </span>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {product.stock > 0 ? `✓ მარაგშია ${product.stock} ცალი` : '✕ მარაგი ამოიწურა'}
              </p>
            </div>
          </div>

          {/* კალათაში დამატების ღილაკი */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className="w-full cursor-pointer rounded-xl bg-indigo-600 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-700 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50"
            >
              🛒 კალათაში დამატება
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
