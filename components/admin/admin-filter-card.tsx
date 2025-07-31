'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CustomSelect, CustomSelectItem } from '@/components/ui/custom-select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Funnel, RotateCcw, Search } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

interface FilterOption {
  value: string;
  label: string;
}

interface AdminFilterCardProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: {
    label: string;
    value: string;
    options: FilterOption[];
    onValueChange: (value: string) => void;
    placeholder?: string;
  }[];
  actionButtons?: React.ReactNode;
  className?: string;
}

export function AdminFilterCard({
  searchPlaceholder = 'Buscar...',
  searchValue = '',
  onSearchChange,
  filters = [],
  actionButtons,
  className,
}: AdminFilterCardProps) {
  const [isFiltered, setIsFiltered] = useState(false);
  const [resetAnimation, setResetAnimation] = useState(false);

  // Check if any filter is active (not "all" or empty)
  useEffect(() => {
    const hasActiveFilters =
      filters.some((filter) => filter.value && filter.value !== 'all' && filter.value !== '') ||
      Boolean(searchValue && searchValue.trim() !== '');
    setIsFiltered(hasActiveFilters);
  }, [filters, searchValue]);

  const handleReset = () => {
    // Trigger animation
    setResetAnimation(true);

    // Reset all filters
    filters.forEach((filter) => {
      filter.onValueChange('all');
    });

    // Reset search
    if (onSearchChange) {
      onSearchChange('');
    }

    // Remove animation class after animation completes
    setTimeout(() => {
      setResetAnimation(false);
    }, 600);
  };

  return (
    <Card
      className={cn(
        'relative overflow-visible border-0 shadow-xl bg-white backdrop-blur-sm transition-all duration-300',
        className,
      )}
    >
      {/* Clean depth layers for filter card */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

      <CardContent className="relative z-10 p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Left Side - Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 flex-1 w-full items-center">
            {/* Search Input */}
            {onSearchChange && (
              <div className="relative flex-1 max-w-md w-full md:w-auto">
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
            <div className="flex items-center justify-center gap-3 w-full md:w-auto">
              {/* Filter Icon */}
              {filters.length > 0 && (
                <Funnel
                  className={cn(
                    'w-4 h-4 transition-colors duration-300 flex-shrink-0',
                    isFiltered ? 'text-orange-500' : 'text-gray-500',
                  )}
                />
              )}

              {/* Filter Selects */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {filters.map((filter, index) => (
                  <CustomSelect
                    key={index}
                    value={filter.value}
                    onValueChange={filter.onValueChange}
                    placeholder={filter.placeholder || filter.label}
                    className={cn(
                      'w-full md:w-[200px]',
                      filter.value && filter.value !== 'all' && 'border-orange-300 bg-orange-50',
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

              {/* Reset Button - SEMPRE VISÍVEL e ALINHADO */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex items-center justify-center w-10 h-10 p-0 hover:shadow-lg shadow-md transition-all duration-300 border-gray-200 flex-shrink-0 group"
                title="Resetar filtros"
              >
                <RotateCcw
                  className={cn(
                    'w-4 h-4 transition-all duration-300 group-hover:text-orange-500',
                    resetAnimation && 'animate-reset',
                  )}
                />
              </Button>
            </div>
          </div>

          {/* Right Side - Action Buttons */}
          {actionButtons && (
            <div className="flex items-center justify-center gap-2 w-full lg:w-auto">
              {actionButtons}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
