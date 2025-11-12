// lib/category-design.tsx
import type { ReactElement } from 'react'

import {
  renderIcon as renderLibraryIcon,
  type AllIconNames,
} from '@/lib/constants/all-icons'
import { cn } from '@/lib/utils'
import { Tag as TagIcon } from 'lucide-react'

import { normalizeIconName } from '@/lib/icon-utils'

export type CategoryDialogMode = 'create' | 'edit'
export type CategoryPlacement = 'phases' | 'types'
export type CustomIconSource = 'none' | 'upload' | 'url' | 'emoji'

export interface CustomIconConfig {
  source: CustomIconSource
  svgContent?: string
  dataUrl?: string
  fileName?: string
  url?: string
  emoji?: string | null
}

export interface CategoryDetails {
  name: string
  description: string
}

export interface CategoryDesign {
  backgroundColor: string
  fontColor: string
  iconColor: string
  icon: AllIconNames
  customIcon: CustomIconConfig
  placement: CategoryPlacement
}

export const MAX_SVG_FILE_SIZE_KB = 64

export const DEFAULT_ICON = 'Tag' as AllIconNames

export const DEFAULT_CUSTOM_ICON: CustomIconConfig = {
  source: 'none',
  svgContent: undefined,
  dataUrl: undefined,
  fileName: undefined,
  url: undefined,
  emoji: null,
}

export const DEFAULT_DESIGN: CategoryDesign = {
  backgroundColor: '#3b82f6',
  fontColor: '#ffffff',
  iconColor: '#ffffff',
  icon: DEFAULT_ICON,
  customIcon: { ...DEFAULT_CUSTOM_ICON },
  placement: 'types',
}

export const CATEGORY_PREVIEW_TABS: ReadonlyArray<{
  value: CategoryPlacement
  label: string
}> = [
  { value: 'phases', label: 'Fases da obra' },
  { value: 'types', label: 'Tipo de trabalho' },
]

export type RenderIconOptions = {
  size?: number
  className?: string
  color?: string
}

export function cloneDesign(design: CategoryDesign): CategoryDesign {
  return {
    ...design,
    icon: design.icon,
    customIcon: { ...design.customIcon },
  }
}

export function sanitizeSvg(raw: string): string | null {
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

export function svgToDataUrl(svg: string): string {
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

export function isValidSvgFile(file: File) {
  const isSvg =
    file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')
  const isUnderLimit = file.size <= MAX_SVG_FILE_SIZE_KB * 1024
  return isSvg && isUnderLimit
}

export function isValidSvgUrl(value: string) {
  try {
    const parsed = new URL(value)
    const isHttp = parsed.protocol === 'https:' || parsed.protocol === 'http:'
    const endsWithSvg = parsed.pathname.toLowerCase().endsWith('.svg')
    return isHttp && endsWithSvg
  } catch (_error) {
    return false
  }
}

export function renderCategoryIcon(
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

  if (customIcon.source === 'emoji' && customIcon.emoji) {
    return (
      <span
        aria-hidden
        className={cn(
          'flex h-full w-full items-center justify-center text-3xl',
          className
        )}
        style={{ fontSize: size * 0.9, lineHeight: 1 }}
      >
        {customIcon.emoji}
      </span>
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
