// components/dialogs/icon-customization-block.tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import type {
  CategoryDesign,
  CustomIconSource,
  RenderIconOptions,
} from '@/lib/category-design'
import {
  type EmojiGroup,
  type IconGroup,
  type IconPickerTab,
} from '@/components/dialogs/icon-customization-data'
import { Loader2, Tag as TagIcon } from 'lucide-react'
import {
  renderIcon as renderLibraryIcon,
  type AllIconNames,
} from '@/lib/constants/all-icons'
import type { ChangeEvent, MutableRefObject } from 'react'

type HeaderSearchConfig = {
  value: string
  onChange: (value: string) => void
  placeholder: string
}

type IconCustomizationHeaderProps = {
  iconTabs: Array<{ value: IconPickerTab; label: string }>
  activeTab: IconPickerTab
  onTabChange: (tab: IconPickerTab) => void
  onRemoveIcon: () => void
  searchConfig?: HeaderSearchConfig
}

const IconCustomizationHeader = ({
  iconTabs,
  activeTab,
  onTabChange,
  onRemoveIcon,
  searchConfig,
}: IconCustomizationHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 pb-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {iconTabs.map((tab) => {
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => onTabChange(tab.value)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50',
                  isActive
                    ? 'bg-slate-900 text-white shadow'
                    : 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-orange-600'
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={onRemoveIcon}
          className="text-sm font-medium text-rose-500 transition-colors duration-200 hover:text-rose-600"
        >
          Remover
        </button>
      </div>
      {searchConfig ? (
        <div className="w-full">
          <Input
            value={searchConfig.value}
            onChange={(event) => searchConfig.onChange(event.target.value)}
            placeholder={searchConfig.placeholder}
            className="h-10 text-sm"
          />
        </div>
      ) : null}
    </div>
  )
}

type IconCustomizationFooterProps = {
  activeTab: IconPickerTab
  onTabChange: (tab: IconPickerTab) => void
  emojiGroups: EmojiGroup[]
  emojiGroupRefs: MutableRefObject<Record<string, HTMLDivElement | null>>
  iconLibraryFilters: Array<{ value: 'lucide' | 'custom'; label: string }>
  iconLibraryFilter: 'lucide' | 'custom'
  onIconLibraryFilterChange: (value: 'lucide' | 'custom') => void
  iconGroups: IconGroup[]
  iconGroupRefs: MutableRefObject<Record<string, HTMLDivElement | null>>
}

const IconCustomizationFooter = ({
  activeTab,
  onTabChange,
  emojiGroups,
  emojiGroupRefs,
  iconLibraryFilters,
  iconLibraryFilter,
  onIconLibraryFilterChange,
  iconGroups,
  iconGroupRefs,
}: IconCustomizationFooterProps) => {
  if (activeTab === 'emoji' && emojiGroups.length > 0) {
    return (
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          {emojiGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              onClick={() =>
                emojiGroupRefs.current[group.id]?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
              className="rounded-full border border-slate-200 px-3 py-1 font-medium transition-colors duration-200 hover:border-orange-400 hover:text-orange-600"
            >
              {group.label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => onTabChange('custom')}
            className="text-xs font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-500"
          >
            Ir para Personalizado
          </button>
        </div>
      </div>
    )
  }

  if (activeTab === 'icons' && iconGroups.length > 0) {
    return (
      <div className="flex flex-wrap items-center gap-2 pt-4 text-xs text-slate-500">
        {iconLibraryFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onIconLibraryFilterChange(filter.value)}
            className={cn(
              'rounded-full border border-slate-200 px-3 py-1 font-medium transition-colors duration-200 hover:border-orange-400 hover:text-orange-600',
              iconLibraryFilter === filter.value
                ? 'border-orange-400 text-orange-600 shadow-sm'
                : 'text-slate-600'
            )}
          >
            {filter.label}
          </button>
        ))}
        {iconGroups.map((group) => (
          <button
            key={group.id}
            type="button"
            onClick={() =>
              iconGroupRefs.current[group.id]?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }
            className="rounded-full border border-slate-200 px-3 py-1 font-medium transition-colors duration-200 hover:border-orange-400 hover:text-orange-600"
          >
            {group.label}
          </button>
        ))}
      </div>
    )
  }

  return null
}

export interface IconCustomizationBlockProps {
  className?: string
  iconTabs: Array<{ value: IconPickerTab; label: string }>
  activeTab: IconPickerTab
  onTabChange: (tab: IconPickerTab) => void
  onRemoveIcon: () => void
  emojiSearchTerm: string
  onEmojiSearchChange: (value: string) => void
  emojiGroups: EmojiGroup[]
  emojiGroupRefs: MutableRefObject<Record<string, HTMLDivElement | null>>
  onEmojiSelect: (emoji: string) => void
  selectedEmoji: string | null
  iconSearchTerm: string
  onIconSearchChange: (value: string) => void
  iconGroups: IconGroup[]
  iconGroupRefs: MutableRefObject<Record<string, HTMLDivElement | null>>
  iconLibraryFilter: 'lucide' | 'custom'
  onIconLibraryFilterChange: (value: 'lucide' | 'custom') => void
  iconLibraryFilters: Array<{ value: 'lucide' | 'custom'; label: string }>
  design: CategoryDesign
  activeIconName: AllIconNames
  onIconSelect: (icon: AllIconNames) => void
  onSourceChange: (source: CustomIconSource) => void
  formatIconLabel: (icon: AllIconNames) => string
  defaultIconName: AllIconNames
  fileInputRef: React.RefObject<HTMLInputElement | null>
  isProcessingUpload: boolean
  svgUrlInput: string
  onSvgUrlInputChange: (value: string) => void
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  uploadError: string | null
  onUrlApply: () => void
  urlError: string | null
  hasUploadedIcon: boolean
  onClearCustomIcon: () => void
  renderCategoryIcon: (
    design: CategoryDesign,
    options?: RenderIconOptions
  ) => React.ReactElement
  maxSvgFileSizeKb: number
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
  emojiGroupRefs,
  onEmojiSelect,
  selectedEmoji,
  iconSearchTerm,
  onIconSearchChange,
  iconGroups,
  iconGroupRefs,
  iconLibraryFilter,
  onIconLibraryFilterChange,
  iconLibraryFilters,
  design,
  activeIconName,
  onIconSelect,
  onSourceChange,
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
  formatIconLabel,
  defaultIconName,
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

  return (
    <div className={cn('flex flex-col gap-6 rounded-lg bg-white p-4', className)}>
      <IconCustomizationHeader
        iconTabs={iconTabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onRemoveIcon={onRemoveIcon}
        searchConfig={headerSearchConfig}
      />

      {activeTab === 'emoji' && (
        <div className="space-y-4">
          <div className="max-h-[12.5rem] w-full overflow-auto rounded-xl border border-slate-200/70 bg-white/70 p-3 shadow-inner">
            {emojiGroups.length > 0 ? (
              <div className="space-y-5">
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
                    <div className="grid grid-cols-6 gap-3 sm:grid-cols-8 md:grid-cols-10">
                      {group.emojis.map((emoji) => {
                        const isActive = selectedEmoji === emoji
                        return (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => onEmojiSelect(emoji)}
                            aria-pressed={isActive}
                            className={cn(
                              'inline-flex h-10 w-10 items-center justify-center rounded-lg text-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                              isActive
                                ? 'bg-orange-100 text-orange-600 shadow'
                                : 'bg-white text-slate-700 hover:bg-slate-100 hover:scale-105'
                            )}
                          >
                            {emoji}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white text-xs text-slate-500">
                Nenhum emoji encontrado.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'icons' && (
        <div className="space-y-4">
          <div className="max-h-[12.5rem] w-full overflow-auto rounded-xl border border-slate-200/70 bg-white/70 p-3 shadow-inner">
            {iconGroups.length > 0 ? (
              <div className="space-y-5">
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
                    <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-6">
                      {group.icons.map((iconName) => {
                        const isActive =
                          design.customIcon.source === 'none' &&
                          activeIconName === iconName
                        const renderedIcon =
                          renderLibraryIcon(iconName, 20, 'currentColor', 'h-5 w-5') ??
                          renderLibraryIcon(defaultIconName, 20, 'currentColor', 'h-5 w-5') ?? (
                            <TagIcon className="h-5 w-5" size={20} aria-hidden />
                          )

                        return (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => onIconSelect(iconName)}
                            aria-pressed={isActive}
                            className={cn(
                              'group flex aspect-square w-full items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-slate-600 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500',
                              isActive
                                ? 'shadow-md hover:shadow-md'
                                : 'shadow-sm hover:text-orange-600 hover:shadow-lg'
                            )}
                            title={formatIconLabel(iconName)}
                          >
                            {renderedIcon}
                          </button>
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
        <div className="space-y-4">
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
              { value: 'none', label: 'Padrão' },
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
                <p className="text-xs font-medium text-red-500">{uploadError}</p>
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
                  className="h-10 whitespace-nowrap border-slate-300 text-sm font-medium text-slate-700 hover:border-slate-400 hover:text-orange-600"
                >
                  Aplicar
                </Button>
              </div>
              <p className="text-xs text-slate-500">
                Aceitamos apenas URLs HTTPS públicas que terminem em <code>.svg</code>.
              </p>
              {urlError && (
                <p className="text-xs font-medium text-red-500">{urlError}</p>
              )}
            </div>
          )}

          {hasUploadedIcon && (
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white">
                  {renderCategoryIcon(design, {
                    size: 28,
                    className: 'h-7 w-7 text-slate-700',
                  })}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-700">
                    Pré-visualização
                  </span>
                  <span className="text-xs text-slate-500">
                    {design.customIcon.source === 'upload'
                      ? design.customIcon.fileName ?? 'SVG enviado'
                      : design.customIcon.url}
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={onClearCustomIcon}
                className="h-9 border-slate-300 text-xs font-medium text-slate-600 hover:border-red-400 hover:text-red-600"
              >
                Remover ícone personalizado
              </Button>
            </div>
          )}
        </div>
      )}

      <IconCustomizationFooter
        activeTab={activeTab}
        onTabChange={onTabChange}
        emojiGroups={emojiGroups}
        emojiGroupRefs={emojiGroupRefs}
        iconLibraryFilters={iconLibraryFilters}
        iconLibraryFilter={iconLibraryFilter}
        onIconLibraryFilterChange={onIconLibraryFilterChange}
        iconGroups={iconGroups}
        iconGroupRefs={iconGroupRefs}
      />
    </div>
  )
}
