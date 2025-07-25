"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Search, Filter, Grid, List, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"

interface Equipment {
  id: string
  name: string
  description: string
  category: string
  price: number
  status: "available" | "rented" | "maintenance"
  image: string
  specifications: Record<string, string>
  createdAt: string
  updatedAt: string
}

function AdminEquipmentsPage() {
  const searchParams = useSearchParams()
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Animation variants
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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  useEffect(() => {
    fetchEquipments()
  }, [])

  const fetchEquipments = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/equipments")
      if (response.ok) {
        const data = await response.json()
        setEquipments(data)
      } else {
        toast.error("Erro ao carregar equipamentos")
      }
    } catch (error) {
      console.error("Error fetching equipments:", error)
      toast.error("Erro ao carregar equipamentos")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEquipment = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este equipamento?")) return

    try {
      const response = await fetch(`/api/admin/equipments/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setEquipments((prev) => prev.filter((eq) => eq.id !== id))
        toast.success("Equipamento excluído com sucesso")
      } else {
        toast.error("Erro ao excluir equipamento")
      }
    } catch (error) {
      console.error("Error deleting equipment:", error)
      toast.error("Erro ao excluir equipamento")
    }
  }

  const filteredEquipments = equipments.filter((equipment) => {
    const matchesSearch =
      equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      equipment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || equipment.category === categoryFilter
    const matchesStatus = statusFilter === "all" || equipment.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "rented":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Disponível"
      case "rented":
        return "Alugado"
      case "maintenance":
        return "Manutenção"
      default:
        return status
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciar Equipamentos</h1>
              <p className="text-gray-600">Gerencie todos os equipamentos disponíveis para locação</p>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")} variant="outline" size="sm">
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>

              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Equipamento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Equipamento</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" placeholder="Nome do equipamento" />
                      </div>
                      <div>
                        <Label htmlFor="category">Categoria</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="escavadeiras">Escavadeiras</SelectItem>
                            <SelectItem value="tratores">Tratores</SelectItem>
                            <SelectItem value="guindastes">Guindastes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea id="description" placeholder="Descrição do equipamento" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Preço por dia (R$)</Label>
                        <Input id="price" type="number" placeholder="0,00" />
                      </div>
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Status inicial" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Disponível</SelectItem>
                            <SelectItem value="maintenance">Manutenção</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="featured" />
                      <Label htmlFor="featured">Equipamento em destaque</Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button>Criar Equipamento</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar equipamentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas as categorias" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    <SelectItem value="escavadeiras">Escavadeiras</SelectItem>
                    <SelectItem value="tratores">Tratores</SelectItem>
                    <SelectItem value="guindastes">Guindastes</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="rented">Alugado</SelectItem>
                    <SelectItem value="maintenance">Manutenção</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="w-full bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros Avançados
                </Button>
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
          {filteredEquipments.map((equipment) => (
            <motion.div key={equipment.id} variants={itemVariants}>
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
                {viewMode === "grid" ? (
                  <>
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={equipment.image || "/placeholder.jpg"}
                        alt={equipment.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className={getStatusColor(equipment.status)}>{getStatusLabel(equipment.status)}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                          {equipment.name}
                        </h3>
                        <span className="text-lg font-bold text-blue-600">
                          R$ {equipment.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{equipment.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {equipment.category}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/admin/equipamentos/${equipment.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="ghost" asChild>
                            <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteEquipment(equipment.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={equipment.image || "/placeholder.jpg"}
                          alt={equipment.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-lg text-gray-900 truncate">{equipment.name}</h3>
                          <span className="text-lg font-bold text-blue-600 ml-4">
                            R$ {equipment.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-1">{equipment.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {equipment.category}
                            </Badge>
                            <Badge className={getStatusColor(equipment.status)}>
                              {getStatusLabel(equipment.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/admin/equipamentos/${equipment.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteEquipment(equipment.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
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

        {filteredEquipments.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum equipamento encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou criar um novo equipamento.</p>
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
