import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'gb-locacoes-emoji-recents'
const MAX_RECENT_EMOJIS = 30

const isBrowser = typeof window !== 'undefined'

function readStoredRecents(): string[] {
  if (!isBrowser) return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []

    return parsed
      .map((value) => (typeof value === 'string' ? value : null))
      .filter(
        (value): value is string => value !== null && value.trim().length > 0
      )
  } catch (_error) {
    return []
  }
}

function storeRecents(recents: string[]) {
  if (!isBrowser) return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recents))
  } catch (_error) {
    // Ignorar erros de armazenamento (quota, privacidade, etc.)
  }
}

export function useEmojiRecents() {
  const [recents, setRecents] = useState<string[]>([])

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

  const addRecentEmoji = useCallback((emoji: string) => {
    setRecents((prev) => {
      const trimmed = emoji.trim()
      if (!trimmed) return prev

      const next = [
        trimmed,
        ...prev.filter((value) => value !== trimmed),
      ].slice(0, MAX_RECENT_EMOJIS)
      storeRecents(next)
      return next
    })
  }, [])

  const clearRecentEmojis = useCallback(() => {
    setRecents([])
    if (!isBrowser) return
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch (_error) {
      // ignore
    }
  }, [])

  return {
    recents,
    addRecentEmoji,
    clearRecentEmojis,
  }
}
