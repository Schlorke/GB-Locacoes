'use client'

import { useCallback, useMemo, useRef, useState, type ChangeEvent } from 'react'

import { IconCustomizationBlock } from '@/components/dialogs/icon-customization-block'
import {
  CUSTOM_ICON_GROUPS,
  EMOJI_GROUPS,
  ICON_LIBRARY_FILTERS,
  ICON_PICKER_TABS,
  LUCIDE_ICON_GROUPS,
} from '@/components/dialogs/icon-customization-data'
import {
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
import { isCustomIcon, type AllIconNames } from '@/lib/constants/all-icons'
import {
  buildIconSearchIndex,
  formatIconLabel,
  normalizeIconName,
} from '@/lib/icon-utils'

export default function IconCustomizationPlayground() {
  const [design, setDesign] = useState<CategoryDesign>(() =>
    cloneDesign(DEFAULT_DESIGN)
  )
  const [emojiSearchTerm, setEmojiSearchTerm] = useState('')
  const [iconSearchTerm, setIconSearchTerm] = useState('')
  const [svgUrlInput, setSvgUrlInput] = useState('')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [urlError, setUrlError] = useState<string | null>(null)
  const [isProcessingUpload, setProcessingUpload] = useState(false)
  const [activeIconTab, setActiveIconTab] = useState<
    'emoji' | 'icons' | 'custom'
  >('icons')
  const [iconLibraryFilter, setIconLibraryFilter] = useState<
    'lucide' | 'custom'
  >('lucide')

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
    design.customIcon.source === 'emoji'
      ? (design.customIcon.emoji ?? null)
      : null

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

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mx-auto flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-[404px]">
          <IconCustomizationBlock
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
        </div>
      </div>
    </div>
  )
}
