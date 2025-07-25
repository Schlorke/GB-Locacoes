"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { formatCurrency } from "@/lib/utils"
import { motion } from "framer-motion"
import { Calendar, Edit, Eye, Filter, Loader2, Package, Plus, Search, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Category {
  id: string
  name: string
  color?: string
}

interface Equipment {
  id: string
  name: string
  description: string
  pricePerDay: number
  images: string[]
  category: Category
  isAvailable: boolean
  createdAt: string
}

export default function EquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    let filtered = equipments

    if (searchTerm) {
      filtered = filtered.filter(
        (eq) =>
          eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          eq.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((eq) => eq.category.id === categoryFilter)
    }

    if (availabilityFilter !== "all") {
      const isAvailable = availabilityFilter === "available"
      filtered = filtered.filter((eq) => eq.isAvailable === isAvailable)
    }

    setFilteredEquipments(filtered)
  }, [searchTerm, categoryFilter, availabilityFilter, equipments])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [equipmentsRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/equipments"),
        fetch("/api/admin/categories"),
      ])

      if (equipmentsRes.ok) {
        const equipmentsData = await equipmentsRes.json()
        setEquipments(equipmentsData)
        setFilteredEquipments(equipmentsData)
      }

      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        setCategories(categoriesData)
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast({
        title: "Erro",
        description: "Erro ao carregar equipamentos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este equipamento?")) return

    try {
      const response = await fetch(`/api/admin/equipments/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setEquipments((prev) => prev.filter((eq) => eq.id !== id))
        toast({
          title: "Sucesso",
          description: "Equipamento excluído com sucesso",
        })
      } else {
        throw new Error("Erro ao excluir equipamento")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir equipamento",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600 mx-auto mb-4" />
              <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full bg-blue-400/20 mx-auto"></div>
            </div>
            <p className="text-lg font-medium text-slate-700">Carregando equipamentos...</p>
            <p className="text-sm text-slate-500 mt-2">Aguarde um momento</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header com Gradiente */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-blue-700/90 to-indigo-800/90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fillOpacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Equipamentos
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl">
                Gerencie todos os equipamentos disponíveis para locação
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/admin/equipamentos/novo">
                  <Plus className="h-5 w-5 mr-2" />
                  Novo Equipamento
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar equipamentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-blue-500 bg-white/80"
                  />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-white/80">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filtrar por categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Categorias</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger className="bg-white/80">
                    <Package className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Disponibilidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="available">Disponíveis</SelectItem>
                    <SelectItem value="unavailable">Indisponíveis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Grid de Equipamentos */}
        {filteredEquipments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-xl max-w-md mx-auto">
              <Package className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-slate-700 mb-3">
                Nenhum equipamento encontrado
              </h3>
              <p className="text-slate-500 mb-6">
                {equipments.length === 0
                  ? 'Comece adicionando seu primeiro equipamento'
                  : 'Tente ajustar os filtros de busca'}
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/admin/equipamentos/novo">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Equipamento
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipments.map((equipment, index) => (
              <motion.div
                key={equipment.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="group bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    <Image
                      src={equipment.images?.[0] || '/placeholder.svg?height=200&width=300'}
                      alt={equipment.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={equipment.isAvailable ? 'default' : 'destructive'}
                        className="shadow-lg"
                      >
                        {equipment.isAvailable ? 'Disponível' : 'Indisponível'}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="shadow-lg">
                        {equipment.category.name}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 relative z-10">
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                      {equipment.name}
                    </h3>
                    
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {equipment.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(equipment.pricePerDay)}
                        <span className="text-sm font-normal text-slate-500">/dia</span>
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-slate-500 mb-4">
                      <Calendar className="h-3 w-3 mr-1" />
                      Criado em {new Date(equipment.createdAt).toLocaleDateString('pt-BR')}
                    </div>

                    {/* Botões de Ação - Aparecem no Hover */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                      >
                        <Link href={`/admin/equipamentos/${equipment.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Link>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1 hover:bg-green-50 hover:border-green-300 bg-transparent"
                      >
                        <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Link>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(equipment.id)}
                        className="hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>

                  {/* Borda Animada */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
