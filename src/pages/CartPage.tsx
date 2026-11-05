import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

/**
 * CartPage — კალათის სრული გვერდი (/cart)
 */
export function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice, totalCount } = useCart()

  if (cart.length === 0) {
    return (
      <section className="py-16 text-center">
        <span className="text-6xl" aria-hidden="true">🛒</span>
        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          თქვენი კალათა ცარიელია
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          კალათაში ჯერ არ გაქვთ დამატებული არცერთი პროდუქტი.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700"
        >
          ტექნიკის კატალოგის დათვალიერება
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-5 dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            თქვენი კალათა
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            სულ {totalCount} ნივთი
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="cursor-pointer text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 underline"
        >
          კალათის გასუფთავება
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ნივთების სია */}
        <div className="lg:col-span-2 space-y-4">
          <ul className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900">
            {cart.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <Link to={`/products/${product.id}`} className="shrink-0">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-20 w-20 rounded-xl bg-gray-100 object-contain p-2 dark:bg-gray-800 hover:opacity-90 transition"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="truncate text-sm font-semibold text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    ${product.price.toFixed(2)} / ცალი
                  </p>
                  <p className="mt-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    ჯამი: ${(product.price * quantity).toFixed(2)}
                  </p>
                </div>

                {/* რაოდენობის კონტროლი */}
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800">
                  <button
                    type="button"
                    aria-label="რაოდენობის შემცირება"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="cursor-pointer flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-gray-700 shadow-xs hover:bg-gray-100 active:scale-95 dark:bg-gray-700 dark:text-gray-200"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-gray-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="რაოდენობის გაზრდა"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="cursor-pointer flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-gray-700 shadow-xs hover:bg-gray-100 active:scale-95 dark:bg-gray-700 dark:text-gray-200"
                  >
                    +
                  </button>
                </div>

                {/* წაშლა */}
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  aria-label={`კალათიდან წაშლა: ${product.title}`}
                  className="cursor-pointer rounded-xl p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* შეჯამება და გადასვლა Checkout-ზე */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 h-fit space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            შეკვეთის შეჯამება
          </h3>

          <div className="space-y-2 border-t border-b border-gray-100 py-4 text-xs dark:border-gray-800">
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>ნივთების ჯამი:</span>
              <span className="font-semibold text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
              <span>მიწოდება:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">უფასო</span>
            </div>
          </div>

          <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
            <span>სულ:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="block w-full cursor-pointer rounded-xl bg-indigo-600 py-3 text-center text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700 active:scale-98"
          >
            შეკვეთის გაფორმებაზე გადასვლა ➔
          </Link>

          <Link
            to="/"
            className="block text-center text-xs text-gray-500 hover:text-indigo-600 dark:text-gray-400 transition"
          >
            ← შოპინგის გაგრძელება
          </Link>
        </div>
      </div>
    </section>
  )
}
