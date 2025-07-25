// Utilitário para dados seguros
export function safeAccess<T>(obj: Record<string, unknown>, path: string, defaultValue: T): T {
  try {
    const result = path.split('.').reduce<unknown>((current, key) => {
      if (current && typeof current === 'object' && key in current) {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
    return (result as T) ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

export function getSimulatedReviews() {
  return {
    average: 4.8,
    count: 120,
    stars: 5,
  };
}

export function formatPrice(price: number | undefined): string {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0.00';
  }
  return price.toFixed(2);
}
