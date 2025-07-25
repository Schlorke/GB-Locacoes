"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatePresence, motion } from "framer-motion"
import { Calendar, DollarSign, Edit, Eye, Package, Plus, Search, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Equipment {
  id: string
  name: string
  description?: string
  dailyPrice: number
  weeklyPrice?: number
  monthlyPrice?: number
  available: boolean
  category?: {
    id: string
    name: string
    bgColor?: string
    fontColor?: string
  }
  images: string[]
  createdAt: string
}

interface Category {
  id: string
  name: string
  bgColor?: string
  fontColor?: string
}

export default function AdminEquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all")

  useEffect(() => {
    fetchEquipments()
    fetchCategories()
  }, [])

  useEffect(() => {
    filterEquipments()
  }, [equipments, searchTerm, selectedCategory, availabilityFilter])

  const fetchEquipments = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/equipments")
      if (response.ok) {
        const data = await response.json()
        const equipmentsData = Array.isArray(data) ? data : data.equipments || []
        setEquipments(equipmentsData)
      } else {
        toast.error("Erro ao carregar equipamentos")
      }
    } catch (error) {
      console.error("Error fetching equipments:", error)
      toast.error("Erro ao carregar equipamentos")
      setEquipments([])
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const filterEquipments = () => {
    if (!Array.isArray(equipments)) {
      setFilteredEquipments([])
      return
    }

    const filtered = equipments.filter((equipment) => {
      const matchesSearch =
        equipment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.description?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || equipment.category?.id === selectedCategory
      const matchesAvailability =
        availabilityFilter === "all" ||
        (availabilityFilter === "available" && equipment.available) ||
        (availabilityFilter === "unavailable" && !equipment.available)

      return matchesSearch && matchesCategory && matchesAvailability
    })

    setFilteredEquipments(filtered)
  }

  const deleteEquipment = async (equipmentId: string) => {
    if (!confirm("Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.")) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/equipments/${equipmentId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Equipamento excluído com sucesso")
        fetchEquipments()
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || "Erro ao excluir equipamento")
      }
    } catch (error) {
      console.error("Error deleting equipment:", error)
      toast.error("Erro ao excluir equipamento")
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
            {/* Clean depth layers without decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/12 via-transparent to-black/15"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/6 to-blue-700/8"></div>

            {/* Content */}
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-sm">Gerenciar Equipamentos</h1>
              <p className="text-blue-50 mb-4 font-medium">Gerencie o catálogo completo de equipamentos para locação</p>
              <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-2 w-fit">
                <Package className="w-5 h-5 text-blue-50" />
                <span className="font-semibold text-white">
                  {Array.isArray(filteredEquipments) ? filteredEquipments.length : 0} equipamentos encontrados
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
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar equipamentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-200 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as categorias</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Disponibilidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="available">Disponíveis</SelectItem>
                      <SelectItem value="unavailable">Indisponíveis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  asChild
                  className="bg-slate-700 text-primary-foreground hover:bg-slate-600 hover:scale-105 hover:shadow-lg transition-all duration-300 h-10 px-4"
                >
                  <Link href="/admin/equipamentos/novo">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Equipamento
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grid de Equipamentos */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {!Array.isArray(filteredEquipments) || filteredEquipments.length === 0 ? (
            <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm">
              {/* Clean depth layers for empty state card */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

              <CardContent className="relative z-10 text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Package className="w-12 h-12 mx-auto mb-3" />
                  <p className="text-lg font-medium">Nenhum equipamento encontrado</p>
                  <p className="text-sm">
                    {searchTerm
                      ? "Tente ajustar os filtros de busca"
                      : "Adicione seu primeiro equipamento para começar o catálogo"}
                  </p>
                </div>
                {!searchTerm && (
                  <Button
                    asChild
                    className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-105 transition-all duration-300"
                  >
                    <Link href="/admin/equipamentos/novo">
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Primeiro Equipamento
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredEquipments.map((equipment, index) => (
                  <motion.div
                    key={equipment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                      {/* Clean depth layers for equipment card */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

                      <CardHeader className="relative z-10 pb-3">
                        <div className="flex flex-col">
                          {/* Equipment Image */}
                          <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                            {equipment.images.length > 0 ? (
                              <img
                                src={equipment.images[0] || "/placeholder.svg"}
                                alt={equipment.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <Package className="w-16 h-16 text-gray-400" />
                            )}
                          </div>

                          {/* Equipment Info */}
                          <div className="text-left w-full">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-lg text-gray-900 truncate flex-1">{equipment.name}</h3>
                              <Badge
                                variant={equipment.available ? "default" : "destructive"}
                                className="text-xs ml-2 flex-shrink-0"
                              >
                                {equipment.available ? "Disponível" : "Indisponível"}
                              </Badge>
                            </div>

                            {equipment.category && (
                              <Badge
                                className="text-xs mb-2"
                                style={{
                                  backgroundColor: equipment.category.bgColor || "#e0e0e0",
                                  color: equipment.category.fontColor || "#000000",
                                }}
                              >
                                {equipment.category.name}
                              </Badge>
                            )}

                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                              {equipment.description || "Sem descrição"}
                            </p>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="relative z-10 pt-0">
                        <div className="space-y-3">
                          {/* Price */}
                          <div className="flex items-center gap-2 text-lg font-bold text-green-600">
                            <DollarSign className="w-5 h-5" />
                            <span>R$ {equipment.dailyPrice.toFixed(2)}/dia</span>
                          </div>

                          {/* Created Date */}
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">
                              Criado em {new Date(equipment.createdAt).toLocaleDateString("pt-BR")}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" asChild className="flex-shrink-0">
                              <Link href={`/admin/equipamentos/${equipment.id}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild className="flex-shrink-0">
                              <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                                <Edit className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteEquipment(equipment.id)}
                              disabled={isDeleting}
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
      </div>
    </div>
  )
}
