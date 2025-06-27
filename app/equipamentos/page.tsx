"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Clock, Loader2, Search, Filter } from "lucide-react"

interface Review {
  id: string
  rating: number
  comment?: string | null
  createdAt: string
}

interface Equipment {
  id: string
  name: string
  description: string
  pricePerDay: number
  images: string[]
  category: {
    id: string
    name: string
    color?: string
  }
  available: boolean
  reviews?: Review[]
}

interface Category {
  id: string
  name: string
}

export default function EquipmentsPage() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterEquipments()
  }, [searchTerm, categoryFilter, equipments])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [equipmentsRes, categoriesRes] = await Promise.all([fetch("/api/equipments"), fetch("/api/categories")])

      if (!equipmentsRes.ok) {
        throw new Error(`Erro ao carregar equipamentos: ${equipmentsRes.status}`)
      }
      if (!categoriesRes.ok) {
        throw new Error(`Erro ao carregar categorias: ${categoriesRes.status}`)
      }

      const equipmentsData = await equipmentsRes.json()
      const categoriesData = await categoriesRes.json()

      const equipmentsList: Equipment[] = Array.isArray(equipmentsData) ? equipmentsData : []
      const categoriesList: Category[] = Array.isArray(categoriesData) ? categoriesData : []

      setEquipments(equipmentsList)
      setFilteredEquipments(equipmentsList)
      setCategories(categoriesList)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      setError(error instanceof Error ? error.message : "Erro desconhecido")
    } finally {
      setIsLoading(false)
    }
  }

  const filterEquipments = () => {
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

    setFilteredEquipments(filtered)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando equipamentos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro: {error}</p>
          <Button onClick={fetchData}>Tentar Novamente</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo de Equipamentos</h1>
          <p className="text-xl text-gray-600">Encontre o equipamento ideal para sua obra</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar equipamentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="md:w-64">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
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
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredEquipments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEquipments.map((equipment) => {
              // TODO: implementar reviews
              const averageRating = 0
              const reviewCount = 0

              return (
                <Card key={equipment.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={equipment.images?.[0] || "/placeholder.svg?height=200&width=300"}
                      alt={equipment.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary">{equipment.category?.name || "Sem categoria"}</Badge>
                    </div>
                    {!equipment.available && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="destructive">Indisponível</Badge>
                      </div>
                    )}
                  </div>

                  <CardContent className="flex-1 p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{equipment.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{equipment.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                      {reviewCount > 0 ? (
                        <>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
                          </div>
                          <span className="text-sm text-gray-500">
                            ({reviewCount} {reviewCount === 1 ? "avaliação" : "avaliações"})
                          </span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">Nenhuma avaliação</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-orange-600">
                        R$ {equipment.pricePerDay?.toFixed(2) || "0.00"}
                        <span className="text-sm font-normal text-gray-500">/dia</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Diária</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 mt-auto">
                    <div className="flex flex-col gap-2 w-full">
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href={`/equipamentos/${equipment.id}`}>Ver Detalhes</Link>
                      </Button>
                      <Button
                        size="sm"
                        disabled={!equipment.available}
                        asChild={equipment.available}
                        className="w-full"
                      >
                        {equipment.available ? (
                          <Link href={`/orcamento?equipmentId=${equipment.id}`}>Solicitar Orçamento</Link>
                        ) : (
                          <span>Indisponível</span>
                        )}
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Nenhum equipamento encontrado.</p>
            <p className="text-sm text-gray-500 mt-2">
              {equipments.length === 0
                ? "Adicione equipamentos no painel administrativo."
                : "Tente ajustar os filtros."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
