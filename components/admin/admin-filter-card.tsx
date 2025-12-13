'use client'

import { Card, CardContent } from '@/components/ui/card'
import { FilterResetButton } from '@/components/ui/filter-reset-button'
import { CustomSelect, CustomSelectItem } from '@/components/ui/custom-select'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type { FilterOption } from '@/types/filters'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface AdminFilterCardProps {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (_value: string) => void
  /**
   * Controla o layout do card de filtros.
   * - `responsive` (padrão): empilha em mobile/tablet e vira linha no `lg+`
   * - `stacked`: força **coluna única** em todos os breakpoints
   */
  layout?: 'responsive' | 'stacked'
  filters?: {
    label: string
    value: string
    options: FilterOption[]
    onValueChange: (_value: string) => void
    placeholder?: string
  }[]
  actionButtons?: React.ReactNode
  viewToggleButtons?: React.ReactNode
  className?: string
}

export function AdminFilterCard({
  searchPlaceholder = 'Buscar...',
  searchValue = '',
  onSearchChange,
  layout = 'responsive',
  filters = [],
  actionButtons,
  viewToggleButtons,
  className,
}: AdminFilterCardProps) {
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
  }

  return (
    <Card
      className={cn(
        'admin-filter-card relative overflow-visible border-0 shadow-xl bg-white backdrop-blur-sm transition-all duration-300',
        className
      )}
      suppressHydrationWarning
    >
      {/* Clean depth layers for filter card */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

      <CardContent className="relative z-10 p-4 sm:p-6">
        <div className="flex flex-col gap-3 min-w-0">
          {/* Primeira linha: Input + Filtros + Reset (em lg) */}
          <div
            className={cn(
              'flex flex-col md:flex-col gap-3 min-w-0',
              layout === 'responsive' && 'lg:flex-row lg:items-center',
              layout === 'stacked' && 'items-stretch'
            )}
          >
            {/* Search Input - Ocupa mais espaço */}
            {onSearchChange && (
              <div
                className={cn(
                  'relative w-full',
                  layout === 'responsive' && 'lg:flex-1 lg:min-w-0'
                )}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 border-gray-200 focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0 transition-all duration-200 h-10"
                  style={{
                    boxShadow:
                      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  }}
                />
              </div>
            )}

            {/* Filters Row - Ao lado do search em lg */}
            <div
              className={cn(
                'w-full md:w-full min-w-0',
                layout === 'responsive' && 'lg:w-auto flex-shrink-0'
              )}
            >
              {/* Filter Selects - apenas primeira linha (filtros + reset) */}
              <div
                className={cn(
                  'flex flex-col md:flex-col lg:flex-row gap-3 min-w-0 w-full md:w-full lg:w-auto lg:items-center'
                )}
              >
                {filters.map((filter, index) => (
                  <CustomSelect
                    key={index}
                    value={filter.value}
                    onValueChange={filter.onValueChange}
                    placeholder={filter.placeholder || filter.label}
                    className="w-full md:w-full lg:w-auto lg:min-w-[180px] h-10 flex-shrink-0"
                  >
                    {filter.options.map((option) => (
                      <CustomSelectItem key={option.value} value={option.value}>
                        {option.label}
                      </CustomSelectItem>
                    ))}
                  </CustomSelect>
                ))}
                <div className="flex items-center justify-center flex-shrink-0 w-full md:w-full lg:w-auto">
                  <FilterResetButton
                    onClick={handleReset}
                    title="Resetar filtros"
                    size="md"
                  />
                </div>
                {/* ViewToggle em mobile/tablet - mesma linha */}
                {viewToggleButtons && (
                  <div className="flex items-center justify-center flex-shrink-0 w-full md:w-full lg:hidden">
                    {viewToggleButtons}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Action Buttons (se houver, em nova linha em mobile) */}
            {actionButtons && (
              <div
                className={cn(
                  'flex items-center w-full flex-shrink-0',
                  layout === 'responsive' &&
                    'justify-center lg:w-auto lg:self-center',
                  layout === 'stacked' && 'justify-start'
                )}
              >
                {actionButtons}
              </div>
            )}
          </div>

          {/* Segunda linha: ViewToggle apenas em lg (desktop) */}
          {viewToggleButtons && (
            <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-full">
              {viewToggleButtons}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
