import { useEffect, useState, type ReactNode } from 'react'
import type { User } from '../types/auth'
import { AuthContext, USER_STORAGE_KEY } from './authContext'

/**
 * AuthProvider — ავტორიზაციის გლობალური მდგომარეობის კომპონენტი
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY)
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
      } else {
        localStorage.removeItem(USER_STORAGE_KEY)
      }
    } catch (err) {
      console.error('მომხმარებლის მონაცემების შენახვა ვერ მოხერხდა', err)
    }
  }, [user])

  const login = (newUser: User) => {
    setUser(newUser)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

