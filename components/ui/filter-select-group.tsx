'use client'

import { CustomSelect, CustomSelectItem } from '@/components/ui/custom-select'
import { cn } from '@/lib/utils'
import type { Filter } from '@/types/filters'

interface FilterSelectGroupProps {
  filters: Filter[]
  className?: string
  selectClassName?: string
  activeClassName?: string
  gap?: 'sm' | 'md' | 'lg'
}

export function FilterSelectGroup({
  filters,
  className,
  selectClassName,
  gap: _gap = 'md',
}: FilterSelectGroupProps) {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-center gap-3',
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
            'w-full md:w-auto lg:max-w-[220px] h-10 md:min-w-[180px]',
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
    </div>
  )
}
