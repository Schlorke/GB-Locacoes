'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RotateCcw } from 'lucide-react'
import React, { useState } from 'react'

interface FilterResetButtonProps {
  onClick: () => void
  className?: string
  title?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  'aria-label'?: string
}

export function FilterResetButton({
  onClick,
  className,
  title = 'Resetar filtros',
  size = 'sm',
  disabled = false,
  'aria-label': ariaLabel,
  ...props
}: FilterResetButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'title'>) {
  const [resetAnimation, setResetAnimation] = useState(false)

  const handleClick = () => {
    // Trigger animation
    setResetAnimation(true)

    // Execute callback
    onClick()

    // Remove animation class after animation completes
    setTimeout(() => {
      setResetAnimation(false)
    }, 600)
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <Button
      variant="reset"
      size="sm"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'filter-reset-button flex items-center justify-center p-0 group focus:outline-none',
        sizeClasses[size],
        className
      )}
      title={title}
      aria-label={ariaLabel || title}
      {...props}
    >
      <RotateCcw
        className={cn(
          'transition-all duration-300 group-hover:text-orange-500',
          iconSizes[size],
          resetAnimation && 'animate-reset'
        )}
      />
    </Button>
  )
}
