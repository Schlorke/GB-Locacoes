// lib/icon-utils.ts
import {
  ALL_ICONS,
  type AllIconNames,
} from '@/lib/constants/all-icons'

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

export function normalizeIconName(
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

export function formatIconLabel(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function buildIconSearchIndex(name: string): string {
  const label = formatIconLabel(name)
  return `${name} ${label}`.toLowerCase()
}
