'use client'

import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface NotificationBadgeProps {
  count: number
  variant?: 'default' | 'dot' | 'pulse'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showZero?: boolean
  maxCount?: number
}

export function NotificationBadge({
  count,
  variant = 'default',
  size = 'md',
  className,
  showZero = false,
  maxCount = 99
}: NotificationBadgeProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  if (count === 0 && !showZero) return null

  const displayCount = count > maxCount ? `${maxCount}+` : count.toString()

  const sizeClasses = {
    sm: 'h-4 w-4 text-xs',
    md: 'h-5 w-5 text-xs',
    lg: 'h-6 w-6 text-sm'
  }

  const dotSizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3'
  }

  if (variant === 'dot') {
    return (
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute -top-1 -right-1 bg-red-500 rounded-full',
              dotSizeClasses[size],
              className
            )}
          />
        )}
      </AnimatePresence>
    )
  }

  if (variant === 'pulse') {
    return (
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute -top-1 -right-1 bg-red-500 rounded-full flex items-center justify-center text-white font-bold',
              sizeClasses[size],
              className
            )}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 bg-red-500 rounded-full opacity-75"
            />
            <span className="relative z-10">{displayCount}</span>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute -top-1 -right-1 bg-red-500 text-white rounded-full flex items-center justify-center font-bold shadow-lg',
            sizeClasses[size],
            className
          )}
        >
          {displayCount}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Componente para wrapper com posicionamento relativo
interface NotificationBadgeWrapperProps {
  children: React.ReactNode
  count: number
  variant?: 'default' | 'dot' | 'pulse'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showZero?: boolean
  maxCount?: number
}

export function NotificationBadgeWrapper({
  children,
  count,
  variant = 'default',
  size = 'md',
  className,
  showZero = false,
  maxCount = 99
}: NotificationBadgeWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="relative inline-block">
      {children}
      {isMounted && (
        <NotificationBadge
          count={count}
          variant={variant}
          size={size}
          className={className}
          showZero={showZero}
          maxCount={maxCount}
        />
      )}
    </div>
  )
}
