'use client'

import { Dialog } from '@base-ui-components/react/dialog'
import {
  CategoryShowcase,
  type TabConfig,
} from '@/components/category-showcase'
import {
  Anchor,
  Building,
  Construction,
  Drill,
  Hammer,
  HardHat,
  Pencil,
  Plus,
  RotateCcw,
  Tag as TagIcon,
  TreePine,
  Truck,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react'

import type { CustomIconProps } from '@/components/icons/custom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const BACKDROP_CLASSES =
  'fixed inset-0 z-[9998] min-h-dvh bg-black/60 transition-all duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 supports-[-webkit-touch-callout:none]:absolute dark:bg-black/70'

const SIMPLE_POPUP_CLASSES =
  'fixed top-[calc(50%+1.25rem*var(--nested-dialogs))] left-1/2 z-[9999] -mt-8 w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 scale-[calc(1-0.1*var(--nested-dialogs))] rounded-lg bg-gray-50 p-6 text-gray-900 outline outline-1 outline-gray-200 transition-all duration-150 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[nested-dialog-open]:after:absolute data-[nested-dialog-open]:after:inset-0 data-[nested-dialog-open]:after:rounded-[inherit] data-[nested-dialog-open]:after:bg-black/5 dark:outline-gray-300'

// Classes agrupadas para o popup do dialog (ordem: posição → tamanho → transform → layout → aparência → transições → estados Base UI)
const DIALOG_POPUP = [
  // 1. Posicionamento e stacking context
  'fixed left-1/2 top-1/2 z-[9999]',
  // 2. Tamanhos e restrições
  'w-[calc(100vw-0.8rem)] max-w-lg h-[80vh] max-h-[80vh] md:h-[71vh] md:max-h-[71vh]',
  // 3. Transformações
  '-translate-x-1/2 -translate-y-1/2 scale-[calc(1-0.1*var(--nested-dialogs))]',
  // 4. Layout estrutural
  'flex flex-col rounded-2xl',
  // 5. Aparência visual
  'bg-white p-0 text-slate-900 shadow-2xl ring-1 ring-slate-200',
  // 6. Transições e easings
  'transition-all duration-200 ease-out',
  // 7. Estados derivados do Base UI (animações e nested dialogs)
  'data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[nested-dialog-open]:after:absolute data-[nested-dialog-open]:after:inset-0 data-[nested-dialog-open]:after:rounded-[inherit] data-[nested-dialog-open]:after:bg-black/5',
].join(' ')

// Container flex principal do dialog (layout → overflow → aparência base)
const DIALOG_CONTENT = [
  // 1. Layout flexível
  'flex h-full flex-col',
].join(' ')

// Cabeçalho do dialog (layout/spacing → decoração)
const DIALOG_HEADER = [
  // 1. Layout e espaçamento horizontal
  'relative flex flex-shrink-0 items-center gap-3 p-6 border-b border-gray-100',
  // 2. Aparência (bordas, gradiente)
  'rounded-t-2xl bg-gradient-to-r from-slate-50 to-slate-100',
].join(' ')

// Ícone do cabeçalho (dimensões → aparência)
const DIALOG_HEADER_ICON = [
  // 1. Dimensões e layout
  'flex h-8 w-8 flex-shrink-0 items-center justify-center',
  // 2. Aparência e efeitos
  'rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 text-white shadow-sm',
].join(' ')

// Botão de fechar (posição → tamanho → estilo)
const DIALOG_CLOSE_BUTTON = [
  // 1. Posicionamento absoluto
  'absolute right-4 top-4',
  // 2. Dimensões
  'inline-flex h-6 w-6 items-center justify-center',
  // 3. Aparência e transições
  'rounded-lg disabled:pointer-events-none disabled:opacity-50 transition-all duration-300 text-slate-400 hover:text-slate-600 hover:bg-white [&>svg]:w-4 [&>svg]:h-4',
].join(' ')

// Wrapper scrollável (layout → overflow)
const DIALOG_SCROLL_WRAPPER = [
  // 1. Layout flexível
  'flex-1 min-h-0',
].join(' ')

// Conteúdo da ScrollArea (spacing → responsividade)
const DIALOG_SCROLL_CONTENT = [
  // 1. Espaçamento (com padding extra lateral para elementos com scale)
  'p-6 space-y-6 pb-2',
  // 2. Largura máxima e ajustes responsivos
  'xs:px-5 xs:py-3 xs:space-y-3 w-full max-w-full overflow-visible',
].join(' ')

// Cartão de preview (aparência → layout)
const DIALOG_PREVIEW_CARD = [
  // 1. Aparência visual (background, borda, sombra)
  'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-sm',
  // 2. Layout e responsividade
  'rounded-lg p-5 relative w-full max-w-full xs:p-4 xs:rounded-md overflow-visible',
].join(' ')

// Seções de formulário (layout  overflow corrigido)
const DIALOG_FORM_SECTION = [
  // 1. Layout vertical
  'space-y-4',
  // 2. Override para evitar corte lateral imposto pelo estilo global de <section>
  'overflow-visible',
].join(' ')

// Cabeçalho do preview (layout/alinhamento → espaçamento)
const DIALOG_PREVIEW_HEADER = [
  // 1. Layout e alinhamento
  'flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between',
  // 2. Espaçamento responsivo
  'gap-2 sm:gap-3 mb-4 sm:mb-3',
].join(' ')

// Agrupamento de ações do preview (layout → responsividade)
const DIALOG_PREVIEW_ACTIONS = [
  // 1. Layout e distribuição
  'flex items-center justify-center sm:justify-end gap-2 sm:gap-2 flex-wrap',
  // 2. Ajustes responsivos
  'w-full sm:w-auto mt-1 sm:mt-0',
].join(' ')

// Badge do preview (layout/tipografia → efeitos → responsividade)
const DIALOG_PREVIEW_BADGE = [
  // 1. Layout e tipografia
  'text-xs inline-flex items-center gap-2 font-medium px-4 py-2 rounded-xl border-0 max-w-full',
  // 2. Aparência e efeitos
  'transition-all duration-300 shadow-[4px_8px_18px_2px_rgba(0,0,0,0.18)] hover:shadow-[8px_12px_20px_2px_rgba(0,0,0,0.22)] hover:scale-[1.07]',
  // 3. Ajustes responsivos
  'xs:text-xs xs:px-4 xs:py-2 xs:rounded-lg xs:gap-1.5',
].join(' ')

// Rodapé do dialog (layout/spacing → responsividade)
const DIALOG_FOOTER = [
  // 1. Espaçamento e layout
  'p-6 border-t bg-gray-50 rounded-b-2xl flex-shrink-0',
  // 2. Responsividade e largura
  'w-full max-w-full xs:p-3',
].join(' ')

interface DialogStateUpdater {
  onStateChange: (..._args: [key: string, isOpen: boolean]) => void
}

interface CategoryDetails {
  name: string
  description: string
}

type CategoryDialogMode = 'create' | 'edit'

const SAMPLE_CATEGORY: CategoryDetails = {
  name: 'Terraplenagem',
  description: 'Trabalho em solo.',
}

const EMPTY_CATEGORY: CategoryDetails = {
  name: '',
  description: '',
}

const RESET_ANIMATION_DURATION = 600

// Icon mapping for category showcase
const CATEGORY_ICONS: Record<string, ComponentType<CustomIconProps>> = {
  construction: Construction,
  building: Building,
  anchor: Anchor,
  drill: Drill,
  hammer: Hammer,
  hardhat: HardHat,
  tree: TreePine,
  truck: Truck,
  wrench: Wrench,
  tag: TagIcon,
}

// Default design values
const DEFAULT_DESIGN = {
  backgroundColor: '#3b82f6',
  fontColor: '#ffffff',
  iconColor: '#ffffff',
  icon: 'tag',
}

const CATEGORY_PREVIEW_TABS: Array<Pick<TabConfig, 'value' | 'label'>> = [
  { value: 'phases', label: 'Fases da obra' },
  { value: 'types', label: 'Tipo de trabalho' },
]

function buildPreviewTabs(
  categoryName: string,
  categoryIcon: string,
  design: typeof DEFAULT_DESIGN
): TabConfig[] {
  const resolvedName =
    categoryName.trim().length > 0 ? categoryName : 'Categoria sem nome'
  const BaseIcon = CATEGORY_ICONS[categoryIcon] || TagIcon

  const PreviewIcon: ComponentType<CustomIconProps> = (props) => (
    <BaseIcon
      {...props}
      color={design.iconColor || props.color || 'currentColor'}
    />
  )

  return CATEGORY_PREVIEW_TABS.map((tab) => ({
    ...tab,
    categories: [
      {
        id: `${tab.value}-preview`,
        name: resolvedName,
        icon: PreviewIcon,
      },
    ],
  }))
}

function CategoryShowcasePreview({
  categoryName,
  categoryIcon,
  design,
}: {
  categoryName: string
  categoryIcon: string
  design: typeof DEFAULT_DESIGN
}) {
  const previewTabs = useMemo(
    () => buildPreviewTabs(categoryName, categoryIcon, design),
    [categoryName, categoryIcon, design]
  )

  return (
    <div className="w-full">
      <CategoryShowcase
        tabs={previewTabs}
        defaultTab="phases"
        gridCols={{ base: 1, sm: 1, md: 1, lg: 1 }}
        cardClassName="p-6 w-auto h-auto min-h-0"
        onCategoryClickAction={(category) =>
          console.log('Preview category clicked:', category.name)
        }
      />
    </div>
  )
}

function CustomizeDialog({ onStateChange }: DialogStateUpdater) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    onStateChange('customize', open)
  }, [open, onStateChange])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="-mx-1.5 -my-0.5 flex items-center justify-center rounded-sm px-1.5 py-0.5 text-base font-medium text-blue-800 transition hover:bg-blue-800/5 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-blue-800/10 dark:hover:bg-blue-800/15 dark:active:bg-blue-800/25">
        Customize
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={BACKDROP_CLASSES} />
        <Dialog.Popup className={SIMPLE_POPUP_CLASSES}>
          <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
            Customize notification
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-base text-gray-600">
            Review your settings here.
          </Dialog.Description>
          <div className="flex items-center justify-end gap-4">
            <Dialog.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function NotificationsDialog({ onStateChange }: DialogStateUpdater) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    onStateChange('notifications', open)
  }, [open, onStateChange])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
        View notifications
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={BACKDROP_CLASSES} />
        <Dialog.Popup className={SIMPLE_POPUP_CLASSES}>
          <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
            Notifications
          </Dialog.Title>
          <Dialog.Description className="mb-6 text-base text-gray-600">
            You are all caught up. Good job!
          </Dialog.Description>
          <div className="flex items-center justify-end gap-4">
            <div className="mr-auto flex">
              <CustomizeDialog onStateChange={onStateChange} />
            </div>
            <Dialog.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function DesignDialog({
  open,
  onOpenChange,
  onStateChange,
  design,
  onDesignChange,
}: {
  open: boolean
  onOpenChange: (_open: boolean) => void
  onStateChange: DialogStateUpdater['onStateChange']
  design: typeof DEFAULT_DESIGN
  onDesignChange: (_newDesign: typeof DEFAULT_DESIGN) => void
}) {
  const [localDesign, setLocalDesign] = useState(design)

  useEffect(() => {
    setLocalDesign(design)
  }, [design])

  useEffect(() => {
    onStateChange('design', open)
  }, [open, onStateChange])

  const handleSave = () => {
    onDesignChange(localDesign)
    onOpenChange(false)
  }

  const iconOptions = Object.keys(CATEGORY_ICONS)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={BACKDROP_CLASSES} />
        <Dialog.Popup className={SIMPLE_POPUP_CLASSES}>
          <Dialog.Title className="-mt-1.5 mb-1 text-lg font-medium">
            Personalizar Design
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-base text-gray-600">
            Customize cores e ícone da categoria.
          </Dialog.Description>

          {/* Preview */}
          <div className="mb-6 flex justify-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl shadow-md"
              style={{
                backgroundColor: localDesign.backgroundColor,
                color: localDesign.fontColor,
              }}
            >
              {(() => {
                const Icon = CATEGORY_ICONS[localDesign.icon] || TagIcon
                return <Icon size={20} color={localDesign.iconColor} />
              })()}
              <span className="font-medium text-sm">Preview</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Icon Selector */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Ícone
              </label>
              <div className="grid grid-cols-5 gap-2">
                {iconOptions.map((iconKey) => {
                  const Icon = CATEGORY_ICONS[iconKey]
                  if (!Icon) return null
                  return (
                    <button
                      key={iconKey}
                      type="button"
                      onClick={() =>
                        setLocalDesign({ ...localDesign, icon: iconKey })
                      }
                      className={cn(
                        'p-2 rounded-lg border-2 transition-all',
                        localDesign.icon === iconKey
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <Icon size={20} />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Color Inputs */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Cor de Fundo
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={localDesign.backgroundColor}
                  onChange={(e) =>
                    setLocalDesign({
                      ...localDesign,
                      backgroundColor: e.target.value,
                    })
                  }
                  className="h-10 w-14 cursor-pointer rounded border border-gray-200"
                />
                <input
                  type="text"
                  value={localDesign.backgroundColor}
                  onChange={(e) =>
                    setLocalDesign({
                      ...localDesign,
                      backgroundColor: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm"
                  placeholder="#3b82f6"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Cor do Texto
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={localDesign.fontColor}
                  onChange={(e) =>
                    setLocalDesign({
                      ...localDesign,
                      fontColor: e.target.value,
                    })
                  }
                  className="h-10 w-14 cursor-pointer rounded border border-gray-200"
                />
                <input
                  type="text"
                  value={localDesign.fontColor}
                  onChange={(e) =>
                    setLocalDesign({
                      ...localDesign,
                      fontColor: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm"
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Cor do Ícone
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={localDesign.iconColor}
                  onChange={(e) =>
                    setLocalDesign({
                      ...localDesign,
                      iconColor: e.target.value,
                    })
                  }
                  className="h-10 w-14 cursor-pointer rounded border border-gray-200"
                />
                <input
                  type="text"
                  value={localDesign.iconColor}
                  onChange={(e) =>
                    setLocalDesign({
                      ...localDesign,
                      iconColor: e.target.value,
                    })
                  }
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mt-6">
            <Dialog.Close className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none transition hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100">
              Cancelar
            </Dialog.Close>
            <button
              onClick={handleSave}
              className="flex h-10 items-center justify-center rounded-md bg-blue-600 px-3.5 text-base font-medium text-white select-none transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function CategoryDialogDemo({
  mode,
  onStateChange,
}: {
  mode: CategoryDialogMode
  onStateChange: DialogStateUpdater['onStateChange']
}) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [designDialogOpen, setDesignDialogOpen] = useState(false)
  const [resetAnimation, setResetAnimation] = useState(false)
  const resetTimeoutRef = useRef<number | null>(null)

  const resolvedInitialCategory = useMemo<CategoryDetails>(() => {
    return mode === 'edit' ? SAMPLE_CATEGORY : EMPTY_CATEGORY
  }, [mode])

  const [category, setCategory] = useState<CategoryDetails>(
    resolvedInitialCategory
  )

  const resolvedInitialDesign = useMemo(() => {
    return mode === 'edit' ? DEFAULT_DESIGN : DEFAULT_DESIGN
  }, [mode])

  const [design, setDesign] = useState(resolvedInitialDesign)

  useEffect(() => {
    setCategory(resolvedInitialCategory)
    setDesign(resolvedInitialDesign)
  }, [resolvedInitialCategory, resolvedInitialDesign])

  const key = mode === 'edit' ? 'category-edit' : 'category-create'

  useEffect(() => {
    onStateChange(key, open)
  }, [key, onStateChange, open])

  const title = mode === 'edit' ? 'Editar Categoria' : 'Nova Categoria'
  const primaryLabel =
    mode === 'edit' ? 'Atualizar Categoria' : 'Criar Categoria'
  const triggerLabel = mode === 'edit' ? 'Editar Categoria' : 'Nova Categoria'

  const previewName =
    category.name.trim().length > 0 ? category.name : 'Categoria sem nome'
  const previewDescription =
    category.description.trim().length > 0
      ? category.description
      : 'Adicione uma descrição para destacar esta categoria.'

  const canSubmit = category.name.trim().length > 0 && !isSubmitting

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  const handleReset = () => {
    setCategory(mode === 'edit' ? resolvedInitialCategory : EMPTY_CATEGORY)
    setDesign(mode === 'edit' ? resolvedInitialDesign : DEFAULT_DESIGN)
    setResetAnimation(true)
    resetTimeoutRef.current = window.setTimeout(() => {
      setResetAnimation(false)
    }, RESET_ANIMATION_DURATION)
  }

  const handleSubmit = async () => {
    if (!canSubmit) return
    try {
      setIsSubmitting(true)
      // Simula processamento enquanto ainda estamos prototipando no playground
      await new Promise((resolve) => setTimeout(resolve, 600))
      setOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button variant="default" className="gap-2" onClick={() => setOpen(true)}>
        {mode === 'edit' ? (
          <Pencil className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        {triggerLabel}
      </Button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className={BACKDROP_CLASSES} />
          <Dialog.Popup className={DIALOG_POPUP}>
            <div className={DIALOG_CONTENT}>
              <div data-dialog-section="header" className={DIALOG_HEADER}>
                <div className={DIALOG_HEADER_ICON}>
                  <TagIcon className="h-4 w-4" />
                </div>
                <Dialog.Title className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  {title}
                </Dialog.Title>
                <Dialog.Close
                  className={DIALOG_CLOSE_BUTTON}
                  aria-label="Fechar dialog"
                >
                  <X className="h-3 w-3" />
                </Dialog.Close>
              </div>

              <div className={DIALOG_SCROLL_WRAPPER}>
                <div
                  className="h-full w-full overflow-y-auto overflow-x-hidden"
                  style={{ scrollbarGutter: 'stable' }}
                >
                  <div className={DIALOG_SCROLL_CONTENT}>
                    <section className={DIALOG_PREVIEW_CARD}>
                      <div className={DIALOG_PREVIEW_HEADER}>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            Preview da Categoria
                          </p>
                          <span className="text-xs text-slate-500">
                            Como esta categoria aparece nos cards públicos
                          </span>
                        </div>
                        <div className={DIALOG_PREVIEW_ACTIONS}>
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => setDesignDialogOpen(true)}
                              className="duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-orange-600 inline-flex bg-white items-center justify-center gap-2 whitespace-nowrap h-8 px-3 text-xs font-medium rounded-lg border text-slate-900 shadow-md transition-all hover:bg-white hover:shadow-lg hover:scale-105 group xs:h-9 xs:px-4 xs:w-full sm:w-auto"
                              aria-label="Editar visual"
                            >
                              <Pencil className="h-4 w-4 group-hover:text-orange-600 transition-colors duration-200" />
                              <span className="group-hover:text-orange-600 transition-colors duration-200">
                                Editar
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={handleReset}
                              className="duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-orange-600 inline-flex bg-white items-center justify-center gap-2 whitespace-nowrap h-8 px-3 text-xs font-medium rounded-lg border text-slate-900 shadow-md transition-all hover:bg-white hover:shadow-lg hover:scale-105 group xs:h-9 xs:px-4 xs:w-full sm:w-auto"
                              aria-label={
                                mode === 'edit'
                                  ? 'Resetar visual'
                                  : 'Limpar campos'
                              }
                            >
                              <RotateCcw
                                className="h-4 w-4 group-hover:text-orange-600 transition-colors duration-200"
                                style={
                                  resetAnimation
                                    ? {
                                        animation:
                                          'spin 0.6s ease-in-out reverse',
                                      }
                                    : undefined
                                }
                              />
                              <span className="group-hover:text-orange-600 transition-colors duration-200">
                                Resetar
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* CategoryShowcase Preview */}
                      <div className="mt-6 w-full">
                        <CategoryShowcasePreview
                          categoryName={category.name || 'Categoria sem nome'}
                          categoryIcon={design.icon}
                          design={design}
                        />
                      </div>

                      <div className="mt-10 flex flex-col items-center gap-4">
                        <div
                          className={DIALOG_PREVIEW_BADGE}
                          style={{
                            backgroundColor: design.backgroundColor,
                            color: design.fontColor,
                          }}
                        >
                          <span className="flex-shrink-0">
                            {design.icon ? (
                              (() => {
                                const Icon =
                                  CATEGORY_ICONS[design.icon] || TagIcon
                                return (
                                  <Icon
                                    className="h-4 w-4"
                                    color={design.iconColor}
                                  />
                                )
                              })()
                            ) : (
                              <div
                                className="h-4 w-4 rounded"
                                style={{ backgroundColor: design.iconColor }}
                              />
                            )}
                          </span>
                          <span className="truncate font-semibold text-sm min-w-0">
                            {previewName}
                          </span>
                        </div>
                        <p className="text-xs italic text-slate-500">
                          {previewDescription}
                        </p>
                      </div>
                    </section>

                    <section className={DIALOG_FORM_SECTION}>
                      <div className="space-y-2">
                        <label
                          htmlFor={`category-name-${mode}`}
                          className="text-sm font-semibold text-slate-700"
                        >
                          Nome da Categoria *
                        </label>
                        <Input
                          id={`category-name-${mode}`}
                          value={category.name}
                          onChange={(event) =>
                            setCategory((prev) => ({
                              ...prev,
                              name: event.target.value,
                            }))
                          }
                          maxLength={50}
                          placeholder="Ex.: Terraplenagem"
                        />
                        <span className="text-xs text-slate-500">
                          {category.name.length}/50 caracteres
                        </span>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor={`category-description-${mode}`}
                          className="text-sm font-semibold text-slate-700"
                        >
                          Descrição (Opcional)
                        </label>
                        <Textarea
                          id={`category-description-${mode}`}
                          value={category.description}
                          onChange={(event) =>
                            setCategory((prev) => ({
                              ...prev,
                              description: event.target.value,
                            }))
                          }
                          maxLength={200}
                          className="min-h-[110px]"
                          placeholder="Descreva onde essa categoria é utilizada."
                        />
                        <span className="text-xs text-slate-500">
                          {category.description.length}/200 caracteres
                        </span>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              <div data-dialog-section="footer" className={DIALOG_FOOTER}>
                <div className="flex gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-11 px-4 text-sm font-medium rounded-lg border border-slate-200 bg-transparent text-slate-900 shadow-md transition-all hover:bg-slate-50 hover:text-orange-600 hover:scale-105 flex-1"
                  >
                    <X className="h-4 w-4" />
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap h-11 px-4 text-sm font-medium rounded-lg border-0 bg-slate-900 text-white shadow-md transition-all hover:bg-slate-800 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none flex-1"
                  >
                    <Plus className="h-4 w-4" />
                    {isSubmitting ? 'Salvando...' : primaryLabel}
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>

      <DesignDialog
        open={designDialogOpen}
        onOpenChange={setDesignDialogOpen}
        onStateChange={onStateChange}
        design={design}
        onDesignChange={setDesign}
      />
    </>
  )
}

export default function PlaygroundPage() {
  const [dialogStates, setDialogStates] = useState<Record<string, boolean>>({})

  const handleStateChange = (key: string, isOpen: boolean) => {
    setDialogStates((prev) => {
      if (prev[key] === isOpen) return prev
      return { ...prev, [key]: isOpen }
    })
  }

  useEffect(() => {
    const anyOpen = Object.values(dialogStates).some(Boolean)
    const targets = [document.documentElement, document.body]
    targets.forEach((target) => {
      if (!target) return
      if (anyOpen) {
        target.classList.add('overflow-hidden')
      } else {
        target.classList.remove('overflow-hidden')
      }
    })

    return () => {
      targets.forEach((target) => target?.classList.remove('overflow-hidden'))
    }
  }, [dialogStates])

  return (
    <main className="min-h-screen bg-slate-950/5 px-4 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            Exemplo Base — Nested Dialog
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Replica fielmente o exemplo do Base UI, mantendo o comportamento de
            nested dialogs e servindo como referência mínima de estilos.
          </p>
          <div className="mt-6 flex justify-center">
            <NotificationsDialog onStateChange={handleStateChange} />
          </div>
        </section>

        <section className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            Fluxo — Criar/Editar Categoria
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Versão real do fluxo administrativo com preview, campos e footer
            padronizado. Edite aqui e, quando estiver pronto, mova o código para
            a página definitiva.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <CategoryDialogDemo
              mode="create"
              onStateChange={handleStateChange}
            />
            <CategoryDialogDemo mode="edit" onStateChange={handleStateChange} />
          </div>
        </section>
      </div>
    </main>
  )
}
