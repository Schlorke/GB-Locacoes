'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Tag,
  Eye,
  Package,
  Palette,
  Hash,
  FileText,
  Check,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: keyof typeof LucideIcons;
  iconColor?: string;
  bgColor?: string;
  fontColor?: string;
  createdAt: string;
  _count?: {
    equipments: number;
  };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: undefined as keyof typeof LucideIcons | undefined,
    iconColor: '#3b82f6',
    bgColor: '#e0e7ff',
    fontColor: '#1e40af',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [categories, searchTerm]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/categories');
      const data = await response.json();

      const categoriesArray = Array.isArray(data) ? data : data?.categories || [];
      console.log('Categories API response:', categoriesArray);

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
  };

  const filterCategories = () => {
    if (!Array.isArray(categories)) {
      setFilteredCategories([]);
      return;
    }

    let filtered = categories.filter((category) => {
      const matchesSearch =
        category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    setFilteredCategories(filtered);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: undefined,
      iconColor: '#3b82f6',
      bgColor: '#e0e7ff',
      fontColor: '#1e40af',
    });
    setEditingCategory(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsFormDialogOpen(true);
  };

  const openEditDialog = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      icon: category.icon || undefined,
      iconColor: category.iconColor || '#3b82f6',
      bgColor: category.bgColor || '#e0e7ff',
      fontColor: category.fontColor || '#1e40af',
    });
    setEditingCategory(category);
    setIsFormDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({
        title: 'Erro',
        description: 'O nome da categoria é obrigatório.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const url = editingCategory
        ? `/api/admin/categories/${editingCategory.id}`
        : '/api/admin/categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Sucesso',
          description: editingCategory ? 'Categoria atualizada!' : 'Categoria criada!',
        });
        fetchCategories();
        setIsFormDialogOpen(false);
        resetForm();
      } else {
        const errorData = await response.json();
        if (response.status === 409) {
          toast({
            title: 'Erro',
            description: 'Categoria já existente',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Erro',
            description: errorData.error || 'Erro ao salvar categoria',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao salvar categoria',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
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

    const IconComponent = LucideIcons[iconName] as React.ComponentType<any>;
    return (
      <IconComponent size={16} color={color || formData.iconColor} className="flex-shrink-0" />
    );
  };

  const getCategoryBadge = (category: Category) => {
    return (
      <Badge
        variant="outline"
        className="inline-flex items-center gap-2 font-medium px-4 py-2 rounded-xl border-0 shadow-md hover:shadow-lg transition-all duration-300 max-w-full"
        style={{
          backgroundColor: category.bgColor || '#e0e7ff',
          color: category.fontColor || '#1e40af',
          boxShadow: `0 2px 8px ${category.fontColor || '#1e40af'}15, 0 1px 4px ${category.fontColor || '#1e40af'}08`,
        }}
      >
        <span className="flex-shrink-0">{renderIcon(category.icon, category.iconColor)}</span>
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
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-lg">
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
                    className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <Button
                  onClick={openCreateDialog}
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
                    onClick={openCreateDialog}
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
                              onClick={() => openEditDialog(category)}
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

        {/* Modal de Criação/Edição */}
        <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="cat-name" className="text-sm font-medium">
                  Nome da Categoria *
                </Label>
                <Input
                  id="cat-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Andaimes e Escadas"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="cat-description" className="text-sm font-medium">
                  Descrição
                </Label>
                <Textarea
                  id="cat-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Breve descrição da categoria"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Ícone</Label>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full mt-1 flex items-center justify-start text-left"
                  >
                    {renderIcon(formData.icon, formData.iconColor)}
                    <span className="ml-2 truncate">
                      {formData.icon ? 'Ícone Selecionado' : 'Selecionar Ícone'}
                    </span>
                  </Button>
                </div>
                <div>
                  <Label htmlFor="cat-iconColor" className="text-sm font-medium">
                    Cor do Ícone
                  </Label>
                  <Input
                    id="cat-iconColor"
                    type="color"
                    value={formData.iconColor}
                    onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })}
                    className="mt-1 w-full h-10 p-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cat-bgColor" className="text-sm font-medium">
                    Cor de Fundo do Badge
                  </Label>
                  <Input
                    id="cat-bgColor"
                    type="color"
                    value={formData.bgColor}
                    onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                    className="mt-1 w-full h-10 p-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cat-fontColor" className="text-sm font-medium">
                    Cor da Fonte do Badge
                  </Label>
                  <Input
                    id="cat-fontColor"
                    type="color"
                    value={formData.fontColor}
                    onChange={(e) => setFormData({ ...formData, fontColor: e.target.value })}
                    className="mt-1 w-full h-10 p-1"
                  />
                </div>
              </div>

              {/* Preview do Badge */}
              <div>
                <Label className="text-sm font-medium">Preview</Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg flex items-center justify-center gap-3">
                  <span className="text-sm text-gray-600">Badge:</span>
                  <Badge
                    variant="outline"
                    className="inline-flex items-center gap-2 font-medium px-4 py-2 rounded-xl border-0 shadow-md hover:shadow-lg transition-all duration-300 max-w-full"
                    style={{
                      backgroundColor: formData.bgColor,
                      color: formData.fontColor,
                      boxShadow: `0 2px 8px ${formData.fontColor}15, 0 1px 4px ${formData.fontColor}08`,
                    }}
                  >
                    <span className="flex-shrink-0">
                      {renderIcon(formData.icon, formData.iconColor)}
                    </span>
                    <span className="truncate font-semibold text-sm min-w-0">
                      {formData.name || 'Nome da Categoria'}
                    </span>
                  </Badge>
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white w-full sm:w-auto hover:scale-105 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      {editingCategory ? 'Atualizando...' : 'Criando...'}
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      {editingCategory ? 'Atualizar Categoria' : 'Criar Categoria'}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
