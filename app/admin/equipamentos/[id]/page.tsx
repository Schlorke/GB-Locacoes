"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Trash2, Package, Calendar, DollarSign, Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import Image from "next/image"
import * as LucideIcons from "lucide-react"
import React from "react"

interface Equipment {
  id: string
  name: string
  description: string
  pricePerDay: number
  isAvailable: boolean
  images: string[]
  specifications?: Record<string, string>
  createdAt: string
  updatedAt: string
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
}

export default function EquipmentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (params.id) {
      fetchEquipment(params.id as string)
    }
  }, [params.id])

  const fetchEquipment = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/equipments/${id}`)
      if (response.ok) {
        const data = await response.json()
        setEquipment(data)
      } else {
        toast.error("Erro ao carregar equipamento")
        router.push("/admin/equipamentos")
      }
    } catch (error) {
      console.error("Error fetching equipment:", error)
      toast.error("Erro ao carregar equipamento")
      router.push("/admin/equipamentos")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!equipment) return

    if (!confirm("Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.")) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/equipments/${equipment.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Equipamento excluído com sucesso!")
        router.push("/admin/equipamentos")
      } else {
        const errorData = await response.json()
        toast.error(`Erro ao excluir equipamento: ${errorData.error || "Erro desconhecido"}`)
      }
    } catch (error) {
      console.error("Error deleting equipment:", error)
      toast.error("Erro de rede ao excluir equipamento.")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Carregando equipamento...</p>
        </div>
      </div>
    )
  }

  if (!equipment) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-xl font-medium text-gray-600 mb-2">Equipamento não encontrado</p>
          <Button asChild>
            <Link href="/admin/equipamentos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Equipamentos
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <Button variant="outline" size="icon" asChild className="flex-shrink-0 bg-transparent">
            <Link href="/admin/equipamentos">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Link>
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 truncate">
              {equipment.name}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Detalhes do equipamento</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link href={`/admin/equipamentos/${equipment.id}/editar`}>
              <Edit className="h-4 w-4 mr-2" />
              <span className="truncate">Editar</span>
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full sm:w-auto"
          >
            {isDeleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
            <span className="truncate">{isDeleting ? "Excluindo..." : "Excluir"}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Images */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">Imagens do Equipamento</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {equipment.images.length > 0 ? (
              <>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={equipment.images[selectedImageIndex] || "/placeholder.svg?height=400&width=600"}
                    alt={equipment.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = "/placeholder.svg?height=400&width=600&text=Erro")}
                  />
                </div>
                {equipment.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {equipment.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === index ? "border-primary" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${equipment.name} - ${index + 1}`}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.currentTarget.src = "/placeholder.svg?height=80&width=80&text=Erro")}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Package className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm sm:text-base text-muted-foreground">Nenhuma imagem disponível</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Equipment Info */}
        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Package className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="truncate">Informações Básicas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-muted-foreground">Categoria</label>
                <div className="mt-1">
                  <Badge
                    variant="outline"
                    className="text-xs sm:text-sm"
                    style={{
                      backgroundColor: equipment.category.bgColor || undefined,
                      color: equipment.category.fontColor || undefined,
                      borderColor: equipment.category.bgColor ? "transparent" : undefined,
                    }}
                  >
                    {equipment.category.icon &&
                      LucideIcons[equipment.category.icon as keyof typeof LucideIcons] &&
                      React.createElement(LucideIcons[equipment.category.icon as keyof typeof LucideIcons], {
                        size: 14,
                        color: equipment.category.iconColor || equipment.category.fontColor || "currentColor",
                        className: "mr-1.5 inline-block",
                      })}
                    {equipment.category.name}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-muted-foreground">Descrição</label>
                <p className="mt-1 text-sm sm:text-base text-slate-900 dark:text-slate-100">{equipment.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium text-muted-foreground">Preço por Dia</label>
                  <div className="mt-1 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-lg sm:text-xl font-bold text-green-600">
                      R$ {equipment.pricePerDay.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge variant={equipment.isAvailable ? "default" : "destructive"} className="text-xs sm:text-sm">
                      {equipment.isAvailable ? (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Disponível
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Indisponível
                        </>
                      )}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <label className="font-medium text-muted-foreground">Orçamentos</label>
                  <p className="text-slate-900 dark:text-slate-100">{equipment._count.quoteItems} solicitações</p>
                </div>
                <div>
                  <label className="font-medium text-muted-foreground">Avaliações</label>
                  <p className="text-slate-900 dark:text-slate-100">{equipment._count.reviews} avaliações</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          {equipment.specifications && Object.keys(equipment.specifications).length > 0 && (
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">Especificações Técnicas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {Object.entries(equipment.specifications).map(([key, value]) => (
                    <div key={key} className="p-3 bg-slate-50 rounded-lg">
                      <label className="text-xs sm:text-sm font-medium text-muted-foreground">{key}</label>
                      <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 mt-1">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
