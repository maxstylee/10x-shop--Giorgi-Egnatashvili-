const currentYear = 2026

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 text-center text-xs text-gray-500 dark:text-gray-400 sm:px-6 lg:px-8">
        <p>© {currentYear} 10x-Shop — Giorgi Egnatashvili. შექმნილია React 19, TypeScript & Tailwind CSS-ით.</p>
        <p className="mt-1">
          მონაცემები მოწოდებულია{' '}
          <a
            href="https://dummyjson.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 underline hover:text-indigo-500 dark:text-indigo-400"
          >
            DummyJSON API
          </a>
          -ის მიერ.
        </p>
      </div>
    </footer>
  )
}
