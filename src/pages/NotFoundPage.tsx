import { Link } from 'react-router-dom'

/**
 * NotFoundPage — 404 გვერდი (როუტი: *)
 */
export function NotFoundPage() {
  return (
    <section className="py-20 text-center">
      <span className="text-7xl font-black text-indigo-600 dark:text-indigo-400">404</span>
      <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
        გვერდი ვერ მოიძებნა
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        თქვენ მიერ მოთხოვნილი გვერდი არ არსებობს ან გადატანილია.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700"
      >
        მთავარ გვერდზე დაბრუნება
      </Link>
    </section>
  )
}
