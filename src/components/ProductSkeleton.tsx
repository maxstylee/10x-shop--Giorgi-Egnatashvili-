export function ProductSkeleton() {
  return (
    <article aria-hidden="true" className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm animate-pulse dark:border-gray-800 dark:bg-gray-900">
      <div>
        <div className="aspect-square w-full rounded-xl bg-gray-200 dark:bg-gray-800" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-1/3 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-8 w-20 rounded-xl bg-gray-200 dark:bg-gray-800" />
      </div>
    </article>
  )
}

