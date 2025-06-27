"use client"

import { DialogFooter } from "@/components/ui/dialog"

import type React from "react"
import { useState, useEffect, createElement } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Tag, Loader2, Info, Check } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { toast } from "sonner"
import { IconPicker } from "@/components/ui/icon-picker" // Importado

interface Category {
  id: string
  name: string
  description?: string
  icon?: keyof typeof LucideIcons // Nome do ícone Lucide
  iconColor?: string // Cor do ícone
  bgColor?: string // Cor de fundo do rótulo
  fontColor?: string // Cor da fonte do rótulo
  createdAt: string
  _count?: {
    equipments: number
  }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: undefined as keyof typeof LucideIcons | undefined,
    iconColor: "#000000",
    bgColor: "#e0e0e0",
    fontColor: "#000000",
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        toast.error("Erro ao carregar categorias")
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast.error("Erro ao carregar categorias")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: undefined,
      iconColor: "#000000",
      bgColor: "#e0e0e0",
      fontColor: "#000000",
    })
    setEditingCategory(null)
  }

  const openCreateDialog = () => {
    resetForm()
    setIsFormDialogOpen(true)
  }

  const openEditDialog = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || "",
      icon: category.icon || undefined,
      iconColor: category.iconColor || "#000000",
      bgColor: category.bgColor || "#e0e0e0",
      fontColor: category.fontColor || "#000000",
    })
    setEditingCategory(category)
    setIsFormDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name) {
      toast.error("O nome da categoria é obrigatório.")
      return
    }
    setIsSubmitting(true)
    try {
      const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : "/api/admin/categories"
      const method = editingCategory ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(editingCategory ? "Categoria atualizada!" : "Categoria criada!")
        fetchCategories()
        setIsFormDialogOpen(false)
        resetForm()
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Erro ao salvar categoria")
      }
    } catch (error) {
      console.error("Error saving category:", error)
      toast.error("Erro ao salvar categoria")
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteCategory = async (categoryId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.")) return
    setIsSubmitting(true) // Reutilizar para indicar carregamento
    try {
      const response = await fetch(`/api/admin/categories/${categoryId}`, {
        method: "DELETE",
      })
      if (response.ok) {
        toast.success("Categoria excluída com sucesso")
        fetchCategories()
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Erro ao excluir categoria")
      }
    } catch (error) {
      console.error("Error deleting category:", error)
      toast.error("Erro ao excluir categoria")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleIconSelect = (iconName?: string, color?: string) => {
    setFormData((prev) => ({
      ...prev,
      icon: iconName as keyof typeof LucideIcons | undefined,
      iconColor: color || prev.iconColor,
    }))
  }

  const renderIcon = (iconName?: keyof typeof LucideIcons, color?: string) => {
    if (!iconName || !LucideIcons[iconName]) return <Info className="h-5 w-5 text-gray-400" />
    return createElement(LucideIcons[iconName], { size: 20, color: color || formData.iconColor, className: "mr-2" })
  }

  if (isLoading && categories.length === 0) {
    // Mostrar loader apenas no carregamento inicial
    return (
      <div className="flex items-center justify-center h-[calc(100vh-150px)]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
      {/* Header Section - Responsivo */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Categorias</h1>
          <p className="text-sm text-muted-foreground hidden sm:block">Gerencie as categorias de equipamentos.</p>
        </div>
        <Button onClick={openCreateDialog} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          <span className="sm:hidden">Nova</span>
          <span className="hidden sm:inline">Nova Categoria</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Lista de Categorias
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading && categories.length > 0 && (
            <div className="p-4">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}
          {!isLoading && categories.length === 0 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <Tag className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-lg sm:text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                Nenhuma categoria encontrada.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
                Crie sua primeira categoria para organizar seus equipamentos.
              </p>
              <Button onClick={openCreateDialog} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeira Categoria
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="w-[150px] text-center">Equipamentos</TableHead>
                      <TableHead className="w-[150px] text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <span
                              className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: category.bgColor || "#e0e0e0",
                                color: category.fontColor || "#000000",
                              }}
                            >
                              {category.icon &&
                                LucideIcons[category.icon] &&
                                createElement(LucideIcons[category.icon], {
                                  size: 14,
                                  color: category.iconColor || category.fontColor,
                                  className: "mr-1.5",
                                })}
                              {category.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {category.description
                            ? category.description.length > 60
                              ? category.description.substring(0, 60) + "..."
                              : category.description
                            : "-"}
                        </TableCell>
                        <TableCell className="text-center">{category._count?.equipments || 0}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(category)}
                              aria-label="Editar"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteCategory(category.id)}
                              className="text-red-500 hover:text-red-600"
                              disabled={(category._count?.equipments || 0) > 0 || isSubmitting}
                              aria-label="Excluir"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3 p-3">
                {categories.map((category) => (
                  <Card key={category.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: category.bgColor || "#e0e0e0",
                              color: category.fontColor || "#000000",
                            }}
                          >
                            {category.icon &&
                              LucideIcons[category.icon] &&
                              createElement(LucideIcons[category.icon], {
                                size: 14,
                                color: category.iconColor || category.fontColor,
                                className: "mr-1.5",
                              })}
                            {category.name}
                          </span>
                        </div>
                        {category.description && (
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{category.description}</p>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {category._count?.equipments || 0} equipamentos
                        </div>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(category)}
                          aria-label="Editar"
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCategory(category.id)}
                          className="text-red-500 hover:text-red-600 h-8 w-8"
                          disabled={(category._count?.equipments || 0) > 0 || isSubmitting}
                          aria-label="Excluir"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog do Formulário - Responsivo */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-lg w-[95vw] sm:w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 py-4">
            <div>
              <Label htmlFor="cat-name">Nome da Categoria *</Label>
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
              <Label htmlFor="cat-description">Descrição</Label>
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
                <Label>Ícone</Label>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsIconPickerOpen(true)}
                  className="w-full mt-1 flex items-center justify-start text-left"
                >
                  {renderIcon(formData.icon, formData.iconColor)}
                  {formData.icon ? formData.icon : "Selecionar Ícone"}
                </Button>
              </div>
              <div>
                <Label htmlFor="cat-iconColor">Cor do Ícone</Label>
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
                <Label htmlFor="cat-bgColor">Cor de Fundo do Rótulo</Label>
                <Input
                  id="cat-bgColor"
                  type="color"
                  value={formData.bgColor}
                  onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                  className="mt-1 w-full h-10 p-1"
                />
              </div>
              <div>
                <Label htmlFor="cat-fontColor">Cor da Fonte do Rótulo</Label>
                <Input
                  id="cat-fontColor"
                  type="color"
                  value={formData.fontColor}
                  onChange={(e) => setFormData({ ...formData, fontColor: e.target.value })}
                  className="mt-1 w-full h-10 p-1"
                />
              </div>
            </div>

            <DialogFooter className="pt-4 flex-col sm:flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormDialogOpen(false)}
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto order-1 sm:order-2">
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                {editingCategory ? "Atualizar Categoria" : "Criar Categoria"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <IconPicker
        isOpen={isIconPickerOpen}
        onClose={() => setIsIconPickerOpen(false)}
        onSelect={handleIconSelect}
        value={formData.icon}
        color={formData.iconColor}
      />
    </div>
  )
}
