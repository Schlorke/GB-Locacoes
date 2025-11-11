"use client"

import { useCallback, useMemo, useRef, useState, type ChangeEvent } from 'react'

import { IconCustomizationBlock } from '@/components/dialogs/icon-customization-block'
import {
  CUSTOM_ICON_GROUPS,
  EMOJI_GROUPS,
  ICON_LIBRARY_FILTERS,
  ICON_PICKER_TABS,
  LUCIDE_ICON_GROUPS,
} from '@/components/dialogs/icon-customization-data'
import { Button } from '@/components/ui/button'
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
  type CustomIconSource,
} from '@/lib/category-design'
import {
  buildIconSearchIndex,
  formatIconLabel,
  normalizeIconName,
} from '@/lib/icon-utils'
import { isCustomIcon, type AllIconNames } from '@/lib/constants/all-icons'

const CARD_CLASSES =
  'rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-sm'

export default function IconCustomizationPlayground() {
  const [design, setDesign] = useState<CategoryDesign>(() => cloneDesign(DEFAULT_DESIGN))
  const [emojiSearchTerm, setEmojiSearchTerm] = useState('')
  const [iconSearchTerm, setIconSearchTerm] = useState('')
  const [svgUrlInput, setSvgUrlInput] = useState('')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [urlError, setUrlError] = useState<string | null>(null)
  const [isProcessingUpload, setProcessingUpload] = useState(false)
  const [activeIconTab, setActiveIconTab] = useState<'emoji' | 'icons' | 'custom'>(
    'icons'
  )
  const [iconLibraryFilter, setIconLibraryFilter] = useState<'lucide' | 'custom'>(
    'lucide'
  )

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const emojiGroupRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const iconGroupRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const handleSourceChange = useCallback((source: CustomIconSource) => {
    setDesign((prev) => ({
      ...prev,
      customIcon: {
        ...prev.customIcon,
        source,
        emoji: null,
      },
    }))
    setUploadError(null)
    setUrlError(null)
    if (source !== 'url') {
      setSvgUrlInput('')
    }
    if (source === 'emoji') {
      setActiveIconTab('emoji')
    }
  }, [])

  const handleFileInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      if (!isValidSvgFile(file)) {
        setUploadError('Use um arquivo SVG com até 64kb.')
        return
      }

      setProcessingUpload(true)
      setUploadError(null)

      try {
        const text = await file.text()
        const sanitized = sanitizeSvg(text)

        if (!sanitized) {
          setUploadError('Não foi possível ler o SVG enviado.')
          return
        }

        const dataUrl = svgToDataUrl(sanitized)
        setDesign((prev) => ({
          ...prev,
          customIcon: {
            source: 'upload',
            svgContent: sanitized,
            dataUrl,
            fileName: file.name,
          },
        }))
        setActiveIconTab('custom')
      } finally {
        setProcessingUpload(false)
      }
    },
    []
  )

  const handleUrlApply = useCallback(() => {
    const value = svgUrlInput.trim()
    if (!value) {
      setUrlError('Informe uma URL válida para o ícone SVG.')
      return
    }

    if (!isValidSvgUrl(value)) {
      setUrlError('Use uma URL https:// que termine em .svg.')
      return
    }

    setDesign((prev) => ({
      ...prev,
      customIcon: {
        source: 'url',
        url: value,
      },
    }))

    setUploadError(null)
    setUrlError(null)
    setActiveIconTab('custom')
  }, [svgUrlInput])

  const handleClearCustomIcon = useCallback(() => {
    setDesign((prev) => ({
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
  }, [])

  const handleEmojiSelect = useCallback((emoji: string) => {
    setDesign((prev) => ({
      ...prev,
      customIcon: {
        source: 'emoji',
        emoji,
      },
    }))
    setActiveIconTab('emoji')
  }, [])

  const handleIconSelect = useCallback((iconName: AllIconNames) => {
    const resolved = normalizeIconName(iconName) ?? iconName
    setDesign((prev) => ({
      ...prev,
      icon: resolved,
      customIcon: { ...DEFAULT_CUSTOM_ICON },
    }))
    setActiveIconTab('icons')
  }, [])

  const handleRemoveIcon = useCallback(() => {
    setDesign((prev) => ({
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
  }, [])

  const hasUploadedIcon =
    design.customIcon.source === 'upload' || design.customIcon.source === 'url'

  const selectedEmoji =
    design.customIcon.source === 'emoji' ? design.customIcon.emoji ?? null : null

  const activeIconName = normalizeIconName(design.icon) ?? design.icon

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

  const resolvedCategoryName = 'Categoria Sandbox'

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900">
            Playground de Ícones & Emojis
          </h1>
          <p className="max-w-3xl text-sm text-slate-600">
            Ajuste as propriedades do componente <code>IconCustomizationBlock</code> em uma folha de rascunho dedicada.
          </p>
        </header>

        <section className={CARD_CLASSES}>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wide text-slate-500">
            <span>Pré-visualização</span>
            <div className="flex items-center gap-2">
              {CATEGORY_PREVIEW_TABS.map((tab) => (
                <Button
                  key={tab.value}
                  type="button"
                  size="sm"
                  variant={design.placement === tab.value ? 'default' : 'outline'}
                  onClick={() =>
                    setDesign((prev) =>
                      prev.placement === tab.value
                        ? prev
                        : {
                            ...prev,
                            placement: tab.value,
                          }
                    )
                  }
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 p-2.5 shadow-lg">
              {renderCategoryIcon(design, {
                size: 32,
                className: 'h-8 w-8 text-white',
              })}
            </div>
            <div
              className="inline-flex items-center gap-2 rounded-xl border-0 px-4 py-2 text-xs font-medium shadow-[4px_8px_18px_2px_rgba(0,0,0,0.18)]"
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
              <span className="truncate">{resolvedCategoryName}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
            <h3 className="text-sm font-semibold text-slate-800">Cores</h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <label className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
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
                <label className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                  <span
                    className="absolute inset-1.5 shadow-inner"
                    style={{ backgroundColor: design.backgroundColor }}
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
                <label className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
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
          </div>

          <IconCustomizationBlock
            className="mt-8"
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
            design={design}
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
      </div>
    </div>
  )
}
