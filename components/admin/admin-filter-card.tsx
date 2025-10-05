'use client'

import { Card, CardContent } from '@/components/ui/card'
import { FilterIndicator } from '@/components/ui/filter-indicator'
import { FilterResetButton } from '@/components/ui/filter-reset-button'
import { FilterSelectGroup } from '@/components/ui/filter-select-group'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { FilterOption } from '@/types/filters'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface AdminFilterCardProps {
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
  actionButtons?: React.ReactNode
  className?: string
}

export function AdminFilterCard({
  searchPlaceholder = 'Buscar...',
  searchValue = '',
  onSearchChange,
  filters = [],
  actionButtons,
  className,
}: AdminFilterCardProps) {
  const [isFiltered, setIsFiltered] = useState(false)

  // Check if any filter is active (not "all" or empty)
  useEffect(() => {
    const hasActiveFilters =
      filters.some(
        (filter) =>
          filter.value && filter.value !== 'all' && filter.value !== ''
      ) || Boolean(searchValue && searchValue.trim() !== '')
    setIsFiltered(hasActiveFilters)
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
  }

  return (
    <Card
      className={cn(
        'admin-filter-card relative overflow-visible border-0 shadow-xl bg-white backdrop-blur-sm transition-all duration-300',
        className
      )}
    >
      {/* Clean depth layers for filter card */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

      <CardContent className="relative z-10 p-4 sm:p-6">
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
                  className="pl-10 border-gray-200 focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0 transition-all duration-200"
                  style={{
                    boxShadow:
                      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                />
              </div>
            )}

            {/* Filters Row */}
            <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto">
              {/* Filter Icon */}
              {filters.length > 0 && (
                <FilterIndicator isFiltered={isFiltered} />
              )}

              {/* Filter Selects */}
              <FilterSelectGroup filters={filters} gap="md" />
            </div>
          </div>

          {/* Reset Button - Separado entre filtros e botão */}
          <div className="flex items-center justify-center flex-shrink-0 h-10">
            <FilterResetButton
              onClick={handleReset}
              title="Resetar filtros"
              size="md"
            />
          </div>

          {/* Right Side - Action Buttons */}
          {actionButtons && (
            <div className="flex items-center justify-center gap-3 w-full xl:w-auto">
              {actionButtons}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
