'use client'

import { Badge, type BadgeProps } from './badge'
import { useClientAreaBadge } from '@/hooks/use-client-area-badge'

interface ClientAreaBadgeProps extends Omit<BadgeProps, 'variant'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'no-hover-default'
  | 'no-hover-secondary'
  | 'no-hover-destructive'
  | 'no-hover-outline'

/**
 * Badge que automaticamente remove hover effects na área do cliente
 */
export function ClientAreaBadge({
  variant = 'default',
  ...props
}: ClientAreaBadgeProps) {
  const { getBadgeVariant } = useClientAreaBadge()

  return <Badge {...props} variant={getBadgeVariant(variant) as BadgeVariant} />
}
