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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Tag, Loader2, Info, Check } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { toast } from "sonner"
import { IconPicker } from "@/components/ui/icon-picker"

interface Category {
  id: string
  name: string
  description?: string
  icon?: keyof typeof LucideIcons
  iconColor?: string
  bgColor?: string
  fontColor?: string
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
    if (!formData.name.trim()) {
      toast.error("O nome da categoria é obrigatório.")
      return
    }
    if (!formData.bgColor || !formData.fontColor) {
      toast.error("Preencha todos os campos obrigatórios.")
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
        if (response.status === 409) {
          toast.error("Categoria já existente")
        } else {
          toast.error(errorData.error || "Erro ao salvar categoria")
        }
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
    setIsSubmitting(true)
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
    return (
      <div className="flex items-center justify-center h-[50vh] sm:h-[60vh] lg:h-[calc(100vh-150px)]">
        <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold truncate">Categorias</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">Gerencie as categorias de equipamentos.</p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 w-auto h-10 px-4"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Nova Categoria</span>
        </Button>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Tag className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="truncate">Lista de Categorias</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {isLoading && categories.length > 0 && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}
          {!isLoading && categories.length === 0 ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <Tag className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-lg sm:text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                Nenhuma categoria encontrada.
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
                Crie sua primeira categoria para organizar seus equipamentos.
              </p>
              <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <Button
                onClick={openCreateDialog}
                className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 h-10 px-4"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">Criar Primeira Categoria</span>
              </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px] sm:w-[250px]">Nome</TableHead>
                    <TableHead className="hidden md:table-cell min-w-[200px]">Descrição</TableHead>
                    <TableHead className="w-[100px] sm:w-[150px] text-center hidden sm:table-cell">
                      Equipamentos
                    </TableHead>
                    <TableHead className="w-[100px] sm:w-[150px] text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="p-2 sm:p-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="inline-flex items-center justify-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium max-w-full"
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
                                className: "mr-1.5 flex-shrink-0",
                              })}
                            <span className="truncate">{category.name}</span>
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground p-2 sm:p-4">
                        <div className="max-w-xs">
                          {category.description
                            ? category.description.length > 60
                              ? category.description.substring(0, 60) + "..."
                              : category.description
                            : "-"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center hidden sm:table-cell p-2 sm:p-4">
                        <span className="font-medium">{category._count?.equipments || 0}</span>
                      </TableCell>
                      <TableCell className="text-right p-2 sm:p-4">
                        <div className="flex items-center justify-end gap-1">
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden p-0 rounded-xl shadow-xl"
          aria-labelledby="category-dialog-title"
          aria-describedby="category-dialog-desc"
        >
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle id="category-dialog-title" className="text-lg sm:text-xl">
              {editingCategory ? "Editar Categoria" : "Nova Categoria"}
            </DialogTitle>
            <DialogDescription id="category-dialog-desc">Preencha os dados da categoria.</DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-400 hover:scrollbar-thumb-slate-500 px-6 py-4">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                    onClick={() => setIsIconPickerOpen(true)}
                    className="w-full mt-1 flex items-center justify-start text-left"
                  >
                    {renderIcon(formData.icon, formData.iconColor)}
                    {!formData.icon && <span className="ml-2 truncate">Selecionar Ícone</span>}
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
                    Cor de Fundo do Rótulo
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
                    Cor da Fonte do Rótulo
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

              <DialogFooter className="pt-4 flex-col sm:flex-row gap-2 sm:gap-0">
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
                  className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  {editingCategory ? "Atualizar Categoria" : "Criar Categoria"}
                </Button>
              </DialogFooter>
            </form>
          </div>
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
