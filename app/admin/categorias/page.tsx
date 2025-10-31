'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  ModernCategoryModal,
  type CategoryData,
} from '@/components/ui/category-modal'
import { Input } from '@/components/ui/input'
import { ViewCategoryModal } from '@/components/ui/view-category-modal'
import { useIsMobile } from '@/hooks/use-mobile'
import { toast } from 'sonner'
import { getCategoryBadgePreview } from '@/lib/utils/category-helpers'
import { AnimatePresence, motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { Edit, Eye, Package, Plus, Search, Tag, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

interface Category {
  id: string
  name: string
  description?: string
  icon?: keyof typeof LucideIcons
  iconColor?: string
  backgroundColor?: string // Renomeado para compatibilidade com TagData
  fontColor?: string
  createdAt: string
  _count?: {
    equipments: number
  }
  // Mantém compatibilidade com API existente
  bgColor?: string
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

  // Novo estado para o ModernCategoryModal
  const [isModernModalOpen, setIsModernModalOpen] = useState(false)
  const [editingCategoryData, setEditingCategoryData] =
    useState<CategoryData | null>(null)

  const isMobile = useIsMobile()

  // Função para converter Category para CategoryData
  const categoryToCategoryData = (category: Category): CategoryData => ({
    id: category.id,
    name: category.name,
    description: category.description || '',
    backgroundColor: category.backgroundColor || category.bgColor || '#f0f9ff',
    fontColor: category.fontColor || '#0c4a6e',
    icon: category.icon ?? undefined,
    iconColor: category.iconColor || '#0ea5e9',
  })

  // Função para converter CategoryData para Category
  // Removido: função não utilizada

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

    setFilteredCategories(filtered)
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

  // Novas funções para o ModernCategoryModal
  const openNewCategoryModal = () => {
    setEditingCategoryData(null)
    setIsModernModalOpen(true)
  }

  const openEditCategoryModal = (category: Category) => {
    setEditingCategoryData(categoryToCategoryData(category))
    setIsModernModalOpen(true)
  }

  const handleCategorySave = async (
    categoryData: Omit<CategoryData, 'backgroundColor'> & { bgColor: string }
  ) => {
    const isEditing = !!editingCategoryData?.id
    const url = isEditing
      ? `/api/admin/categories/${editingCategoryData.id}`
      : '/api/admin/categories'
    const method = isEditing ? 'PUT' : 'POST'

    // Corrige para garantir que icon: null seja enviado ao remover ícone
    const categoryPayload = {
      ...categoryData,
      icon:
        categoryData.icon === undefined || categoryData.icon === null
          ? null
          : categoryData.icon,
    }

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryPayload),
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                    onClick={() => {
                      if (isMobile) {
                        setActiveCardId(
                          activeCardId === category.id ? null : category.id
                        )
                      }
                    }}
                  >
                    <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-[280px] flex flex-col">
                      {/* Clean depth layers for category card */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

                      <CardHeader className="relative z-10 pb-3 flex-shrink-0">
                        <div className="flex flex-col">
                          <div className="w-full flex justify-center pb-4 pt-0">
                            {getCategoryBadgePreview(category, 'md', true)}
                          </div>
                          <div className="text-left w-full">
                            <h3 className="font-semibold text-lg text-gray-900 truncate">
                              {category.name}
                            </h3>
                            <p
                              className="text-sm text-gray-500 mt-1 line-clamp-4 cursor-default"
                              title={category.description || 'Sem descrição'}
                            >
                              {category.description || 'Sem descrição'}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10 pt-0 flex-1 flex flex-col justify-end">
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
          )}
        </motion.div>

        {/* Modal de Preview da Categoria - Agora usando componente do modern-category-modal.tsx */}
        <ViewCategoryModal
          category={selectedCategory}
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onEdit={openEditCategoryModal}
        />

        {/* Novo ModernCategoryModal */}
        <ModernCategoryModal
          isOpen={isModernModalOpen}
          onClose={() => setIsModernModalOpen(false)}
          onSave={handleCategorySave}
          initialData={editingCategoryData || undefined}
          title={editingCategoryData ? 'Editar Categoria' : 'Nova Categoria'}
          saveButtonText={
            editingCategoryData ? 'Atualizar Categoria' : 'Criar Categoria'
          }
        />
      </div>
    </div>
  )
}
