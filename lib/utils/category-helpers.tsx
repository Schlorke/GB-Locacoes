'use client'

/**
 * HELPERS DE CATEGORIA
 *
 * Funções utilitárias reutilizáveis para renderização e manipulação
 * de elementos relacionados a categorias em todo o projeto.
 *
 * @author GB-Locações Team
 */

import * as LucideIcons from 'lucide-react'
import { Tag } from 'lucide-react'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { CategoryDesign, CustomIconConfig } from '@/lib/category-design'
import { renderCategoryIcon as renderCategoryIconFromDesign } from '@/lib/category-design'

/**
 * Interface para dados básicos de categoria
 * Compatível com tanto Category do Prisma quanto CategoryData do modal
 */
export interface CategoryBadgeData {
  id?: string
  name: string
  description?: string
  icon?: keyof typeof LucideIcons | null
  iconColor?: string
  backgroundColor?: string
  bgColor?: string // Compatibilidade com API
  fontColor?: string
  customIcon?: CustomIconConfig | null // Ícone customizado (SVG, emoji, URL)
}

/**
 * Renderiza um ícone Lucide dinamicamente
 *
 * @param icon - Nome do ícone do Lucide React
 * @param size - Tamanho do ícone em pixels (padrão: 20)
 * @param color - Cor do ícone em CSS (hex, rgb, etc)
 * @returns Componente React do ícone ou null se não encontrado
 *
 * @example
 * ```tsx
 * {renderLucideIcon('Package', 24, '#3b82f6')}
 * ```
 */
export function renderLucideIcon(
  icon?: keyof typeof LucideIcons | null,
  size: number = 20,
  color?: string
): React.ReactElement | null {
  if (!icon || !LucideIcons[icon]) return null

  const IconComponent = LucideIcons[icon] as React.ComponentType<{
    size?: number
    color?: string
    className?: string
  }>

  return <IconComponent size={size} color={color} className="flex-shrink-0" />
}

/**
 * Renderiza um ícone de categoria com fallback
 *
 * @param iconName - Nome do ícone (opcional)
 * @param color - Cor do ícone (opcional, padrão: #3b82f6)
 * @param size - Tamanho do ícone (padrão: 16)
 * @returns Componente do ícone ou ícone de fallback (Tag)
 *
 * @example
 * ```tsx
 * {renderCategoryIcon('Hammer', '#ea580c', 20)}
 * ```
 */
export function renderCategoryIcon(
  iconName?: keyof typeof LucideIcons | null,
  color?: string,
  size: number = 16
): React.ReactElement {
  if (!iconName) {
    return <Tag className="h-4 w-4 text-gray-400 flex-shrink-0" />
  }

  return (
    renderLucideIcon(iconName, size, color || '#3b82f6') || (
      <Tag className="h-4 w-4 text-gray-400 flex-shrink-0" />
    )
  )
}

/**
 * Variantes de tamanho para badges de categoria
 */
export const BADGE_SIZES = {
  xs: {
    text: 'text-[10px]',
    padding: 'px-2 py-1',
    rounded: 'rounded-md',
    gap: 'gap-1',
    icon: 12,
  },
  sm: {
    text: 'text-xs',
    padding: 'px-3 py-1.5',
    rounded: 'rounded-lg',
    gap: 'gap-1.5',
    icon: 14,
  },
  md: {
    text: 'text-sm',
    padding: 'px-4 py-2',
    rounded: 'rounded-2xl',
    gap: 'gap-2',
    icon: 16,
  },
  lg: {
    text: 'text-sm',
    padding: 'px-6 py-3',
    rounded: 'rounded-2xl',
    gap: 'gap-3',
    icon: 18,
  },
} as const

export type BadgeSize = keyof typeof BADGE_SIZES

/**
 * Cria um badge preview de categoria com estilos dinâmicos
 *
 * @param category - Dados da categoria
 * @param size - Tamanho do badge (padrão: 'md')
 * @param hover - Se deve ter efeitos de hover (padrão: true)
 * @returns Componente Badge estilizado com cores e ícone da categoria
 *
 * @example
 * ```tsx
 * {getCategoryBadgePreview(categoria, 'lg', true)}
 * ```
 */
export function getCategoryBadgePreview(
  category: CategoryBadgeData,
  size: BadgeSize = 'md',
  hover: boolean = true
): React.ReactElement {
  const sizeConfig = BADGE_SIZES[size]

  // Criar CategoryDesign para usar renderCategoryIcon que suporta custom icons
  const design: CategoryDesign = {
    backgroundColor: category.backgroundColor || category.bgColor || '#e0e7ff',
    fontColor: category.fontColor || '#1e40af',
    iconColor: category.iconColor || '#3b82f6',
    icon: (category.icon as CategoryDesign['icon']) || 'Tag',
    customIcon: category.customIcon || { source: 'none' },
    placement: 'types',
  }

  // Verificar se há ícone para renderizar (Lucide ou custom)
  const hasIcon =
    category.icon ||
    (category.customIcon && category.customIcon.source !== 'none')

  return (
    <Badge
      variant="outline"
      className={cn(
        // Base styles
        'inline-flex items-center font-medium border-0 max-w-full transition-all duration-300',

        // Size-specific
        sizeConfig.text,
        sizeConfig.padding,
        sizeConfig.rounded,
        sizeConfig.gap,

        // Hover effects (opcional)
        hover && [
          'shadow-[4px_8px_18px_2px_rgba(0,0,0,0.18)]',
          'hover:shadow-[8px_12px_20px_2px_rgba(0,0,0,0.22)]',
          'hover:scale-[1.07]',
        ]
      )}
      style={{
        backgroundColor: design.backgroundColor,
        color: design.fontColor,
      }}
    >
      {hasIcon && (
        <span className="flex-shrink-0">
          {renderCategoryIconFromDesign(design, {
            size: sizeConfig.icon,
            color: design.iconColor,
          })}
        </span>
      )}
      <span className="truncate font-semibold min-w-0">{category.name}</span>
    </Badge>
  )
}

/**
 * Configurações padrão para novas categorias
 */
export const DEFAULT_CATEGORY_SETTINGS = {
  backgroundColor: '#3b82f6', // Blue-500
  fontColor: '#ffffff',
  iconColor: '#ffffff',
  icon: undefined as keyof typeof LucideIcons | undefined,
} as const

/**
 * Cores predefinidas populares para categorias
 * Baseadas na paleta Tailwind CSS
 */
export const POPULAR_CATEGORY_COLORS = {
  backgrounds: [
    '#3b82f6', // blue-500
    '#ea580c', // orange-600 (cor principal GB-Locações)
    '#10b981', // emerald-500
    '#8b5cf6', // violet-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
    '#ec4899', // pink-500
    '#6366f1', // indigo-500
  ],
  texts: [
    '#ffffff', // white
    '#000000', // black
    '#1e293b', // slate-800
    '#374151', // gray-700
  ],
} as const

/**
 * Valida se um ícone existe no Lucide React
 *
 * @param iconName - Nome do ícone a ser validado
 * @returns true se o ícone existe, false caso contrário
 */
export function isValidLucideIcon(
  iconName: string
): iconName is keyof typeof LucideIcons {
  return iconName in LucideIcons
}

/**
 * Filtra ícones por termo de busca
 *
 * @param searchTerm - Termo de busca
 * @param icons - Lista de ícones para filtrar (opcional)
 * @returns Array de ícones filtrados
 *
 * @example
 * ```tsx
 * const filteredIcons = filterIconsBySearch('hammer', AVAILABLE_CATEGORY_ICONS)
 * ```
 */
export function filterIconsBySearch(
  searchTerm: string,
  icons: ReadonlyArray<keyof typeof LucideIcons>
): Array<keyof typeof LucideIcons> {
  if (!searchTerm.trim()) return [...icons]

  const term = searchTerm.toLowerCase()
  return icons.filter((iconName) => iconName.toLowerCase().includes(term))
}
