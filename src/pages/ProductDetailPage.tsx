import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../api/products'
import { useCart } from '../hooks/useCart'
import type { Product } from '../types/product'
import { NotFoundPage } from './NotFoundPage'

/**
 * ProductDetailPage — Product Detail View (/products/:id)
 */
export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const [isAdded, setIsAdded] = useState<boolean>(false)
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
          setQuantity(1)
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err instanceof Error ? err.message : 'Failed to load product details')
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

  // If product does not exist or fetch fails -> NotFoundPage
  if (error || !product) {
    return <NotFoundPage />
  }

  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <article className="space-y-6">
      {/* Back to Catalog Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
      >
        <span>←</span>
        <span>Back to catalog</span>
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* 1. Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  aria-label={`View photo ${idx + 1}`}
                  className={`h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border bg-white p-1 transition dark:bg-gray-900 ${
                    selectedImage === img
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'border-gray-200 hover:border-gray-400 dark:border-gray-800'
                  }`}
                >
                  <img src={img} alt={`${product.title} - ${idx + 1}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Product Information */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 capitalize dark:bg-indigo-950 dark:text-indigo-300">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Brand: <strong className="text-gray-800 dark:text-gray-200">{product.brand}</strong>
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

            {/* Price Box */}
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
                      -{Math.round(product.discountPercentage)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                {product.stock > 0 ? `✓ In stock (${product.stock} available)` : '✕ Out of stock'}
              </p>
            </div>
          </div>

          {/* 3. Interactive Quantity Selector and Add to Cart */}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Quantity:
              </span>

              {/* Quantity Counter (- / +) */}
              <div className="inline-flex items-center rounded-xl border border-gray-300 bg-white p-1 dark:border-gray-700 dark:bg-gray-800 shadow-xs">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || product.stock <= 0}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                >
                  -
                </button>

                <span className="w-10 text-center text-sm font-bold text-gray-900 dark:text-white">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock || product.stock <= 0}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Line item subtotal */}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Subtotal: <strong className="text-gray-900 dark:text-white">${(product.price * quantity).toFixed(2)}</strong>
              </span>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`w-full cursor-pointer rounded-xl py-3.5 text-center text-sm font-bold text-white shadow-lg transition active:scale-98 disabled:cursor-not-allowed disabled:opacity-50 ${
                isAdded
                  ? 'bg-emerald-600 shadow-emerald-500/25'
                  : 'bg-indigo-600 shadow-indigo-500/25 hover:bg-indigo-700'
              }`}
            >
              {isAdded ? `✓ Added to cart (${quantity})` : `🛒 Add to cart (${quantity})`}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
