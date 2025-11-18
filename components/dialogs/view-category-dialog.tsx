'use client'

import * as LucideIcons from 'lucide-react'
import { Edit, Eye, FileText, Hash, Package, Tag, X } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import {
  DEFAULT_DESIGN,
  renderCategoryIcon as renderCategoryIconWithDesign,
  type CategoryDesign,
} from '@/lib/category-design'
import {
  getCategoryBadgePreview,
  type CategoryBadgeData,
} from '@/lib/utils/category-helpers'

/**
 * DIALOG DE VISUALIZAÇÃO DE CATEGORIA (PROVISÓRIO)
 *
 * Componente provisório para visualizar detalhes de uma categoria existente.
 * Substitui temporariamente o ViewCategoryModal.
 * Permite ver informações completas e navegar para edição.
 */

export interface Category extends CategoryBadgeData {
  id: string
  name: string
  description?: string
  icon?: keyof typeof LucideIcons
  iconColor?: string
  backgroundColor?: string
  fontColor?: string
  createdAt: string
  _count?: {
    equipments: number
  }
  bgColor?: string // Compatibilidade com API
  placement?: 'phases' | 'types' | null // Tab onde a categoria foi salva
  customIcon?: CategoryDesign['customIcon'] | null // Ícone customizado (SVG, emoji, URL)
}

/**
 * Renderiza a prévia do card completo da categoria (botão com gradiente)
 * Similar ao que aparece nos cards da página principal
 */
function renderCategoryCardPreview(category: Category): React.ReactElement {
  // Converter customIcon do banco (JSON) para CustomIconConfig
  let customIcon: CategoryDesign['customIcon'] = {
    ...DEFAULT_DESIGN.customIcon,
  }
  if (category.customIcon) {
    try {
      const parsed =
        typeof category.customIcon === 'string'
          ? JSON.parse(category.customIcon)
          : category.customIcon
      customIcon = parsed as CategoryDesign['customIcon']
    } catch {
      customIcon = { ...DEFAULT_DESIGN.customIcon }
    }
  }

  const design: CategoryDesign = {
    backgroundColor:
      category.backgroundColor ||
      category.bgColor ||
      DEFAULT_DESIGN.backgroundColor,
    fontColor: category.fontColor || DEFAULT_DESIGN.fontColor,
    iconColor: category.iconColor || DEFAULT_DESIGN.iconColor,
    icon: (category.icon as CategoryDesign['icon']) || DEFAULT_DESIGN.icon,
    customIcon,
    placement: category.placement || DEFAULT_DESIGN.placement,
  }

  return (
    <button
      type="button"
      className="group relative flex h-full w-full min-h-[120px] max-h-[120px] flex-col items-center justify-center gap-2.5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 p-2.5 shadow-lg transition-transform duration-300 transform-gpu group-hover:scale-[1.04] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
        {renderCategoryIconWithDesign(design, {
          size: 28,
          className: 'h-7 w-7 flex-shrink-0 text-white',
          color: 'white',
        })}
      </div>
      <span className="relative z-10 text-center text-xs font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-orange-400 whitespace-normal break-words">
        {category.name}
      </span>
    </button>
  )
}

export interface ViewCategoryDialogProps {
  category: Category | null
  isOpen: boolean
  onClose: () => void
  onEdit: (_category: Category) => void
}

export function ViewCategoryDialog({
  category,
  isOpen,
  onClose,
  onEdit,
}: ViewCategoryDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup variant="default">
          <Dialog.Content>
            <Dialog.Header data-dialog-section="header">
              <Dialog.HeaderIcon>
                <Eye className="h-4 w-4" />
              </Dialog.HeaderIcon>
              <Dialog.Title className="text-xl font-semibold text-gray-800">
                Visualizar Categoria
              </Dialog.Title>
              <Dialog.CloseButton aria-label="Fechar dialog" />
            </Dialog.Header>

            <Dialog.Body>
              <Dialog.BodyViewport style={{ scrollbarGutter: 'stable' }}>
                <Dialog.BodyContent>
                  {category && (
                    <>
                      {/* Preview da Categoria */}
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200 shadow-sm relative w-full max-w-full xs:p-3 xs:rounded-md">
                        <div className="flex flex-col items-center justify-center gap-2 text-center text-xs uppercase tracking-wide text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left sm:gap-0 mb-5 md:mb-6">
                          <span>Preview da Categoria</span>
                          <span className="max-w-[10rem] sm:max-w-none sm:text-right">
                            Aba atual:{' '}
                            <span className="block sm:inline">
                              {(category.placement || 'types') === 'phases'
                                ? 'Fases da obra'
                                : 'Tipo de trabalho'}
                            </span>
                          </span>
                        </div>
                        {/* Preview do Card Completo (botão com gradiente) */}
                        <div className="flex justify-center w-full">
                          <div className="w-full max-w-[136px] h-[120px] flex-shrink-0">
                            {renderCategoryCardPreview(category)}
                          </div>
                        </div>
                        {/* Preview da Badge */}
                        <div className="pt-5 flex flex-col items-center gap-4 w-full">
                          <div className="flex justify-center w-full">
                            {getCategoryBadgePreview(
                              {
                                id: category.id,
                                name: category.name,
                                description: category.description,
                                icon: category.icon || null,
                                iconColor: category.iconColor,
                                backgroundColor: category.backgroundColor,
                                bgColor: category.bgColor,
                                fontColor: category.fontColor,
                                customIcon: category.customIcon
                                  ? typeof category.customIcon === 'string'
                                    ? JSON.parse(category.customIcon)
                                    : category.customIcon
                                  : null,
                              },
                              'md',
                              true
                            )}
                          </div>
                          <p className="text-xs text-slate-500 italic max-w-xs mx-auto leading-relaxed text-center">
                            {category.description || 'Sem descrição'}
                          </p>
                        </div>
                      </div>

                      {/* Informações Detalhadas */}
                      <div className="space-y-4 w-full max-w-full">
                        <div
                          className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm relative"
                          style={{
                            borderLeft: `4px solid ${category.bgColor || category.backgroundColor || '#3b82f6'}`,
                          }}
                        >
                          <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Informações da Categoria
                          </h3>
                          <div className="grid grid-cols-2 gap-4 max-w-full">
                            {/* Coluna Esquerda */}
                            <div className="space-y-4 min-w-0 max-w-full">
                              <div className="flex items-center gap-3">
                                <Tag className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="text-xs text-gray-500">
                                    Nome
                                  </div>
                                  <div className="font-medium text-sm">
                                    {category.name}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-start gap-3">
                                <FileText className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                                <div className="flex-1 min-w-0 max-w-full">
                                  <div className="text-xs text-gray-500">
                                    Descrição
                                  </div>
                                  <div
                                    className="font-medium text-sm break-words hyphens-auto leading-relaxed overflow-wrap-anywhere"
                                    title={
                                      category.description || 'Sem descrição'
                                    }
                                  >
                                    {category.description || 'Sem descrição'}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Coluna Direita */}
                            <div className="space-y-4 min-w-0 max-w-full">
                              <div className="flex items-center gap-3">
                                <Package className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="text-xs text-gray-500">
                                    Equipamentos
                                  </div>
                                  <div className="font-medium text-sm">
                                    {category._count?.equipments || 0}{' '}
                                    equipamentos
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <Hash className="w-4 h-4 text-gray-400" />
                                <div>
                                  <div className="text-xs text-gray-500">
                                    ID da Categoria
                                  </div>
                                  <div className="font-medium font-mono text-xs text-slate-600">
                                    {category.id}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </Dialog.BodyContent>
              </Dialog.BodyViewport>
            </Dialog.Body>

            <Dialog.Footer data-dialog-section="footer">
              <div className="flex gap-4 w-full xs:gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 h-10 rounded-lg border border-slate-200 hover:bg-slate-50 bg-transparent shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Fechar
                </Button>
                <Button
                  onClick={() => {
                    if (category) {
                      onClose()
                      onEdit(category)
                    }
                  }}
                  className="flex-1 h-10 bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Categoria
                </Button>
              </div>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
