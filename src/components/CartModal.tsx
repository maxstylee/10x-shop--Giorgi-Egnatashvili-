import type { CartItem } from '../types/cart'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  onUpdateQuantity: (productId: number, newQuantity: number) => void
  onRemoveFromCart: (productId: number) => void
  onClearCart: () => void
}

/**
 * CartModal — კალათის მოდალური ფანჯარა
 * აჩვენებს დამატებულ პროდუქტებს, რაოდენობის შეცვლას, წაშლას და ჯამურ თანხას.
 */
export function CartModal({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
}: CartModalProps) {
  if (!isOpen) return null

  // ჯამური თანხის გამოთვლა
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* ფონის დაბნელება (Backdrop) */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* მოდალის კონტეინერი */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col max-h-[90vh] rounded-2xl bg-white shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200">
        {/* მოდალის თავი */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <h2 id="cart-modal-title" className="text-lg font-bold text-gray-900 dark:text-white">
              კალათა
            </h2>
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {totalItemsCount} ნივთი
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="კალათის დახურვა"
            className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* მოდალის შიგთავსი (სია) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-12 text-center">
              <span className="text-5xl" aria-hidden="true">🛍️</span>
              <p className="mt-3 text-base font-medium text-gray-900 dark:text-white">
                თქვენი კალათა ცარიელია
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                დაამატეთ სასურველი ტექნიკა კატალოგიდან
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {cart.map(({ product, quantity }) => (
                <li key={product.id} className="flex items-center gap-4 py-3">
                  {/* სურათი */}
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-16 w-16 rounded-xl bg-gray-100 object-contain p-1 dark:bg-gray-800"
                  />

                  {/* სახელი და ფასი */}
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-white" title={product.title}>
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ${product.price.toFixed(2)} / ცალი
                    </p>
                    <p className="mt-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      ჯამი: ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* რაოდენობის კონტროლი */}
                  <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-800">
                    <button
                      type="button"
                      aria-label="რაოდენობის შემცირება"
                      onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                      className="cursor-pointer flex h-6 w-6 items-center justify-center rounded-md bg-white text-xs font-bold text-gray-700 shadow-xs hover:bg-gray-100 active:scale-95 dark:bg-gray-700 dark:text-gray-200"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-gray-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="რაოდენობის გაზრდა"
                      onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                      className="cursor-pointer flex h-6 w-6 items-center justify-center rounded-md bg-white text-xs font-bold text-gray-700 shadow-xs hover:bg-gray-100 active:scale-95 dark:bg-gray-700 dark:text-gray-200"
                    >
                      +
                    </button>
                  </div>

                  {/* წაშლის ღილაკი */}
                  <button
                    type="button"
                    onClick={() => onRemoveFromCart(product.id)}
                    aria-label={`კალათიდან წაშლა: ${product.title}`}
                    className="cursor-pointer rounded-lg p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* მოდალის ძირი (Footer) */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-gray-900/50 rounded-b-2xl">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">სულ გადასახდელი:</span>
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={onClearCart}
                className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                გასუფთავება
              </button>

              <button
                type="button"
                onClick={() => {
                  alert(`შეკვეთა მიღებულია! ჯამი: $${totalPrice.toFixed(2)}`)
                  onClearCart()
                  onClose()
                }}
                className="flex-1 cursor-pointer rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700 active:scale-95"
              >
                შეკვეთის გაფორმება
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

