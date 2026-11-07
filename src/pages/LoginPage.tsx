import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../hooks/useAuth'

/**
 * Yup Validation Schema
 * Defines field types, required constraints, and validation messages in English.
 */
const loginValidationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required('Username is required'),
  email: Yup.string()
    .trim()
    .required('Email address is required')
    .email('Please enter a valid email address (e.g. name@example.com)'),
  password: Yup.string()
    .required('Password is required')
    .min(4, 'Password must be at least 4 characters long'),
})

export type LoginFormValues = Yup.InferType<typeof loginValidationSchema>

/**
 * LoginPage — User Login View (/login)
 * Implemented with Formik + Yup for declarative form state and validation.
 */
export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Track original route destination (e.g. /checkout)
  const from = (location.state as { from?: string })?.from || '/'

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate(from, { replace: true })
    return null
  }

  // Formik Hook Initialization
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      // 1. Update AuthContext state
      login({
        username: values.username.trim(),
        email: values.email.trim().toLowerCase(),
      })

      // 2. Redirect to destination (e.g. /checkout)
      navigate(from, { replace: true })
    },
  })

  // Field validation helpers
  const usernameError = formik.touched.username && formik.errors.username
  const emailError = formik.touched.email && formik.errors.email
  const passwordError = formik.touched.password && formik.errors.password

  return (
    <section className="mx-auto max-w-md py-8">
      {/* Alert if redirected from protected route */}
      {from === '/checkout' && (
        <div
          role="alert"
          className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300"
        >
          ⚠️ Please log in to proceed with your checkout.
        </div>
      )}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="text-center pb-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-4xl" aria-hidden="true">🔐</span>
          <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
            Sign In
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Controlled Formik Form */}
        <form onSubmit={formik.handleSubmit} noValidate className="mt-6 space-y-4">
          <fieldset className="space-y-4 border-0 p-0 m-0">
            <legend className="sr-only">Login Credentials</legend>

            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Username *
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
                placeholder="e.g. giorgi"
              />
              {usernameError && (
                <p id="username-error" role="alert" className="mt-1 text-xs text-rose-500 font-medium">
                  {formik.errors.username}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? 'email-error' : undefined}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm transition text-gray-900 dark:text-white dark:bg-gray-800 outline-hidden ${
                  emailError
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700'
                }`}
                placeholder="name@example.com"
              />
              {emailError && (
                <p id="email-error" role="alert" className="mt-1 text-xs text-rose-500 font-medium">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1"
              >
                Password *
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
            {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-center pt-2">
            <Link to="/" className="text-xs text-gray-500 hover:text-indigo-600 dark:text-gray-400">
              ← Back to catalog
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
