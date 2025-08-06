'use client'

import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React from 'react'

interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg'

  variant?: 'default' | 'ghost' | 'ghostWhite' | 'outline'
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
}

const variantClasses = {
  default:
    'border border-slate-300 bg-slate-100 text-slate-900 shadow-lg hover:bg-slate-200 hover:text-orange-500 hover:shadow-xl transition-all duration-300',
  ghost:
    'text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300',
  ghostWhite:
    'text-slate-500 hover:text-slate-900 hover:bg-white transition-all duration-300',
  outline:
    'border border-slate-200 bg-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 shadow-sm hover:shadow-md transition-all duration-300',
}

const iconSizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(
  (
    {
      className,
      size = 'md',
      variant = 'default',
      'aria-label': ariaLabel = 'Close',
      ...props
    },
    ref
  ) => (
    <button
      type="button"
      ref={ref}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all',
        'disabled:pointer-events-none disabled:opacity-50',
        'focus:outline-none',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <X className={iconSizes[size]} />
      <span className="sr-only">{ariaLabel}</span>
    </button>
  )
)
CloseButton.displayName = 'CloseButton'

// Export para facilitar o uso
export default CloseButton
