import { useCallback, useEffect, useState } from 'react'

import type { AllIconNames } from '@/lib/constants/all-icons'
import { normalizeIconName } from '@/lib/icon-utils'

const STORAGE_KEY = 'gb-locacoes-icon-recents'
const MAX_RECENT_ICONS = 18

const isBrowser = typeof window !== 'undefined'

function readStoredRecents(): AllIconNames[] {
  if (!isBrowser) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((value) => normalizeIconName(value as string) ?? null)
      .filter((value): value is AllIconNames => value !== null)
  } catch (_error) {
    return []
  }
}

function storeRecents(recents: AllIconNames[]) {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recents))
  } catch (_error) {
    // ignore storage errors (quota, privacy mode, etc.)
  }
}

export function useIconRecents() {
  const [recents, setRecents] = useState<AllIconNames[]>([])

  useEffect(() => {
    if (!isBrowser) return
    const stored = readStoredRecents()
    if (stored.length > 0) {
      setRecents(stored)
    }
  }, [])

  useEffect(() => {
    if (recents.length === 0) return
    storeRecents(recents)
  }, [recents])

  const addRecentIcon = useCallback((iconName: AllIconNames) => {
    setRecents((prev) => {
      const normalized = normalizeIconName(iconName) ?? iconName
      const next = [
        normalized,
        ...prev.filter((value) => value !== normalized),
      ].slice(0, MAX_RECENT_ICONS)
      storeRecents(next)
      return next
    })
  }, [])

  const clearRecentIcons = useCallback(() => {
    setRecents([])
    if (isBrowser) {
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch (_error) {
        // ignore
      }
    }
  }, [])

  return {
    recents,
    addRecentIcon,
    clearRecentIcons,
  }
}
