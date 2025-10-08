'use client'

import * as LucideIcons from 'lucide-react'
import { Edit, Eye, FileText, Hash, Package, Tag, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  getCategoryBadgePreview,
  type CategoryBadgeData,
} from '@/lib/utils/category-helpers'

/**
 * MODAL DE VISUALIZAÇÃO DE CATEGORIA
 *
 * Componente para visualizar detalhes de uma categoria existente.
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
}

export interface ViewCategoryModalProps {
  category: Category | null
  isOpen: boolean
  onClose: () => void
  onEdit: (_category: Category) => void
}

export function ViewCategoryModal({
  category,
  isOpen,
  onClose,
  onEdit,
}: ViewCategoryModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        closeButtonClassName="hover:bg-white"
        className="w-full max-w-lg max-h-[80vh] p-0 gap-0 bg-white border-0 shadow-2xl rounded-2xl overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed !left-[50%] !top-[50%] z-50 flex flex-col !translate-x-[-50%] !translate-y-[-50%] !m-0 xs:max-w-[98vw] xs:p-0 xs:px-3"
        style={{
          height: '60vh',
          maxHeight: '80vh',
        }}
      >
        <DialogHeader className="p-6 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-2xl flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Eye className="w-4 h-4" />
            </div>
            Visualizar Categoria
          </DialogTitle>
        </DialogHeader>

        <div
          className="flex-1 min-h-0 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-50"
          style={{ maxHeight: 'calc(80vh - 120px)' }}
        >
          <div className="p-6 space-y-6 xs:p-4 xs:space-y-4 w-full max-w-full">
            {category && (
              <>
                {/* Preview da Categoria */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200 shadow-sm relative w-full max-w-full xs:p-3 xs:rounded-md">
                  <div className="flex items-center justify-between mb-4 w-full">
                    <h3 className="text-sm font-semibold text-slate-700">
                      Preview da Categoria
                    </h3>
                  </div>
                  <div className="flex justify-center mb-4 w-full">
                    {getCategoryBadgePreview(category, 'md', true)}
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 italic max-w-xs mx-auto leading-relaxed">
                      {category.description || 'Sem descrição'}
                    </p>
                  </div>
                </div>

                {/* Informações Detalhadas */}
                <div className="space-y-4 w-full max-w-full">
                  <div
                    className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm relative"
                    style={{
                      borderLeft: `4px solid ${category.bgColor || '#3b82f6'}`,
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
                            <div className="text-xs text-gray-500">Nome</div>
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
                              title={category.description || 'Sem descrição'}
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
                              {category._count?.equipments || 0} equipamentos
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
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 border-t bg-gray-50 rounded-b-2xl xs:p-4 xs:rounded-b-md w-full max-w-full flex-shrink-0">
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
