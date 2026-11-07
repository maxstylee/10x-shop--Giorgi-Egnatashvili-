import type { Product, ProductsResponse } from '../types/product'

const BASE_URL = 'https://dummyjson.com/products'

export interface TechCategory {
  slug: string
  name: string
  icon: string
}

// Tech Categories List
export const TECH_CATEGORIES: TechCategory[] = [
  { slug: 'smartphones', name: 'Smartphones', icon: '📱' },
  { slug: 'laptops', name: 'Laptops', icon: '💻' },
  { slug: 'tablets', name: 'Tablets', icon: '📟' },
  { slug: 'mobile-accessories', name: 'Accessories', icon: '🎧' },
]

/**
 * Fetch products by selected category from DummyJSON API
 * @param category category slug (e.g. 'smartphones', 'laptops')
 * @param limit number of products to fetch (default: 12)
 * @param skip number of products to skip (default: 0)
 */
export async function getProductsByCategory(
  category: string,
  limit = 12,
  skip = 0
): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`)

  if (!response.ok) {
    throw new Error(`Server error: ${response.status} ${response.statusText}`)
  }

  const data: ProductsResponse = await response.json()
  return data
}

/**
 * Fetch single product details by ID from DummyJSON API
 * @param id Product ID
 */
export async function getProductById(id: string | number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`)

  if (!response.ok) {
    throw new Error(`Product not found: ${response.status} ${response.statusText}`)
  }

  const data: Product = await response.json()
  return data
}
