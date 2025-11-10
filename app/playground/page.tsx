'use client'

import {
  CategoryShowcase,
  type TabConfig,
} from '@/components/category-showcase'
import { Dialog } from '@base-ui-components/react/dialog'
import {
  Anchor,
  Building,
  Construction,
  Drill,
  Hammer,
  HardHat,
  Loader2,
  Pencil,
  Plus,
  RotateCcw,
  Tag as TagIcon,
  TreePine,
  Truck,
  Wrench,
  X,
} from 'lucide-react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from 'react'

import type { CustomIconProps } from '@/components/icons/custom'
import { Button, buttonVariants } from '@/components/ui/button'
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
  'fixed left-1/2 top-[calc(50%+1.25rem*var(--nested-dialogs))] z-[9999] -mt-8',
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
  // 8. Ajuste manual quando um dialog filho estiver aberto (controlado via data attribute custom)
  '-data-[nested-parent]:translate-y-[0.85rem] data-[nested-parent]:scale-[0.985]',
].join(' ')

const DESIGN_DIALOG_POPUP = DIALOG_POPUP

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

type CategoryPlacement = 'phases' | 'types'

type CustomIconSource = 'none' | 'upload' | 'url'

type CustomIconConfig = {
  source: CustomIconSource
  svgContent?: string
  dataUrl?: string
  fileName?: string
  url?: string
}

type CategoryDesign = {
  backgroundColor: string
  fontColor: string
  iconColor: string
  icon: string
  customIcon: CustomIconConfig
  placement: CategoryPlacement
}

const DEFAULT_CUSTOM_ICON: CustomIconConfig = {
  source: 'none',
}

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
const DEFAULT_DESIGN: CategoryDesign = {
  backgroundColor: '#3b82f6',
  fontColor: '#ffffff',
  iconColor: '#ffffff',
  icon: 'tag',
  customIcon: { ...DEFAULT_CUSTOM_ICON },
  placement: 'types',
}

const MAX_SVG_FILE_SIZE_KB = 64

function cloneDesign(design: CategoryDesign): CategoryDesign {
  return {
    ...design,
    customIcon: { ...design.customIcon },
  }
}

function sanitizeSvg(raw: string): string | null {
  if (!raw) return null

  const trimmed = raw.trim()
  const svgIndex = trimmed.toLowerCase().indexOf('<svg')

  if (svgIndex === -1) {
    return null
  }

  const normalized = trimmed.slice(svgIndex)
  const withoutScript = normalized.replace(
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    ''
  )
  const withoutForeignObject = withoutScript.replace(
    /<foreignObject[\s\S]*?<\/foreignObject>/gi,
    ''
  )
  const withoutEvents = withoutForeignObject
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/xlink:href="javascript:[^"]*"/gi, '')
    .replace(/href="javascript:[^"]*"/gi, '')

  return withoutEvents
}

function svgToDataUrl(svg: string): string {
  if (!svg) return ''
  if (typeof window === 'undefined' || typeof window.btoa !== 'function') {
    return ''
  }

  const utf8Svg = encodeURIComponent(svg).replace(
    /%([0-9A-F]{2})/g,
    (_match, hex) => String.fromCharCode(Number.parseInt(hex, 16))
  )

  return `data:image/svg+xml;base64,${window.btoa(utf8Svg)}`
}

function isValidSvgFile(file: File) {
  const isSvg =
    file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')
  const isUnderLimit = file.size <= MAX_SVG_FILE_SIZE_KB * 1024
  return isSvg && isUnderLimit
}

function isValidSvgUrl(value: string) {
  try {
    const parsed = new URL(value)
    const isHttp = parsed.protocol === 'https:' || parsed.protocol === 'http:'
    const endsWithSvg = parsed.pathname.toLowerCase().endsWith('.svg')
    return isHttp && endsWithSvg
  } catch (_error) {
    return false
  }
}

type RenderIconOptions = {
  size?: number
  className?: string
  color?: string
}

function renderCategoryIcon(
  design: CategoryDesign,
  { size = 28, className, color }: RenderIconOptions = {}
): ReactElement {
  const { customIcon } = design

  if (customIcon.source === 'upload' && customIcon.dataUrl) {
    return (
      <img
        src={customIcon.dataUrl}
        alt=""
        className={cn('h-full w-full object-contain', className)}
        style={{ width: size, height: size }}
      />
    )
  }

  if (customIcon.source === 'url' && customIcon.url) {
    return (
      <img
        src={customIcon.url}
        alt=""
        className={cn('h-full w-full object-contain', className)}
        style={{ width: size, height: size }}
      />
    )
  }

  const Icon = CATEGORY_ICONS[design.icon] || TagIcon

  return (
    <Icon size={size} color={color ?? design.iconColor} className={className} />
  )
}

const CATEGORY_PREVIEW_TABS: Array<Pick<TabConfig, 'value' | 'label'>> = [
  { value: 'phases', label: 'Fases da obra' },
  { value: 'types', label: 'Tipo de trabalho' },
]

function buildCategoryPreviewIcon(
  design: CategoryDesign
): ComponentType<CustomIconProps> {
  const PreviewIcon: ComponentType<CustomIconProps> = ({
    size,
    className,
    color,
  }) =>
    renderCategoryIcon(design, {
      size,
      className,
      color: color ?? design.iconColor ?? 'currentColor',
    })
  PreviewIcon.displayName = 'CategoryPreviewIcon'
  return PreviewIcon
}

function buildPreviewTabs(
  categoryName: string,
  design: CategoryDesign
): TabConfig[] {
  const resolvedName =
    categoryName.trim().length > 0 ? categoryName : 'Categoria sem nome'
  const PreviewIcon = buildCategoryPreviewIcon(design)

  return CATEGORY_PREVIEW_TABS.map((tab) => {
    const shouldInclude = tab.value === design.placement

    return {
      ...tab,
      categories: shouldInclude
        ? [
            {
              id: `${tab.value}-preview`,
              name: resolvedName,
              icon: PreviewIcon,
            },
          ]
        : [],
    }
  })
}

function CategoryShowcasePreview({
  categoryName,
  design,
  onPlacementChange,
  disablePlacementSync,
}: {
  categoryName: string
  design: CategoryDesign
  onPlacementChange?: (_placement: CategoryPlacement) => void
  disablePlacementSync?: boolean
}) {
  const previewTabs = useMemo(
    () => buildPreviewTabs(categoryName, design),
    [categoryName, design]
  )

  const handleTabChange = useCallback(
    (tabValue: string) => {
      if (
        !disablePlacementSync &&
        (tabValue === 'phases' || tabValue === 'types')
      ) {
        onPlacementChange?.(tabValue)
      }
    },
    [disablePlacementSync, onPlacementChange]
  )

  return (
    <div className="w-full">
      <CategoryShowcase
        tabs={previewTabs}
        defaultTab={design.placement}
        gridCols={{ base: 1, sm: 1, md: 1, lg: 1 }}
        cardClassName="p-6 w-auto h-auto min-h-0"
        onTabChangeAction={handleTabChange}
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
        <Dialog.Popup className={DESIGN_DIALOG_POPUP}>
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
  triggerClassName,
  triggerAriaLabel = 'Abrir dialog',
  triggerChildren,
  onOpenChange,
  onStateChange,
  design,
  onDesignChange,
  categoryName,
}: {
  triggerClassName?: string
  triggerAriaLabel?: string
  triggerChildren: ReactNode
  onOpenChange?: (_open: boolean) => void
  onStateChange: DialogStateUpdater['onStateChange']
  design: CategoryDesign
  onDesignChange: (_newDesign: CategoryDesign) => void
  categoryName: string
}) {
  const [open, setOpen] = useState(false)
  const [localDesign, setLocalDesign] = useState<CategoryDesign>(design)
  const [isProcessingUpload, setIsProcessingUpload] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [urlError, setUrlError] = useState<string | null>(null)
  const [svgUrlInput, setSvgUrlInput] = useState(
    design.customIcon.source === 'url' ? (design.customIcon.url ?? '') : ''
  )
  const [iconSearchTerm, setIconSearchTerm] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setLocalDesign(design)
    setSvgUrlInput(
      design.customIcon.source === 'url' ? (design.customIcon.url ?? '') : ''
    )
    setUploadError(null)
    setUrlError(null)
    setIconSearchTerm('')
  }, [design])

  const iconOptions = useMemo(() => Object.keys(CATEGORY_ICONS), [])
  const filteredIconOptions = useMemo(() => {
    const term = iconSearchTerm.trim().toLowerCase()
    if (!term) return iconOptions
    return iconOptions.filter((key) => key.toLowerCase().includes(term))
  }, [iconOptions, iconSearchTerm])

  const handleSourceChange = (source: CustomIconSource) => {
    setUploadError(null)
    setUrlError(null)

    setLocalDesign((prev) => {
      if (source === 'none') {
        return {
          ...prev,
          customIcon: { ...DEFAULT_CUSTOM_ICON },
        }
      }

      if (source === prev.customIcon.source) {
        return prev
      }

      if (source === 'upload') {
        return {
          ...prev,
          customIcon: { source: 'upload' },
        }
      }

      return {
        ...prev,
        customIcon: {
          source: 'url',
          url:
            prev.customIcon.source === 'url' ? prev.customIcon.url : undefined,
        },
      }
    })

    if (source !== 'url') {
      setSvgUrlInput('')
    }
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    if (!isValidSvgFile(file)) {
      setUploadError(
        `Selecione um arquivo SVG válido com até ${MAX_SVG_FILE_SIZE_KB}kb.`
      )
      return
    }

    setIsProcessingUpload(true)

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result

      if (typeof result !== 'string') {
        setUploadError('Não foi possível ler o arquivo selecionado.')
        setIsProcessingUpload(false)
        return
      }

      const sanitized = sanitizeSvg(result)

      if (!sanitized) {
        setUploadError(
          'Não foi possível validar este SVG. Remova scripts ou elementos externos e tente novamente.'
        )
        setIsProcessingUpload(false)
        return
      }

      const dataUrl = svgToDataUrl(sanitized)

      if (!dataUrl) {
        setUploadError('Não foi possível gerar a pré-visualização do arquivo.')
        setIsProcessingUpload(false)
        return
      }

      setLocalDesign((prev) => ({
        ...prev,
        customIcon: {
          source: 'upload',
          svgContent: sanitized,
          dataUrl,
          fileName: file.name,
        },
      }))

      setUploadError(null)
      setUrlError(null)
      setIsProcessingUpload(false)
    }
    reader.onerror = () => {
      setUploadError('Erro ao processar o arquivo SVG.')
      setIsProcessingUpload(false)
    }
    reader.readAsText(file)
  }

  const handleUrlApply = () => {
    const value = svgUrlInput.trim()

    if (!value) {
      setUrlError('Informe uma URL de SVG válida.')
      return
    }

    if (!isValidSvgUrl(value)) {
      setUrlError('Use uma URL https:// que termine em .svg.')
      return
    }

    setLocalDesign((prev) => ({
      ...prev,
      customIcon: {
        source: 'url',
        url: value,
      },
    }))

    setUploadError(null)
    setUrlError(null)
  }

  const handleClearCustomIcon = () => {
    setLocalDesign((prev) => ({
      ...prev,
      customIcon: { ...DEFAULT_CUSTOM_ICON },
    }))
    setSvgUrlInput('')
    setUploadError(null)
    setUrlError(null)
  }

  const handleSave = () => {
    onDesignChange(cloneDesign(localDesign))
    setOpen(false)
  }

  const placementLabel =
    localDesign.placement === 'phases' ? 'Fases da obra' : 'Tipo de trabalho'

  const isCustomIconActive = localDesign.customIcon.source !== 'none'

  const resolvedCategoryName =
    categoryName.trim().length > 0 ? categoryName : 'Categoria sem nome'

  useEffect(() => {
    onStateChange('design', open)
    onOpenChange?.(open)
  }, [open, onOpenChange, onStateChange])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className={triggerClassName}
        aria-label={triggerAriaLabel}
      >
        {triggerChildren}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={BACKDROP_CLASSES} />
        <Dialog.Popup className={DESIGN_DIALOG_POPUP}>
          <div className={DIALOG_CONTENT}>
            <div data-dialog-section="header" className={DIALOG_HEADER}>
              <div className={DIALOG_HEADER_ICON}>
                <Pencil className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-1">
                <Dialog.Title className="text-xl font-semibold text-gray-800">
                  Personalizar visual
                </Dialog.Title>
              </div>
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
                  <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-slate-900 shadow-sm">
                    <div className="flex flex-col items-center justify-center gap-2 text-center text-xs uppercase tracking-wide text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left sm:gap-0">
                      <span>Preview do destaque</span>
                      <span className="max-w-[10rem] sm:max-w-none sm:text-right">
                        Aba atual:{' '}
                        <span className="block sm:inline">
                          {placementLabel}
                        </span>
                      </span>
                    </div>
                    <div className="mt-5 flex flex-col items-center gap-5">
                      <div className="group relative flex flex-col items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-lg transition-all duration-300 w-auto h-auto min-h-0">
                        <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 p-2.5 shadow-lg">
                          {renderCategoryIcon(localDesign, {
                            size: 32,
                            className: 'h-8 w-8 text-white',
                          })}
                        </span>
                        <span className="relative z-10 text-center text-xs font-semibold leading-tight text-white whitespace-normal break-words">
                          {resolvedCategoryName}
                        </span>
                      </div>

                      <div
                        className="inline-flex items-center gap-2 rounded-xl border-0 px-4 py-2 text-xs font-medium shadow-[4px_8px_18px_2px_rgba(0,0,0,0.18)]"
                        style={{
                          backgroundColor: localDesign.backgroundColor,
                          color: localDesign.fontColor,
                        }}
                      >
                        <span className="flex-shrink-0">
                          {renderCategoryIcon(localDesign, {
                            size: 16,
                            className: 'h-4 w-4',
                            color: localDesign.iconColor,
                          })}
                        </span>
                        <span className="truncate">{resolvedCategoryName}</span>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-5 shadow-sm">
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-semibold text-slate-800">
                          Ícone personalizado para o cartão principal
                        </h3>
                        <p className="text-xs text-slate-500">
                          As cores do botão permanecem fixas. Use um SVG
                          customizado para representar melhor a categoria.
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {[
                          { value: 'none', label: 'Padrão' },
                          { value: 'upload', label: 'Upload' },
                          { value: 'url', label: 'URL externa' },
                        ].map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant="outline"
                            size="compact"
                            onClick={() =>
                              handleSourceChange(
                                option.value as CustomIconSource
                              )
                            }
                            className={cn(
                              'rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm transition-all duration-200 hover:from-white hover:to-white hover:shadow-md disabled:bg-gradient-to-br disabled:from-slate-50 disabled:to-slate-100 disabled:text-slate-500',
                              localDesign.customIcon.source === option.value
                                ? 'text-orange-600 font-semibold bg-white from-white to-white'
                                : 'text-slate-600 hover:text-orange-600'
                            )}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".svg,image/svg+xml"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />

                      {localDesign.customIcon.source === 'upload' && (
                        <div className="mt-4 space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isProcessingUpload}
                              className="h-9 border-dashed border-slate-300 text-sm font-medium text-slate-700 hover:border-orange-400 hover:text-orange-600"
                            >
                              Selecionar arquivo SVG
                            </Button>
                            {isProcessingUpload && (
                              <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                            )}
                            {localDesign.customIcon.fileName &&
                              !isProcessingUpload && (
                                <span className="truncate text-xs text-slate-500">
                                  {localDesign.customIcon.fileName}
                                </span>
                              )}
                          </div>
                          <p className="text-xs text-slate-500">
                            Formato SVG até {MAX_SVG_FILE_SIZE_KB}kb. Scripts e
                            elementos externos são removidos automaticamente.
                          </p>
                          {uploadError && (
                            <p className="text-xs font-medium text-red-500">
                              {uploadError}
                            </p>
                          )}
                        </div>
                      )}

                      {localDesign.customIcon.source === 'url' && (
                        <div className="mt-4 space-y-3">
                          <div className="flex gap-2">
                            <Input
                              value={svgUrlInput}
                              onChange={(event) =>
                                setSvgUrlInput(event.target.value)
                              }
                              placeholder="https://exemplo.com/icone.svg"
                              className="h-10 text-sm"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleUrlApply}
                              className="h-10 whitespace-nowrap border-slate-300 text-sm font-medium text-slate-700 hover:border-slate-400 hover:text-orange-600"
                            >
                              Aplicar
                            </Button>
                          </div>
                          <p className="text-xs text-slate-500">
                            Aceitamos apenas URLs HTTPS públicas que terminem em{' '}
                            <code>.svg</code>.
                          </p>
                          {urlError && (
                            <p className="text-xs font-medium text-red-500">
                              {urlError}
                            </p>
                          )}
                        </div>
                      )}

                      {isCustomIconActive && (
                        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white">
                              {renderCategoryIcon(localDesign, {
                                size: 28,
                                className: 'h-7 w-7 text-slate-700',
                              })}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-slate-700">
                                Pré-visualização
                              </span>
                              <span className="text-xs text-slate-500">
                                {localDesign.customIcon.source === 'upload'
                                  ? (localDesign.customIcon.fileName ??
                                    'SVG enviado')
                                  : localDesign.customIcon.url}
                              </span>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleClearCustomIcon}
                            className="h-9 border-slate-300 text-xs font-medium text-slate-600 hover:border-red-400 hover:text-red-600"
                          >
                            Remover ícone personalizado
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-5 shadow-sm">
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-slate-800">
                          Ícone
                        </h3>
                        <Input
                          value={iconSearchTerm}
                          onChange={(event) =>
                            setIconSearchTerm(event.target.value)
                          }
                          placeholder="Buscar ícone..."
                          className="h-10 text-sm"
                        />
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-inner">
                          <div className="grid max-h-48 grid-cols-5 gap-2 overflow-y-auto pr-1">
                            {filteredIconOptions.map((iconKey) => {
                              const IconComponent = CATEGORY_ICONS[iconKey]
                              if (!IconComponent) return null
                              const isActive = localDesign.icon === iconKey
                              return (
                                <button
                                  key={iconKey}
                                  type="button"
                                  onClick={() =>
                                    setLocalDesign((prev) => ({
                                      ...prev,
                                      icon: iconKey,
                                    }))
                                  }
                                  className={cn(
                                    'flex h-12 items-center justify-center rounded-lg border-2 transition-all duration-200',
                                    isActive
                                      ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm'
                                      : 'border-slate-200 hover:border-slate-300'
                                  )}
                                  title={iconKey}
                                >
                                  <IconComponent className="h-5 w-5" />
                                </button>
                              )
                            })}
                            {filteredIconOptions.length === 0 && (
                              <div className="col-span-5 flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white text-xs text-slate-500">
                                Nenhum ícone encontrado.
                              </div>
                            )}
                          </div>
                          <p className="mt-3 text-xs text-slate-500">
                            O ícone selecionado aparece como fallback sempre que
                            não houver um SVG personalizado aplicado.
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 space-y-3">
                        <h3 className="text-sm font-semibold text-slate-800">
                          Cores
                        </h3>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="flex flex-col items-center gap-2 text-center">
                            <label className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                              <span
                                className="absolute inset-[2px] rounded-xl shadow-inner"
                                style={{
                                  backgroundColor: localDesign.iconColor,
                                }}
                                aria-hidden="true"
                              />
                              <input
                                type="color"
                                value={localDesign.iconColor}
                                onChange={(event) =>
                                  setLocalDesign((prev) => ({
                                    ...prev,
                                    iconColor: event.target.value,
                                  }))
                                }
                                aria-label="Selecionar cor do ícone"
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                              />
                            </label>
                            <span className="text-xs font-semibold text-slate-600">
                              Cor do ícone
                            </span>
                            <span className="text-[11px] uppercase tracking-wide text-slate-400">
                              {localDesign.iconColor.toUpperCase()}
                            </span>
                          </div>

                          <div className="flex flex-col items-center gap-2 text-center">
                            <label className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                              <span
                                className="absolute inset-[2px] rounded-xl shadow-inner"
                                style={{
                                  backgroundColor: localDesign.backgroundColor,
                                }}
                                aria-hidden="true"
                              />
                              <input
                                type="color"
                                value={localDesign.backgroundColor}
                                onChange={(event) =>
                                  setLocalDesign((prev) => ({
                                    ...prev,
                                    backgroundColor: event.target.value,
                                  }))
                                }
                                aria-label="Selecionar cor de fundo"
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                              />
                            </label>
                            <span className="text-xs font-semibold text-slate-600">
                              Cor de fundo
                            </span>
                            <span className="text-[11px] uppercase tracking-wide text-slate-400">
                              {localDesign.backgroundColor.toUpperCase()}
                            </span>
                          </div>

                          <div className="flex flex-col items-center gap-2 text-center">
                            <label className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                              <span
                                className="absolute inset-[2px] rounded-xl shadow-inner"
                                style={{
                                  backgroundColor: localDesign.fontColor,
                                }}
                                aria-hidden="true"
                              />
                              <input
                                type="color"
                                value={localDesign.fontColor}
                                onChange={(event) =>
                                  setLocalDesign((prev) => ({
                                    ...prev,
                                    fontColor: event.target.value,
                                  }))
                                }
                                aria-label="Selecionar cor da fonte"
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                              />
                            </label>
                            <span className="text-xs font-semibold text-slate-600">
                              Cor da fonte
                            </span>
                            <span className="text-[11px] uppercase tracking-wide text-slate-400">
                              {localDesign.fontColor.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            <div data-dialog-section="footer" className={DIALOG_FOOTER}>
              <div className="flex gap-3 w-full">
                <Dialog.Close className="flex h-10 flex-1 items-center justify-center rounded-md border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100">
                  Cancelar
                </Dialog.Close>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isProcessingUpload}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-slate-900 px-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Salvar
                </button>
              </div>
            </div>
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
  const [resetAnimation, setResetAnimation] = useState(false)
  const [designDialogOpen, setDesignDialogOpen] = useState(false)
  const resetTimeoutRef = useRef<number | null>(null)

  const resolvedInitialCategory = useMemo<CategoryDetails>(() => {
    return mode === 'edit' ? SAMPLE_CATEGORY : EMPTY_CATEGORY
  }, [mode])

  const [category, setCategory] = useState<CategoryDetails>(
    resolvedInitialCategory
  )

  const resolvedInitialDesign = useMemo(() => {
    return cloneDesign(DEFAULT_DESIGN)
  }, [])

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
    setDesign(cloneDesign(DEFAULT_DESIGN))
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
          <Dialog.Popup
            className={DIALOG_POPUP}
            data-nested-parent={designDialogOpen ? '' : undefined}
          >
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
                          <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-stretch lg:flex-nowrap">
                            <DesignDialog
                              triggerClassName={cn(
                                buttonVariants({
                                  variant: 'outline',
                                  size: 'compact',
                                }),
                                'group rounded-lg text-slate-900 bg-white sm:w-auto'
                              )}
                              triggerAriaLabel="Editar visual"
                              triggerChildren={
                                <>
                                  <Pencil className="h-4 w-4 group-hover:text-orange-600 transition-colors duration-200" />
                                  <span className="group-hover:text-orange-600 transition-colors duration-200">
                                    Editar
                                  </span>
                                </>
                              }
                              onOpenChange={setDesignDialogOpen}
                              onStateChange={onStateChange}
                              design={design}
                              onDesignChange={setDesign}
                              categoryName={previewName}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="compact"
                              onClick={handleReset}
                              className={cn(
                                'group rounded-lg text-slate-900 bg-white sm:w-auto'
                              )}
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
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* CategoryShowcase Preview */}
                      <div className="mt-6 w-full">
                        <CategoryShowcasePreview
                          categoryName={previewName}
                          design={design}
                          onPlacementChange={(placement) =>
                            setDesign((prev) =>
                              prev.placement === placement
                                ? prev
                                : {
                                    ...prev,
                                    placement,
                                  }
                            )
                          }
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
                            {renderCategoryIcon(design, {
                              size: 16,
                              className: 'h-4 w-4',
                              color: design.iconColor,
                            })}
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
    </>
  )
}

export default function PlaygroundPage() {
  const [dialogStates, setDialogStates] = useState<Record<string, boolean>>({})

  const handleStateChange = useCallback(
    (key: string, isOpen: boolean) => {
      setDialogStates((prev) => {
        if (prev[key] === isOpen) return prev
        return { ...prev, [key]: isOpen }
      })
    },
    [setDialogStates]
  )

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
