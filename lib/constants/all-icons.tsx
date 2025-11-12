/**
 * SISTEMA UNIFICADO DE ÍCONES
 *
 * Combina ícones Lucide com ícones customizados SVG
 * para uso no sistema de categorias e em todo o projeto.
 *
 * @author GB-Locações Team
 */

import { CUSTOM_ICONS, type CustomIconName } from '@/components/icons/custom'
import * as LucideIcons from 'lucide-react'
import React from 'react'
import { AVAILABLE_CATEGORY_ICONS } from './lucide-icons'

/**
 * Todos os ícones disponíveis no projeto
 * (Lucide + Customizados)
 */
export const ALL_ICONS = {
  ...LucideIcons,
  ...CUSTOM_ICONS,
} as const

export type AllIconNames = keyof typeof LucideIcons | CustomIconName

/**
 * Lista completa de ícones disponíveis para categorias
 * Inclui ícones Lucide pré-selecionados + ícones customizados
 */
export const ALL_AVAILABLE_ICONS: ReadonlyArray<AllIconNames> = [
  ...AVAILABLE_CATEGORY_ICONS,
  ...Object.keys(CUSTOM_ICONS),
] as AllIconNames[]

/**
 * Verifica se um ícone é customizado ou do Lucide
 */
export function isCustomIcon(iconName: string): iconName is CustomIconName {
  return iconName in CUSTOM_ICONS
}

/**
 * Renderiza qualquer ícone (Lucide ou customizado)
 */
export function renderIcon(
  iconName: AllIconNames,
  size: number = 24,
  color: string = 'currentColor',
  className?: string
): React.ReactElement | null {
  if (isCustomIcon(iconName)) {
    const CustomIcon = CUSTOM_ICONS[iconName]
    return <CustomIcon size={size} color={color} className={className} />
  }

  // Ícone Lucide
  const LucideIcon = LucideIcons[
    iconName as keyof typeof LucideIcons
  ] as React.ComponentType<{
    size?: number
    color?: string
    className?: string
  }>

  if (!LucideIcon) return null

  return <LucideIcon size={size} color={color} className={className} />
}

/**
 * Categorias de ícones customizados
 * Útil para organizar a UI de seleção
 */
export const CUSTOM_ICONS_CATEGORY = {
  name: 'Ícones Personalizados',
  icons: Object.keys(CUSTOM_ICONS) as CustomIconName[],
} as const
