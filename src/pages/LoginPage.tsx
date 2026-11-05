import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

/**
 * LoginPage — ავტორიზაციის გვერდი (/login)
 * კონტროლირებადი ფორმა (Controlled Form) ვალიდაციით.
 * წარმატებული შესვლის შემდეგ გადაამისამართებს წინა გვერდზე (მაგ. /checkout-ზე).
 */
export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // საიდან მოვიდა მომხმარებელი (მაგ. /checkout)
  const from = (location.state as { from?: string })?.from || '/'

  // კონტროლირებადი ფორმის State
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})

  // თუ უკვე ავტორიზებულია, გადავამისამართოთ
  if (isAuthenticated) {
    navigate(from, { replace: true })
    return null
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors: { username?: string; password?: string } = {}

    // Username / Password required ვალიდაცია
    if (!username.trim()) {
      newErrors.username = 'მომხმარებლის სახელი სავალდებულოა'
    }

    if (!password) {
      newErrors.password = 'პაროლი სავალდებულოა'
    } else if (password.length < 4) {
      newErrors.password = 'პაროლი უნდა შედგებოდეს მინიმუმ 4 სიმბოლოსგან'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // AuthContext-ის განახლება
    login({
      username: username.trim(),
      email: `${username.trim().toLowerCase()}@example.com`,
    })

    // გადამისამართება დანიშნულების გვერდზე (მაგ: /checkout)
    navigate(from, { replace: true })
  }

  return (
    <section className="mx-auto max-w-md py-8">
      {/* შეტყობინება, თუ მომხმარებელი /checkout-დან გადმოამისამართეს */}
      {from === '/checkout' && (
        <div role="alert" className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
          ⚠️ შეკვეთის გასაფორმებლად გთხოვთ ჯერ გაიაროთ ავტორიზაცია.
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center pb-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-4xl" aria-hidden="true">🔐</span>
          <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
            ავტორიზაცია
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            შეიყვანეთ თქვენი მონაცემები სისტემაში შესასვლელად
          </p>
        </div>

        {/* კონტროლირებადი ფორმა */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <fieldset className="space-y-4 border-0 p-0 m-0">
            <legend className="sr-only">შესვლის მონაცემები</legend>

            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                მომხმარებლის სახელი *
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }))
                }}
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? 'username-error' : undefined}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="მაგ: giorgi"
              />
              {errors.username && (
                <p id="username-error" className="mt-1 text-xs text-rose-500 font-medium">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                პაროლი *
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
                }}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="••••••••"
              />
              {errors.password && (
                <p id="password-error" className="mt-1 text-xs text-rose-500 font-medium">
                  {errors.password}
                </p>
              )}
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-indigo-600 py-3 text-center text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700 active:scale-98"
          >
            შესვლა
          </button>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-gray-500 hover:text-indigo-600 dark:text-gray-400">
              ← მთავარ გვერდზე დაბრუნება
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
