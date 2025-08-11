'use client'

import { cn } from '@/lib/utils'
import { Check, ChevronDown } from 'lucide-react'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

interface CustomSelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
  required?: boolean
  children: React.ReactNode
}

interface CustomSelectItemProps {
  value: string
  children: React.ReactNode
}

const CustomSelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

export function CustomSelect({
  value,
  onValueChange,
  placeholder = 'Selecionar...',
  className,
  children,
}: Omit<CustomSelectProps, 'required'>) {
  const [isOpen, setIsOpen] = useState(false)
  const [_dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const selectRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Fechar quando clicar fora e calcular posição
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (selectRef.current && !selectRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    const updatePosition = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width,
        })
      }
    }

    if (isOpen) {
      updatePosition()
      document.addEventListener('mousedown', handleClickOutside)
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isOpen])

  // Encontrar o texto do item selecionado
  const selectedItem = React.Children.toArray(children).find((child) => {
    if (
      React.isValidElement<CustomSelectItemProps>(child) &&
      child.props.value === value
    ) {
      return child
    }
    return null
  }) as React.ReactElement<CustomSelectItemProps>

  const selectedText = selectedItem?.props?.children || placeholder

  // Ensure selectedText is always a string
  const displayText =
    typeof selectedText === 'string'
      ? selectedText
      : typeof selectedText === 'object' && selectedText !== null
        ? String(selectedText)
        : placeholder

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleFocus = () => {
    // Foco será tratado pelas classes CSS
  }

  const handleBlur = () => {
    // Blur será tratado pelas classes CSS
  }

  return (
    <CustomSelectContext.Provider
      value={{ value, onValueChange, isOpen, setIsOpen }}
    >
      <div ref={selectRef} className={cn('relative', className)}>
        {/* Trigger Button */}
        <button
          ref={buttonRef}
          id="combobox-trigger"
          type="button"
          aria-controls="dropdown-content"
          title={displayText}
          onClick={handleToggle}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 border-gray-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 admin-filter-element"
        >
          <span
            className={cn(value ? 'text-foreground' : 'text-muted-foreground')}
          >
            {displayText}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 opacity-50 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>

        {/* Dropdown Content - Posicionamento absoluto simples */}
        {isOpen && (
          <div
            id="dropdown-content"
            className="absolute z-[var(--z-dropdown)] mt-1 w-full rounded-md border bg-white shadow-xl animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 overflow-hidden"
            style={{
              maxHeight: '300px',
            }}
          >
            <div className="max-h-full overflow-y-auto overscroll-contain p-1 filter-dropdown-scroll">
              {children}
            </div>
          </div>
        )}
      </div>
    </CustomSelectContext.Provider>
  )
}

export function CustomSelectItem({ value, children }: CustomSelectItemProps) {
  const {
    value: selectedValue,
    onValueChange,
    setIsOpen,
  } = React.useContext(CustomSelectContext)
  const isSelected = selectedValue === value

  const handleClick = () => {
    onValueChange?.(value)
    setIsOpen(false)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm transition-colors duration-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        isSelected
          ? 'bg-accent text-accent-foreground'
          : 'hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600'
      )}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </button>
  )
}
