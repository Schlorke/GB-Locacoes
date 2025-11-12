'use client'

import { useCallback, useMemo, useRef, useState, type ChangeEvent } from 'react'

import { IconCustomizationBlock } from '@/components/dialogs/icon-customization-block'
import {
  ICON_PICKER_TABS,
  buildEmojiGroups,
  buildIconGroups,
} from '@/components/dialogs/icon-customization-data'
import { useEmojiRecents } from '@/hooks/use-emoji-recents'
import { useIconRecents } from '@/hooks/use-icon-recents'
import { toast } from '@/hooks/use-toast-sonner'
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
import type { AllIconNames } from '@/lib/constants/all-icons'
import { formatIconLabel, normalizeIconName } from '@/lib/icon-utils'

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
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const { recents: iconRecents, addRecentIcon } = useIconRecents()
  const { recents: emojiRecents, addRecentEmoji } = useEmojiRecents()

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
            name: extractNameFromFile(file.name),
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
        name: extractNameFromUrl(value),
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
    setEmojiSearchTerm('')
    setIconSearchTerm('')
  }, [])

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      setDesign((prev) => ({
        ...prev,
        customIcon: {
          source: 'emoji',
          emoji,
        },
      }))
      setActiveIconTab('emoji')
      addRecentEmoji(emoji)
    },
    [addRecentEmoji]
  )

  const handleIconSelect = (iconName: AllIconNames) => {
    const resolved = normalizeIconName(iconName) ?? iconName
    setDesign((prev) => ({
      ...prev,
      icon: resolved,
      customIcon: { ...DEFAULT_CUSTOM_ICON },
    }))
    setActiveIconTab('icons')
    addRecentIcon(resolved)
  }

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
    setEmojiSearchTerm('')
    setIconSearchTerm('')
  }, [])

  const customIconName = design.customIcon.name ?? ''
  const trimmedCustomIconName = customIconName.trim()
  const customIconNameError =
    trimmedCustomIconName.length > MAX_ICON_NAME_LENGTH
      ? 'O nome precisa ter menos que 50 caracteres.'
      : null
  const hasUploadedIcon =
    (design.customIcon.source === 'upload' &&
      Boolean(design.customIcon.dataUrl)) ||
    (design.customIcon.source === 'url' && Boolean(design.customIcon.url))
  const canSaveCustomIcon =
    hasUploadedIcon &&
    (design.customIcon.source === 'upload' ||
      design.customIcon.source === 'url') &&
    trimmedCustomIconName.length > 0 &&
    !customIconNameError

  const handleCustomIconNameChange = useCallback((value: string) => {
    setDesign((prev) => ({
      ...prev,
      customIcon: {
        ...prev.customIcon,
        name: value,
      },
    }))
  }, [])

  const handleCancelCustomIcon = useCallback(() => {
    handleClearCustomIcon()
  }, [handleClearCustomIcon])

  const handleSaveCustomIcon = useCallback(() => {
    if (!canSaveCustomIcon) {
      toast.error('Finalize o upload antes de salvar.', {
        description:
          'Envie um SVG válido ou informe uma URL e defina um nome com até 50 caracteres.',
      })
      return
    }
    const sanitizedName = trimmedCustomIconName
    setDesign((prev) => ({
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
  }, [canSaveCustomIcon, trimmedCustomIconName, setActiveIconTab])

  const selectedEmoji =
    design.customIcon.source === 'emoji'
      ? (design.customIcon.emoji ?? null)
      : null

  const activeIconName = normalizeIconName(design.icon) ?? design.icon

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
            onEmojiSelect={handleEmojiSelect}
            selectedEmoji={selectedEmoji}
            iconSearchTerm={iconSearchTerm}
            onIconSearchChange={setIconSearchTerm}
            iconGroups={activeIconGroups}
            iconNavigationOrder={iconNavigationOrder}
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
            customIconName={customIconName}
            onCustomIconNameChange={handleCustomIconNameChange}
            customIconNameError={customIconNameError}
            onCancelCustomIcon={handleCancelCustomIcon}
            onSaveCustomIcon={handleSaveCustomIcon}
            isSaveDisabled={!canSaveCustomIcon}
          />
        </div>
      </div>
    </div>
  )
}
