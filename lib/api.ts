export async function fetchJson<T>(
  url: string,
  init?: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(url, init)
    if (!res.ok) {
      console.error('API request failed', res.status)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.error('API fetch error', err)
    return null
  }
}
