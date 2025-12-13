'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { type LucideIcon } from 'lucide-react'
import React, { useRef, useEffect, useState } from 'react'

export interface ViewToggleOption {
  value: string
  label: string
  icon: LucideIcon
}

export interface ViewToggleProps {
  options: ViewToggleOption[]
  value: string
  // eslint-disable-next-line no-unused-vars
  onValueChange: (value: string) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ViewToggle({
  options,

  value, // value is used in activeIndex (line 30), useEffect (line 61), and isActive (line 100)
  onValueChange,
  className,
  size = 'md',
}: ViewToggleProps) {
  const activeIndex = options.findIndex((option) => option.value === value)
  const buttonHeight = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-11' : 'h-10'
  const iconSize =
    size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'

  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [sliderStyle, setSliderStyle] = useState({ width: 0, left: 0 })

  const updateSliderPosition = React.useCallback(() => {
    if (activeIndex === -1 || !containerRef.current) return

    const activeButton = buttonRefs.current[activeIndex]
    if (!activeButton) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const buttonRect = activeButton.getBoundingClientRect()

    const left = buttonRect.left - containerRect.left
    const width = buttonRect.width

    setSliderStyle({ width, left })
  }, [activeIndex])

  useEffect(() => {
    // Aguardar o próximo frame para garantir que os botões foram renderizados
    const timeoutId = setTimeout(() => {
      updateSliderPosition()
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [updateSliderPosition, value, options])

  useEffect(() => {
    const handleResize = () => {
      updateSliderPosition()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [updateSliderPosition])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex flex-row items-center gap-1 bg-white rounded-lg lg:rounded-md p-0 transition-all duration-200 admin-filter-element',
        buttonHeight,
        className
      )}
    >
      {/* Slider animado */}
      <motion.div
        className="absolute bg-slate-700 rounded-lg lg:rounded-md z-0 h-full"
        initial={false}
        animate={{
          x: sliderStyle.left,
          width: sliderStyle.width,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        style={{
          top: 0,
        }}
      />
      {options.map((option, index) => {
        const Icon = option.icon
        const isActive = value === option.value

        return (
          <Button
            key={option.value}
            ref={(el) => {
              buttonRefs.current[index] = el
            }}
            variant="ghost"
            size="sm"
            onClick={() => onValueChange(option.value)}
            className={cn(
              'relative z-10 flex flex-1 items-center justify-center gap-2 hover:scale-100 transition-colors duration-200',
              buttonHeight,
              isActive
                ? 'text-white hover:text-white'
                : 'text-inherit hover:text-orange-600'
            )}
          >
            <Icon className={iconSize} />
            <span className="hidden sm:inline">{option.label}</span>
          </Button>
        )
      })}
    </div>
  )
}
