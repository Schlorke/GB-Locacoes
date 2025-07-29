'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ModernCategoryModal, type CategoryData } from '@/components/ui/modern-category-modal';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import {
  Edit,
  Eye,
  FileText,
  Hash,
  Package,
  Palette,
  Plus,
  Search,
  Tag,
  Trash2,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: keyof typeof LucideIcons;
  iconColor?: string;
  backgroundColor?: string; // Renomeado para compatibilidade com TagData
  fontColor?: string;
  createdAt: string;
  _count?: {
    equipments: number;
  };
  // Mantém compatibilidade com API existente
  bgColor?: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Novo estado para o ModernCategoryModal
  const [isModernModalOpen, setIsModernModalOpen] = useState(false);
  const [editingCategoryData, setEditingCategoryData] = useState<CategoryData | null>(null);

  const { toast } = useToast();

  // Função para converter Category para CategoryData
  const categoryToCategoryData = (category: Category): CategoryData => ({
    id: category.id,
    name: category.name,
    description: category.description || '',
    backgroundColor: category.backgroundColor || category.bgColor || '#f0f9ff',
    fontColor: category.fontColor || '#0c4a6e',
    icon: category.icon ?? undefined,
    iconColor: category.iconColor || '#0ea5e9',
  });

  // Função para converter CategoryData para Category
  // Removido: função não utilizada

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/categories');
      const data = await response.json();

      const categoriesArray = Array.isArray(data) ? data : data?.categories || [];

      setCategories(categoriesArray);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao carregar categorias. Tente novamente.',
        variant: 'destructive',
      });
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const filterCategories = useCallback(() => {
    if (!Array.isArray(categories)) {
      setFilteredCategories([]);
      return;
    }

    const filtered = categories.filter((category: Category) => {
      const matchesSearch =
        category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    filterCategories();
  }, [categories, searchTerm, filterCategories]);

  // Novas funções para o ModernCategoryModal
  const openNewCategoryModal = () => {
    setEditingCategoryData(null);
    setIsModernModalOpen(true);
  };

  const openEditCategoryModal = (category: Category) => {
    setEditingCategoryData(categoryToCategoryData(category));
    setIsModernModalOpen(true);
  };

  const handleCategorySave = async (
    categoryData: Omit<CategoryData, 'backgroundColor'> & { bgColor: string },
  ) => {
    const isEditing = !!editingCategoryData?.id;
    const url = isEditing
      ? `/api/admin/categories/${editingCategoryData.id}`
      : '/api/admin/categories';
    const method = isEditing ? 'PUT' : 'POST';

    // Corrige para garantir que icon: null seja enviado ao remover ícone
    const categoryPayload = {
      ...categoryData,
      icon:
        categoryData.icon === undefined || categoryData.icon === null ? null : categoryData.icon,
    };

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 409) {
        throw new Error('Categoria já existente');
      } else {
        throw new Error(errorData.error || 'Erro ao salvar categoria');
      }
    }

    // Recarrega as categorias
    await fetchCategories();

    toast({
      title: 'Sucesso',
      description: isEditing ? 'Categoria atualizada com sucesso' : 'Categoria criada com sucesso',
    });
  };

  const deleteCategory = async (categoryId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.'))
      return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast({
          title: 'Sucesso',
          description: 'Categoria excluída com sucesso',
        });
        fetchCategories();
      } else {
        const errorData = await response.json();
        toast({
          title: 'Erro',
          description: errorData.error || 'Erro ao excluir categoria',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao excluir categoria',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIcon = (iconName?: keyof typeof LucideIcons, color?: string) => {
    if (!iconName || !LucideIcons[iconName]) return <Tag className="h-4 w-4 text-gray-400" />;

    const IconComponent = LucideIcons[iconName] as React.ComponentType<{
      size?: number;
      color?: string;
      className?: string;
    }>;
    return <IconComponent size={16} color={color || '#3b82f6'} className="flex-shrink-0" />;
  };

  const getCategoryBadge = (category: Category) => {
    return (
      <Badge
        variant="outline"
        className="category-preview-badge text-xs inline-flex items-center gap-2 font-medium px-4 py-2 rounded-xl border-0 max-w-full transition-all duration-300 shadow-[3px_6px_12px_2px_rgba(0,0,0,0.13)]"
        style={{
          backgroundColor: category.backgroundColor || category.bgColor || '#e0e7ff',
          color: category.fontColor || '#1e40af',
        }}
      >
        {category.icon !== undefined && category.icon !== null && (
          <span className="flex-shrink-0">{renderIcon(category.icon, category.iconColor)}</span>
        )}
        <span className="truncate font-semibold text-sm min-w-0">{category.name}</span>
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
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
                  {Array.isArray(filteredCategories) ? filteredCategories.length : 0} categorias
                  encontradas
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
                <div className="relative flex-1 max-w-md">
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
          {!Array.isArray(filteredCategories) || filteredCategories.length === 0 ? (
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              {/* Clean depth layers for empty state card */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardContent className="relative z-10 text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Tag className="w-12 h-12 mx-auto mb-3" />
                  <p className="text-lg font-medium">Nenhuma categoria encontrada</p>
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
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                      {/* Clean depth layers for category card */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

                      <CardHeader className="relative z-10 pb-3">
                        <div className="flex flex-col">
                          <div className="w-full flex justify-center mb-4">
                            {getCategoryBadge(category)}
                          </div>
                          <div className="text-left w-full">
                            <h3 className="font-semibold text-lg text-gray-900 truncate">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {category.description || 'Sem descrição'}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="relative z-10 pt-0">
                        <div className="space-y-3">
                          {/* Linha 1: Equipamentos (sempre à esquerda) */}
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Package className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">
                              {category._count?.equipments || 0} equipamentos
                            </span>
                          </div>

                          {/* Linha 2: Botões de ação (à direita em mobile, à direita em desktop) */}
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCategory(category)}
                              className="flex-shrink-0"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditCategoryModal(category)}
                              className="flex-shrink-0"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteCategory(category.id)}
                              disabled={(category._count?.equipments || 0) > 0 || isSubmitting}
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

        {/* Modal de Detalhes da Categoria */}
        <Dialog open={!!selectedCategory} onOpenChange={() => setSelectedCategory(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {selectedCategory?.icon ? (
                    renderIcon(selectedCategory.icon, selectedCategory.iconColor)
                  ) : (
                    <Tag className="w-4 h-4" />
                  )}
                </div>
                Detalhes da Categoria - {selectedCategory?.name}
              </DialogTitle>
            </DialogHeader>

            {selectedCategory && (
              <div className="space-y-6">
                {/* Informações da Categoria */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Tag className="w-5 h-5 text-blue-600" />
                      Informações da Categoria
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Palette className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Badge</div>
                        <div className="mt-1">{getCategoryBadge(selectedCategory)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Equipamentos</div>
                        <div className="font-medium">
                          {selectedCategory._count?.equipments || 0} equipamentos
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">ID da Categoria</div>
                        <div className="font-medium font-mono text-xs">{selectedCategory.id}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Descrição</div>
                        <div className="font-medium">
                          {selectedCategory.description || 'Sem descrição'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Novo ModernCategoryModal */}
        <ModernCategoryModal
          isOpen={isModernModalOpen}
          onClose={() => setIsModernModalOpen(false)}
          onSave={handleCategorySave}
          initialData={editingCategoryData || undefined}
          title={editingCategoryData ? 'Editar Categoria' : 'Nova Categoria'}
          saveButtonText={editingCategoryData ? 'Atualizar Categoria' : 'Criar Categoria'}
        />
      </div>
    </div>
  );
}
