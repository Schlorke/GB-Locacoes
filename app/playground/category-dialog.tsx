'use client'

import type { TabConfig } from '@/components/category-showcase'
import { CategoryShowcase } from '@/components/category-showcase'
import { IconCustomizationBlock } from '@/components/dialogs/icon-customization-block'
import {
  CUSTOM_ICON_GROUPS,
  EMOJI_GROUPS,
  ICON_LIBRARY_FILTERS,
  ICON_PICKER_TABS,
  LUCIDE_ICON_GROUPS,
  type IconPickerTab,
} from '@/components/dialogs/icon-customization-data'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  CATEGORY_PREVIEW_TABS,
  DEFAULT_CUSTOM_ICON,
  DEFAULT_DESIGN,
  DEFAULT_ICON,
  MAX_SVG_FILE_SIZE_KB,
  cloneDesign,
  isValidSvgFile,
  isValidSvgUrl,
  renderCategoryIcon,
  sanitizeSvg,
  svgToDataUrl,
  type CategoryDesign,
  type CategoryDetails,
  type CategoryDialogMode,
  type CategoryPlacement,
  type CustomIconSource,
} from '@/lib/category-design'
import { isCustomIcon, type AllIconNames } from '@/lib/constants/all-icons'
import { cn } from '@/lib/utils'
import {
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
  type ReactNode,
} from 'react'

import { type CustomIconProps } from '@/components/icons/custom'
import {
  buildIconSearchIndex,
  formatIconLabel,
  normalizeIconName,
} from '@/lib/icon-utils'

interface DialogStateUpdater {
  onStateChange: (..._args: [key: string, isOpen: boolean]) => void
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
  const [emojiSearchTerm, setEmojiSearchTerm] = useState('')
  const [activeIconTab, setActiveIconTab] = useState<IconPickerTab>('icons')
  const [iconLibraryFilter, setIconLibraryFilter] = useState<
    'lucide' | 'custom'
  >('lucide')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const emojiGroupRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const iconGroupRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    setLocalDesign(cloneDesign(design))
    setSvgUrlInput(
      design.customIcon.source === 'url' ? (design.customIcon.url ?? '') : ''
    )
    setUploadError(null)
    setUrlError(null)
    setIconSearchTerm('')
    setEmojiSearchTerm('')

    const nextTab: IconPickerTab =
      design.customIcon.source === 'emoji'
        ? 'emoji'
        : design.customIcon.source === 'upload' ||
            design.customIcon.source === 'url'
          ? 'custom'
          : 'icons'
    setActiveIconTab(nextTab)

    if (
      design.customIcon.source === 'upload' ||
      design.customIcon.source === 'url'
    ) {
      setIconLibraryFilter('lucide')
    }
  }, [design])

  const handleSourceChange = (source: CustomIconSource) => {
    setUploadError(null)
    setUrlError(null)

    if (source === 'none') {
      setLocalDesign((prev) => ({
        ...prev,
        customIcon: { ...DEFAULT_CUSTOM_ICON },
      }))
      setActiveIconTab('icons')
      return
    }

    if (source === 'upload') {
      setLocalDesign((prev) => ({
        ...prev,
        customIcon: { source: 'upload' },
      }))
      setSvgUrlInput('')
      setActiveIconTab('custom')
      return
    }

    if (source === 'url') {
      setLocalDesign((prev) => ({
        ...prev,
        customIcon: {
          source: 'url',
          url:
            prev.customIcon.source === 'url' ? prev.customIcon.url : undefined,
        },
      }))
      setActiveIconTab('custom')
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
      setActiveIconTab('custom')
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
    setActiveIconTab('custom')
  }

  const handleClearCustomIcon = () => {
    setLocalDesign((prev) => ({
      ...prev,
      customIcon: { ...DEFAULT_CUSTOM_ICON },
    }))
    setSvgUrlInput('')
    setUploadError(null)
    setUrlError(null)
    setActiveIconTab('icons')
    setIconLibraryFilter('lucide')
    setEmojiSearchTerm('')
    setIconSearchTerm('')
  }

  const handleEmojiSelect = (emoji: string) => {
    setLocalDesign((prev) => ({
      ...prev,
      customIcon: {
        source: 'emoji',
        emoji,
      },
    }))
    setActiveIconTab('emoji')
  }

  const handleIconSelect = (iconName: AllIconNames) => {
    const resolved = normalizeIconName(iconName) ?? iconName
    setLocalDesign((prev) => ({
      ...prev,
      icon: resolved,
      customIcon: { ...DEFAULT_CUSTOM_ICON },
    }))
    setActiveIconTab('icons')
  }

  const handleRemoveIcon = () => {
    setLocalDesign((prev) => ({
      ...prev,
      icon: DEFAULT_ICON,
      customIcon: { ...DEFAULT_CUSTOM_ICON },
    }))
    setSvgUrlInput('')
    setUploadError(null)
    setUrlError(null)
    setActiveIconTab('icons')
    setIconLibraryFilter('lucide')
    setEmojiSearchTerm('')
    setIconSearchTerm('')
  }

  const handleSave = () => {
    onDesignChange(cloneDesign(localDesign))
    setOpen(false)
  }

  const placementLabel =
    localDesign.placement === 'phases' ? 'Fases da obra' : 'Tipo de trabalho'

  const hasUploadedIcon =
    localDesign.customIcon.source === 'upload' ||
    localDesign.customIcon.source === 'url'

  const selectedEmoji =
    localDesign.customIcon.source === 'emoji'
      ? (localDesign.customIcon.emoji ?? null)
      : null

  const activeIconName = normalizeIconName(localDesign.icon) ?? localDesign.icon

  const resolvedEmojiGroups = useMemo(() => {
    const term = emojiSearchTerm.trim().toLowerCase()

    return EMOJI_GROUPS.map((group) => {
      const emojis = term
        ? group.emojis.filter((emoji) =>
            emoji.toLowerCase().includes(term.toLowerCase())
          )
        : group.emojis
      return { ...group, emojis }
    }).filter((group) => group.emojis.length > 0)
  }, [emojiSearchTerm])

  const activeIconGroups = useMemo(() => {
    const term = iconSearchTerm.trim().toLowerCase()
    const baseGroups =
      iconLibraryFilter === 'lucide' ? LUCIDE_ICON_GROUPS : CUSTOM_ICON_GROUPS

    return baseGroups
      .map((group) => {
        const icons = group.icons
          .map(
            (iconName) =>
              normalizeIconName(iconName) ??
              (isCustomIcon(iconName) ? (iconName as AllIconNames) : null)
          )
          .filter((iconName): iconName is AllIconNames => Boolean(iconName))
          .filter((iconName) =>
            term ? buildIconSearchIndex(iconName).includes(term) : true
          )
        return { ...group, icons }
      })
      .filter((group) => group.icons.length > 0)
  }, [iconLibraryFilter, iconSearchTerm])

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
                    <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
                      <h3 className="text-sm font-semibold text-slate-800">
                        Cores
                      </h3>
                      <div className="grid grid-cols-3 gap-3 sm:gap-4">
                        <div className="flex flex-col items-center gap-1.5 text-center">
                          <label className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                            <span
                              className="absolute inset-1.5 shadow-inner"
                              style={{ backgroundColor: localDesign.iconColor }}
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
                          <span className="text-[11px] font-semibold text-slate-600">
                            Cor do ícone
                          </span>
                          <span className="text-[11px] uppercase tracking-wide text-slate-400">
                            {localDesign.iconColor.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex flex-col items-center gap-1.5 text-center">
                          <label className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                            <span
                              className="absolute inset-1.5 shadow-inner"
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
                          <span className="text-[11px] font-semibold text-slate-600">
                            Cor de fundo
                          </span>
                          <span className="text-[11px] uppercase tracking-wide text-slate-400">
                            {localDesign.backgroundColor.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex flex-col items-center gap-1.5 text-center">
                          <label className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                            <span
                              className="absolute inset-1.5 shadow-inner"
                              style={{ backgroundColor: localDesign.fontColor }}
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
                          <span className="text-[11px] font-semibold text-slate-600">
                            Cor da fonte
                          </span>
                          <span className="text-[11px] uppercase tracking-wide text-slate-400">
                            {localDesign.fontColor.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <IconCustomizationBlock
                      className="mt-6"
                      iconTabs={ICON_PICKER_TABS}
                      activeTab={activeIconTab}
                      onTabChange={setActiveIconTab}
                      onRemoveIcon={handleRemoveIcon}
                      emojiSearchTerm={emojiSearchTerm}
                      onEmojiSearchChange={setEmojiSearchTerm}
                      emojiGroups={resolvedEmojiGroups}
                      emojiGroupRefs={emojiGroupRefs}
                      onEmojiSelect={handleEmojiSelect}
                      selectedEmoji={selectedEmoji}
                      iconSearchTerm={iconSearchTerm}
                      onIconSearchChange={setIconSearchTerm}
                      iconGroups={activeIconGroups}
                      iconGroupRefs={iconGroupRefs}
                      iconLibraryFilter={iconLibraryFilter}
                      onIconLibraryFilterChange={setIconLibraryFilter}
                      iconLibraryFilters={ICON_LIBRARY_FILTERS}
                      design={localDesign}
                      activeIconName={activeIconName}
                      onIconSelect={handleIconSelect}
                      onSourceChange={handleSourceChange}
                      fileInputRef={fileInputRef}
                      isProcessingUpload={isProcessingUpload}
                      svgUrlInput={svgUrlInput}
                      onSvgUrlInputChange={setSvgUrlInput}
                      onFileInputChange={handleFileInputChange}
                      uploadError={uploadError}
                      onUrlApply={handleUrlApply}
                      urlError={urlError}
                      hasUploadedIcon={hasUploadedIcon}
                      onClearCustomIcon={handleClearCustomIcon}
                      renderCategoryIcon={renderCategoryIcon}
                      maxSvgFileSizeKb={MAX_SVG_FILE_SIZE_KB}
                      formatIconLabel={formatIconLabel}
                      defaultIconName={DEFAULT_ICON}
                    />
                  </section>
                </Dialog.BodyContent>
              </Dialog.BodyViewport>
            </Dialog.Body>

            <Dialog.Footer data-dialog-section="footer">
              <div className="flex gap-4 w-full xs:gap-2 flex-wrap">
                <Dialog.Close className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-orange-600 hover:scale-105 hover:shadow-lg px-4 py-2 flex-1 h-11 xs:h-10 rounded-lg border border-slate-200 hover:bg-slate-50 bg-transparent shadow-md xs:text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                  <X className="w-4 h-4 mr-2" aria-hidden="true" />
                  Cancelar
                </Dialog.Close>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isProcessingUpload}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm xs:text-xs font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2 bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 shadow-md hover:shadow-lg transition-all duration-300 h-11 xs:h-10 px-4 flex-1"
                >
                  <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
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
                          <div className="flex flex-wrap justify-center items-center gap-2 lg:flex-col lg:items-stretch">
                            <DesignDialog
                              triggerClassName={cn(
                                buttonVariants({
                                  variant: 'outline',
                                  size: 'compact',
                                }),
                                'group rounded-lg text-slate-900 bg-white  min-w-[140px] lg:w-full'
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
                                'group rounded-lg text-slate-900 bg-white min-w-[140px] lg:w-full'
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
                <div className="flex gap-4 w-full xs:gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-orange-600 hover:scale-105 hover:shadow-lg px-4 py-2 flex-1 h-11 xs:h-10 rounded-lg border border-slate-200 hover:bg-slate-50 bg-transparent shadow-md xs:text-sm text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    <X className="w-4 h-4 mr-2" aria-hidden="true" />
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm xs:text-xs font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 py-2 bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 shadow-md hover:shadow-lg transition-all duration-300 h-11 xs:h-10 px-4 flex-1"
                  >
                    {isSubmitting ? (
                      <Loader2
                        className="w-4 h-4 mr-2 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                    )}
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
