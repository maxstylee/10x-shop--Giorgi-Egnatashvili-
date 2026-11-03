import { useState, type FormEvent } from 'react'
import type { User } from '../types/auth'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (user: User) => void
}

/**
 * LoginModal — ავტორიზაციის მოდალი კონტროლირებადი ფორმით (Controlled Form)
 * ყველა ინპუტის მნიშვნელობა (value) იმართება React State-ით (useState).
 */
export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  // 1. კონტროლირებადი ფორმის მდგომარეობები (Controlled Inputs State)
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // ვალიდაციის შეცდომების State
  const [errors, setErrors] = useState<{
    username?: string
    email?: string
    password?: string
  }>({})

  if (!isOpen) return null

  // 2. ფორმის გაგზავნის (Submit) დამუშავება
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // ვაჩერებთ ბრაუზერის ნაგულისხმევ გადატვირთვას
    e.preventDefault()

    const newErrors: { username?: string; email?: string; password?: string } = {}

    // მარტივი ვალიდაცია
    if (!username.trim()) {
      newErrors.username = 'მომხმარებლის სახელი სავალდებულოა'
    }

    if (!email.trim()) {
      newErrors.email = 'ელ. ფოსტა სავალდებულოა'
    } else if (!email.includes('@')) {
      newErrors.email = 'გთხოვთ შეიყვანოთ ვალიდური ელ. ფოსტა'
    }

    if (!password) {
      newErrors.password = 'პაროლი სავალდებულოა'
    } else if (password.length < 4) {
      newErrors.password = 'პაროლი უნდა იყოს მინიმუმ 4 სიმბოლო'
    }

    // თუ შეცდომებია, ვაჩვენებთ და ვწყვეტთ
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // წარმატებული ვალიდაციისას გადავცემთ მონაცემებს მშობელს
    onLogin({
      username: username.trim(),
      email: email.trim(),
    })

    // ფორმის გასუფთავება
    setUsername('')
    setEmail('')
    setPassword('')
    setErrors({})
    onClose()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* მოდალის კონტეინერი */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔐</span>
            <h2 id="login-modal-title" className="text-lg font-bold text-gray-900 dark:text-white">
              ავტორიზაცია
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="მოდალის დახურვა"
            className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* კონტროლირებადი ფორმა */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <fieldset className="space-y-4 border-0 p-0 m-0">
            <legend className="sr-only">მომხმარებლის მონაცემები</legend>

            {/* Username ველი */}
            <div>
              <label
                htmlFor="login-username"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                მომხმარებლის სახელი *
              </label>
              <input
                id="login-username"
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

            {/* Email ველი */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                ელ. ფოსტა *
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                }}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                placeholder="name@example.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-rose-500 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password ველი */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                პაროლი *
              </label>
              <input
                id="login-password"
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

          {/* ღილაკები */}
          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 cursor-pointer rounded-xl border border-gray-300 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="flex-1 cursor-pointer rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 hover:bg-indigo-700 active:scale-95 transition"
            >
              შესვლა
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

