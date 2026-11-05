import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import type { CheckoutFormData } from '../types/checkout'

/**
 * CheckoutPage — შეკვეთის გაფორმების გვერდი (/checkout)
 * 1. Rules of Hooks: ყველა hook გამოიძახება კომპონენტის დასაწყისში უპირობოდ.
 * 2. თუ სტუმარია (არაა დალოგინებული), გადამისამართდება /login-ზე state={{ from: '/checkout' }}-ით.
 * 3. ლოგინის შემდეგ ავტომატურად ბრუნდება უკან /checkout-ზე.
 */
export function CheckoutPage() {
  const { user, isAuthenticated } = useAuth()
  const { cart, totalPrice, clearCart } = useCart()

  // კონტროლირებადი ფორმის State (Rules of Hooks: ყოველთვის ზემოთ უპირობოდ)
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: user?.username || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({})
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [orderNumber, setOrderNumber] = useState<string>('')

  // 1. თუ მომხმარებელი სტუმარია -> redirect /login-ზე (state-ში ინახავს მისამართს)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />
  }

  // ინპუტების ცვლილების ჰენდლერი
  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // ფორმის Submit-ის დამუშავება
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'სახელი და გვარი სავალდებულოა'
    if (!formData.phone.trim()) newErrors.phone = 'ტელეფონის ნომერი სავალდებულოა'
    if (!formData.address.trim()) newErrors.address = 'მისამართი სავალდებულოა'
    if (!formData.city.trim()) newErrors.city = 'ქალაქი სავალდებულოა'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // შეკვეთის წარმატებით გაფორმება
    const generatedOrderNumber = `ORD-${Date.now().toString().slice(-6)}`
    setOrderNumber(generatedOrderNumber)
    setIsSuccess(true)
    clearCart()
  }

  // თუ შეკვეთა წარმატებით გაფორმდა
  if (isSuccess) {
    return (
      <section className="mx-auto max-w-lg py-12 text-center">
        <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-xl dark:border-emerald-900/50 dark:bg-gray-900">
          <span className="text-5xl" aria-hidden="true">🎉</span>
          <h2 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
            შეკვეთა წარმატებით მიღებულია!
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            შეკვეთის ნომერი: <strong className="text-indigo-600 dark:text-indigo-400">{orderNumber}</strong>
          </p>
          <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left text-xs space-y-1.5 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <p><strong>მიმღები:</strong> {formData.fullName}</p>
            <p><strong>მისამართი:</strong> {formData.city}, {formData.address}</p>
            <p><strong>ტელეფონი:</strong> {formData.phone}</p>
          </div>
          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700"
          >
            კატალოგში დაბრუნება
          </Link>
        </div>
      </section>
    )
  }

  // თუ კალათა ცარიელია
  if (cart.length === 0) {
    return (
      <section className="py-16 text-center">
        <span className="text-5xl" aria-hidden="true">🛒</span>
        <h2 className="mt-3 text-xl font-bold text-gray-900 dark:text-white">
          კალათა ცარიელია
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          შეკვეთის გასაფორმებლად ჯერ დაამატეთ პროდუქტები კალათაში.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
        >
          კატალოგში გადასვლა
        </Link>
      </section>
    )
  }

  return (
    <section className="space-y-8">
      <div className="border-b border-gray-200 pb-4 dark:border-gray-800">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          შეკვეთის გაფორმება
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          გთხოვთ შეავსოთ მიწოდების მონაცემები
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* მიწოდების ფორმა */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <fieldset className="space-y-4 border-0 p-0 m-0">
            <legend className="text-sm font-bold text-gray-900 dark:text-white border-b border-gray-100 pb-2 dark:border-gray-800 w-full">
              მიწოდების ინფორმაცია
            </legend>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="checkout-name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  სახელი და გვარი *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  aria-invalid={!!errors.fullName}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.fullName && <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="checkout-phone" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ტელეფონის ნომერი *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  aria-invalid={!!errors.phone}
                  placeholder="+995 5xx xx xx xx"
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="checkout-city" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  ქალაქი *
                </label>
                <input
                  id="checkout-city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  aria-invalid={!!errors.city}
                  placeholder="თბილისი, ბათუმი..."
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.city && <p className="mt-1 text-xs text-rose-500">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  მისამართი (ქუჩა, ბინა) *
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  aria-invalid={!!errors.address}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                {errors.address && <p className="mt-1 text-xs text-rose-500">{errors.address}</p>}
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-indigo-600 py-3.5 text-center text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700 active:scale-98"
          >
            შეკვეთის დადასტურება (${totalPrice.toFixed(2)})
          </button>
        </form>

        {/* შეკვეთის შეჯამება */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 h-fit space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            შეკვეთაშია ({cart.length} სახეობა)
          </h3>

          <ul className="divide-y divide-gray-100 text-xs dark:divide-gray-800 max-h-60 overflow-y-auto">
            {cart.map(({ product, quantity }) => (
              <li key={product.id} className="py-2.5 flex items-center justify-between">
                <span className="truncate max-w-[180px] text-gray-700 dark:text-gray-300">
                  {quantity}x {product.title}
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-bold text-gray-900 dark:text-white">
            <span>სულ:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
