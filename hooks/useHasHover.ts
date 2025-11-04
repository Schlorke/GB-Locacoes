// hooks/useHasHover.ts
'use client'

import { useEffect, useState } from 'react'

/**
 * Hook para detectar se o dispositivo primário suporta hover.
 * Retorna `true` para desktops com mouse e `false` para dispositivos de toque.
 * É seguro para SSR, retornando `false` no servidor e atualizando no cliente.
 */
export function useHasHover(): boolean {
  const [hasHover, setHasHover] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)')
    setHasHover(mediaQuery.matches)

    const listener = (event: MediaQueryListEvent) => {
      setHasHover(event.matches)
    }

    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return hasHover
}
