import { createContext, useContext } from 'react'
import type { CartItem } from '../types/cart'
import type { Product } from '../types/product'

export const CART_STORAGE_KEY = '10x_shop_cart'

export interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  updateQuantity: (productId: number, newQuantity: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  totalCount: number
  totalPrice: number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart(): CartContextType {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
