'use client'

/* eslint-disable */
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './button'
import { Input } from './input'

interface Equipment {
  id: string
  name: string
  description: string
  pricePerDay: string
  category: {
    name: string
  }
  images?: string[]
}

interface AutocompleteProps {
  placeholder?: string
  onSelect?: (equipment: Equipment) => void
  onSearch?: (query: string) => void
  className?: string
  disabled?: boolean
}

export function Autocomplete({
  placeholder = 'Buscar equipamentos...',
  onSelect,
  onSearch,
  className,
  disabled = false,
}: AutocompleteProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Equipment[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasValidSelection, setHasValidSelection] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  )
  const [isMounted, setIsMounted] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  })
  const [isMobileIOS, setIsMobileIOS] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Detecta QUALQUER browser iOS para aplicar posicionamento correto
  const detectMobileIOS = useCallback(() => {
    if (typeof window === 'undefined') return false

    const userAgent = window.navigator.userAgent
    // Detecta qualquer dispositivo iOS (iPhone, iPad, iPod)
    const isIOS = /iPad|iPhone|iPod/.test(userAgent)

    // Para iOS, sempre usa absolute positioning independente do browser
    return isIOS
  }, [])

  // Função de busca com debounce
  const searchEquipments = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/equipamentos/search?q=${encodeURIComponent(searchQuery)}`
      )
      if (response.ok) {
        const data = await response.json()
        setSuggestions(data)
        setIsOpen(data.length > 0)
        setSelectedIndex(-1)
      } else {
        console.log('Erro na resposta da API:', response.status)
        setSuggestions([])
        setIsOpen(false)
      }
    } catch (error) {
      console.error('Erro na busca:', error)
      setSuggestions([])
      setIsOpen(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Mount detection e detecção Mobile iOS
  useEffect(() => {
    setIsMounted(true)
    setIsMobileIOS(detectMobileIOS())
  }, [detectMobileIOS])

  // Calculate dropdown position when opening
  const updateDropdownPosition = useCallback(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 4, // 4px gap, sem window.scrollY
        left: rect.left, // sem window.scrollX
        width: rect.width,
      })
    }
  }, [])

  // Update position when dropdown opens or when input changes
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Pequeno delay para garantir que o DOM esteja atualizado
      const timer = setTimeout(() => {
        updateDropdownPosition()
      }, 0)

      return () => clearTimeout(timer)
    }
    return undefined
  }, [isOpen, updateDropdownPosition])

  // Debounce da busca
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchEquipments(query)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, searchEquipments])

  // Fechar sugestões ao clicar fora e atualizar posição
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const dropdownElement = dropdownRef.current
      const inputElement = inputRef.current

      // Verifica se o clique foi fora do input E fora do dropdown
      if (
        inputElement &&
        dropdownElement &&
        !inputElement.contains(target) &&
        !dropdownElement.contains(target)
      ) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    const handleScroll = (event: Event) => {
      // Atualiza posição se dropdown estiver aberto
      if (isOpen) {
        updateDropdownPosition()
      }

      // Fecha o dropdown se o scroll não for dentro do dropdown
      const target = event.target as Node
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false)
        setSelectedIndex(-1)
      }
    }

    const handleResize = () => {
      if (isOpen) {
        updateDropdownPosition()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleScroll, true)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen, updateDropdownPosition])

  // Navegação com teclado
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (event.key === 'Enter' && query.trim()) {
        handleSearch()
      }
      return
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        event.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        event.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          const selectedEquipment = suggestions[selectedIndex]
          if (selectedEquipment) {
            handleSelect(selectedEquipment)
          }
        } else {
          handleSearch()
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  const handleSelect = useCallback(
    (equipment: Equipment) => {
      // Fecha o dropdown imediatamente
      setIsOpen(false)
      setSuggestions([])
      setSelectedIndex(-1)

      // Atualiza o valor do input usando React batch update
      setTimeout(() => {
        setQuery(equipment.name)
        setHasValidSelection(true)
        setSelectedEquipment(equipment)

        // Força re-render se necessário
        if (inputRef.current && inputRef.current.value !== equipment.name) {
          inputRef.current.value = equipment.name
          inputRef.current.dispatchEvent(new Event('input', { bubbles: true }))
        }

        // Chama o callback
        onSelect?.(equipment)
      }, 0)
    },
    [onSelect]
  )

  const handleSearch = () => {
    if (hasValidSelection && selectedEquipment) {
      // Se tem equipamento selecionado, envia o equipamento
      onSelect?.(selectedEquipment)
    } else if (query.trim()) {
      // Se não tem seleção mas tem texto, faz busca por texto
      onSearch?.(query.trim())
    }
    setIsOpen(false)
    setSelectedIndex(-1)
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    setIsOpen(false)
    setSelectedIndex(-1)
    setHasValidSelection(false)
    setSelectedEquipment(null)
    inputRef.current?.focus()
  }

  // Scroll para o item selecionado
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedItem = listRef.current.children[
        selectedIndex
      ] as HTMLElement
      if (selectedItem) {
        selectedItem.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        })
      }
    }
  }, [selectedIndex])

  return (
    <div className={cn('relative w-full', className)} suppressHydrationWarning>
      <div className="relative z-[9999]">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (hasValidSelection) {
              setHasValidSelection(false)
              setSelectedEquipment(null)
            }
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true)
            }
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'pr-20 text-gray-900 placeholder:text-gray-500 bg-white focus:bg-white',
            hasValidSelection && 'ring-2 ring-green-500 ring-opacity-50'
          )}
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          role="combobox"
          aria-label="Campo de busca de equipamentos"
          aria-activedescendant={
            selectedIndex >= 0 ? `equipment-option-${selectedIndex}` : ''
          }
          title="Campo de busca de equipamentos"
          name="equipment-search"
          id="equipment-search-input"
        />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
              aria-label={hasValidSelection ? 'Limpar seleção' : 'Limpar busca'}
            >
              <X className="h-3 w-3" />
            </Button>
          )}

          <Button
            type="button"
            onClick={handleSearch}
            disabled={disabled || !query.trim()}
            className="h-8 w-8 p-0 bg-orange-600 hover:bg-orange-700 text-white"
            aria-label="Buscar equipamentos"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Dropdown - Posicionamento híbrido */}
      {isOpen &&
        isMounted &&
        (isMobileIOS ? (
          // Mobile iOS (Safari, Chrome, Firefox): usa absolute positioning (sem portal)
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 h-auto bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden z-[99999] mt-1"
            style={{
              maxHeight: '370px',
            }}
            suppressHydrationWarning
          >
            <div
              className="max-h-full overflow-y-auto overscroll-contain"
              style={{ maxHeight: '370px' }}
              onWheel={(e) => {
                // Previne propagação do scroll para a página
                const element = e.currentTarget
                const { scrollTop, scrollHeight, clientHeight } = element
                const delta = e.deltaY

                // Se estiver no topo e tentando scrollar para cima
                if (delta < 0 && scrollTop === 0) {
                  e.preventDefault()
                }
                // Se estiver no fim e tentando scrollar para baixo
                else if (
                  delta > 0 &&
                  scrollTop + clientHeight >= scrollHeight
                ) {
                  e.preventDefault()
                }
                // Caso contrário, permite o scroll interno mas previne propagação
                e.stopPropagation()
              }}
              onTouchMove={(e) => {
                // Previne propagação do scroll em dispositivos touch
                e.stopPropagation()
              }}
            >
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mx-auto mb-2"></div>
                  Buscando...
                </div>
              ) : suggestions.length > 0 ? (
                <ul
                  ref={listRef}
                  role="listbox"
                  aria-label="Sugestões de equipamentos"
                >
                  {suggestions.map((equipment, index) => {
                    const isSelected = selectedIndex === index
                    return (
                      <li
                        key={equipment.id}
                        id={`equipment-option-${index}`}
                        role="option"
                        className={cn(
                          'px-4 py-3 cursor-pointer transition-colors text-gray-900',
                          isSelected
                            ? 'bg-orange-50 text-orange-900'
                            : 'hover:bg-gray-50 text-gray-900'
                        )}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleSelect(equipment)
                        }}
                      >
                        <div className="flex items-start justify-between overflow-hidden">
                          <div className="flex-1 min-w-0 pr-2">
                            <p className="font-medium text-sm truncate text-gray-900">
                              {equipment.name}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                              {equipment.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {equipment.category.name}
                              </span>
                              <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
                                R$ {Number(equipment.pricePerDay).toFixed(2)}
                                /dia
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              ) : query.length >= 2 ? (
                <div className="p-4 text-center text-gray-500">
                  <p className="text-sm">Nenhum equipamento encontrado</p>
                  <p className="text-xs mt-1">Tente outro termo de busca</p>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          // Desktop/outros browsers: usa fixed positioning (via portal)
          createPortal(
            <div
              ref={dropdownRef}
              className="fixed h-auto bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden z-[99999]"
              style={{
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                width: `${dropdownPosition.width}px`,
                maxHeight: '370px',
              }}
              suppressHydrationWarning
            >
              <div
                className="max-h-full overflow-y-auto overscroll-contain"
                style={{ maxHeight: '370px' }}
                onWheel={(e) => {
                  // Previne propagação do scroll para a página
                  const element = e.currentTarget
                  const { scrollTop, scrollHeight, clientHeight } = element
                  const delta = e.deltaY

                  // Se estiver no topo e tentando scrollar para cima
                  if (delta < 0 && scrollTop === 0) {
                    e.preventDefault()
                  }
                  // Se estiver no fim e tentando scrollar para baixo
                  else if (
                    delta > 0 &&
                    scrollTop + clientHeight >= scrollHeight
                  ) {
                    e.preventDefault()
                  }
                  // Caso contrário, permite o scroll interno mas previne propagação
                  e.stopPropagation()
                }}
                onTouchMove={(e) => {
                  // Previne propagação do scroll em dispositivos touch
                  e.stopPropagation()
                }}
              >
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mx-auto mb-2"></div>
                    Buscando...
                  </div>
                ) : suggestions.length > 0 ? (
                  <ul
                    ref={listRef}
                    role="listbox"
                    aria-label="Sugestões de equipamentos"
                  >
                    {suggestions.map((equipment, index) => {
                      const isSelected = selectedIndex === index
                      return (
                        <li
                          key={equipment.id}
                          id={`equipment-option-${index}`}
                          role="option"
                          className={cn(
                            'px-4 py-3 cursor-pointer transition-colors text-gray-900',
                            isSelected
                              ? 'bg-orange-50 text-orange-900'
                              : 'hover:bg-gray-50 text-gray-900'
                          )}
                          onMouseDown={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleSelect(equipment)
                          }}
                        >
                          <div className="flex items-start justify-between overflow-hidden">
                            <div className="flex-1 min-w-0 pr-2">
                              <p className="font-medium text-sm truncate text-gray-900">
                                {equipment.name}
                              </p>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                {equipment.description}
                              </p>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                                  {equipment.category.name}
                                </span>
                                <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
                                  R$ {Number(equipment.pricePerDay).toFixed(2)}
                                  /dia
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                ) : query.length >= 2 ? (
                  <div className="p-4 text-center text-gray-500">
                    <p className="text-sm">Nenhum equipamento encontrado</p>
                    <p className="text-xs mt-1">Tente outro termo de busca</p>
                  </div>
                ) : null}
              </div>
            </div>,
            document.body
          )
        ))}
    </div>
  )
}
