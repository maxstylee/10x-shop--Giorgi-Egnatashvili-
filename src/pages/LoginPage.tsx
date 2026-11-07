import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../hooks/useAuth'

/**
 * Yup ვალიდაციის სქემა (Validation Schema)
 * განსაზღვრავს ველების ტიპებს, სავალდებულოობასა და შეცდომის შეტყობინებებს.
 */
const loginValidationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required('მომხმარებლის სახელი სავალდებულოა'),
  password: Yup.string()
    .required('პაროლი სავალდებულოა')
    .min(6, 'პაროლი უნდა შედგებოდეს მინიმუმ 6 სიმბოლოსგან'),
})

export type LoginFormValues = Yup.InferType<typeof loginValidationSchema>

/**
 * LoginPage — ავტორიზაციის გვერდი (/login)
 * რეალიზებულია Formik + Yup ბიბლიოთეკებით:
 * - Formik: მართავს ფორმის მდგომარეობას (values), შეხებას (touched), შეცდომებს (errors) და submit-ს.
 * - Yup: აწესებს ვალიდაციის დეკლარაციულ წესებს.
 */
export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // საიდან მოვიდა მომხმარებელი (მაგ. /checkout)
  const from = (location.state as { from?: string })?.from || '/'

  // თუ უკვე ავტორიზებულია, გადავამისამართოთ
  if (isAuthenticated) {
    navigate(from, { replace: true })
    return null
  }

  // Formik Hook-ის ინიციალიზაცია
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      // 1. AuthContext-ის განახლება
      login({
        username: values.username.trim(),
        email: `${values.username.trim().toLowerCase()}@example.com`,
      })

      // 2. გადამისამართება დანიშნულების გვერდზე (მაგ: /checkout)
      navigate(from, { replace: true })
    },
  })

  // ველების ვალიდაციის შემოწმების დამხმარე ცვლადები
  const usernameError = formik.touched.username && formik.errors.username
  const passwordError = formik.touched.password && formik.errors.password

  return (
    <section className="mx-auto max-w-md py-8">
      {/* შეტყობინება, თუ მომხმარებელი /checkout-დან გადმოამისამართეს */}
      {from === '/checkout' && (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300"
        >
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

        {/* Formik კონტროლირებადი ფორმა */}
        <form onSubmit={formik.handleSubmit} noValidate className="mt-6 space-y-4">
          <fieldset className="space-y-4 border-0 p-0 m-0">
            <legend className="sr-only">შესვლის მონაცემები</legend>

            {/* Username ველი */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                მომხმარებლის სახელი *
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(usernameError)}
                aria-describedby={usernameError ? 'username-error' : undefined}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition text-gray-900 dark:text-white dark:bg-gray-800 outline-hidden ${
                  usernameError
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700'
                }`}
                placeholder="მაგ: giorgi"
              />
              {usernameError && (
                <p id="username-error" role="alert" className="mt-1 text-xs text-rose-500 font-medium">
                  {formik.errors.username}
                </p>
              )}
            </div>

            {/* Password ველი */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                პაროლი *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(passwordError)}
                aria-describedby={passwordError ? 'password-error' : undefined}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition text-gray-900 dark:text-white dark:bg-gray-800 outline-hidden ${
                  passwordError
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700'
                }`}
                placeholder="••••••••"
              />
              {passwordError && (
                <p id="password-error" role="alert" className="mt-1 text-xs text-rose-500 font-medium">
                  {formik.errors.password}
                </p>
              )}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="mt-5 w-full cursor-pointer rounded-xl bg-indigo-600 py-3 text-center text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? 'მიმდინარეობს...' : 'შესვლა'}
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
