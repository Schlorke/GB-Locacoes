'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  onClick: () => void
  disabled?: boolean
  className?: string
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  children?: React.ReactNode
}

export function WhatsAppButton({
  onClick,
  disabled = false,
  className,
  variant = 'default',
  size = 'default',
  children,
}: WhatsAppButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      className={cn(
        'bg-green-600 hover:bg-green-700 text-white',
        'transition-all duration-200 hover:scale-105',
        'shadow-lg hover:shadow-xl',
        className
      )}
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      {children || 'Solicitar Orçamento'}
    </Button>
  )
}
