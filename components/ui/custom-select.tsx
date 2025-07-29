'use client';

import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

interface CustomSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  children: React.ReactNode;
}

interface CustomSelectItemProps {
  value: string;
  children: React.ReactNode;
}

const CustomSelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export function CustomSelect({
  value,
  onValueChange,
  placeholder = 'Selecionar...',
  className,
  children,
}: Omit<CustomSelectProps, 'required'>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fechar quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Remove outline quando fecha
        if (buttonRef.current) {
          buttonRef.current.style.boxShadow = '';
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Encontrar o texto do item selecionado
  const selectedItem = React.Children.toArray(children).find((child) => {
    if (React.isValidElement<CustomSelectItemProps>(child) && child.props.value === value) {
      return child;
    }
    return null;
  }) as React.ReactElement<CustomSelectItemProps>;

  const selectedText = selectedItem?.props?.children || placeholder;

  const handleToggle = () => {
    setIsOpen(!isOpen);
    // Adiciona outline quando abre ou remove quando fecha
    if (buttonRef.current) {
      if (!isOpen) {
        buttonRef.current.style.boxShadow = '0 0 0 3px oklch(93.2% 0.032 255.585)';
      } else {
        buttonRef.current.style.boxShadow = '';
      }
    }
  };

  const handleFocus = () => {
    if (buttonRef.current) {
      buttonRef.current.style.boxShadow = '0 0 0 3px oklch(93.2% 0.032 255.585)';
    }
  };

  const handleBlur = () => {
    if (buttonRef.current && !isOpen) {
      buttonRef.current.style.boxShadow = '';
    }
  };

  return (
    <CustomSelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
      <div ref={selectRef} className={cn('relative', className)}>
        {/* Trigger Button */}
        <button
          ref={buttonRef}
          id="combobox-trigger"
          type="button"
          aria-controls="dropdown-content"
          title={selectedText as string}
          onClick={handleToggle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 mt-2 border-gray-200 focus:border-blue-500 focus:outline-blue-500 focus:outline-2 focus:ring-0"
        >
          <span className={cn(value ? 'text-foreground' : 'text-muted-foreground')}>
            {selectedText}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 opacity-50 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </button>

        {/* Dropdown Content - Renderizado como filho direto */}
        {isOpen && (
          <div
            id="dropdown-content"
            className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 p-1"
          >
            {children}
          </div>
        )}
      </div>
    </CustomSelectContext.Provider>
  );
}

export function CustomSelectItem({ value, children }: CustomSelectItemProps) {
  const { value: selectedValue, onValueChange, setIsOpen } = React.useContext(CustomSelectContext);
  const isSelected = selectedValue === value;

  const handleClick = () => {
    onValueChange?.(value);
    setIsOpen(false);
    // Remove outline do button quando seleciona um item
    setTimeout(() => {
      const button = document.querySelector('[role="combobox"]') as HTMLButtonElement;
      if (button) {
        button.style.boxShadow = '';
      }
    }, 0);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm transition-colors duration-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        isSelected
          ? 'bg-accent text-accent-foreground'
          : 'hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600',
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </button>
  );
}
