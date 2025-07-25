"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, Eye, Filter, Package, MapPin } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Equipment {
  id: string
  name: string
  description: string
  category: {
    id: string
    name: string
  }
  dailyPrice: number
  weeklyPrice: number
  monthlyPrice: number
  images: string[]
  available: boolean
  location: string
  createdAt: string
  updatedAt: string
}

function AdminEquipmentsPage() {
  const searchParams = useSearchParams()
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "")
  const [availabilityFilter, setAvailabilityFilter] = useState(searchParams.get("available") || "")

  useEffect(() => {
    fetchEquipments()
  }, [searchTerm, categoryFilter, availabilityFilter])

  const fetchEquipments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (categoryFilter) params.append("category", categoryFilter)
      if (availabilityFilter) params.append("available", availabilityFilter)

      const response = await fetch(`/api/admin/equipments?${params}`)
      if (!response.ok) throw new Error("Erro ao carregar equipamentos")

      const data = await response.json()
      setEquipments(data.equipments || [])
    } catch (error) {
      console.error("Erro ao carregar equipamentos:", error)
      toast.error("Erro ao carregar equipamentos")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este equipamento?")) return

    try {
      const response = await fetch(`/api/admin/equipments/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Erro ao excluir equipamento")

      toast.success("Equipamento excluído com sucesso")
      fetchEquipments()
    } catch (error) {
      console.error("Erro ao excluir equipamento:", error)
      toast.error("Erro ao excluir equipamento")
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23e2e8f0' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando equipamentos...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23e2e8f0' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Equipamentos</h1>
                <p className="text-gray-600">Gerencie todos os equipamentos disponíveis para locação</p>
              </div>
              <Link href="/admin/equipamentos/novo">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Equipamento
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Buscar equipamentos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Todas as categorias</option>
                      <option value="escavadeiras">Escavadeiras</option>
                      <option value="tratores">Tratores</option>
                      <option value="guindastes">Guindastes</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      value={availabilityFilter}
                      onChange={(e) => setAvailabilityFilter(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Todos os status</option>
                      <option value="true">Disponível</option>
                      <option value="false">Indisponível</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Equipment Grid */}
          <AnimatePresence>
            {equipments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum equipamento encontrado</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || categoryFilter || availabilityFilter
                    ? "Tente ajustar os filtros de busca"
                    : "Comece adicionando seu primeiro equipamento"}
                </p>
                <Link href="/admin/equipamentos/novo">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Equipamento
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {equipments.map((equipment, index) => (
                  <motion.div
                    key={equipment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                              {equipment.name}
                            </CardTitle>
                            <Badge
                              variant={equipment.available ? "default" : "secondary"}
                              className={
                                equipment.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }
                            >
                              {equipment.available ? "Disponível" : "Indisponível"}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{equipment.description}</p>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Package className="w-4 h-4 mr-2" />
                            {equipment.category.name}
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            {equipment.location}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Diária:</span>
                              <span className="font-semibold text-green-600">{formatPrice(equipment.dailyPrice)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Semanal:</span>
                              <span className="font-semibold text-green-600">{formatPrice(equipment.weeklyPrice)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Mensal:</span>
                              <span className="font-semibold text-green-600">
                                {formatPrice(equipment.monthlyPrice)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                            <span>Criado: {formatDate(equipment.createdAt)}</span>
                            <span>Atualizado: {formatDate(equipment.updatedAt)}</span>
                          </div>

                          <div className="flex gap-2 pt-3">
                            <Link href={`/admin/equipamentos/${equipment.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full bg-transparent">
                                <Eye className="w-4 h-4 mr-1" />
                                Ver
                              </Button>
                            </Link>
                            <Link href={`/admin/equipamentos/${equipment.id}/editar`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full bg-transparent">
                                <Edit className="w-4 h-4 mr-1" />
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
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
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
