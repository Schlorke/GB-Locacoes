"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Loader2, ServerCrash } from "lucide-react"
import { toast } from "sonner"
import * as LucideIcons from "lucide-react"
import { IconPicker } from "@/components/ui/icon-picker"

interface Category {
  id: string
  name: string
  description?: string | null
  slug: string
  icon?: string | null
  iconColor?: string | null
  bgColor?: string | null
  fontColor?: string | null
  _count: {
    equipments: number
  }
  createdAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
    iconColor: "#000000",
    bgColor: "#f3f4f6",
    fontColor: "#000000",
  })

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    setApiError(null)
    try {
      const response = await fetch("/api/admin/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.error || `Erro ${response.status} ao buscar categorias.`
        toast.error(errorMessage)
        setApiError(errorMessage)
        setCategories([])
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      const errorMessage = "Erro de rede ao buscar categorias."
      toast.error(errorMessage)
      setApiError(errorMessage)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error("Nome da categoria é obrigatório.")
      return
    }

    try {
      const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : "/api/admin/categories"
      const method = editingCategory ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(`Categoria ${editingCategory ? "atualizada" : "criada"} com sucesso!`)
        setIsDialogOpen(false)
        resetForm()
        fetchCategories()
      } else {
        const errorData = await response.json()
        toast.error(
          `Erro ao ${editingCategory ? "atualizar" : "criar"} categoria: ${errorData.error || "Erro desconhecido"}`,
        )
      }
    } catch (error) {
      console.error("Error saving category:", error)
      toast.error("Erro de rede ao salvar categoria.")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.")) return

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Categoria excluída com sucesso!")
        fetchCategories()
      } else {
        const errorData = await response.json()
        toast.error(`Erro ao excluir categoria: ${errorData.error || "Erro desconhecido"}`)
      }
    } catch (error) {
      console.error("Error deleting category:", error)
      toast.error("Erro de rede ao excluir categoria.")
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "",
      iconColor: "#000000",
      bgColor: "#f3f4f6",
      fontColor: "#000000",
    })
    setEditingCategory(null)
  }

  const openEditDialog = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "",
      iconColor: category.iconColor || "#000000",
      bgColor: category.bgColor || "#f3f4f6",
      fontColor: category.fontColor || "#000000",
    })
    setIsDialogOpen(true)
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      (category.description && category.description.toLowerCase().includes(search.toLowerCase())),
  )

  // Renderização condicional para estado de carregamento inicial
  if (loading && categories.length === 0 && !apiError) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 mt-4 text-lg text-muted-foreground">Carregando categorias...</p>
      </div>
    )
  }

  // Renderização para estado de erro da API
  if (apiError && categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center p-4">
        <ServerCrash className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Erro ao Carregar Categorias</h2>
        <p className="text-muted-foreground mb-4 max-w-md">{apiError}</p>
        <Button onClick={fetchCategories} disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Tentar Novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6">
      {/* Header Section - Responsivo */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
            Gerenciar Categorias
          </h1>
          <p className="text-sm text-muted-foreground hidden sm:block">Organize os equipamentos por categorias</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="sm:hidden">Nova</span>
              <span className="hidden sm:inline">Nova Categoria</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Atualize as informações da categoria."
                  : "Crie uma nova categoria para organizar os equipamentos."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nome da categoria"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descrição da categoria (opcional)"
                    rows={3}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="icon">Ícone</Label>
                  <IconPicker value={formData.icon} onChange={(icon) => setFormData({ ...formData, icon })} />
                </div>
                <div>
                  <Label htmlFor="iconColor">Cor do Ícone</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="iconColor"
                      type="color"
                      value={formData.iconColor}
                      onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={formData.iconColor}
                      onChange={(e) => setFormData({ ...formData, iconColor: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bgColor">Cor de Fundo</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="bgColor"
                      type="color"
                      value={formData.bgColor}
                      onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={formData.bgColor}
                      onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                      placeholder="#f3f4f6"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="fontColor">Cor do Texto</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="fontColor"
                      type="color"
                      value={formData.fontColor}
                      onChange={(e) => setFormData({ ...formData, fontColor: e.target.value })}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={formData.fontColor}
                      onChange={(e) => setFormData({ ...formData, fontColor: e.target.value })}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-4 border rounded-lg">
                <Badge
                  variant="outline"
                  style={{
                    backgroundColor: formData.bgColor,
                    color: formData.fontColor,
                    borderColor: "transparent",
                  }}
                  className="text-sm"
                >
                  {formData.icon && LucideIcons[formData.icon as keyof typeof LucideIcons] && (
                    <span className="mr-2">
                      {React.createElement(LucideIcons[formData.icon as keyof typeof LucideIcons], {
                        size: 16,
                        color: formData.iconColor,
                      })}
                    </span>
                  )}
                  {formData.name || "Preview"}
                </Badge>
              </div>
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  {editingCategory ? "Atualizar" : "Criar"} Categoria
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Busca - Desktop */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Buscar Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou descrição..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Busca Mobile */}
      <div className="lg:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar categorias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Lista de Categorias */}
      <Card className="relative">
        {loading && categories.length > 0 && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center z-20 rounded-md">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <CardContent className="p-0">
          {filteredCategories.length === 0 && !loading ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <Search className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-gray-300 dark:text-gray-500 mb-4" />
              <p className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
                {search ? "Nenhuma categoria encontrada" : "Nenhuma categoria cadastrada"}
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
                {search
                  ? "Tente ajustar o termo de busca."
                  : "Crie sua primeira categoria para organizar os equipamentos."}
              </p>
              <Button
                onClick={() => {
                  resetForm()
                  setIsDialogOpen(true)
                }}
                variant="default"
                className="w-full sm:w-auto"
              >
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
                      <TableHead>Categoria</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Equipamentos</TableHead>
                      <TableHead>Preview</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-muted-foreground">/{category.slug}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-xs truncate text-sm">{category.description || "Sem descrição"}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-xs">
                            {category._count.equipments} equipamentos
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            style={{
                              backgroundColor: category.bgColor || undefined,
                              color: category.fontColor || undefined,
                              borderColor: category.bgColor ? "transparent" : undefined,
                            }}
                            className="text-xs"
                          >
                            {category.icon && LucideIcons[category.icon as keyof typeof LucideIcons] && (
                              <span className="mr-1">
                                {React.createElement(LucideIcons[category.icon as keyof typeof LucideIcons], {
                                  size: 12,
                                  color: category.iconColor || category.fontColor || "currentColor",
                                })}
                              </span>
                            )}
                            {category.name}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Ações para {category.name}</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditDialog(category)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(category.id)}
                                className="text-red-600 hover:!text-red-500 focus:!text-red-500"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3 p-3">
                {filteredCategories.map((category) => (
                  <Card key={category.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium truncate">{category.name}</h3>
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            {category._count.equipments}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">/{category.slug}</p>
                        {category.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                            {category.description}
                          </p>
                        )}
                        <Badge
                          variant="outline"
                          style={{
                            backgroundColor: category.bgColor || undefined,
                            color: category.fontColor || undefined,
                            borderColor: category.bgColor ? "transparent" : undefined,
                          }}
                          className="text-xs"
                        >
                          {category.icon && LucideIcons[category.icon as keyof typeof LucideIcons] && (
                            <span className="mr-1">
                              {React.createElement(LucideIcons[category.icon as keyof typeof LucideIcons], {
                                size: 12,
                                color: category.iconColor || category.fontColor || "currentColor",
                              })}
                            </span>
                          )}
                          {category.name}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Ações para {category.name}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(category)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(category.id)}
                            className="text-red-600 hover:!text-red-500 focus:!text-red-500"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
