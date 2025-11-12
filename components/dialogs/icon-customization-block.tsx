// components/dialogs/icon-customization-block.tsx
import {
  type EmojiGroup,
  type IconGroup,
  type IconPickerTab,
} from '@/components/dialogs/icon-customization-data'
import { Button } from '@/components/ui/button'
import { FilterResetButton } from '@/components/ui/filter-reset-button'
import { HybridTooltip } from '@/components/ui/HybridTooltip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast-sonner'
import type {
  CategoryDesign,
  CustomIconSource,
  RenderIconOptions,
} from '@/lib/category-design'
import {
  isCustomIcon,
  renderIcon as renderLibraryIcon,
  type AllIconNames,
} from '@/lib/constants/all-icons'
import { cn } from '@/lib/utils'
import {
  BarChart2,
  Clock,
  CloudSun,
  Flag,
  Hammer,
  Leaf,
  Lightbulb,
  Loader2,
  MessageCircle,
  Plane,
  Smile,
  Sparkles,
  Tag as TagIcon,
  Trash2,
  Users,
} from 'lucide-react'
import type { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

const EMOJI_GROUP_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  recent: Clock,
  people: Smile,
  nature: Leaf,
  objects: Lightbulb,
  symbols: Sparkles,
  flags: Flag,
}

const ICON_GROUP_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  'recent-icons': Clock,
  construction: Hammer,
  transport: Plane,
  'people-status': Users,
  communication: MessageCircle,
  analytics: BarChart2,
  weather: CloudSun,
  'custom-library': Sparkles,
}

const ICON_BUTTON_BASE_CLASSES =
  'inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:scale-105 hover:text-orange-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white'

const ICON_BUTTON_ACTIVE_CLASSES = 'text-orange-600 shadow-md'

const SCROLL_SYNC_THRESHOLD = 48

type HeaderSearchConfig = {
  value: string
  onChange: (_value: string) => void
  placeholder: string
}

type IconCustomizationHeaderProps = {
  iconTabs: Array<{ value: IconPickerTab; label: string }>
  activeTab: IconPickerTab
  onTabChange: (_tab: IconPickerTab) => void
  onBadgeIconClear: () => void
  onRemoveIcon: () => void
  onResetAll: () => void
  searchConfig?: HeaderSearchConfig
  design: CategoryDesign
}

const IconCustomizationHeader = ({
  iconTabs,
  activeTab,
  onTabChange,
  onBadgeIconClear,
  onRemoveIcon,
  onResetAll,
  searchConfig,
  design,
}: IconCustomizationHeaderProps) => {
  const canRemoveCustomIcon =
    design.customIcon.source === 'upload' ||
    design.customIcon.source === 'url' ||
    isCustomIcon(design.icon)

  const handleBadgeIconRemovalRequest = () => {
    if (!canRemoveCustomIcon || activeTab === 'emoji') return

    toast.warning('Remover ícone personalizado?', {
      description: 'Esta ação é permanente e removerá o SVG selecionado.',
      action: {
        label: 'Remover',
        onClick: () => {
          if (
            design.customIcon.source === 'upload' ||
            design.customIcon.source === 'url'
          ) {
            onBadgeIconClear()
          } else if (isCustomIcon(design.icon)) {
            onRemoveIcon()
          }
          toast.success('Ícone personalizado removido com sucesso.')
        },
      },
    })
  }

  return (
    <div className="relative flex flex-col gap-3 rounded-t-2xl bg-white p-4 pb-2">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <nav
          className="flex w-full border-b-2 border-slate-200/70 sm:flex-1"
          role="tablist"
          aria-label="Modos de personalização de ícones"
        >
          <ul className="flex w-full items-stretch text-xs font-semibold text-slate-500/90 sm:text-sm">
            {iconTabs.map((tab) => {
              const isActive = activeTab === tab.value
              return (
                <li key={tab.value} className="flex-1">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`${tab.value}-section`}
                    onClick={() => onTabChange(tab.value)}
                    className={cn(
                      'group relative flex w-full items-center justify-center px-3 py-3 text-center text-xs font-semibold tracking-tight transition-colors duration-200 sm:text-sm',
                      isActive
                        ? 'text-orange-600'
                        : 'text-slate-500 hover:text-orange-600'
                    )}
                  >
                    <span className="whitespace-nowrap leading-none">
                      {tab.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        'pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[2px] origin-center transform bg-gradient-to-r from-orange-500 to-yellow-500 transition-transform duration-300',
                        isActive ? 'scale-x-100' : 'scale-x-0',
                        !isActive && 'group-hover:scale-x-100'
                      )}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      {searchConfig ? (
        <div className="flex w-full items-center gap-2">
          <Input
            value={searchConfig.value}
            onChange={(event) => searchConfig.onChange(event.target.value)}
            placeholder={searchConfig.placeholder}
            className="h-10 flex-1 text-sm"
          />
          <FilterResetButton
            onClick={onResetAll}
            size="md"
            title="Resetar visual"
            aria-label="Resetar todas as seleções"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleBadgeIconRemovalRequest}
            aria-label="Remover ícone da badge"
            disabled={!canRemoveCustomIcon || activeTab === 'emoji'}
            className={cn(
              'flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border shadow-md hover:scale-105 hover:shadow-lg filter-reset-button rounded-md text-sm',
              'text-rose-500 hover:text-rose-600 h-10 w-10'
            )}
          >
            <Trash2
              className="transition-all duration-300"
              aria-hidden="true"
            />
          </Button>
        </div>
      ) : null}
    </div>
  )
}

type IconCustomizationFooterProps = {
  activeTab: IconPickerTab
  onTabChange: (_tab: IconPickerTab) => void
  emojiGroups: EmojiGroup[]
  activeEmojiGroup: string | null
  onEmojiGroupClick: (_groupId: string) => void
  iconGroups: IconGroup[]
  activeIconGroup: string | null
  onIconGroupClick: (_groupId: string) => void
  iconNavigationOrder?: string[]
}

const IconCustomizationFooter = ({
  activeTab,
  onTabChange,
  emojiGroups,
  activeEmojiGroup,
  onEmojiGroupClick,
  iconGroups,
  activeIconGroup,
  onIconGroupClick,
  iconNavigationOrder,
}: IconCustomizationFooterProps) => {
  if (activeTab === 'emoji' && emojiGroups.length > 0) {
    return (
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {emojiGroups.map((group) => {
            const IconComponent = EMOJI_GROUP_ICON_MAP[group.id]
            const isActive = activeEmojiGroup === group.id
            return (
              <HybridTooltip
                key={group.id}
                content={
                  <span className="text-sm font-medium text-slate-800">
                    {group.label}
                  </span>
                }
                side="bottom"
              >
                <button
                  type="button"
                  onClick={() => onEmojiGroupClick(group.id)}
                  className={cn(
                    ICON_BUTTON_BASE_CLASSES,
                    isActive && ICON_BUTTON_ACTIVE_CLASSES
                  )}
                >
                  {IconComponent ? (
                    <IconComponent className="h-4 w-4" />
                  ) : group.glyph ? (
                    <span className="text-sm">{group.glyph}</span>
                  ) : (
                    <span className="text-xs font-semibold">
                      {group.label[0]?.toUpperCase()}
                    </span>
                  )}
                </button>
              </HybridTooltip>
            )
          })}
        </div>
        <HybridTooltip
          content={
            <span className="text-sm font-medium text-slate-800">
              Personalizado
            </span>
          }
          side="bottom"
        >
          <button
            type="button"
            onClick={() => onTabChange('custom')}
            className={cn(
              ICON_BUTTON_BASE_CLASSES,
              'text-orange-500 hover:text-orange-600'
            )}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </button>
        </HybridTooltip>
      </div>
    )
  }

  if (activeTab === 'icons' && iconGroups.length > 0) {
    const groupsById = new Map(iconGroups.map((group) => [group.id, group]))
    const preferredOrder =
      iconNavigationOrder?.filter((id) => groupsById.has(id)) ?? []
    const fallbackOrder = iconGroups
      .map((group) => group.id)
      .filter((id) => !preferredOrder.includes(id))
    const orderedIds = [...preferredOrder, ...fallbackOrder]

    return (
      <div className="flex flex-wrap items-center gap-2">
        {orderedIds.map((groupId) => {
          const group = groupsById.get(groupId)
          if (!group) return null
          const IconComponent = ICON_GROUP_ICON_MAP[group.id]
          const isActive = activeIconGroup === group.id
          const isCustomLibrary = group.id === 'custom-library'
          return (
            <div
              key={group.id}
              className={cn('flex', isCustomLibrary && 'ml-auto')}
            >
              <HybridTooltip
                content={
                  <span className="text-sm font-medium text-slate-800">
                    {group.label}
                  </span>
                }
                side="bottom"
              >
                <button
                  type="button"
                  onClick={() => onIconGroupClick(group.id)}
                  className={cn(
                    ICON_BUTTON_BASE_CLASSES,
                    isActive && ICON_BUTTON_ACTIVE_CLASSES
                  )}
                  data-state={isActive ? 'open' : 'closed'}
                >
                  {IconComponent ? (
                    <IconComponent className="h-4 w-4" />
                  ) : group.glyph ? (
                    <span className="text-sm">{group.glyph}</span>
                  ) : (
                    <span className="text-xs font-semibold">
                      {group.label[0]?.toUpperCase()}
                    </span>
                  )}
                </button>
              </HybridTooltip>
            </div>
          )
        })}
      </div>
    )
  }

  return null
}

export interface IconCustomizationBlockProps {
  className?: string
  iconTabs: Array<{ value: IconPickerTab; label: string }>
  activeTab: IconPickerTab
  onTabChange: (_tab: IconPickerTab) => void
  onRemoveIcon: () => void
  emojiSearchTerm: string
  onEmojiSearchChange: (_value: string) => void
  emojiGroups: EmojiGroup[]
  onEmojiSelect: (_emoji: string) => void
  selectedEmoji: string | null
  iconSearchTerm: string
  onIconSearchChange: (_value: string) => void
  iconGroups: IconGroup[]
  design: CategoryDesign
  activeIconName: AllIconNames
  onIconSelect: (_icon: AllIconNames) => void
  onSourceChange: (_source: CustomIconSource) => void
  formatIconLabel: (_icon: AllIconNames) => string
  defaultIconName: AllIconNames
  fileInputRef: React.RefObject<HTMLInputElement | null>
  isProcessingUpload: boolean
  svgUrlInput: string
  onSvgUrlInputChange: (_value: string) => void
  onFileInputChange: (_event: ChangeEvent<HTMLInputElement>) => void
  uploadError: string | null
  onUrlApply: () => void
  urlError: string | null
  hasUploadedIcon: boolean
  onClearCustomIcon: () => void
  renderCategoryIcon: (
    _design: CategoryDesign,
    _options?: RenderIconOptions
  ) => React.ReactElement
  maxSvgFileSizeKb: number
  iconNavigationOrder?: string[]
  customIconName: string
  onCustomIconNameChange: (_value: string) => void
  customIconNameError: string | null
  onCancelCustomIcon: () => void
  onSaveCustomIcon: () => void
  isSaveDisabled?: boolean
}

export function IconCustomizationBlock({
  className,
  iconTabs,
  activeTab,
  onTabChange,
  onRemoveIcon,
  emojiSearchTerm,
  onEmojiSearchChange,
  emojiGroups,
  onEmojiSelect,
  selectedEmoji,
  iconSearchTerm,
  onIconSearchChange,
  iconGroups,
  design,
  activeIconName,
  onIconSelect,
  onSourceChange,
  formatIconLabel,
  defaultIconName,
  fileInputRef,
  isProcessingUpload,
  svgUrlInput,
  onSvgUrlInputChange,
  onFileInputChange,
  uploadError,
  onUrlApply,
  urlError,
  hasUploadedIcon,
  onClearCustomIcon,
  renderCategoryIcon,
  maxSvgFileSizeKb,
  iconNavigationOrder,
  customIconName,
  onCustomIconNameChange,
  customIconNameError,
  onCancelCustomIcon,
  onSaveCustomIcon,
  isSaveDisabled = false,
}: IconCustomizationBlockProps) {
  const headerSearchConfig: HeaderSearchConfig | undefined =
    activeTab === 'emoji'
      ? {
          value: emojiSearchTerm,
          onChange: onEmojiSearchChange,
          placeholder: 'Buscar emoji...',
        }
      : activeTab === 'icons'
        ? {
            value: iconSearchTerm,
            onChange: onIconSearchChange,
            placeholder: 'Buscar ícone...',
          }
        : undefined

  const emojiGroupRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const iconGroupRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const emojiScrollRef = useRef<HTMLDivElement | null>(null)
  const iconScrollRef = useRef<HTMLDivElement | null>(null)
  const [activeEmojiGroup, setActiveEmojiGroup] = useState<string | null>(null)
  const [activeIconGroup, setActiveIconGroup] = useState<string | null>(null)
  const isUrlApplyDisabled = svgUrlInput.trim().length === 0
  const shouldShowCustomActions =
    hasUploadedIcon &&
    (design.customIcon.source === 'upload' ||
      design.customIcon.source === 'url')

  const handleBadgeIconClear = () => {
    onSourceChange('none')
  }

  const handleResetAll = () => {
    onRemoveIcon()
    onSourceChange('none')
    onTabChange('icons')
    onEmojiSearchChange('')
    onIconSearchChange('')
    setActiveEmojiGroup(emojiGroups[0]?.id ?? null)
    setActiveIconGroup(iconGroups[0]?.id ?? null)
  }

  const scrollGroupIntoView = (
    container: HTMLDivElement | null,
    element: HTMLDivElement | null
  ) => {
    if (!container || !element) return
    const containerRect = container.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()
    const offset = elementRect.top - containerRect.top + container.scrollTop
    container.scrollTo({ top: offset, behavior: 'smooth' })
  }

  useEffect(() => {
    setActiveEmojiGroup(emojiGroups[0]?.id ?? null)
  }, [emojiGroups])

  useEffect(() => {
    setActiveIconGroup(iconGroups[0]?.id ?? null)
  }, [iconGroups])

  const footerContent = (
    <IconCustomizationFooter
      activeTab={activeTab}
      onTabChange={onTabChange}
      emojiGroups={emojiGroups}
      activeEmojiGroup={activeEmojiGroup}
      onEmojiGroupClick={(groupId) => {
        setActiveEmojiGroup(groupId)
        scrollGroupIntoView(
          emojiScrollRef.current,
          emojiGroupRefs.current[groupId] ?? null
        )
      }}
      iconGroups={iconGroups}
      activeIconGroup={activeIconGroup}
      onIconGroupClick={(groupId) => {
        setActiveIconGroup(groupId)
        scrollGroupIntoView(
          iconScrollRef.current,
          iconGroupRefs.current[groupId] ?? null
        )
      }}
      iconNavigationOrder={iconNavigationOrder}
    />
  )

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
        className
      )}
    >
      <IconCustomizationHeader
        iconTabs={iconTabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onBadgeIconClear={handleBadgeIconClear}
        onRemoveIcon={onRemoveIcon}
        onResetAll={handleResetAll}
        searchConfig={headerSearchConfig}
        design={design}
      />

      {activeTab === 'emoji' && (
        <div className="space-y-4">
          <div
            ref={emojiScrollRef}
            onScroll={() => {
              const container = emojiScrollRef.current
              if (!container || emojiGroups.length === 0) return
              const containerRect = container.getBoundingClientRect()
              let currentId: string | null = emojiGroups[0]?.id ?? null
              for (const group of emojiGroups) {
                const el = emojiGroupRefs.current[group.id]
                if (!el) continue
                const elementTop = el.getBoundingClientRect().top
                if (elementTop - containerRect.top <= SCROLL_SYNC_THRESHOLD) {
                  currentId = group.id
                } else {
                  break
                }
              }
              setActiveEmojiGroup((prev) =>
                prev === currentId ? prev : currentId
              )
            }}
            className="max-h-[12.5rem] w-full overflow-auto icon-customization-scroll"
          >
            {emojiGroups.length > 0 ? (
              <div className="space-y-5 px-4 pb-3 pt-3">
                {emojiGroups.map((group) => (
                  <div
                    key={group.id}
                    ref={(element) => {
                      emojiGroupRefs.current[group.id] = element
                    }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <span>
                        {group.glyph ? `${group.glyph} ` : ''}
                        {group.label}
                      </span>
                    </div>
                    <div className="grid grid-cols-6 md:grid-cols-8">
                      {group.emojis.map((emoji) => {
                        const isActive = selectedEmoji === emoji
                        return (
                          <div key={emoji} className="p-1">
                            <button
                              type="button"
                              onClick={() => onEmojiSelect(emoji)}
                              aria-pressed={isActive}
                              className={cn(
                                'inline-flex h-9 w-9 items-center justify-center rounded-lg text-2xl emoji-font transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                                isActive
                                  ? 'bg-orange-100 text-orange-600 shadow'
                                  : 'bg-white text-slate-700 hover:bg-slate-100 hover:scale-105'
                              )}
                            >
                              {emoji}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-3 pb-3 pt-3">
                <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white text-xs text-slate-500">
                  Nenhum emoji encontrado.
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'icons' && (
        <div className="space-y-4">
          <div
            ref={iconScrollRef}
            onScroll={() => {
              const container = iconScrollRef.current
              if (!container || iconGroups.length === 0) return
              const containerRect = container.getBoundingClientRect()
              let currentId: string | null = iconGroups[0]?.id ?? null
              for (const group of iconGroups) {
                const el = iconGroupRefs.current[group.id]
                if (!el) continue
                const elementTop = el.getBoundingClientRect().top
                if (elementTop - containerRect.top <= SCROLL_SYNC_THRESHOLD) {
                  currentId = group.id
                } else {
                  break
                }
              }
              setActiveIconGroup((prev) =>
                prev === currentId ? prev : currentId
              )
            }}
            className="max-h-[12.5rem] w-full overflow-auto icon-customization-scroll"
          >
            {iconGroups.length > 0 ? (
              <div className="space-y-5 px-4 pb-3 pt-3">
                {iconGroups.map((group) => (
                  <div
                    key={group.id}
                    ref={(element) => {
                      iconGroupRefs.current[group.id] = element
                    }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <span>
                        {group.glyph ? `${group.glyph} ` : ''}
                        {group.label}
                      </span>
                    </div>
                    <div className="grid gap-2 grid-cols-6 md:grid-cols-8">
                      {group.icons.map((iconName) => {
                        const isActive =
                          design.customIcon.source === 'none' &&
                          activeIconName === iconName
                        const renderedIcon = renderLibraryIcon(
                          iconName,
                          20,
                          'currentColor',
                          'h-6 w-6'
                        ) ??
                          renderLibraryIcon(
                            defaultIconName,
                            20,
                            'currentColor',
                            'h-6 w-6'
                          ) ?? (
                            <TagIcon
                              className="h-6 w-6"
                              size={20}
                              aria-hidden
                            />
                          )

                        return (
                          <div key={iconName} className="flex justify-center">
                            <button
                              type="button"
                              onClick={() => onIconSelect(iconName)}
                              aria-pressed={isActive}
                              className={cn(
                                'group flex aspect-square items-center justify-center rounded-lg border border-slate-200 bg-white/80 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
                                isActive
                                  ? 'text-orange-600 shadow-md hover:shadow-md'
                                  : 'text-slate-600 shadow-sm hover:text-orange-600 hover:shadow-lg',
                                'h-9 w-9'
                              )}
                              title={formatIconLabel(iconName)}
                            >
                              {renderedIcon}
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white text-xs text-slate-500">
                Nenhum ícone encontrado.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'custom' && (
        <div className="space-y-4 p-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-800">
              Ícone personalizado para o cartão principal
            </h3>
            <p className="text-xs text-slate-500">
              As cores do botão permanecem fixas. Use um SVG customizado para
              representar melhor a categoria.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { value: 'upload', label: 'Upload' },
              { value: 'url', label: 'URL externa' },
            ].map((option) => (
              <Button
                key={option.value}
                type="button"
                variant="outline"
                size="compact"
                onClick={() => onSourceChange(option.value as CustomIconSource)}
                className={cn(
                  'rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 shadow-sm transition-all duration-200 hover:from-white hover:to-white hover:shadow-md disabled:bg-gradient-to-br disabled:from-slate-50 disabled:to-slate-100 disabled:text-slate-500',
                  design.customIcon.source === option.value
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
            onChange={onFileInputChange}
          />

          {design.customIcon.source === 'upload' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef?.current?.click()}
                  disabled={isProcessingUpload}
                  className="h-9 border-dashed border-slate-300 text-sm font-medium text-slate-700 hover:border-orange-400 hover:text-orange-600"
                >
                  Selecionar arquivo SVG
                </Button>
                {isProcessingUpload && (
                  <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                )}
                {design.customIcon.fileName && !isProcessingUpload && (
                  <span className="truncate text-xs text-slate-500">
                    {design.customIcon.fileName}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Formato SVG até {maxSvgFileSizeKb}kb. Scripts e elementos
                externos são removidos automaticamente.
              </p>
              {uploadError && (
                <p className="text-xs font-medium text-red-500">
                  {uploadError}
                </p>
              )}
            </div>
          )}

          {design.customIcon.source === 'url' && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={svgUrlInput}
                  onChange={(event) => onSvgUrlInputChange(event.target.value)}
                  placeholder="https://exemplo.com/icone.svg"
                  className="h-10 text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={onUrlApply}
                  disabled={isUrlApplyDisabled}
                  className={cn(
                    'h-10 whitespace-nowrap text-sm font-medium text-slate-700 transition-all duration-200 hover:text-orange-600',
                    'disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:hover:border-slate-200 disabled:hover:text-slate-400'
                  )}
                >
                  Aplicar
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Aceitamos apenas URLs HTTPS públicas que terminem em{' '}
                <code>.svg</code>.
              </p>
              {urlError && (
                <p className="text-xs font-medium text-red-500">{urlError}</p>
              )}
            </div>
          )}

          {hasUploadedIcon && (
            <div className="flex w-full flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 sm:min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                  {renderCategoryIcon(design, {
                    size: 28,
                    className: 'h-7 w-7 text-slate-700',
                  })}
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="text-xs font-semibold text-slate-700">
                    Pré-visualização
                  </span>
                  <span className="text-xs text-slate-500 break-all">
                    {design.customIcon.source === 'upload'
                      ? (design.customIcon.fileName ?? 'SVG enviado')
                      : (design.customIcon.url ?? 'SVG enviado')}
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={onClearCustomIcon}
                aria-label="Remover ícone personalizado"
                className="filter-reset-button flex h-9 w-9 shrink-0 items-center justify-center border border-slate-300 text-slate-500 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          )}

          {shouldShowCustomActions ? (
            <>
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="custom-icon-name"
                    className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    Nome do ícone
                  </Label>
                  <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    {customIconName.length}/50
                  </span>
                </div>
                <Input
                  id="custom-icon-name"
                  value={customIconName}
                  onChange={(event) =>
                    onCustomIconNameChange(event.target.value)
                  }
                  placeholder="Defina um nome descritivo"
                  className={cn(
                    'h-10 text-sm',
                    customIconNameError
                      ? 'border-rose-400 focus-visible:ring-rose-500'
                      : undefined
                  )}
                  spellCheck={false}
                />
                {customIconNameError ? (
                  <p className="text-xs font-medium text-rose-500">
                    {customIconNameError}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    Máximo de 50 caracteres. Use um nome que facilite buscas
                    futuras.
                  </p>
                )}
              </div>
            </>
          ) : null}
        </div>
      )}

      {footerContent ? (
        <div className="flex flex-col gap-3 rounded-b-2xl border-t border-slate-200/80 bg-white p-4">
          {footerContent}
          {shouldShowCustomActions ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onCancelCustomIcon}
                className="h-10 px-4 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:text-orange-600 sm:h-9"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={onSaveCustomIcon}
                disabled={isSaveDisabled}
                className="h-10 px-4 text-sm font-semibold sm:h-9 disabled:pointer-events-none disabled:opacity-60"
              >
                Salvar
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
