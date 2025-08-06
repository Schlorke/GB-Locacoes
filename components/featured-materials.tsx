'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Package } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Icon mapping
import {
  Building,
  Container,
  Hammer,
  HardHat,
  Package as PackageIcon,
  Shield,
  Truck,
  Wrench,
  Zap,
} from 'lucide-react'

const iconMap = {
  Package: PackageIcon,
  Building,
  Container,
  Hammer,
  HardHat,
  Shield,
  Truck,
  Wrench,
  Zap,
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
    bgColor?: string
    fontColor?: string
    icon?: string
    iconColor?: string
  }
  isAvailable: boolean
}

export default function FeaturedMaterials() {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Função para renderizar ícones dinamicamente
  const renderIcon = (iconName?: string, color?: string) => {
    if (!iconName) return null

    try {
      const IconComponent = iconMap[iconName as keyof typeof iconMap]
      if (IconComponent && typeof IconComponent === 'function') {
        return (
          <IconComponent
            size={14}
            color={color || 'currentColor'}
            className="mr-1.5"
          />
        )
      }
    } catch (_error) {
      // Fallback se o ícone não existir
      return (
        <Package size={14} color={color || 'currentColor'} className="mr-1.5" />
      )
    }

    // Fallback se o ícone não for encontrado
    return (
      <Package size={14} color={color || 'currentColor'} className="mr-1.5" />
    )
  }

  useEffect(() => {
    fetchFeaturedEquipments()
  }, [])

  const fetchFeaturedEquipments = async () => {
    try {
      const response = await fetch('/api/equipments')
      if (response.ok) {
        const data = await response.json()
        // Pegar apenas os primeiros 6 equipamentos para destaque
        setEquipments(Array.isArray(data) ? data.slice(0, 6) : [])
      }
    } catch (error) {
      console.error('Erro ao carregar equipamentos em destaque:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Equipamentos em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              Nossos equipamentos mais procurados
            </p>
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Equipamentos em Destaque
          </h2>
          <p className="text-lg text-gray-600">
            Nossos equipamentos mais procurados
          </p>
        </div>

        {equipments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipments.map((equipment: Equipment) => (
              <Card
                key={equipment.id}
                className="relative overflow-hidden border-0 shadow-xl bg-white backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full hover:scale-[1.02] flex flex-col group"
              >
                {/* Clean depth layers for equipment card */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/30"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-gray-50/40"></div>

                <div className="relative h-48 bg-gray-200 z-10">
                  <Image
                    src={
                      equipment.images?.[0] ||
                      '/placeholder.svg?height=200&width=300'
                    }
                    alt={equipment.name}
                    fill
                    className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  {!equipment.isAvailable && (
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant="destructive"
                        className="bg-red-500/90 backdrop-blur-sm"
                      >
                        Indisponível
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="flex-1 p-4 relative z-10 flex flex-col">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                    {equipment.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {equipment.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-orange-600">
                        R$ {equipment.pricePerDay?.toFixed(2) || '0.00'}
                        <span className="text-sm font-normal text-gray-500">
                          /dia
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors backdrop-blur-sm"
                        style={{
                          backgroundColor:
                            equipment.category?.bgColor || '#f3f4f6',
                          color: equipment.category?.fontColor || '#374151',
                          borderColor: 'transparent',
                        }}
                      >
                        {renderIcon(
                          equipment.category?.icon,
                          equipment.category?.iconColor ||
                            equipment.category?.fontColor
                        )}
                        {equipment.category?.name || 'Sem categoria'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 relative z-10">
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 bg-transparent border-gray-200 hover:bg-background hover:text-foreground hover:scale-105 hover:shadow-sm transition-all duration-300 group"
                    >
                      <Link href={`/equipamentos/${equipment.id}`}>
                        <span className="group-hover:text-orange-500 transition-colors duration-200">
                          Ver Detalhes
                        </span>
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      disabled={!equipment.isAvailable}
                      asChild={equipment.isAvailable}
                      className="flex-1"
                    >
                      {equipment.isAvailable ? (
                        <Link href={`/orcamento?equipmentId=${equipment.id}`}>
                          Solicitar
                        </Link>
                      ) : (
                        <span>Indisponível</span>
                      )}
                    </Button>
                  </div>
                </CardFooter>

                {/* Bottom accent line - sempre no fundo do card */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center z-10"></div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              Nenhum equipamento disponível no momento.
            </p>
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
