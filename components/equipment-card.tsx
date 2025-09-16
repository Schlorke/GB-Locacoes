'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'
import { Clock, Eye } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Equipment {
  id: string
  name: string
  description: string
  pricePerDay: number // Padronizado para pricePerDay
  imageUrl?: string
  category: {
    name: string
  }
  isAvailable: boolean
}

interface EquipmentCardProps {
  equipment: Equipment
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  const imageUrl =
    equipment.imageUrl ||
    `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(equipment.name)}`

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-video overflow-hidden bg-gray-100 flex items-center justify-center">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={equipment.name}
          width={300}
          height={200}
          priority
          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge
            variant="secondary"
            className="text-xs max-w-[150px] flex-shrink-0"
          >
            <span className="truncate min-w-0">{equipment.category.name}</span>
          </Badge>
          <Badge
            variant={equipment.isAvailable ? 'default' : 'destructive'}
            className="text-xs"
          >
            {equipment.isAvailable ? 'Disponível' : 'Indisponível'}
          </Badge>
        </div>

        <h3 className="mb-2 font-semibold text-lg line-clamp-1">
          {equipment.name}
        </h3>

        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {equipment.description}
        </p>

        <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Diária</span>
        </div>

        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(equipment.pricePerDay || 0)}
          </span>
          <span className="text-sm text-muted-foreground">/dia</span>
        </div>

        <div className="flex flex-col gap-2">
          <Link href={`/equipamentos/${equipment.id}`} className="w-full">
            <Button variant="outline" className="w-full" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Ver Detalhes
            </Button>
          </Link>

          <Link href={`/equipamentos/${equipment.id}`} className="w-full">
            <Button
              className="w-full"
              size="sm"
              disabled={!equipment.isAvailable}
            >
              Solicitar Orçamento
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
