'use client'

import { Info, Search, TrendingUp, X } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { HybridTooltip } from './ui/HybridTooltip'
import { cn } from '@/lib/utils'

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

const RECENT_SEARCHES_KEY = 'gb-locacoes-recent-searches'
const MAX_RECENT_SEARCHES = 6

export function HeaderSearchCombobox() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Equipment[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Carregar pesquisas recentes do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setRecentSearches(
          Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT_SEARCHES) : []
        )
      } catch {
        setRecentSearches([])
      }
    }
  }, [])

  // Salvar pesquisa recente
  const saveRecentSearch = useCallback((searchTerm: string) => {
    const term = searchTerm.trim()
    if (!term) return

    setRecentSearches((prev) => {
      // Remove duplicatas e adiciona no início
      const filtered = prev.filter(
        (t) => t.toLowerCase() !== term.toLowerCase()
      )
      const updated = [term, ...filtered].slice(0, MAX_RECENT_SEARCHES)

      // Salvar no localStorage
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))

      return updated
    })
  }, [])

  // Remover uma pesquisa recente individual
  const removeRecentSearch = useCallback((termToRemove: string) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (term) => term.toLowerCase() !== termToRemove.toLowerCase()
      )

      if (filtered.length === 0) {
        localStorage.removeItem(RECENT_SEARCHES_KEY)
      } else {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered))
      }

      return filtered
    })
  }, [])

  // Fechar popover quando a rota mudar (evita flick durante navegação)
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Auto-focus no input quando o popover abre
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      setQuery('')
      setSuggestions([])
      setSelectedIndex(-1)
    }
  }, [open])

  // Busca com debounce
  const searchEquipments = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([])
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
        setSelectedIndex(-1)
      }
    } catch (error) {
      console.error('Erro na busca:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (suggestions.length === 0) {
      if (event.key === 'Enter' && query.trim()) {
        handleSearch(query)
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
        if (selectedIndex >= 0) {
          handleSelectEquipment(suggestions[selectedIndex]!)
        } else if (query.trim()) {
          handleSearch(query)
        }
        break
      case 'Escape':
        setOpen(false)
        break
    }
  }

  const handleSelectEquipment = (equipment: Equipment) => {
    saveRecentSearch(equipment.name)
    setOpen(false)
    router.push(`/equipamentos/${equipment.id}`)
  }

  const handleSearch = (searchTerm: string) => {
    const term = searchTerm.trim()
    if (term) {
      saveRecentSearch(term)
    }
    setOpen(false)
    router.push(`/equipamentos?search=${encodeURIComponent(term)}`)
  }

  const handlePopularSearch = (term: string) => {
    setQuery(term)
    inputRef.current?.focus()
  }

  const handleClear = () => {
    setQuery('')
    setSuggestions([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'transition-all duration-200 rounded-xl group header-action-button',
            open ? 'text-orange-600' : 'text-slate-700 hover:text-orange-600'
          )}
          aria-label="Abrir busca de equipamentos"
        >
          <Search
            className={cn(
              'h-5 w-5 transition-transform',
              open ? 'scale-110' : 'group-hover:scale-110'
            )}
          />
          <span className="sr-only">Buscar</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[90vw] md:w-[500px] p-0 border-2 border-slate-200 shadow-2xl bg-white rounded-2xl overflow-hidden"
        align="end"
        sideOffset={12}
      >
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">
                Buscar Equipamentos
              </h3>
              <p className="text-orange-100 text-xs">
                Digite para encontrar o que precisa
              </p>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex: andaime, betoneira, escada..."
              className="w-full h-10 pl-12 pr-10 text-sm rounded-md border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none focus:outline-none focus-visible:outline-none transition-all placeholder:text-slate-400 text-slate-900 bg-white"
              style={{ outline: 'none' }}
              aria-label="Campo de busca"
            />

            {/* Botão de busca - ESQUERDA */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <Button
                type="button"
                onClick={() => handleSearch(query)}
                disabled={!query.trim()}
                className="h-8 w-8 p-0 bg-orange-600 hover:bg-orange-700 text-white border-0"
                aria-label="Buscar equipamentos"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Botão clear - DIREITA */}
            {query && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="h-6 w-6 p-0 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                  aria-label="Limpar busca"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div
          className="max-h-[400px] overflow-y-auto overflow-x-hidden overscroll-contain"
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
            else if (delta > 0 && scrollTop + clientHeight >= scrollHeight) {
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
            <div className="p-8 flex flex-col items-center justify-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-orange-600" />
              </div>
              <p className="text-slate-600 font-medium">Buscando...</p>
            </div>
          ) : query.length >= 2 && suggestions.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <p className="text-slate-700 font-medium mb-1">
                Nenhum resultado encontrado
              </p>
              <p className="text-sm text-slate-500">
                Tente buscar por outro termo
              </p>
            </div>
          ) : suggestions.length > 0 ? (
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Resultados ({suggestions.length})
              </p>
              <div className="space-y-1">
                {suggestions.map((equipment, index) => {
                  const isSelected = selectedIndex === index
                  return (
                    <button
                      key={equipment.id}
                      onClick={() => handleSelectEquipment(equipment)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        'w-full text-left px-4 py-3 cursor-pointer transition-all duration-200 group rounded-lg',
                        isSelected
                          ? 'bg-orange-50 text-orange-900 border border-orange-300'
                          : 'bg-white hover:bg-gray-50 text-gray-900 border border-transparent hover:border-orange-300'
                      )}
                    >
                      <div className="flex items-start justify-between overflow-hidden">
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="font-medium text-sm text-gray-900 truncate mb-0.5">
                            {equipment.name}
                          </p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2 mb-2">
                            {equipment.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span
                              className={cn(
                                'text-xs px-2 py-0.5 rounded-full whitespace-nowrap',
                                isSelected
                                  ? 'bg-orange-600 text-white'
                                  : 'bg-orange-100 text-orange-700'
                              )}
                            >
                              {equipment.category.name}
                            </span>
                            <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
                              R$ {Number(equipment.pricePerDay).toFixed(2)}/dia
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="p-4">
              {recentSearches.length > 0 ? (
                <>
                  <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Pesquisas Recentes
                    <HybridTooltip content="💡 Digite pelo menos 2 caracteres para buscar">
                      <button
                        type="button"
                        className="ml-1 text-slate-400 hover:text-orange-600 transition-colors cursor-help"
                        aria-label="Informação sobre buscas"
                      >
                        <Info className="h-3.5 w-3.5" />
                      </button>
                    </HybridTooltip>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {recentSearches.map((term, index) => (
                      <button
                        key={`${term}-${index}`}
                        onClick={() => handlePopularSearch(term)}
                        className="relative p-3 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-orange-50 hover:to-orange-100 rounded-xl transition-all duration-200 group text-left shadow-sm hover:shadow-md"
                      >
                        {/* Botão de fechar - Canto superior direito */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeRecentSearch(term)
                          }}
                          className="absolute top-1 right-1 p-1 rounded-md hover:bg-white text-slate-400 transition-colors z-10"
                          aria-label={`Remover pesquisa "${term}"`}
                          title={`Remover "${term}"`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="flex items-center gap-2 pr-6">
                          <div className="p-1.5 bg-white rounded-lg shadow-sm">
                            <Search className="h-3.5 w-3.5 text-slate-600 group-hover:text-orange-600 transition-colors duration-200" />
                          </div>
                          <span className="text-sm font-medium text-slate-700 group-hover:text-orange-700 truncate transition-colors duration-200">
                            {term}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-slate-700 font-medium mb-1">
                    Nenhuma pesquisa recente
                  </p>
                  <p className="text-sm text-slate-500">
                    Suas buscas aparecerão aqui
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
