'use client'

import { CustomSelect, CustomSelectItem } from '@/components/ui/custom-select'
import { cn } from '@/lib/utils'
import type { Filter } from '@/types/filters'
import React from 'react'

interface FilterSelectGroupProps {
  filters: Filter[]
  className?: string
  selectClassName?: string
  activeClassName?: string
  gap?: 'sm' | 'md' | 'lg'
  viewToggleButtons?: React.ReactNode
  resetButton?: React.ReactNode
}

export function FilterSelectGroup({
  filters,
  className,
  selectClassName,
  gap: _gap = 'md',
  viewToggleButtons,
  resetButton,
}: FilterSelectGroupProps) {
  return (
    <div
      className={cn(
        'flex flex-col lg:flex-row gap-3 min-w-0 w-full lg:items-center',
        className
      )}
    >
      {filters.map((filter, index) => (
        <CustomSelect
          key={index}
          value={filter.value}
          onValueChange={filter.onValueChange}
          placeholder={filter.placeholder || filter.label}
          className={cn(
            'w-full lg:w-auto lg:min-w-[180px] h-10 flex-shrink-0',
            selectClassName
          )}
        >
          {filter.options.map((option) => (
            <CustomSelectItem key={option.value} value={option.value}>
              {option.label}
            </CustomSelectItem>
          ))}
        </CustomSelect>
      ))}
      {resetButton && (
        <div className="flex items-center justify-center flex-shrink-0 w-full lg:w-auto">
          {resetButton}
        </div>
      )}
      {viewToggleButtons && (
        <div className="flex items-center justify-center flex-shrink-0 w-full lg:w-auto">
          {viewToggleButtons}
        </div>
      )}
    </div>
  )
}
