'use client'

import type { TabConfig } from '@/components/category-showcase'
import { CategoryShowcase } from '@/components/category-showcase'
import { IconCustomizationBlock } from '@/components/dialogs/icon-customization-block'
import {
  ICON_PICKER_TABS,
  buildEmojiGroups,
  buildIconGroups,
  type IconPickerTab,
} from '@/components/dialogs/icon-customization-data'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { HoverActionMenu } from '@/components/ui/hover-action-menu'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
import type { AllIconNames } from '@/lib/constants/all-icons'
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
import { useEmojiRecents } from '@/hooks/use-emoji-recents'
import { useIconRecents } from '@/hooks/use-icon-recents'
import { useIsMobile } from '@/hooks/use-mobile'
import { toast } from '@/hooks/use-toast-sonner'
import { formatIconLabel, normalizeIconName } from '@/lib/icon-utils'

interface DialogStateUpdater {
  onStateChange: (..._args: [key: string, isOpen: boolean]) => void
}

const MAX_ICON_NAME_LENGTH = 50

const extractNameFromFile = (fileName: string): string => {
  const base = fileName.replace(/\.[^/.]+$/, '')
  return base.slice(0, MAX_ICON_NAME_LENGTH)
}

const extractNameFromUrl = (value: string): string => {
  try {
    const parsed = new URL(value)
    const segments = parsed.pathname.split('/').filter(Boolean)
    const candidate = segments.pop() ?? 'ícone personalizado'
    const decoded = decodeURIComponent(candidate.replace(/\.svg$/i, ''))
    const cleaned = decoded.trim() || 'ícone personalizado'
    return cleaned.slice(0, MAX_ICON_NAME_LENGTH)
  } catch (_error) {
    return 'ícone personalizado'
  }
}

type CategoryData = {
  id?: string
  name: string
  description: string
  design: CategoryDesign
}

const SAMPLE_CATEGORY_DETAILS: CategoryDetails = {
  name: 'Terraplenagem',
  description:
    'Preparação do terreno, nivelamento e compactação antes da concretagem.',
}

const EMPTY_CATEGORY_DETAILS: CategoryDetails = {
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

const DIALOG_PREVIEW_BADGE = [
  'text-xs inline-flex items-center gap-2 font-medium px-4 py-2 rounded-xl border-0 max-w-full',
  'transition-all duration-300 shadow-[4px_8px_18px_2px_rgba(0,0,0,0.18)] hover:shadow-[8px_12px_20px_2px_rgba(0,0,0,0.22)] hover:scale-[1.07]',
  'xs:text-xs xs:px-4 xs:py-2 xs:rounded-lg xs:gap-1.5',
].join(' ')

const DIALOG_FORM_SECTION = ['space-y-4', 'overflow-visible'].join(' ')

const ACTION_BUTTON_CLASSES =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-md hover:text-orange-600 hover:scale-105 hover:shadow-lg h-10 px-4 text-sm group rounded-lg text-slate-900 bg-white min-w-[140px] lg:w-full py-2'

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

// Constante para o seletor do wrapper do menu de ações
const MENU_WRAPPER_SELECTOR =
  '[class*="absolute"][class*="left-1/2"][class*="top-[3.5rem"]'

function CategoryShowcasePreview({
  categoryName,
  design,
  onPlacementChange,
  disablePlacementSync,
  className,
  onReset,
  onEdit,
  iconPopoverContent,
  onIconBoxRequest,
}: {
  categoryName: string
  design: CategoryDesign
  onPlacementChange?: (_placement: CategoryPlacement) => void
  disablePlacementSync?: boolean
  className?: string
  onReset?: () => void
  onEdit?: () => void
  iconPopoverContent?: React.ReactNode
  onIconBoxRequest?: () => void
}) {
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [isMenuHovered, setIsMenuHovered] = useState(false)
  const [resetAnimation, setResetAnimation] = useState(false)
  const cardAreaRef = useRef<HTMLDivElement>(null)
  const resetTimeoutRef = useRef<number | null>(null)

  // Função helper para verificar se é o botão do card
  const isCardButton = useCallback((element: HTMLElement | null): boolean => {
    if (!element) return false

    const button = element.closest('button')
    if (!button) return false

    const buttonClass = button.className || ''
    return (
      buttonClass.includes('from-slate-800') ||
      buttonClass.includes('from-slate-900') ||
      buttonClass.includes('bg-gradient-to-br')
    )
  }, [])

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

  // Detecta hover no card usando event delegation
  useEffect(() => {
    const cardArea = cardAreaRef.current
    if (!cardArea || (!onReset && !onEdit)) return

    const handleMouseOver = (e: MouseEvent) => {
      if (isCardButton(e.target as HTMLElement)) {
        setIsCardHovered(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement
      const isGoingToCard = isCardButton(relatedTarget)
      const isGoingToMenu = relatedTarget?.closest(MENU_WRAPPER_SELECTOR)

      // Se não está indo para o card nem para o menu, esconde tudo
      if (!relatedTarget || (!isGoingToCard && !isGoingToMenu)) {
        setIsCardHovered(false)
        setIsMenuHovered(false)
      }
    }

    // Usa capture phase para capturar eventos antes de qualquer coisa
    cardArea.addEventListener('mouseover', handleMouseOver, true)
    cardArea.addEventListener('mouseout', handleMouseOut, true)

    return () => {
      cardArea.removeEventListener('mouseover', handleMouseOver, true)
      cardArea.removeEventListener('mouseout', handleMouseOut, true)
    }
  }, [onReset, onEdit, isCardButton])

  const isVisible = isCardHovered || isMenuHovered

  // Handler para reset com animação
  const handleResetClick = useCallback(() => {
    if (!onReset) return

    // Ativa animação
    setResetAnimation(true)

    // Chama a função de reset
    onReset()

    // Reseta animação após duração
    resetTimeoutRef.current = window.setTimeout(() => {
      setResetAnimation(false)
    }, RESET_ANIMATION_DURATION)
  }, [onReset])

  // Cleanup do timeout
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full relative">
      <div ref={cardAreaRef}>
        <CategoryShowcase
          tabs={previewTabs}
          defaultTab={design.placement}
          gridCols={{ base: 1, sm: 1, md: 1, lg: 1 }}
          cardClassName="p-6 w-auto h-auto min-h-0"
          className={className}
          onTabChangeAction={handleTabChange}
          isDialogPreview={true}
          iconPopoverContent={iconPopoverContent}
          onIconBoxRequest={onIconBoxRequest}
        />
      </div>
      {(onReset || onEdit) && (
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 top-[3.5rem] z-10 flex items-center gap-2',
            isVisible ? 'pointer-events-auto' : 'pointer-events-none'
          )}
          onMouseEnter={() => setIsMenuHovered(true)}
          onMouseLeave={(e) => {
            const relatedTarget = e.relatedTarget as HTMLElement

            // Se não está indo para o card, esconde o menu
            if (!relatedTarget || !isCardButton(relatedTarget)) {
              setIsMenuHovered(false)
              // Se também não está indo para outro elemento do menu, esconde tudo
              if (!relatedTarget?.closest(MENU_WRAPPER_SELECTOR)) {
                setIsCardHovered(false)
              }
            }
          }}
        >
          {onEdit && (
            <HoverActionMenu
              onClick={onEdit}
              aria-label="Editar visual desta categoria"
              position="top-center"
              offset="top-0"
              wrapperClassName="!relative !left-0 !translate-x-0"
              buttonClassName={
                isVisible
                  ? '!opacity-100 !translate-y-0'
                  : 'opacity-0 translate-y-1'
              }
            >
              <Pencil className="h-3.5 w-3.5" />
              <span>Editar</span>
            </HoverActionMenu>
          )}
          {onReset && (
            <HoverActionMenu
              onClick={handleResetClick}
              aria-label="Resetar visual desta categoria"
              position="top-center"
              offset="top-0"
              wrapperClassName="!relative !left-0 !translate-x-0"
              buttonClassName={
                isVisible
                  ? '!opacity-100 !translate-y-0'
                  : 'opacity-0 translate-y-1'
              }
            >
              <RotateCcw
                className="h-3.5 w-3.5"
                style={
                  resetAnimation
                    ? {
                        animation: 'spin 0.6s ease-in-out reverse',
                      }
                    : undefined
                }
              />
              <span>Resetar</span>
            </HoverActionMenu>
          )}
        </div>
      )}
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
  open: controlledOpen,
  onControlledOpenChange,
}: {
  triggerClassName?: string
  triggerAriaLabel?: string
  triggerChildren: ReactNode
  onOpenChange?: (_open: boolean) => void
  onStateChange: DialogStateUpdater['onStateChange']
  design: CategoryDesign
  onDesignChange: (_newDesign: CategoryDesign) => void
  categoryName: string
  open?: boolean
  onControlledOpenChange?: (_open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = onControlledOpenChange ?? setInternalOpen
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
  const [iconPopoverOpen, setIconPopoverOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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
        customIcon: {
          source: 'upload',
          name:
            prev.customIcon.source === 'upload'
              ? (prev.customIcon.name ?? '')
              : '',
        },
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
          name:
            prev.customIcon.source === 'url'
              ? (prev.customIcon.name ?? '')
              : '',
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
          name: extractNameFromFile(file.name),
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
        name: extractNameFromUrl(value),
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
    addRecentEmoji(emoji)
  }

  const handleIconSelect = (iconName: AllIconNames) => {
    const resolved = normalizeIconName(iconName) ?? iconName
    setLocalDesign((prev) => ({
      ...prev,
      icon: resolved,
      customIcon: { ...DEFAULT_CUSTOM_ICON },
    }))
    setActiveIconTab('icons')
    addRecentIcon(resolved)
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
    setEmojiSearchTerm('')
    setIconSearchTerm('')
  }

  const handleSave = () => {
    onDesignChange(cloneDesign(localDesign))
    setOpen(false)
  }

  const customIconName = localDesign.customIcon.name ?? ''
  const trimmedCustomIconName = customIconName.trim()
  const customIconNameError =
    trimmedCustomIconName.length > MAX_ICON_NAME_LENGTH
      ? 'O nome precisa ter menos que 50 caracteres.'
      : null
  const hasUploadedIcon =
    (localDesign.customIcon.source === 'upload' &&
      Boolean(localDesign.customIcon.dataUrl)) ||
    (localDesign.customIcon.source === 'url' &&
      Boolean(localDesign.customIcon.url))
  const canSaveCustomIcon =
    hasUploadedIcon &&
    (localDesign.customIcon.source === 'upload' ||
      localDesign.customIcon.source === 'url') &&
    trimmedCustomIconName.length > 0 &&
    !customIconNameError

  const handleCustomIconNameChange = (value: string) => {
    setLocalDesign((prev) => ({
      ...prev,
      customIcon: {
        ...prev.customIcon,
        name: value,
      },
    }))
  }

  const handleCancelCustomIcon = () => {
    handleClearCustomIcon()
  }

  const handleSaveCustomIcon = () => {
    if (!canSaveCustomIcon) {
      toast.error('Finalize o upload antes de salvar.', {
        description:
          'Envie um SVG válido ou informe uma URL e defina um nome com até 50 caracteres.',
      })
      return
    }
    const sanitizedName = trimmedCustomIconName
    setLocalDesign((prev) => ({
      ...prev,
      customIcon: {
        ...prev.customIcon,
        name: sanitizedName,
      },
    }))
    setActiveIconTab('icons')
    toast.success('Ícone personalizado salvo!', {
      description: sanitizedName,
    })
  }

  const placementLabel =
    localDesign.placement === 'phases' ? 'Fases da obra' : 'Tipo de trabalho'

  const selectedEmoji =
    localDesign.customIcon.source === 'emoji'
      ? (localDesign.customIcon.emoji ?? null)
      : null

  const activeIconName = normalizeIconName(localDesign.icon) ?? localDesign.icon

  const { recents: iconRecents, addRecentIcon } = useIconRecents()
  const { recents: emojiRecents, addRecentEmoji } = useEmojiRecents()

  const { groups: resolvedEmojiGroups } = useMemo(
    () =>
      buildEmojiGroups({
        searchTerm: emojiSearchTerm,
        recentEmojis: emojiRecents,
      }),
    [emojiSearchTerm, emojiRecents]
  )

  const { groups: activeIconGroups, navigationOrder: iconNavigationOrder } =
    useMemo(
      () =>
        buildIconGroups({
          searchTerm: iconSearchTerm,
          recentIcons: iconRecents,
        }),
      [iconSearchTerm, iconRecents]
    )

  const resolvedCategoryName =
    categoryName.trim().length > 0 ? categoryName : 'Categoria sem nome'

  useEffect(() => {
    onStateChange('design', open)
    onOpenChange?.(open)
  }, [open, onOpenChange, onStateChange])

  const triggerClasses = useMemo(
    () => cn(ACTION_BUTTON_CLASSES, triggerClassName),
    [triggerClassName]
  )

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {triggerChildren && (
        <Dialog.Trigger
          className={triggerClasses}
          aria-label={triggerAriaLabel}
        >
          {triggerChildren}
        </Dialog.Trigger>
      )}
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
                  <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-2 md:p-6 text-slate-900 shadow-sm">
                    <div className={DESIGN_DIALOG_META}>
                      <span>Preview do destaque</span>
                      <span className="max-w-[10rem] sm:max-w-none sm:text-right">
                        Aba atual:{' '}
                        <span className="block sm:inline">
                          {placementLabel}
                        </span>
                      </span>
                    </div>
                    <div className="mt-5 flex w-full flex-col items-center gap-5">
                      <div className="group relative flex min-h-[120px] w-auto flex-col items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-lg transition-all duration-300 hover:shadow-2xl">
                        <Popover
                          open={iconPopoverOpen}
                          onOpenChange={setIconPopoverOpen}
                        >
                          <PopoverTrigger asChild>
                            <div
                              className="relative z-10 flex h-14 w-14 items-center justify-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 p-2.5 shadow-lg transition-transform duration-300 transform-gpu group-hover:scale-[1.04] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] cursor-pointer">
                                {renderCategoryIcon(localDesign, {
                                  size: 32,
                                  className: 'h-8 w-8 text-white',
                                })}
                              </span>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent
                            side="bottom"
                            align="center"
                            sideOffset={12}
                            avoidCollisions={false}
                            onOpenAutoFocus={(e) => e.preventDefault()}
                            onCloseAutoFocus={(e) => e.preventDefault()}
                            className="w-auto max-w-[calc(100vw-2rem)] max-h-[80vh] overflow-y-auto border-0 bg-transparent p-0 shadow-none"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div
                              style={{
                                contain: 'layout style paint',
                                willChange: 'auto',
                              }}
                            >
                              <IconCustomizationBlock
                                className="mt-0"
                                iconTabs={ICON_PICKER_TABS}
                                activeTab={activeIconTab}
                                onTabChange={setActiveIconTab}
                                onRemoveIcon={handleRemoveIcon}
                                emojiSearchTerm={emojiSearchTerm}
                                onEmojiSearchChange={setEmojiSearchTerm}
                                emojiGroups={resolvedEmojiGroups}
                                onEmojiSelect={handleEmojiSelect}
                                selectedEmoji={selectedEmoji}
                                iconSearchTerm={iconSearchTerm}
                                onIconSearchChange={setIconSearchTerm}
                                iconGroups={activeIconGroups}
                                iconNavigationOrder={iconNavigationOrder}
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
                                customIconName={customIconName}
                                onCustomIconNameChange={
                                  handleCustomIconNameChange
                                }
                                customIconNameError={customIconNameError}
                                onCancelCustomIcon={handleCancelCustomIcon}
                                onSaveCustomIcon={handleSaveCustomIcon}
                                isSaveDisabled={!canSaveCustomIcon}
                                onClose={() => setIconPopoverOpen(false)}
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                        <span className="relative z-10 text-center text-xs font-semibold leading-tight text-white whitespace-normal break-words transition-colors duration-300 group-hover:text-orange-400">
                          {resolvedCategoryName}
                        </span>
                      </div>

                      <div
                        className={DIALOG_PREVIEW_BADGE}
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
                        <span className="truncate font-semibold text-sm min-w-0">
                          {resolvedCategoryName}
                        </span>
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
                      onEmojiSelect={handleEmojiSelect}
                      selectedEmoji={selectedEmoji}
                      iconSearchTerm={iconSearchTerm}
                      onIconSearchChange={setIconSearchTerm}
                      iconGroups={activeIconGroups}
                      iconNavigationOrder={iconNavigationOrder}
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
                      customIconName={customIconName}
                      onCustomIconNameChange={handleCustomIconNameChange}
                      customIconNameError={customIconNameError}
                      onCancelCustomIcon={handleCancelCustomIcon}
                      onSaveCustomIcon={handleSaveCustomIcon}
                      isSaveDisabled={!canSaveCustomIcon}
                      onClose={() => setOpen(false)}
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

function CategoryDialogModal({
  isOpen,
  mode,
  onClose,
  onSave,
  initialData,
  onStateChange,
}: {
  isOpen: boolean
  mode: CategoryDialogMode
  onClose: () => void
  onSave: (_data: CategoryData) => Promise<void> | void
  initialData?: CategoryData
  onStateChange: DialogStateUpdater['onStateChange']
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [designDialogOpen, setDesignDialogOpen] = useState(false)
  const [iconDialogOpen, setIconDialogOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    onStateChange('category-icon', iconDialogOpen)
  }, [iconDialogOpen, onStateChange])

  useEffect(() => {
    if (!isMobile && iconDialogOpen) {
      setIconDialogOpen(false)
    }
  }, [iconDialogOpen, isMobile])

  const initialCategory = useMemo<CategoryDetails>(() => {
    if (initialData) {
      return {
        name: initialData.name,
        description: initialData.description,
      }
    }
    return mode === 'edit' ? SAMPLE_CATEGORY_DETAILS : EMPTY_CATEGORY_DETAILS
  }, [initialData, mode])

  const initialDesign = useMemo<CategoryDesign>(() => {
    if (initialData) {
      return cloneDesign(initialData.design)
    }
    return cloneDesign(DEFAULT_DESIGN)
  }, [initialData])

  const [category, setCategory] = useState<CategoryDetails>(initialCategory)
  const [design, setDesign] = useState<CategoryDesign>(initialDesign)

  // Estado para customização de ícones no Popover
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
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Sincronizar localDesign com design quando design mudar
  useEffect(() => {
    setLocalDesign(cloneDesign(design))
    setSvgUrlInput(
      design.customIcon.source === 'url' ? (design.customIcon.url ?? '') : ''
    )
  }, [design])

  const { recents: iconRecents, addRecentIcon } = useIconRecents()
  const { recents: emojiRecents, addRecentEmoji } = useEmojiRecents()

  const { groups: resolvedEmojiGroups } = useMemo(
    () =>
      buildEmojiGroups({
        searchTerm: emojiSearchTerm,
        recentEmojis: emojiRecents,
      }),
    [emojiSearchTerm, emojiRecents]
  )

  const { groups: activeIconGroups, navigationOrder: iconNavigationOrder } =
    useMemo(
      () =>
        buildIconGroups({
          searchTerm: iconSearchTerm,
          recentIcons: iconRecents,
        }),
      [iconSearchTerm, iconRecents]
    )

  const selectedEmoji =
    localDesign.customIcon.source === 'emoji'
      ? (localDesign.customIcon.emoji ?? null)
      : null

  const activeIconName = normalizeIconName(localDesign.icon) ?? localDesign.icon

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
        customIcon: {
          source: 'upload',
          name:
            prev.customIcon.source === 'upload'
              ? (prev.customIcon.name ?? '')
              : '',
        },
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
          name:
            prev.customIcon.source === 'url'
              ? (prev.customIcon.name ?? '')
              : '',
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
          name: extractNameFromFile(file.name),
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
        name: extractNameFromUrl(value),
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
    addRecentEmoji(emoji)
    // Aplicar mudança imediatamente ao design
    setDesign((prev) => ({
      ...prev,
      customIcon: {
        source: 'emoji',
        emoji,
      },
    }))
  }

  const handleIconSelect = (iconName: AllIconNames) => {
    const resolved = normalizeIconName(iconName) ?? iconName
    setLocalDesign((prev) => ({
      ...prev,
      icon: resolved,
      customIcon: { ...DEFAULT_CUSTOM_ICON },
    }))
    setActiveIconTab('icons')
    addRecentIcon(resolved)
    // Aplicar mudança imediatamente ao design
    setDesign((prev) => ({
      ...prev,
      icon: resolved,
      customIcon: { ...DEFAULT_CUSTOM_ICON },
    }))
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
    setEmojiSearchTerm('')
    setIconSearchTerm('')
    // Aplicar mudança imediatamente ao design
    setDesign((prev) => ({
      ...prev,
      icon: DEFAULT_ICON,
      customIcon: { ...DEFAULT_CUSTOM_ICON },
    }))
  }

  const customIconName = localDesign.customIcon.name ?? ''
  const trimmedCustomIconName = customIconName.trim()
  const customIconNameError =
    trimmedCustomIconName.length > MAX_ICON_NAME_LENGTH
      ? 'O nome precisa ter menos que 50 caracteres.'
      : null
  const hasUploadedIcon =
    (localDesign.customIcon.source === 'upload' &&
      Boolean(localDesign.customIcon.dataUrl)) ||
    (localDesign.customIcon.source === 'url' &&
      Boolean(localDesign.customIcon.url))

  const handleCustomIconNameChange = (value: string) => {
    setLocalDesign((prev) => ({
      ...prev,
      customIcon: {
        ...prev.customIcon,
        name: value,
      },
    }))
  }

  const handleCancelCustomIcon = () => {
    handleClearCustomIcon()
  }

  const handleSaveCustomIcon = () => {
    if (
      !hasUploadedIcon ||
      trimmedCustomIconName.length === 0 ||
      customIconNameError
    ) {
      toast.error('Finalize o upload antes de salvar.', {
        description:
          'Envie um SVG válido ou informe uma URL e defina um nome com até 50 caracteres.',
      })
      return
    }
    const sanitizedName = trimmedCustomIconName
    setLocalDesign((prev) => ({
      ...prev,
      customIcon: {
        ...prev.customIcon,
        name: sanitizedName,
      },
    }))
    // Aplicar mudança ao design
    setDesign((prev) => ({
      ...prev,
      customIcon: {
        ...localDesign.customIcon,
        name: sanitizedName,
      },
    }))
    setActiveIconTab('icons')
    toast.success('Ícone personalizado salvo!', {
      description: sanitizedName,
    })
  }

  const canSaveCustomIcon =
    hasUploadedIcon &&
    (localDesign.customIcon.source === 'upload' ||
      localDesign.customIcon.source === 'url') &&
    trimmedCustomIconName.length > 0 &&
    !customIconNameError

  useEffect(() => {
    if (initialData) {
      setCategory({
        name: initialData.name,
        description: initialData.description,
      })
      setDesign(cloneDesign(initialData.design))
      return
    }
    setCategory(initialCategory)
    setDesign(initialDesign)
  }, [initialCategory, initialDesign, initialData, mode])

  const previewName =
    category.name.trim().length > 0 ? category.name : 'Categoria sem nome'
  const previewDescription =
    category.description.trim().length > 0
      ? category.description
      : 'Adicione uma descrição para destacar esta categoria.'

  const canSubmit = category.name.trim().length > 0 && !isSubmitting

  const handleReset = () => {
    const preservedPlacement = design.placement
    setCategory(initialCategory)
    setDesign({
      ...cloneDesign(DEFAULT_DESIGN),
      placement: preservedPlacement,
    })
  }

  const handleSubmit = async () => {
    if (!canSubmit) return
    try {
      setIsSubmitting(true)
      await onSave({
        id: initialData?.id,
        name: category.name,
        description: category.description,
        design,
      })
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const iconCustomizationBlockProps = {
    className: isMobile
      ? 'mt-0'
      : 'mt-0 w-[404px] max-w-[404px] sm:w-[404px] sm:max-w-[404px]',
    iconTabs: ICON_PICKER_TABS,
    activeTab: activeIconTab,
    onTabChange: setActiveIconTab,
    onRemoveIcon: handleRemoveIcon,
    emojiSearchTerm,
    onEmojiSearchChange: setEmojiSearchTerm,
    emojiGroups: resolvedEmojiGroups,
    onEmojiSelect: handleEmojiSelect,
    selectedEmoji,
    iconSearchTerm,
    onIconSearchChange: setIconSearchTerm,
    iconGroups: activeIconGroups,
    iconNavigationOrder,
    design: localDesign,
    activeIconName,
    onIconSelect: handleIconSelect,
    onSourceChange: handleSourceChange,
    fileInputRef,
    isProcessingUpload,
    svgUrlInput,
    onSvgUrlInputChange: setSvgUrlInput,
    onFileInputChange: handleFileInputChange,
    uploadError,
    onUrlApply: handleUrlApply,
    urlError,
    hasUploadedIcon,
    onClearCustomIcon: handleClearCustomIcon,
    renderCategoryIcon,
    maxSvgFileSizeKb: MAX_SVG_FILE_SIZE_KB,
    formatIconLabel,
    defaultIconName: DEFAULT_ICON,
    customIconName,
    onCustomIconNameChange: handleCustomIconNameChange,
    customIconNameError,
    onCancelCustomIcon: handleCancelCustomIcon,
    onSaveCustomIcon: handleSaveCustomIcon,
    isSaveDisabled: !canSaveCustomIcon,
  }

  const iconPopoverContent = !isMobile ? (
    <IconCustomizationBlock {...iconCustomizationBlockProps} />
  ) : undefined

  const mobileIconBoxRequest = isMobile
    ? () => setIconDialogOpen(true)
    : undefined

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose()
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup
          variant="default"
          data-nested-parent={
            designDialogOpen || iconDialogOpen ? '' : undefined
          }
        >
          <Dialog.Content>
            <Dialog.Header data-dialog-section="header">
              <Dialog.HeaderIcon>
                <TagIcon className="h-4 w-4" />
              </Dialog.HeaderIcon>
              <Dialog.Title className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                {mode === 'edit' ? 'Editar Categoria' : 'Nova Categoria'}
              </Dialog.Title>
              <Dialog.CloseButton aria-label="Fechar dialog" />
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
                    </div>

                    <div className="mt-6 w-full">
                      <CategoryShowcasePreview
                        categoryName={previewName}
                        design={design}
                        className="md:text-[16px] [&_button]:text-[15px] md:[&_button]:text-[16px]"
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
                        onReset={handleReset}
                        onEdit={() => setDesignDialogOpen(true)}
                        iconPopoverContent={iconPopoverContent}
                        onIconBoxRequest={mobileIconBoxRequest}
                      />
                    </div>

                    {/* DesignDialog renderizado sem trigger para ser aberto programaticamente */}
                    <DesignDialog
                      triggerAriaLabel="Editar visual"
                      triggerChildren={null}
                      open={designDialogOpen}
                      onControlledOpenChange={setDesignDialogOpen}
                      onOpenChange={setDesignDialogOpen}
                      onStateChange={onStateChange}
                      design={design}
                      onDesignChange={setDesign}
                      categoryName={previewName}
                    />
                    {isMobile && (
                      <Dialog.Root
                        open={iconDialogOpen}
                        onOpenChange={setIconDialogOpen}
                      >
                        <Dialog.Portal>
                          <Dialog.Backdrop
                            onClick={() => setIconDialogOpen(false)}
                          />
                          <Dialog.Popup
                            variant="default"
                            className="p-0 h-auto max-h-[calc(100vh-0.75rem)] w-auto max-w-[min(470px,_calc(100vw-0.5rem))] bg-transparent shadow-none ring-0"
                          >
                            <IconCustomizationBlock
                              {...iconCustomizationBlockProps}
                              onClose={() => setIconDialogOpen(false)}
                            />
                          </Dialog.Popup>
                        </Dialog.Portal>
                      </Dialog.Root>
                    )}

                    <div className="pt-5 flex flex-col items-center gap-4">
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

                    <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-8 w-full">
                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <label className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                          <span
                            className="absolute inset-1.5 shadow-inner"
                            style={{ backgroundColor: design.iconColor }}
                            aria-hidden="true"
                          />
                          <input
                            type="color"
                            value={design.iconColor}
                            onChange={(event) =>
                              setDesign((prev) => ({
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
                          {design.iconColor.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <label className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                          <span
                            className="absolute inset-1.5 shadow-inner"
                            style={{
                              backgroundColor: design.backgroundColor,
                            }}
                            aria-hidden="true"
                          />
                          <input
                            type="color"
                            value={design.backgroundColor}
                            onChange={(event) =>
                              setDesign((prev) => ({
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
                          {design.backgroundColor.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-1.5 text-center">
                        <label className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                          <span
                            className="absolute inset-1.5 shadow-inner"
                            style={{ backgroundColor: design.fontColor }}
                            aria-hidden="true"
                          />
                          <input
                            type="color"
                            value={design.fontColor}
                            onChange={(event) =>
                              setDesign((prev) => ({
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
                          {design.fontColor.toUpperCase()}
                        </span>
                      </div>
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
                  onClick={onClose}
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
                  {isSubmitting
                    ? 'Salvando...'
                    : mode === 'edit'
                      ? 'Atualizar Categoria'
                      : 'Criar Categoria'}
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
  const [categoryData, setCategoryData] = useState<CategoryData>({
    id: 'sample-category',
    name: SAMPLE_CATEGORY_DETAILS.name,
    description: SAMPLE_CATEGORY_DETAILS.description,
    design: cloneDesign(DEFAULT_DESIGN),
  })

  useEffect(() => {
    onStateChange(mode === 'edit' ? 'category-edit' : 'category-create', open)
  }, [mode, onStateChange, open])

  useEffect(() => {
    setCategoryData({
      id: mode === 'edit' ? 'sample-category' : undefined,
      name:
        mode === 'edit'
          ? SAMPLE_CATEGORY_DETAILS.name
          : EMPTY_CATEGORY_DETAILS.name,
      description:
        mode === 'edit'
          ? SAMPLE_CATEGORY_DETAILS.description
          : EMPTY_CATEGORY_DETAILS.description,
      design: cloneDesign(DEFAULT_DESIGN),
    })
  }, [mode])

  const handleOpen = (next: boolean) => {
    setOpen(next)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = async (data: CategoryData) => {
    setCategoryData({
      ...data,
      design: cloneDesign(data.design),
    })
    setOpen(false)
  }

  const triggerLabel = mode === 'edit' ? 'Editar Categoria' : 'Nova Categoria'

  return (
    <>
      <Button
        variant="default"
        className="gap-2"
        onClick={() => handleOpen(true)}
      >
        {mode === 'edit' ? (
          <Pencil className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        {triggerLabel}
      </Button>

      <CategoryDialogModal
        isOpen={open}
        mode={mode}
        onClose={handleClose}
        onSave={handleSave}
        initialData={categoryData}
        onStateChange={onStateChange}
      />
    </>
  )
}

export { CategoryDialog, CategoryDialogModal }
export type { CategoryData, CategoryDialogMode, DialogStateUpdater }
