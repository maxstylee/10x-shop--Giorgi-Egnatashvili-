import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop — მარშრუტის (URL) ცვლილებისას გვერდის თავში ატანა
 * იყენებს useLocation-ს, useEffect-ს და window.scrollTo-ს.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

