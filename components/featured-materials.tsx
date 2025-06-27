"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface Equipment {
  id: string
  name: string
  description: string
  pricePerDay: number
  images: string[]
  category: {
    id: string
    name: string
  }
  available: boolean
}

export default function FeaturedMaterials() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedEquipments()
  }, [])

  const fetchFeaturedEquipments = async () => {
    try {
      const response = await fetch("/api/equipments")
      if (response.ok) {
        const data = await response.json()
        // Pegar apenas os primeiros 6 equipamentos para destaque
        setEquipments(Array.isArray(data) ? data.slice(0, 6) : [])
      }
    } catch (error) {
      console.error("Erro ao carregar equipamentos em destaque:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Equipamentos em Destaque</h2>
            <p className="text-lg text-gray-600">Nossos equipamentos mais procurados</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-video rounded-t-lg"></div>
                <div className="bg-white p-6 rounded-b-lg space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Equipamentos em Destaque</h2>
          <p className="text-lg text-gray-600">Nossos equipamentos mais procurados</p>
        </div>

        {equipments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipments.map((equipment) => (
              <Card key={equipment.id} className="group hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <Image
                    src={equipment.images?.[0] || "/placeholder.svg?height=300&width=400"}
                    alt={equipment.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{equipment.category.name}</Badge>
                  </div>
                  {!equipment.available && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="destructive">Indisponível</Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {equipment.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{equipment.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-orange-600">
                      R$ {equipment.pricePerDay.toFixed(2)}
                      <span className="text-sm font-normal text-gray-500">/dia</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>Diária</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <Link href={`/equipamentos/${equipment.id}`}>Ver Detalhes</Link>
                    </Button>
                    <Button
                      size="sm"
                      disabled={!equipment.available}
                      asChild={equipment.available}
                      className="flex-1"
                    >
                      {equipment.available ? (
                        <Link href={`/orcamento?equipmentId=${equipment.id}`}>Solicitar</Link>
                      ) : (
                        <span>Indisponível</span>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum equipamento disponível no momento.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/equipamentos">Ver Todos os Equipamentos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
