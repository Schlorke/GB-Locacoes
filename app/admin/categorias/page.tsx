"use client"

import type React from "react"
import { useState, useEffect, createElement } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Tag, Loader2, Info } from "lucide-react"
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
              <div className="w-full sm:w-auto flex justify-center sm:center">
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
          className="w-[95vw] sm:w-full max-w-4xl max-h-[90vh] overflow-hidden p-0 rounded-xl shadow-xl"
          aria-labelledby="category-dialog-title"
          aria-describedby="category-dialog-desc"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-white">
            <div>
              <DialogTitle id="category-dialog-title" className="text-xl font-semibold text-gray-900">
                {editingCategory ? "Editar Categoria" : "Adicionar Nova Categoria"}
              </DialogTitle>
              <DialogDescription id="category-dialog-desc" className="text-sm text-gray-500 mt-1">
                Configure os dados da categoria de equipamentos
              </DialogDescription>
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-10 px-4 bg-transparent"
                onClick={() => setIsFormDialogOpen(false)}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                form="category-form"
                disabled={isSubmitting}
                className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 h-10 px-6"
              >
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingCategory ? "Atualizar Categoria" : "Salvar Categoria"}
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex h-[calc(90vh-100px)] overflow-hidden">
            {/* Sidebar - Agora à esquerda */}
            <div className="w-80 border-r bg-muted/30 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Settings Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">Configurações</h4>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Ícone</Label>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsIconPickerOpen(true)}
                        className="w-full mt-2 h-10 flex items-center justify-start text-left"
                      >
                        {formData.icon ? (
                          <>
                            {renderIcon(formData.icon, formData.iconColor)}
                            <span className="ml-2 text-sm capitalize">{formData.icon}</span>
                          </>
                        ) : (
                          <>
                            <div className="w-5 h-5 mr-2 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                              <Plus className="w-3 h-3 text-gray-400" />
                            </div>
                            <span className="text-gray-500">Selecionar Ícone</span>
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label htmlFor="cat-iconColor" className="text-xs font-medium text-muted-foreground">
                          Cor Ícone
                        </Label>
                        <Input
                          id="cat-iconColor"
                          type="color"
                          value={formData.iconColor}
                          onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })}
                          className="mt-1 w-full h-10 p-1 cursor-pointer"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cat-bgColor" className="text-xs font-medium text-muted-foreground">
                          Fundo
                        </Label>
                        <Input
                          id="cat-bgColor"
                          type="color"
                          value={formData.bgColor}
                          onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                          className="mt-1 w-full h-10 p-1 cursor-pointer"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cat-fontColor" className="text-xs font-medium text-muted-foreground">
                          Texto
                        </Label>
                        <Input
                          id="cat-fontColor"
                          type="color"
                          value={formData.fontColor}
                          onChange={(e) => setFormData({ ...formData, fontColor: e.target.value })}
                          className="mt-1 w-full h-10 p-1 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attributes Section */}
                <div className="space-y-4 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                      Atributos Filtráveis
                    </h4>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="attr-price"
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        defaultChecked
                      />
                      <Label htmlFor="attr-price" className="text-sm text-muted-foreground">
                        Preço
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="attr-condition"
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        defaultChecked
                      />
                      <Label htmlFor="attr-condition" className="text-sm text-muted-foreground">
                        Estado
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="attr-brand"
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <Label htmlFor="attr-brand" className="text-sm text-muted-foreground">
                        Marca
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="attr-availability"
                        className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <Label htmlFor="attr-availability" className="text-sm text-muted-foreground">
                        Disponibilidade
                      </Label>
                    </div>
                  </div>
                </div>

                {/* SEO Section */}
                <div className="space-y-4 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">SEO</h4>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-sm text-gray-500">Configurações de SEO serão implementadas em breve.</div>
                </div>
              </div>
            </div>

            {/* Main Content - Agora à direita */}
            <div className="flex-1 overflow-y-auto p-6 bg-background">
              <form id="category-form" onSubmit={handleSubmit} className="space-y-8">
                {/* General Section */}
                <div className="bg-muted/50 rounded-lg border p-6">
                  <h3 className="text-lg font-medium text-foreground mb-6">Geral</h3>

                  <div className="space-y-6">
                    <div>
                      <Label
                        htmlFor="cat-name"
                        className="text-sm font-medium text-muted-foreground flex items-center gap-1"
                      >
                        Nome
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="cat-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Equipamentos Eletrônicos"
                        className="mt-2 h-10"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Categoria Pai</Label>
                      <div className="mt-2 p-3 border rounded-lg bg-muted/50 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-foreground">Raiz</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description and Visual */}
                <div className="bg-muted/50 rounded-lg border p-6">
                  <h3 className="text-lg font-medium text-foreground mb-6">Descrição e Aparência</h3>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="cat-description" className="text-sm font-medium text-muted-foreground">
                        Descrição
                        <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="cat-description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descreva a categoria de equipamentos..."
                        rows={4}
                        className="mt-2 h-20 resize-none"
                      />
                    </div>

                    {/* Visual Preview */}
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground mb-3 block">
                        Preview da Categoria
                      </Label>
                      <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg bg-muted/50 flex items-center justify-center">
                        <span
                          className="inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                          style={{
                            backgroundColor: formData.bgColor || "#e0e0e0",
                            color: formData.fontColor || "#000000",
                          }}
                        >
                          {formData.icon &&
                            LucideIcons[formData.icon] &&
                            createElement(LucideIcons[formData.icon], {
                              size: 16,
                              color: formData.iconColor || formData.fontColor,
                              className: "mr-2 flex-shrink-0",
                            })}
                          <span>{formData.name || "Nome da Categoria"}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
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
