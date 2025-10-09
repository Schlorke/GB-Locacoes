'use client'

import { AnimatePresence, motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import {
  AlertTriangle,
  Edit,
  Palette,
  RotateCcw,
  Save,
  Search,
  Tag,
  X,
} from 'lucide-react'
import React, { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import { AVAILABLE_CATEGORY_ICONS } from '@/lib/constants/lucide-icons'
import {
  DEFAULT_CATEGORY_SETTINGS,
  filterIconsBySearch,
  renderLucideIcon,
} from '@/lib/utils/category-helpers'

type IconGridProps = {
  icons: string[]
  selected: string | null
  bgColor: string
  iconColor: string
  onSelect: (_name: string) => void
}

const IconGrid: React.FC<IconGridProps> = React.memo(
  ({ icons, selected, bgColor, iconColor, onSelect }) => {
    return (
      <div className="grid grid-cols-6 gap-2 p-3">
        {icons.map((iconName) => {
          const isSelected = selected === iconName
          return (
            <button
              key={iconName}
              type="button"
              onClick={() => onSelect(iconName)}
              className={cn(
                'w-10 h-10 rounded-lg border transition-all duration-200 flex items-center justify-center group overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white',
                isSelected
                  ? 'border-blue-400 shadow-2xl shadow-black/50 scale-105 ring-2 ring-blue-500 ring-offset-2 ring-offset-white'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-sm focus:border-blue-300'
              )}
              title={iconName}
              data-bg={bgColor}
              data-icon-color={iconColor}
              style={{ backgroundColor: bgColor }}
            >
              {renderLucideIcon(
                iconName as keyof typeof LucideIcons,
                16,
                iconColor
              )}
            </button>
          )
        })}
      </div>
    )
  }
)
IconGrid.displayName = 'IconGrid'

/**
 * MODAL DE CATEGORIA MODERNO
 * Componente para criação/edição de categorias com personalização visual.
 * Inclui seletor de ícones, cores e preview em tempo real.
 */

export interface CategoryData {
  id?: string
  name: string
  description: string
  backgroundColor: string
  fontColor: string
  icon?: keyof typeof LucideIcons | null
  iconColor: string
}

interface ModernCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (
    _data: Omit<CategoryData, 'backgroundColor'> & {
      bgColor: string
      icon: keyof typeof LucideIcons | null | undefined
    }
  ) => Promise<void>
  initialData?: CategoryData
  title?: string
  saveButtonText?: string
}

export function ModernCategoryModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  title = 'Nova Categoria',
}: ModernCategoryModalProps) {
  // Constantes locais para manter consistência visual/comportamental
  const RESET_ANIMATION_MS = 600
  const ICON_GRID_HEIGHT_PX = 150

  const [formData, setFormData] = useState<CategoryData>(
    initialData ?? {
      name: '',
      description: '',
      ...DEFAULT_CATEGORY_SETTINGS,
    }
  )
  // Preenche o formulário ao abrir para edição
  React.useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData)
    } else if (isOpen && !initialData) {
      setFormData({
        name: '',
        description: '',
        ...DEFAULT_CATEGORY_SETTINGS,
      })
    }
  }, [isOpen, initialData])

  const [errors, setErrors] = useState<{
    name?: string
    description?: string
    submit?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDesignOpen, setIsDesignOpen] = useState(false)
  const [iconFilter, setIconFilter] = useState('')
  const [resetAnimation, setResetAnimation] = useState(false)
  const [resetVisualAnimation, setResetVisualAnimation] = useState(false)

  // Evita timeouts pendurados se o componente for desmontado
  const resetTimeoutRef = React.useRef<number | null>(null)
  const resetVisualTimeoutRef = React.useRef<number | null>(null)
  React.useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
      if (resetVisualTimeoutRef.current) {
        clearTimeout(resetVisualTimeoutRef.current)
      }
    }
  }, [])

  // Limpa erro de submit ao abrir modal ou ao mudar nome
  React.useEffect(() => {
    setErrors((prev) => ({ ...prev, submit: undefined }))
  }, [isOpen, formData.name, initialData])

  // Função para resetar apenas as configurações visuais (cores e ícone)
  const resetVisualSettings = () => {
    // Trigger animation
    setResetVisualAnimation(true)

    setFormData((prev) => ({
      ...prev,
      ...DEFAULT_CATEGORY_SETTINGS,
    }))

    // Remove animation class after animation completes
    resetVisualTimeoutRef.current = window.setTimeout(() => {
      setResetVisualAnimation(false)
    }, RESET_ANIMATION_MS)
  }

  // Função para resetar todas as configurações para padrão
  const resetToDefaults = () => {
    // Trigger animation
    setResetAnimation(true)

    setFormData({
      name: '',
      description: '',
      ...DEFAULT_CATEGORY_SETTINGS,
    })
    setErrors({})

    // Remove animation class after animation completes
    resetTimeoutRef.current = window.setTimeout(() => {
      setResetAnimation(false)
    }, RESET_ANIMATION_MS)
  }

  async function handleSubmit() {
    setIsSubmitting(true)
    setErrors({})
    if (!formData.name.trim()) {
      setErrors({ name: 'O nome da categoria é obrigatório.' })
      setIsSubmitting(false)
      return
    }
    try {
      // Corrige o nome do campo para o backend
      const { backgroundColor, icon, ...rest } = formData
      const payload = {
        ...rest,
        bgColor: backgroundColor,
        icon: icon === undefined ? null : icon,
      }
      await onSave(payload)
      onClose()
    } catch (err: unknown) {
      let message = 'Erro ao salvar categoria.'
      if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof (err as Record<string, unknown>).message === 'string'
      ) {
        message = String((err as Record<string, unknown>).message)
      }
      setErrors({ submit: message })
    }
    setIsSubmitting(false)
  }

  return (
    <React.Fragment>
      {/* Dialog Principal: Criar/Editar Categoria */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          closeButtonClassName="hover:bg-white [&>svg]:w-4 [&>svg]:h-4"
          className="w-[calc(100vw-0.8rem)] max-w-lg p-0 gap-0 bg-white border-0 shadow-2xl rounded-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed !left-[50%] !top-[54%] md:!top-[50%] z-50 flex flex-col !translate-x-[-50%] !translate-y-[-50%] h-[80vh] max-h-[80vh] md:h-[71vh] md:max-h-[71vh] overflow-hidden"
        >
          {/* Header fixo */}
          <DialogHeader className="p-6 xs:p-4 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-2xl flex-shrink-0">
            <DialogTitle className="text-xl xs:text-lg font-semibold text-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center text-white shadow-sm">
                <Tag className="w-4 h-4" />
              </div>
              {title}
            </DialogTitle>
          </DialogHeader>

          {/* Conteúdo scrollável */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="p-6 space-y-6 xs:p-3 xs:space-y-3 w-full max-w-full pb-2">
                {/* Preview da Categoria */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200 shadow-sm relative w-full max-w-full xs:p-4 xs:rounded-md">
                  {/* Header da seção com título e ações na mesma linha */}
                  <div className="flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-4 sm:mb-3">
                    <h3 className="text-sm font-semibold text-slate-700 sm:text-sm text-center sm:text-left">
                      Preview da Categoria
                    </h3>

                    {/* Botões de ação */}
                    <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-2 flex-wrap w-full sm:w-auto mt-1 sm:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsDesignOpen(true)}
                        className="inline-flex bg-white items-center justify-center gap-2 whitespace-nowrap h-8 px-3 text-xs font-medium rounded-lg border text-slate-900 shadow-md transition-all hover:bg-white hover:shadow-lg hover:scale-none group xs:h-9 xs:px-4 xs:w-full"
                      >
                        <Edit className="w-4 h-4 xs:w-3.5 xs:h-3.5 group-hover:text-orange-600 transition-colors duration-200" />
                        <span className="group-hover:text-orange-600 transition-colors duration-200">
                          Editar
                        </span>
                      </Button>
                      <Button
                        variant="reset"
                        size="sm"
                        onClick={resetToDefaults}
                        className="inline-flex items-center justify-center gap-2 goo whitespace-nowrap h-8 px-3 text-xs font-medium rounded-lg border bg-white text-slate-900 shadow-md transition-all hover:shadow-lg group"
                        title="Resetar configurações"
                      >
                        <RotateCcw
                          className="w-4 h-4 group-hover:text-orange-600 transition-colors duration-200"
                          style={
                            resetAnimation
                              ? {
                                  animation: 'spin 0.6s ease-in-out reverse',
                                }
                              : undefined
                          }
                        />
                        <span className="group-hover:text-orange-600 transition-colors duration-200">
                          Resetar
                        </span>
                      </Button>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="flex justify-center items-center w-full mb-4 xs:mb-3">
                    <Badge
                      variant="outline"
                      className="text-xs inline-flex items-center gap-2 font-medium px-4 py-2 rounded-xl border-0 max-w-full transition-all duration-300 shadow-[4px_8px_18px_2px_rgba(0,0,0,0.18)] hover:shadow-[8px_12px_20px_2px_rgba(0,0,0,0.22)] hover:scale-[1.07] xs:text-xs xs:px-4 xs:py-2 xs:rounded-lg xs:gap-1.5"
                      style={{
                        backgroundColor: formData.backgroundColor,
                        color: formData.fontColor,
                      }}
                    >
                      {formData.icon ? (
                        <span className="flex-shrink-0">
                          {renderLucideIcon(
                            formData.icon,
                            16,
                            formData.iconColor
                          )}
                        </span>
                      ) : null}
                      <span className="truncate font-semibold text-sm min-w-0">
                        {formData.name || 'Nome da Categoria'}
                      </span>
                    </Badge>
                  </div>
                  {formData.description && (
                    <div className="text-center w-full flex justify-center items-center">
                      <p className="text-xs text-slate-500 italic max-w-xs leading-relaxed whitespace-pre-wrap break-words">
                        {formData.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Nome */}
                <div className="space-y-2 xs:space-y-1.5 w-full max-w-full">
                  <Label
                    htmlFor="name"
                    className="text-sm xs:text-xs font-semibold text-slate-700"
                  >
                    Nome da Categoria *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ex: Ferramentas de Construção"
                    className={cn(
                      'h-11 text-sm border-gray-200 focus:border-blue-500 rounded-lg xs:h-10 xs:text-xs w-full max-w-full',
                      errors.name && 'border-red-500 focus:border-red-500'
                    )}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-2 text-red-600 text-xs">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.name}
                    </div>
                  )}
                  <p className="text-xs text-slate-500">
                    {formData.name.length}/50 caracteres
                  </p>
                </div>

                {/* Descrição */}
                <div className="space-y-3 w-full max-w-full">
                  <Label
                    htmlFor="description"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Descrição (Opcional)
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value.slice(0, 200),
                      })
                    }
                    placeholder="Descreva brevemente esta categoria..."
                    rows={4}
                    maxLength={200}
                    className={cn(
                      'text-sm border-gray-200 focus:border-blue-500 resize-none rounded-lg xs:text-xs xs:min-h-[80px] w-full max-w-full',
                      errors.description &&
                        'border-red-500 focus:border-red-500'
                    )}
                  />
                  {errors.description && (
                    <div className="flex items-center gap-2 text-red-600 text-xs">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.description}
                    </div>
                  )}
                  <p className="text-xs text-slate-500">
                    {formData.description.length}/200 caracteres
                  </p>
                </div>

                {/* Erro de Envio */}
                <React.Fragment>
                  <AnimatePresence>
                    {errors.submit && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 rounded-lg border border-red-200 bg-red-50"
                      >
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {errors.submit}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              </div>
            </ScrollArea>
          </div>

          {/* Footer fixo */}
          <DialogFooter className="p-6 xs:p-3 border-t bg-gray-50 rounded-b-2xl w-full max-w-full flex-shrink-0">
            <div className="flex gap-4 w-full xs:gap-2 flex-wrap">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 h-11 xs:h-10 rounded-lg border border-slate-200 hover:bg-slate-50 bg-transparent shadow-md xs:text-sm"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name.trim()}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm xs:text-xs font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2 bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 shadow-md hover:shadow-lg transition-all duration-300 h-11 xs:h-10 px-4 flex-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-plus w-4 h-4 mr-2"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                {initialData?.id ? 'Atualizar Categoria' : 'Nova Categoria'}
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Secundário: Personalizar Design */}
      <Dialog open={isDesignOpen} onOpenChange={setIsDesignOpen}>
        <DialogContent
          closeButtonClassName="hidden"
          className="w-[calc(100vw-2rem)] max-w-[380px] gap-0 bg-white border-0 shadow-2xl rounded-2xl flex flex-col h-[75vh] max-h-[515px] fixed !left-[50%] !top-[50%] !translate-x-[-50%] translate-y-[-40%] md:translate-y-[-50%] z-[100] overflow-hidden"
        >
          {/* Header fixo */}
          <DialogHeader className="p-4 border-b border-slate-100 flex-shrink-0">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-semibold text-base text-slate-800">
                  Personalizar Design
                </span>
              </div>

              {/* Botões de ação lado a lado */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetVisualSettings}
                  className="inline-flex items-center justify-center text-slate-400 hover:text-orange-600 h-7 w-7 p-0 rounded-lg transition-colors"
                  title="Resetar configurações visuais"
                >
                  <RotateCcw
                    className="w-4 h-4"
                    style={
                      resetVisualAnimation
                        ? {
                            animation: 'spin 0.6s ease-in-out reverse',
                          }
                        : undefined
                    }
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDesignOpen(false)}
                  className="inline-flex items-center justify-center text-slate-400 hover:text-orange-600 h-7 w-7 p-0 rounded-lg transition-colors"
                  title="Fechar"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* Conteúdo scrollável */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full w-full">
              <div className="p-4 space-y-4">
                {/* Search Filter */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Buscar ícone..."
                    value={iconFilter}
                    onChange={(e) => setIconFilter(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-blue-500 h-9 text-sm placeholder:text-slate-400 rounded-lg"
                  />
                </div>

                {/* Icons Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-slate-700">
                      Ícone
                    </h5>
                  </div>
                  <div className="bg-slate-50 rounded-lg pr-1.5  border border-slate-100">
                    <ScrollArea
                      className="w-full category-modal-scrollbar"
                      style={{ height: ICON_GRID_HEIGHT_PX }}
                    >
                      <IconGrid
                        icons={React.useMemo(
                          () =>
                            filterIconsBySearch(
                              iconFilter,
                              AVAILABLE_CATEGORY_ICONS
                            ).slice(0, 48),
                          [iconFilter]
                        )}
                        selected={formData.icon ?? null}
                        bgColor={formData.backgroundColor}
                        iconColor={formData.iconColor}
                        onSelect={(name) =>
                          setFormData({
                            ...formData,
                            icon: name as keyof typeof LucideIcons,
                          })
                        }
                      />
                    </ScrollArea>
                  </div>
                </div>

                {/* Color Sections */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-slate-700">Cores</h5>
                  <div className="flex gap-4 justify-center">
                    {/* Icon Color */}
                    <div className="flex flex-col items-center gap-2">
                      <input
                        type="color"
                        value={formData.iconColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            iconColor: e.target.value,
                          })
                        }
                        className="w-10 h-10 rounded-lg border-2 border-slate-300 cursor-pointer shadow-sm"
                        title="Selecionar cor do ícone"
                      />
                      <span className="font-medium text-slate-700 text-xs text-center">
                        Cor do Ícone
                      </span>
                    </div>
                    {/* Background Color */}
                    <div className="flex flex-col items-center gap-2">
                      <input
                        type="color"
                        value={formData.backgroundColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            backgroundColor: e.target.value,
                          })
                        }
                        className="w-10 h-10 rounded-lg border-2 border-slate-300 cursor-pointer shadow-sm"
                        title="Selecionar cor de fundo"
                      />
                      <span className="font-medium text-slate-700 text-xs text-center">
                        Cor de Fundo
                      </span>
                    </div>
                    {/* Font Color */}
                    <div className="flex flex-col items-center gap-2">
                      <input
                        type="color"
                        value={formData.fontColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fontColor: e.target.value,
                          })
                        }
                        className="w-10 h-10 rounded-lg border-2 border-slate-300 cursor-pointer shadow-sm"
                        title="Selecionar cor da fonte"
                      />
                      <span className="font-medium text-slate-700 text-xs text-center">
                        Cor da Fonte
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Footer fixo */}
          <DialogFooter className="p-4 border-t bg-gray-50 rounded-b-2xl flex-shrink-0">
            <Button
              onClick={() => setIsDesignOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

// Estilos específicos para o scrollbar do grid de ícones
// Estes estilos são aplicados apenas ao scrollbar com classe "category-modal-scrollbar"
const categoryModalScrollbarStyles = `
.category-modal-scrollbar [data-radix-scroll-area-scrollbar] {
  background-color: rgba(148, 163, 184, 0.1);
  border-radius: 9999px;
  padding: 4px 2px;
}

.category-modal-scrollbar [data-radix-scroll-area-thumb] {
  background-color: #cbd5e1 !important;
  border-radius: 9999px;
  transition: background-color 200ms ease;
  min-height: 20px;
}

.category-modal-scrollbar [data-radix-scroll-area-thumb]:hover {
  background-color: #cbd5e1 !important;
}

/* Setas do scrollbar com bg-slate-300 */
.category-modal-scrollbar [data-radix-scroll-area-scrollbar] > div:first-child {
  border-bottom-color: #cbd5e1 !important;
}

.category-modal-scrollbar [data-radix-scroll-area-scrollbar] > div:last-child {
  border-top-color: #cbd5e1 !important;
}
`

// Injeta os estilos no head do documento
if (typeof document !== 'undefined') {
  const styleId = 'category-modal-scrollbar-styles'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = categoryModalScrollbarStyles
    document.head.appendChild(style)
  }
}
