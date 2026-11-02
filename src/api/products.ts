import type { ProductsResponse } from '../types/product'

const BASE_URL = 'https://dummyjson.com/products'

export interface TechCategory {
  slug: string
  name: string
  icon: string
}

// ტექნიკის კატეგორიების სია
export const TECH_CATEGORIES: TechCategory[] = [
  { slug: 'smartphones', name: 'სმარტფონები', icon: '📱' },
  { slug: 'laptops', name: 'ლეპტოპები', icon: '💻' },
  { slug: 'tablets', name: 'ტაბლეტები', icon: '📟' },
  { slug: 'mobile-accessories', name: 'აქსესუარები', icon: '🎧' },
]

/**
 * DummyJSON API-დან ტექნიკის წამოღება არჩეული კატეგორიის მიხედვით
 * @param category კატეგორიის slug (მაგ. 'smartphones', 'laptops')
 * @param limit რამდენი პროდუქტი წამოვიღოთ (ნაგულისხმევია 12)
 * @param skip რამდენი პროდუქტი გამოვტოვოთ (ნაგულისხმევია 0)
 */
export async function getProductsByCategory(
  category: string,
  limit = 12,
  skip = 0
): Promise<ProductsResponse> {
  // მაგალითად: https://dummyjson.com/products/category/smartphones?limit=12&skip=0
  const response = await fetch(`${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`)

  if (!response.ok) {
    throw new Error(`სერვერის შეცდომა: ${response.status} ${response.statusText}`)
  }

  const data: ProductsResponse = await response.json()
  return data
}
