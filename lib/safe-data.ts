// Utilitário para dados seguros
export function safeAccess<T>(obj: any, path: string, defaultValue: T): T {
  try {
    return path.split('.').reduce((current, key) => current?.[key], obj) ?? defaultValue;
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
