'use client'

import { Input } from '@/components/ui/input'
import { FilterResetButton } from '@/components/ui/filter-reset-button'
import { FilterSelectGroup } from '@/components/ui/filter-select-group'
import { cn } from '@/lib/utils'
import type { FilterOption } from '@/types/filters'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface SearchBarProps {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (_value: string) => void
  filters?: {
    label: string
    value: string
    options: FilterOption[]
    onValueChange: (_value: string) => void
    placeholder?: string
  }[]
  showResetButton?: boolean
  onReset?: () => void
  className?: string
}

export function SearchBar({
  searchPlaceholder = 'Buscar...',
  searchValue = '',
  onSearchChange,
  filters = [],
  showResetButton = true,
  onReset,
  className,
}: SearchBarProps) {
  const [_isFiltered, _setIsFiltered] = useState(false)

  // Check if any filter is active (not "all" or empty)
  useEffect(() => {
    const hasActiveFilters =
      filters.some(
        (filter) =>
          filter.value && filter.value !== 'all' && filter.value !== ''
      ) || Boolean(searchValue && searchValue.trim() !== '')
    _setIsFiltered(hasActiveFilters)
  }, [filters, searchValue])

  const handleReset = () => {
    // Reset all filters
    filters.forEach((filter) => {
      filter.onValueChange('all')
    })

    // Reset search
    if (onSearchChange) {
      onSearchChange('')
    }

    // Call custom reset handler if provided
    if (onReset) {
      onReset()
    }
  }

  return (
    <div
      className={cn(
        'admin-filter-card relative overflow-visible bg-white transition-all duration-300 rounded-2xl shadow-xl hover:shadow-2xl',
        className
      )}
      style={{
        border: 'none',
        outline: 'none',
      }}
    >
      {/* Clean depth layers for filter card */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30 rounded-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40 rounded-2xl"></div>

      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex flex-col xl:flex-row gap-2 sm:gap-3 items-center justify-between">
          {/* Left Side - Search and Filters */}
          <div className="flex flex-col md:flex-row gap-3 sm:gap-5 flex-1 w-full items-center">
            {/* Search Input */}
            {onSearchChange && (
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 border-gray-200 focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0 transition-all duration-200 admin-filter-element"
                />
              </div>
            )}

            {/* Filters Row */}
            <div className="w-full md:w-auto">
              {/* Filter Selects */}
              <FilterSelectGroup filters={filters} gap="sm" />
            </div>
          </div>

          {/* Reset Button - Separado entre filtros e botão */}
          {showResetButton && (
            <div className="flex items-center justify-center flex-shrink-0 h-10">
              <FilterResetButton
                onClick={handleReset}
                title="Resetar filtros"
                size="md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
