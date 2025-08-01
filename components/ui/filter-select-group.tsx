'use client';

import { CustomSelect, CustomSelectItem } from '@/components/ui/custom-select';
import { cn } from '@/lib/utils';
import type { Filter } from '@/types/filters';

interface FilterSelectGroupProps {
  filters: Filter[];
  className?: string;
  selectClassName?: string;
  activeClassName?: string;
  gap?: 'sm' | 'md' | 'lg';
}

export function FilterSelectGroup({
  filters,
  className,
  selectClassName,
  activeClassName = 'border-orange-300 bg-orange-50',
  gap = 'md',
}: FilterSelectGroupProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
  };

  return (
    <div className={cn('flex items-center flex-wrap flex-1', gapClasses[gap], className)}>
      {filters.map((filter, index) => (
        <CustomSelect
          key={index}
          value={filter.value}
          onValueChange={filter.onValueChange}
          placeholder={filter.placeholder || filter.label}
          className={cn(
            'w-full md:w-[200px] h-10',
            filter.value && filter.value !== 'all' && activeClassName,
            selectClassName,
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
  );
}
