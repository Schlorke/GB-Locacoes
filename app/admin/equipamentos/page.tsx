"use client"

import { cn } from "@/lib/utils"

import React from "react" // Import React
import { useState, useEffect, useCallback } from "react" // Adicionado useCallback
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, Loader2, ServerCrash, Filter } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import * as LucideIcons from "lucide-react"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Equipment {
  id: string
  name: string
  description: string
  pricePerDay: number
  isAvailable: boolean
  images: string[]
  category: {
    id: string
    name: string
    icon?: string | null
    iconColor?: string | null
    bgColor?: string | null
    fontColor?: string | null
  }
  _count: {
    reviews: number
    quoteItems: number
  }
  createdAt: string
}

interface Category {
  id: string
  name: string
  _count?: {
    // _count pode ser opcional dependendo da query
    equipments: number
  }
}

interface ApiResponse {
  equipments: Equipment[]
  pagination: {
    page: number
    limit: number
    totalItems: number
    totalPages: number
  }
}

export default function EquipmentsPage() {
  const { data: session } = useSession()
  // const router = useRouter() // Não utilizado, pode ser removido se não houver navegação programática
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all") // Default "all"
  const [availabilityFilter, setAvailabilityFilter] = useState("all") // Default "all"
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  const fetchEquipments = useCallback(async () => {
    setLoading(true)
    setApiError(null)
    try {
      const params = new URLSearchParams()
      params.append("page", currentPage.toString())
      params.append("limit", itemsPerPage.toString())
      if (search) params.append("search", search)
      if (selectedCategory && selectedCategory !== "all") params.append("categoryId", selectedCategory)
      if (availabilityFilter && availabilityFilter !== "all") params.append("isAvailable", availabilityFilter)

      console.log(`[EquipmentsPage] Fetching: /api/admin/equipments?${params.toString()}`)
      const response = await fetch(`/api/admin/equipments?${params.toString()}`)

      if (response.ok) {
        const data: ApiResponse = await response.json()
        setEquipments(data.equipments)
        setTotalPages(data.pagination.totalPages)
        setTotalItems(data.pagination.totalItems)
        setCurrentPage(data.pagination.page) // Sincronizar com a página retornada pela API
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.error || `Erro ${response.status} ao buscar equipamentos.`
        console.error("[EquipmentsPage] API Error:", errorMessage, errorData.details)
        toast.error(errorMessage, { description: errorData.details })
        setApiError(errorMessage)
        setEquipments([])
        setTotalPages(1)
        setTotalItems(0)
      }
    } catch (error) {
      console.error("[EquipmentsPage] Network/Catch Error:", error)
      const errorMessage = "Erro de rede ou inesperado ao buscar equipamentos."
      toast.error(errorMessage)
      setApiError(errorMessage)
      setEquipments([])
      setTotalPages(1)
      setTotalItems(0)
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, search, selectedCategory, availabilityFilter]) // Dependências do useCallback

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        toast.error("Erro ao buscar categorias.")
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast.error("Erro de rede ao buscar categorias.")
    }
  }, []) // fetchCategories não tem dependências que mudam frequentemente

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories]) // Executa uma vez na montagem

  useEffect(() => {
    fetchEquipments()
  }, [fetchEquipments]) // Executa quando as dependências de fetchEquipments mudam

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.")) return

    try {
      const response = await fetch(`/api/admin/equipments/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Equipamento excluído com sucesso!")
        fetchEquipments()
      } else {
        const errorData = await response.json()
        toast.error(`Erro ao excluir equipamento: ${errorData.error || "Erro desconhecido"}`)
      }
    } catch (error) {
      console.error("Error deleting equipment:", error)
      toast.error("Erro de rede ao excluir equipamento.")
    }
  }

  // @ts-ignore
  const canDelete = session?.user?.role === "ADMIN"

  const handleClearFilters = () => {
    setSearch("")
    setSelectedCategory("all")
    setAvailabilityFilter("all")
    setCurrentPage(1)
    setIsFilterSheetOpen(false)
  }

  const hasActiveFilters = search || selectedCategory !== "all" || availabilityFilter !== "all"

  // Renderização condicional para estado de carregamento inicial
  if (loading && equipments.length === 0 && !apiError) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 mt-4 text-lg text-muted-foreground">Carregando equipamentos...</p>
      </div>
    )
  }

  // Renderização para estado de erro da API
  if (apiError && equipments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center p-4">
        <ServerCrash className="h-16 w-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Erro ao Carregar Equipamentos</h2>
        <p className="text-muted-foreground mb-4 max-w-md">{apiError}</p>
        <Button onClick={fetchEquipments} disabled={loading}>
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
            Gerenciar Equipamentos
          </h1>
          <p className="text-sm text-muted-foreground hidden sm:block">Gerencie todos os equipamentos do sistema</p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin/equipamentos/novo">
            <Plus className="h-4 w-4 mr-2" />
            <span className="sm:hidden">Novo</span>
            <span className="hidden sm:inline">Novo Equipamento</span>
          </Link>
        </Button>
      </div>

      {/* Filtros - Desktop */}
      <Card className="hidden lg:block">
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="relative">
              <Label htmlFor="search-equipments">Buscar</Label>
              <Search className="absolute left-3 bottom-2.5 text-gray-400 h-4 w-4" />
              <Input
                id="search-equipments"
                placeholder="Nome ou descrição..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setCurrentPage(1) // Resetar página ao buscar
                }}
                className="pl-10 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="category-filter">Categoria</Label>
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger id="category-filter" className="mt-1">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category._count?.equipments !== undefined ? category._count.equipments : 0})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="availability-filter">Disponibilidade</Label>
              <Select
                value={availabilityFilter}
                onValueChange={(value) => {
                  setAvailabilityFilter(value)
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger id="availability-filter" className="mt-1">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="true">Disponível</SelectItem>
                  <SelectItem value="false">Indisponível</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={handleClearFilters} className="w-full md:w-auto bg-transparent">
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtros Mobile - Sheet */}
      <div className="lg:hidden space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar equipamentos..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10"
          />
        </div>

        <div className="flex items-center justify-between">
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex-1 mr-2 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
                {hasActiveFilters && (
                  <Badge
                    variant="secondary"
                    className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    !
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>Filtre os equipamentos por categoria e disponibilidade</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <div>
                  <Label htmlFor="mobile-category-filter">Categoria</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => {
                      setSelectedCategory(value)
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger id="mobile-category-filter" className="mt-1">
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name} ({category._count?.equipments !== undefined ? category._count.equipments : 0})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mobile-availability-filter">Disponibilidade</Label>
                  <Select
                    value={availabilityFilter}
                    onValueChange={(value) => {
                      setAvailabilityFilter(value)
                      setCurrentPage(1)
                    }}
                  >
                    <SelectTrigger id="mobile-availability-filter" className="mt-1">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="true">Disponível</SelectItem>
                      <SelectItem value="false">Indisponível</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" onClick={handleClearFilters} className="flex-1 bg-transparent">
                    Limpar Filtros
                  </Button>
                  <Button onClick={() => setIsFilterSheetOpen(false)} className="flex-1">
                    Aplicar
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
              Limpar
            </Button>
          )}
        </div>
      </div>

      {/* Tabela/Lista de Equipamentos */}
      <Card className="relative">
        {loading &&
          equipments.length > 0 && ( // Loader sutil para recargas
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center z-20 rounded-md">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        <CardContent className="p-0">
          {equipments.length === 0 && !loading ? (
            <div className="text-center py-8 sm:py-12 px-4">
              <Search className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-gray-300 dark:text-gray-500 mb-4" />
              <p className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
                Nenhum equipamento encontrado
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6 max-w-md mx-auto">
                {search || selectedCategory !== "all" || availabilityFilter !== "all"
                  ? "Tente ajustar os filtros ou limpar a busca."
                  : "Parece que não há equipamentos cadastrados ainda."}
              </p>
              <Button asChild variant="default" className="w-full sm:w-auto">
                <Link href="/admin/equipamentos/novo">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Equipamento
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px]">Imagem</TableHead>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Preço/Dia</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Orçamentos</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipments.map((equipment) => (
                      <TableRow key={equipment.id}>
                        <TableCell className="p-2">
                          <img
                            src={equipment.images?.[0] || "/placeholder.svg?width=48&height=48&text=S/I"}
                            alt={equipment.name}
                            className="w-12 h-12 object-cover rounded-md border"
                            onError={(e) => (e.currentTarget.src = "/placeholder.svg?width=48&height=48&text=Erro")}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <Link
                              href={`/admin/equipamentos/${equipment.id}`}
                              className="font-medium hover:underline text-primary"
                            >
                              {equipment.name}
                            </Link>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                              {equipment.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              backgroundColor: equipment.category.bgColor || undefined,
                              color: equipment.category.fontColor || undefined,
                              borderColor: equipment.category.bgColor ? "transparent" : undefined,
                            }}
                          >
                            {equipment.category.icon &&
                              LucideIcons[equipment.category.icon as keyof typeof LucideIcons] &&
                              React.createElement(LucideIcons[equipment.category.icon as keyof typeof LucideIcons], {
                                size: 12,
                                color: equipment.category.iconColor || equipment.category.fontColor || "currentColor",
                                className: "mr-1 inline-block",
                              })}
                            {equipment.category.name}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">R$ {equipment.pricePerDay.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={equipment.isAvailable ? "default" : "destructive"}
                            className={cn(
                              "text-xs",
                              equipment.isAvailable
                                ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-700 dark:text-green-100 dark:border-green-500"
                                : "bg-red-100 text-red-700 border-red-300 dark:bg-red-700 dark:text-red-100 dark:border-red-500",
                            )}
                          >
                            {equipment.isAvailable ? "Disponível" : "Indisponível"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center text-sm">{equipment._count.quoteItems}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Ações para {equipment.name}</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/equipamentos/${equipment.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Detalhes
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </Link>
                              </DropdownMenuItem>
                              {canDelete && (
                                <DropdownMenuItem
                                  onClick={() => handleDelete(equipment.id)}
                                  className="text-red-600 hover:!text-red-500 focus:!text-red-500"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              )}
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
                {equipments.map((equipment) => (
                  <Card key={equipment.id} className="p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={equipment.images?.[0] || "/placeholder.svg?width=60&height=60&text=S/I"}
                        alt={equipment.name}
                        className="w-15 h-15 object-cover rounded-md border flex-shrink-0"
                        onError={(e) => (e.currentTarget.src = "/placeholder.svg?width=60&height=60&text=Erro")}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/admin/equipamentos/${equipment.id}`}
                              className="font-medium hover:underline text-primary block truncate"
                            >
                              {equipment.name}
                            </Link>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                              {equipment.description}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Ações para {equipment.name}</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/equipamentos/${equipment.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Ver Detalhes
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </Link>
                              </DropdownMenuItem>
                              {canDelete && (
                                <DropdownMenuItem
                                  onClick={() => handleDelete(equipment.id)}
                                  className="text-red-600 hover:!text-red-500 focus:!text-red-500"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Excluir
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{
                                backgroundColor: equipment.category.bgColor || undefined,
                                color: equipment.category.fontColor || undefined,
                                borderColor: equipment.category.bgColor ? "transparent" : undefined,
                              }}
                            >
                              {equipment.category.icon &&
                                LucideIcons[equipment.category.icon as keyof typeof LucideIcons] &&
                                React.createElement(LucideIcons[equipment.category.icon as keyof typeof LucideIcons], {
                                  size: 12,
                                  color: equipment.category.iconColor || equipment.category.fontColor || "currentColor",
                                  className: "mr-1 inline-block",
                                })}
                              {equipment.category.name}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-sm">R$ {equipment.pricePerDay.toFixed(2)}/dia</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <Badge
                            variant={equipment.isAvailable ? "default" : "destructive"}
                            className={cn(
                              "text-xs",
                              equipment.isAvailable
                                ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-700 dark:text-green-100 dark:border-green-500"
                                : "bg-red-100 text-red-700 border-red-300 dark:bg-red-700 dark:text-red-100 dark:border-red-500",
                            )}
                          >
                            {equipment.isAvailable ? "Disponível" : "Indisponível"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {equipment._count.quoteItems} orçamentos
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Paginação */}
      {equipments.length > 0 && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t mt-6">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            Mostrando {equipments.length} de {totalItems} equipamentos. Página {currentPage} de {totalPages}.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex-1 sm:flex-none"
            >
              Anterior
            </Button>
            <span className="text-sm p-2 hidden sm:inline">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex-1 sm:flex-none"
            >
              Próxima
            </Button>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number.parseInt(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-[100px] sm:w-[130px] h-9 text-sm">
                <SelectValue placeholder="Itens" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
