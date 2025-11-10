'use client'

import {
  CategoryShowcase,
  type TabConfig,
} from '@/components/category-showcase'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { HybridTooltip } from '@/components/ui/HybridTooltip'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import {
  ALL_ICONS,
  ALL_AVAILABLE_ICONS,
  type AllIconNames,
  renderIcon as renderLibraryIcon,
} from '@/lib/constants/all-icons'
import { cn } from '@/lib/utils'
import {
  Info,
  Lightbulb,
  Loader2,
  Pencil,
  Plus,
  RotateCcw,
  Tag as TagIcon,
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

type CategoryDialogMode = 'create' | 'edit'

interface DialogStateUpdater {
  onStateChange: (..._args: [key: string, isOpen: boolean]) => void
}

interface CategoryDetails {
  name: string
  description: string
}

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
  icon: AllIconNames
  customIcon: CustomIconConfig
  placement: CategoryPlacement
}

const SAMPLE_CATEGORY: CategoryDetails = {
  name: 'Terraplenagem',
  description: 'Trabalho em solo.',
}

const EMPTY_CATEGORY: CategoryDetails = {
  name: '',
  description: '',
}

const RESET_ANIMATION_DURATION = 600
const MAX_SVG_FILE_SIZE_KB = 64

const DEFAULT_CUSTOM_ICON: CustomIconConfig = {
  source: 'none',
}

const DEFAULT_ICON: AllIconNames = 'Tag'

const LEGACY_ICON_MAP: Record<string, AllIconNames> = {
  construction: 'Construction',
  building: 'Building',
  anchor: 'Anchor',
  drill: 'Drill',
  hammer: 'Hammer',
  hardhat: 'HardHat',
  tree: 'TreePine',
  truck: 'Truck',
  wrench: 'Wrench',
  tag: 'Tag',
}

const ICON_REGISTRY = new Set<string>(Object.keys(ALL_ICONS))

function normalizeIconName(
  name: string | null | undefined
): AllIconNames | null {
  if (!name) return null

  if (ICON_REGISTRY.has(name)) {
    return name as AllIconNames
  }

  const legacyMatch = LEGACY_ICON_MAP[name.toLowerCase()]
  if (legacyMatch) {
    return legacyMatch
  }

  const pascal = name
    .replace(/[-_\s]+(.)/g, (_match, group: string) => group.toUpperCase())
    .replace(/^(.)/, (_match, group: string) => group.toUpperCase())

  if (ICON_REGISTRY.has(pascal)) {
    return pascal as AllIconNames
  }

  return null
}

function formatIconLabel(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function buildIconSearchIndex(name: string): string {
  const label = formatIconLabel(name)
  return `${name} ${label}`.toLowerCase()
}

const CATEGORY_PREVIEW_TABS: Array<Pick<TabConfig, 'value' | 'label'>> = [
  { value: 'phases', label: 'Fases da obra' },
  { value: 'types', label: 'Tipo de trabalho' },
]

const DEFAULT_DESIGN: CategoryDesign = {
  backgroundColor: '#3b82f6',
  fontColor: '#ffffff',
  iconColor: '#ffffff',
  icon: DEFAULT_ICON,
  customIcon: { ...DEFAULT_CUSTOM_ICON },
  placement: 'types',
}

const DIALOG_PREVIEW_CARD = [
  'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-sm',
  'rounded-lg p-5 relative w-full max-w-full xs:p-4 xs:rounded-md overflow-visible',
].join(' ')

const DESIGN_DIALOG_META = [
  'flex flex-col items-center justify-center gap-2 text-center text-xs uppercase tracking-wide text-slate-500',
  'sm:flex-row sm:items-center sm:justify-between sm:text-left sm:gap-0',
].join(' ')

const DIALOG_PREVIEW_HEADER = [
  'flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between',
  'gap-2 sm:gap-3 mb-4 sm:mb-3',
].join(' ')

const DIALOG_PREVIEW_ACTIONS = [
  'flex items-center justify-center sm:justify-end gap-2 sm:gap-2 flex-wrap',
  'w-full sm:w-auto mt-1 sm:mt-0',
].join(' ')

const DIALOG_PREVIEW_BADGE = [
  'text-xs inline-flex items-center gap-2 font-medium px-4 py-2 rounded-xl border-0 max-w-full',
  'transition-all duration-300 shadow-[4px_8px_18px_2px_rgba(0,0,0,0.18)] hover:shadow-[8px_12px_20px_2px_rgba(0,0,0,0.22)] hover:scale-[1.07]',
  'xs:text-xs xs:px-4 xs:py-2 xs:rounded-lg xs:gap-1.5',
].join(' ')

const DIALOG_FORM_SECTION = ['space-y-4', 'overflow-visible'].join(' ')

function cloneDesign(design: CategoryDesign): CategoryDesign {
  return {
    ...design,
    icon: normalizeIconName(design.icon) ?? DEFAULT_ICON,
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

  const normalizedIcon = normalizeIconName(design.icon) ?? DEFAULT_ICON
  const iconColor = color ?? design.iconColor ?? 'currentColor'
  const renderedIcon =
    renderLibraryIcon(normalizedIcon, size, iconColor, className) ??
    renderLibraryIcon(DEFAULT_ICON, size, iconColor, className)

  if (renderedIcon) {
    return renderedIcon
  }

  return (
    <TagIcon size={size} color={iconColor} className={className} aria-hidden />
  )
}

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
  const [localDesign, setLocalDesign] = useState<CategoryDesign>(() =>
    cloneDesign(design)
  )
  const [isProcessingUpload, setIsProcessingUpload] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [urlError, setUrlError] = useState<string | null>(null)
  const [svgUrlInput, setSvgUrlInput] = useState(
    design.customIcon.source === 'url' ? (design.customIcon.url ?? '') : ''
  )
  const [iconSearchTerm, setIconSearchTerm] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setLocalDesign(cloneDesign(design))
    setSvgUrlInput(
      design.customIcon.source === 'url' ? (design.customIcon.url ?? '') : ''
    )
    setUploadError(null)
    setUrlError(null)
    setIconSearchTerm('')
  }, [design])

  const iconOptions = useMemo<AllIconNames[]>(() => {
    const base = new Set<AllIconNames>(ALL_AVAILABLE_ICONS)
    const currentIcon = normalizeIconName(localDesign.icon)
    if (currentIcon) {
      base.add(currentIcon)
    }
    return Array.from(base)
  }, [localDesign.icon])

  const filteredIconOptions = useMemo(() => {
    const term = iconSearchTerm.trim().toLowerCase()
    if (!term) return iconOptions
    return iconOptions.filter((iconName) =>
      buildIconSearchIndex(iconName).includes(term)
    )
  }, [iconOptions, iconSearchTerm])

  const iconOptionButtons = filteredIconOptions.map((iconName) => {
    const isActive = localDesign.icon === iconName
    const label = formatIconLabel(iconName)
    const iconClassName =
      'h-5 w-5 transition-colors duration-200 group-data-[state=active]:text-orange-600'
    const renderedIcon = renderLibraryIcon(
      iconName,
      20,
      'currentColor',
      iconClassName
    ) ??
      renderLibraryIcon(DEFAULT_ICON, 20, 'currentColor', iconClassName) ?? (
        <TagIcon className={iconClassName} size={20} aria-hidden />
      )

    return (
      <button
        key={iconName}
        type="button"
        onClick={() =>
          setLocalDesign((prev) => ({
            ...prev,
            icon: iconName,
          }))
        }
        className={cn(
          'group flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-slate-600 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
          isActive
            ? 'border-orange-400/70 bg-orange-50 text-orange-600 shadow-md'
            : 'hover:text-orange-600'
        )}
        title={label}
        aria-pressed={isActive}
        data-state={isActive ? 'active' : undefined}
      >
        {renderedIcon}
      </button>
    )
  })
  const hasIconResults = iconOptionButtons.length > 0

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
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Content>
            <Dialog.Header data-dialog-section="header">
              <Dialog.HeaderIcon>
                <Pencil className="h-4 w-4" />
              </Dialog.HeaderIcon>
              <div className="flex flex-col gap-1">
                <Dialog.Title className="text-xl font-semibold text-gray-800">
                  Personalizar visual
                </Dialog.Title>
              </div>
              <Dialog.CloseButton aria-label="Fechar dialog">
                <X className="h-3 w-3" />
              </Dialog.CloseButton>
            </Dialog.Header>

            <Dialog.Body>
              <Dialog.BodyViewport style={{ scrollbarGutter: 'stable' }}>
                <Dialog.BodyContent>
                  <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-slate-900 shadow-sm">
                    <div className={DESIGN_DIALOG_META}>
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
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-semibold text-slate-800">
                            Ícone
                          </h3>
                          <HybridTooltip
                            content={
                              <div className="flex items-start gap-2 text-[13px] leading-snug">
                                <Lightbulb
                                  className="mt-[2px] h-4 w-4 flex-shrink-0 text-orange-400"
                                  aria-hidden
                                />
                                <span>
                                  O ícone selecionado aparece como fallback
                                  sempre que não houver um SVG personalizado
                                  aplicado.
                                </span>
                              </div>
                            }
                            side="top"
                            align="start"
                            className="z-[var(--layer-tooltip)]"
                          >
                            <button
                              type="button"
                              aria-label="Ajuda sobre seleção de ícone"
                              className="inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-400 transition-colors duration-200 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            >
                              <Info className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </HybridTooltip>
                        </div>
                        <Input
                          value={iconSearchTerm}
                          onChange={(event) =>
                            setIconSearchTerm(event.target.value)
                          }
                          placeholder="Buscar ícone..."
                          className="h-10 text-sm"
                        />
                        <ScrollArea
                          className="max-h-[13.5rem] w-full rounded-xl border border-slate-200/70 bg-white/70 p-2 shadow-inner"
                          type="always"
                        >
                          <div className="grid grid-cols-4 gap-2 pr-1 pb-1 sm:grid-cols-5 md:grid-cols-6">
                            {hasIconResults ? (
                              iconOptionButtons
                            ) : (
                              <div className="col-span-4 flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white text-xs text-slate-500 sm:col-span-5 md:col-span-6">
                                Nenhum ícone encontrado.
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-3">
                        <h3 className="text-sm font-semibold text-slate-800">
                          Cores
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="flex flex-col items-center gap-2 text-center">
                            <label className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                              <span
                                className="absolute inset-[2px] rounded-lg shadow-inner"
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
                            <label className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                              <span
                                className="absolute inset-[2px] rounded-lg shadow-inner"
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
                            <label className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                              <span
                                className="absolute inset-[2px] rounded-lg shadow-inner"
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
                </Dialog.BodyContent>
              </Dialog.BodyViewport>
            </Dialog.Body>

            <Dialog.Footer data-dialog-section="footer">
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
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function CategoryDialog({
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
          <Dialog.Backdrop />
          <Dialog.Popup
            variant="default"
            data-nested-parent={designDialogOpen ? '' : undefined}
          >
            <Dialog.Content>
              <Dialog.Header data-dialog-section="header">
                <Dialog.HeaderIcon>
                  <TagIcon className="h-4 w-4" />
                </Dialog.HeaderIcon>
                <Dialog.Title className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  {title}
                </Dialog.Title>
                <Dialog.CloseButton aria-label="Fechar dialog">
                  <X className="h-3 w-3" />
                </Dialog.CloseButton>
              </Dialog.Header>

              <Dialog.Body>
                <Dialog.BodyViewport style={{ scrollbarGutter: 'stable' }}>
                  <Dialog.BodyContent>
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
                          <div className="flex flex-nowrap items-center gap-2 lg:flex-col lg:items-stretch">
                            <DesignDialog
                              triggerClassName={cn(
                                buttonVariants({
                                  variant: 'outline',
                                  size: 'compact',
                                }),
                                'group rounded-lg text-slate-900 bg-white flex-1 min-w-[140px] lg:w-full'
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
                                'group rounded-lg text-slate-900 bg-white flex-1 min-w-[140px] lg:w-full'
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
                  </Dialog.BodyContent>
                </Dialog.BodyViewport>
              </Dialog.Body>

              <Dialog.Footer data-dialog-section="footer">
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
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export { CategoryDialog }
export type { CategoryDialogMode, DialogStateUpdater }
