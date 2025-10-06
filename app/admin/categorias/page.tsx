'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  ModernCategoryModal,
  type CategoryData,
} from '@/components/ui/modern-category-modal'
import { useIsMobile } from '@/hooks/use-mobile'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import {
  Edit,
  Eye,
  FileText,
  Hash,
  Package,
  Plus,
  Search,
  Tag,
  Trash2,
  X,
} from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

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

  const { toast } = useToast()
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
      toast({
        title: 'Erro',
        description: 'Erro ao carregar categorias. Tente novamente.',
        variant: 'destructive',
      })
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [toast])

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

    toast({
      title: 'Sucesso',
      description: isEditing
        ? 'Categoria atualizada com sucesso'
        : 'Categoria criada com sucesso',
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
        toast({
          title: 'Sucesso',
          description: 'Categoria excluída com sucesso',
        })
        fetchCategories()
      } else {
        const errorData = await response.json()
        toast({
          title: 'Erro',
          description: errorData.error || 'Erro ao excluir categoria',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      toast({
        title: 'Erro',
        description: 'Erro ao excluir categoria',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderIcon = (iconName?: keyof typeof LucideIcons, color?: string) => {
    if (!iconName || !LucideIcons[iconName])
      return <Tag className="h-4 w-4 text-gray-400" />

    const IconComponent = LucideIcons[iconName] as React.ComponentType<{
      size?: number
      color?: string
      className?: string
    }>
    return (
      <IconComponent
        size={16}
        color={color || '#3b82f6'}
        className="flex-shrink-0"
      />
    )
  }

  const getCategoryBadge = (category: Category) => {
    return (
      <Badge
        variant="outline"
        className={cn(
          'category-preview-badge text-xs inline-flex items-center gap-2 font-medium px-4 py-2 rounded-xl border-0 max-w-full transition-all duration-300',
          'shadow-[4px_8px_18px_2px_rgba(0,0,0,0.18)] hover:shadow-[8px_12px_20px_2px_rgba(0,0,0,0.22)]',
          'hover:scale-[1.07]',
          'xs:text-[10px] xs:px-1 xs:py-1 xs:rounded-md'
        )}
        style={{
          backgroundColor:
            category.backgroundColor || category.bgColor || '#e0e7ff',
          color: category.fontColor || '#1e40af',
        }}
      >
        {category.icon ? (
          <span className="flex-shrink-0">
            {renderIcon(category.icon, category.iconColor)}
          </span>
        ) : null}
        <span className="truncate font-semibold text-sm min-w-0">
          {category.name}
        </span>
      </Badge>
    )
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
      <div className="p-3 sm:p-4 lg:p-6 xl:p-8 max-w-7xl mx-auto">
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
                          <div className="w-full flex justify-center mb-4">
                            {getCategoryBadge(category)}
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
                              className="flex-shrink-0"
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
                              className="flex-shrink-0"
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
                              className="hover:bg-red-100 hover:text-red-700 disabled:opacity-50 flex-shrink-0"
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

        {/* Modal de Preview da Categoria */}
        <Dialog
          open={!!selectedCategory}
          onOpenChange={() => setSelectedCategory(null)}
        >
          <DialogContent
            closeButtonClassName="hover:bg-white"
            className="w-full max-w-lg max-h-[80vh] p-0 gap-0 bg-white border-0 shadow-2xl rounded-lg overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed !left-[50%] !top-[50%] z-50 flex flex-col !translate-x-[-50%] !translate-y-[-50%] !m-0 xs:max-w-[98vw] xs:p-0"
            style={{
              height: '80vh',
              maxHeight: '80vh',
            }}
          >
            <DialogHeader className="p-6 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-slate-100 rounded-t-lg flex-shrink-0">
              <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center text-white shadow-sm">
                  <Eye className="w-4 h-4" />
                </div>
                Visualizar Categoria
              </DialogTitle>
            </DialogHeader>

            <div
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden force-scroll"
              style={{ maxHeight: 'calc(80vh - 120px)' }}
            >
              <div className="p-6 space-y-6 xs:p-4 xs:space-y-4 w-full max-w-full">
                {selectedCategory && (
                  <>
                    {/* Preview da Categoria */}
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-5 border border-slate-200 shadow-sm relative w-full max-w-full xs:p-3 xs:rounded-md">
                      <div className="flex items-center justify-between mb-4 w-full">
                        <h3 className="text-sm font-semibold text-slate-700">
                          Preview da Categoria
                        </h3>
                      </div>
                      <div className="flex justify-center mb-4 w-full">
                        {getCategoryBadge(selectedCategory)}
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-500 italic max-w-xs mx-auto leading-relaxed">
                          {selectedCategory.description || 'Sem descrição'}
                        </p>
                      </div>
                    </div>

                    {/* Informações Detalhadas */}
                    <div className="space-y-4 w-full max-w-full">
                      <div
                        className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm relative"
                        style={{
                          borderLeft: `4px solid ${selectedCategory.bgColor || '#3b82f6'}`,
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
                                  {selectedCategory.name}
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
                                  className="font-medium text-sm break-words hyphens-auto leading-relaxed"
                                  title={
                                    selectedCategory.description ||
                                    'Sem descrição'
                                  }
                                  style={{
                                    wordBreak: 'break-word',
                                    overflowWrap: 'break-word',
                                    hyphens: 'auto',
                                  }}
                                >
                                  {selectedCategory.description ||
                                    'Sem descrição'}
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
                                  {selectedCategory._count?.equipments || 0}{' '}
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
                                  {selectedCategory.id}
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

            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 border-t bg-gray-50 rounded-b-lg xs:p-4 xs:rounded-b-md w-full max-w-full flex-shrink-0">
              <div className="flex gap-4 w-full xs:gap-2 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory(null)}
                  className="flex-1 h-10 rounded-lg border border-slate-200 hover:bg-slate-50 bg-transparent shadow-sm hover:scale-105 hover:shadow-sm transition-all duration-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Fechar
                </Button>
                <Button
                  onClick={() => {
                    if (selectedCategory) {
                      setSelectedCategory(null)
                      openEditCategoryModal(selectedCategory)
                    }
                  }}
                  className="flex-1 h-10 bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Categoria
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
