import { usePathname } from 'next/navigation'

/**
 * Hook para determinar se estamos na área do cliente
 * e retornar a variante apropriada do badge sem hover
 */
export function useClientAreaBadge() {
  const pathname = usePathname()
  const isInClientArea = pathname.startsWith('/area-cliente')

  const getBadgeVariant = (originalVariant: string) => {
    if (!isInClientArea) {
      return originalVariant
    }

    // Mapear variantes originais para variantes sem hover
    const variantMap: Record<string, string> = {
      default: 'no-hover-default',
      secondary: 'no-hover-secondary',
      destructive: 'no-hover-destructive',
      outline: 'no-hover-outline',
    }

    return variantMap[originalVariant] || originalVariant
  }

  return {
    isInClientArea,
    getBadgeVariant,
  }
}
