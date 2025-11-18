'use client'

import {
  CategoryDialogModal,
  type CategoryData as DialogCategoryData,
} from '@/components/dialogs/category-dialog'
import { ViewCategoryDialog } from '@/components/dialogs/view-category-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { SmartPagination } from '@/components/ui/smart-pagination'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  DEFAULT_DESIGN,
  renderCategoryIcon,
  type CategoryDesign,
} from '@/lib/category-design'
import { getCategoryBadgePreview } from '@/lib/utils/category-helpers'
import { AnimatePresence, motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { Edit, Eye, Package, Plus, Search, Tag, Trash2 } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Category {
  id: string
  name: string
  description?: string
  icon?: keyof typeof LucideIcons
  iconColor?: string
  backgroundColor?: string // Renomeado para compatibilidade com TagData
  fontColor?: string
  placement?: 'phases' | 'types' | null
  customIcon?: CategoryDesign['customIcon'] | null
  createdAt: string
  _count?: {
    equipments: number
  }
  // Mantém compatibilidade com API existente
  bgColor?: string
}

const ITEMS_PER_PAGE = 9

/**
 * Renderiza a prévia do card completo da categoria (botão com gradiente)
 * Similar ao que aparece no dialog de visualização
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
        {renderCategoryIcon(design, {
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

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageKey, setPageKey] = useState(0) // Key para forçar re-render com animação

  // Novo estado para o CategoryDialogModal
  const [isModernModalOpen, setIsModernModalOpen] = useState(false)
  const [editingCategoryData, setEditingCategoryData] =
    useState<DialogCategoryData | null>(null)

  const isMobile = useIsMobile()

  // Função para converter Category para DialogCategoryData (com design)
  const categoryToDialogCategoryData = (
    category: Category
  ): DialogCategoryData => {
    // Converter customIcon do banco (JSON) para CustomIconConfig
    let customIcon: CategoryDesign['customIcon'] = {
      ...DEFAULT_DESIGN.customIcon,
    }
    if (category.customIcon) {
      try {
        // Se já é um objeto, usar diretamente; se é JSON string, fazer parse
        const parsed =
          typeof category.customIcon === 'string'
            ? JSON.parse(category.customIcon)
            : category.customIcon
        customIcon = parsed as CategoryDesign['customIcon']
      } catch {
        // Se falhar, usar default
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

    return {
      id: category.id,
      name: category.name,
      description: category.description || '',
      design,
    }
  }

  // Função para converter DialogCategoryData para payload da API
  const dialogCategoryDataToApiPayload = (
    data: DialogCategoryData
  ): {
    name: string
    description: string
    bgColor: string
    backgroundColor: string
    fontColor: string
    iconColor: string
    icon: keyof typeof LucideIcons | null
    placement: 'phases' | 'types' | null
    customIcon: CategoryDesign['customIcon'] | null
  } => {
    return {
      name: data.name,
      description: data.description,
      bgColor: data.design.backgroundColor,
      backgroundColor: data.design.backgroundColor,
      fontColor: data.design.fontColor,
      iconColor: data.design.iconColor,
      icon:
        data.design.customIcon.source === 'none'
          ? (data.design.icon as keyof typeof LucideIcons) || null
          : null,
      placement: data.design.placement || null,
      customIcon:
        data.design.customIcon.source !== 'none'
          ? data.design.customIcon
          : null,
    }
  }

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/categories')
      const data = await response.json()

      const categoriesArray = Array.isArray(data)
        ? data
        : data?.categories || []

      setCategories(categoriesArray)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Erro', {
        description: 'Erro ao carregar categorias. Tente novamente.',
      })
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [])

  const filterCategories = useCallback(() => {
    if (!Array.isArray(categories)) {
      setFilteredCategories([])
      return
    }

    const filtered = categories.filter((category: Category) => {
      const matchesSearch =
        category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesSearch
    })

    // Ordenar alfabeticamente por nome
    const sorted = filtered.sort((a, b) => {
      const nameA = (a.name || '').toLowerCase()
      const nameB = (b.name || '').toLowerCase()
      return nameA.localeCompare(nameB, 'pt-BR')
    })

    setFilteredCategories(sorted)
  }, [categories, searchTerm])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    filterCategories()
  }, [categories, searchTerm, filterCategories])

  // Fechar botões ao clicar fora em mobile
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobile && activeCardId) {
        setActiveCardId(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobile, activeCardId])

  useEffect(() => {
    setCurrentPage(1)
    setPageKey((prev) => prev + 1) // Reset pageKey quando filtros mudam
  }, [searchTerm])

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE)
  const effectiveCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1
  const startIndex = (effectiveCurrentPage - 1) * ITEMS_PER_PAGE
  const paginatedCategories = Array.isArray(filteredCategories)
    ? filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : []

  useEffect(() => {
    if (currentPage !== effectiveCurrentPage) {
      setCurrentPage(effectiveCurrentPage)
    }
  }, [currentPage, effectiveCurrentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setPageKey((prev) => prev + 1) // Incrementa para forçar re-render com animação
    // Delay no scroll para permitir que a animação de saída termine
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  // Novas funções para o CategoryDialogModal
  const openNewCategoryModal = () => {
    setEditingCategoryData(null)
    setIsModernModalOpen(true)
  }

  const openEditCategoryModal = (category: Category) => {
    setEditingCategoryData(categoryToDialogCategoryData(category))
    setIsModernModalOpen(true)
  }

  const handleCategorySave = async (categoryData: DialogCategoryData) => {
    const isEditing = !!editingCategoryData?.id
    const url = isEditing
      ? `/api/admin/categories/${editingCategoryData.id}`
      : '/api/admin/categories'
    const method = isEditing ? 'PUT' : 'POST'

    // Converte para o formato esperado pela API
    const categoryPayload = dialogCategoryDataToApiPayload(categoryData)

    // Corrige para garantir que icon: null seja enviado ao remover ícone
    const finalPayload = {
      ...categoryPayload,
      icon:
        categoryPayload.icon === undefined || categoryPayload.icon === null
          ? null
          : categoryPayload.icon,
    }

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalPayload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      if (response.status === 409) {
        throw new Error('Categoria já existente')
      } else {
        throw new Error(errorData.error || 'Erro ao salvar categoria')
      }
    }

    // Recarrega as categorias
    await fetchCategories()

    toast.success('Sucesso!', {
      description: isEditing
        ? 'Categoria atualizada com sucesso.'
        : 'Categoria criada com sucesso.',
    })
  }

  // Handler para onStateChange do dialog (necessário para CategoryDialogModal)
  const handleDialogStateChange = useCallback(
    (_key: string, _isOpen: boolean) => {
      // Pode ser usado para rastrear estados de dialogs aninhadas se necessário
    },
    []
  )

  const deleteCategory = async (categoryId: string) => {
    if (
      !confirm(
        'Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.'
      )
    )
      return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        toast.success('Categoria Excluída!', {
          description: 'Categoria excluída com sucesso.',
        })
        fetchCategories()
      } else {
        const errorData = await response.json()
        toast.error('Erro', {
          description: errorData.error || 'Erro ao excluir categoria.',
        })
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Erro', { description: 'Erro ao excluir categoria.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 pb-24 md:pb-12 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            {/* Clean depth layers without decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-500/6 to-orange-700/8"></div>

            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">
                Gerenciar Categorias
              </h1>
              <p className="text-orange-50 mb-4 font-medium">
                Organize e gerencie as categorias de equipamentos
              </p>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <Tag className="w-5 h-5 text-orange-50" />
                <span className="font-semibold text-white">
                  {Array.isArray(filteredCategories)
                    ? filteredCategories.length
                    : 0}{' '}
                  categorias encontradas
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filtros e Ações */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
            {/* Clean depth layers for filter card */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

            <CardContent className="relative z-10 p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar categorias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <Button
                  onClick={openNewCategoryModal}
                  className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 h-10 px-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Categoria
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grid de Categorias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {!Array.isArray(filteredCategories) ||
          filteredCategories.length === 0 ? (
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              {/* Clean depth layers for empty state card */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardContent className="relative z-10 text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Tag className="w-12 h-12 mx-auto mb-3" />
                  <p className="text-lg font-medium">
                    Nenhuma categoria encontrada
                  </p>
                  <p className="text-sm">
                    {searchTerm
                      ? 'Tente ajustar os filtros de busca'
                      : 'Crie sua primeira categoria para organizar os equipamentos'}
                  </p>
                </div>
                {!searchTerm && (
                  <Button
                    onClick={openNewCategoryModal}
                    className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-all duration-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeira Categoria
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="wait">
                  {paginatedCategories.map((category, index) => (
                    <motion.div
                      key={`${category.id}-${pageKey}`}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                      className="group h-full"
                      onClick={() => {
                        if (isMobile) {
                          setActiveCardId(
                            activeCardId === category.id ? null : category.id
                          )
                        }
                      }}
                    >
                      <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col h-full">
                        {/* Clean depth layers for category card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

                        <CardHeader className="relative z-10 pb-3 flex-shrink-0">
                          <div className="flex flex-col">
                            {/* Preview do Botão Completo (card com gradiente) */}
                            <div className="w-full flex justify-center pb-4 pt-0">
                              <div className="w-full max-w-[136px] h-[120px] flex-shrink-0">
                                {renderCategoryCardPreview(category)}
                              </div>
                            </div>
                            {/* Preview da Badge */}
                            <div className="w-full flex justify-center pb-4">
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
                            {/* Descrição centralizada */}
                            <div className="w-full text-center">
                              <p
                                className="text-sm text-gray-500 mt-1 line-clamp-4 cursor-default"
                                title={category.description || 'Sem descrição'}
                              >
                                {category.description || 'Sem descrição'}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="relative z-10 pt-8 flex-1 flex flex-col justify-end">
                          <div className="space-y-3">
                            {/* Linha 1: Equipamentos (sempre à esquerda) */}
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Package className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">
                                {category._count?.equipments || 0} equipamentos
                              </span>
                            </div>

                            {/* Linha 2: Botões de ação (à direita em mobile, à direita em desktop) */}
                            <div
                              className={`flex items-center justify-end gap-1 transition-all duration-300 ${
                                isMobile
                                  ? activeCardId === category.id
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                  : 'opacity-0 group-hover:opacity-100'
                              }`}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setSelectedCategory(category)
                                }}
                                className="admin-action-button view-button flex-shrink-0"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openEditCategoryModal(category)
                                }}
                                className="admin-action-button edit-button flex-shrink-0"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteCategory(category.id)
                                }}
                                disabled={
                                  (category._count?.equipments || 0) > 0 ||
                                  isSubmitting
                                }
                                className="admin-action-button delete-button flex-shrink-0 disabled:opacity-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <SmartPagination
                currentPage={effectiveCurrentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </motion.div>

        {/* Dialog de Preview da Categoria - Provisório */}
        <ViewCategoryDialog
          category={selectedCategory}
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onEdit={openEditCategoryModal}
        />

        {/* CategoryDialogModal - Substitui ModernCategoryModal */}
        <CategoryDialogModal
          isOpen={isModernModalOpen}
          mode={editingCategoryData ? 'edit' : 'create'}
          onClose={() => setIsModernModalOpen(false)}
          onSave={handleCategorySave}
          initialData={editingCategoryData || undefined}
          onStateChange={handleDialogStateChange}
        />
      </div>
    </div>
  )
}
