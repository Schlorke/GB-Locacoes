"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye, SortAsc, SortDesc, Grid, List } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Equipment {
  id: string
  name: string
  description: string
  category: string
  dailyPrice: number
  weeklyPrice: number
  monthlyPrice: number
  available: boolean
  images: string[]
  specifications: Record<string, string>
  createdAt: string
  updatedAt: string
}

function AdminEquipmentsPage() {
  const searchParams = useSearchParams()
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "all")
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">((searchParams.get("order") as "asc" | "desc") || "asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    fetchEquipments()
    fetchCategories()
  }, [])

  const fetchEquipments = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/equipments")
      if (response.ok) {
        const data = await response.json()
        setEquipments(data)
      }
    } catch (error) {
      console.error("Erro ao carregar equipamentos:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data.map((cat: any) => cat.name))
      }
    } catch (error) {
      console.error("Erro ao carregar categorias:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este equipamento?")) return

    try {
      const response = await fetch(`/api/admin/equipments/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setEquipments(equipments.filter((eq) => eq.id !== id))
      }
    } catch (error) {
      console.error("Erro ao excluir equipamento:", error)
    }
  }

  const filteredAndSortedEquipments = equipments
    .filter((equipment) => {
      const matchesSearch =
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || equipment.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      let aValue: any = a[sortBy as keyof Equipment]
      let bValue: any = b[sortBy as keyof Equipment]

      if (sortBy === "dailyPrice" || sortBy === "weeklyPrice" || sortBy === "monthlyPrice") {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Equipamentos</h1>
              <p className="text-gray-600">Gerencie o catálogo de equipamentos disponíveis para locação</p>
            </div>
            <Link href="/admin/equipamentos/novo">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Equipamento
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar equipamentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nome</SelectItem>
                    <SelectItem value="category">Categoria</SelectItem>
                    <SelectItem value="dailyPrice">Preço Diário</SelectItem>
                    <SelectItem value="createdAt">Data de Criação</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Order */}
                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="flex items-center gap-2"
                >
                  {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  {sortOrder === "asc" ? "Crescente" : "Decrescente"}
                </Button>

                {/* View Mode */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Equipment Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
        >
          {filteredAndSortedEquipments.map((equipment) => (
            <motion.div key={equipment.id} variants={itemVariants}>
              <Card className="group hover:shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/90 border-white/20 overflow-hidden">
                {viewMode === "grid" ? (
                  <>
                    {/* Equipment Image */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      {equipment.images && equipment.images.length > 0 ? (
                        <img
                          src={equipment.images[0] || "/placeholder.svg"}
                          alt={equipment.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-2xl">📦</span>
                            </div>
                            <p className="text-sm">Sem imagem</p>
                          </div>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge variant={equipment.available ? "default" : "destructive"}>
                          {equipment.available ? "Disponível" : "Indisponível"}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {equipment.name}
                          </CardTitle>
                          <p className="text-sm text-gray-500 mt-1">{equipment.category}</p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{equipment.description}</p>

                      {/* Pricing */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Diária:</span>
                          <span className="font-semibold text-green-600">R$ {equipment.dailyPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Semanal:</span>
                          <span className="font-semibold text-green-600">R$ {equipment.weeklyPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Mensal:</span>
                          <span className="font-semibold text-green-600">R$ {equipment.monthlyPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link href={`/admin/equipamentos/${equipment.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver
                          </Button>
                        </Link>
                        <Link href={`/admin/equipamentos/${equipment.id}/editar`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(equipment.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  /* List View */
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      {/* Equipment Image */}
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        {equipment.images && equipment.images.length > 0 ? (
                          <img
                            src={equipment.images[0] || "/placeholder.svg"}
                            alt={equipment.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">📦</div>
                        )}
                      </div>

                      {/* Equipment Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{equipment.name}</h3>
                            <p className="text-sm text-gray-500">{equipment.category}</p>
                          </div>
                          <Badge variant={equipment.available ? "default" : "destructive"}>
                            {equipment.available ? "Disponível" : "Indisponível"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-1">{equipment.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4 text-sm">
                            <span className="text-green-600 font-semibold">
                              R$ {equipment.dailyPrice.toFixed(2)}/dia
                            </span>
                            <span className="text-green-600 font-semibold">
                              R$ {equipment.weeklyPrice.toFixed(2)}/sem
                            </span>
                            <span className="text-green-600 font-semibold">
                              R$ {equipment.monthlyPrice.toFixed(2)}/mês
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/admin/equipamentos/${equipment.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(equipment.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredAndSortedEquipments.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum equipamento encontrado</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || categoryFilter !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Comece adicionando seu primeiro equipamento"}
            </p>
            <Link href="/admin/equipamentos/novo">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Equipamento
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function AdminEquipmentsPageWrapper() {
  return (
    <Suspense fallback={null}>
      <AdminEquipmentsPage />
    </Suspense>
  )
}
