import { Link } from 'react-router-dom'

/**
 * NotFoundPage — 404 Route View (* path and missing items)
 * Title: "Page not found"
 * Message: "The page you are looking for does not exist."
 * CTA: "Go to catalog" -> /
 */
export function NotFoundPage() {
  return (
    <section className="py-20 text-center">
      <span className="text-7xl font-black text-indigo-600 dark:text-indigo-400" aria-hidden="true">
        404
      </span>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Page not found
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700 active:scale-95"
      >
        Go to catalog
      </Link>
    </section>
  )
}
