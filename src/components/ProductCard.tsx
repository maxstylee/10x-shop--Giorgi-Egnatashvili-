import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  // Calculate original MSRP price before discount
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2)

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <div>
        {/* Clickable Image linking to Product Details */}
        <Link
          to={`/products/${product.id}`}
          className="relative block aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
          />

          {/* Discount Percentage Badge */}
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 rounded-lg bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}

          {/* Category Badge */}
          <span className="absolute top-2 right-2 rounded-lg bg-gray-900/80 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-xs capitalize dark:bg-gray-100/90 dark:text-gray-900">
            {product.category}
          </span>
        </Link>

        {/* Product Details Header & Description */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-amber-500 font-semibold mb-1">
            <span className="flex items-center gap-1">
              ★ {product.rating.toFixed(1)}
            </span>
            {product.brand && (
              <span className="text-gray-500 dark:text-gray-400 font-normal">
                {product.brand}
              </span>
            )}
          </div>

          <Link to={`/products/${product.id}`}>
            <h3 className="line-clamp-1 text-base font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition" title={product.title}>
              {product.title}
            </h3>
          </Link>

          <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400" title={product.description}>
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing and Action Buttons */}
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2.5">
        {/* Price & Stock status */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${originalPrice}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
            {product.stock > 0 ? `In stock: ${product.stock}` : 'Out of stock'}
          </span>
        </div>

        {/* Action Button Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* View Details */}
          <Link
            to={`/products/${product.id}`}
            className="flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50/70 py-2 text-center text-xs font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-700 transition"
          >
            Details
          </Link>

          {/* Quick Add to Cart */}
          <button
            type="button"
            onClick={() => addToCart(product)}
            disabled={product.stock <= 0}
            aria-label={`Add to cart: ${product.title}`}
            className="cursor-pointer flex items-center justify-center gap-1 rounded-xl bg-indigo-600 py-2 text-center text-xs font-semibold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>+</span>
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  )
}
